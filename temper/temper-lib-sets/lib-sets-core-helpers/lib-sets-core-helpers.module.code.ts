import {
  asNumber,
  asNumberArray,
  asPresent,
  asStringOpt,
} from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  asLibSlots,
  asStringOrNumber,
  asStrRecord,
} from "../lib-sets-core-casts/lib-sets-core-casts.module.code.ts"

const lib = LibSets

function toboolean(this: void, value: unknown): unknown {
  const trueStrings = new LuaMap<string | number, boolean>()
  trueStrings.set(1, true)
  trueStrings.set("1", true)
  trueStrings.set("true", true)
  const falseStrings = new LuaMap<string | number, boolean>()
  falseStrings.set(0, true)
  falseStrings.set("0", true)
  falseStrings.set("false", true)
  if (trueStrings.get(asStringOrNumber(value)) === true) {
    return true
  } else if (falseStrings.get(asStringOrNumber(value)) === true) {
    return false
  }
  return value
}
asLibSlots(lib)["_toboolean"] = toboolean

function removeLanguages(
  this: void,
  tabVar: { [idx: number]: { [lang: string]: unknown } } | undefined,
  langToKeep: string | undefined
): { [idx: number]: { [lang: string]: unknown } } | undefined {
  if (tabVar === undefined || langToKeep === undefined || langToKeep === "") {
    return undefined
  }
  const retTab: { [idx: number]: { [lang: string]: unknown } } = {}
  for (const [idx, languagesTab] of ipairs(tabVar)) {
    for (const [langStr, languageData] of pairs(languagesTab)) {
      if (langStr === langToKeep) {
        retTab[idx] = {
          [langStr]: languageData,
        }
        break
      }
    }
  }
  return retTab
}
asLibSlots(lib)["_removeLanguages"] = removeLanguages

function langAllowedCheck(this: void, lang?: string): string {
  const clientLang = lib.clientLang
  const fallbackLang = lib.fallbackLang
  const supportedLanguages = lib.supportedLanguages
  let langResolved = lang ?? clientLang
  langResolved = string.lower(langResolved)
  if (supportedLanguages[langResolved] !== true) {
    langResolved = fallbackLang
  }
  return langResolved
}
lib.LangAllowedCheck = langAllowedCheck

function getLocalizedText(this: void, textName: string, lang?: string, ...args: unknown[]): string {
  const localizationData = lib.localization
  const langResolved = langAllowedCheck(lang)
  let localizedText = asStringOpt(asPresent(asStrRecord(localizationData[langResolved]))[textName])

  const strForParams = args
  if (strForParams.length <= 7) {
    localizedText = string.format(localizedText ?? "", ...strForParams)
  }
  return localizedText ?? ""
}
lib.GetLocalizedText = getLocalizedText

function getIndexTableFromNonNumberKeyTable(
  this: void,
  sourceTable: object,
  useKey?: boolean
): unknown[] | undefined {
  if (useKey === undefined) {
    return undefined
  }
  const targetTable: unknown[] = []
  for (const [k, v] of pairs(asStrRecord(sourceTable))) {
    if (useKey === true) {
      targetTable[targetTable.length] = k
    } else {
      targetTable[targetTable.length] = v
    }
  }
  return targetTable
}
lib.GetIndexTableFromNonNumberKeyTable = getIndexTableFromNonNumberKeyTable

export function checkIsNotZero(this: void, value: number | undefined): number | undefined {
  if (undefined === value || 0 === value) {
    return undefined
  }
  return value
}

function getTabIndexData(
  this: void,
  index: number | undefined,
  ...args: unknown[]
): LuaMultiReturn<unknown[]> {
  if (index === undefined || select("#", ...args) === 0) {
    return $multi()
  }
  return select(index, ...args)
}
asLibSlots(lib)["_getTabIndexData"] = getTabIndexData

function safeStartChatInput(
  this: void,
  text: string,
  channel?: unknown,
  target?: string
): undefined {
  let isRestrictedCommunicationPermitted = true
  if (target !== undefined && IsCommunicationRestricted()) {
    isRestrictedCommunicationPermitted = CanCommunicateWith(target)
  }
  if (IsChatSystemAvailableForCurrentPlatform() && isRestrictedCommunicationPermitted) {
    ZO_GetChatSystem().StartTextEntry(text, channel, target, true)
  }
}
lib.SafeStartChatInput = safeStartChatInput

export function validateValueAgainstCheckTable(
  this: void,
  numberOrTable: number | number[],
  checkTable: { [k: number]: boolean } | undefined,
  isAnyInCheckTable?: boolean,
  doLocalDebug?: boolean
): boolean {
  const anyInCheck = isAnyInCheckTable ?? false
  const localDebug = doLocalDebug ?? false
  if (localDebug === true) {
    d("[LibSets]validateValueAgainstCheckTable-isAnyInCheckTable: " + tostring(anyInCheck))
  }
  if (checkTable === undefined) {
    return false
  }
  let result: boolean | undefined
  if (type(numberOrTable) === "table") {
    for (const [, value] of ipairs(asNumberArray(numberOrTable))) {
      result = checkTable[value] ?? false
      if (localDebug === true) {
        d(">>>result: " + tostring(result))
      }
      if (anyInCheck === false) {
        if (result === false) {
          if (localDebug === true) {
            d("<<<FALSE entry not in checktable!")
          }
          return false
        }
      } else {
        if (result === true) {
          if (localDebug === true) {
            d("<<<TRUE any entry found in checktable!")
          }
          return true
        }
      }
    }
  } else {
    return checkTable[asNumber(numberOrTable)] ?? false
  }
  return result ?? false
}

function safeReturnAPItable(this: void, tabData: unknown): unknown {
  if (undefined === tabData) {
    return undefined
  }
  if (type(tabData) !== "table") {
    return tabData
  }
  return ZO_ShallowTableCopy(tabData)
}
asLibSlots(lib)["_safeReturnAPItable"] = safeReturnAPItable
