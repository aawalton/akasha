import type { Module } from "@akasha/code-system/module"

export const combatSavedFights = {
  id: "01a0617f-584f-7efd-9460-37a91df1f3ef",
  pageTypeSlug: "module",
  slug: "combat-saved-fights",
  definition: "the fights kept on disk, and loading, saving and deleting one",
  code: "ts",
} as const satisfies Module
