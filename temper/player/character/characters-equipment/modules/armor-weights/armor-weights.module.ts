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
      statement: "The weights are read from the armor weight pages in hash-place order.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A weight's place in this table is the index a build hash has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A weight's armor value at a quality is the grade under its page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A weight with no grade at a quality is worth no armor there.",
    },
  ],
} as const satisfies Module
