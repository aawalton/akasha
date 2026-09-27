import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const foodOrDrinkSource = {
  id: "01a060ea-ac63-7f87-bbe2-20c3ae760481",
  type: "page-type/module",
  slug: "food-or-drink-source",
  definition: "the food or drink a build takes, and the boons it gives",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Foods and drinks are read from their pages, in the order of their hash places.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The food and drink pages are held wherever the skill catalogue is held.",
    },
  ],
} as const satisfies Module
