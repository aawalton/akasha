import { createArmorSource } from "akasha/temper/player/character/characters-equipment/modules/armor-source/armor-source.module.code.ts"
import { valuesOf } from "akasha/temper/player/character/formula-framework/modules/record-parts/record-parts.module.code.ts"
import type { PipelineStage } from "akasha/temper/player/character/stat/modules/pipeline-types/pipeline-types.module.code.ts"

export const extractArmor: PipelineStage = (build, context) => {
  const worn = valuesOf(build.equipment.armor).flatMap((item) =>
    item.itemType === "armor" ? [item.data] : []
  )
  const offHand = context.bar === undefined ? undefined : build.equipment[context.bar]["off-hand"]
  const shield = offHand?.itemType === "shield" ? [offHand.data] : []

  context.armorItems = [...worn, ...shield]

  return worn.map((piece) => createArmorSource(piece))
}
