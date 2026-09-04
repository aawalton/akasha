import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const lorebooksLibraryData = {
  id: "01a06184-3d7d-7bc3-be91-252472ceedf7",
  pageTypeSlug: "module",
  slug: "lorebooks-library-data",
  definition: "the whole Eidetic Memory collection table, gathered from its runs in order",
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
