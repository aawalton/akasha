import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const ratingChance = {
  id: "01a06070-82e3-7292-b23c-c6010db8ce2b",
  type: "module",
  slug: "rating-chance",
  definition: "the chance a rating buys and how much rating is left over",
  code: "ts",
} as const satisfies Module
