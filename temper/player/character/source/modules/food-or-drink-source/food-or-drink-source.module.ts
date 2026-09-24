import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const foodOrDrinkSource = {
  id: "01a060ea-ac63-7f87-bbe2-20c3ae760481",
  type: "page-type/module",
  slug: "food-or-drink-source",
  definition: "food and drink put into the table holding a build's single picked row",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A food or drink's place in this table is the index a build hash has.",
    },
  ],
  hashIndexed: ["FOOD_OR_DRINK"],
} as const satisfies Module
