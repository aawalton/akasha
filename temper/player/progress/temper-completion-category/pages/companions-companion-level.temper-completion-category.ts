import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const companionsCompanionLevel = {
  id: "01a05fcb-e4c6-7c1d-be13-7d8c96a4b49f",
  type: "page-type/temper-completion-category",
  slug: "companions-companion-level",
  title: "Companion Level",
  nodeId: "companion-level",
  tab: "companions",
  displayOrder: 0,
  parent: "temper-completion-category/companions",
} as const satisfies TemperCompletionCategory
