import {
  type CurseSource,
  getCurseSource,
} from "../../character-sources/curse-source/curse-source.module.code.ts"
import type { PipelineStage } from "../pipeline-types/pipeline-types.module.code.ts"

export const extractCurse: PipelineStage = (build, _context) => {
  const sources: CurseSource[] = []

  if (build.character.vampireStage) {
    const curseSource = getCurseSource(build.character.vampireStage)
    if (curseSource) {
      sources.push(curseSource)
    }
  }

  return sources
}
