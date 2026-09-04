import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const lorebooksBookData73 = {
  id: "01a06180-9f43-7892-99a2-b307b23ae6cb",
  pageTypeSlug: "module",
  slug: "lorebooks-book-data-73",
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
