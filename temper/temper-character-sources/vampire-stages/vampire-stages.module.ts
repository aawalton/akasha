import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const vampireStages = {
  id: "01a060ea-ac65-780c-876f-8ff34a264cc4",
  pageTypeSlug: "module",
  slug: "vampire-stages",
  definition: "the five stages of vampirism, each feeding a character more penalty",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from the character pages rather than by hand.",
    },
    {
      invariantKind: "constraint",
      statement: "A vampire stage's place in this table is the index a build hash carries.",
    },
    {
      invariantKind: "gap",
      statement: "A vampire stage moved to another place breaks every build hash saved.",
    },
  ],
} as const satisfies Module
