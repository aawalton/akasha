import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const butterflyWing = {
  id: "019e21f7-3b0a-7b4e-ba3b-53ccd2d693f6",
  pageTypeSlug: "temper-reagent",
  slug: "butterfly-wing",
  title: "Butterfly Wing",
  key: "butterfly-wing",
  icon: "resources/reagent_butterfly_wing.png",
  itemId: 77585,
  alchemyEffects: ["restore-health", "uncertainty", "lingering-health", "vitality"],
} as const satisfies TemperReagent
