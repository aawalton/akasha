import type { SkillLineId } from "@akasha/temper-skill-lines/skill-lines"
import type { CharacterSkillMorphProgress } from "../morph-progress-types/morph-progress-types.module.code.ts"
import {
  morphableSkillLineIds,
  morphableSkillsByLine,
} from "../morphable-skills/morphable-skills.module.code.ts"

export type MorphRankMap = ReadonlyMap<string, ReadonlyMap<SkillLineId, number>>

export function buildMorphRankMap(
  morphProgress: readonly CharacterSkillMorphProgress[]
): MorphRankMap {
  const map = new Map<string, Map<SkillLineId, number>>()
  for (const cp of morphProgress) {
    const entries = new Map<SkillLineId, number>()
    for (const e of cp.entries) {
      let rankSum = 0
      for (const s of e.skills) {
        rankSum += s.baseRank + s.morph1Rank + s.morph2Rank
      }
      entries.set(e.skillLineId, rankSum)
    }
    map.set(cp.characterId, entries)
  }
  return map
}

export function getSkillLineMorphContribution(
  characterId: string,
  slId: SkillLineId,
  morphRankMap: MorphRankMap
): { count: number; total: number } | null {
  if (!morphableSkillLineIds.has(slId)) return null
  const numAbilities = morphableSkillsByLine.get(slId)?.length ?? 0
  const count = morphRankMap.get(characterId)?.get(slId) ?? 0
  return { count, total: numAbilities * 12 }
}
