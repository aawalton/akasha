import type { TemperReagent } from "akasha/temper/catalog/temper-gear/temper-reagents/temper-reagent.page-type.types.ts"

export const scribJelly = {
  id: "019e21f7-3b23-76fd-9ebe-76673440b3b9",
  type: "temper-reagent",
  slug: "scrib-jelly",
  title: "Scrib Jelly",
  key: "scrib-jelly",
  icon: "resources/reagent_scrib_jelly.png",
  itemId: 77589,
  alchemyEffects: ["ravage-magicka", "speed", "vulnerability", "lingering-health"],
} as const satisfies TemperReagent
