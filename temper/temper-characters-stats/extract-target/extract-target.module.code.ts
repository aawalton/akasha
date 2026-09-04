import { targetArmor } from "@akasha/temper-character-sources/target-armors"
import { createTargetSource } from "@akasha/temper-character-sources/target-source"
import type { PipelineStage } from "../pipeline-types/pipeline-types.module.code.ts"

export const extractTarget: PipelineStage = (build, _context) => {
  const source = createTargetSource(targetArmor.data[build.target.armor].armor, build.target.health)
  return [source]
}
