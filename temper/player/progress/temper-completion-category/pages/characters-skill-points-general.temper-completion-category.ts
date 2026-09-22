import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const charactersSkillPointsGeneral = {
  id: "01a05fcb-e4c3-7601-aaf2-b72002614294",
  type: "page-type/temper-completion-category",
  slug: "characters-skill-points-general",
  title: "General",
  nodeId: "general",
  tab: "characters",
  displayOrder: 0,
  parent: "temper-completion-category/characters-skill-points",
} as const satisfies TemperCompletionCategory
