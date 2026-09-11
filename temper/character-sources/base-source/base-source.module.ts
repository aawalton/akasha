import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const baseSource = {
  id: "01a060ea-ac5f-7d7c-b61a-f068bca19da7",
  type: "module",
  slug: "base-source",
  definition: "the stats every character has before race, class or gear says anything",
  code: "ts",
} as const satisfies Module
