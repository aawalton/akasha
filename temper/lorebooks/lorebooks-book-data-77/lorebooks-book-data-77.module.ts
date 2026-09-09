import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const lorebooksBookData77 = {
  id: "01a06180-9f44-7a1e-be3d-9206be92be3c",
  pageTypeSlug: "module",
  slug: "lorebooks-book-data-77",
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
