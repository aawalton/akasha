import {
  GLOBAL_PACK_NAME,
  MAX_ADDON_LOAD_PACK_KEYBINDS,
  SAVED_VARIABLES_NAME,
  SAVED_VARIABLES_VERSION,
} from "../selector-constants/selector-constants.module.code.ts"
import type {
  PackKeybind,
  SavedVariablesData,
  SelectedPackRef,
} from "../selector-types/selector-types.module.code.ts"

function buildDefaults(): SavedVariablesData {
  const packKeybinds: PackKeybind[] = []
  for (let i = 0; i < MAX_ADDON_LOAD_PACK_KEYBINDS; i++) {
    packKeybinds.push({})
  }
  return {
    addonPacks: {},
    addonPacksOfChar: {},
    autoReloadUI: false,
    showGlobalPacks: true,
    showGroupedByCharacterName: false,
    saveGroupedByCharacterName: false,
    selectedPackNameForCharacters: {},
    packKeybinds,
    packChangedBeforeReloadUI: false,
  }
}

let savedVars: SavedVariablesData | undefined

export function initializeSavedVariables(): undefined {
  savedVars = ZO_SavedVars.NewAccountWide<SavedVariablesData>(
    SAVED_VARIABLES_NAME,
    SAVED_VARIABLES_VERSION,
    undefined,
    buildDefaults()
  )
}

export function isSavedVariablesReady(): boolean {
  return savedVars !== undefined
}

export function getSavedVariables(): SavedVariablesData {
  if (savedVars === undefined) {
    throw new Error("TemperAddons SavedVariables not initialized")
  }
  return savedVars
}

export function getCurrentCharId(): string {
  return tostring(GetCurrentCharacterId())
}

export function getCurrentCharName(): string {
  return zo_strformat("<<1>>", GetUnitName("player"))
}

export function getCurrentSelectedPack(): SelectedPackRef | undefined {
  return getSavedVariables().selectedPackNameForCharacters[getCurrentCharId()]
}

export function setCurrentSelectedPack(packName: string, charName: string): undefined {
  if (packName === "") {
    return
  }
  getSavedVariables().selectedPackNameForCharacters[getCurrentCharId()] = {
    packName,
    charName: charName === "" ? GLOBAL_PACK_NAME : charName,
    timestamp: GetTimeStamp(),
  }
}
