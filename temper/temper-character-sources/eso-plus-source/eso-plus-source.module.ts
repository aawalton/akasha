import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const esoPlusSource = {
  id: "01a060ea-ac63-7845-9a82-f9f16acf19da",
  pageTypeSlug: "module",
  slug: "eso-plus-source",
  definition: "the tenth an ESO Plus subscription adds to what a character earns",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A ESO Plus row's place in this table is the index a build hash carries.",
    },
    {
      invariantKind: "gap",
      statement: "A ESO Plus row moved to another place breaks every build hash saved.",
    },
  ],
} as const satisfies Module
