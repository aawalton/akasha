import type { CadwellLevel, CadwellPOI, CadwellProgress, CadwellZone } from "@temper/game-completion/completion-types"
import { getSavedVariables } from "../saved-variables"
export const CADWELL_LEVELS = [
  CADWELL_PROGRESSION_LEVEL_BRONZE,
  CADWELL_PROGRESSION_LEVEL_SILVER,
  CADWELL_PROGRESSION_LEVEL_GOLD,
]

export function scanCadwellProgress(): CadwellProgress {
  const progressionLevel = GetCadwellProgressionLevel()
  const levels: Record<number, CadwellLevel> = {}

  for (const level of CADWELL_LEVELS) {
    const numZones = GetNumZonesForCadwellProgressionLevel(level)
    const zones: Record<number, CadwellZone> = {}

    for (let z = 1; z <= numZones; z++) {
      const [zoneName, zoneDescription, zoneOrder] = GetCadwellZoneInfo(level, z)
      if (zoneName === "") continue

      const numPOIs = GetNumPOIsForCadwellProgressionLevelAndZone(level, z)
      const pois: Record<number, CadwellPOI> = {}

      for (let p = 1; p <= numPOIs; p++) {
        const [name, openingText, closingText, order, discovered, completed] =
          GetCadwellZonePOIInfo(level, z, p)
        if (name === "") continue

        pois[p] = { name, openingText, closingText, order, discovered, completed }
      }

      zones[z] = { name: zoneName, description: zoneDescription, order: zoneOrder, pois }
    }

    levels[level] = { zones }
  }

  return { progressionLevel, levels }
}

export function collectCadwell(): undefined {
  const savedVars = getSavedVariables()
  const charEntry = savedVars.characters[GetCurrentCharacterId()]
  if (charEntry === undefined) return

  charEntry.cadwell = scanCadwellProgress()
}

export function refreshCadwellProgress(): undefined {
  collectCadwell()
}
