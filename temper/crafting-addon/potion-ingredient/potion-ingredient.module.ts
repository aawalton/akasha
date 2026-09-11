import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const potionIngredient = {
  id: "01a061c7-e87e-71fe-9284-136a2bd9947a",
  type: "module",
  slug: "potion-ingredient",
  definition: "one reagent as the window shows it, with its traits and its count",
  code: "ts",
} as const satisfies Module
