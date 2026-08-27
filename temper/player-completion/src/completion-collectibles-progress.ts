import type { AccountCompletion } from "@temper/game-completion/completion-types"
import type {
  AccountCollectiblesProgress,
  CollectibleCategoryProgress,
  CollectibleSubCategoryProgress,
} from "./completion-ui-types"
import { collectiblesData } from "./generated/collectibles-data.generated"

export function transformCollectiblesProgress(
  completion: AccountCompletion | null | undefined
): AccountCollectiblesProgress {
  const empty: AccountCollectiblesProgress = {
    categories: [],
    unlockedCount: 0,
    totalCount: 0,
  }

  const unlockedSet = new Set<number>()
  const rawCollectibles = completion?.collectibles
  if (rawCollectibles) {
    if (Array.isArray(rawCollectibles)) {
      for (const id of rawCollectibles) {
        if (typeof id === "number") unlockedSet.add(id)
      }
    } else if (typeof rawCollectibles === "object") {
      for (const id of Object.values(rawCollectibles)) {
        if (typeof id === "number") unlockedSet.add(id)
      }
    }
  }

  const categories: CollectibleCategoryProgress[] = []
  let overallUnlocked = 0
  let overallTotal = 0

  for (const cat of collectiblesData) {
    let catUnlocked = 0
    let catTotal = 0

    const subCategories: CollectibleSubCategoryProgress[] = cat.subCategories.map((sub) => {
      let subUnlocked = 0
      let subTotal = 0

      const collectibles = sub.collectibles.map((c) => {
        const unlocked = unlockedSet.has(c.id)
        if (unlocked) subUnlocked++
        subTotal++
        return { id: c.id, name: c.name, unlocked }
      })

      catUnlocked += subUnlocked
      catTotal += subTotal

      return {
        name: sub.name,
        collectibles,
        unlockedCount: subUnlocked,
        totalCount: subTotal,
      }
    })

    categories.push({
      categoryIndex: cat.categoryIndex,
      name: cat.name,
      subCategories,
      unlockedCount: catUnlocked,
      totalCount: catTotal,
    })

    overallUnlocked += catUnlocked
    overallTotal += catTotal
  }

  if (categories.length === 0) return empty

  return {
    categories,
    unlockedCount: overallUnlocked,
    totalCount: overallTotal,
  }
}
