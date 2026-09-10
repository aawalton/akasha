import { MAX_COMPANION_RAPPORT } from "../companion-rapport/companion-rapport.module.code.ts"
import type { AccountQuestUnionProgress } from "../completion-account-union-progress/completion-account-union-progress.module.code.ts"
import type { CompanionSummaryData } from "../completion-card-registry/completion-card-registry.module.code.ts"
import type {
  CompanionProgressEntry,
  CompanionSkillLineProgress,
} from "../completion-ui-types/completion-ui-types.module.code.ts"

export function buildCompanionSummary(
  companionProgress: readonly CompanionProgressEntry[],
  companionSkillLineProgress: readonly CompanionSkillLineProgress[],
  companionQuestUnion: AccountQuestUnionProgress,
  selectedCompanionIds?: readonly string[]
): CompanionSummaryData {
  const effectiveProgress =
    selectedCompanionIds != null && selectedCompanionIds.length > 0
      ? companionProgress.filter((c) => selectedCompanionIds.includes(c.companionId))
      : companionProgress
  const effectiveSkillLines =
    selectedCompanionIds != null && selectedCompanionIds.length > 0
      ? companionSkillLineProgress.filter((c) => selectedCompanionIds.includes(c.companionId))
      : companionSkillLineProgress
  const compTotals = new Map<
    string,
    {
      name: string
      level?: number
      maxLevel: number
      rapport: number
      skillLinesCount: number
      skillLinesTotal: number
    }
  >()
  for (const c of effectiveProgress) {
    compTotals.set(c.companionId, {
      name: c.name,
      level: c.level,
      maxLevel: c.maxLevel,
      rapport: c.rapport,
      skillLinesCount: 0,
      skillLinesTotal: 0,
    })
  }

  for (const c of effectiveSkillLines) {
    const totals = compTotals.get(c.companionId)
    if (!totals) continue
    for (const entry of c.entries) {
      totals.skillLinesCount += entry.currentRank
      totals.skillLinesTotal += entry.maxRank
    }
  }

  let levelCount = 0
  let levelTotal = 0
  let rapportCount = 0
  let rapportTotal = 0
  let skillLinesCountSum = 0
  let skillLinesTotalSum = 0
  for (const t of compTotals.values()) {
    if (t.level !== undefined) {
      levelCount += t.level
      levelTotal += t.maxLevel
    }
    rapportCount += t.rapport
    rapportTotal += MAX_COMPANION_RAPPORT
    skillLinesCountSum += t.skillLinesCount
    skillLinesTotalSum += t.skillLinesTotal
  }

  return {
    "companion-level": { count: levelCount, total: levelTotal },
    "companion-quests-union": {
      count: companionQuestUnion.completedCount,
      total: companionQuestUnion.totalCount,
    },
    "companion-rapport": { count: rapportCount, total: rapportTotal },
    "companion-skill-lines": { count: skillLinesCountSum, total: skillLinesTotalSum },
  } satisfies CompanionSummaryData
}
