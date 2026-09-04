import type { Module } from "@akasha/code-system/module"

export const characterCapturePotionMap = {
  id: "01a0616b-4d67-7eae-a7e9-5dba894d679f",
  pageTypeSlug: "module",
  slug: "character-capture-potion-map",
  definition: "each potion's item id and packed effects against its place in a build hash",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A place in this table is the number a saved build hash carries.",
    },
    {
      invariantKind: "gap",
      statement: "An entry moved to another place misreads every build hash already saved.",
    },
  ],
} as const satisfies Module
