import type { Module } from "@akasha/code-system/module"

export const destinationsPoiData10 = {
  id: "01a06269-29cd-762f-a97a-18de36c7f376",
  pageTypeSlug: "module",
  slug: "destinations-poi-data-10",
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
