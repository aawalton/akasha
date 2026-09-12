import { targetArmor } from "akasha/temper/character-sources/target-armors/target-armors.module.code.ts"
import { createTargetSource } from "akasha/temper/character-sources/target-source/target-source.module.code.ts"
import type { PipelineStage } from "akasha/temper/characters-stats/pipeline-types/pipeline-types.module.code.ts"

export const extractTarget: PipelineStage = (build, _context) => {
  const source = createTargetSource(targetArmor.data[build.target.armor].armor, build.target.health)
  return [source]
}
