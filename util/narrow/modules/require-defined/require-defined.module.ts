import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const requireDefined = {
  id: "01a06057-3679-7dd4-b797-e40ad426b9dd",
  type: "page-type/module",
  slug: "require-defined",
  definition: "a value refused where nothing is there",
  code: "ts",
} as const satisfies Module
