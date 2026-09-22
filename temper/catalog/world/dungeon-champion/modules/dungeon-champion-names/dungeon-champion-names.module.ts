import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dungeonChampionNames = {
  id: "01a060f9-baca-7e73-b37a-1f69b51ac984",
  type: "page-type/module",
  slug: "dungeon-champion-names",
  definition: "the addon's own name and version, and the four keys its map pins answer to",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The pin keys here are the keys the map and the compass are told.",
    },
  ],
} as const satisfies Module
