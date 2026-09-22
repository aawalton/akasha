import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const charactersPackUpgrades = {
  id: "01a05fcb-e4c0-79ed-bcd3-05b9846f6dd3",
  type: "page-type/temper-completion-category",
  slug: "characters-pack-upgrades",
  title: "Pack Upgrades",
  nodeId: "pack-upgrades",
  tab: "characters",
  displayOrder: 11,
  parent: "temper-completion-category/characters",
} as const satisfies TemperCompletionCategory
