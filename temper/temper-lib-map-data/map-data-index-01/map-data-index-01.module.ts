import type { Module } from "@akasha/code-system/module"

export const mapDataIndex01 = {
  id: "01a061e1-aea4-70e1-ab44-4d4e180e9d8e",
  pageTypeSlug: "module",
  slug: "map-data-index-01",
  definition: "part 01 of what each map index names by texture, zone and subzone",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These rows are what upstream LibMapData v1.21 states.",
    },
  ],
} as const satisfies Module
