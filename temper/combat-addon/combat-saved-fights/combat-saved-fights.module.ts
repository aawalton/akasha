import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const combatSavedFights = {
  id: "01a0617f-584f-7efd-9460-37a91df1f3ef",
  type: "module",
  slug: "combat-saved-fights",
  definition: "the fights kept on disk, and loading, saving and deleting one",
  code: "ts",
} as const satisfies Module
