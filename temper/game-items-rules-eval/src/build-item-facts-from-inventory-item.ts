import {
  ESO_ITEMTYPE_CRAFTED_ABILITY_SCRIPT,
  ESO_ITEMTYPE_RECIPE,
  ESO_SPECIALIZED_ITEMTYPE_MOTIF_BOOK,
  ESO_SPECIALIZED_ITEMTYPE_MOTIF_CHAPTER,
  type InventoryItemData,
  isKnowledgeItem,
} from "@temper/game-items-core/inventory-types"
import { parseItemLink } from "@temper/game-items-core/item-link-parser"
import type { InventoryLocationConditionId } from "@temper/game-items-core/location-condition"
import { parseMotifBookName } from "@temper/game-items-core/motif-name-parser"
import { getRecipeResultId } from "@temper/game-items-core/recipe-result-id-lookup"
import { getScriptItemIdByName } from "@temper/game-items-core/script-knowledge-lookup"
import { ALL_CATEGORIES_ID } from "@temper/game-items-rules-core/inventory-rule-types"
import { resolvePotionRestoreMetricIds } from "@temper/game-items-rules-core/potion-restore-resolve"
import type { ItemKey } from "@temper/game-items-rules-core/use-destination-types"
import type { ItemFacts } from "./item-facts"

function parsePotionDataFromLink(itemLink: string): number {
  return parseItemLink(itemLink)?.potionData ?? 0
}

export interface BuildItemFactsInput {
  readonly item: InventoryItemData
  readonly nodeIds: ReadonlyArray<string>
  readonly location: InventoryLocationConditionId | undefined
  readonly itemKey: ItemKey | undefined
}

export function buildItemFactsFromInventoryItem(input: BuildItemFactsInput): ItemFacts {
  const { item, nodeIds, location, itemKey } = input
  return {
    itemId: item.itemId,
    itemName: item.itemName,
    itemLink: item.itemLink,
    stackCount: item.stackCount,
    maxStackSize: item.maxStackSize,
    quality: item.quality,
    requiredLevel: item.requiredLevel,
    requiredCP: item.requiredCP,
    itemType: item.itemType,
    specializedItemType: item.specializedItemType,
    filterType: item.filterType,
    traitType: item.traitType,
    equipType: item.equipType,
    weaponType: item.weaponType,
    armorType: item.armorType,
    furnitureCategoryId: item.furnitureCategoryId,
    furnitureSubcategoryId: item.furnitureSubcategoryId,
    setId: item.setId,
    isContainer: item.isContainer,
    isStolen: item.stolen,
    isBound: item.bound,
    isBoPTradeable: item.bopTradeable,
    isQuestRelevant: item.questRelevant,
    isLocked: item.locked,
    isReconstructed: item.reconstructed,
    isTransmuted: item.transmuted,
    isCrafted: item.crafted,
    estimatedValue: item.estimatedValue,
    merchantValue: item.merchantValue,
    replacementCost: item.replacementCost,
    known: item.known,
    isKnowledgeItem: isKnowledgeItem(item.itemType, item.specializedItemType),
    potionEffectMetricIds: resolvePotionRestoreMetricIds(
      item.itemId,
      parsePotionDataFromLink(item.itemLink)
    ),
    itemKey,
    categoryNodeIds: [ALL_CATEGORIES_ID, ...nodeIds],
    location,
  }
}

export function resolveStaticItemKey(item: InventoryItemData): ItemKey | undefined {
  if (item.itemType === ESO_ITEMTYPE_RECIPE) {
    const resultItemId = getRecipeResultId(item.itemName) ?? item.itemId
    return { kind: "recipe", resultItemId }
  }
  if (
    item.specializedItemType === ESO_SPECIALIZED_ITEMTYPE_MOTIF_CHAPTER ||
    item.specializedItemType === ESO_SPECIALIZED_ITEMTYPE_MOTIF_BOOK
  ) {
    const parsed = parseMotifBookName(item.itemName)
    if (parsed !== undefined) {
      return { kind: "motif", styleId: parsed.styleId, chapterId: parsed.chapterId }
    }
    return undefined
  }
  if (item.itemType === ESO_ITEMTYPE_CRAFTED_ABILITY_SCRIPT) {
    const stripped = item.itemName.includes(": ")
      ? item.itemName.slice(item.itemName.indexOf(": ") + 2)
      : item.itemName
    const scriptId = getScriptItemIdByName(stripped) ?? item.itemId
    return { kind: "script", scriptId }
  }
  return undefined
}
