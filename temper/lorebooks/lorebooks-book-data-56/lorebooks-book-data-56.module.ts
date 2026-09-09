import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const lorebooksBookData56 = {
  id: "01a06180-9f3e-7da7-b894-3ec4a1fd4f85",
  pageTypeSlug: "module",
  slug: "lorebooks-book-data-56",
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
