import type { CompletionCharacterRow } from "./completion-character-row-type"
import { isCharacterMeasured } from "./completion-measured"
import type {
  CharacterPoiProgress,
  PoiActivityProgress,
  PoiTypeProgress,
  PoiZoneProgress,
} from "./completion-ui-types"
import { poiData } from "./generated/poi-data.generated"
import { isCyrodiilWayshrine } from "./poi-constants"

export function transformPoiProgress(
  rows: readonly CompletionCharacterRow[]
): readonly CharacterPoiProgress[] {
  if (poiData.length === 0) return []

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

    let charDiscoveredCount = 0
    let charTotalCount = 0

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

      charDiscoveredCount += zoneDiscovered
      charTotalCount += zoneTotal
      return {
        zoneId: zone.zoneId,
        name: zone.name,
        poiTypes,
        discoveredCount: zoneDiscovered,
        totalCount: zoneTotal,
      }
    })

    result.push({
      characterId: row.id,
      zones,
      discoveredCount: charDiscoveredCount,
      totalCount: charTotalCount,
    })
  }

  return result
}
