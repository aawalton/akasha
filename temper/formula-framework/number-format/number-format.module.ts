import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const numberFormat = {
  id: "01a06070-82e3-7758-8aab-8b86b52f5188",
  pageTypeSlug: "module",
  type: "module",
  slug: "number-format",
  definition: "a number written out as an integer, a percentage or an abbreviated thousand",
  code: "ts",
} as const satisfies Module
