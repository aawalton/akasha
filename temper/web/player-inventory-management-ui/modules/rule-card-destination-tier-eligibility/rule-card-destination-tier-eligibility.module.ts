import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleCardDestinationTierEligibility = {
  id: "01a0636c-5da1-7c94-bd1e-ec989a3c0047",
  type: "page-type/module",
  slug: "rule-card-destination-tier-eligibility",
  definition: "whether a destination tier is open to a rule",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Headings are condition field titles, modes condition values, the rest rule card phrases.",
    },
  ],
  createdAt: "2026-09-02T18:40:41.377Z",
  updatedAt: "2026-09-27T11:45:58.000Z",
} as const satisfies Module
