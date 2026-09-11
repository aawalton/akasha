import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const sourceLookup = {
  id: "01a0612f-aae9-7688-9105-394018012b9d",
  type: "module",
  slug: "source-lookup",
  definition: "one entry read out of a source collection, answering null for the sentinel id",
  code: "ts",
} as const satisfies Module
