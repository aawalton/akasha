import type { TemperReagent } from "akasha/temper/catalog/temper-gear/temper-reagents/temper-reagent.page-type.types.ts"

export const impStool = {
  id: "019e21f7-3b1b-71b8-9e7a-d1bb71b50fd5",
  type: "temper-reagent",
  slug: "imp-stool",
  title: "Imp Stool",
  key: "imp-stool",
  icon: "resources/imp_stool_r2.png",
  itemId: 30156,
  alchemyEffects: ["maim", "ravage-stamina", "increase-armor", "enervation"],
} as const satisfies TemperReagent
