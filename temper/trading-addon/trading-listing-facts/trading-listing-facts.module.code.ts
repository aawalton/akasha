import "@akasha/temper-eso-types/eso-enums-01"
import "@akasha/temper-eso-types/eso-functions-01"
import "@akasha/temper-eso-types/eso-functions-03"
import "@akasha/temper-eso-types/eso-functions-08"
import "@akasha/temper-eso-types/eso-functions-09"
import "@akasha/temper-eso-types/eso-globals"
import { classifyItemToNodeIds } from "@akasha/temper-items-core/classify-item-node-ids"
import type { InventoryItemData } from "@akasha/temper-items-core/inventory-types"
import type { ClassifiableItem } from "@akasha/temper-items-core/item-category-tree-types"
import {
  buildItemFactsFromInventoryItem,
  resolveStaticItemKey,
} from "@akasha/temper-items-rules-eval/build-item-facts-from-inventory-item"
import type { ItemFacts } from "@akasha/temper-items-rules-eval/item-facts"
import type { BrowseListing } from "@akasha/temper-trading-listings/browse-listings"

function asNumber(value: unknown): number | undefined {
  return typeof value === "number" ? value : undefined
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined
}

function linkToInventoryItem(itemLink: string, stackCount: number): InventoryItemData {
  const [filterTypeBroad, filterTypeSpecific] = GetItemLinkFilterTypeInfo(itemLink)
  const filterType = filterTypeSpecific ?? filterTypeBroad
  const [itemType, specializedItemType] = GetItemLinkItemType(itemLink)
  const equipType = GetItemLinkEquipType(itemLink)
  const weaponType = GetItemLinkWeaponType(itemLink)
  const armorType = GetItemLinkArmorType(itemLink)
  const traitType = GetItemLinkTraitType(itemLink)

  let furnitureCategoryId = 0
  let furnitureSubcategoryId = 0
  if (filterType === 21) {
    const furnitureDataId = GetItemLinkFurnitureDataId(itemLink)
    if (furnitureDataId > 0) {
      const [catId, subcatId] = GetFurnitureDataCategoryInfo(furnitureDataId)
      if (catId !== undefined) furnitureCategoryId = catId
      if (subcatId !== undefined) furnitureSubcategoryId = subcatId
    }
  }

  const itemId = GetItemLinkItemId(itemLink)
  const itemName = zo_strformat("<<1>>", GetItemLinkName(itemLink))
  const quality = GetItemLinkDisplayQuality(itemLink)
  const requiredLevel = GetItemLinkRequiredLevel(itemLink)
  const requiredCP = GetItemLinkRequiredChampionPoints(itemLink)

  const [hasSet, , , , , setIdRaw] = GetItemLinkSetInfo(itemLink, false)
  const setId = hasSet && setIdRaw !== 0 ? setIdRaw : undefined
  const isContainer = IsItemLinkContainer(itemLink)

  return {
    itemId,
    itemName,
    itemLink,
    quality,
    filterType,
    itemType,
    specializedItemType,
    traitType,
    equipType,
    weaponType,
    armorType,
    furnitureCategoryId,
    furnitureSubcategoryId,
    setId,
    isContainer,
    requiredLevel,
    requiredCP,
    stackCount,
  }
}

function toClassifiable(item: InventoryItemData): ClassifiableItem {
  return {
    filterType: item.filterType,
    itemType: item.itemType,
    specializedItemType: item.specializedItemType,
    traitType: item.traitType,
    equipType: item.equipType,
    weaponType: item.weaponType,
    armorType: item.armorType,
    furnitureCategoryId: item.furnitureCategoryId,
    furnitureSubcategoryId: item.furnitureSubcategoryId,
    itemName: item.itemName,
  }
}

export function readResultListing(index: number): BrowseListing<ItemFacts> | undefined {
  const [
    ,
    ,
    ,
    stackCountRaw,
    sellerNameRaw,
    ,
    purchasePriceRaw,
    ,
    itemUniqueId,
    purchasePricePerUnitRaw,
  ] = GetTradingHouseSearchResultItemInfo(index)

  const stackCount = asNumber(stackCountRaw)
  const purchasePrice = asNumber(purchasePriceRaw)
  const purchasePricePerUnit = asNumber(purchasePricePerUnitRaw)
  if (
    stackCount === undefined ||
    purchasePrice === undefined ||
    purchasePricePerUnit === undefined
  ) {
    return undefined
  }

  const linkRaw = GetTradingHouseSearchResultItemLink(index, LINK_STYLE_DEFAULT)
  const itemLink = asString(linkRaw)
  if (itemLink === undefined || itemLink === "") return undefined

  const uid = Id64ToString(itemUniqueId)
  if (uid === "" || uid === "0") return undefined

  const guildId = GetSelectedTradingHouseGuildId()
  if (guildId === undefined) return undefined

  const sellerName = asString(sellerNameRaw) ?? ""

  const item = linkToInventoryItem(itemLink, stackCount)
  const nodeIds = classifyItemToNodeIds(toClassifiable(item))
  const facts = buildItemFactsFromInventoryItem({
    item,
    nodeIds,
    location: undefined,
    itemKey: resolveStaticItemKey(item),
  })

  return {
    uid,
    pricePerUnit: purchasePricePerUnit,
    totalPrice: purchasePrice,
    guildId,
    sellerName,
    facts,
  }
}
