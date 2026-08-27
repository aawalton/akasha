import { createLogger } from "./logger"
import type { ItemCacheEntry } from "./types"
import { isTreasureOrSurveyItemType } from "./utilities"

const logger = createLogger("itemCache")

const uniqueIdList: Record<string, ItemCacheEntry | undefined> = {}
const itemIdList: Record<number, true | undefined> = {}

function isTreasureOrSurveyItem(this: void, bagId: number, slotIndex: number): boolean {
  const [, specializedItemType] = GetItemType(bagId, slotIndex)
  return isTreasureOrSurveyItemType(specializedItemType)
}

export function itemCacheBuildMasterLists(this: void): undefined {
  ZO_ClearTable(uniqueIdList)
  ZO_ClearTable(itemIdList)

  const itemList = PLAYER_INVENTORY.GenerateListOfVirtualStackedItems(
    BAG_BACKPACK,
    isTreasureOrSurveyItem
  )
  for (const [, slotData] of pairs(itemList)) {
    const itemId = GetItemId(slotData.bag, slotData.index)
    const uniqueId = GetItemUniqueId(slotData.bag, slotData.index)
    const itemLink = GetItemLink(slotData.bag, slotData.index, LINK_STYLE_DEFAULT)
    if (uniqueId !== undefined) {
      itemCacheAdd(itemId, uniqueId, itemLink)
    }
  }

  logger.Debug("masterList updated")
}

export function isItemInBagCache(this: void, itemId: number): boolean {
  return itemIdList[itemId] === true
}

export function getUniqueEntry(
  this: void,
  uniqueId: Id64
): LuaMultiReturn<[ItemCacheEntry | undefined, string | undefined]> {
  const uniqueId64String = Id64ToString(uniqueId)
  const uniqueEntry = uniqueIdList[uniqueId64String]
  if (uniqueEntry !== undefined) {
    logger.Debug("uniqueId64String %s has been found", uniqueId64String)
    return $multi(uniqueEntry, uniqueId64String)
  }
  logger.Debug("uniqueId64String %s has not been found", uniqueId64String)
  return $multi(undefined, undefined)
}

export function itemCacheAdd(
  this: void,
  itemId: number,
  uniqueId: Id64,
  itemLink: string
): undefined {
  if (itemIdList[itemId] !== true) {
    itemIdList[itemId] = true
  }

  const uniqueId64String = Id64ToString(uniqueId)
  if (uniqueIdList[uniqueId64String] === undefined) {
    uniqueIdList[uniqueId64String] = {
      uniqueIdString: uniqueId64String,
      itemId,
      itemLink,
    }
  }

  logger.Verbose("%d (%s) has been added", itemId, GetItemLinkName(itemLink))
}

export function itemCacheRemove(this: void, uniqueId: Id64): ItemCacheEntry | undefined {
  const [uniqueEntry, uniqueId64String] = getUniqueEntry(uniqueId)
  if (uniqueEntry !== undefined && uniqueId64String !== undefined) {
    const itemId = uniqueEntry.itemId
    itemIdList[itemId] = undefined
    logger.Debug("%d has been deleted from itemIdList", itemId)

    uniqueIdList[uniqueId64String] = undefined
    logger.Debug(
      "%d (%s) has been removed from cache",
      uniqueEntry.itemId,
      GetItemLinkName(uniqueEntry.itemLink)
    )
    return uniqueEntry
  }
  logger.Error("uniqueId has not been found")
  return undefined
}
