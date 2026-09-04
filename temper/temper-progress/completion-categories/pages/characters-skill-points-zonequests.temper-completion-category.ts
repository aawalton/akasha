import type { TemperCompletionCategory } from "../temper-completion-category.page-type.ts"

export const charactersSkillPointsZonequests = {
  id: "01a05fcb-e4c5-775e-ade3-50db435e9170",
  pageTypeSlug: "temper-completion-category",
  slug: "characters-skill-points-zonequests",
  title: "Zone Quests",
  nodeId: "zoneQuests",
  tab: "characters",
  displayOrder: 2,
  parent: "characters-skill-points",
} as const satisfies TemperCompletionCategory
