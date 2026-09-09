import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const blessedThistle = {
  id: "019e21f7-3b03-7823-9739-32504de7ebed",
  pageTypeSlug: "temper-reagent",
  slug: "blessed-thistle",
  title: "Blessed Thistle",
  key: "blessed-thistle",
  icon: "resources/blessed_thistle.png",
  itemId: 30157,
  alchemyEffects: ["restore-stamina", "increase-weapon-power", "ravage-health", "speed"],
} as const satisfies TemperReagent
