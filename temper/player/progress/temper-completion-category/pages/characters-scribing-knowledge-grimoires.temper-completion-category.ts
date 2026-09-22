import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const charactersScribingKnowledgeGrimoires = {
  id: "01a05fcb-e4c1-7397-80b8-04efd721fad2",
  type: "page-type/temper-completion-category",
  slug: "characters-scribing-knowledge-grimoires",
  title: "Grimoires",
  nodeId: "grimoires",
  tab: "characters",
  displayOrder: 0,
  parent: "temper-completion-category/characters-scribing-knowledge",
} as const satisfies TemperCompletionCategory
