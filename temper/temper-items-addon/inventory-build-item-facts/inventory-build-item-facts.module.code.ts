import { parsePotionData } from "@akasha/temper-characters-capture-addon/character-capture-potion-map"
import { locationConditionFromKeyAndBag } from "@akasha/temper-items-core/location-condition"
import { resolvePotionRestoreMetricIds } from "@akasha/temper-items-rules-core/potion-restore-resolve"
import type { ItemFacts } from "@akasha/temper-items-rules-eval/item-facts"
import {
  findItemInInventory,
  isItemLinkCraftedSafe,
  isItemLocked,
  lookupTtcPricing,
} from "../inventory-item-data/inventory-item-data.module.code.ts"
import { getLocationKeyForBag } from "../inventory-location-keys/inventory-location-keys.module.code.ts"
import { isItemLinkQuestRelevant } from "../inventory-quest-relevance/inventory-quest-relevance.module.code.ts"
import {
  classifyItem,
  gatherSignals,
  getAncestorChain,
} from "../inventory-rules-classify/inventory-rules-classify.module.code.ts"
import { getCompiledConfig } from "../inventory-rules-core/inventory-rules-core.module.code.ts"
import { buildUnlockItemKey } from "../inventory-rules-core-character-finders/inventory-rules-core-character-finders.module.code.ts"
import {
  isItemKnown,
  isKnowledgeItemLink,
} from "../inventory-rules-core-overrides/inventory-rules-core-overrides.module.code.ts"
export function buildItemFactsForSlot(bagId: number, slotIndex: number): ItemFacts | undefined {
  const [stackSize, maxStack] = GetSlotStackSize(bagId, slotIndex)
  if (stackSize === 0) return undefined

  const itemLink = GetItemLink(bagId, slotIndex, LINK_STYLE_BRACKETS)
  if (itemLink === "") return undefined

  const merchantValue = GetItemSellValueWithBonuses(bagId, slotIndex)
  const isStolen = IsItemStolen(bagId, slotIndex)
  const isBound = IsItemBound(bagId, slotIndex)
  const isBoPTradeable = IsItemBoPAndTradeable(bagId, slotIndex)
  const isLocked = isItemLocked(bagId, slotIndex)

  const locKey = getLocationKeyForBag(bagId)
  const location = locKey !== undefined ? locationConditionFromKeyAndBag(locKey, bagId) : undefined

  return buildFactsCore(itemLink, {
    stackCount: stackSize,
    maxStackSize: maxStack,
    merchantValue,
    isStolen,
    isBound,
    isBoPTradeable,
    isLocked,
    location,
  })
}

export function buildItemFactsForLink(itemLink: string): ItemFacts {
  const found = findItemInInventory(itemLink)
  if (found !== undefined) {
    const [stackSize, maxStack] = GetSlotStackSize(found.bagId, found.slotIndex)
    const locKey = getLocationKeyForBag(found.bagId)
    const location =
      locKey !== undefined ? locationConditionFromKeyAndBag(locKey, found.bagId) : undefined
    return buildFactsCore(itemLink, {
      stackCount: stackSize,
      maxStackSize: maxStack,
      merchantValue: GetItemSellValueWithBonuses(found.bagId, found.slotIndex),
      isStolen: IsItemStolen(found.bagId, found.slotIndex),
      isBound: IsItemBound(found.bagId, found.slotIndex),
      isBoPTradeable: IsItemBoPAndTradeable(found.bagId, found.slotIndex),
      isLocked: isItemLocked(found.bagId, found.slotIndex),
      location,
    })
  }
  return buildFactsCore(itemLink, {})
}

interface SlotSignals {
  readonly stackCount?: number
  readonly maxStackSize?: number
  readonly merchantValue?: number
  readonly isStolen?: boolean
  readonly isBound?: boolean
  readonly isBoPTradeable?: boolean
  readonly isLocked?: boolean
  readonly location?: ItemFacts["location"]
}

function buildFactsCore(itemLink: string, slot: SlotSignals): ItemFacts {
  const signals = gatherSignals(0, 0, itemLink)
  const nodeId = classifyItem(signals)
  const categoryNodeIds = getAncestorChain(nodeId)

  const itemId = GetItemLinkItemId(itemLink)
  const itemName = signals.itemName

  const {
    itemType,
    specializedItemType,
    filterType,
    traitType,
    equipType,
    weaponType,
    armorType,
    furnitureCategoryId,
    furnitureSubcategoryId,
  } = signals

  const quality = GetItemLinkDisplayQuality(itemLink)
  const requiredLevel = GetItemLinkRequiredLevel(itemLink)
  const requiredCP = GetItemLinkRequiredChampionPoints(itemLink)

  const [hasSet, , , , , setIdRaw] = GetItemLinkSetInfo(itemLink, false)
  const setId = hasSet && setIdRaw !== 0 ? setIdRaw : undefined

  const isContainer = IsItemLinkContainer(itemLink)
  const isCrafted =
    signals.itemType !== 0 ? isItemLinkCraftedSafe(itemLink, signals.itemType) : false
  const isReconstructed = IsItemLinkReconstructed(itemLink)
  const isTransmuted =
    GetItemTraitInformationFromItemLink(itemLink) === ITEM_TRAIT_INFORMATION_RETRAITED

  const pricing = lookupTtcPricing(itemLink)
  const estimatedValue = pricing.estimatedValue
  const replacementCost = pricing.estimatedValue

  const potionEffectMetricIds = resolvePotionRestoreMetricIds(itemId, parsePotionData(itemLink))

  const itemKey = resolveItemKey(itemLink, signals.itemType, itemId)

  const known = isItemKnown(itemLink, signals.itemType)

  const isKnowledge = isKnowledgeItemLink(itemLink, signals.itemType)

  return {
    itemId,
    itemName,
    itemLink,
    stackCount: slot.stackCount,
    maxStackSize: slot.maxStackSize,
    quality,
    requiredLevel,
    requiredCP,
    itemType,
    specializedItemType,
    filterType,
    traitType,
    equipType,
    weaponType,
    armorType,
    furnitureCategoryId,
    furnitureSubcategoryId,
    setId,
    isContainer,
    isStolen: slot.isStolen,
    isBound: slot.isBound,
    isBoPTradeable: slot.isBoPTradeable,
    isQuestRelevant: isItemLinkQuestRelevant(itemLink),
    isCrafted,
    isLocked: slot.isLocked,
    isReconstructed,
    isTransmuted,
    estimatedValue,
    merchantValue: slot.merchantValue,
    replacementCost,
    known,
    isKnowledgeItem: isKnowledge,
    potionEffectMetricIds,
    itemKey,
    categoryNodeIds,
    location: slot.location,
  }
}

export function resolveItemKey(
  itemLink: string,
  itemType: number,
  itemId: number
): ItemFacts["itemKey"] {
  const unlockKey = buildUnlockItemKey(itemLink, itemType)
  if (unlockKey !== undefined) return unlockKey

  const compiled = getCompiledConfig()
  if (compiled === undefined) return undefined
  const wantedChars = compiled.wantedConsumables[itemId]
  if (wantedChars !== undefined && wantedChars.length > 0) {
    return { kind: "consumable", itemId }
  }

  return undefined
}
