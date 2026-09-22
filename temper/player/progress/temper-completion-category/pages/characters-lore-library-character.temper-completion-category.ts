import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const charactersLoreLibraryCharacter = {
  id: "01a05fcb-e4c0-7c77-944e-59263f51529d",
  type: "page-type/temper-completion-category",
  slug: "characters-lore-library-character",
  title: "Lore Library",
  nodeId: "lore-library-character",
  tab: "characters",
  displayOrder: 9,
  parent: "temper-completion-category/characters",
} as const satisfies TemperCompletionCategory
