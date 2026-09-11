import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const computeItemStock = {
  id: "01a0626e-3e05-7d4e-803d-d88f172652ca",
  type: "module",
  slug: "compute-item-stock",
  definition: "how much of an item an account has, split by who holds it",
  code: "ts",
} as const satisfies Module
