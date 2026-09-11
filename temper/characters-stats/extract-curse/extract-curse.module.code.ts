import {
  type CurseSource,
  getCurseSource,
} from "akasha/temper/character-sources/curse-source/curse-source.module.code.ts"
import type { PipelineStage } from "akasha/temper/characters-stats/pipeline-types/pipeline-types.module.code.ts"

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
