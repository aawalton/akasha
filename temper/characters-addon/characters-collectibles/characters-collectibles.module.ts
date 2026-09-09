import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const charactersCollectibles = {
  id: "01a062e9-b6fe-7017-96e3-ff77ee98731e",
  pageTypeSlug: "module",
  slug: "characters-collectibles",
  definition: "the collectibles unlocked on the account, read into the saved table",
  code: "ts",
} as const satisfies Module
