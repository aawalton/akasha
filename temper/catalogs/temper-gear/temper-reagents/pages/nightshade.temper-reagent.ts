import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const nightshade = {
  id: "019e21f7-3b20-7fa2-9748-abb3c5b67fee",
  pageTypeSlug: "temper-reagent",
  slug: "nightshade",
  title: "Nightshade",
  key: "nightshade",
  icon: "resources/nightshade_01.png",
  itemId: 77590,
  alchemyEffects: ["ravage-health", "protection", "gradual-ravage-health", "defile"],
} as const satisfies TemperReagent
