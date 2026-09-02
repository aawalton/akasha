import type { AccountCompletion } from "@akasha/temper-completion/completion-progress"
import type {
  AccountTributeProgress,
  TributeCardUpgradeProgress,
  TributePatronProgress,
} from "./completion-ui-types"
import { tributeData } from "./generated/tribute-data.generated"

export function transformTributeProgress(
  completion: AccountCompletion | null | undefined
): AccountTributeProgress {
  const empty: AccountTributeProgress = {
    patrons: [],
    completedCount: 0,
    totalCount: 0,
  }

  if (tributeData.length === 0) return empty

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

  const upgradedMap = new Map<number, Set<number>>()
  const rawUpgrades = completion?.tributeCardUpgrades
  if (rawUpgrades && typeof rawUpgrades === "object") {
    for (const [patronKey, cardIndices] of Object.entries(rawUpgrades)) {
      const patronId = Number(patronKey)
      const indexSet = new Set<number>()
      if (Array.isArray(cardIndices)) {
        for (const idx of cardIndices) {
          if (typeof idx === "number") indexSet.add(idx)
        }
      } else if (typeof cardIndices === "object" && cardIndices !== null) {
        for (const idx of Object.values(cardIndices)) {
          if (typeof idx === "number") indexSet.add(idx)
        }
      }
      if (indexSet.size > 0) {
        upgradedMap.set(patronId, indexSet)
      }
    }
  }

  let overallCompleted = 0
  let overallTotal = 0

  const patrons: TributePatronProgress[] = tributeData.map((patron) => {
    const unlocked = unlockedSet.has(patron.collectibleId)
    const upgradedSet = upgradedMap.get(patron.patronId)

    const cards: TributeCardUpgradeProgress[] = patron.cards.map((card) => ({
      cardIndex: card.cardIndex,
      baseCardName: card.baseCardName,
      upgradeCardName: card.upgradeCardName,
      upgraded: upgradedSet?.has(card.cardIndex) ?? false,
    }))

    const patronTotal = 1 + cards.length
    let patronCompleted = unlocked ? 1 : 0
    for (const card of cards) {
      if (card.upgraded) patronCompleted++
    }

    overallCompleted += patronCompleted
    overallTotal += patronTotal

    return {
      patronId: patron.patronId,
      name: patron.name,
      collectibleId: patron.collectibleId,
      unlocked,
      cards,
      upgradedCount: patronCompleted,
      totalCount: patronTotal,
    }
  })

  return {
    patrons,
    completedCount: overallCompleted,
    totalCount: overallTotal,
  }
}
