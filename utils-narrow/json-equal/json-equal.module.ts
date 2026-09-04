import type { Module } from "../../code-system/modules/module.page-type.ts"

export const jsonEqual = {
  id: "01a05c94-2bff-77fa-9f06-75e0a4c4a488",
  pageTypeSlug: "module",
  slug: "json-equal",
  definition: "whether two JSON values hold the same thing",
  code: "ts",
} as const satisfies Module
