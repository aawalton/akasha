import type { SparseZoneCompletion } from "@akasha/temper-completion/completion-progress"
import { mergeIdList } from "../characters-collector-merge/characters-collector-merge.module.code.ts"
import { currentCharacterEntry } from "../characters-current-entry/characters-current-entry.module.code.ts"

export function scanZoneCompletion(this: void): SparseZoneCompletion {
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

export function collectZoneCompletion(this: void): undefined {
  const charEntry = currentCharacterEntry()
  if (charEntry === undefined) return
  charEntry.zoneCompletion = scanZoneCompletion()
}

function zoneActivityIndex(
  zoneId: number,
  completionType: number,
  activityId: number
): number | undefined {
  const count = GetNumZoneActivitiesForZoneCompletionType(zoneId, completionType)
  if (count === undefined || count === 0) return undefined
  for (let i = 1; i <= count; i++) {
    if (GetZoneActivityIdForZoneCompletionType(zoneId, completionType, i) === activityId) {
      return i
    }
  }
  return undefined
}

export function updateZoneCompletionActivity(
  this: void,
  zoneId: number,
  completionType: number,
  activityId: number
): undefined {
  const charEntry = currentCharacterEntry()
  if (charEntry === undefined) return

  const activityIndex = zoneActivityIndex(zoneId, completionType, activityId)
  if (activityIndex === undefined) return

  const completion = charEntry.zoneCompletion ?? {}
  const zoneTypes = completion[zoneId] ?? {}
  zoneTypes[completionType] = mergeIdList(zoneTypes[completionType], [activityIndex])
  completion[zoneId] = zoneTypes
  charEntry.zoneCompletion = completion
}
