import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const torchbugThorax = {
  id: "019e21f7-3b25-7f75-9526-81ac31e17f01",
  pageTypeSlug: "temper-reagent",
  slug: "torchbug-thorax",
  title: "Torchbug Thorax",
  key: "torchbug-thorax",
  icon: "resources/reagent_torchbug_thorax.png",
  itemId: 77581,
  alchemyEffects: ["fracture", "enervation", "detection", "vitality"],
} as const satisfies TemperReagent
