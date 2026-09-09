import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const lorebooksBookData34 = {
  id: "01a0617f-926c-7f3d-9f6b-8bb14b63c211",
  pageTypeSlug: "module",
  slug: "lorebooks-book-data-34",
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
