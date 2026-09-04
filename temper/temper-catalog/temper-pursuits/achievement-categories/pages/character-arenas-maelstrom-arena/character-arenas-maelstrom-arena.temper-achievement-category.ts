import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const characterArenasMaelstromArena = {
  id: "01a06168-7251-700e-aa20-645a8e0cfbac",
  pageTypeSlug: "temper-achievement-category",
  slug: "character-arenas-maelstrom-arena",
  title: "Maelstrom Arena",
  category: "character",
  displayOrder: 0,
  parent: "character-arenas",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
