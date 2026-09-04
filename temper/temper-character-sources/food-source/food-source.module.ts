import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const foodSource = {
  id: "01a060ea-ac64-70ea-b9fd-ddd3a753f84b",
  pageTypeSlug: "module",
  slug: "food-source",
  definition: "every food a character eats, with the stats each one raises",
  code: "ts",
} as const satisfies Module
