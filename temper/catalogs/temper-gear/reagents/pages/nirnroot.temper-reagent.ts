import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const nirnroot = {
  id: "019e21f7-3b21-7c57-8f17-5af0fa934677",
  pageTypeSlug: "temper-reagent",
  slug: "nirnroot",
  title: "Nirnroot",
  key: "nirnroot",
  icon: "resources/plant_nirnroot_r1.png",
  itemId: 30165,
  alchemyEffects: ["ravage-health", "uncertainty", "enervation", "invisible"],
} as const satisfies TemperReagent
