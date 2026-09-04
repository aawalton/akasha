import { requireFirst } from "@akasha/utils-narrow/require-first"
import {
  type PoiZoneCatalogEntry,
  tallyPoiZones,
} from "../completion-poi-progress/completion-poi-progress.module.code.ts"
import type {
  CharacterPoiProgress,
  CharacterZoneCompletionProgress,
  PoiZoneProgress,
  ZoneActivityProgress,
  ZoneCompletionTypeProgress,
  ZoneCompletionZoneProgress,
} from "../completion-ui-types/completion-ui-types.module.code.ts"

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
  poiProgress: readonly CharacterPoiProgress[],
  zoneCatalog: readonly PoiZoneCatalogEntry[]
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

  const tally = tallyPoiZones(zoneCatalog, discoveredLookup)

  return {
    zones: tally.zones,
    discoveredCount: tally.discoveredCount,
    totalCount: tally.totalCount,
  }
}
