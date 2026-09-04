import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const shoppingPlanSchema = {
  id: "01a063a1-8cc1-700b-9802-5c6240a89c0e",
  pageTypeSlug: "module",
  slug: "shopping-plan-schema",
  definition: "the shape a shopping plan arrives in",
  code: "ts",
  test: "ts",
} as const satisfies Module
