import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const ladysSmock = {
  id: "019e21f7-3b1c-7253-87bc-fdf867a99938",
  pageTypeSlug: "temper-reagent",
  slug: "ladys-smock",
  title: "Lady's Smock",
  key: "ladys-smock",
  icon: "resources/ladysmock.png",
  itemId: 30158,
  alchemyEffects: ["increase-spell-power", "restore-magicka", "breach", "spell-critical"],
} as const satisfies TemperReagent
