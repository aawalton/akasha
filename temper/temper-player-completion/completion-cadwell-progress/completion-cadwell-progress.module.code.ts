import {
  type CadwellLevelCatalogEntry,
  cadwellTotalCount,
  isCadwellCoordinateComplete,
} from "../completion-cadwell-lookup/completion-cadwell-lookup.module.code.ts"
import type { CompletionCharacterRow } from "../completion-character-row/completion-character-row.module.code.ts"
import { isCharacterMeasured } from "../completion-measured/completion-measured.module.code.ts"
import type {
  CadwellLevelEntry,
  CadwellZoneEntry,
  CharacterCadwellProgress,
} from "../completion-ui-types/completion-ui-types.module.code.ts"

interface GatheredCadwellPoi {
  poiIndex: number
  name: string
  completed: boolean
}

interface GatheredCadwellZone {
  zoneIndex: number
  name: string
  pois: GatheredCadwellPoi[]
}

export function transformCadwellProgress(
  rows: readonly CompletionCharacterRow[],
  levelCatalog: readonly CadwellLevelCatalogEntry[]
): readonly CharacterCadwellProgress[] {
  if (levelCatalog.length === 0) return []

  const totalCount = cadwellTotalCount(levelCatalog)
  const result: CharacterCadwellProgress[] = []

  for (const row of rows) {
    const completion = row.completion
    if (!completion || !isCharacterMeasured(completion)) continue

    let completedCount = 0

    const levels: CadwellLevelEntry[] = levelCatalog.map((levelData) => {
      const gathered: GatheredCadwellZone[] = []
      const byZoneIndex = new Map<number, GatheredCadwellZone>()

      for (const stop of levelData.cadwellStops) {
        let zone = byZoneIndex.get(stop.zoneIndex)
        if (!zone) {
          zone = { zoneIndex: stop.zoneIndex, name: stop.zoneName, pois: [] }
          byZoneIndex.set(stop.zoneIndex, zone)
          gathered.push(zone)
        }

        const completed = isCadwellCoordinateComplete(completion, {
          level: levelData.displayOrder,
          zoneIndex: stop.zoneIndex,
          zoneName: stop.zoneName,
          poiIndex: stop.stopIndex,
          poiName: stop.poiName,
        })
        if (completed) completedCount++
        zone.pois.push({ poiIndex: stop.stopIndex, name: stop.poiName, completed })
      }

      const zones: CadwellZoneEntry[] = gathered
      return { level: levelData.displayOrder, label: levelData.title, zones }
    })

    result.push({
      characterId: row.id,
      levels,
      completedCount,
      totalCount,
    })
  }

  return result
}
