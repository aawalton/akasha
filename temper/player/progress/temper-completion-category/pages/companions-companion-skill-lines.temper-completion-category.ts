import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const companionsCompanionSkillLines = {
  id: "01a05fcb-e4c6-75ef-8f96-4f028f7e7fd8",
  type: "page-type/temper-completion-category",
  slug: "companions-companion-skill-lines",
  title: "Companion Skill Lines",
  nodeId: "companion-skill-lines",
  tab: "companions",
  displayOrder: 3,
  parent: "temper-completion-category/companions",
} as const satisfies TemperCompletionCategory
