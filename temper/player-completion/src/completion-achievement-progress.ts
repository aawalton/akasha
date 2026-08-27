import type {
  AccountAchievementProgress,
  AccountCompletion,
  CharacterAchievementProgress,
} from "@temper/game-completion/completion-types"
import type { CompletionCharacterRow } from "./completion-character-row-type"
import { isCharacterMeasured } from "./completion-measured"
import {
  accountAchievementData,
  characterAchievementData,
} from "./generated/achievement-data.generated"

interface AchievementProgressEntry {
  achievementId: number
  name: string
  points: number
  completedSteps: number
  totalSteps: number
}

interface AchievementSubCategoryProgress {
  name: string
  achievements: readonly AchievementProgressEntry[]
  earnedPoints: number
  totalPoints: number
}

interface AchievementCategoryProgress {
  name: string
  subCategories: readonly AchievementSubCategoryProgress[]
  earnedPoints: number
  totalPoints: number
}

export interface AccountAchievementOverallProgress {
  categories: readonly AchievementCategoryProgress[]
  earnedPoints: number
  totalPoints: number
}

export interface CharacterAchievementProgressResult {
  characterId: string
  categories: readonly AchievementCategoryProgress[]
  earnedPoints: number
  totalPoints: number
}

function getSteps(
  addonEntry: AccountAchievementProgress | CharacterAchievementProgress | undefined,
  staticTotalSteps: number
): { completedSteps: number; totalSteps: number } {
  if (!addonEntry) {
    const total = staticTotalSteps > 0 ? staticTotalSteps : 1
    return { completedSteps: 0, totalSteps: total }
  }

  if (staticTotalSteps === 0 && addonEntry.criteriaProgress.totalSteps === 0) {
    return { completedSteps: addonEntry.completed ? 1 : 0, totalSteps: 1 }
  }

  const total =
    addonEntry.criteriaProgress.totalSteps > 0
      ? addonEntry.criteriaProgress.totalSteps
      : staticTotalSteps > 0
        ? staticTotalSteps
        : 1

  const completed = addonEntry.completed ? total : addonEntry.criteriaProgress.completedSteps

  return { completedSteps: completed, totalSteps: total }
}

function getBestCharacterSteps(
  achievementId: number,
  staticTotalSteps: number,
  rows: readonly CompletionCharacterRow[]
): { completedSteps: number; totalSteps: number } {
  let bestCompleted = 0
  let totalSteps = staticTotalSteps > 0 ? staticTotalSteps : 1

  for (const row of rows) {
    const addonEntry = row.completion?.achievements?.[achievementId]
    const steps = getSteps(addonEntry, staticTotalSteps)
    totalSteps = steps.totalSteps
    if (steps.completedSteps > bestCompleted) {
      bestCompleted = steps.completedSteps
    }
  }

  return { completedSteps: bestCompleted, totalSteps }
}

export function transformAccountAchievementProgress(
  completion: AccountCompletion | null | undefined,
  rows?: readonly CompletionCharacterRow[]
): AccountAchievementOverallProgress {
  const empty: AccountAchievementOverallProgress = {
    categories: [],
    earnedPoints: 0,
    totalPoints: 0,
  }

  const addonAchievements = completion?.achievements

  const categories: AchievementCategoryProgress[] = []
  let overallEarned = 0
  let overallTotal = 0

  for (const cat of accountAchievementData) {
    let catEarned = 0
    let catTotal = 0

    const subCategories: AchievementSubCategoryProgress[] = []

    for (const sub of cat.subCategories) {
      let subEarned = 0
      let subTotal = 0

      const achievements = sub.achievements.map((a) => {
        const addonEntry = addonAchievements?.[a.achievementId]
        const { completedSteps, totalSteps } = getSteps(addonEntry, a.totalSteps)
        const completed = completedSteps >= totalSteps
        subEarned += completed ? a.points : 0
        subTotal += a.points
        return {
          achievementId: a.achievementId,
          name: a.name,
          points: a.points,
          completedSteps,
          totalSteps,
        }
      })

      subCategories.push({
        name: sub.name,
        achievements,
        earnedPoints: subEarned,
        totalPoints: subTotal,
      })

      catEarned += subEarned
      catTotal += subTotal
    }

    categories.push({
      name: cat.name,
      subCategories,
      earnedPoints: catEarned,
      totalPoints: catTotal,
    })

    overallEarned += catEarned
    overallTotal += catTotal
  }

  if (rows && rows.length > 0 && characterAchievementData.length > 0) {
    const catMap = new Map<string, AchievementCategoryProgress>()
    for (const cat of categories) {
      catMap.set(cat.name, cat)
    }

    for (const charCat of characterAchievementData) {
      const existing = catMap.get(charCat.name)

      const subMap = new Map<string, AchievementSubCategoryProgress>()
      if (existing) {
        for (const sub of existing.subCategories) {
          subMap.set(sub.name, sub)
        }
      }

      let charCatEarned = 0
      let charCatTotal = 0

      for (const charSub of charCat.subCategories) {
        let subEarned = 0
        let subTotal = 0

        const achievements = charSub.achievements.map((a) => {
          const { completedSteps, totalSteps } = getBestCharacterSteps(
            a.achievementId,
            a.totalSteps,
            rows
          )
          const completed = completedSteps >= totalSteps
          subEarned += completed ? a.points : 0
          subTotal += a.points
          return {
            achievementId: a.achievementId,
            name: a.name,
            points: a.points,
            completedSteps,
            totalSteps,
          }
        })

        const existingSub = subMap.get(charSub.name)
        if (existingSub) {
          existingSub.achievements = [...existingSub.achievements, ...achievements]
          existingSub.earnedPoints += subEarned
          existingSub.totalPoints += subTotal
        } else {
          const newSub: AchievementSubCategoryProgress = {
            name: charSub.name,
            achievements,
            earnedPoints: subEarned,
            totalPoints: subTotal,
          }
          if (existing) {
            existing.subCategories = [...existing.subCategories, newSub]
          }
          subMap.set(charSub.name, newSub)
        }

        charCatEarned += subEarned
        charCatTotal += subTotal
      }

      if (existing) {
        existing.earnedPoints += charCatEarned
        existing.totalPoints += charCatTotal
      } else {
        const newCat: AchievementCategoryProgress = {
          name: charCat.name,
          subCategories: [...subMap.values()],
          earnedPoints: charCatEarned,
          totalPoints: charCatTotal,
        }
        categories.push(newCat)
        catMap.set(charCat.name, newCat)
      }

      overallEarned += charCatEarned
      overallTotal += charCatTotal
    }
  }

  if (categories.length === 0) return empty

  return {
    categories,
    earnedPoints: overallEarned,
    totalPoints: overallTotal,
  }
}

export function transformCharacterAchievementProgress(
  rows: readonly CompletionCharacterRow[]
): readonly CharacterAchievementProgressResult[] {
  const result: CharacterAchievementProgressResult[] = []

  for (const row of rows) {
    const completion = row.completion
    if (!completion || !isCharacterMeasured(completion)) continue
    const addonAchievements = completion.achievements

    const categories: AchievementCategoryProgress[] = []
    let overallEarned = 0
    let overallTotal = 0

    for (const cat of characterAchievementData) {
      let catEarned = 0
      let catTotal = 0

      const subCategories: AchievementSubCategoryProgress[] = []

      for (const sub of cat.subCategories) {
        let subEarned = 0
        let subTotal = 0

        const achievements = sub.achievements.map((a) => {
          const addonEntry = addonAchievements?.[a.achievementId]
          const { completedSteps, totalSteps } = getSteps(addonEntry, a.totalSteps)
          const completed = completedSteps >= totalSteps
          subEarned += completed ? a.points : 0
          subTotal += a.points
          return {
            achievementId: a.achievementId,
            name: a.name,
            points: a.points,
            completedSteps,
            totalSteps,
          }
        })

        subCategories.push({
          name: sub.name,
          achievements,
          earnedPoints: subEarned,
          totalPoints: subTotal,
        })

        catEarned += subEarned
        catTotal += subTotal
      }

      categories.push({
        name: cat.name,
        subCategories,
        earnedPoints: catEarned,
        totalPoints: catTotal,
      })

      overallEarned += catEarned
      overallTotal += catTotal
    }

    result.push({
      characterId: row.id,
      categories,
      earnedPoints: overallEarned,
      totalPoints: overallTotal,
    })
  }

  return result
}
