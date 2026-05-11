---
title: 'Review and Edit the PRD'
weight: 20
---

Review the generated PRD and adjust whatever needs changing. Just talk to the AI as you would a colleague.

## Open the PRD file

The easiest way to review the ALPS document is to ask Claude Code directly. In the 💬 Claude Code chat:

:::code{showCopyAction=true showLineNumbers=false language=text}
I want to review @docs/prd/XYZ.alps.md — please show it section by section.
:::

::alert[The file name varies by service name. Type `@docs/prd/` and press Tab to autocomplete.]{type="info"}

::alert[If you want to open the file directly, navigate to `Desktop > ui-poc-workspace > docs > prd` and double-click the `.alps.md` file.]{type="info"}

## PRD review checklist

Check the following in the generated ALPS document:

1. **Product overview** (Section 1) — do the vision and target users match your idea?
2. **MVP goals** (Section 2) — are the hypotheses and metrics realistic?
3. **Demo scenarios** (Section 3) — do the key user journeys feel natural?
4. **Architecture** (Section 4) — is the system shape appropriate?
5. **Design spec** (Section 5) — are the key screen layouts and flows intuitive?
6. **Feature list** (Section 6) — are the features and their priorities appropriate?
7. **Feature details** (Section 7) — are user stories and acceptance criteria clear?
8. **Metrics** (Section 8) — are the success/failure criteria concrete?
9. **Out of scope** (Section 9) — are the MVP exclusions reasonable?

## Example edit requests

If you don't like something in the PRD, ask for changes freely.

| Situation            | Example prompt                                              |
| -------------------- | ----------------------------------------------------------- |
| Add a feature        | "Replace the login feature with a dashboard feature as F1." |
| Remove a feature     | "F5 is unnecessary for the MVP — remove it."                |
| Re-prioritize        | "Raise F3's priority to High."                              |
| Fill in more detail  | "Write F2's user story in more concrete terms."             |
| Understand a feature | "Walk me through F3's user flow from start to finish."      |

## Use questions

Ask anything that's unclear while the PRD takes shape.

- "Who are the target users of this feature?"
- "What's the advantage of this feature vs. competitor A?"
- "Trim the feature list down to only what's essential for the MVP."
- "Walk me through the user flow end to end."

::alert[It pays to review the PRD thoroughly before development. You can change it later, but getting direction right up front saves a lot of development time.]{type="info"}

## Completion check

When the PRD review is done, make sure:

- [ ] You have a reasonable Feature list of 3–5 items
- [ ] Each Feature has a user story and acceptance criteria
- [ ] The implementation order (F1 → F2 → ...) is logical

Once that's in place, move on to the next lab.
