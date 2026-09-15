import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRulesUnread = {
  id: "01a0976a-31b2-7c40-9f5e-6b0d4a2e77c1",
  type: "page-type/module",
  slug: "inventory-rules-unread",
  definition: "what a reader is shown in place of rules the read refused",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The words shown are the ones the read refused with.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No rule is shown beside them, so none is acted on as if it were whole.",
    },
  ],
} as const satisfies Module
