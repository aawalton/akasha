import type { SparseZoneCompletion } from "@temper/game-completion/completion-types"
import { getSavedVariables } from "../saved-variables"
export function scanZoneCompletion(): SparseZoneCompletion {
  const result: SparseZoneCompletion = {}
  let zoneId = GetNextZoneStoryZoneId(undefined)
  while (zoneId !== undefined) {
    const zoneTypes: Record<number, number[]> = {}
    for (let completionType = 1; completionType <= 14; completionType++) {
      const count = GetNumZoneActivitiesForZoneCompletionType(zoneId, completionType)
      if (count === undefined || count === 0) continue
      const completed: number[] = []
      for (let activityIndex = 1; activityIndex <= count; activityIndex++) {
        if (IsZoneStoryActivityComplete(zoneId, completionType, activityIndex)) {
          completed.push(activityIndex)
        }
      }
      if (completed.length > 0) {
        zoneTypes[completionType] = completed
      }
    }
    if (Object.keys(zoneTypes).length > 0) {
      result[zoneId] = zoneTypes
    }
    zoneId = GetNextZoneStoryZoneId(zoneId)
  }
  return result
}

export function collectZoneCompletion(): undefined {
  const savedVars = getSavedVariables()
  const charEntry = savedVars.characters[GetCurrentCharacterId()]
  if (charEntry === undefined) return
  charEntry.zoneCompletion = scanZoneCompletion()
}

export function updateZoneCompletionActivity(
  zoneId: number,
  completionType: number,
  activityId: number
): undefined {
  const savedVars = getSavedVariables()
  const charEntry = savedVars.characters[GetCurrentCharacterId()]
  if (charEntry === undefined) return
  if (charEntry.zoneCompletion === undefined) {
    charEntry.zoneCompletion = {}
  }

  const count = GetNumZoneActivitiesForZoneCompletionType(zoneId, completionType)
  if (count === undefined || count === 0) return
  let activityIndex: number | undefined
  for (let i = 1; i <= count; i++) {
    if (GetZoneActivityIdForZoneCompletionType(zoneId, completionType, i) === activityId) {
      activityIndex = i
      break
    }
  }
  if (activityIndex === undefined) return

  if (charEntry.zoneCompletion[zoneId] === undefined) {
    charEntry.zoneCompletion[zoneId] = {}
  }
  if (charEntry.zoneCompletion[zoneId][completionType] === undefined) {
    charEntry.zoneCompletion[zoneId][completionType] = []
  }

  const arr = charEntry.zoneCompletion[zoneId][completionType]
  if (!arr.includes(activityIndex)) {
    arr.push(activityIndex)
  }
}
