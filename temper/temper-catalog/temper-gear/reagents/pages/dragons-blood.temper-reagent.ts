import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const dragonsBlood = {
  id: "019e21f7-3b15-7981-bc74-ec954096ea0c",
  pageTypeSlug: "temper-reagent",
  slug: "dragons-blood",
  title: "Dragon's Blood",
  key: "dragons-blood",
  icon: "resources/dragonsblood.png",
  itemId: 150731,
  alchemyEffects: ["lingering-health", "restore-stamina", "heroism", "defile"],
} as const satisfies TemperReagent
