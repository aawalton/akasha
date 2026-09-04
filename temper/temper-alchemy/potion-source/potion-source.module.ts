import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const potionSource = {
  id: "01a06076-1b6c-74d2-820b-7207017f2a40",
  pageTypeSlug: "module",
  slug: "potion-source",
  definition: "every potion a character drinks, gathered into one table",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A potion's place in this table is the index a build hash carries.",
    },
    {
      invariantKind: "gap",
      statement: "A potion moved to another place breaks every build hash saved.",
    },
  ],
} as const satisfies Module
