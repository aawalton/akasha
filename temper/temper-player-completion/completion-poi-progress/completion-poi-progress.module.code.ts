import type { CompletionCharacterRow } from "../completion-character-row/completion-character-row.module.code.ts"
import { isCharacterMeasured } from "../completion-measured/completion-measured.module.code.ts"
import type {
  CharacterPoiProgress,
  PoiActivityProgress,
  PoiTypeProgress,
  PoiZoneProgress,
} from "../completion-ui-types/completion-ui-types.module.code.ts"
import { isCyrodiilWayshrine } from "../cyrodiil-wayshrine/cyrodiil-wayshrine.module.code.ts"

export interface PoiZoneCatalogPoi {
  poiType: number
  poiTypeLabel: string
  poiIndex: number
  poiName: string
}

export interface PoiZoneCatalogEntry {
  title: string
  esoZoneId: number
  pois: readonly PoiZoneCatalogPoi[]
}

export interface PoiZonesTally {
  zones: PoiZoneProgress[]
  discoveredCount: number
  totalCount: number
}

interface PoiKindGroup {
  poiType: number
  label: string
  places: PoiZoneCatalogPoi[]
}

function groupByPoiType(pois: readonly PoiZoneCatalogPoi[]): readonly PoiKindGroup[] {
  const groups: PoiKindGroup[] = []
  const byPoiType = new Map<number, PoiKindGroup>()
  for (const poi of pois) {
    let group = byPoiType.get(poi.poiType)
    if (!group) {
      group = { poiType: poi.poiType, label: poi.poiTypeLabel, places: [] }
      byPoiType.set(poi.poiType, group)
      groups.push(group)
    }
    group.places.push(poi)
  }
  return groups
}

export function tallyPoiZones(
  zoneCatalog: readonly PoiZoneCatalogEntry[],
  discoveredByZone: ReadonlyMap<number, ReadonlySet<number>>
): PoiZonesTally {
  let discoveredCount = 0
  let totalCount = 0

  const zones: PoiZoneProgress[] = zoneCatalog.map((zone) => {
    const discoveredIndices = discoveredByZone.get(zone.esoZoneId)
    let zoneDiscovered = 0
    let zoneTotal = 0

    const poiTypes: PoiTypeProgress[] = groupByPoiType(zone.pois).flatMap((group) => {
      const excludeUndiscovered = isCyrodiilWayshrine(zone.esoZoneId, group.poiType)
      let ptDiscovered = 0

      const pois: PoiActivityProgress[] = []
      for (const p of group.places) {
        const discovered = discoveredIndices?.has(p.poiIndex) ?? false
        if (excludeUndiscovered && !discovered) continue
        if (discovered) ptDiscovered++
        pois.push({ poiIndex: p.poiIndex, name: p.poiName, discovered })
      }

      if (pois.length === 0) return []

      zoneDiscovered += ptDiscovered
      zoneTotal += pois.length
      return [
        {
          poiType: group.poiType,
          label: group.label,
          pois,
          discoveredCount: ptDiscovered,
          totalCount: pois.length,
        },
      ]
    })

    discoveredCount += zoneDiscovered
    totalCount += zoneTotal
    return {
      zoneId: zone.esoZoneId,
      name: zone.title,
      poiTypes,
      discoveredCount: zoneDiscovered,
      totalCount: zoneTotal,
    }
  })

  return { zones, discoveredCount, totalCount }
}

export function transformPoiProgress(
  rows: readonly CompletionCharacterRow[],
  zoneCatalog: readonly PoiZoneCatalogEntry[]
): readonly CharacterPoiProgress[] {
  if (zoneCatalog.length === 0) return []

  const result: CharacterPoiProgress[] = []

  for (const row of rows) {
    const completion = row.completion
    if (!completion || !isCharacterMeasured(completion)) continue

    const discoveredLookup = new Map<number, Set<number>>()
    const rawPoi = completion.pointsOfInterest
    if (rawPoi && typeof rawPoi === "object") {
      for (const [zoneIdStr, rawIndices] of Object.entries(rawPoi)) {
        const zoneId = Number(zoneIdStr)
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
        discoveredLookup.set(zoneId, indices)
      }
    }

    const tally = tallyPoiZones(zoneCatalog, discoveredLookup)

    result.push({
      characterId: row.id,
      zones: tally.zones,
      discoveredCount: tally.discoveredCount,
      totalCount: tally.totalCount,
    })
  }

  return result
}
