import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const armorTraitEffects = {
  id: "01a0616f-8e16-76df-997d-3945e96d8d4b",
  type: "page-type/module",
  slug: "armor-trait-effects",
  definition: "the effects a worn piece of armor gets from its trait",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Divines sums each piece's unrounded worth and rounds the sum half up to a tenth of a percent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each piece's worth is added as a whole number of thousandths of a percent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stone's value under Divines is its base times one plus that sum, rounded down.",
    },
  ],
  createdAt: "2026-09-02T09:24:55.958Z",
  updatedAt: "2026-10-19T21:55:37.021Z",
} as const satisfies Module
