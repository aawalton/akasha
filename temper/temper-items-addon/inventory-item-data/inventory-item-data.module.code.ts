import type { PriceSource } from "@akasha/temper-items-core/inventory-types"
import { captureOrNull } from "../inventory-match-capture/inventory-match-capture.module.code.ts"
import { isItemLinkQuestRelevant } from "../inventory-quest-relevance/inventory-quest-relevance.module.code.ts"
import type { ItemData } from "../inventory-saved-variables-types/inventory-saved-variables-types.module.code.ts"
import { isTemperLocked } from "../inventory-temper-lock-store/inventory-temper-lock-store.module.code.ts"
export function resolvePriceSource(): PriceSource {
  return TamrielTradeCentrePrice === undefined ? "none" : "ttc"
}

export function lookupTtcPricing(
  itemLink: string
): Pick<
  ItemData,
  "saleAvg" | "minPrice" | "amountCount" | "saleAmountCount" | "suggestedPrice" | "estimatedValue"
> {
  const priceApi = TamrielTradeCentrePrice
  if (priceApi === undefined) return {}

  const priceInfo = priceApi.GetPriceInfo(itemLink)
  if (priceInfo === undefined) return {}

  const s = priceInfo.SuggestedPrice
  const sa = priceInfo.SaleAvg
  const n = priceInfo.Min
  const ac = priceInfo.AmountCount
  const sac = priceInfo.SaleAmountCount

  const result: Pick<
    ItemData,
    "saleAvg" | "minPrice" | "amountCount" | "saleAmountCount" | "suggestedPrice" | "estimatedValue"
  > = {}

  if (sa !== undefined) result.saleAvg = sa
  if (n !== undefined) result.minPrice = n
  if (ac !== undefined) result.amountCount = ac
  if (sac !== undefined) result.saleAmountCount = sac
  if (s !== undefined) result.suggestedPrice = s

  if (s !== undefined) {
    result.estimatedValue = s
  } else if (sa !== undefined) {
    result.estimatedValue = sa
  }

  return result
}

export function findItemInInventory(
  targetLink: string
): { bagId: number; slotIndex: number } | undefined {
  const bags = [BAG_BACKPACK, BAG_BANK]
  for (const bagId of bags) {
    const bagSize = GetBagSize(bagId)
    for (let slot = 0; slot < bagSize; slot++) {
      const link = GetItemLink(bagId, slot, LINK_STYLE_BRACKETS)
      if (link === targetLink) return { bagId, slotIndex: slot }
    }
  }
  return undefined
}

export function isItemLinkCraftedSafe(itemLink: string, itemType: number): boolean {
  if (itemType === ITEMTYPE_POTION || itemType === ITEMTYPE_POISON) {
    const [captured] = string.match(itemLink, ":(%d+)|h")
    const matched = captureOrNull(captured)
    const potionData = tonumber(matched)
    return potionData !== undefined && potionData !== 0
  }
  return IsItemLinkCrafted(itemLink)
}

export function isItemLocked(bagId: number, slotIndex: number): boolean {
  if (isTemperLocked(bagId, slotIndex)) return true
  if (IsItemPlayerLocked(bagId, slotIndex)) return true
  return false
}

export function extractItemData(bagId: number, slotIndex: number): ItemData | undefined {
  const itemLink = GetItemLink(bagId, slotIndex, LINK_STYLE_BRACKETS)
  if (itemLink === "") return undefined

  const itemId = GetItemLinkItemId(itemLink)
  if (itemId === 0) return undefined

  const [stack, maxStack] = GetSlotStackSize(bagId, slotIndex)
  const [itemType, specializedItemType] = GetItemLinkItemType(itemLink)
  const [filterTypeBroad, filterTypeSpecific] = GetItemLinkFilterTypeInfo(itemLink)
  const pricing = lookupTtcPricing(itemLink)

  const rawEquipType = GetItemLinkEquipType(itemLink)
  const rawWeaponType = GetItemLinkWeaponType(itemLink)
  const rawArmorType = GetItemLinkArmorType(itemLink)

  let furnitureCategory: string | undefined
  let furnitureCategoryId: number | undefined
  let furnitureSubcategoryId: number | undefined
  if (itemType === ITEMTYPE_FURNISHING || itemType === ITEMTYPE_FURNISHING_MATERIAL) {
    const furnitureDataId = GetItemLinkFurnitureDataId(itemLink)
    if (furnitureDataId > 0) {
      const [catId, subcatId] = GetFurnitureDataCategoryInfo(furnitureDataId)
      if (catId !== undefined && catId > 0) {
        furnitureCategoryId = catId
        if (subcatId !== undefined && subcatId > 0) furnitureSubcategoryId = subcatId
        const name = GetFurnitureCategoryName(catId)
        if (name !== "") furnitureCategory = name
      }
    }
  }

  const result: ItemData = {
    itemId: itemId,
    itemName: zo_strformat("<<1>>", GetItemLinkName(itemLink)),
    itemLink: itemLink,
    quality: GetItemLinkDisplayQuality(itemLink),
    filterType: filterTypeSpecific ?? filterTypeBroad,
    itemType: itemType,
    traitType: GetItemLinkTraitType(itemLink),
    requiredLevel: GetItemLinkRequiredLevel(itemLink),
    requiredCP: GetItemLinkRequiredChampionPoints(itemLink),
    stackCount: stack,
    maxStackSize: maxStack,
    saleAvg: pricing.saleAvg,
    minPrice: pricing.minPrice,
    amountCount: pricing.amountCount,
    saleAmountCount: pricing.saleAmountCount,
    suggestedPrice: pricing.suggestedPrice,
    estimatedValue: pricing.estimatedValue,
  }

  const sellPrice = GetItemSellValueWithBonuses(bagId, slotIndex)
  if (sellPrice > 0) result.merchantValue = sellPrice

  result.stolen = IsItemStolen(bagId, slotIndex)
  result.bound = IsItemBound(bagId, slotIndex)
  result.bopTradeable = IsItemBoPAndTradeable(bagId, slotIndex)
  result.questRelevant = isItemLinkQuestRelevant(itemLink)
  result.reconstructed = IsItemReconstructed(bagId, slotIndex)
  result.transmuted = GetItemTraitInformation(bagId, slotIndex) === ITEM_TRAIT_INFORMATION_RETRAITED
  result.locked = isItemLocked(bagId, slotIndex)
  result.crafted = isItemLinkCraftedSafe(itemLink, itemType)
  if (itemType === ITEMTYPE_RECIPE) {
    result.known = IsItemLinkRecipeKnown(itemLink)
  } else if (GetItemLinkItemUseType(itemLink) === ITEM_USE_TYPE_COLLECTIBLE_GRANT) {
    result.known = IsCollectibleUnlocked(GetItemLinkItemUseReferenceId(itemLink))
  } else if (
    specializedItemType === SPECIALIZED_ITEMTYPE_RACIAL_STYLE_MOTIF_BOOK ||
    specializedItemType === SPECIALIZED_ITEMTYPE_RACIAL_STYLE_MOTIF_CHAPTER
  ) {
    result.known = IsItemLinkBookKnown(itemLink)
  } else if (GetItemLinkItemUseType(itemLink) === ITEM_USE_TYPE_CRAFTED_ABILITY_SCRIPT) {
    result.known = IsCraftedAbilityScriptUnlocked(GetItemLinkItemUseReferenceId(itemLink))
  } else if (
    specializedItemType === SPECIALIZED_ITEMTYPE_TROPHY_COLLECTIBLE_FRAGMENT ||
    specializedItemType === SPECIALIZED_ITEMTYPE_TROPHY_RUNEBOX_FRAGMENT
  ) {
    const grantedCollectibleId = GetItemLinkContainerCollectibleId(itemLink)
    if (grantedCollectibleId !== 0) result.known = IsCollectibleOwnedByDefId(grantedCollectibleId)
  } else if (specializedItemType === SPECIALIZED_ITEMTYPE_COLLECTIBLE_STYLE_PAGE) {
    const grantedCollectibleId = GetItemLinkContainerCollectibleId(itemLink)
    if (grantedCollectibleId !== 0) result.known = IsCollectibleUnlocked(grantedCollectibleId)
  }

  if (specializedItemType !== 0) result.specializedItemType = specializedItemType
  if (rawEquipType !== 0) result.equipType = rawEquipType
  if (rawWeaponType !== 0) result.weaponType = rawWeaponType
  if (rawArmorType !== 0) result.armorType = rawArmorType
  if (furnitureCategory !== undefined) result.furnitureCategory = furnitureCategory
  if (furnitureCategoryId !== undefined) result.furnitureCategoryId = furnitureCategoryId
  if (furnitureSubcategoryId !== undefined) result.furnitureSubcategoryId = furnitureSubcategoryId

  const [hasSet, , , , , setId] = GetItemLinkSetInfo(itemLink, false)
  if (hasSet && setId !== 0) result.setId = setId

  if (IsItemLinkContainer(itemLink)) result.isContainer = true

  return result
}
