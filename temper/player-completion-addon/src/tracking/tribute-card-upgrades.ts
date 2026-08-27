import { getSavedVariables } from "../saved-variables"
import { mergeIdListsByKey } from "./collector-merge"

export function scanTributeCardUpgrades(): Record<number, number[]> {
  const result: Record<number, number[]> = {}

  const numPatrons = GetNumTributePatrons()
  for (let i = 1; i <= numPatrons; i++) {
    const patronId = GetTributePatronIdAtIndex(i)
    if (patronId === 0) continue

    const numDockCards = GetTributePatronNumDockCards(patronId)
    const upgraded: number[] = []

    for (let cardIndex = 1; cardIndex <= numDockCards; cardIndex++) {
      const [, upgradeCardId] = GetTributePatronDockCardInfoByIndex(patronId, cardIndex)
      if (upgradeCardId === 0) continue

      if (IsCollectibleTributePatronBookCardUpgraded(patronId, cardIndex)) {
        upgraded.push(cardIndex)
      }
    }

    if (upgraded.length > 0) {
      result[patronId] = upgraded
    }
  }

  return result
}

export function collectTributeCardUpgrades(): undefined {
  const savedVars = getSavedVariables()
  savedVars.account.tributeCardUpgrades = mergeIdListsByKey(
    savedVars.account.tributeCardUpgrades,
    scanTributeCardUpgrades()
  )
}

export function updateTributeCardUpgrade(patronId: number): undefined {
  const savedVars = getSavedVariables()
  if (savedVars.account.tributeCardUpgrades === undefined) {
    savedVars.account.tributeCardUpgrades = {}
  }

  const numDockCards = GetTributePatronNumDockCards(patronId)
  const upgraded: number[] = []

  for (let cardIndex = 1; cardIndex <= numDockCards; cardIndex++) {
    const [, upgradeCardId] = GetTributePatronDockCardInfoByIndex(patronId, cardIndex)
    if (upgradeCardId === 0) continue

    if (IsCollectibleTributePatronBookCardUpgraded(patronId, cardIndex)) {
      upgraded.push(cardIndex)
    }
  }

  if (upgraded.length > 0) {
    savedVars.account.tributeCardUpgrades[patronId] = upgraded
  }
}

export function refreshAllTributeCardUpgrades(): undefined {
  const savedVars = getSavedVariables()
  savedVars.account.tributeCardUpgrades = scanTributeCardUpgrades()
}
