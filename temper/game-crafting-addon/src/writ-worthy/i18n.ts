import { clientSi } from "./generated/i18n-data-client-si.generated"
import { fooddrink } from "./generated/i18n-data-fooddrink.generated"
import { gear } from "./generated/i18n-data-gear.generated"
import { mat } from "./generated/i18n-data-mat.generated"
import { motif } from "./generated/i18n-data-motif.generated"
import { set } from "./generated/i18n-data-set.generated"
import { shorten } from "./generated/ui-strings-shorten.generated"
import { staticStrings } from "./generated/ui-strings-static.generated"

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

export function i18nClientSiDyn(this: void, string_index: string | number): string {
  const si_id = _G[String(string_index)]
  return GetString(typeof si_id === "number" ? si_id : 0)
}

export function i18nFoodDrinkDyn(this: void, fooddrink_id: string | number): string {
  const item_link = "|H0:item:" + tostring(tonumber(fooddrink_id)) + FOODDRINK_LINK_TAIL
  return zo_strformat("<<t:1>>", GetItemLinkName(item_link))
}

export function i18nGearDyn(this: void, example_item_id: string | number): string {
  const item_link = "|H0:item:" + tostring(tonumber(example_item_id)) + GEAR_LINK_TAIL
  return zo_strformat("<<t:1>>", GetItemLinkName(item_link))
}

export function i18nMotifDyn(this: void, motif_id: string | number): string {
  return zo_strformat("<<1>>", GetItemStyleName(tonumber(motif_id) ?? 0))
}

export function i18nMatDyn(this: void, item_id: string | number): string {
  const item_link = "|H0:item:" + tostring(tonumber(item_id)) + MAT_LINK_TAIL
  return zo_strformat("<<t:1>>", GetItemLinkName(item_link))
}

export function i18nSetDyn(this: void, set_id: string | number): string | undefined {
  const accessor = TemperWrit.LibSets
  if (accessor === undefined) {
    return undefined
  }
  const lib = accessor()
  if (lib === undefined) {
    return undefined
  }
  return lib.GetSetName(tonumber(set_id) ?? 0)
}

const I18N_EN: Record<string, Record<string | number, string>> = {
  static: staticStrings,
  shorten,
  mat,
  gear,
  set,
  motif,
  fooddrink,
  client_si: clientSi,
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

  for (const lang of langList()) {
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

export function i18nStatic(this: void, key: string, _lang: string): string | undefined {
  return staticStrings[key]
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
