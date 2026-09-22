import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const charactersDailyWrits = {
  id: "01a05fcb-e4c0-707d-9f76-1170d58abd71",
  type: "page-type/temper-completion-category",
  slug: "characters-daily-writs",
  title: "Daily Crafting Writs",
  nodeId: "daily-writs",
  tab: "characters",
  displayOrder: 5,
  parent: "temper-completion-category/characters",
} as const satisfies TemperCompletionCategory
