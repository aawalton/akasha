import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const lorebooksBookData41 = {
  id: "01a0617f-926e-78e3-b089-f2a568e0cb83",
  pageTypeSlug: "module",
  slug: "lorebooks-book-data-41",
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
