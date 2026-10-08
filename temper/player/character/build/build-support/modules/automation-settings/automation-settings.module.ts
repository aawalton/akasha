import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const automationSettings = {
  id: "01a0609f-53f9-741e-ad0d-f6c482c8057e",
  type: "page-type/module",
  slug: "automation-settings",
  definition: "which chores are done for a character or companion without a request",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A toggle set on one character outranks the same toggle set across all characters.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A toggle set nowhere is off.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character has a toggle for each crafting writ the game gives out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A companion has fewer toggles than a character.",
    },
  ],
  createdAt: "2026-09-02T05:37:29.593Z",
  updatedAt: "2026-09-22T13:48:32.000Z",
} as const satisfies Module
