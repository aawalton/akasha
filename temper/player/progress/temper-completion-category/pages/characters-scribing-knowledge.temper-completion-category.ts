import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const charactersScribingKnowledge = {
  id: "01a05fcb-e4c3-7e3f-9205-bd53e4ba0784",
  type: "page-type/temper-completion-category",
  slug: "characters-scribing-knowledge",
  title: "Skill Scribing",
  nodeId: "scribing-knowledge",
  tab: "characters",
  displayOrder: 17,
  parent: "temper-completion-category/characters",
} as const satisfies TemperCompletionCategory
