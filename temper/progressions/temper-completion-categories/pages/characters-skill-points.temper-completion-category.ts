import type { TemperCompletionCategory } from "akasha/temper/progressions/temper-completion-categories/temper-completion-category.page-type.types.ts"

export const charactersSkillPoints = {
  id: "01a05fcb-e4c4-7627-8963-cd52fd7b633a",
  type: "temper-completion-category",
  slug: "characters-skill-points",
  title: "Skill Points",
  nodeId: "skill-points",
  tab: "characters",
  displayOrder: 16,
  parent: "characters",
} as const satisfies TemperCompletionCategory
