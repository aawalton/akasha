import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const drinkSource = {
  id: "01a060ea-ac62-79f4-bfc3-6d86845bdd8a",
  pageTypeSlug: "module",
  slug: "drink-source",
  definition: "every drink a character takes, with the stats each one raises",
  code: "ts",
} as const satisfies Module
