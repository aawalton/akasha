import type { TemperCompletionCategory } from "akasha/temper/progressions/temper-completion-categories/temper-completion-category.page-type.types.ts"

export const charactersCadwellsAlmanac = {
  id: "01a05fcb-e4be-73bb-94dc-a2d852ea0de6",
  type: "temper-completion-category",
  slug: "characters-cadwells-almanac",
  title: "Cadwell's Almanac",
  nodeId: "cadwells-almanac",
  tab: "characters",
  displayOrder: 2,
  parent: "characters",
} as const satisfies TemperCompletionCategory
