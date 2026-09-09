import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const wormwood = {
  id: "019e21f7-3b2a-714b-be75-0e5d4a48cf12",
  pageTypeSlug: "temper-reagent",
  slug: "wormwood",
  title: "Wormwood",
  key: "wormwood",
  icon: "resources/wormwood_r1.png",
  itemId: 30159,
  alchemyEffects: ["increase-weapon-crit", "hindrance", "detection", "unstoppable"],
} as const satisfies TemperReagent
