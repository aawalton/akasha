import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const libSetsDebugCasts = {
  id: "01a0623c-2df7-7e8f-88ec-3b45fe5f6a6f",
  pageTypeSlug: "module",
  type: "module",
  slug: "lib-sets-debug-casts",
  definition: "the narrowings for the saved-variable tables the debug scans write",
  code: "ts",
} as const satisfies Module
