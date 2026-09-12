import type { AccountCompletion } from "akasha/temper/completion/modules/completion-progress/completion-progress.module.code.ts"
import { calculateSkillLinePercent } from "akasha/temper/player-completion/modules/completion-skill-line-progress/completion-skill-line-progress.module.code.ts"
import type { SkillLineProgressEntry } from "akasha/temper/player-completion/modules/completion-ui-types/completion-ui-types.module.code.ts"
import { skillLines } from "akasha/temper/skill-lines/skill-lines/skill-lines.module.code.ts"

const classSkillLineIds = skillLines.list
  .filter((sl) => sl.subcategoryId === "class")
  .map((sl) => sl.id)

export interface SubclassingSkillLineProgressResult {
  entries: readonly SkillLineProgressEntry[]
  totalRank: number
  totalMaxRank: number
}

export function transformSubclassingSkillLineProgress(
  account: AccountCompletion | null | undefined
): SubclassingSkillLineProgressResult {
  const entries: SkillLineProgressEntry[] = []
  let totalRank = 0
  let totalMaxRank = 0

  for (const skillLineId of classSkillLineIds) {
    const sl = skillLines.data[skillLineId]
    if (sl.maxRank === 0) continue

    const esoId = sl.esoSkillLineId
    const slProgress = account?.subclassingSkillLineProgress?.[esoId]

    const currentRank = slProgress?.currentRank ?? 0
    const currentXP = slProgress?.currentXP ?? 0
    const nextRankXP = slProgress?.nextRankXP ?? 0

    const percent = calculateSkillLinePercent(currentRank, currentXP, nextRankXP, sl.maxRank)

    entries.push({
      skillLineId,
      percent,
      currentRank,
      currentXP,
      nextRankXP,
      maxRank: sl.maxRank,
    })

    totalRank += currentRank
    totalMaxRank += sl.maxRank
  }

  return { entries, totalRank, totalMaxRank }
}
