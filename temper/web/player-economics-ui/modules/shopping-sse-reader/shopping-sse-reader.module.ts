import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const shoppingSseReader = {
  id: "01a063a1-8cc1-700e-a14c-4e6635e9e0a4",
  type: "page-type/module",
  slug: "shopping-sse-reader",
  definition: "a server-sent event stream turned into frames",
  code: "ts",
  test: "ts",
} as const satisfies Module
