import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionCardTaskProgress = {
  id: "01a0641c-83b4-7fba-b338-0d13a366420a",
  type: "page-type/module",
  slug: "completion-card-task-progress",
  definition: "how far along a completion card is for a character, card by card",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A card counted its own way is answered here before the generic count is reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A card only a daily task names is unmeasured.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A card measured by nothing is named here, so a caller can tell it from a gap.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An antiquity lead is measured by nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill line a character cannot use is unmeasured for that character.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The antiquity-lore catalog is handed in rather than imported.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The antiquity-lore card is answered by the account checker the generic count reaches.",
    },
  ],
} as const satisfies Module
