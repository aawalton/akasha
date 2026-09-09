import { asNumber, asNumberOpt, asPresent } from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  asLibSlots,
  asSetIdLangStringMap,
  asSetIdTable,
  asStrRecord,
} from "../lib-sets-core-casts/lib-sets-core-casts.module.code.ts"
import {
  asSetIdTableOpt,
  asSetIdToNumKeyTable,
  asUnknown,
} from "../lib-sets-core-casts-tables/lib-sets-core-casts-tables.module.code.ts"

const lib = LibSets

const gilsi = GetItemLinkSetInfo

let CACHED_NON_ACTIVE_SET_IDS: { [setId: number]: boolean } = {}

export function resetCachedNonActiveSetIds(this: void): undefined {
  CACHED_NON_ACTIVE_SET_IDS = {}
}

function checkSet(
  this: void,
  itemLink: string | undefined
): LuaMultiReturn<[boolean, string, number, number, number, number]> {
  if (itemLink === undefined || itemLink === "") {
    return $multi(false, "", 0, 0, 0, 0)
  }
  const [isSetRaw, setName, numBonuses, numEquipped, maxEquipped, setId] = gilsi(itemLink, false)
  let isSet = isSetRaw
  if (!isSet) {
    isSet = false
  }
  return $multi(isSet, setName, setId, numBonuses, numEquipped, maxEquipped)
}

function getSetEquippedInfo(
  this: void,
  itemId: number | undefined
): LuaMultiReturn<
  [number | undefined, number | undefined, number | undefined, string | undefined]
> {
  if (itemId === undefined) {
    return $multi(undefined, undefined, undefined, undefined)
  }
  const buildItemLink = lib.buildItemLink
  const itemLink = buildItemLink(itemId)
  const [, , setId, , equippedItems, maxEquipped] = checkSet(itemLink)
  return $multi(setId, equippedItems, maxEquipped, itemLink)
}
asLibSlots(lib)["_getSetEquippedInfo"] = getSetEquippedInfo

function isSetCurrentlyActiveWithAPIVersion(this: void, setId: number | undefined): boolean {
  const nonExistingSetIdsAtCurrentApiVersion = lib.nonExistingSetIdsAtCurrentApiVersion
  const setIds = lib.setIds
  if (
    setId === undefined ||
    (setId !== undefined &&
      (CACHED_NON_ACTIVE_SET_IDS[setId] === true ||
        nonExistingSetIdsAtCurrentApiVersion[setId] === true ||
        setIds[setId] === undefined))
  ) {
    if (setId !== undefined) {
      CACHED_NON_ACTIVE_SET_IDS[setId] = true
    }
    return false
  }
  return true
}
lib.IsSetCurrentlyActiveWithAPIVersion = isSetCurrentlyActiveWithAPIVersion

function checkItemIdMatchesSetId(this: void, setId: number, itemId: unknown): boolean {
  if (itemId !== undefined && type(itemId) === "number" && asNumber(itemId) > 0) {
    const buildItemLink = lib.buildItemLink
    const itemLink = buildItemLink(asNumber(itemId))
    if (itemLink !== undefined && itemLink !== "") {
      const [isSetRaw, , setIdOfItemLink] = checkSet(itemLink)
      const isSet = isSetRaw === true
      const setExists = isSet === true && setIdOfItemLink === setId
      if (setExists === true) {
        return true
      }
    }
  }
  return false
}

function loopSetItemIdsAndCheckForMatchingSetItem(
  this: void,
  setId: number | undefined,
  loopTable: { [k: number]: unknown } | undefined,
  keyOrValue: boolean | undefined
): boolean {
  if (setId === undefined || keyOrValue === undefined || ZO_IsTableEmpty(loopTable)) {
    return false
  }
  const loopTablePresent = asPresent(loopTable)
  if (keyOrValue === false) {
    for (const [, itemId] of pairs(loopTablePresent)) {
      if (itemId !== undefined && type(itemId) === "number" && asNumber(itemId) > 0) {
        if (checkItemIdMatchesSetId(setId, itemId) === true) {
          return true
        }
      }
    }
  } else {
    for (const [itemId] of pairs(loopTablePresent)) {
      if (checkItemIdMatchesSetId(setId, asNumber(itemId)) === true) {
        return true
      }
    }
  }
  return false
}

function validateAnyItemIdBelongsToThisSetId(this: void, setId: number): boolean | undefined {
  const preloaded = lib.setDataPreloaded
  const preloadedSetInfo = lib.setInfo
  const preloadedSetItemIds = asSetIdToNumKeyTable(preloaded[LIBSETS_TABLEKEY_SETITEMIDS])
  if (
    preloadedSetInfo === undefined ||
    preloadedSetInfo[setId] === undefined ||
    preloadedSetItemIds === undefined ||
    preloadedSetItemIds[setId] === undefined
  ) {
    return false
  }

  const compressedSetItemIdsOfSetId = preloadedSetItemIds[setId]
  let setExists = loopSetItemIdsAndCheckForMatchingSetItem(
    setId,
    compressedSetItemIdsOfSetId,
    false
  )

  if (!setExists) {
    const decompressSetIdItemIds = lib.DecompressSetIdItemIds
    const decompressedSetItemIdsOfSetId = decompressSetIdItemIds(setId)
    if (
      decompressedSetItemIdsOfSetId !== undefined &&
      !ZO_IsTableEmpty(decompressedSetItemIdsOfSetId)
    ) {
      asPresent(preloadedSetInfo[setId])[LIBSETS_TABLEKEY_SETITEMIDS] =
        decompressedSetItemIdsOfSetId

      setExists = loopSetItemIdsAndCheckForMatchingSetItem(
        setId,
        decompressedSetItemIdsOfSetId,
        true
      )
    }
  }
  return undefined
}

export function checkIfSetExists(this: void, setId: number | undefined): boolean {
  if (setId === undefined || setId <= 0) {
    return false
  }
  const nonExistingSetIdsAtCurrentApiVersion = lib.nonExistingSetIdsAtCurrentApiVersion
  if (validateAnyItemIdBelongsToThisSetId(setId) === false) {
    nonExistingSetIdsAtCurrentApiVersion[setId] = true
    return false
  }
  return true
}

function checkNoSetIdSet(
  this: void,
  itemId: number | undefined
): LuaMultiReturn<[boolean, string, number, number, number, number]> {
  if (itemId === undefined || asUnknown(itemId) === "") {
    return $multi(false, "", 0, 0, 0, 0)
  }
  let isSet = false
  let setName = ""
  let numBonuses = 0
  let numEquipped = 0
  let maxEquipped = 0
  let setId = 0
  const preloaded = lib.setDataPreloaded
  const noSetIdSets = lib.noSetIdSets
  const clientLang = lib.clientLang
  const noESOsetIdSetNames = asSetIdLangStringMap(preloaded[LIBSETS_TABLEKEY_SETNAMES_NO_SETID])
  const preloadedNoSetIdItemIds = asSetIdTableOpt(preloaded[LIBSETS_TABLEKEY_SETITEMIDS_NO_SETID])
  for (const [noESOSetId, specialSetData] of pairs(noSetIdSets)) {
    if (
      preloaded !== undefined &&
      preloadedNoSetIdItemIds !== undefined &&
      preloadedNoSetIdItemIds[noESOSetId] !== undefined
    ) {
      const [specialSetsItemIds] = lib.GetSetItemIds(noESOSetId, true)
      if (specialSetsItemIds !== undefined && specialSetsItemIds[itemId] !== undefined) {
        const specialSetDataTab = asStrRecord(specialSetData)
        isSet = true
        setName = asPresent(noESOsetIdSetNames[noESOSetId])[clientLang] ?? ""
        numBonuses = asNumberOpt(specialSetDataTab[LIBSETS_TABLEKEY_NUMBONUSES]) ?? 0
        numEquipped = lib.getNumEquippedItemsByItemIds(specialSetsItemIds)
        maxEquipped = asNumberOpt(specialSetDataTab[LIBSETS_TABLEKEY_MAXEQUIPPED]) ?? 0
        setId = noESOSetId
        return $multi(isSet, setName, setId, numBonuses, numEquipped, maxEquipped)
      }
    }
  }
  return $multi(isSet, setName, setId, numBonuses, numEquipped, maxEquipped)
}
asLibSlots(lib)["_checkNoSetIdSet"] = checkNoSetIdSet

function getSetsOfClassId(this: void, classId: number): { [setId: number]: unknown } | undefined {
  const classData = lib.classData
  if (classData.id2Index[classId] === undefined) {
    return undefined
  }

  if (classData.setsList[classId] !== undefined) {
    return asSetIdTable(classData.setsList[classId])
  }

  const newSetsList: { [setId: number]: unknown } = {}
  const allClassSets = asPresent(lib.classSets)
  const getSetInfo = lib.GetSetInfo

  for (const [setId, classSetData] of pairs(allClassSets)) {
    if (classSetData.classId !== undefined && classSetData.classId === classId) {
      newSetsList[setId] = getSetInfo(setId)
    }
  }
  if (!ZO_IsTableEmpty(newSetsList)) {
    classData.setsList[classId] = newSetsList
    return newSetsList
  }
  return undefined
}
asLibSlots(lib)["_getSetsOfClassId"] = getSetsOfClassId
