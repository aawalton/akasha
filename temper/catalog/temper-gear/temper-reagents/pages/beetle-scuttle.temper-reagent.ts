import type { TemperReagent } from "akasha/temper/catalog/temper-gear/temper-reagents/temper-reagent.page-type.types.ts"

export const beetleScuttle = {
  id: "019e21f7-3b00-7bbc-965f-18425a744647",
  type: "temper-reagent",
  slug: "beetle-scuttle",
  title: "Beetle Scuttle",
  key: "beetle-scuttle",
  icon: "resources/reagent_scuttle.png",
  itemId: 77583,
  alchemyEffects: ["breach", "increase-armor", "protection", "vitality"],
} as const satisfies TemperReagent
