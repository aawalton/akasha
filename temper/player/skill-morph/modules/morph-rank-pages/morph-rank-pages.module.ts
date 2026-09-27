import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const morphRankPages = {
  id: "01a0e1b5-bd09-7ac2-8ffe-f2da006a5c0e",
  type: "page-type/module",
  slug: "morph-rank-pages",
  definition:
    "the morph rank cap, bar slot totals and free slot budget an add-on compiles in from pages",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only an add-on reads this, since the pages are written in as it compiles.",
    },
  ],
} as const satisfies Module
