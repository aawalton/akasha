import { targetArmor } from "@temper/game-characters-character/target-armor-data"
import { createTargetSource } from "@temper/game-characters-character/target-source"
import type { PipelineStage } from "./types"

export const extractTarget: PipelineStage = (build, _context) => {
  const source = createTargetSource(targetArmor.data[build.target.armor].armor, build.target.health)
  return [source]
}
