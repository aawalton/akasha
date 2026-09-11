import type { TemperReagent } from "akasha/temper/catalog/temper-gear/temper-reagents/temper-reagent.page-type.types.ts"

export const namirasRot = {
  id: "019e21f7-3b20-729b-ae00-34c60476efd2",
  type: "temper-reagent",
  slug: "namiras-rot",
  title: "Namira's Rot",
  key: "namiras-rot",
  icon: "resources/namiras_rot_r1.png",
  itemId: 30153,
  alchemyEffects: ["spell-critical", "speed", "invisible", "unstoppable"],
} as const satisfies TemperReagent
