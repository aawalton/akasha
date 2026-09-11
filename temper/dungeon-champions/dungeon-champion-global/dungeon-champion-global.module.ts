import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const dungeonChampionGlobal = {
  id: "01a060f9-bac1-7e35-a978-59c345fb4cb1",
  type: "module",
  slug: "dungeon-champion-global",
  definition: "the name and version another addon reads off this one",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This global is the addon's own name rather than a name the game owns.",
    },
  ],
} as const satisfies Module
