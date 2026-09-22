import type { CharacterAchievementProgress } from "akasha/temper/player/completion/modules/completion-progress/completion-progress.module.code.ts"
import type { ItemProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-checker-types/completion-card-checker-types.module.code.ts"

const ONE: ItemProgress = { current: 0, total: 1 }

export function countAchievement(entry: CharacterAchievementProgress | undefined): ItemProgress {
  if (entry === undefined) return ONE

  const criteria = entry.criteriaProgress.criteria
  if (criteria !== undefined) {
    let current = 0
    let total = 0
    for (const one of Object.values(criteria)) {
      current += one.numCompleted
      total += one.numRequired
    }
    if (total > 1) return { current, total }
  }

  const steps = entry.criteriaProgress.totalSteps
  if (steps <= 1) return { current: entry.completed ? 1 : 0, total: 1 }
  return { current: entry.completed ? steps : 0, total: steps }
}

export function achievementAt(
  achievements: Readonly<Record<number, CharacterAchievementProgress>> | undefined,
  itemPath: readonly (string | number)[]
): CharacterAchievementProgress | undefined {
  if (achievements === undefined) return undefined
  const named = itemPath[itemPath.length - 1]
  if (named === undefined) return undefined
  const id = Number(named)
  return Number.isFinite(id) ? achievements[id] : undefined
}
