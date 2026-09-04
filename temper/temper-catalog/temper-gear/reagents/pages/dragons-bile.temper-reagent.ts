import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const dragonsBile = {
  id: "019e21f7-3b14-71cb-989c-b634ad936d67",
  pageTypeSlug: "temper-reagent",
  slug: "dragons-bile",
  title: "Dragon's Bile",
  key: "dragons-bile",
  icon: "resources/dragonsbile.png",
  itemId: 150789,
  alchemyEffects: ["heroism", "vulnerability", "invisible", "vitality"],
} as const satisfies TemperReagent
