import {
  ESO_ITEMTYPE_CRAFTED_ABILITY_SCRIPT,
  ESO_ITEMTYPE_RECIPE,
  ESO_SPECIALIZED_ITEMTYPE_MOTIF_BOOK,
  ESO_SPECIALIZED_ITEMTYPE_MOTIF_CHAPTER,
  type InventoryItemData,
  isKnowledgeItem,
} from "akasha/temper/items-core/inventory-types/inventory-types.module.code.ts"
import { parseItemLink } from "akasha/temper/items-core/item-link-parser/item-link-parser.module.code.ts"
import type { InventoryLocationConditionId } from "akasha/temper/items-core/location-condition/location-condition.module.code.ts"
import { parseMotifBookName } from "akasha/temper/items-core/motif-name-parser/motif-name-parser.module.code.ts"
import { getRecipeResultId } from "akasha/temper/items-core/recipe-result-id-lookup/recipe-result-id-lookup.module.code.ts"
import { getScriptItemIdByName } from "akasha/temper/items-core/script-knowledge-lookup/script-knowledge-lookup.module.code.ts"
import { ALL_CATEGORIES_ID } from "akasha/temper/items-rules-core/inventory-rule-types/inventory-rule-types.module.code.ts"
import { resolvePotionRestoreMetricIds } from "akasha/temper/items-rules-core/potion-restore-resolve/potion-restore-resolve.module.code.ts"
import type { ItemKey } from "akasha/temper/items-rules-core/use-destination-types/use-destination-types.module.code.ts"
import type { ItemFacts } from "../item-facts/item-facts.module.code.ts"

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
