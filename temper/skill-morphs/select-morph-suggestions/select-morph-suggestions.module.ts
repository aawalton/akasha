import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const selectMorphSuggestions = {
  id: "01a061c7-0738-7680-9047-39f48a26053e",
  type: "module",
  slug: "select-morph-suggestions",
  definition: "the morphs a character is told to level next, ranked and capped",
  code: "ts",
} as const satisfies Module
