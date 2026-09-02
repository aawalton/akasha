import type { CadwellProgress, CharacterCompletion } from "@akasha/temper-completion/completion-progress"
import { cadwellData } from "./generated/cadwell-data.generated"

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

const CADWELL_COORDINATES: readonly CadwellCoordinate[] = cadwellData.flatMap((level) =>
  level.zones.flatMap((zone) =>
    zone.pois.map((poi) => ({
      level: level.level,
      zoneIndex: zone.zoneIndex,
      zoneName: zone.name,
      poiIndex: poi.poiIndex,
      poiName: poi.name,
    }))
  )
)

export const CADWELL_TOTAL_COUNT = CADWELL_COORDINATES.length

export function cadwellCoordinatesUnder(
  itemPath?: readonly (string | number)[] | null
): readonly CadwellCoordinate[] {
  const path = itemPath ?? []
  if (path.length === 0) return CADWELL_COORDINATES

  const level = Number(path[0])
  if (!Number.isFinite(level)) return []
  const byLevel = CADWELL_COORDINATES.filter((c) => c.level === level)
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
  itemPath?: readonly (string | number)[] | null
): number {
  const cadwell = completion?.cadwell
  if (!cadwell) return 0
  const completed = completedPoiNames(cadwell)
  let count = 0
  for (const coordinate of cadwellCoordinatesUnder(itemPath)) {
    if (completed.has(poiKey(coordinate.zoneName, coordinate.poiName))) count++
  }
  return count
}
