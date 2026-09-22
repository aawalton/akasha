import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const accountAntiquityLeadsLegendary = {
  id: "01a05fcb-e4ba-7e64-9cab-b46c5b0a3482",
  type: "page-type/temper-completion-category",
  slug: "account-antiquity-leads-legendary",
  title: "Antiquity Leads — Legendary",
  nodeId: "antiquity-leads-legendary",
  tab: "account",
  displayOrder: 1,
  parent: "temper-completion-category/account",
} as const satisfies TemperCompletionCategory
