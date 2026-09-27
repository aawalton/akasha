import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const morphRanks = {
  id: "01a0e1b5-bd09-779d-9966-c0790f231c9e",
  type: "page-type/module",
  slug: "morph-ranks",
  definition: "the ranks a skill and its two morphs count for, up to the rank cap handed in",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The web and server hold the cap from the morph completion pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Code an add-on reaches takes the cap as a parameter.",
    },
  ],
} as const satisfies Module
