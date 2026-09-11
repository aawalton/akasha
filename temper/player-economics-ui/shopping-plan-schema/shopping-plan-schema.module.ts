import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const shoppingPlanSchema = {
  id: "01a063a1-8cc1-700b-9802-5c6240a89c0e",
  pageTypeSlug: "module",
  type: "module",
  slug: "shopping-plan-schema",
  definition: "the shape a shopping plan arrives in",
  code: "ts",
  test: "ts",
} as const satisfies Module
