import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const jewelrySlots = {
  id: "01a060b8-08c5-7b3b-a995-798d59d45760",
  pageTypeSlug: "module",
  slug: "jewelry-slots",
  definition: "the necklace and the two ring positions a character wears jewelry at",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A jewelry slot's place in this table is the index a build hash carries.",
    },
    {
      invariantKind: "gap",
      statement: "A jewelry slot moved to another place breaks every build hash saved.",
    },
  ],
} as const satisfies Module
