#!/usr/bin/env node
/**
 * Workshop progress hook — PostToolUse.
 *
 * Reads the Claude Code hook JSON payload on stdin, maps the invoked tool to a
 * workshop milestone, and records it to `.work-status` (dedup) and Airtable.
 *
 * Failures are swallowed — a broken hook must never break the workshop flow.
 */

import { appendFileSync, existsSync, readFileSync, copyFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const JOURNAL = join(ROOT, '.work-status');
const TEMPLATE = join(ROOT, '.work-status.template');
const PARTICIPANT_FILE = join(ROOT, '.workshop-participant');

const MILESTONES = {
  'SETUP-DONE': { phase: '환경설정', label: 'Environment Ready' },
  'RESEARCH-DONE': { phase: '리서치', label: 'Deep Research Done' },
  'PRD-START': { phase: 'PRD', label: 'PRD Started' },
  'PRD-S2': { phase: 'PRD', label: 'PRD Section 2' },
  'PRD-S3': { phase: 'PRD', label: 'PRD Section 3' },
  'PRD-S4': { phase: 'PRD', label: 'PRD Section 4' },
  'PRD-S5': { phase: 'PRD', label: 'PRD Section 5' },
  'PRD-FEATURES': { phase: 'PRD', label: 'PRD Features Defined' },
  'PRD-S7': { phase: 'PRD', label: 'PRD Section 7' },
  'PRD-S8': { phase: 'PRD', label: 'PRD Section 8' },
  'PRD-S9': { phase: 'PRD', label: 'PRD Section 9' },
  'PRD-DONE': { phase: 'PRD', label: 'PRD Complete' },
  'SCAFFOLD-DONE': { phase: '스캐폴딩', label: 'UI Scaffold Done' },
  'DEMO-READY': { phase: '완료', label: 'Demo Ready' },
};

async function main() {
  const raw = await readStdin();
  if (!raw) return;

  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    return;
  }

  const imgCount = detectImageGeneration(payload);
  if (imgCount) {
    const total = incrementImageCount(imgCount);
    await sendImageCountToAirtable(total).catch(() => {});
    return;
  }

  const milestoneId = detectMilestone(payload);
  if (!milestoneId) return;
  if (alreadyRecorded(milestoneId)) return;

  appendJournal(milestoneId);
  await sendToAirtable(milestoneId).catch(() => {});

  if (milestoneId === 'PRD-DONE') {
    process.stderr.write(
      '[workshop-hook] PRD 작성이 완료되었습니다. ' +
        '다음 단계: 사용자에게 "/feature-to-adr f1" 으로 첫 Feature의 ADR 초안을 만들고, ' +
        '확인 후 "/adr-impl f1" 으로 구현하도록 안내하세요. ' +
        'alps-writer plugin이 PRD Section 7을 ADR로 변환한 뒤 코드를 작성합니다.\n',
    );
  }
}

function detectImageGeneration(payload) {
  const toolName = payload.tool_name || payload.toolName;
  if (toolName !== 'mcp__asset-generator__generate_image') return null;
  const input = payload.tool_input || payload.toolInput || {};
  return input.num_images || 1;
}

function incrementImageCount(count) {
  ensureJournal();
  const content = existsSync(JOURNAL) ? readFileSync(JOURNAL, 'utf8') : '';
  const match = content.match(/^IMG_COUNT\t(\d+)/m);
  const prev = match ? parseInt(match[1], 10) : 0;
  const total = prev + count;
  if (match) {
    const updated = content.replace(/^IMG_COUNT\t\d+.*$/m, `IMG_COUNT\t${total}\t${new Date().toISOString()}`);
    writeFileSync(JOURNAL, updated);
  } else {
    appendFileSync(JOURNAL, `IMG_COUNT\t${total}\t${new Date().toISOString()}\n`);
  }
  return total;
}

async function sendImageCountToAirtable(total) {
  const apiKey = process.env.AIRTABLE_API_KEY;
  if (!apiKey) return;
  const baseId = await resolveBaseId(apiKey);
  const tableName = process.env.AIRTABLE_TABLE_NAME || 'Progress';
  if (!baseId) return;
  if (!existsSync(PARTICIPANT_FILE)) return;

  const participant = readFileSync(PARTICIPANT_FILE, 'utf8').trim();
  if (!participant) return;

  const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;
  const body = {
    performUpsert: {
      fieldsToMergeOn: ['Name'],
    },
    records: [
      {
        fields: {
          Name: participant,
          IMG_COUNT: total,
        },
      },
    ],
  };

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };

  const res = await fetch(url, { method: 'PATCH', headers, body: JSON.stringify(body) });

  if (res.status === 422) {
    await ensureRequiredFields(apiKey, baseId, tableName);
    await fetch(url, { method: 'PATCH', headers, body: JSON.stringify(body) });
  }
}

const REQUIRED_FIELDS = [
  { name: 'Name', type: 'singleLineText' },
  { name: 'Phase', type: 'singleSelect', options: { choices: [
    { name: '환경설정' }, { name: '리서치' }, { name: 'PRD' },
    { name: '스캐폴딩' }, { name: '피쳐 개발' }, { name: '완료' },
  ]}},
  { name: 'Milestone_ID', type: 'singleLineText' },
  { name: 'Milestone', type: 'singleLineText' },
  { name: 'Timestamp', type: 'singleLineText' },
  { name: 'Notes', type: 'multilineText' },
  { name: 'IMG_COUNT', type: 'number', options: { precision: 0 } },
];

async function ensureRequiredFields(apiKey, baseId, tableName) {
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };

  const tablesUrl = `https://api.airtable.com/v0/meta/bases/${baseId}/tables`;
  const tablesRes = await fetch(tablesUrl, { headers });
  if (!tablesRes.ok) return;
  const tablesData = await tablesRes.json();
  const table = tablesData.tables?.find((t) => t.name === tableName || t.id === tableName);
  if (!table) return;

  const existingNames = new Set(table.fields.map((f) => f.name));
  const fieldUrl = `https://api.airtable.com/v0/meta/bases/${baseId}/tables/${table.id}/fields`;

  for (const field of REQUIRED_FIELDS) {
    if (existingNames.has(field.name)) continue;
    const body = { name: field.name, type: field.type };
    if (field.options) body.options = field.options;
    await fetch(fieldUrl, { method: 'POST', headers, body: JSON.stringify(body) });
  }
}

function detectMilestone(payload) {
  const toolName = payload.tool_name || payload.toolName;
  const input = payload.tool_input || payload.toolInput || {};

  if (toolName === 'mcp__pdf-reader__read_pdf') {
    const sources = input.sources || [];
    const hasDocsPath = sources.some((s) => {
      const p = String(s.path || s.url || '');
      return p.includes('/docs/') || p.startsWith('docs/');
    });
    if (hasDocsPath) return 'RESEARCH-DONE';
  }

  if (toolName === 'mcp__plugin_alps-writer_alps-writer__save_alps_section') {
    const section = Number(input.section ?? input.section_number ?? input.sectionNumber);
    if (section === 1) return 'PRD-START';
    if (section === 6) return 'PRD-FEATURES';
    if (section >= 2 && section <= 9) return `PRD-S${section}`;
  }

  if (toolName === 'mcp__plugin_alps-writer_alps-writer__export_alps_markdown') {
    return 'PRD-DONE';
  }

  return null;
}

function ensureJournal() {
  if (existsSync(JOURNAL)) return;
  if (existsSync(TEMPLATE)) {
    copyFileSync(TEMPLATE, JOURNAL);
  } else {
    appendFileSync(JOURNAL, '# Workshop progress journal\n');
  }
}

function alreadyRecorded(milestoneId) {
  if (!existsSync(JOURNAL)) return false;
  const content = readFileSync(JOURNAL, 'utf8');
  return content.split('\n').some((line) => {
    const [id] = line.split('\t');
    return id === milestoneId;
  });
}

function appendJournal(milestoneId) {
  ensureJournal();
  appendFileSync(JOURNAL, `${milestoneId}\t${new Date().toISOString()}\n`);
}

async function resolveBaseId(apiKey) {
  if (process.env.AIRTABLE_BASE_ID) return process.env.AIRTABLE_BASE_ID;
  const res = await fetch('https://api.airtable.com/v0/meta/bases', {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  if (!res.ok) return null;
  const data = await res.json();
  const base = data.bases?.[0];
  return base?.id || null;
}

async function sendToAirtable(milestoneId) {
  const apiKey = process.env.AIRTABLE_API_KEY;
  if (!apiKey) return;
  const baseId = await resolveBaseId(apiKey);
  const tableName = process.env.AIRTABLE_TABLE_NAME || 'Progress';
  if (!baseId) return;
  if (!existsSync(PARTICIPANT_FILE)) return;

  const participant = readFileSync(PARTICIPANT_FILE, 'utf8').trim();
  if (!participant) return;

  const info = MILESTONES[milestoneId] || parseFeatureMilestone(milestoneId);
  if (!info) return;

  const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;
  const body = {
    performUpsert: {
      fieldsToMergeOn: ['Name'],
    },
    records: [
      {
        fields: {
          Name: participant,
          Phase: info.phase,
          Milestone_ID: milestoneId,
          Milestone: info.label,
          Timestamp: new Date().toISOString(),
          Notes: 'auto-recorded by workshop-hook',
        },
      },
    ],
  };

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };

  const res = await fetch(url, { method: 'PATCH', headers, body: JSON.stringify(body) });

  if (res.status === 422) {
    await ensureRequiredFields(apiKey, baseId, tableName);
    await fetch(url, { method: 'PATCH', headers, body: JSON.stringify(body) });
  }
}

function parseFeatureMilestone(id) {
  const match = id.match(/^F(\d+)-DONE$/);
  if (!match) return null;
  return { phase: '피쳐 개발', label: `F${match[1]} Complete` };
}

function readStdin() {
  return new Promise((resolve) => {
    let data = '';
    if (process.stdin.isTTY) return resolve('');
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => {
      data += chunk;
    });
    process.stdin.on('end', () => resolve(data));
    process.stdin.on('error', () => resolve(''));
  });
}

main().catch(() => {});
