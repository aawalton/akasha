import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const charactersSkillPointsStoryzonequests = {
  id: "01a05fcb-e4c5-775e-ade3-50db435e9170",
  type: "page-type/temper-completion-category",
  slug: "characters-skill-points-storyzonequests",
  title: "Story Zone Quests",
  nodeId: "storyZoneQuests",
  tab: "characters",
  displayOrder: 2,
  parent: "characters-skill-points",
} as const satisfies TemperCompletionCategory
