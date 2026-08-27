import { asNumber, asPresent, asString, asUnknownArray } from "../casts"
import { asSetIdCompressedItemIds } from "./casts"

const lib = LibSets

const strfind = string.find
const strsub = string.sub
const tsort = table.sort

lib.tooltipSetDataWithoutItemIdsCached = {}
const cachedSetItemIdsTable: { [setId: number]: { [itemId: number]: number } } = {}
lib.CachedSetItemIdsTable = cachedSetItemIdsTable

function decompressSetIdItemIds(
  this: void,
  setId: number,
  isNonESOSet?: boolean
): { [itemId: number]: number } | undefined {
  if (cachedSetItemIdsTable[setId] !== undefined) {
    return cachedSetItemIdsTable[setId]
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
  cachedSetItemIdsTable[setId] = workingTable
  return workingTable
}
lib.DecompressSetIdItemIds = decompressSetIdItemIds
