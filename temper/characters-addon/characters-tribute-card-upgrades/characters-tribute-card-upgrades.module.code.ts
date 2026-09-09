import { getSavedVariables } from "@akasha/temper-player-completion-state/completion-saved-variables"
import { mergeIdListsByKey } from "../characters-collector-merge/characters-collector-merge.module.code.ts"

function upgradedPatronCards(patronId: number): number[] {
  const upgraded: number[] = []
  const numDockCards = GetTributePatronNumDockCards(patronId)

  for (let cardIndex = 1; cardIndex <= numDockCards; cardIndex++) {
    const [, upgradeCardId] = GetTributePatronDockCardInfoByIndex(patronId, cardIndex)
    if (upgradeCardId === 0) continue

    if (IsCollectibleTributePatronBookCardUpgraded(patronId, cardIndex)) {
      upgraded.push(cardIndex)
    }
  }

  return upgraded
}

export function scanTributeCardUpgrades(this: void): Record<number, number[]> {
  const result: Record<number, number[]> = {}

  const numPatrons = GetNumTributePatrons()
  for (let i = 1; i <= numPatrons; i++) {
    const patronId = GetTributePatronIdAtIndex(i)
    if (patronId === 0) continue

    const upgraded = upgradedPatronCards(patronId)
    if (upgraded.length > 0) {
      result[patronId] = upgraded
    }
  }

  return result
}

export function collectTributeCardUpgrades(this: void): undefined {
  const savedVars = getSavedVariables()
  savedVars.account.tributeCardUpgrades = mergeIdListsByKey(
    savedVars.account.tributeCardUpgrades,
    scanTributeCardUpgrades()
  )
}

export function updateTributeCardUpgrade(this: void, patronId: number): undefined {
  const upgraded = upgradedPatronCards(patronId)
  if (upgraded.length === 0) return

  const savedVars = getSavedVariables()
  const stored = savedVars.account.tributeCardUpgrades ?? {}
  stored[patronId] = upgraded
  savedVars.account.tributeCardUpgrades = stored
}

export function refreshAllTributeCardUpgrades(this: void): undefined {
  getSavedVariables().account.tributeCardUpgrades = scanTributeCardUpgrades()
}
