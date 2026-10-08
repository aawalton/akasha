import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const foodDrinkSelectDialog = {
  id: "01a0642c-5b7b-7b1e-be93-023c56c07429",
  type: "page-type/module",
  slug: "food-drink-select-dialog",
  definition: "the dialog selecting a food or a drink",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Its wording is read from web phrase pages and the food and drink item type pages.",
    },
  ],
  createdAt: "2026-09-02T22:10:23.739Z",
  updatedAt: "2026-09-27T11:31:29.000Z",
} as const satisfies Module
