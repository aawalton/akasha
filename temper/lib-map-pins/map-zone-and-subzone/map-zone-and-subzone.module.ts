import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const mapZoneAndSubzone = {
  id: "01a06062-57df-7104-bc26-9f652527265d",
  type: "module",
  slug: "map-zone-and-subzone",
  definition: "the current map's texture name split into zone and subzone",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The zone name is taken from the map tile texture path.",
    },
    {
      invariantKind: "departure",
      statement: "Reading the player's position moves the map to the player first.",
    },
  ],
} as const satisfies Module
