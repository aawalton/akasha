import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const shoppingSseReader = {
  id: "01a063a1-8cc1-700e-a14c-4e6635e9e0a4",
  pageTypeSlug: "module",
  slug: "shopping-sse-reader",
  definition: "a server-sent event stream read into frames",
  code: "ts",
  test: "ts",
} as const satisfies Module
