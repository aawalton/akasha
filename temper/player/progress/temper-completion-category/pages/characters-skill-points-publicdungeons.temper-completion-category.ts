import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const charactersSkillPointsPublicdungeons = {
  id: "01a05fcb-e4c4-7efc-9c7a-20ef80d9b552",
  type: "page-type/temper-completion-category",
  slug: "characters-skill-points-publicdungeons",
  title: "Public Dungeons",
  nodeId: "publicDungeons",
  tab: "characters",
  displayOrder: 4,
  parent: "temper-completion-category/characters-skill-points",
} as const satisfies TemperCompletionCategory
