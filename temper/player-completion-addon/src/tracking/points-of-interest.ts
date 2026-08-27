import type { SparsePoiDiscovery } from "@temper/game-completion/completion-types"
import { getSavedVariables } from "../saved-variables"
export function scanPointsOfInterest(): SparsePoiDiscovery {
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

export function collectPointsOfInterest(): undefined {
  const savedVars = getSavedVariables()
  const charEntry = savedVars.characters[GetCurrentCharacterId()]
  if (charEntry === undefined) return
  charEntry.pointsOfInterest = scanPointsOfInterest()
}

export function updatePointOfInterest(zoneIndex: number, poiIndex: number): undefined {
  const savedVars = getSavedVariables()
  const charEntry = savedVars.characters[GetCurrentCharacterId()]
  if (charEntry === undefined) return
  if (charEntry.pointsOfInterest === undefined) {
    charEntry.pointsOfInterest = {}
  }

  const zoneId = GetZoneId(zoneIndex)
  if (charEntry.pointsOfInterest[zoneId] === undefined) {
    charEntry.pointsOfInterest[zoneId] = []
  }

  const arr = charEntry.pointsOfInterest[zoneId]
  if (!arr.includes(poiIndex)) {
    arr.push(poiIndex)
  }
}
