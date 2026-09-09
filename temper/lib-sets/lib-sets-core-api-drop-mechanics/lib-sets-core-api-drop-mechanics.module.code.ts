import { asPresent } from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  asLangRecordOpt,
  asLibSlots,
  asSafeReturnApiTableFn,
  asStrRecordEntryOpt,
} from "../lib-sets-core-casts/lib-sets-core-casts.module.code.ts"
import { asRemoveLanguagesFullFn } from "../lib-sets-core-casts-tables/lib-sets-core-casts-tables.module.code.ts"

const lib = LibSets

const slots = asLibSlots(lib)

const removeLanguages = asRemoveLanguagesFullFn(slots["_removeLanguages"])
const safeReturnAPItable = asSafeReturnApiTableFn(slots["_safeReturnAPItable"])

function getDropMechanicName(
  this: void,
  libSetsDropMechanicId: number | undefined,
  lang?: string
): LuaMultiReturn<[string | undefined, string | undefined]> {
  if (libSetsDropMechanicId === undefined || libSetsDropMechanicId <= 0) {
    return $multi(undefined, undefined)
  }
  const allowedDropMechanics = lib.allowedDropMechanics
  if (!allowedDropMechanics[libSetsDropMechanicId]) {
    return $multi(undefined, undefined)
  }
  const langResolved = lib.LangAllowedCheck(lang)
  const dropMechanicNames = lib.dropMechanicIdToName[langResolved]
  const dropMechanicTooltipNames = lib.dropMechanicIdToNameTooltip[langResolved]
  if (dropMechanicNames === undefined || dropMechanicTooltipNames === undefined) {
    return $multi(undefined, undefined)
  }
  const dropMechanicName = dropMechanicNames[libSetsDropMechanicId]
  const dropMechanicTooltip = dropMechanicTooltipNames[libSetsDropMechanicId]
  if (dropMechanicName === undefined || dropMechanicName === "") {
    return $multi(undefined, undefined)
  }
  return $multi(dropMechanicName, dropMechanicTooltip)
}
lib.GetDropMechanicName = getDropMechanicName
lib.getDropMechanicName = getDropMechanicName

function getDropMechanic(
  this: void,
  setId: number | undefined,
  withNames?: boolean,
  lang?: string
): LuaMultiReturn<[unknown, unknown, unknown, unknown, unknown]> {
  if (setId === undefined) {
    return $multi(undefined, undefined, undefined, undefined, undefined)
  }
  if (!lib.checkIfSetsAreLoadedProperly(setId)) {
    return $multi(undefined, undefined, undefined, undefined, undefined)
  }
  const withNamesResolved = withNames ?? false
  let langResolved = lang
  const supportedLanguagesTable = lib.supportedLanguages
  const fallbackLang = lib.fallbackLang
  let supportedLanguageData: boolean | undefined
  const onlyOneLanguage = langResolved !== undefined
  if (onlyOneLanguage) {
    supportedLanguageData = supportedLanguagesTable[asPresent(langResolved)]
    if (!supportedLanguageData && langResolved !== fallbackLang) {
      langResolved = fallbackLang
      supportedLanguageData = supportedLanguagesTable[langResolved]
    }
    if (!supportedLanguageData) {
      return $multi(undefined, undefined, undefined, undefined, undefined)
    }
  }

  let setData = asStrRecordEntryOpt(lib.setInfo[setId])
  if (setData === undefined) {
    if (lib.IsNoESOSet(setId)) {
      setData = asStrRecordEntryOpt(lib.noSetIdSets[setId])
    }
  }
  if (setData === undefined || setData[LIBSETS_TABLEKEY_DROPMECHANIC] === undefined) {
    return $multi(undefined, undefined, undefined, undefined, undefined)
  }
  const dropMechanicIds = setData[LIBSETS_TABLEKEY_DROPMECHANIC]
  const dropZoneIds = setData[LIBSETS_TABLEKEY_ZONEIDS]
  let dropMechanicNames: { [lang: string]: unknown } | undefined
  let dropMechanicLocationNames: { [lang: string]: unknown } | undefined
  let dropMechanicTooltips: { [lang: string]: unknown } | undefined
  if (withNamesResolved === true) {
    let buildNames = false
    if (setData[LIBSETS_TABLEKEY_DROPMECHANIC_NAMES] !== undefined) {
      dropMechanicNames = asLangRecordOpt(
        ZO_ShallowTableCopy(setData[LIBSETS_TABLEKEY_DROPMECHANIC_NAMES])
      )
      if (langResolved !== undefined) {
        dropMechanicNames = removeLanguages(dropMechanicNames, langResolved)
      }
    } else {
      buildNames = true
    }
    if (!buildNames && setData[LIBSETS_TABLEKEY_DROPMECHANIC_TOOLTIP_NAMES] !== undefined) {
      dropMechanicTooltips = asLangRecordOpt(
        ZO_ShallowTableCopy(setData[LIBSETS_TABLEKEY_DROPMECHANIC_TOOLTIP_NAMES])
      )
      if (langResolved !== undefined) {
        dropMechanicTooltips = removeLanguages(dropMechanicTooltips, langResolved)
      }
    } else {
      buildNames = true
    }
    if (!buildNames && setData[LIBSETS_TABLEKEY_DROPMECHANIC_LOCATION_NAMES] !== undefined) {
      dropMechanicLocationNames = asLangRecordOpt(
        ZO_ShallowTableCopy(setData[LIBSETS_TABLEKEY_DROPMECHANIC_LOCATION_NAMES])
      )
      if (langResolved !== undefined) {
        dropMechanicLocationNames = removeLanguages(dropMechanicLocationNames, langResolved)
      }
    } else {
      buildNames = true
    }
    if (buildNames) {
      const [namesBuilt, locationNamesBuilt, tooltipsBuilt] =
        lib.GetDropMechanicAndDropLocationNames(setId, langResolved, setData)
      dropMechanicNames = asLangRecordOpt(namesBuilt)
      dropMechanicLocationNames = asLangRecordOpt(locationNamesBuilt)
      dropMechanicTooltips = asLangRecordOpt(tooltipsBuilt)
    }
  }
  return $multi(
    dropMechanicIds,
    dropMechanicNames,
    dropMechanicTooltips,
    dropMechanicLocationNames,
    dropZoneIds
  )
}
lib.GetDropMechanic = getDropMechanic

function getAllDropMechanics(this: void): unknown {
  return safeReturnAPItable(lib.allowedDropMechanics)
}
lib.GetAllDropMechanics = getAllDropMechanics
