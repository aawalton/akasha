"use client"

import type { SortDirection } from "akasha/design/interface/pattern/modules/sort-types/sort-types.module.code.ts"
import { temperBag } from "akasha/temper/catalog/world/temper-bag/temper-bag.page-type.ts"
import { classifyItem } from "akasha/temper/items/core/modules/classify-item/classify-item.module.code.ts"
import {
  ESO_BAG_BACKPACK,
  ESO_BAG_WORN,
} from "akasha/temper/items/core/modules/eso-bag-constants/eso-bag-constants.module.code.ts"
import { buildLocationCurrencyNodes } from "akasha/temper/items/core/modules/inventory-currencies/inventory-currencies.module.code.ts"
import type { InventoryLocationGroup } from "akasha/temper/items/core/modules/inventory-grouping/inventory-grouping.module.code.ts"
import {
  INVENTORY_TYPE_CATEGORY_ORDER,
  type InventoryItemRow,
  type InventoryTypeCategory,
  type InventoryTypeEntry,
  inventoryTypeCategoryOf,
} from "akasha/temper/items/core/modules/inventory-grouping-types/inventory-grouping-types.module.code.ts"
import type { InventoryNode } from "akasha/temper/items/core/modules/inventory-node-types/inventory-node-types.module.code.ts"
import { buildInventoryTypeNodes } from "akasha/temper/items/core/modules/inventory-type-tree-builder/inventory-type-tree-builder.module.code.ts"
import type {
  CurrencyBalances,
  InventoryCurrencies,
} from "akasha/temper/items/core/modules/inventory-types/inventory-types.module.code.ts"
import {
  categoryTitleOf,
  type ItemCategories,
} from "akasha/temper/items/core/modules/item-category-tree/item-category-tree.module.code.ts"
import {
  type KeyedTitles,
  titleOf,
} from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import type { LocationTypeId } from "akasha/temper/items/core/modules/location-classify/location-classify.module.code.ts"
import { useItemCategories } from "akasha/temper/web/modules/item-category-tree-gate/item-category-tree-gate.module.code.tsx"
import { useHeldCompanionCatalog } from "akasha/temper/web/modules/use-companion-catalog/use-companion-catalog.module.code.tsx"
import { useKeyedTitles } from "akasha/temper/web/modules/use-keyed-titles/use-keyed-titles.module.code.tsx"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { inventorySummaryPanelCardCurrencies } from "akasha/temper/web/phrase/pages/inventory-summary-panel-card-currencies.temper-web-phrase.ts"
import {
  InventoryPanelCard,
  type InventorySortMode,
} from "akasha/temper/web/player-inventory-management-ui/modules/inventory-panel-card/inventory-panel-card.module.code.tsx"
import { useMemo } from "react"

export interface LocationTypeCardData {
  locationType: LocationTypeId
  title: string
  groups: readonly InventoryLocationGroup[]
}

function buildCurrencyBranch(
  balances: CurrencyBalances,
  titles: KeyedTitles,
  label: string,
  conversionRates?: Record<string, number>
): InventoryNode | null {
  const leaves = buildLocationCurrencyNodes(balances, titles, conversionRates)
  if (leaves.length === 0) return null
  return { key: "currencies", label, children: leaves }
}

function buildTypeBranches(
  items: readonly InventoryItemRow[],
  categories: ItemCategories
): readonly InventoryNode[] {
  const categoryMap = new Map<InventoryTypeCategory, InventoryTypeEntry[]>()
  for (const item of items) {
    const path = classifyItem(item, categories.roots)
    const category = inventoryTypeCategoryOf(path[0], categories.roots)
    let list = categoryMap.get(category)
    if (!list) {
      list = []
      categoryMap.set(category, list)
    }
    list.push({ row: item, path })
  }

  const result: InventoryNode[] = []
  for (const category of INVENTORY_TYPE_CATEGORY_ORDER) {
    const entries = categoryMap.get(category)
    if (!entries || entries.length === 0) continue
    result.push({
      key: category,
      label: categoryTitleOf(categories, category),
      children: buildInventoryTypeNodes(entries, category, categories.keyed),
    })
  }
  return result
}

function buildCharacterBranches(
  group: InventoryLocationGroup,
  categories: ItemCategories,
  bags: KeyedTitles
): readonly InventoryNode[] {
  if (!group.bagCapacities) return buildTypeBranches(group.items, categories)

  const worn: InventoryItemRow[] = []
  const backpack: InventoryItemRow[] = []
  for (const item of group.items) {
    if (item.bagId === ESO_BAG_WORN) worn.push(item)
    else backpack.push(item)
  }

  const branches: InventoryNode[] = []

  if (worn.length > 0 || group.bagCapacities[ESO_BAG_WORN] !== undefined) {
    branches.push({
      key: "worn",
      label: titleOf(bags, "worn"),
      children: buildTypeBranches(worn, categories),
      slotCount: worn.length,
      bagCapacity: group.bagCapacities[ESO_BAG_WORN],
    })
  }

  if (backpack.length > 0 || group.bagCapacities[ESO_BAG_BACKPACK] !== undefined) {
    branches.push({
      key: "backpack",
      label: titleOf(bags, "backpack"),
      children: buildTypeBranches(backpack, categories),
      slotCount: backpack.length,
      bagCapacity: group.bagCapacities[ESO_BAG_BACKPACK],
    })
  }

  if (branches.length === 0) return buildTypeBranches(group.items, categories)

  return branches
}

interface InventoryLocationTypePanelCardProps {
  card: LocationTypeCardData
  currencies?: InventoryCurrencies
  currencyTitles: KeyedTitles
  conversionRates?: Record<string, number>
  sortMode?: InventorySortMode
  sortDirection?: SortDirection
}

export function InventoryLocationTypePanelCard({
  card,
  currencies,
  currencyTitles,
  conversionRates,
  sortMode,
  sortDirection,
}: InventoryLocationTypePanelCardProps) {
  const isSingleton = card.groups.length === 1 && card.locationType !== "guild"
  const categories = useItemCategories()
  const companionCatalogRead = useHeldCompanionCatalog()
  const bags = useKeyedTitles(temperBag.slug)
  const phrase = usePhrase()
  const currenciesLabel = phrase(inventorySummaryPanelCardCurrencies.slug)

  const nodes = useMemo(() => {
    if (bags === null) return []
    if (isSingleton) {
      const onlyGroup = card.groups[0]
      if (onlyGroup === undefined) return []

      if (card.locationType === "craftbag") {
        const entries = onlyGroup.items.map((row) => ({
          row,
          path: classifyItem(row, categories.roots),
        }))
        return buildInventoryTypeNodes(entries, "crafting", categories.keyed)
      }

      if (card.locationType === "character") {
        const charBranches = buildCharacterBranches(onlyGroup, categories, bags)
        const character = currencies?.characters[onlyGroup.locationKey]
        if (character) {
          const currencyBranch = buildCurrencyBranch(
            character.balances,
            currencyTitles,
            currenciesLabel,
            conversionRates
          )
          if (currencyBranch) return [currencyBranch, ...charBranches]
        }
        return charBranches
      }

      const typeNodes = buildTypeBranches(onlyGroup.items, categories)

      if (card.locationType === "bank" && currencies?.bank) {
        const currencyBranch = buildCurrencyBranch(
          currencies.bank,
          currencyTitles,
          currenciesLabel,
          conversionRates
        )
        if (currencyBranch) return [currencyBranch, ...typeNodes]
      }

      return typeNodes
    }

    return card.groups.map((group): InventoryNode => {
      if (card.locationType === "character") {
        const charChildren = buildCharacterBranches(group, categories, bags)
        const character = currencies?.characters[group.locationKey]
        const currencyBranch = character
          ? buildCurrencyBranch(
              character.balances,
              currencyTitles,
              currenciesLabel,
              conversionRates
            )
          : undefined
        return {
          key: group.locationKey,
          label: group.displayName,
          children: currencyBranch ? [currencyBranch, ...charChildren] : charChildren,
          slotCount: group.occupiedSlots,
        }
      }

      const typeChildren = buildTypeBranches(group.items, categories)
      return {
        key: group.locationKey,
        label: group.displayName,
        children: typeChildren,
        slotCount: group.occupiedSlots,
        bagCapacity: group.bagCapacity,
      }
    })
  }, [
    card.groups,
    card.locationType,
    isSingleton,
    currencies,
    currencyTitles,
    conversionRates,
    categories,
    companionCatalogRead,
    bags,
    currenciesLabel,
  ])

  const singletonGroup = isSingleton ? card.groups[0] : undefined
  const singletonBagCapacity =
    singletonGroup && card.locationType !== "character" ? singletonGroup.bagCapacity : undefined

  return (
    <InventoryPanelCard
      id={`inventory-location-${card.locationType}`}
      title={card.title}
      items={nodes}
      slotCount={singletonGroup?.occupiedSlots}
      bagCapacity={singletonBagCapacity}
      sortMode={sortMode}
      sortDirection={sortDirection}
      actionButtonCount={1}
    />
  )
}
