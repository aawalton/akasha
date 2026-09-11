import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const guildBankListState = {
  id: "01a06432-b190-7990-913e-6f2981cb0cb8",
  type: "module",
  slug: "guild-bank-list-state",
  definition: "which of loading, empty, error or a list a guild bank listing is showing",
  code: "ts",
  test: "ts",
} as const satisfies Module
