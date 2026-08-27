import { getSavedVariables, type SavedVariablesData } from "../saved-variables"
export const accountAchievementCategoryMap: Record<string, Record<string, number[]>> = {}
export const characterAchievementCategoryMap: Record<string, Record<string, number[]>> = {}

export function getAccountAchievementCategoryMap(): Record<string, Record<string, number[]>> {
  return accountAchievementCategoryMap
}

export function getCharacterAchievementCategoryMap(): Record<string, Record<string, number[]>> {
  return characterAchievementCategoryMap
}

export function enumerateAllAchievementIds(): number[] {
  const allIds: number[] = []
  const seen: Record<number, boolean> = {}

  function addToCategoryMap(
    achievementId: number,
    categoryName: string,
    subCategoryName: string
  ): undefined {
    const isCharacterSpecific = GetAchievementPersistenceLevel(achievementId) === 0
    const map = isCharacterSpecific
      ? characterAchievementCategoryMap
      : accountAchievementCategoryMap
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

export function saveAchievementProgress(
  savedVars: SavedVariablesData,
  charId: string,
  achievementId: number
): undefined {
  const [, , , , completed, completionDate] = GetAchievementInfo(achievementId)
  const numCriteria = GetAchievementNumCriteria(achievementId)
  const completedSteps = tonumber(GetAchievementProgress(achievementId)) ?? 0
  const isCharacterSpecific = GetAchievementPersistenceLevel(achievementId) === 0

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

  const progress = {
    completed: completed === true,
    completionDate: typeof completionDate === "number" ? completionDate : undefined,
    criteriaProgress: {
      completedSteps,
      totalSteps: numCriteria,
      criteria,
    },
  }

  if (isCharacterSpecific) {
    const charEntry = savedVars.characters[charId]
    if (charEntry !== undefined) {
      if (!charEntry.achievements) {
        charEntry.achievements = {}
      }
      charEntry.achievements[achievementId] = progress
    }
  } else {
    savedVars.account.achievements[achievementId] = progress
  }
}

export function collectAchievements(force = false): undefined {
  const savedVars = getSavedVariables()
  const charId = GetCurrentCharacterId()
  const charEntry = savedVars.characters[charId]
  const ids = enumerateAllAchievementIds()
  for (const id of ids) {
    if (!force) {
      const accountEntry = savedVars.account.achievements[id]
      if (accountEntry?.completed) continue
      const charAchievements = charEntry?.achievements
      if (charAchievements !== undefined) {
        const charAchEntry = charAchievements[id]
        if (charAchEntry?.completed) continue
      }
    }
    saveAchievementProgress(savedVars, charId, id)
  }
}

export function updateSingleAchievement(achievementId: number): undefined {
  const savedVars = getSavedVariables()
  const charId = GetCurrentCharacterId()
  saveAchievementProgress(savedVars, charId, achievementId)
}
