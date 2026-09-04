import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const shalidorLibraryCollections01 = {
  id: "01a06358-4f7c-7b1b-84a4-389f2c548b83",
  pageTypeSlug: "module",
  slug: "shalidor-library-collections-01",
  definition:
    "one run of Shalidor's Library collections, in the order the whole catalog names them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This table is written out from the lore library rather than by hand.",
    },
    {
      invariantKind: "constraint",
      statement: "These entries are one unbroken run of the whole catalog's order.",
    },
    {
      invariantKind: "gap",
      statement: "A collection moved between runs breaks every build hash saved.",
    },
  ],
} as const satisfies Module
