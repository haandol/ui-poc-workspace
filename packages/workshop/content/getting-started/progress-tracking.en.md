---
title: 'Progress Tracking (Optional)'
weight: 35
---

If you set up the Airtable integration, your workshop progress is recorded automatically. This lets the facilitator see each participant's current status in real time.

## Milestones recorded automatically

The milestones below are recorded **automatically** as you work through the labs. No extra action is required.

| Milestone               | When it's recorded                                                          | Lab   |
| ----------------------- | --------------------------------------------------------------------------- | ----- |
| `RESEARCH-DONE`         | The moment Claude Code reads the research PDF                               | Lab 1 |
| `PRD-START`             | When ALPS Section 1 is saved                                                | Lab 2 |
| `PRD-FEATURES`          | When ALPS Section 6 (feature list) is saved                                 | Lab 2 |
| `PRD-DONE`              | When the ALPS document is exported                                          | Lab 2 |
| `SCAFFOLD-DONE`         | After the dev server is confirmed running and you ask for the first feature | Lab 3 |
| `F1-DONE`, `F2-DONE`, … | After each feature implementation is complete and reported                  | Lab 3 |
| `DEMO-READY`            | When you announce the demo is ready                                         | Lab 3 |

## Notes

- Duplicate entries are filtered out automatically.
- To opt out for the current session, tell Claude Code `"stop sharing progress"`.
- You can check your current status at any time with the `/workshop-status` command.
