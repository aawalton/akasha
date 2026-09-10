import "akasha/temper/eso-types/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-globals/eso-globals.type-declaration.d.ts"
import {
  buildItemFactsFromInventoryItem,
  resolveStaticItemKey,
} from "akasha/temper/items-rules-eval/build-item-facts-from-inventory-item/build-item-facts-from-inventory-item.module.code.ts"
import type { ItemFacts } from "akasha/temper/items-rules-eval/item-facts/item-facts.module.code.ts"
import { classifyItemToNodeIds } from "akasha/temper/temper-items-core/classify-item-node-ids/classify-item-node-ids.module.code.ts"
import type { InventoryItemData } from "akasha/temper/temper-items-core/inventory-types/inventory-types.module.code.ts"
import type { ClassifiableItem } from "akasha/temper/temper-items-core/item-category-tree-types/item-category-tree-types.module.code.ts"
import type { BrowseListing } from "akasha/temper/trading-listings/browse-listings/browse-listings.module.code.ts"

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
