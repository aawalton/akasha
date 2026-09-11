import type { TemperReagent } from "akasha/temper/catalog/temper-gear/temper-reagents/temper-reagent.page-type.types.ts"

export const stinkhorn = {
  id: "019e21f7-3b25-713e-bb1a-86b2b005caf4",
  type: "temper-reagent",
  slug: "stinkhorn",
  title: "Stinkhorn",
  key: "stinkhorn",
  icon: "resources/stinkhorn_cap_r1.png",
  itemId: 30149,
  alchemyEffects: ["fracture", "ravage-health", "increase-weapon-power", "ravage-stamina"],
} as const satisfies TemperReagent
