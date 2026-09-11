import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const quietGuildRoster = {
  id: "01a060f1-691c-7d16-83c4-15a07a34f67f",
  pageTypeSlug: "module",
  type: "module",
  slug: "quiet-guild-roster",
  definition: "the guild roster alerts the add-on has back",
  code: "ts",
} as const satisfies Module
