import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const armorTraits = {
  id: "01a0610f-45b9-7cd1-b86c-956394916d9b",
  pageTypeSlug: "module",
  slug: "armor-traits",
  definition: "every property a piece of player armor is worked with, and what each is worth",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This table is written out from the trait pages rather than by hand.",
    },
    {
      invariantKind: "constraint",
      statement: "A trait's place in this table is the index a build hash carries.",
    },
    {
      invariantKind: "gap",
      statement: "A trait moved to another place breaks every build hash saved.",
    },
  ],
} as const satisfies Module
