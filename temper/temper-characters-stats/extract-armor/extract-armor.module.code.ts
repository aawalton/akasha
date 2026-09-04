import { createArmorSource } from "@akasha/temper-characters-equipment/armor-source"
import { valuesOf } from "@akasha/temper-formula-framework/record-parts"
import type { PipelineStage } from "../pipeline-types/pipeline-types.module.code.ts"

export const extractArmor: PipelineStage = (build, context) => {
  const armorItems = valuesOf(build.equipment.armor)
  const offHandWeaponItem =
    context.bar === "primary-weapon-bar"
      ? build.equipment["primary-weapon-bar"]["off-hand"]
      : build.equipment["backup-weapon-bar"]["off-hand"]

  const allArmorItems = [...armorItems, offHandWeaponItem].filter(
    (item) => item.itemType === "armor"
  )

  context.armorItems = allArmorItems.map((item) => item.data)

  return allArmorItems.map((item) => {
    return createArmorSource(item.data)
  })
}
