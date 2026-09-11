import type { TemperReagent } from "akasha/temper/catalog/temper-gear/temper-reagents/temper-reagent.page-type.types.ts"

export const waterHyacinth = {
  id: "019e21f7-3b28-76bb-9ffb-f5bf7132e5b8",
  type: "temper-reagent",
  slug: "water-hyacinth",
  title: "Water Hyacinth",
  key: "water-hyacinth",
  icon: "resources/plant_water_hyacinth_r1.png",
  itemId: 30166,
  alchemyEffects: ["restore-health", "spell-critical", "increase-weapon-crit", "entrapment"],
} as const satisfies TemperReagent
