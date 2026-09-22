import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const charactersSkillLines = {
  id: "01a05fcb-e4c3-725d-93ac-c1e740ea3173",
  type: "page-type/temper-completion-category",
  slug: "characters-skill-lines",
  title: "Skill Lines",
  nodeId: "skill-lines",
  tab: "characters",
  displayOrder: 14,
  parent: "temper-completion-category/characters",
} as const satisfies TemperCompletionCategory
