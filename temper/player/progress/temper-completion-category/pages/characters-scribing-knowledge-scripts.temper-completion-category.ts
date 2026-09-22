import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const charactersScribingKnowledgeScripts = {
  id: "01a05fcb-e4c2-728d-a645-e78526526988",
  type: "page-type/temper-completion-category",
  slug: "characters-scribing-knowledge-scripts",
  title: "Scripts",
  nodeId: "scripts",
  tab: "characters",
  displayOrder: 1,
  parent: "temper-completion-category/characters-scribing-knowledge",
} as const satisfies TemperCompletionCategory
