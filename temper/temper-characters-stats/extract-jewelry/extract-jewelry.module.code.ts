import { createJewelrySource } from "@akasha/temper-characters-equipment/jewelry-source"
import { valuesOf } from "@akasha/temper-formula-framework/record-parts"
import type { PipelineStage } from "../pipeline-types/pipeline-types.module.code.ts"

export const extractJewelry: PipelineStage = (build, _context) => {
  const targetHealth = build.target.health
  const jewelryItems = valuesOf(build.equipment.jewelry)
  return jewelryItems
    .filter((item) => item.itemType === "jewelry")
    .map((item) => {
      return createJewelrySource(item.data, targetHealth)
    })
}
