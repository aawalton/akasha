import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const blueEntoloma = {
  id: "019e21f7-3b05-7e64-bbca-b537ab77410a",
  pageTypeSlug: "temper-reagent",
  slug: "blue-entoloma",
  title: "Blue Entoloma",
  key: "blue-entoloma",
  icon: "resources/blue_entoloma_cap_r1.png",
  itemId: 30148,
  alchemyEffects: ["ravage-magicka", "cowardice", "restore-health", "invisible"],
} as const satisfies TemperReagent
