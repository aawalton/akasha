import { getData } from "../item-browser-data/item-browser-data.module.code.ts"
import type { ItemBrowserVars } from "../item-browser-saved-vars/item-browser-saved-vars.module.code.ts"
import type { ItemBrowserListInstance } from "../item-browser-types/item-browser-types.module.code.ts"

export interface ItemBrowserColors {
  health: ZoColorDef
  magicka: ZoColorDef
  stamina: ZoColorDef
  violet: ZoColorDef
  gold: ZoColorDef
  mythic: ZoColorDef
  brown: ZoColorDef
  teal: ZoColorDef
  pink: ZoColorDef
}

let varsState: ItemBrowserVars | undefined
let colorsState: ItemBrowserColors | undefined
let ALLIANCE_STYLE_STATE = 0
let MULTI_STYLE_STATE = 0
let listState: ItemBrowserListInstance | undefined
let settingsPanelState: object | undefined

export function setVars(this: void, value: ItemBrowserVars): undefined {
  varsState = value
  return undefined
}

export function getVars(this: void): ItemBrowserVars {
  if (varsState === undefined) {
    throw new Error("TemperItemBrowser saved variables not initialized")
  }
  return varsState
}

export function setColors(this: void, value: ItemBrowserColors): undefined {
  colorsState = value
  return undefined
}

export function getColors(this: void): ItemBrowserColors {
  if (colorsState === undefined) {
    throw new Error("TemperItemBrowser colors not initialized")
  }
  return colorsState
}

export function setAllianceStyle(this: void, value: number): undefined {
  ALLIANCE_STYLE_STATE = value
  return undefined
}

export function getAllianceStyle(this: void): number {
  return ALLIANCE_STYLE_STATE
}

export function setMultiStyle(this: void, value: number): undefined {
  MULTI_STYLE_STATE = value
  return undefined
}

export function getMultiStyle(this: void): number {
  return MULTI_STYLE_STATE
}

export function setList(this: void, value: ItemBrowserListInstance): undefined {
  listState = value
  return undefined
}

export function getList(this: void): ItemBrowserListInstance | undefined {
  return listState
}

export function setSettingsPanel(this: void, value: object | undefined): undefined {
  settingsPanelState = value
  return undefined
}

export function getSettingsPanel(this: void): object | undefined {
  return settingsPanelState
}

export function checkFlag(this: void, flags: number, flagToCheck: number): boolean {
  return BitAnd(flags, flagToCheck) === flagToCheck
}

export function getZoneNameById(this: void, zoneId: number): string {
  if (zoneId < -100) {
    return getData().specialNames[zoneId] ?? ""
  }
  if (zoneId < 0) {
    return GetString("SI_ITEMBROWSER_SOURCE_SPECIAL", zoneId * -1)
  }
  return LibCodesCommonCode.GetZoneName(zoneId)
}

export function formatTransmuteCost(this: void, cost?: number): string {
  const costText: number | string = cost !== undefined && cost <= 75 ? cost : "—"
  return string.format(
    "%s%s",
    costText,
    zo_iconFormatInheritColor("/esoui/art/currency/gamepad/gp_seedcrystal_mipmap.dds", 16, 16)
  )
}

let antiquitySetItems: { [itemId: number]: number | undefined } | undefined

function getAntiquitySetItems(this: void): { [itemId: number]: number | undefined } {
  if (antiquitySetItems === undefined) {
    const index: { [itemId: number]: number | undefined } = {}
    let antiquityId = GetNextAntiquityId(undefined)
    while (antiquityId !== undefined) {
      const setId = GetAntiquitySetId(antiquityId)
      if (setId !== undefined && setId !== 0) {
        const itemId = GetItemRewardItemId(GetAntiquitySetRewardId(setId))
        if (itemId !== undefined && itemId !== 0) {
          index[itemId] = setId
        }
      }
      antiquityId = GetNextAntiquityId(antiquityId)
    }
    antiquitySetItems = index
  }
  return antiquitySetItems
}

export function getItemAntiquitySetId(this: void, itemLink: string): number {
  return getAntiquitySetItems()[GetItemLinkItemId(itemLink)] ?? 0
}
