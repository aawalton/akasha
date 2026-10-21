import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const staleSheetRows = {
  id: "01a15e44-b15d-7971-9f28-1781c9e634b9",
  type: "page-type/module",
  slug: "stale-sheet-rows",
  definition: "the sheet rows a reading holds from before a respec rather than from its build",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The game's Sprint Speed row can keep a refunded passive's bonus for minutes after a respec.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Every other stat a reading in such a window holds agrees with that reading's build.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A Merciless Charge reading from before the onset fix may hold a refresh's power or none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A missing damage-done row of such a reading is stale, and so is its Bash Damage.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stale row is named by its character, a span of capture seconds and its stats.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stale row is no verified test case, and no stat case pins or gaps it.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "Each window is listed by hand, as nothing in a reading tells a stale row apart.",
    },
  ],
  createdAt: "2026-10-21T11:42:02.588Z",
  updatedAt: "2026-10-21T16:04:54.400Z",
} as const satisfies Module
