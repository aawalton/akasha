import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const dungeonChampionMapZone = {
  id: "01a060f9-bac9-786e-a896-0143797eade0",
  pageTypeSlug: "module",
  slug: "dungeon-champion-map-zone",
  definition: "which zone and subzone the open map shows, read from the map tile texture",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The zone is read from a texture path rather than asked of the game.",
    },
  ],
} as const satisfies Module
