import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const weaponCard = {
  id: "01a0642d-9a17-71b0-8afa-a9b9f5057fc6",
  pageTypeSlug: "module",
  type: "module",
  slug: "weapon-card",
  definition: "one weapon slot: its type, set, trait, enchant and quality, each pickable",
  code: "tsx",
} as const satisfies Module
