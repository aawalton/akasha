import type { TemperCompletionCategory } from "akasha/temper/progressions/temper-completion-categories/temper-completion-category.page-type.types.ts"

export const accountLoreLibrary = {
  id: "01a05fcb-e4bd-7ad4-b8f2-322ac08cf052",
  type: "temper-completion-category",
  slug: "account-lore-library",
  title: "Lore Library",
  nodeId: "lore-library",
  tab: "account",
  displayOrder: 11,
  parent: "account",
} as const satisfies TemperCompletionCategory
