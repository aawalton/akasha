import { asNumber, asPresent } from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  asLangRecord,
  asLibSlots,
  asSafeReturnApiTableFn,
  asSetIdTable,
} from "../lib-sets-core-casts/lib-sets-core-casts.module.code.ts"
import {
  asLangDropLocationMap,
  asSetIdLangRecordEntryOpt,
} from "../lib-sets-core-casts-tables/lib-sets-core-casts-tables.module.code.ts"

const lib = LibSets

const slots = asLibSlots(lib)

const safeReturnAPItable = asSafeReturnApiTableFn(slots["_safeReturnAPItable"])

function getAllDropZones(this: void): unknown {
  if (!lib.checkIfSetsAreLoadedProperly()) {
    return undefined
  }
  return safeReturnAPItable(lib.dropZones)
}
lib.GetAllDropZones = getAllDropZones

function getDropZonesBySetId(this: void, setId: number | undefined): unknown {
  if (!lib.checkIfSetsAreLoadedProperly(setId)) {
    return undefined
  }
  const setId2ZoneIds = asSetIdTable(lib.setId2DropZones)
  if (setId === undefined || setId2ZoneIds[setId] === undefined) {
    return undefined
  }
  return safeReturnAPItable(setId2ZoneIds[setId])
}
lib.GetDropZonesBySetId = getDropZonesBySetId

function getSetIdsByDropZone(this: void, zoneId: number | undefined): unknown {
  if (!lib.checkIfSetsAreLoadedProperly()) {
    return undefined
  }
  const zoneId2SetIds = asSetIdTable(lib.dropZone2SetIds)
  if (zoneId === undefined || zoneId2SetIds[zoneId] === undefined) {
    return undefined
  }
  return safeReturnAPItable(zoneId2SetIds[zoneId])
}
lib.GetSetIdsByDropZone = getSetIdsByDropZone

function getSetIdsOfCurrentZone(
  this: void
): LuaMultiReturn<[unknown, number | undefined, number | undefined]> {
  let setIdsOfCurrentZone: unknown

  const [currentZoneIdInitial, currentZoneParentId] = lib.GetCurrentZoneIds()
  let currentZoneId = currentZoneIdInitial
  if (currentZoneId === undefined && currentZoneParentId === undefined) {
    return $multi(undefined, undefined, undefined)
  }

  if (currentZoneId !== undefined) {
    setIdsOfCurrentZone = getSetIdsByDropZone(currentZoneId)
  }
  if (
    setIdsOfCurrentZone === undefined &&
    currentZoneParentId !== undefined &&
    currentZoneParentId !== currentZoneId
  ) {
    currentZoneId = currentZoneParentId
    setIdsOfCurrentZone = getSetIdsByDropZone(currentZoneId)
  }
  return $multi(setIdsOfCurrentZone, currentZoneId, currentZoneParentId)
}
lib.GetSetIdsOfCurrentZone = getSetIdsOfCurrentZone

function getAllDropLocationNames(this: void, lang?: string): unknown {
  if (!lib.checkIfSetsAreLoadedProperly()) {
    return undefined
  }
  const dropLocationNames = asLangRecord(lib.dropLocationNames)
  const langResolved = lib.LangAllowedCheck(lang)
  return safeReturnAPItable(dropLocationNames[langResolved])
}
lib.GetAllDropLocationNames = getAllDropLocationNames

function getDropLocationNamesBySetId(
  this: void,
  setId: number | undefined,
  lang?: string
): unknown {
  if (!lib.checkIfSetsAreLoadedProperly(setId)) {
    return undefined
  }
  const setId2DropLocations = asSetIdLangRecordEntryOpt(lib.setId2DropLocationNames)
  if (setId === undefined || setId2DropLocations[setId] === undefined) {
    return undefined
  }
  const langResolved = lib.LangAllowedCheck(lang)
  return safeReturnAPItable(asPresent(setId2DropLocations[setId])[langResolved])
}
lib.GetDropLocationNamesBySetId = getDropLocationNamesBySetId

function getSetIdsByDropLocationName(
  this: void,
  dropLocationName: string | undefined,
  lang?: string
): unknown {
  if (!lib.checkIfSetsAreLoadedProperly()) {
    return undefined
  }
  const dropLocation2SetIds = asLangDropLocationMap(lib.dropLocationNames2SetIds)
  const langResolved = lib.LangAllowedCheck(lang)
  if (dropLocationName === undefined || dropLocation2SetIds[langResolved] === undefined) {
    return undefined
  }
  return safeReturnAPItable(asPresent(dropLocation2SetIds[langResolved])[dropLocationName])
}
lib.GetSetIdsByDropLocationName = getSetIdsByDropLocationName

function getAllSetIds(this: void): unknown {
  if (!lib.checkIfSetsAreLoadedProperly()) {
    return undefined
  }
  return safeReturnAPItable(lib.setIds)
}
lib.GetAllSetIds = getAllSetIds

function getAllSetItemIds(this: void): unknown {
  if (!lib.checkIfSetsAreLoadedProperly()) {
    return undefined
  }
  const setIds = lib.setIds
  const noSetIdSets = lib.noSetIdSets
  const decompressSetIdItemIds = lib.DecompressSetIdItemIds
  for (const [setId, isActive] of pairs(setIds)) {
    if (isActive === true) {
      decompressSetIdItemIds(setId, false)
    }
  }
  for (const [nonESOsetId] of pairs(noSetIdSets)) {
    decompressSetIdItemIds(nonESOsetId, true)
  }
  return lib.CachedSetItemIdsTable
}
lib.GetAllSetItemIds = getAllSetItemIds

const ITEM_IDS_BLACKLISTED_FOR_CURRENT_API_VERSION: {
  [setId: number]: { [itemId: number]: boolean }
} = {}

function checkSetItemIdsAreValidOnThisAPIVersion(
  this: void,
  setId: number | undefined,
  setItemIds: { [itemId: number]: number } | undefined
): undefined {
  if (setId === undefined || setId === 0 || ZO_IsTableEmpty(setItemIds)) {
    return
  }
  const setIdPresent = asPresent(setId)
  if (ITEM_IDS_BLACKLISTED_FOR_CURRENT_API_VERSION[setIdPresent] === undefined) {
    ITEM_IDS_BLACKLISTED_FOR_CURRENT_API_VERSION[setIdPresent] = {}
    const blacklistForSet = asPresent(ITEM_IDS_BLACKLISTED_FOR_CURRENT_API_VERSION[setIdPresent])
    const buildItemLink = lib.buildItemLink
    const cachedSetItemIdsTable = lib.CachedSetItemIdsTable
    for (const [itemId] of pairs(asPresent(setItemIds))) {
      if (blacklistForSet[itemId] === undefined) {
        const itemLink = buildItemLink(itemId)
        if (itemLink !== undefined && itemLink !== "") {
          const itemName = GetItemLinkName(itemLink)
          if (itemName === undefined || itemName === "") {
            blacklistForSet[itemId] = true

            if (
              cachedSetItemIdsTable !== undefined &&
              cachedSetItemIdsTable[setIdPresent] !== undefined
            ) {
              asPresent(cachedSetItemIdsTable[setIdPresent])[itemId] = asNumber(undefined)
            }
          }
        }
      }
    }
  }
}
slots["_checkSetItemIdsAreValidOnThisAPIVersion"] = checkSetItemIdsAreValidOnThisAPIVersion
