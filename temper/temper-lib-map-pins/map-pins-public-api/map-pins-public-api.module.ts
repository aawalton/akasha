import type { Module } from "@akasha/code-system/module"

export const mapPinsPublicApi = {
  id: "01a06062-57e1-7ce0-8c2d-76ec355c8351",
  pageTypeSlug: "module",
  slug: "map-pins-public-api",
  definition: "the names the map pin library puts in the game's global table",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The library object is reached through one global name.",
    },
  ],
} as const satisfies Module
