import { createMundusSource } from "akasha/temper/character-source/modules/mundus-source/mundus-source.module.code.ts"
import type { PipelineStage } from "akasha/temper/characters-stats/modules/pipeline-types/pipeline-types.module.code.ts"

export const extractMundus: PipelineStage = (build, context) => {
  if (build.character.mundusStone === "no-mundus") return []

  const armorItems = context.armorItems || []
  const source = createMundusSource(build.character.mundusStone, armorItems)
  return source ? [source] : []
}
