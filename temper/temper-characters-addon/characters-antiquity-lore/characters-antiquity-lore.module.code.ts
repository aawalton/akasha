import type { SparseAntiquityLore } from "@akasha/temper-completion/completion-progress"
import { getSavedVariables } from "@akasha/temper-player-completion-state/completion-saved-variables"
import { mergeMaxByKey } from "../characters-collector-merge/characters-collector-merge.module.code.ts"

function loreEntriesAcquired(antiquityId: number): number | undefined {
  if (GetNumAntiquityLoreEntries(antiquityId) === 0) return undefined
  const acquired = GetNumAntiquityLoreEntriesAcquired(antiquityId)
  if (acquired === 0) return undefined
  return acquired
}

export function scanAntiquityLore(this: void): SparseAntiquityLore {
  const antiquityLore: SparseAntiquityLore = {}

  let antiquityId = GetNextAntiquityId(undefined)
  while (antiquityId !== undefined && antiquityId !== 0) {
    const acquired = loreEntriesAcquired(antiquityId)
    if (acquired !== undefined) {
      antiquityLore[antiquityId] = acquired
    }
    antiquityId = GetNextAntiquityId(antiquityId)
  }

  return antiquityLore
}

export function collectAntiquityLore(this: void): undefined {
  const savedVars = getSavedVariables()
  savedVars.account.antiquityLore = mergeMaxByKey(
    savedVars.account.antiquityLore,
    scanAntiquityLore()
  )
}

export function updateAntiquityLore(this: void, antiquityId: number): undefined {
  const antiquityLore = getSavedVariables().account.antiquityLore
  if (antiquityLore === undefined) return

  const acquired = loreEntriesAcquired(antiquityId)
  if (acquired === undefined) return
  antiquityLore[antiquityId] = acquired
}

export function refreshAllAntiquityLore(this: void): undefined {
  getSavedVariables().account.antiquityLore = scanAntiquityLore()
}
