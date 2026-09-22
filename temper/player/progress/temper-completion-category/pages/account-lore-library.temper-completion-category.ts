import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const accountLoreLibrary = {
  id: "01a05fcb-e4bd-7ad4-b8f2-322ac08cf052",
  type: "page-type/temper-completion-category",
  slug: "account-lore-library",
  title: "Lore Library",
  nodeId: "lore-library",
  tab: "account",
  displayOrder: 11,
  parent: "temper-completion-category/account",
} as const satisfies TemperCompletionCategory
