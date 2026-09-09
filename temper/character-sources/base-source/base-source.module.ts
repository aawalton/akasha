import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const baseSource = {
  id: "01a060ea-ac5f-7d7c-b61a-f068bca19da7",
  pageTypeSlug: "module",
  slug: "base-source",
  definition: "the stats every character has before race, class or gear says anything",
  code: "ts",
} as const satisfies Module
