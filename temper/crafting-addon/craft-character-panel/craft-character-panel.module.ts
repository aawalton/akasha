import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const craftCharacterPanel = {
  id: "01a061c7-e84a-7366-a624-762de3e29bb9",
  type: "module",
  slug: "craft-character-panel",
  definition: "draws one row per character and loads the one the player clicks",
  code: "ts",
} as const satisfies Module
