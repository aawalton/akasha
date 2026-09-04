import type { Module } from "@akasha/code-system/module"

export const mapDataIndex03 = {
  id: "01a061e1-aea6-73c0-9b34-ade691475dca",
  pageTypeSlug: "module",
  slug: "map-data-index-03",
  definition: "part 03 of what each map index names by texture, zone and subzone",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These rows are what upstream LibMapData v1.21 states.",
    },
  ],
} as const satisfies Module
