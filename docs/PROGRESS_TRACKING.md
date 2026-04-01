# Workshop Progress Tracking

This document defines when and how the agent must report workshop progress to Airtable.

## Prerequisites

Tracking is active only when **both** conditions are met:

1. `.workshop-participant` file exists (contains participant name)
2. Airtable MCP server is available (`AIRTABLE_API_KEY` set)

If either is missing, skip silently — never block the workshop flow.

## Stage Transition Triggers

After each triggering action completes successfully, the agent must run `/workshop-status <MILESTONE_ID>` **automatically without asking the user**.

| Trigger Condition | Milestone ID |
|---|---|
| `pnpm install` succeeds + dev server verified | `SETUP-DONE` |
| PDF file saved to `docs/` | `RESEARCH-DONE` |
| ALPS Section 1 saved (`save_alps_section`) | `PRD-START` |
| ALPS Section 6 saved (`save_alps_section`) | `PRD-FEATURES` |
| ALPS Section 9 saved (`save_alps_section`) | `PRD-DONE` |
| `/scaffold-ui` completes (`layouts/` dir created) | `SCAFFOLD-DONE` |
| Feature N implementation committed (`git commit`) | `FN-DONE` |
| All core features implemented + user confirms | `DEMO-READY` |

## Rules

- Report each milestone **once**. Do not re-report a milestone already recorded.
- Execute the status update **after** the triggering action, not before.
- On failure (Airtable API error, network issue), log the error but do not retry or block.

## Example

```
User: "pnpm install 해줘"
Agent: (runs pnpm install, succeeds)
Agent: (auto-runs /workshop-status SETUP-DONE)
Agent: "설치 완료했습니다. 진행 상태가 공유되었습니다: 환경설정 — Environment Ready"
```
