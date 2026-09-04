import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const lorebooksBookData = {
  id: "01a06184-3d7a-7159-9078-b8208d5ec58b",
  pageTypeSlug: "module",
  slug: "lorebooks-book-data",
  definition: "the whole Eidetic Memory book table, gathered from its runs in order",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The runs are gathered in the order the whole table names.",
    },
    {
      invariantKind: "gap",
      statement: "Akasha holds no map pin for a lore book.",
    },
  ],
} as const satisfies Module
