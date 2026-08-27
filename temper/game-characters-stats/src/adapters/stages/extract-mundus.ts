import { createMundusSource } from "@temper/game-characters-character/mundus-source"
import type { PipelineStage } from "./types"

export const extractMundus: PipelineStage = (build, context) => {
  if (build.character.mundusStone === "no-mundus") return []

  const armorItems = context.armorItems || []
  const source = createMundusSource(build.character.mundusStone, armorItems)
  return source ? [source] : []
}
