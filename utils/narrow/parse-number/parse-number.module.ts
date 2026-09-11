import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const parseNumber = {
  id: "01a08e16-6948-788d-a6d2-9541bbdc2eb9",
  pageTypeSlug: "module",
  type: "module",
  slug: "parse-number",
  definition: "the number a value holds, or nothing where the value holds no number",
  code: "ts",
} as const satisfies Module
