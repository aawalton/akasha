import type { Module } from "../../code-system/modules/module.page-type.ts"

export const requireOnly = {
  id: "01a05c94-2c02-7dcd-a343-76adc276594d",
  pageTypeSlug: "module",
  slug: "require-only",
  definition: "the one element of an array, refused where there is any other count",
  code: "ts",
} as const satisfies Module
