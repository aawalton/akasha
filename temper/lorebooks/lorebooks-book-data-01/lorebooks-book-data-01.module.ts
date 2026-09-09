import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const lorebooksBookData01 = {
  id: "01a0617f-9260-7a7a-8d9f-22a4c3755a4b",
  pageTypeSlug: "module",
  slug: "lorebooks-book-data-01",
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
