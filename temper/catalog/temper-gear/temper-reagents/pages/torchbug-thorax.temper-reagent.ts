import type { TemperReagent } from "akasha/temper/catalog/temper-gear/temper-reagents/temper-reagent.page-type.types.ts"

export const torchbugThorax = {
  id: "019e21f7-3b25-7f75-9526-81ac31e17f01",
  type: "temper-reagent",
  slug: "torchbug-thorax",
  title: "Torchbug Thorax",
  key: "torchbug-thorax",
  icon: "resources/reagent_torchbug_thorax.png",
  itemId: 77581,
  alchemyEffects: ["fracture", "enervation", "detection", "vitality"],
} as const satisfies TemperReagent
