import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const computeItemStock = {
  id: "01a0626e-3e05-7d4e-803d-d88f172652ca",
  pageTypeSlug: "module",
  slug: "compute-item-stock",
  definition: "how much of an item an account holds, split by who holds it",
  code: "ts",
} as const satisfies Module
