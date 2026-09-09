import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const beetleScuttle = {
  id: "019e21f7-3b00-7bbc-965f-18425a744647",
  pageTypeSlug: "temper-reagent",
  slug: "beetle-scuttle",
  title: "Beetle Scuttle",
  key: "beetle-scuttle",
  icon: "resources/reagent_scuttle.png",
  itemId: 77583,
  alchemyEffects: ["breach", "increase-armor", "protection", "vitality"],
} as const satisfies TemperReagent
