import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const bugloss = {
  id: "019e21f7-3b08-742e-8c13-d4033e20e18a",
  pageTypeSlug: "temper-reagent",
  slug: "bugloss",
  title: "Bugloss",
  key: "bugloss",
  icon: "resources/vipers_bugloss_r1.png",
  itemId: 30160,
  alchemyEffects: ["increase-spell-resist", "restore-health", "cowardice", "restore-magicka"],
} as const satisfies TemperReagent
