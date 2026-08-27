import { asControl, asGlobalTable, asKeybindScrollData, asNumber } from "./casts"
import { CATEGORY_DATA_TYPE, LAYER_DATA_TYPE } from "./constants"
import type { KeybindScrollEntry, LakTable } from "./types"

export function hookKeybindingListCallbacks(
  this: void,
  typeId: number,
  setupCallbackName: string,
  hideCallbackName: string
): undefined {
  const dataType = ZO_ScrollList_GetDataTypeTable(ZO_KeybindingsList, typeId)
  const setupCallbackOriginal = dataType.setupCallback
  const hideCallbackOriginal = dataType.hideCallback

  dataType.setupCallback = function (
    this: void,
    control: object,
    data: object,
    list: object
  ): undefined {
    setupCallbackOriginal(control, data, list)
    CALLBACK_MANAGER.FireCallbacks(setupCallbackName, control, data)
    return undefined
  }

  if (hideCallbackOriginal !== undefined) {
    dataType.hideCallback = function (this: void, control: object, data: object): undefined {
      hideCallbackOriginal(control, data)
      CALLBACK_MANAGER.FireCallbacks(hideCallbackName, control, data)
      return undefined
    }
  } else {
    dataType.hideCallback = function (this: void, control: object, data: object): undefined {
      CALLBACK_MANAGER.FireCallbacks(hideCallbackName, control, data)
      return undefined
    }
  }
  return undefined
}

export function hookKeybindingListFilter(
  this: void,
  lak: LakTable,
  keybindingManager: KeybindingManager
): undefined {
  keybindingManager.list.FilterScrollList = function (this: KeybindingsSortFilterList): undefined {
    const scrollData = asKeybindScrollData(ZO_ScrollList_GetDataList(asControl(this.list)))
    let layerHeader: KeybindScrollEntry | undefined
    let categoryHeader: KeybindScrollEntry | undefined
    const lastSI = SI_NONSTR_INGAMESHAREDSTRINGS_LAST_ENTRY
    const glob = asGlobalTable(globalThis)

    ZO_ScrollList_Clear(this.list)

    for (const dataEntry of this.masterList) {
      if (dataEntry.typeId === LAYER_DATA_TYPE) {
        layerHeader = dataEntry
        categoryHeader = undefined
      } else if (dataEntry.typeId === CATEGORY_DATA_TYPE) {
        categoryHeader = dataEntry
      } else {
        let insertEntry = lak.showAddonKeybinds
        const data = dataEntry.data
        const actionSI = data === undefined ? undefined : glob[`SI_BINDING_NAME_${data.actionName}`]
        if (type(actionSI) === "number" && asNumber(actionSI) < lastSI) {
          insertEntry = !insertEntry
        }
        if (insertEntry) {
          if (layerHeader !== undefined) {
            scrollData[scrollData.length] = layerHeader
            layerHeader = undefined
          }
          if (categoryHeader !== undefined) {
            scrollData[scrollData.length] = categoryHeader
            categoryHeader = undefined
          }
          scrollData[scrollData.length] = dataEntry
        }
      }
    }
    return undefined
  }
  return undefined
}
