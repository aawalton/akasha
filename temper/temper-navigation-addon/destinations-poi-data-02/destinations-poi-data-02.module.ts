import type { Module } from "@akasha/code-system/module"

export const destinationsPoiData02 = {
  id: "01a06269-29c4-7c85-a2e4-2b86aea17f4d",
  pageTypeSlug: "module",
  slug: "destinations-poi-data-02",
  definition: "one run of the keeps, the points of interest by zone and the dungeon item sets",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The records here are one unbroken run of the table's order.",
    },
    {
      invariantKind: "departure",
      statement: "The run is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
