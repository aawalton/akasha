import type { TemperCompletionCategory } from "akasha/temper/progressions/temper-completion-categories/temper-completion-category.page-type.types.ts"

export const charactersSkillPointsSkyshards = {
  id: "01a05fcb-e4c4-764f-8b1e-70f6483bd208",
  type: "temper-completion-category",
  slug: "characters-skill-points-skyshards",
  title: "Skyshards",
  nodeId: "skyshards",
  tab: "characters",
  displayOrder: 1,
  parent: "characters-skill-points",
} as const satisfies TemperCompletionCategory
