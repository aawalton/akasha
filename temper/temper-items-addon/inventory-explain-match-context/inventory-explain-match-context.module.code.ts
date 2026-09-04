import {
  PLAYER_ARMOR_ESO_TO_TRAIT,
  PLAYER_JEWELRY_ESO_TO_TRAIT,
  PLAYER_WEAPON_ESO_TO_TRAIT,
} from "@akasha/temper-equipment/eso-trait-map"
import { requireAt } from "@akasha/utils-narrow/require-at"
import {
  findItemInInventory,
  isItemLinkCraftedSafe,
  lookupTtcPricing,
} from "../inventory-item-data/inventory-item-data.module.code.ts"
import { isItemLinkQuestRelevant } from "../inventory-quest-relevance/inventory-quest-relevance.module.code.ts"

import type { MatchContext } from "../inventory-rules-conditions-render/inventory-rules-conditions-render.module.code.ts"

import { inferDeconCraftingType } from "../inventory-rules-core-inspire/inventory-rules-core-inspire.module.code.ts"

export function buildMatchContext(
  itemLink: string,
  ancestorChain: ReadonlyArray<string>,
  signals: { itemType: number; traitType: number }
): MatchContext {
  const found = findItemInInventory(itemLink)
  const foundBagId = found !== undefined ? found.bagId : 0
  const foundSlotIndex = found !== undefined ? found.slotIndex : 0
  const quality = GetItemLinkDisplayQuality(itemLink)
  const equipType = GetItemLinkEquipType(itemLink)
  const armorType = GetItemLinkArmorType(itemLink)
  const weaponType = GetItemLinkWeaponType(itemLink)
  const deconCraftingType = inferDeconCraftingType(itemLink)
  const isStolenVal = found !== undefined ? IsItemStolen(foundBagId, foundSlotIndex) : false
  const isBoundVal = found !== undefined ? IsItemBound(foundBagId, foundSlotIndex) : false
  const isBoPTradeableVal =
    found !== undefined ? IsItemBoPAndTradeable(foundBagId, foundSlotIndex) : false
  const isQuestRelevantVal = isItemLinkQuestRelevant(itemLink)
  const isCraftedVal = isItemLinkCraftedSafe(itemLink, signals.itemType)
  const isReconstructedVal = IsItemLinkReconstructed(itemLink)
  const isTransmutedVal =
    GetItemTraitInformationFromItemLink(itemLink) === ITEM_TRAIT_INFORMATION_RETRAITED
  const isLocked = found !== undefined ? IsItemPlayerLocked(foundBagId, foundSlotIndex) : false
  const itemId = GetItemLinkItemId(itemLink)
  const itemName = zo_strformat("<<1>>", GetItemLinkName(itemLink))

  const pricing = lookupTtcPricing(itemLink)
  const merchantValue =
    found !== undefined ? GetItemSellValueWithBonuses(foundBagId, foundSlotIndex) : undefined

  let temperTraitId: string | undefined
  if (signals.traitType !== 0) {
    for (let i = 0; i < ancestorChain.length; i++) {
      const id = requireAt(ancestorChain, i)
      if (id === "jewelry" || id === "companion-jewelry") {
        temperTraitId = PLAYER_JEWELRY_ESO_TO_TRAIT.get(signals.traitType)
        break
      }
      if (id === "weapons" || id === "companion-weapons") {
        temperTraitId = PLAYER_WEAPON_ESO_TO_TRAIT.get(signals.traitType)
        break
      }
      if (id === "armor" || id === "companion-armor") {
        temperTraitId = PLAYER_ARMOR_ESO_TO_TRAIT.get(signals.traitType)
        break
      }
    }
  }

  return {
    quality,
    itemLink,
    bagId: foundBagId,
    slotIndex: foundSlotIndex,
    itemType: signals.itemType,
    traitType: signals.traitType,
    equipType,
    armorType,
    weaponType,
    deconCraftingType,
    isStolenVal,
    isBoundVal,
    isBoPTradeableVal,
    isQuestRelevantVal,
    isCraftedVal,
    isReconstructedVal,
    isTransmutedVal,
    isLocked,
    temperTraitId,
    itemId,
    itemName,
    saleAvg: pricing.saleAvg,
    minPrice: pricing.minPrice,
    amountCount: pricing.amountCount,
    saleAmountCount: pricing.saleAmountCount,
    estimatedValue: pricing.estimatedValue,
    merchantValue,
    replacementCost: pricing.estimatedValue,
  }
}
