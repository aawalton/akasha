import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const scribJelly = {
  id: "019e21f7-3b23-76fd-9ebe-76673440b3b9",
  pageTypeSlug: "temper-reagent",
  slug: "scrib-jelly",
  title: "Scrib Jelly",
  key: "scrib-jelly",
  icon: "resources/reagent_scrib_jelly.png",
  itemId: 77589,
  alchemyEffects: ["ravage-magicka", "speed", "vulnerability", "lingering-health"],
} as const satisfies TemperReagent
