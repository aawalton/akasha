import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const isJson = {
  id: "01a05c94-2bfe-7508-818e-d62e8ebe8b4b",
  pageTypeSlug: "module",
  type: "module",
  slug: "is-json",
  definition: "whether a value is JSON",
  code: "ts",
} as const satisfies Module
