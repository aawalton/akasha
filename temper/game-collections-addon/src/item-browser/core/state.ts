import { getData } from "../data/index"
import type { ItemBrowserVars } from "../saved-variables"
import type { ItemBrowserListInstance } from "./types"

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
let allianceStyleState = 0
let multiStyleState = 0
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
  allianceStyleState = value
  return undefined
}

export function getAllianceStyle(this: void): number {
  return allianceStyleState
}

export function setMultiStyle(this: void, value: number): undefined {
  multiStyleState = value
  return undefined
}

export function getMultiStyle(this: void): number {
  return multiStyleState
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
