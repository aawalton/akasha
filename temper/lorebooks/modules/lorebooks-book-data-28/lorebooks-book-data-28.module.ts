import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const lorebooksBookData28 = {
  id: "01a0617f-926a-703d-9742-b85fa38cdee0",
  type: "module",
  slug: "lorebooks-book-data-28",
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
