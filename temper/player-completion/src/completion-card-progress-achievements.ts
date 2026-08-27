import type {
  AccountCompletion,
  CharacterCompletion,
} from "@temper/game-completion/completion-types"
import {
  accountAchievementData,
  characterAchievementData,
} from "./generated/achievement-data.generated"

interface TaskProgress {
  current: number
  total: number
}

interface AchievementData {
  name: string
  subCategories: readonly {
    name: string
    achievements: readonly { achievementId: number; name: string }[]
  }[]
}

export function resolveCharacterAchievements(
  charCompletion: CharacterCompletion | null | undefined,
  itemPath: readonly (string | number)[] | undefined
): TaskProgress | undefined {
  const achievements = charCompletion?.achievements
  if (!achievements) return undefined
  return countAchievements(achievements, itemPath, characterAchievementData)
}

export function resolveAccountAchievements(
  accountCompletion: AccountCompletion | null | undefined,
  itemPath: readonly (string | number)[] | undefined
): TaskProgress | undefined {
  const achievements = accountCompletion?.achievements
  if (!achievements) return undefined
  return countAchievements(achievements, itemPath, accountAchievementData)
}

function singleAchievementProgress(
  entry:
    | {
        completed: boolean
        criteriaProgress: {
          completedSteps: number
          totalSteps: number
          criteria?: Record<string, { numCompleted: number; numRequired: number }>
        }
      }
    | undefined
): TaskProgress | undefined {
  if (!entry) return undefined
  const cp = entry.criteriaProgress
  if (cp.criteria) {
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

function countAchievements(
  achievements: Record<
    number,
    { completed: boolean; criteriaProgress: { completedSteps: number; totalSteps: number } }
  >,
  itemPath: readonly (string | number)[] | undefined,
  achievementData: readonly AchievementData[]
): TaskProgress | undefined {
  if (itemPath && itemPath.length > 0) {
    if (itemPath.length === 3) {
      const achievementId = itemPath[2]
      if (typeof achievementId !== "number") return undefined
      return singleAchievementProgress(achievements[achievementId])
    }

    if (itemPath.length === 2) {
      const categoryName = itemPath[0]
      const subCategoryName = itemPath[1]
      if (typeof categoryName !== "string" || typeof subCategoryName !== "string") return undefined
      const category = achievementData.find((c) => c.name === categoryName)
      if (!category) return undefined
      const subCategory = category.subCategories.find((s) => s.name === subCategoryName)
      if (!subCategory) return undefined
      let current = 0
      const total = subCategory.achievements.length
      for (const a of subCategory.achievements) {
        if (achievements[a.achievementId]?.completed) current++
      }
      return { current, total }
    }

    if (itemPath.length === 1) {
      const categoryName = itemPath[0]
      if (typeof categoryName !== "string") return undefined
      const category = achievementData.find((c) => c.name === categoryName)
      if (!category) return undefined
      let current = 0
      let total = 0
      for (const sub of category.subCategories) {
        for (const a of sub.achievements) {
          total++
          if (achievements[a.achievementId]?.completed) current++
        }
      }
      return { current, total }
    }
  }

  let current = 0
  let total = 0
  for (const entry of Object.values(achievements)) {
    total++
    if (entry.completed) current++
  }
  return { current, total }
}
