import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const lorebooksBookData03 = {
  id: "01a0617f-9261-76e4-9990-6059cc3b5398",
  pageTypeSlug: "module",
  slug: "lorebooks-book-data-03",
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
