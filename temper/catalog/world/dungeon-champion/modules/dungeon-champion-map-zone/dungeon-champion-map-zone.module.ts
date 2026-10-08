import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dungeonChampionMapZone = {
  id: "01a060f9-bac9-786e-a896-0143797eade0",
  type: "page-type/module",
  slug: "dungeon-champion-map-zone",
  definition: "which zone and subzone the open map shows, read from the map tile texture",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The zone is read from a texture path rather than asked of the game.",
    },
  ],
  createdAt: "2026-09-02T07:16:14.153Z",
  updatedAt: "2026-09-21T15:28:00.000Z",
} as const satisfies Module
