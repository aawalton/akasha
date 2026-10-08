import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleCardFilterText = {
  id: "01a0636c-5da1-769b-b67e-b3290a880057",
  type: "page-type/module",
  slug: "rule-card-filter-text",
  definition: "the text of a rule's filter, edited in place",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement:
        "This cancel and the one in number-badge close over different setters and are not one rule.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The syntax help, placeholder and empty text are rule card phrases.",
    },
  ],
  createdAt: "2026-09-02T18:40:41.377Z",
  updatedAt: "2026-09-27T11:49:23.000Z",
} as const satisfies Module
