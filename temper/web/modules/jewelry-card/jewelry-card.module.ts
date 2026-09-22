import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const jewelryCard = {
  id: "01a0642d-9a17-7d11-ac2a-0323df38b9ed",
  type: "page-type/module",
  slug: "jewelry-card",
  definition: "a jewelry slot: its set, trait, enchant and quality, each pickable",
  code: "tsx",
} as const satisfies Module
