import { CLIENT_SI } from "../writ-i18n-client-si/writ-i18n-client-si.module.code.ts"
import { FOODDRINK } from "../writ-i18n-fooddrink/writ-i18n-fooddrink.module.code.ts"
import { GEAR } from "../writ-i18n-gear/writ-i18n-gear.module.code.ts"
import { MAT } from "../writ-i18n-mat/writ-i18n-mat.module.code.ts"
import { MOTIF } from "../writ-i18n-motif/writ-i18n-motif.module.code.ts"
import { SET } from "../writ-i18n-set/writ-i18n-set.module.code.ts"
import { SHORTEN } from "../writ-ui-strings-shorten/writ-ui-strings-shorten.module.code.ts"
import { STATIC_STRINGS } from "../writ-ui-strings-static/writ-ui-strings-static.module.code.ts"

export interface StrHow {
  name: string
  dynamic: ((this: void, key: string | number) => string | undefined) | undefined
}

export interface StrHowMap {
  STATIC: StrHow
  SHORTEN: StrHow
  MAT: StrHow
  GEAR: StrHow
  SET: StrHow
  MOTIF: StrHow
  FOODDRINK: StrHow
  CLIENT_SI: StrHow
}

declare const _G: Record<string, unknown>

const FOODDRINK_LINK_TAIL = ":1:36:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h"
const GEAR_LINK_TAIL = ":308:50:0:0:0:0:0:0:0:0:0:0:0:0:2:0:0:0:0:0|h|h"
const MAT_LINK_TAIL = ":30:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h"

export function i18nClientSiDyn(this: void, stringIndex: string | number): string {
  const siId = _G[String(stringIndex)]
  return GetString(typeof siId === "number" ? siId : 0)
}

export function i18nFoodDrinkDyn(this: void, fooddrinkId: string | number): string {
  const itemLink = "|H0:item:" + tostring(tonumber(fooddrinkId)) + FOODDRINK_LINK_TAIL
  return zo_strformat("<<t:1>>", GetItemLinkName(itemLink))
}

export function i18nGearDyn(this: void, exampleItemId: string | number): string {
  const itemLink = "|H0:item:" + tostring(tonumber(exampleItemId)) + GEAR_LINK_TAIL
  return zo_strformat("<<t:1>>", GetItemLinkName(itemLink))
}

export function i18nMotifDyn(this: void, motifId: string | number): string {
  return zo_strformat("<<1>>", GetItemStyleName(tonumber(motifId) ?? 0))
}

export function i18nMatDyn(this: void, itemId: string | number): string {
  const itemLink = "|H0:item:" + tostring(tonumber(itemId)) + MAT_LINK_TAIL
  return zo_strformat("<<t:1>>", GetItemLinkName(itemLink))
}

export function i18nSetDyn(this: void, setId: string | number): string | undefined {
  const accessor = TemperWrit.LibSets
  if (accessor === undefined) {
    return undefined
  }
  const lib = accessor()
  if (lib === undefined) {
    return undefined
  }
  return lib.GetSetName(tonumber(setId) ?? 0)
}

const I18N_EN: Record<string, Record<string | number, string>> = {
  static: STATIC_STRINGS,
  SHORTEN,
  MAT,
  GEAR,
  SET,
  MOTIF,
  FOODDRINK,
  client_si: CLIENT_SI,
}

export const STR_HOW: StrHowMap = {
  STATIC: { name: "static", dynamic: undefined },
  SHORTEN: { name: "shorten", dynamic: undefined },
  MAT: { name: "mat", dynamic: i18nMatDyn },
  GEAR: { name: "gear", dynamic: i18nGearDyn },
  SET: { name: "set", dynamic: i18nSetDyn },
  MOTIF: { name: "motif", dynamic: i18nMotifDyn },
  FOODDRINK: { name: "fooddrink", dynamic: i18nFoodDrinkDyn },
  CLIENT_SI: { name: "client_si", dynamic: i18nClientSiDyn },
}

export function langList(this: void): string[] {
  const cached = TemperWrit.lang_list
  if (cached === undefined) {
    const l: string[] = []

    const sv = TemperWrit.savedVariables
    let first: string | undefined
    if (sv !== undefined) {
      first = sv.lang
    }
    if (first === undefined) {
      first = GetCVar("language.2")
    }
    l[l.length] = first

    l[l.length] = "en"

    if (sv === undefined) {
      return l
    }
    TemperWrit.lang_list = l
    return l
  }
  return cached
}

export function str(this: void, key: string | number, how?: StrHow): string | undefined {
  const resolvedHow = how ?? STR_HOW.STATIC

  const table = I18N_EN[resolvedHow.name]
  if (table !== undefined) {
    const staticVal = table[key]
    if (staticVal !== undefined) {
      return staticVal
    }
  }

  if (resolvedHow.dynamic !== undefined) {
    const dynamic = resolvedHow.dynamic(key)
    if (dynamic !== undefined && dynamic !== "") {
      return dynamic
    }
  }

  return undefined
}

export function foodDrink(this: void, key: string | number): string | undefined {
  return str(key, STR_HOW.FOODDRINK)
}

export function gearName(this: void, key: string | number): string | undefined {
  return str(key, STR_HOW.GEAR)
}

export function setName(this: void, key: string | number): string | undefined {
  return str(key, STR_HOW.SET)
}

export function shortenName(this: void, key: string | number): string | undefined {
  return str(key, STR_HOW.SHORTEN)
}

export function si(this: void, key: string | number): string | undefined {
  return str(key, STR_HOW.CLIENT_SI)
}

export function matName(this: void, key: string | number): string | undefined {
  return str(key, STR_HOW.MAT)
}

export function motifName(this: void, key: string | number): string | undefined {
  return str(key, STR_HOW.MOTIF)
}

export function i18nStatic(this: void, key: string): string | undefined {
  return STATIC_STRINGS[key]
}

TemperWrit.STR_HOW = STR_HOW
TemperWrit.Str = str
TemperWrit.FoodDrink = foodDrink
TemperWrit.Gear = gearName
TemperWrit.SetName = setName
TemperWrit.Shorten = shortenName
TemperWrit.SI = si
TemperWrit.Mat = matName
TemperWrit.Motif = motifName
TemperWrit.LangList = langList
TemperWrit.I18NStatic = i18nStatic
TemperWrit.I18NClientSIDyn = i18nClientSiDyn
TemperWrit.I18NFoodDrinkDyn = i18nFoodDrinkDyn
TemperWrit.I18NGearDyn = i18nGearDyn
TemperWrit.I18NMotifDyn = i18nMotifDyn
TemperWrit.I18NMatDyn = i18nMatDyn
TemperWrit.I18NSetDyn = i18nSetDyn
