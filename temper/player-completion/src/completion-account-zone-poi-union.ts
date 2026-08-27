import { requireFirst } from "../../../shared/utils-narrow/src/require-first"
import type {
  CharacterPoiProgress,
  CharacterZoneCompletionProgress,
  PoiActivityProgress,
  PoiTypeProgress,
  PoiZoneProgress,
  ZoneActivityProgress,
  ZoneCompletionTypeProgress,
  ZoneCompletionZoneProgress,
} from "./completion-ui-types"
import { poiData } from "./generated/poi-data.generated"
import { isCyrodiilWayshrine } from "./poi-constants"

export interface AccountZoneCompletionUnionProgress {
  zones: readonly ZoneCompletionZoneProgress[]
  completedCount: number
  totalCount: number
}

export function transformAccountZoneCompletionUnion(
  zoneProgress: readonly CharacterZoneCompletionProgress[]
): AccountZoneCompletionUnionProgress {
  if (zoneProgress.length === 0) {
    return { zones: [], completedCount: 0, totalCount: 0 }
  }

  const completedLookup = new Map<number, Map<number, Set<number>>>()
  for (const cp of zoneProgress) {
    for (const zone of cp.zones) {
      let typeLookup = completedLookup.get(zone.zoneId)
      if (!typeLookup) {
        typeLookup = new Map()
        completedLookup.set(zone.zoneId, typeLookup)
      }
      for (const ct of zone.completionTypes) {
        let indices = typeLookup.get(ct.completionType)
        if (!indices) {
          indices = new Set()
          typeLookup.set(ct.completionType, indices)
        }
        for (const a of ct.activities) {
          if (a.completed) indices.add(a.activityIndex)
        }
      }
    }
  }

  const template = requireFirst(zoneProgress)
  let completedCount = 0
  let totalCount = 0

  const zones: ZoneCompletionZoneProgress[] = template.zones.map((zone) => {
    const typeLookup = completedLookup.get(zone.zoneId)
    let zoneCompleted = 0
    let zoneTotal = 0

    const completionTypes: ZoneCompletionTypeProgress[] = zone.completionTypes.map((ct) => {
      const completedIndices = typeLookup?.get(ct.completionType)
      let ctCompleted = 0

      const activities: ZoneActivityProgress[] = ct.activities.map((a) => {
        const completed = completedIndices?.has(a.activityIndex) ?? false
        totalCount++
        zoneTotal++
        if (completed) {
          completedCount++
          zoneCompleted++
          ctCompleted++
        }
        return {
          activityIndex: a.activityIndex,
          name: a.name,
          completed,
        }
      })

      return {
        completionType: ct.completionType,
        label: ct.label,
        activities,
        completedCount: ctCompleted,
        totalCount: activities.length,
      }
    })

    return {
      zoneId: zone.zoneId,
      name: zone.name,
      completionTypes,
      completedCount: zoneCompleted,
      totalCount: zoneTotal,
    }
  })

  return { zones, completedCount, totalCount }
}

export interface AccountPoiUnionProgress {
  zones: readonly PoiZoneProgress[]
  discoveredCount: number
  totalCount: number
}

export function transformAccountPoiUnion(
  poiProgress: readonly CharacterPoiProgress[]
): AccountPoiUnionProgress {
  if (poiProgress.length === 0) {
    return { zones: [], discoveredCount: 0, totalCount: 0 }
  }

  const discoveredLookup = new Map<number, Set<number>>()
  for (const cp of poiProgress) {
    for (const zone of cp.zones) {
      let indices = discoveredLookup.get(zone.zoneId)
      if (!indices) {
        indices = new Set()
        discoveredLookup.set(zone.zoneId, indices)
      }
      for (const pt of zone.poiTypes) {
        for (const p of pt.pois) {
          if (p.discovered) indices.add(p.poiIndex)
        }
      }
    }
  }

  let discoveredCount = 0
  let totalCount = 0

  const zones: PoiZoneProgress[] = poiData.map((zone) => {
    const discoveredIndices = discoveredLookup.get(zone.zoneId)
    let zoneDiscovered = 0
    let zoneTotal = 0

    const poiTypes: PoiTypeProgress[] = zone.poiTypes.flatMap((pt) => {
      const excludeUndiscovered = isCyrodiilWayshrine(zone.zoneId, pt.poiType)
      let ptDiscovered = 0

      const pois: PoiActivityProgress[] = []
      for (const p of pt.pois) {
        const discovered = discoveredIndices?.has(p.poiIndex) ?? false
        if (excludeUndiscovered && !discovered) continue
        if (discovered) ptDiscovered++
        pois.push({ poiIndex: p.poiIndex, name: p.name, discovered })
      }

      if (pois.length === 0) return []

      zoneDiscovered += ptDiscovered
      zoneTotal += pois.length
      return [
        {
          poiType: pt.poiType,
          label: pt.label,
          pois,
          discoveredCount: ptDiscovered,
          totalCount: pois.length,
        },
      ]
    })

    discoveredCount += zoneDiscovered
    totalCount += zoneTotal
    return {
      zoneId: zone.zoneId,
      name: zone.name,
      poiTypes,
      discoveredCount: zoneDiscovered,
      totalCount: zoneTotal,
    }
  })

  return { zones, discoveredCount, totalCount }
}
