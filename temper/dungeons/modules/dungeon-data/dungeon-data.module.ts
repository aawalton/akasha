import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const dungeonData = {
  id: "01a06039-93e4-7633-b4e4-df5f3dcd319a",
  type: "module",
  slug: "dungeon-data",
  definition: "every group dungeon and every undaunted quest giver, written out as code",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from the dungeon pages rather than by hand.",
    },
  ],
} as const satisfies Module
