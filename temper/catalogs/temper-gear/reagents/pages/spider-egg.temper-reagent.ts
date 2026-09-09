import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const spiderEgg = {
  id: "019e21f7-3b24-73f5-9872-99b465b90f46",
  pageTypeSlug: "temper-reagent",
  slug: "spider-egg",
  title: "Spider Egg",
  key: "spider-egg",
  icon: "resources/reagent_spider_egg.png",
  itemId: 77584,
  alchemyEffects: ["hindrance", "invisible", "lingering-health", "defile"],
} as const satisfies TemperReagent
