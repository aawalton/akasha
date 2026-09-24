import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const armorWeights = {
  id: "01a0616f-8e17-7f39-850b-c2da8d153a31",
  type: "page-type/module",
  slug: "armor-weights",
  definition: "the armor weights a piece is made in, and what wearing each is worth",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This table is written out from the armor weight pages rather than by hand.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A weight's place in this table is the index a build hash has.",
    },
    {
      decisionKind: "decision-kind/upkeep",
      statement: "The key order of this table is the wire order.",
    },
    {
      decisionKind: "decision-kind/upkeep",
      statement: "The order of the armor weight id union is not the wire order.",
    },
    {
      decisionKind: "decision-kind/upkeep",
      statement: "The generator writes this table outside akasha.",
    },
  ],
  hashIndexed: ["STANDARD_TEMPER_ARMOR_WEIGHTS_BY_ID"],
} as const satisfies Module
