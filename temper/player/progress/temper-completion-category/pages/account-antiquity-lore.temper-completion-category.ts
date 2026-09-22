import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const accountAntiquityLore = {
  id: "01a05fcb-e4bb-74ce-88f2-146b59cb8dcf",
  type: "page-type/temper-completion-category",
  slug: "account-antiquity-lore",
  title: "Antiquity Lore",
  nodeId: "antiquity-lore",
  tab: "account",
  displayOrder: 3,
  parent: "temper-completion-category/account",
} as const satisfies TemperCompletionCategory
