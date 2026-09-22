import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const accountSubclassingSkillMorphs = {
  id: "01a05fcb-e4bd-7c1d-8a04-78c91b2500c1",
  type: "page-type/temper-completion-category",
  slug: "account-subclassing-skill-morphs",
  title: "Subclassing Skill Morphs",
  nodeId: "subclassing-skill-morphs",
  tab: "account",
  displayOrder: 16,
  parent: "temper-completion-category/account",
} as const satisfies TemperCompletionCategory
