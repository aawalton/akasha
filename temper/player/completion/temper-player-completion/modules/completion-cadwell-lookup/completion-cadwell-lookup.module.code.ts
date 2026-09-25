import type {
  CadwellProgress,
  CharacterCompletion,
} from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"

interface CadwellLevelCatalogStop {
  zoneIndex: number
  zoneName: string
  stopIndex: number
  poiName: string
}

export interface CadwellLevelCatalogEntry {
  title: string
  displayOrder: number
  cadwellStops: readonly CadwellLevelCatalogStop[]
}

interface CadwellCoordinate {
  level: number
  zoneIndex: number
  zoneName: string
  poiIndex: number
  poiName: string
}

function poiKey(zoneName: string, poiName: string): string {
  return `${zoneName} ${poiName}`
}

export function cadwellCoordinates(
  levelCatalog: readonly CadwellLevelCatalogEntry[]
): readonly CadwellCoordinate[] {
  return levelCatalog.flatMap((level) =>
    level.cadwellStops.map((stop) => ({
      level: level.displayOrder,
      zoneIndex: stop.zoneIndex,
      zoneName: stop.zoneName,
      poiIndex: stop.stopIndex,
      poiName: stop.poiName,
    }))
  )
}

export function cadwellTotalCount(levelCatalog: readonly CadwellLevelCatalogEntry[]): number {
  let total = 0
  for (const level of levelCatalog) total += level.cadwellStops.length
  return total
}

const completedNamesByCadwell = new WeakMap<CadwellProgress, ReadonlySet<string>>()

function completedPoiNames(cadwell: CadwellProgress): ReadonlySet<string> {
  const cached = completedNamesByCadwell.get(cadwell)
  if (cached !== undefined) return cached

  const names = new Set<string>()
  for (const level of Object.values(cadwell.levels ?? {})) {
    for (const zone of Object.values(level?.zones ?? {})) {
      if (!zone?.pois) continue
      for (const poi of Object.values(zone.pois)) {
        if (poi?.completed === true) names.add(poiKey(zone.name, poi.name))
      }
    }
  }

  completedNamesByCadwell.set(cadwell, names)
  return names
}

export function isCadwellCoordinateComplete(
  completion: CharacterCompletion | null | undefined,
  coordinate: CadwellCoordinate
): boolean {
  const cadwell = completion?.cadwell
  if (!cadwell) return false
  return completedPoiNames(cadwell).has(poiKey(coordinate.zoneName, coordinate.poiName))
}
