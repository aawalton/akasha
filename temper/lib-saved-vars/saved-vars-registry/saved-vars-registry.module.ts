import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const savedVarsRegistry = {
  id: "01a06177-abfa-7858-a67f-0c74e2b865b5",
  type: "module",
  slug: "saved-vars-registry",
  definition: "the single table with the library, the manager class and the data class",
  code: "ts",
} as const satisfies Module
