import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleCardPriorityRow = {
  id: "01a0636c-5da1-7972-b184-8ff940ed005a",
  type: "page-type/module",
  slug: "rule-card-priority-row",
  definition: "the row where a rule's priority is set",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The active and lock toggles are worded by rule card phrases.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every word the row shows, the item count included, is a rule card phrase.",
    },
  ],
} as const satisfies Module
