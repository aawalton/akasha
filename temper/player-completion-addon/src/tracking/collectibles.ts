import { getSavedVariables } from "../saved-variables"
import { mergeIdList } from "./collector-merge"

export function scanUnlockedCollectibles(): number[] {
  const unlocked: number[] = []

  for (let categoryIndex = 1; categoryIndex <= GetNumCollectibleCategories(); categoryIndex++) {
    const [_categoryName, numSubCategories, numGeneralCollectibles] =
      GetCollectibleCategoryInfo(categoryIndex)

    for (let collectibleIndex = 1; collectibleIndex <= numGeneralCollectibles; collectibleIndex++) {
      const id = GetCollectibleId(categoryIndex, undefined, collectibleIndex)
      if (id === 0) continue
      if (IsCollectibleBlacklisted(id)) continue
      const name = GetCollectibleName(id)
      if (name === "") continue
      if (IsCollectibleUnlocked(id)) {
        unlocked.push(id)
      }
    }

    for (let subIndex = 1; subIndex <= numSubCategories; subIndex++) {
      const [_subName, numCollectibles] = GetCollectibleSubCategoryInfo(categoryIndex, subIndex)
      for (let collectibleIndex = 1; collectibleIndex <= numCollectibles; collectibleIndex++) {
        const id = GetCollectibleId(categoryIndex, subIndex, collectibleIndex)
        if (id === 0) continue
        if (IsCollectibleBlacklisted(id)) continue
        const name = GetCollectibleName(id)
        if (name === "") continue
        if (IsCollectibleUnlocked(id)) {
          unlocked.push(id)
        }
      }
    }
  }

  unlocked.sort((a, b) => a - b)
  return unlocked
}

export function collectCollectibles(): undefined {
  const savedVars = getSavedVariables()
  savedVars.account.collectibles = mergeIdList(
    savedVars.account.collectibles,
    scanUnlockedCollectibles()
  )
}

export function updateCollectible(collectibleId: number): undefined {
  const savedVars = getSavedVariables()
  if (savedVars.account.collectibles === undefined) {
    savedVars.account.collectibles = []
  }

  if (!IsCollectibleUnlocked(collectibleId)) return

  for (const id of savedVars.account.collectibles) {
    if (id === collectibleId) return
  }
  savedVars.account.collectibles = [...savedVars.account.collectibles, collectibleId]
}

export function refreshAllCollectibles(): undefined {
  const savedVars = getSavedVariables()
  savedVars.account.collectibles = scanUnlockedCollectibles()
}
