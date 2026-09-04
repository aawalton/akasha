import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const foodOrDrinkSource = {
  id: "01a060ea-ac63-7f87-bbe2-20c3ae760481",
  pageTypeSlug: "module",
  slug: "food-or-drink-source",
  definition: "food and drink gathered into the one table a build picks a single row from",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A food or drink's place in this table is the index a build hash carries.",
    },
    {
      invariantKind: "gap",
      statement: "A food or drink moved to another place breaks every build hash saved.",
    },
  ],
} as const satisfies Module
