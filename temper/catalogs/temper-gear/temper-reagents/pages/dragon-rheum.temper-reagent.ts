import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const dragonRheum = {
  id: "019e21f7-3b16-7b50-8048-57cdd4919874",
  pageTypeSlug: "temper-reagent",
  slug: "dragon-rheum",
  title: "Dragon Rheum",
  key: "dragon-rheum",
  icon: "resources/dragonrheum.png",
  itemId: 150671,
  alchemyEffects: ["restore-magicka", "heroism", "enervation", "speed"],
} as const satisfies TemperReagent
