import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const lorebooksBookData67 = {
  id: "01a06180-9f41-7fb3-a52f-1072864d9a7d",
  pageTypeSlug: "module",
  slug: "lorebooks-book-data-67",
  definition: "one run of the Eidetic Memory book table, in the order the whole table names them",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These records are one unbroken run of the whole table's order.",
    },
    {
      invariantKind: "departure",
      statement: "This run is the add-on's own source rather than anything akasha derives.",
    },
  ],
} as const satisfies Module
