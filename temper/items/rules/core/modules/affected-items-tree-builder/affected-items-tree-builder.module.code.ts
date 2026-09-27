import { requireFirst } from "akasha/code/type/narrowing/modules/require-first/require-first.module.code.ts"
import { classifyItem } from "akasha/temper/items/core/modules/classify-item/classify-item.module.code.ts"
import { ESO_BAG_WORN } from "akasha/temper/items/core/modules/eso-bag-constants/eso-bag-constants.module.code.ts"
import { computeValue } from "akasha/temper/items/core/modules/inventory-display-value/inventory-display-value.module.code.ts"
import {
  INVENTORY_TYPE_CATEGORY_ORDER,
  type InventoryTypeEntry,
} from "akasha/temper/items/core/modules/inventory-grouping-types/inventory-grouping-types.module.code.ts"
import type { InventoryNode } from "akasha/temper/items/core/modules/inventory-node-types/inventory-node-types.module.code.ts"
import { buildInventoryTypeNodes } from "akasha/temper/items/core/modules/inventory-type-tree-builder/inventory-type-tree-builder.module.code.ts"
import type {
  ItemCategories,
  ItemCategoriesKeyed,
} from "akasha/temper/items/core/modules/item-category-tree/item-category-tree.module.code.ts"
import type { ItemCategoryRoots } from "akasha/temper/items/core/modules/item-category-tree-types/item-category-tree-types.module.code.ts"
import {
  type KeyedTitles,
  titleOf,
} from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import {
  classifyLocation,
  isLocationTypeId,
  type LocationTypeId,
} from "akasha/temper/items/core/modules/location-classify/location-classify.module.code.ts"
import type { AffectedItem } from "akasha/temper/items/rules/core/modules/inventory-rule-matcher-types/inventory-rule-matcher-types.module.code.ts"

function toTypeEntry(
  affected: AffectedItem,
  index: number,
  roots: ItemCategoryRoots
): InventoryTypeEntry {
  const { item, locationKey } = affected
  return {
    row: {
      key: `${locationKey}-${item.itemId}-${index}`,
      itemName: item.itemName,
      quality: item.quality,
      stackCount: item.stackCount,
      value: computeValue(item.marketValue, item.merchantValue, item.replacementValue),
      filterType: item.filterType,
      itemType: item.itemType,
      specializedItemType: item.specializedItemType,
      traitType: item.traitType,
      equipType: item.equipType,
      weaponType: item.weaponType,
      armorType: item.armorType,
      furnitureCategory: item.furnitureCategory,
      furnitureCategoryId: item.furnitureCategoryId,
      furnitureSubcategoryId: item.furnitureSubcategoryId,
      stolen: item.stolen,
      bound: item.bound,
      replacementValue: item.replacementValue,
      merchantValue: item.merchantValue,
      saleAvg: item.saleAvg,
      minPrice: item.minPrice,
      amountCount: item.amountCount,
      saleAmountCount: item.saleAmountCount,
    },
    path: classifyItem(item, roots),
  }
}

function buildTypeBranchesFromEntries(
  entries: readonly InventoryTypeEntry[],
  keyed: ItemCategoriesKeyed
): readonly InventoryNode[] {
  const byCategory = new Map<string, InventoryTypeEntry[]>()
  for (const entry of entries) {
    const l0 = entry.path[0]
    if (l0 == null) continue
    let list = byCategory.get(l0)
    if (!list) {
      list = []
      byCategory.set(l0, list)
    }
    list.push(entry)
  }

  const nodes: InventoryNode[] = []
  for (const category of INVENTORY_TYPE_CATEGORY_ORDER) {
    const categoryEntries = byCategory.get(category)
    if (!categoryEntries || categoryEntries.length === 0) continue
    const children = buildInventoryTypeNodes(categoryEntries, category, keyed)
    if (children.length === 0) continue
    nodes.push({ key: category.toLowerCase(), label: category, children })
  }
  return nodes
}

export function buildAffectedItemNodes(
  items: readonly AffectedItem[],
  categories: ItemCategories
): readonly InventoryNode[] {
  const entries = items.map((affected, index) => toTypeEntry(affected, index, categories.roots))
  return buildTypeBranchesFromEntries(entries, categories.keyed)
}

interface LocationGroup {
  locationKey: string
  displayName: string
  locationType: LocationTypeId
  items: readonly { affected: AffectedItem; index: number }[]
}

export function buildAffectedItemLocationNodes(
  items: readonly AffectedItem[],
  locations: KeyedTitles,
  categories: ItemCategories
): readonly InventoryNode[] {
  const accumulator = new Map<string, { affected: AffectedItem; index: number }[]>()
  const locationMap = new Map<string, LocationGroup>()
  for (const [i, affected] of items.entries()) {
    let bucket = accumulator.get(affected.locationKey)
    if (!bucket) {
      bucket = []
      accumulator.set(affected.locationKey, bucket)
      locationMap.set(affected.locationKey, {
        locationKey: affected.locationKey,
        displayName: affected.locationDisplayName,
        locationType: classifyLocation(affected.locationKey),
        items: bucket,
      })
    }
    bucket.push({ affected, index: i })
  }

  const typeMap = new Map<LocationTypeId, LocationGroup[]>()
  for (const group of locationMap.values()) {
    let list = typeMap.get(group.locationType)
    if (!list) {
      list = []
      typeMap.set(group.locationType, list)
    }
    list.push(group)
  }

  const nodes: InventoryNode[] = []
  for (const locationType of locations.keys) {
    if (!isLocationTypeId(locationType)) continue
    const groups = typeMap.get(locationType)
    if (!groups || groups.length === 0) continue

    groups.sort((a, b) => a.displayName.localeCompare(b.displayName))

    const isSingleton = groups.length === 1 && locationType !== "guild"

    if (isSingleton) {
      const group = requireFirst(groups, "groups")
      const locationChildren = buildLocationGroupChildren(group, categories)
      nodes.push({
        key: locationType,
        label: titleOf(locations, locationType),
        children: locationChildren,
      })
    } else {
      const locationNodes: InventoryNode[] = groups.map((group) => ({
        key: group.locationKey,
        label: group.displayName,
        children: buildLocationGroupChildren(group, categories),
      }))
      nodes.push({
        key: locationType,
        label: titleOf(locations, locationType),
        children: locationNodes,
      })
    }
  }

  return nodes
}

function buildLocationGroupChildren(
  group: LocationGroup,
  categories: ItemCategories
): readonly InventoryNode[] {
  const { roots, keyed } = categories
  const entries = group.items.map(({ affected, index }) => toTypeEntry(affected, index, roots))

  if (group.locationType === "character") {
    const wornEntries: InventoryTypeEntry[] = []
    const backpackEntries: InventoryTypeEntry[] = []
    for (const [i, item] of group.items.entries()) {
      const entry = entries[i]
      if (entry === undefined) continue
      if (item.affected.bagId === ESO_BAG_WORN) wornEntries.push(entry)
      else backpackEntries.push(entry)
    }

    const branches: InventoryNode[] = []
    if (wornEntries.length > 0) {
      branches.push({
        key: "worn",
        label: "Worn",
        children: buildTypeBranchesFromEntries(wornEntries, keyed),
      })
    }
    if (backpackEntries.length > 0) {
      branches.push({
        key: "backpack",
        label: "Backpack",
        children: buildTypeBranchesFromEntries(backpackEntries, keyed),
      })
    }
    return branches.length > 0 ? branches : buildTypeBranchesFromEntries(entries, keyed)
  }

  if (group.locationType === "craftbag") {
    return buildInventoryTypeNodes(entries, "Crafting", keyed)
  }

  return buildTypeBranchesFromEntries(entries, keyed)
}
