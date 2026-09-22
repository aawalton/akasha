import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const charactersSkillMorphs = {
  id: "01a05fcb-e4c3-7259-8ee3-2cd6fbf7d1a9",
  type: "page-type/temper-completion-category",
  slug: "characters-skill-morphs",
  title: "Skill Morphs",
  nodeId: "skill-morphs",
  tab: "characters",
  displayOrder: 15,
  parent: "temper-completion-category/characters",
} as const satisfies TemperCompletionCategory
