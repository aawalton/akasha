import type { GlobalTable } from "../addon-keybinds-casts/addon-keybinds-casts.module.code.ts"
import { asKeybindScrollData } from "../addon-keybinds-casts/addon-keybinds-casts.module.code.ts"
import {
  CATEGORY_DATA_TYPE,
  LAYER_DATA_TYPE,
} from "../addon-keybinds-names/addon-keybinds-names.module.code.ts"
import type { LakTable } from "../addon-keybinds-types/addon-keybinds-types.module.code.ts"

export function hookKeybindingListCallbacks(
  this: void,
  typeId: number,
  setupCallbackName: string,
  hideCallbackName: string
): undefined {
  const dataType = ZO_ScrollList_GetDataTypeTable(ZO_KeybindingsList, typeId)
  if (dataType === undefined) {
    throw new Error(
      `the keybindings list holds no data type ${typeId}, so ${setupCallbackName} would never ` +
        "fire and the rows this library adds would go unhooked without saying so"
    )
  }
  const setupCallbackOriginal = dataType.setupCallback
  const hideCallbackOriginal = dataType.hideCallback

  dataType.setupCallback = function (
    this: void,
    control: Control,
    data: InventoryRowSlotData,
    list?: Control
  ): undefined {
    if (setupCallbackOriginal !== undefined) setupCallbackOriginal(control, data, list)
    CALLBACK_MANAGER.FireCallbacks(setupCallbackName, control, data)
    return undefined
  }

  if (hideCallbackOriginal !== undefined) {
    dataType.hideCallback = function (
      this: void,
      control: Control,
      data: InventoryRowSlotData
    ): undefined {
      hideCallbackOriginal(control, data)
      CALLBACK_MANAGER.FireCallbacks(hideCallbackName, control, data)
      return undefined
    }
  } else {
    dataType.hideCallback = function (
      this: void,
      control: Control,
      data: InventoryRowSlotData
    ): undefined {
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
    const scrollData = asKeybindScrollData(ZO_ScrollList_GetDataList(this.list as Control))
    let layerHeader: KeybindScrollEntry | undefined
    let categoryHeader: KeybindScrollEntry | undefined
    const lastSI = SI_NONSTR_INGAMESHAREDSTRINGS_LAST_ENTRY
    const glob = globalThis as GlobalTable

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
        if (type(actionSI) === "number" && (actionSI as number) < lastSI) {
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
