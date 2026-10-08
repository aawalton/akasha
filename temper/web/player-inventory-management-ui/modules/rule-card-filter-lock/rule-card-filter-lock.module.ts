import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleCardFilterLock = {
  id: "01a0636c-5da1-7dcb-b5d1-5c73741c0056",
  type: "page-type/module",
  slug: "rule-card-filter-lock",
  definition: "the lock keeping one of a rule's filters from changing",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The lock's aria-label and dialog title are rule card phrases.",
    },
  ],
  createdAt: "2026-09-02T18:40:41.377Z",
  updatedAt: "2026-09-27T11:14:17.000Z",
} as const satisfies Module
