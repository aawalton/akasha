import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const searchReconstructionCostFilter = {
  id: "01a198bd-924c-7d83-b6fe-ecf353c2a61c",
  type: "page-type/module",
  slug: "search-reconstruction-cost-filter",
  definition:
    "the crystals a set item's reconstruction costs, narrowed by the most a player would pay",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An item matches where its set costs at most the stated crystals to reconstruct.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item whose reconstruction cost is unknown is never matched.",
    },
  ],
  createdAt: "2026-11-01T20:12:03.020Z",
  updatedAt: "2026-11-01T20:12:03.020Z",
} as const satisfies Module
