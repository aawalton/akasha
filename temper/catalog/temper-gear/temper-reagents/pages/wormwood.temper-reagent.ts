import type { TemperReagent } from "akasha/temper/catalog/temper-gear/temper-reagents/temper-reagent.page-type.types.ts"

export const wormwood = {
  id: "019e21f7-3b2a-714b-be75-0e5d4a48cf12",
  type: "temper-reagent",
  slug: "wormwood",
  title: "Wormwood",
  key: "wormwood",
  icon: "resources/wormwood_r1.png",
  itemId: 30159,
  alchemyEffects: ["increase-weapon-crit", "hindrance", "detection", "unstoppable"],
} as const satisfies TemperReagent
