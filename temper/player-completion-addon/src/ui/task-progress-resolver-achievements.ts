import type { AccountCompletion } from "@temper/game-completion/completion-writer-types"
import type { AchievementCriteriaProgress } from "@temper/game-completion/completion-types"
import type { SavedCharacterEntry } from "../saved-variables"
import {
  getAccountAchievementCategoryMap,
  getCharacterAchievementCategoryMap,
} from "../tracking/achievements"
import type { TaskProgress } from "./task-progress-resolver-types"

export function resolveCharacterAchievements(
  charData: SavedCharacterEntry | undefined,
  itemPath: (string | number)[] | undefined
): TaskProgress | undefined {
  const achievements = charData?.achievements
  if (achievements === undefined) return undefined
  return countAchievements(achievements, itemPath, getCharacterAchievementCategoryMap())
}

export function resolveAccountAchievements(
  account: AccountCompletion,
  itemPath: (string | number)[] | undefined
): TaskProgress | undefined {
  const achievements = account.achievements
  if (achievements === undefined) return undefined
  return countAchievements(achievements, itemPath, getAccountAchievementCategoryMap())
}

export function singleAchievementProgress(
  entry: { completed: boolean; criteriaProgress: AchievementCriteriaProgress } | undefined
): TaskProgress {
  if (entry === undefined) return { current: 0, total: 1 }
  const cp = entry.criteriaProgress
  if (cp.criteria !== undefined) {
    const values = Object.values(cp.criteria)
    if (values.length > 0) {
      let current = 0
      let total = 0
      for (const c of values) {
        current += c.numCompleted
        total += c.numRequired
      }
      if (total > 1) return { current, total }
    }
  }
  if (cp.totalSteps <= 1) return { current: entry.completed ? 1 : 0, total: 1 }
  return { current: entry.completed ? cp.totalSteps : 0, total: cp.totalSteps }
}

export function countAchievements(
  achievements: Record<
    number,
    { completed: boolean; criteriaProgress: AchievementCriteriaProgress }
  >,
  itemPath: (string | number)[] | undefined,
  categoryMap: Record<string, Record<string, number[]>>
): TaskProgress {
  if (itemPath !== undefined && itemPath.length > 0) {
    if (itemPath.length === 3) {
      const achievementId = Number(itemPath[2])
      return singleAchievementProgress(achievements[achievementId])
    }

    if (itemPath.length === 2) {
      const categoryName = String(itemPath[0])
      const subCategoryName = String(itemPath[1])
      const subCats = categoryMap[categoryName]
      if (subCats === undefined) return { current: 0, total: 0 }
      const ids = subCats[subCategoryName]
      if (ids === undefined) return { current: 0, total: 0 }
      let current = 0
      const total = ids.length
      for (const id of ids) {
        if (achievements[id]?.completed) current++
      }
      return { current, total }
    }

    if (itemPath.length === 1) {
      const categoryName = String(itemPath[0])
      const subCats = categoryMap[categoryName]
      if (subCats === undefined) return { current: 0, total: 0 }
      let current = 0
      let total = 0
      for (const [, ids] of Object.entries(subCats)) {
        for (const id of ids) {
          total++
          if (achievements[id]?.completed) current++
        }
      }
      return { current, total }
    }
  }

  let current = 0
  let total = 0
  for (const [, entry] of Object.entries(achievements)) {
    total++
    if (entry.completed) current++
  }
  return { current, total }
}
