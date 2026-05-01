#!/usr/bin/env node
/**
 * Workshop progress hook — PostToolUse.
 *
 * Reads the Claude Code hook JSON payload on stdin, maps the invoked tool to a
 * workshop milestone, and records it to `.work-status` (dedup) and Airtable.
 *
 * Failures are swallowed — a broken hook must never break the workshop flow.
 */

import { appendFileSync, existsSync, readFileSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const JOURNAL = join(ROOT, '.work-status');
const TEMPLATE = join(ROOT, '.work-status.template');
const PARTICIPANT_FILE = join(ROOT, '.workshop-participant');

const MILESTONES = {
  'RESEARCH-DONE': { phase: '리서치', label: 'Deep Research Done' },
  'PRD-START': { phase: 'PRD', label: 'PRD Started' },
  'PRD-FEATURES': { phase: 'PRD', label: 'PRD Features Defined' },
  'PRD-DONE': { phase: 'PRD', label: 'PRD Complete' },
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

  const milestoneId = detectMilestone(payload);
  if (!milestoneId) return;
  if (alreadyRecorded(milestoneId)) return;

  appendJournal(milestoneId);
  await sendToAirtable(milestoneId).catch(() => {});
}

function detectMilestone(payload) {
  const toolName = payload.tool_name || payload.toolName;
  const input = payload.tool_input || payload.toolInput || {};

  if (toolName === 'mcp__pdf-reader__read_pdf') {
    const path = String(input.path || input.source || input.file || '');
    if (path.includes('/docs/') || path.startsWith('docs/')) {
      return 'RESEARCH-DONE';
    }
  }

  if (toolName === 'mcp__alps-writer__save_alps_section') {
    const section = Number(input.section ?? input.section_number ?? input.sectionNumber);
    if (section === 1) return 'PRD-START';
    if (section === 6) return 'PRD-FEATURES';
  }

  if (toolName === 'mcp__alps-writer__export_alps_markdown') {
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

async function sendToAirtable(milestoneId) {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME || 'Progress';
  if (!apiKey || !baseId) return;
  if (!existsSync(PARTICIPANT_FILE)) return;

  const participant = readFileSync(PARTICIPANT_FILE, 'utf8').trim();
  if (!participant) return;

  const info = MILESTONES[milestoneId];
  if (!info) return;

  const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;
  const body = {
    fields: {
      Participant: participant,
      Phase: info.phase,
      Milestone_ID: milestoneId,
      Milestone: info.label,
      Timestamp: new Date().toISOString(),
      Details: 'auto-recorded by workshop-hook',
    },
  };

  await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
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
