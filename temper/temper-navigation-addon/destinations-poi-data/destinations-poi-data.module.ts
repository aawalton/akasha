import type { Module } from "@akasha/code-system/module"

export const destinationsPoiData = {
  id: "01a06269-29d5-74ec-bf81-bd99d40f7eec",
  pageTypeSlug: "module",
  slug: "destinations-poi-data",
  definition:
    "the keeps, the points of interest by zone and the dungeon item sets, joined from its runs",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the runs joined in order.",
    },
  ],
} as const satisfies Module
