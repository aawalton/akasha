import { DEFAULT_COLORS, type MarkerState } from "./constants"

export interface MwimSavedVars {
  inventoryTweaks?: boolean
  motifChar?: string
  requireMats?: boolean
  doable?: number
  completed?: number
  unknown?: number
}

declare global {
  var TemperMasterWritInventoryMarker_SavedVariables: Record<string, MwimSavedVars> | undefined
}

let sv: MwimSavedVars | undefined

export function initSavedVariables(this: void): undefined {
  const server = LibCodesCommonCode.GetServerName()
  if (TemperMasterWritInventoryMarker_SavedVariables === undefined) {
    TemperMasterWritInventoryMarker_SavedVariables = {}
  }
  if (TemperMasterWritInventoryMarker_SavedVariables[server] === undefined) {
    TemperMasterWritInventoryMarker_SavedVariables[server] = {}
  }
  sv = TemperMasterWritInventoryMarker_SavedVariables[server]
  return undefined
}

export function getSv(this: void): MwimSavedVars {
  if (sv === undefined) {
    throw new Error("TemperMasterWritInventoryMarker saved variables not initialized")
  }
  return sv
}

export function areInventoryTweaksEnabled(this: void): boolean {
  return getSv().inventoryTweaks !== false
}

export function getMotifCharId(this: void): string | undefined {
  const motifChar = getSv().motifChar
  if (motifChar === "current") {
    return undefined
  }
  if (typeof motifChar === "string" && zo_strlen(motifChar) === 16) {
    return motifChar
  }
  const char = LibCharacterKnowledge.GetCharacterList()[0]
  return char !== undefined ? char.id : undefined
}

export function getMarkerColor(this: void, key: MarkerState): number {
  const stored = getSv()[key]
  if (typeof stored === "number") {
    return stored
  }
  return DEFAULT_COLORS[key]
}
