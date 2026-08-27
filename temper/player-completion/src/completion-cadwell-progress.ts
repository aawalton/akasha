import { CADWELL_TOTAL_COUNT, isCadwellCoordinateComplete } from "./completion-cadwell-lookup"
import type { CompletionCharacterRow } from "./completion-character-row-type"
import { isCharacterMeasured } from "./completion-measured"
import type {
  CadwellLevelEntry,
  CadwellZoneEntry,
  CharacterCadwellProgress,
} from "./completion-ui-types"
import { cadwellData } from "./generated/cadwell-data.generated"

export function transformCadwellProgress(
  rows: readonly CompletionCharacterRow[]
): readonly CharacterCadwellProgress[] {
  if (cadwellData.length === 0) return []

  const result: CharacterCadwellProgress[] = []

  for (const row of rows) {
    const completion = row.completion
    if (!completion || !isCharacterMeasured(completion)) continue

    let completedCount = 0

    const levels: CadwellLevelEntry[] = cadwellData.map((levelData) => {
      const zones: CadwellZoneEntry[] = levelData.zones.map((zoneData) => {
        const pois = zoneData.pois.map((poiData) => {
          const completed = isCadwellCoordinateComplete(completion, {
            level: levelData.level,
            zoneIndex: zoneData.zoneIndex,
            zoneName: zoneData.name,
            poiIndex: poiData.poiIndex,
            poiName: poiData.name,
          })
          if (completed) completedCount++
          return { poiIndex: poiData.poiIndex, name: poiData.name, completed }
        })
        return { zoneIndex: zoneData.zoneIndex, name: zoneData.name, pois }
      })
      return { level: levelData.level, label: levelData.label, zones }
    })

    result.push({
      characterId: row.id,
      levels,
      completedCount,
      totalCount: CADWELL_TOTAL_COUNT,
    })
  }

  return result
}
