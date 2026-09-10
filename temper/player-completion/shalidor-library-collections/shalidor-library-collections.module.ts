import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const shalidorLibraryCollections = {
  id: "01a06358-4f7c-7197-b990-c0ab3d67d74e",
  pageTypeSlug: "module",
  slug: "shalidor-library-collections",
  definition: "the lore collections the Mages Guild keeps under Shalidor's Library",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The selection by category happens where this table is written out.",
    },
    {
      invariantKind: "departure",
      statement: "The category is named by the game index rather than by the title.",
    },
    {
      invariantKind: "departure",
      statement: "These collections are the numbered runs joined in order.",
    },
    {
      invariantKind: "constraint",
      statement: "A reader of this table has no other lore category.",
    },
    {
      invariantKind: "gap",
      statement: "A collection moved between runs breaks every build hash saved.",
    },
  ],
} as const satisfies Module
