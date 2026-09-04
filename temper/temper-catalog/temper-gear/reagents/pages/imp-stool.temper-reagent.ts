import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const impStool = {
  id: "019e21f7-3b1b-71b8-9e7a-d1bb71b50fd5",
  pageTypeSlug: "temper-reagent",
  slug: "imp-stool",
  title: "Imp Stool",
  key: "imp-stool",
  icon: "resources/imp_stool_r2.png",
  itemId: 30156,
  alchemyEffects: ["maim", "ravage-stamina", "increase-armor", "enervation"],
} as const satisfies TemperReagent
