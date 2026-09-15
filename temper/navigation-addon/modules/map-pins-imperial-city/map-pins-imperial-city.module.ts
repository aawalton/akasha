import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsImperialCity = {
  id: "01a06269-2aca-7d9f-85fe-415b1c3d7b33",
  type: "page-type/module",
  slug: "map-pins-imperial-city",
  definition: "the Imperial City pin places",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
