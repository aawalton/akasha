import type { TemperReagent } from "akasha/temper/catalog/temper-gear/temper-reagents/temper-reagent.page-type.types.ts"

export const clamGall = {
  id: "019e21f7-3b0e-71af-9af1-3f3e0b61a2f2",
  type: "temper-reagent",
  slug: "clam-gall",
  title: "Clam Gall",
  key: "clam-gall",
  icon: "resources/reagent_clam_gall.png",
  itemId: 139020,
  alchemyEffects: ["increase-spell-resist", "hindrance", "vulnerability", "defile"],
} as const satisfies TemperReagent
