import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const dungeonChampionLookup = {
  id: "01a060f9-bac8-786f-8c5a-fd4bee1b1d16",
  pageTypeSlug: "module",
  slug: "dungeon-champion-lookup",
  definition: "finding the champions of the open map, by map id first and by zone name second",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A map the tables know nothing of answers with nothing.",
    },
  ],
} as const satisfies Module
