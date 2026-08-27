import type { SkillLineProgress } from "@temper/game-completion/completion-types"

function mergeLine(stored: SkillLineProgress, fresh: SkillLineProgress): SkillLineProgress {
  const freshIsAtLeastAsAdvanced = fresh.currentRank >= stored.currentRank
  const advanced = freshIsAtLeastAsAdvanced ? fresh : stored

  return {
    currentRank: advanced.currentRank,
    currentXP: advanced.currentXP,
    nextRankXP: advanced.nextRankXP,
    skills: stored.skills ?? fresh.skills,
  }
}

export function mergeSkillLineProgress(
  stored: Record<number, SkillLineProgress> | undefined,
  fresh: Record<number, SkillLineProgress>
): Record<number, SkillLineProgress> {
  if (stored === undefined) return fresh

  const merged: Record<number, SkillLineProgress> = {}
  for (const [key, storedLine] of Object.entries(stored)) {
    merged[Number(key)] = storedLine
  }
  for (const [key, freshLine] of Object.entries(fresh)) {
    const index = Number(key)
    const priorLine = merged[index]
    merged[index] = priorLine === undefined ? freshLine : mergeLine(priorLine, freshLine)
  }
  return merged
}
