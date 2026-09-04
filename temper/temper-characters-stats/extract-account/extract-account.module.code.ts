import { esoPlus } from "@akasha/temper-character-sources/eso-plus-source"
import type { PipelineStage } from "../pipeline-types/pipeline-types.module.code.ts"
import { lookupSourceUnlessSentinel } from "../source-lookup/source-lookup.module.code.ts"

export const extractAccount: PipelineStage = (build, _context) => {
  const sources = []

  if (build.account?.esoPlus) {
    const esoPlusSource = lookupSourceUnlessSentinel(esoPlus, build.account.esoPlus, "no-eso-plus")
    if (esoPlusSource) {
      sources.push(esoPlusSource)
    }
  }

  return sources
}
