import type { Module } from "@akasha/code-system/module"

export const mapDataZones02 = {
  id: "01a061e1-aea1-7525-bd41-514e9523bd80",
  pageTypeSlug: "module",
  slug: "map-data-zones-02",
  definition: "part 02 of what each zone holds by way of dungeons, events and subzones",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These rows are what upstream LibMapData v1.21 states.",
    },
  ],
} as const satisfies Module
