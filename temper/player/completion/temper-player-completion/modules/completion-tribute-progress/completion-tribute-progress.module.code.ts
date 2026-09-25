import { unlockedCollectibleIds } from "akasha/temper/player/completion/modules/completion-progress/completion-progress.module.code.ts"
import type { AccountCompletion } from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"
import type {
  AccountTributeProgress,
  TributeCardUpgradeProgress,
  TributePatronProgress,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-ui-types/completion-ui-types.module.code.ts"

interface TributePatronCatalogCard {
  cardIndex: number
  baseCardName: string
  upgradeCardName: string
}

export interface TributePatronCatalogEntry {
  title: string
  esoPatronId: number
  esoCollectibleId: number
  cards: readonly TributePatronCatalogCard[]
}

function upgradedCardIndexes(
  completion: AccountCompletion | null | undefined
): Map<number, Set<number>> {
  const upgraded = new Map<number, Set<number>>()
  for (const [patronKey, cardIndices] of Object.entries(completion?.tributeCardUpgrades ?? {})) {
    if (cardIndices.length > 0) upgraded.set(Number(patronKey), new Set(cardIndices))
  }
  return upgraded
}

export function transformTributeProgress(
  completion: AccountCompletion | null | undefined,
  patronCatalog: readonly TributePatronCatalogEntry[]
): AccountTributeProgress {
  if (patronCatalog.length === 0) return { patrons: [], completedCount: 0, totalCount: 0 }

  const unlockedIds = unlockedCollectibleIds(completion)
  const upgradedIndexes = upgradedCardIndexes(completion)

  let completedCount = 0
  let totalCount = 0

  const patrons: TributePatronProgress[] = patronCatalog.map((patron) => {
    const unlocked = unlockedIds.has(patron.esoCollectibleId)
    const upgradedHere = upgradedIndexes.get(patron.esoPatronId)

    const cards: TributeCardUpgradeProgress[] = patron.cards.map((card) => ({
      cardIndex: card.cardIndex,
      baseCardName: card.baseCardName,
      upgradeCardName: card.upgradeCardName,
      upgraded: upgradedHere?.has(card.cardIndex) ?? false,
    }))

    let patronHeld = unlocked ? 1 : 0
    for (const card of cards) {
      if (card.upgraded) patronHeld++
    }
    const patronTotal = 1 + cards.length

    completedCount += patronHeld
    totalCount += patronTotal

    return {
      patronId: patron.esoPatronId,
      name: patron.title,
      collectibleId: patron.esoCollectibleId,
      unlocked,
      cards,
      upgradedCount: patronHeld,
      totalCount: patronTotal,
    }
  })

  return { patrons, completedCount, totalCount }
}
