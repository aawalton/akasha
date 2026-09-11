import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const histoireCategoryProcessors = {
  id: "01a06197-4c8f-7fbc-9c17-92210e2bbb67",
  type: "module",
  slug: "histoire-category-processors",
  definition: "the processors a category cache hands each event to",
  code: "ts",
} as const satisfies Module
