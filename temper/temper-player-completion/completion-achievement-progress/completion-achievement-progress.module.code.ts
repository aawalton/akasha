import type {
  AccountAchievementProgress,
  AccountCompletion,
  CharacterAchievementProgress,
} from "@akasha/temper-completion/completion-progress"
import type { CompletionCharacterRow } from "../completion-character-row/completion-character-row.module.code.ts"
import { isCharacterMeasured } from "../completion-measured/completion-measured.module.code.ts"

const ACCOUNT_TALLY = "account"
const CHARACTER_TALLY = "character"

export interface AchievementCatalogEntry {
  esoAchievementId: number
  name: string
  achievementPoints: number
  totalSteps: number
}

export interface AchievementCategoryCatalogEntry {
  slug: string
  title: string
  category: string
  displayOrder: number
  parent?: string | null | undefined
  achievements?: readonly AchievementCatalogEntry[] | undefined
}

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

export interface AchievementTallySubCategory {
  name: string
  achievements: readonly AchievementCatalogEntry[]
}

export interface AchievementTallyCategory {
  name: string
  subCategories: readonly AchievementTallySubCategory[]
}

export function achievementTally(
  catalog: readonly AchievementCategoryCatalogEntry[],
  tallyCategory: string
): readonly AchievementTallyCategory[] {
  const here = catalog.filter((page) => page.category === tallyCategory)
  const heads = here
    .filter((page) => page.parent === undefined || page.parent === null)
    .sort((a, b) => a.displayOrder - b.displayOrder)

  return heads.map((head) => ({
    name: head.title,
    subCategories: here
      .filter((page) => page.parent === head.slug)
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((sub) => ({ name: sub.title, achievements: sub.achievements ?? [] })),
  }))
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
  rows: readonly CompletionCharacterRow[] | undefined,
  achievementCatalog: readonly AchievementCategoryCatalogEntry[]
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

  for (const cat of achievementTally(achievementCatalog, ACCOUNT_TALLY)) {
    let catEarned = 0
    let catTotal = 0

    const subCategories: AchievementSubCategoryProgress[] = []

    for (const sub of cat.subCategories) {
      let subEarned = 0
      let subTotal = 0

      const achievements = sub.achievements.map((a) => {
        const addonEntry = addonAchievements?.[a.esoAchievementId]
        const { completedSteps, totalSteps } = getSteps(addonEntry, a.totalSteps)
        const completed = completedSteps >= totalSteps
        subEarned += completed ? a.achievementPoints : 0
        subTotal += a.achievementPoints
        return {
          achievementId: a.esoAchievementId,
          name: a.name,
          points: a.achievementPoints,
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

  const characterTally = achievementTally(achievementCatalog, CHARACTER_TALLY)

  if (rows && rows.length > 0 && characterTally.length > 0) {
    const catMap = new Map<string, AchievementCategoryProgress>()
    for (const cat of categories) {
      catMap.set(cat.name, cat)
    }

    for (const charCat of characterTally) {
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
            a.esoAchievementId,
            a.totalSteps,
            rows
          )
          const completed = completedSteps >= totalSteps
          subEarned += completed ? a.achievementPoints : 0
          subTotal += a.achievementPoints
          return {
            achievementId: a.esoAchievementId,
            name: a.name,
            points: a.achievementPoints,
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
  rows: readonly CompletionCharacterRow[],
  achievementCatalog: readonly AchievementCategoryCatalogEntry[]
): readonly CharacterAchievementProgressResult[] {
  const result: CharacterAchievementProgressResult[] = []
  const characterTally = achievementTally(achievementCatalog, CHARACTER_TALLY)

  for (const row of rows) {
    const completion = row.completion
    if (!completion || !isCharacterMeasured(completion)) continue
    const addonAchievements = completion.achievements

    const categories: AchievementCategoryProgress[] = []
    let overallEarned = 0
    let overallTotal = 0

    for (const cat of characterTally) {
      let catEarned = 0
      let catTotal = 0

      const subCategories: AchievementSubCategoryProgress[] = []

      for (const sub of cat.subCategories) {
        let subEarned = 0
        let subTotal = 0

        const achievements = sub.achievements.map((a) => {
          const addonEntry = addonAchievements?.[a.esoAchievementId]
          const { completedSteps, totalSteps } = getSteps(addonEntry, a.totalSteps)
          const completed = completedSteps >= totalSteps
          subEarned += completed ? a.achievementPoints : 0
          subTotal += a.achievementPoints
          return {
            achievementId: a.esoAchievementId,
            name: a.name,
            points: a.achievementPoints,
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
