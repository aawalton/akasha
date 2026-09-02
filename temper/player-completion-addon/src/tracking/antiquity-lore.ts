import type { SparseAntiquityLore } from "@akasha/temper-completion/completion-progress"
import { getSavedVariables } from "../saved-variables"
import { mergeMaxByKey } from "./collector-merge"

export function scanAntiquityLore(): SparseAntiquityLore {
  const antiquityLore: SparseAntiquityLore = {}

  let antiquityId = GetNextAntiquityId(undefined)
  while (antiquityId !== undefined && antiquityId !== 0) {
    const totalLoreEntries = GetNumAntiquityLoreEntries(antiquityId)

    if (totalLoreEntries > 0) {
      const acquired = GetNumAntiquityLoreEntriesAcquired(antiquityId)
      if (acquired > 0) {
        antiquityLore[antiquityId] = acquired
      }
    }

    antiquityId = GetNextAntiquityId(antiquityId)
  }

  return antiquityLore
}

export function collectAntiquityLore(): undefined {
  const savedVars = getSavedVariables()
  savedVars.account.antiquityLore = mergeMaxByKey(
    savedVars.account.antiquityLore,
    scanAntiquityLore()
  )
}

export function updateAntiquityLore(antiquityId: number): undefined {
  const savedVars = getSavedVariables()
  const antiquityLore = savedVars.account.antiquityLore
  if (antiquityLore === undefined) return

  const totalLoreEntries = GetNumAntiquityLoreEntries(antiquityId)
  if (totalLoreEntries === 0) return

  const acquired = GetNumAntiquityLoreEntriesAcquired(antiquityId)
  if (acquired > 0) {
    antiquityLore[antiquityId] = acquired
  }
}

export function refreshAllAntiquityLore(): undefined {
  const savedVars = getSavedVariables()
  savedVars.account.antiquityLore = scanAntiquityLore()
}
