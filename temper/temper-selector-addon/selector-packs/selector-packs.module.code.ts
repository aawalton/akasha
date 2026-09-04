import {
  listAddons,
  reloadUI,
  requestPrioritySave,
  setAddOnEnabled,
} from "../selector-addon-manager/selector-addon-manager.module.code.ts"
import {
  ADDONS_NEVER_DISABLED,
  GLOBAL_PACK_NAME,
} from "../selector-constants/selector-constants.module.code.ts"
import {
  buildPackFromEntries,
  computeEnableActions,
} from "../selector-packs-core/selector-packs-core.module.code.ts"
import {
  getCurrentCharId,
  getCurrentCharName,
  getSavedVariables,
  setCurrentSelectedPack,
} from "../selector-saved-variables/selector-saved-variables.module.code.ts"
import type { Pack } from "../selector-types/selector-types.module.code.ts"

function isCharacterScoped(charName: string | undefined): boolean {
  if (charName !== undefined && charName !== "" && charName !== GLOBAL_PACK_NAME) {
    return true
  }
  return getSavedVariables().saveGroupedByCharacterName === true
}

function charPackStore(): Record<string, Pack> {
  const sv = getSavedVariables()
  const charId = getCurrentCharId()
  let store = sv.addonPacksOfChar[charId]
  if (store === undefined) {
    store = {}
    sv.addonPacksOfChar[charId] = store
  }
  return store
}

export function saveCurrentAsPack(packName: string, charName?: string): undefined {
  if (packName === "") {
    return
  }
  const pack = buildPackFromEntries(listAddons())
  if (isCharacterScoped(charName)) {
    charPackStore()[packName] = pack
  } else {
    getSavedVariables().addonPacks[packName] = pack
  }
  requestPrioritySave()
}

function findPack(packName: string, charName: string): Pack | undefined {
  const sv = getSavedVariables()
  if (charName !== "" && charName !== GLOBAL_PACK_NAME) {
    const charStore = sv.addonPacksOfChar[getCurrentCharId()]
    if (charStore !== undefined) {
      const charPack = charStore[packName]
      if (charPack !== undefined) {
        return charPack
      }
    }
  }
  const globalPack = sv.addonPacks[packName]
  if (globalPack !== undefined) {
    return globalPack
  }
  const charStore = sv.addonPacksOfChar[getCurrentCharId()]
  if (charStore !== undefined) {
    return charStore[packName]
  }
  return undefined
}

export function loadPack(packName: string, charName: string): undefined {
  if (packName === "") {
    return
  }
  const pack = findPack(packName, charName)
  if (pack === undefined) {
    return
  }
  const actions = computeEnableActions(pack, listAddons())
  for (const action of actions) {
    setAddOnEnabled(action.index, action.enabled)
  }
  setCurrentSelectedPack(packName, charName)
  getSavedVariables().packChangedBeforeReloadUI = true
  if (getSavedVariables().autoReloadUI === true) {
    reloadUI()
  }
}

export function deletePack(packName: string, charName: string): undefined {
  if (packName === "") {
    return
  }
  const sv = getSavedVariables()
  if (charName !== "" && charName !== GLOBAL_PACK_NAME) {
    const charStore = sv.addonPacksOfChar[getCurrentCharId()]
    if (charStore !== undefined && charStore[packName] !== undefined) {
      delete charStore[packName]
      requestPrioritySave()
      return
    }
  }
  if (sv.addonPacks[packName] !== undefined) {
    delete sv.addonPacks[packName]
    requestPrioritySave()
    return
  }
  const charStore = sv.addonPacksOfChar[getCurrentCharId()]
  if (charStore !== undefined && charStore[packName] !== undefined) {
    delete charStore[packName]
    requestPrioritySave()
  }
}

export interface ListedPack {
  name: string
  charName: string
  isGlobal: boolean
}

export function listPacks(): ListedPack[] {
  const sv = getSavedVariables()
  const out: ListedPack[] = []
  if (sv.showGlobalPacks === true) {
    for (const name in sv.addonPacks) {
      out.push({ name, charName: GLOBAL_PACK_NAME, isGlobal: true })
    }
  }
  if (sv.showGroupedByCharacterName === true) {
    const charStore = sv.addonPacksOfChar[getCurrentCharId()]
    if (charStore !== undefined) {
      const charName = getCurrentCharName()
      for (const name in charStore) {
        out.push({ name, charName, isGlobal: false })
      }
    }
  }
  return out
}

export function selectAddons(selectAll: boolean): undefined {
  for (const entry of listAddons()) {
    const isProtected = ADDONS_NEVER_DISABLED[entry.name] === true
    const desired = selectAll === true ? true : isProtected
    if (desired !== entry.enabled) {
      setAddOnEnabled(entry.index, desired)
    }
  }
}

export function toggleCurrentAddonState(): undefined {
  const hovered = WINDOW_MANAGER.GetMouseOverControl()
  if (hovered === undefined) {
    return
  }
  zo_callLater(function (this: void): undefined {
    const rowData = resolveAddonRowData(hovered)
    if (rowData === undefined || rowData.index === undefined) {
      return
    }
    const desired = rowData.addOnEnabled !== true
    setAddOnEnabled(rowData.index, desired)
  }, 0)
}

function resolveAddonRowData(control: Control): ZoAddOnRowData | undefined {
  const listData = ZO_ScrollList_GetDataList(ZO_AddOnsList)
  if (listData === undefined) {
    return undefined
  }
  const candidates: (Control | undefined)[] = [control, control.GetParent()]
  for (const candidate of candidates) {
    if (candidate === undefined) {
      continue
    }
    for (const entry of listData) {
      if (entry.control === candidate && entry.data !== undefined) {
        return entry.data
      }
    }
  }
  return undefined
}
