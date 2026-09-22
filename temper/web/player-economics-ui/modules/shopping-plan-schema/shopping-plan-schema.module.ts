import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const shoppingPlanSchema = {
  id: "01a063a1-8cc1-700b-9802-5c6240a89c0e",
  type: "page-type/module",
  slug: "shopping-plan-schema",
  definition: "a shopping plan's shape",
  code: "ts",
  test: "ts",
} as const satisfies Module
