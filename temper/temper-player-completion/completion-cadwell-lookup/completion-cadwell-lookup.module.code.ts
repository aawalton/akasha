import type {
  CadwellProgress,
  CharacterCompletion,
} from "@akasha/temper-completion/completion-progress"

export interface CadwellLevelCatalogStop {
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

export interface CadwellCoordinate {
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

export function cadwellCoordinatesUnder(
  itemPath: readonly (string | number)[] | null | undefined,
  levelCatalog: readonly CadwellLevelCatalogEntry[]
): readonly CadwellCoordinate[] {
  const coordinates = cadwellCoordinates(levelCatalog)
  const path = itemPath ?? []
  if (path.length === 0) return coordinates

  const level = Number(path[0])
  if (!Number.isFinite(level)) return []
  const byLevel = coordinates.filter((c) => c.level === level)
  if (path.length === 1) return byLevel

  const zoneIndex = Number(path[1])
  if (!Number.isFinite(zoneIndex)) return []
  const byZone = byLevel.filter((c) => c.zoneIndex === zoneIndex)
  if (path.length === 2) return byZone

  const poiIndex = Number(path[2])
  if (!Number.isFinite(poiIndex)) return []
  return byZone.filter((c) => c.poiIndex === poiIndex)
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

export function cadwellCompletedCount(
  completion: CharacterCompletion | null | undefined,
  itemPath: readonly (string | number)[] | null | undefined,
  levelCatalog: readonly CadwellLevelCatalogEntry[]
): number {
  const cadwell = completion?.cadwell
  if (!cadwell) return 0
  const completed = completedPoiNames(cadwell)
  let count = 0
  for (const coordinate of cadwellCoordinatesUnder(itemPath, levelCatalog)) {
    if (completed.has(poiKey(coordinate.zoneName, coordinate.poiName))) count++
  }
  return count
}
