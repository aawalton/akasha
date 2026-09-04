import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const loreLibraryData = {
  id: "01a060c0-4132-79dd-8b8e-b38e3eef5ff4",
  pageTypeSlug: "module",
  slug: "lore-library-data",
  definition: "every Mages Guild lore book, under the collection and the category that hold it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This table is captured from the game rather than written by hand.",
    },
    {
      invariantKind: "constraint",
      statement: "The game's report order sets a book's place in this table.",
    },
    {
      invariantKind: "gap",
      statement: "A book moved to another place drifts from the index the game holds.",
    },
  ],
} as const satisfies Module
