import type { CompletionCharacterInput } from "@akasha/temper-items-rules-core/rule-matcher-context-types"
import { skillLines } from "@akasha/temper-skill-lines/skill-lines"
import { isObjectRecord } from "@akasha/utils-narrow/is-object-record"

function getCompletionField(completion: unknown, field: string): unknown {
  if (!isObjectRecord(completion)) return undefined
  return completion[field]
}

export function compileSkillLineCurrentRanks(
  characters: readonly CompletionCharacterInput[]
): Map<string, Map<number, number>> {
  const result = new Map<string, Map<number, number>>()
  for (const char of characters) {
    const skillLineProgress = getCompletionField(char.completion, "skillLineProgress")
    if (!isObjectRecord(skillLineProgress)) continue
    const inner = new Map<number, number>()
    for (const [esoIdStr, slProgress] of Object.entries(skillLineProgress)) {
      if (!isObjectRecord(slProgress)) continue
      const currentRank = slProgress.currentRank
      if (typeof currentRank !== "number") continue
      const esoId = Number(esoIdStr)
      if (!Number.isFinite(esoId)) continue
      inner.set(esoId, currentRank)
    }
    if (inner.size > 0) result.set(char.esoCharacterId, inner)
  }
  return result
}

export function buildGetCharacterSkillLineRanks(
  currentRanksByCharacter: ReadonlyMap<string, ReadonlyMap<number, number>>
): (charId: string, skillLineId: string) => { currentRank: number; maxRank: number } | undefined {
  return (charId, skillLineId) => {
    if (!skillLines.has(skillLineId)) return undefined
    const staticEntry = skillLines.data[skillLineId]
    const esoSkillLineId = staticEntry.esoSkillLineId
    if (esoSkillLineId <= 0) return undefined
    const inner = currentRanksByCharacter.get(charId)
    if (inner === undefined) return undefined
    const currentRank = inner.get(esoSkillLineId) ?? 0
    return { currentRank, maxRank: staticEntry.maxRank }
  }
}
