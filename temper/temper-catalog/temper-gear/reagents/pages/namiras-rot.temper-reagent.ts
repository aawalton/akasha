import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const namirasRot = {
  id: "019e21f7-3b20-729b-ae00-34c60476efd2",
  pageTypeSlug: "temper-reagent",
  slug: "namiras-rot",
  title: "Namira's Rot",
  key: "namiras-rot",
  icon: "resources/namiras_rot_r1.png",
  itemId: 30153,
  alchemyEffects: ["spell-critical", "speed", "invisible", "unstoppable"],
} as const satisfies TemperReagent
