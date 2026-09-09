import { targetArmor } from "../../character-sources/target-armors/target-armors.module.code.ts"
import { createTargetSource } from "../../character-sources/target-source/target-source.module.code.ts"
import type { PipelineStage } from "../pipeline-types/pipeline-types.module.code.ts"

export const extractTarget: PipelineStage = (build, _context) => {
  const source = createTargetSource(targetArmor.data[build.target.armor].armor, build.target.health)
  return [source]
}
