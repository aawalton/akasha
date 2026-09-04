import type { Module } from "@akasha/code-system/module"

export const mapDataIndex00 = {
  id: "01a061e1-aea3-78f7-9287-3c987cf5bf24",
  pageTypeSlug: "module",
  slug: "map-data-index-00",
  definition: "part 00 of what each map index names by texture, zone and subzone",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These rows are what upstream LibMapData v1.21 states.",
    },
  ],
} as const satisfies Module
