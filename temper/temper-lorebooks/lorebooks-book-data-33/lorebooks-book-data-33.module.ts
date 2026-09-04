import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const lorebooksBookData33 = {
  id: "01a0617f-926b-7774-901d-f26c7acc51b3",
  pageTypeSlug: "module",
  slug: "lorebooks-book-data-33",
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
