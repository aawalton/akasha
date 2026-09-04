"use client"

import type { SortDirection } from "@akasha/design-patterns/sort-types"
import { classifyItem } from "@akasha/temper-items-core/classify-item"
import { ESO_BAG_BACKPACK, ESO_BAG_WORN } from "@akasha/temper-items-core/eso-bag-constants"
import { buildLocationCurrencyNodes } from "@akasha/temper-items-core/inventory-currencies"
import type { InventoryLocationGroup } from "@akasha/temper-items-core/inventory-grouping"
import {
  INVENTORY_TYPE_CATEGORY_ORDER,
  type InventoryItemRow,
  type InventoryTypeCategory,
  type InventoryTypeEntry,
  isInventoryTypeCategory,
} from "@akasha/temper-items-core/inventory-grouping-types"
import type { InventoryNode } from "@akasha/temper-items-core/inventory-node-types"
import { buildInventoryTypeNodes } from "@akasha/temper-items-core/inventory-type-tree-builder"
import type {
  CurrencyBalances,
  InventoryCurrencies,
} from "@akasha/temper-items-core/inventory-types"
import type { LocationTypeId } from "@akasha/temper-items-core/location-type-data"
import { useMemo } from "react"
import {
  InventoryPanelCard,
  type InventorySortMode,
} from "../inventory-panel-card/inventory-panel-card.module.code.tsx"

export interface LocationTypeCardData {
  locationType: LocationTypeId
  title: string
  groups: readonly InventoryLocationGroup[]
}

function buildCurrencyBranch(
  balances: CurrencyBalances,
  conversionRates?: Record<string, number>
): InventoryNode | null {
  const leaves = buildLocationCurrencyNodes(balances, conversionRates)
  if (leaves.length === 0) return null
  return { key: "currencies", label: "Currencies", children: leaves }
}

function buildTypeBranches(items: readonly InventoryItemRow[]): readonly InventoryNode[] {
  const categoryMap = new Map<InventoryTypeCategory, InventoryTypeEntry[]>()
  for (const item of items) {
    const path = classifyItem(item)
    const head = path[0]
    const category: InventoryTypeCategory = isInventoryTypeCategory(head) ? head : "Miscellaneous"
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
      label: category,
      children: buildInventoryTypeNodes(entries, category),
    })
  }
  return result
}

function buildCharacterBranches(group: InventoryLocationGroup): readonly InventoryNode[] {
  if (!group.bagCapacities) return buildTypeBranches(group.items)

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
      label: "Worn",
      children: buildTypeBranches(worn),
      slotCount: worn.length,
      bagCapacity: group.bagCapacities[ESO_BAG_WORN],
    })
  }

  if (backpack.length > 0 || group.bagCapacities[ESO_BAG_BACKPACK] !== undefined) {
    branches.push({
      key: "backpack",
      label: "Backpack",
      children: buildTypeBranches(backpack),
      slotCount: backpack.length,
      bagCapacity: group.bagCapacities[ESO_BAG_BACKPACK],
    })
  }

  if (branches.length === 0) return buildTypeBranches(group.items)

  return branches
}

interface InventoryLocationTypePanelCardProps {
  card: LocationTypeCardData
  currencies?: InventoryCurrencies
  conversionRates?: Record<string, number>
  sortMode?: InventorySortMode
  sortDirection?: SortDirection
}

export function InventoryLocationTypePanelCard({
  card,
  currencies,
  conversionRates,
  sortMode,
  sortDirection,
}: InventoryLocationTypePanelCardProps) {
  const isSingleton = card.groups.length === 1 && card.locationType !== "guild"

  const nodes = useMemo(() => {
    if (isSingleton) {
      const onlyGroup = card.groups[0]
      if (onlyGroup === undefined) return []

      if (card.locationType === "craftbag") {
        const entries = onlyGroup.items.map((row) => ({
          row,
          path: classifyItem(row),
        }))
        return buildInventoryTypeNodes(entries, "Crafting")
      }

      if (card.locationType === "character") {
        const charBranches = buildCharacterBranches(onlyGroup)
        const character = currencies?.characters[onlyGroup.locationKey]
        if (character) {
          const currencyBranch = buildCurrencyBranch(character.balances, conversionRates)
          if (currencyBranch) return [currencyBranch, ...charBranches]
        }
        return charBranches
      }

      const typeNodes = buildTypeBranches(onlyGroup.items)

      if (card.locationType === "bank" && currencies?.bank) {
        const currencyBranch = buildCurrencyBranch(currencies.bank, conversionRates)
        if (currencyBranch) return [currencyBranch, ...typeNodes]
      }

      return typeNodes
    }

    return card.groups.map((group): InventoryNode => {
      if (card.locationType === "character") {
        const charChildren = buildCharacterBranches(group)
        const character = currencies?.characters[group.locationKey]
        const currencyBranch = character
          ? buildCurrencyBranch(character.balances, conversionRates)
          : undefined
        return {
          key: group.locationKey,
          label: group.displayName,
          children: currencyBranch ? [currencyBranch, ...charChildren] : charChildren,
          slotCount: group.occupiedSlots,
        }
      }

      const typeChildren = buildTypeBranches(group.items)
      return {
        key: group.locationKey,
        label: group.displayName,
        children: typeChildren,
        slotCount: group.occupiedSlots,
        bagCapacity: group.bagCapacity,
      }
    })
  }, [card.groups, card.locationType, isSingleton, currencies, conversionRates])

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
