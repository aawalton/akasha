import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const armorWeightIds = {
  id: "01a060f0-3eac-71f4-ab24-ac7b5ad15139",
  pageTypeSlug: "module",
  slug: "armor-weight-ids",
  definition: "the weight classes a piece of body armor or a shield is made in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "This module names the armor weights without naming any order among the armor weights.",
    },
  ],
} as const satisfies Module
