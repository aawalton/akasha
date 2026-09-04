import type { Module } from "@akasha/code-system/module"

export const mapDataZones00 = {
  id: "01a061e1-ae9e-7f12-a54d-11401f2af874",
  pageTypeSlug: "module",
  slug: "map-data-zones-00",
  definition: "part 00 of what each zone holds by way of dungeons, events and subzones",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These rows are what upstream LibMapData v1.21 states.",
    },
  ],
} as const satisfies Module
