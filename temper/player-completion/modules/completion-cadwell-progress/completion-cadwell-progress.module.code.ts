import {
  type CadwellLevelCatalogEntry,
  cadwellCoordinates,
  cadwellTotalCount,
  isCadwellCoordinateComplete,
} from "akasha/temper/player-completion/modules/completion-cadwell-lookup/completion-cadwell-lookup.module.code.ts"
import type { CompletionCharacterRow } from "akasha/temper/player-completion/modules/completion-character-row/completion-character-row.module.code.ts"
import { isCharacterMeasured } from "akasha/temper/player-completion/modules/completion-measured/completion-measured.module.code.ts"
import type {
  CadwellLevelEntry,
  CadwellZoneEntry,
  CharacterCadwellProgress,
} from "akasha/temper/player-completion/modules/completion-ui-types/completion-ui-types.module.code.ts"

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

      for (const coordinate of cadwellCoordinates([levelData])) {
        let zone = byZoneIndex.get(coordinate.zoneIndex)
        if (!zone) {
          zone = { zoneIndex: coordinate.zoneIndex, name: coordinate.zoneName, pois: [] }
          byZoneIndex.set(coordinate.zoneIndex, zone)
          gathered.push(zone)
        }

        const completed = isCadwellCoordinateComplete(completion, coordinate)
        if (completed) completedCount++
        zone.pois.push({ poiIndex: coordinate.poiIndex, name: coordinate.poiName, completed })
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
