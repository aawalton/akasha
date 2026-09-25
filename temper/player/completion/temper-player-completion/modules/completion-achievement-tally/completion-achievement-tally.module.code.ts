import type {
  CharacterAchievementProgress,
  CharacterCompletion,
} from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"
import {
  type AchievementTallyCategory,
  achievementTally,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-achievement-progress/completion-achievement-progress.module.code.ts"
import type { ItemProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-checker-types/completion-card-checker-types.module.code.ts"
import type { CompletionCatalogs } from "akasha/temper/player/completion/temper-player-completion/modules/completion-catalogs/completion-catalogs.module.code.ts"

const ONE: ItemProgress = { current: 0, total: 1 }

const CHARACTER_TALLY = "character"

type ItemPath = readonly (string | number)[]

type Achievements = AchievementTallyCategory["subCategories"][number]["achievements"]

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

function achievementsUnder(
  itemPath: ItemPath,
  catalogs: CompletionCatalogs
): Achievements | undefined {
  if (itemPath.length > 2) return undefined
  const [categoryName, subCategoryName] = itemPath
  const tally = achievementTally(catalogs.achievementCategories, CHARACTER_TALLY)
  if (categoryName === undefined) {
    return tally.flatMap((category) => category.subCategories.flatMap((sub) => sub.achievements))
  }
  const category = tally.find((one) => one.name === String(categoryName))
  if (category === undefined) return undefined
  if (subCategoryName === undefined) {
    return category.subCategories.flatMap((sub) => sub.achievements)
  }
  return category.subCategories.find((one) => one.name === String(subCategoryName))?.achievements
}

function namesOneAchievement(itemPath: ItemPath): boolean {
  const last = itemPath[itemPath.length - 1]
  return last !== undefined && Number.isFinite(Number(last))
}

export function countAchievementPath(
  completion: CharacterCompletion | null,
  itemPath: ItemPath,
  catalogs: CompletionCatalogs
): ItemProgress | undefined {
  const held = completion?.achievements
  if (held === undefined) return undefined
  const under = achievementsUnder(itemPath, catalogs)
  if (under === undefined) {
    return namesOneAchievement(itemPath)
      ? countAchievement(achievementAt(held, itemPath))
      : undefined
  }
  if (under.length === 0) return undefined
  const done = under.filter((one) => held[one.esoAchievementId]?.completed === true)
  return { current: done.length, total: under.length }
}

export function isAchievementPathDone(
  completion: CharacterCompletion | null,
  itemPath: ItemPath,
  catalogs: CompletionCatalogs
): boolean {
  if (achievementsUnder(itemPath, catalogs) === undefined) {
    return (
      namesOneAchievement(itemPath) &&
      achievementAt(completion?.achievements, itemPath)?.completed === true
    )
  }
  const counted = countAchievementPath(completion, itemPath, catalogs)
  return counted !== undefined && counted.total > 0 && counted.current >= counted.total
}
