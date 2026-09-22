import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const charactersSkillPointsGroupdungeons = {
  id: "01a05fcb-e4c4-7ef7-8fbf-aeeb7f4b69d1",
  type: "page-type/temper-completion-category",
  slug: "characters-skill-points-groupdungeons",
  title: "Group Dungeons",
  nodeId: "groupDungeons",
  tab: "characters",
  displayOrder: 3,
  parent: "temper-completion-category/characters-skill-points",
} as const satisfies TemperCompletionCategory
