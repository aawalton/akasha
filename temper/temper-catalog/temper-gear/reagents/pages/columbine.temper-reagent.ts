import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const columbine = {
  id: "019e21f7-3b0f-7979-8b5f-b4e6365d7863",
  pageTypeSlug: "temper-reagent",
  slug: "columbine",
  title: "Columbine",
  key: "columbine",
  icon: "resources/columbine_r1.png",
  itemId: 30164,
  alchemyEffects: ["restore-health", "restore-magicka", "restore-stamina", "unstoppable"],
} as const satisfies TemperReagent
