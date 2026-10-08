import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleCardDestinationTier = {
  id: "01a0636c-5da1-797f-a883-3f02881c0048",
  type: "page-type/module",
  slug: "rule-card-destination-tier",
  definition: "a step of a rule's destination chain",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The tier's name, bound toggle and move and remove labels are rule card phrases.",
    },
  ],
  createdAt: "2026-09-02T18:40:41.377Z",
  updatedAt: "2026-09-27T11:45:58.000Z",
} as const satisfies Module
