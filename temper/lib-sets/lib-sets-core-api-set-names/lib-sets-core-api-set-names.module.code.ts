import { asBoolean } from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  asLibSlots,
  asSafeReturnApiTableFn,
  asSetIdBoolMap,
  asSetIdLangStringMap,
} from "../lib-sets-core-casts/lib-sets-core-casts.module.code.ts"

const lib = LibSets

const libSlots = asLibSlots(lib)
const safeReturnAPItable = asSafeReturnApiTableFn(libSlots["_safeReturnAPItable"])

let allSetNamesCached: { [setId: number]: { [lang: string]: string } } | undefined

type PreloadedSetNames = { [setId: number]: { [lang: string]: string } }

function getSetName(this: void, setId: number | undefined, lang?: string): unknown {
  if (setId === undefined) {
    return undefined
  }
  const checkIfSetsAreLoadedProperly = lib.checkIfSetsAreLoadedProperly
  if (!checkIfSetsAreLoadedProperly(setId)) {
    return undefined
  }
  const langResolved = lib.LangAllowedCheck(lang)
  let setNames: PreloadedSetNames = {}
  if (
    allSetNamesCached === undefined ||
    allSetNamesCached[setId] === undefined ||
    allSetNamesCached[setId]?.[langResolved] === undefined
  ) {
    const isNoESOSet = lib.IsNoESOSet
    const preloaded = lib.setDataPreloaded
    if (isNoESOSet(setId)) {
      setNames = asSetIdLangStringMap(preloaded[LIBSETS_TABLEKEY_SETNAMES_NO_SETID])
    } else {
      setNames = asSetIdLangStringMap(preloaded[LIBSETS_TABLEKEY_SETNAMES])
    }
  } else {
    setNames = allSetNamesCached
  }
  if (setNames[setId] === undefined || setNames[setId]?.[langResolved] === undefined) {
    return undefined
  }
  return safeReturnAPItable(setNames[setId]?.[langResolved])
}
lib.GetSetName = getSetName

function getSetNames(this: void, setId: number | undefined): unknown {
  if (setId === undefined) {
    return undefined
  }
  const checkIfSetsAreLoadedProperly = lib.checkIfSetsAreLoadedProperly
  if (!checkIfSetsAreLoadedProperly(setId)) {
    return undefined
  }
  let setNames: PreloadedSetNames = {}
  if (allSetNamesCached === undefined || allSetNamesCached[setId] === undefined) {
    const isNoESOSet = lib.IsNoESOSet
    const preloaded = lib.setDataPreloaded
    if (isNoESOSet(setId)) {
      setNames = asSetIdLangStringMap(preloaded[LIBSETS_TABLEKEY_SETNAMES_NO_SETID])
    } else {
      setNames = asSetIdLangStringMap(preloaded[LIBSETS_TABLEKEY_SETNAMES])
    }
  } else {
    setNames = allSetNamesCached
  }
  if (setNames[setId] === undefined) {
    return undefined
  }
  return safeReturnAPItable(setNames[setId])
}
lib.GetSetNames = getSetNames

function getAllSetNames(this: void): unknown {
  const checkIfSetsAreLoadedProperly = lib.checkIfSetsAreLoadedProperly
  if (!checkIfSetsAreLoadedProperly()) {
    return undefined
  }
  if (allSetNamesCached === undefined) {
    const setNames: { [setId: number]: unknown } = {}
    const getAllSetIds = lib.GetAllSetIds
    const allSetIds = getAllSetIds()
    if (allSetIds === undefined || asBoolean(allSetIds) === false) {
      return undefined
    }
    for (const [setId, isActive] of pairs(asSetIdBoolMap(allSetIds))) {
      if (isActive === true) {
        const setNamesOfSetId = getSetNames(setId)
        if (setNamesOfSetId !== undefined && asBoolean(setNamesOfSetId) !== false) {
          setNames[setId] = setNamesOfSetId
        }
      }
    }
    allSetNamesCached = asSetIdLangStringMap(setNames)
  }
  return safeReturnAPItable(allSetNamesCached)
}
lib.GetAllSetNames = getAllSetNames
