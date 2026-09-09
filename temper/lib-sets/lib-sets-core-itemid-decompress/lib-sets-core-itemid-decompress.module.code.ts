import {
  asNumber,
  asPresent,
  asString,
  asUnknownArray,
} from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import { asSetIdCompressedItemIds } from "../lib-sets-core-casts/lib-sets-core-casts.module.code.ts"

const lib = LibSets

const strfind = string.find
const strsub = string.sub
const tsort = table.sort

lib.tooltipSetDataWithoutItemIdsCached = {}
const CACHED_SET_ITEM_IDS_TABLE: { [setId: number]: { [itemId: number]: number } } = {}
lib.CachedSetItemIdsTable = CACHED_SET_ITEM_IDS_TABLE

function decompressSetIdItemIds(
  this: void,
  setId: number,
  isNonESOSet?: boolean
): { [itemId: number]: number } | undefined {
  if (CACHED_SET_ITEM_IDS_TABLE[setId] !== undefined) {
    return CACHED_SET_ITEM_IDS_TABLE[setId]
  }
  let isNonESOSetResolved = isNonESOSet
  if (isNonESOSetResolved === undefined) {
    const isNoESOSet = lib.IsNoESOSet
    isNonESOSetResolved = isNoESOSet(setId)
  }
  const preloaded = lib.setDataPreloaded
  let preloadedSetItemIdsCompressed: { [setId: number]: (number | string)[] }
  if (isNonESOSetResolved === true) {
    preloadedSetItemIdsCompressed = asSetIdCompressedItemIds(
      preloaded[LIBSETS_TABLEKEY_SETITEMIDS_NO_SETID]
    )
  } else {
    preloadedSetItemIdsCompressed = asSetIdCompressedItemIds(preloaded[LIBSETS_TABLEKEY_SETITEMIDS])
  }
  const idSource = preloadedSetItemIdsCompressed[setId]
  if (idSource === undefined) {
    return undefined
  }
  const workingTable: { [itemId: number]: number } = {}
  for (const j of $range(1, idSource.length)) {
    const entry = asPresent(idSource[j - 1])
    const itemIdType = type(entry)
    if (itemIdType === "number") {
      workingTable[asNumber(entry)] = LIBSETS_SET_ITEMID_TABLE_VALUE_OK
    } else if (itemIdType === "string") {
      const entryStr = asString(entry)
      const [commaSpot] = strfind(entryStr, ",")
      const firstPart = asNumber(tonumber(strsub(entryStr, 1, asPresent(commaSpot) - 1)))
      const lastPart = asNumber(tonumber(strsub(entryStr, asPresent(commaSpot) + 1)))
      for (const i of $range(0, lastPart)) {
        workingTable[firstPart + i] = LIBSETS_SET_ITEMID_TABLE_VALUE_OK
      }
    }
  }
  tsort(asUnknownArray(workingTable))
  CACHED_SET_ITEM_IDS_TABLE[setId] = workingTable
  return workingTable
}
lib.DecompressSetIdItemIds = decompressSetIdItemIds
