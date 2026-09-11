import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const interfaceLoad = {
  id: "01a06115-1ada-7ea2-9ac4-ca13ab404a42",
  pageTypeSlug: "module",
  type: "module",
  slug: "interface-load",
  definition: "what the interface add-on runs once the game says it is loaded",
  code: "ts",
} as const satisfies Module
