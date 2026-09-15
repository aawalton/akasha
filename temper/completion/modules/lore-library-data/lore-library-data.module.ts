import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const loreLibraryData = {
  id: "01a060c0-4132-79dd-8b8e-b38e3eef5ff4",
  type: "module",
  slug: "lore-library-data",
  definition: "every Mages Guild lore book, under the collection and the category that have it",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "This table is captured from the game rather than written by hand.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The game's report order sets a book's place in this table.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A book moved to another place drifts from the index the game has.",
    },
  ],
} as const satisfies Module
