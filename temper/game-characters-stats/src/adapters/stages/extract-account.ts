import { esoPlus } from "@akasha/temper-character-sources/eso-plus-source"
import { lookupSourceUnlessSentinel } from "./source-lookup"
import type { PipelineStage } from "./types"

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
