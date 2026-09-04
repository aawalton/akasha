import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const dungeonChampionGlobal = {
  id: "01a060f9-bac1-7e35-a978-59c345fb4cb1",
  pageTypeSlug: "module",
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
