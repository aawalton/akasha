import { getSavedVariables } from "@akasha/temper-player-completion-state/completion-saved-variables"
import { currentCharacterEntry } from "../characters-current-entry/characters-current-entry.module.code.ts"

const ACCOUNT_ACHIEVEMENT_CATEGORY_MAP: Record<string, Record<string, number[]>> = {}
const CHARACTER_ACHIEVEMENT_CATEGORY_MAP: Record<string, Record<string, number[]>> = {}

export function getAccountAchievementCategoryMap(
  this: void
): Record<string, Record<string, number[]>> {
  return ACCOUNT_ACHIEVEMENT_CATEGORY_MAP
}

export function getCharacterAchievementCategoryMap(
  this: void
): Record<string, Record<string, number[]>> {
  return CHARACTER_ACHIEVEMENT_CATEGORY_MAP
}

function isCharacterAchievement(achievementId: number): boolean {
  return GetAchievementPersistenceLevel(achievementId) === 0
}

export function enumerateAllAchievementIds(this: void): number[] {
  const allIds: number[] = []
  const seen: Record<number, boolean> = {}

  function addToCategoryMap(
    achievementId: number,
    categoryName: string,
    subCategoryName: string
  ): undefined {
    const map = isCharacterAchievement(achievementId)
      ? CHARACTER_ACHIEVEMENT_CATEGORY_MAP
      : ACCOUNT_ACHIEVEMENT_CATEGORY_MAP
    if (map[categoryName] === undefined) {
      map[categoryName] = {}
    }
    if (map[categoryName][subCategoryName] === undefined) {
      map[categoryName][subCategoryName] = []
    }
    map[categoryName][subCategoryName].push(achievementId)
  }

  function addWithSequence(
    achievementId: number,
    categoryName: string,
    subCategoryName: string
  ): undefined {
    let currentId = GetFirstAchievementInLine(achievementId)
    currentId = currentId !== 0 ? currentId : achievementId

    while (currentId !== 0) {
      if (!seen[currentId]) {
        allIds.push(currentId)
        seen[currentId] = true
        addToCategoryMap(currentId, categoryName, subCategoryName)
      }
      currentId = GetNextAchievementInLine(currentId)
    }
  }

  for (let categoryIndex = 1; categoryIndex <= GetNumAchievementCategories(); categoryIndex++) {
    const [categoryName, numSubCategories, numGeneralAchievements] =
      GetAchievementCategoryInfo(categoryIndex)

    if (numGeneralAchievements > 0) {
      const baseIds = ZO_GetAchievementIds(categoryIndex, undefined, numGeneralAchievements, false)
      for (const id of baseIds) {
        addWithSequence(id, categoryName, "General")
      }
    }

    for (let subIndex = 1; subIndex <= numSubCategories; subIndex++) {
      const [subCategoryName, numAchievements] = GetAchievementSubCategoryInfo(
        categoryIndex,
        subIndex
      )
      if (numAchievements > 0) {
        const baseIds = ZO_GetAchievementIds(categoryIndex, subIndex, numAchievements, false)
        for (const id of baseIds) {
          addWithSequence(id, categoryName, subCategoryName)
        }
      }
    }
  }

  return allIds
}

function criteriaProgress(
  achievementId: number,
  numCriteria: number
): Record<string, { numCompleted: number; numRequired: number }> | undefined {
  let criteria: Record<string, { numCompleted: number; numRequired: number }> | undefined
  for (let i = 1; i <= numCriteria; i++) {
    const [, numCompleted, numRequired] = GetAchievementCriterion(achievementId, i)
    if (numRequired > 1) {
      if (criteria === undefined) {
        criteria = {}
        for (let j = 1; j < i; j++) {
          criteria[j] = { numCompleted: 0, numRequired: 1 }
        }
      }
      criteria[i] = { numCompleted, numRequired }
    } else if (criteria !== undefined) {
      criteria[i] = { numCompleted, numRequired }
    }
  }
  return criteria
}

export function saveAchievementProgress(this: void, achievementId: number): undefined {
  const [, , , , completed, completionDate] = GetAchievementInfo(achievementId)
  const numCriteria = GetAchievementNumCriteria(achievementId)
  const completedSteps = tonumber(GetAchievementProgress(achievementId)) ?? 0

  const progress = {
    completed: completed === true,
    completionDate: typeof completionDate === "number" ? completionDate : undefined,
    criteriaProgress: {
      completedSteps,
      totalSteps: numCriteria,
      criteria: criteriaProgress(achievementId, numCriteria),
    },
  }

  if (!isCharacterAchievement(achievementId)) {
    getSavedVariables().account.achievements[achievementId] = progress
    return
  }

  const charEntry = currentCharacterEntry()
  if (charEntry === undefined) return
  const achievements = charEntry.achievements ?? {}
  achievements[achievementId] = progress
  charEntry.achievements = achievements
}

export function collectAchievements(this: void, force = false): undefined {
  const savedVars = getSavedVariables()
  const charEntry = currentCharacterEntry()

  for (const id of enumerateAllAchievementIds()) {
    if (!force) {
      if (savedVars.account.achievements[id]?.completed === true) continue
      if (charEntry?.achievements?.[id]?.completed === true) continue
    }
    saveAchievementProgress(id)
  }
}
