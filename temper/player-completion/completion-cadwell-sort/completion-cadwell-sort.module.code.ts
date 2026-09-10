export interface CadwellPOIInput {
  name: string
  order: number
  completed: boolean
}

export interface CadwellZoneInput {
  name: string
  order: number
  pois: Record<number, CadwellPOIInput>
}

export interface CadwellLevelInput {
  zones: Record<number, CadwellZoneInput>
}

export interface CadwellProgressInput {
  levels: Record<number, CadwellLevelInput>
}

export interface SortedCadwellPOI {
  id: number
  name: string
  order: number
  completed: boolean
}

export interface SortedCadwellZone {
  id: number
  name: string
  order: number
  pois: readonly SortedCadwellPOI[]
}

export interface SortedCadwellLevel {
  id: number
  zones: readonly SortedCadwellZone[]
}

export interface FirstIncompleteCadwellZone {
  levelId: number
  zoneId: number
  zoneName: string
  incompletePoiNames: readonly string[]
  totalPois: number
}

function byOrderThenId<T extends { order: number }>(
  entries: ReadonlyArray<{ id: number; value: T }>
): ReadonlyArray<{ id: number; value: T }> {
  return [...entries].sort((a, b) => {
    const orderDiff = a.value.order - b.value.order
    return orderDiff !== 0 ? orderDiff : a.id - b.id
  })
}

function toEntries<T>(record: Record<number, T>): ReadonlyArray<{ id: number; value: T }> {
  return Object.entries(record).map(([key, value]) => ({ id: Number(key), value }))
}

export function sortCadwellPois(
  pois: Record<number, CadwellPOIInput>
): readonly SortedCadwellPOI[] {
  return byOrderThenId(toEntries(pois)).map(({ id, value }) => ({
    id,
    name: value.name,
    order: value.order,
    completed: value.completed,
  }))
}

export function sortCadwellZones(
  zones: Record<number, CadwellZoneInput>
): readonly SortedCadwellZone[] {
  return byOrderThenId(toEntries(zones)).map(({ id, value }) => ({
    id,
    name: value.name,
    order: value.order,
    pois: sortCadwellPois(value.pois),
  }))
}

export function sortCadwellLevels(progress: CadwellProgressInput): readonly SortedCadwellLevel[] {
  return Object.entries(progress.levels)
    .map(([key, level]) => ({ id: Number(key), level }))
    .sort((a, b) => a.id - b.id)
    .map(({ id, level }) => ({ id, zones: sortCadwellZones(level.zones) }))
}

export function findFirstIncompleteCadwellZone(
  progress: CadwellProgressInput,
  levelScope?: number
): FirstIncompleteCadwellZone | undefined {
  const levels = sortCadwellLevels(progress)
  for (const level of levels) {
    if (levelScope !== undefined && level.id !== levelScope) continue
    for (const zone of level.zones) {
      const incompletePoiNames = zone.pois.filter((p) => !p.completed).map((p) => p.name)
      if (incompletePoiNames.length > 0) {
        return {
          levelId: level.id,
          zoneId: zone.id,
          zoneName: zone.name,
          incompletePoiNames,
          totalPois: zone.pois.length,
        }
      }
    }
  }
  return undefined
}
