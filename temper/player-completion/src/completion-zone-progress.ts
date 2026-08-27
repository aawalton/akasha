import type { CompletionCharacterRow } from "./completion-character-row-type"
import { isCharacterMeasured } from "./completion-measured"
import type {
  CharacterZoneCompletionProgress,
  ZoneActivityProgress,
  ZoneCompletionTypeProgress,
  ZoneCompletionZoneProgress,
} from "./completion-ui-types"
import { zoneCompletionData } from "./generated/zone-completion-data.generated"

const totalCount = zoneCompletionData.reduce(
  (sum, zone) => sum + zone.completionTypes.reduce((s, ct) => s + ct.activities.length, 0),
  0
)

export function transformZoneCompletionProgress(
  rows: readonly CompletionCharacterRow[]
): readonly CharacterZoneCompletionProgress[] {
  if (zoneCompletionData.length === 0) return []

  const result: CharacterZoneCompletionProgress[] = []

  for (const row of rows) {
    const completion = row.completion
    if (!completion || !isCharacterMeasured(completion)) continue

    const completedLookup = new Map<number, Map<number, Set<number>>>()
    const rawZoneCompletion = completion.zoneCompletion
    if (rawZoneCompletion && typeof rawZoneCompletion === "object") {
      for (const [zoneIdStr, typeMap] of Object.entries(rawZoneCompletion)) {
        const zoneId = Number(zoneIdStr)
        if (!typeMap || typeof typeMap !== "object") continue
        const typeLookup = new Map<number, Set<number>>()
        for (const [ctStr, rawIndices] of Object.entries(typeMap)) {
          const ct = Number(ctStr)
          const indices = new Set<number>()
          if (Array.isArray(rawIndices)) {
            for (const idx of rawIndices) {
              if (typeof idx === "number") indices.add(idx)
            }
          } else if (typeof rawIndices === "object" && rawIndices !== null) {
            for (const idx of Object.values(rawIndices)) {
              if (typeof idx === "number") indices.add(idx)
            }
          }
          typeLookup.set(ct, indices)
        }
        completedLookup.set(zoneId, typeLookup)
      }
    }

    let charCompletedCount = 0

    const zones: ZoneCompletionZoneProgress[] = zoneCompletionData.map((zone) => {
      const typeLookup = completedLookup.get(zone.zoneId)
      let zoneCompleted = 0

      const completionTypes: ZoneCompletionTypeProgress[] = zone.completionTypes.map((ct) => {
        const completedIndices = typeLookup?.get(ct.completionType)
        let ctCompleted = 0

        const activities: ZoneActivityProgress[] = ct.activities.map((a) => {
          const completed = completedIndices?.has(a.activityIndex) ?? false
          if (completed) ctCompleted++
          return {
            activityIndex: a.activityIndex,
            name: a.name,
            completed,
          }
        })

        zoneCompleted += ctCompleted
        return {
          completionType: ct.completionType,
          label: ct.label,
          activities,
          completedCount: ctCompleted,
          totalCount: ct.activities.length,
        }
      })

      charCompletedCount += zoneCompleted
      return {
        zoneId: zone.zoneId,
        name: zone.name,
        completionTypes,
        completedCount: zoneCompleted,
        totalCount: zone.completionTypes.reduce((s, ct) => s + ct.activities.length, 0),
      }
    })

    result.push({
      characterId: row.id,
      zones,
      completedCount: charCompletedCount,
      totalCount,
    })
  }

  return result
}
