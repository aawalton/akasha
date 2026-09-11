import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const parseString = {
  id: "01a08dfe-7324-7b61-910e-1c7ae0360e2d",
  pageTypeSlug: "module",
  slug: "parse-string",
  definition: "the string a value holds, or the fallback where the value holds no string",
  code: "ts",
} as const satisfies Module
