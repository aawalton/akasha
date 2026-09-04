import type { Module } from "@akasha/code-system/module"

export const characterCaptureFoodMap = {
  id: "01a0616b-a193-7b4e-8eda-59845fbc07d4",
  pageTypeSlug: "module",
  slug: "character-capture-food-map",
  definition: "each food and drink buff's ability id against its place in a build hash",
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
