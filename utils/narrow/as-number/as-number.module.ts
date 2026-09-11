import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const asNumber = {
  id: "01a081ad-4f44-76c3-86ed-3072f3101047",
  pageTypeSlug: "module",
  type: "module",
  slug: "as-number",
  definition: "a number read from a value that may spell one as text",
  code: "ts",
} as const satisfies Module
