import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const weaponTraits = {
  id: "01a0610f-45bb-7d20-aedf-7d954ebf2ec5",
  pageTypeSlug: "module",
  slug: "weapon-traits",
  definition: "every property a piece of player weapon is worked with, and what each is worth",
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
