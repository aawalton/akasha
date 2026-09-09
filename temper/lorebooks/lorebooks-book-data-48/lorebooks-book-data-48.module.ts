import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const lorebooksBookData48 = {
  id: "01a06180-9f3c-77ff-8371-e30a8c510322",
  pageTypeSlug: "module",
  slug: "lorebooks-book-data-48",
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
