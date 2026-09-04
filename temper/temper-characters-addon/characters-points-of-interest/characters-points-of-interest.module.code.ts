import type { SparsePoiDiscovery } from "@akasha/temper-completion/completion-progress"
import { mergeIdList } from "../characters-collector-merge/characters-collector-merge.module.code.ts"
import { currentCharacterEntry } from "../characters-current-entry/characters-current-entry.module.code.ts"

export function scanPointsOfInterest(this: void): SparsePoiDiscovery {
  const result: SparsePoiDiscovery = {}
  let zoneId = GetNextZoneStoryZoneId(undefined)
  while (zoneId !== undefined) {
    const zoneIndex = GetZoneIndex(zoneId)
    const numPOIs = GetNumPOIs(zoneIndex)
    const discovered: number[] = []
    for (let poiIndex = 1; poiIndex <= numPOIs; poiIndex++) {
      const [, , , , , , isDiscovered] = GetPOIMapInfo(zoneIndex, poiIndex)
      if (isDiscovered) {
        discovered.push(poiIndex)
      }
    }
    if (discovered.length > 0) {
      result[zoneId] = discovered
    }
    zoneId = GetNextZoneStoryZoneId(zoneId)
  }
  return result
}

export function collectPointsOfInterest(this: void): undefined {
  const charEntry = currentCharacterEntry()
  if (charEntry === undefined) return
  charEntry.pointsOfInterest = scanPointsOfInterest()
}

export function updatePointOfInterest(this: void, zoneIndex: number, poiIndex: number): undefined {
  const charEntry = currentCharacterEntry()
  if (charEntry === undefined) return

  const discovery = charEntry.pointsOfInterest ?? {}
  const zoneId = GetZoneId(zoneIndex)
  discovery[zoneId] = mergeIdList(discovery[zoneId], [poiIndex])
  charEntry.pointsOfInterest = discovery
}
