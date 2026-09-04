import type { Module } from "@akasha/code-system/module"

export const mapDataZones01 = {
  id: "01a061e1-aea0-7d0b-97a2-70fd0d69c27c",
  pageTypeSlug: "module",
  slug: "map-data-zones-01",
  definition: "part 01 of what each zone holds by way of dungeons, events and subzones",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These rows are what upstream LibMapData v1.21 states.",
    },
  ],
} as const satisfies Module
