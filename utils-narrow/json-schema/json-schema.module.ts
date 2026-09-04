import type { Module } from "../../code-system/modules/module.page-type.ts"

export const jsonSchema = {
  id: "01a05c94-2c00-755f-a891-9818909b61b2",
  pageTypeSlug: "module",
  slug: "json-schema",
  definition: "the parser that admits a JSON value and refuses what is not one",
  code: "ts",
} as const satisfies Module
