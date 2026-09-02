import { createJewelrySource } from "@temper/game-characters-equipment/jewelry/jewelry-source"
import { valuesOf } from "@akasha/temper-formula-framework/record-parts"
import type { PipelineStage } from "./types"

export const extractJewelry: PipelineStage = (build, _context) => {
  const targetHealth = build.target.health
  const jewelryItems = valuesOf(build.equipment.jewelry)
  return jewelryItems
    .filter((item) => item.itemType === "jewelry")
    .map((item) => {
      return createJewelrySource(item.data, targetHealth)
    })
}
