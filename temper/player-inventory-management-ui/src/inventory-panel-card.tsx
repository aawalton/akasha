"use client"

import { formatGold } from "@shared/design-primitives/utils/format-gold"
import { PanelCard } from "@shared/design-layout/components/panel-card"
import { ItemRow } from "@shared/design-patterns/components/item-row"
import { useSetToggle } from "@shared/design-patterns/hooks/use-set-toggle"
import { buildNodePath } from "@shared/design-patterns/utils/path"
import { type SortDirection } from "@shared/design-patterns/utils/sort-types"
import { ESO_QUALITY_TEXT_CLASSES } from "@temper/game-characters-equipment-ui/quality-text-classes"
import type { InventoryLeafNode, InventoryNode } from "@temper/game-items-core/inventory-node-types"
import { useState } from "react"
import { ItemTooltipPopover } from "./item-tooltip-popover"
import { type ValueExplanationData, ValueExplanationDialog } from "./value-explanation-dialog"

export type InventorySortMode = "name" | "value" | "count" | "quality"

interface AggregateResult {
  stackCount: number
  totalValue: number | undefined
  slotCount: number | undefined
  bagCapacity: number | undefined
}

function aggregate(node: InventoryNode): AggregateResult {
  if (!("children" in node)) {
    return {
      stackCount: node.stackCount,
      totalValue:
        node.totalValue ?? (node.value !== undefined ? node.value * node.stackCount : undefined),
      slotCount: node.slotCount,
      bagCapacity: node.bagCapacity,
    }
  }
  let stackCount = 0
  let totalValue: number | undefined
  let hasValue = false
  let slotCount: number | undefined
  let allHaveSlots = true
  for (const child of node.children) {
    const result = aggregate(child)
    stackCount += result.stackCount
    if (result.totalValue !== undefined) {
      hasValue = true
      totalValue = (totalValue ?? 0) + result.totalValue
    }
    if (result.slotCount !== undefined) {
      slotCount = (slotCount ?? 0) + result.slotCount
    } else {
      allHaveSlots = false
    }
  }
  return {
    stackCount,
    totalValue: hasValue ? totalValue : undefined,
    slotCount: node.slotCount ?? (allHaveSlots ? slotCount : undefined),
    bagCapacity: node.bagCapacity,
  }
}

function hasAnyValue(nodes: readonly InventoryNode[]): boolean {
  for (const node of nodes) {
    if ("children" in node) {
      if (hasAnyValue(node.children)) return true
    } else if (node.totalValue !== undefined || node.value !== undefined) {
      return true
    }
  }
  return false
}

function maxQuality(node: InventoryNode): number {
  if (!("children" in node)) return node.quality ?? 0
  let max = 0
  for (const child of node.children) {
    const q = maxQuality(child)
    if (q > max) max = q
  }
  return max
}

function sortChildren(
  children: readonly InventoryNode[],
  sortMode: InventorySortMode,
  sortDirection: SortDirection
): readonly InventoryNode[] {
  const dir = sortDirection === "desc" ? -1 : 1
  return [...children].sort((a, b) => {
    if (sortMode === "value") {
      const av = aggregate(a).totalValue ?? -1
      const bv = aggregate(b).totalValue ?? -1
      if (av !== bv) return (av - bv) * dir
      return a.label.localeCompare(b.label)
    }
    if (sortMode === "count") {
      const ac = aggregate(a).stackCount
      const bc = aggregate(b).stackCount
      if (ac !== bc) return (ac - bc) * dir
      return a.label.localeCompare(b.label)
    }
    if (sortMode === "quality") {
      const aq = maxQuality(a)
      const bq = maxQuality(b)
      if (aq !== bq) return (aq - bq) * dir
      return a.label.localeCompare(b.label)
    }
    return a.label.localeCompare(b.label) * dir
  })
}

function leafToValueData(node: InventoryLeafNode): ValueExplanationData {
  return {
    itemName: node.label,
    replacementValue: node.replacementValue,
    merchantValue: node.merchantValue,
    saleAvg: node.saleAvg,
    minPrice: node.minPrice,
    amountCount: node.amountCount,
    saleAmountCount: node.saleAmountCount,
    suggestedPrice: node.suggestedPrice,
  }
}

interface InventoryPanelCardProps {
  id?: string
  title: React.ReactNode
  items: readonly InventoryNode[]
  sortMode?: InventorySortMode
  sortDirection?: SortDirection
  collapseProtected?: boolean
  slotCount?: number
  bagCapacity?: number
  onItemClick?: (key: string) => void
  hideQuantities?: boolean
  actionButtonCount?: number
  defaultOpen?: boolean
  scopeNote?: React.ReactNode
  subdued?: boolean
}

export function InventoryPanelCard({
  id,
  title,
  items,
  sortMode,
  sortDirection,
  collapseProtected,
  slotCount: slotCountOverride,
  bagCapacity: bagCapacityOverride,
  onItemClick,
  hideQuantities,
  actionButtonCount,
  defaultOpen,
  scopeNote,
  subdued,
}: InventoryPanelCardProps) {
  const resolvedSortMode = sortMode ?? "name"
  const resolvedSortDirection = sortDirection ?? "asc"
  const onlyItem = items[0]
  const singleGroupKey =
    items.length === 1 && onlyItem !== undefined && "children" in onlyItem
      ? String(onlyItem.key)
      : undefined
  const { items: expanded, toggle } = useSetToggle(
    singleGroupKey != null ? [singleGroupKey] : undefined
  )

  const showValues = hasAnyValue(items)
  const [valueDialogData, setValueDialogData] = useState<ValueExplanationData | null>(null)
  const [valueDialogOpen, setValueDialogOpen] = useState(false)

  function renderNode(
    node: InventoryNode,
    depth: number,
    parentPath: string,
    useAccentColor = false
  ) {
    const path = buildNodePath(parentPath, node.key)

    if ("children" in node) {
      const agg = aggregate(node)
      const isExpanded = expanded.has(path)
      return (
        <div key={node.key}>
          <ItemRow
            label={node.label}
            quantity={hideQuantities ? undefined : agg.stackCount}
            slotCount={hideQuantities ? undefined : agg.slotCount}
            bagCapacity={hideQuantities ? undefined : agg.bagCapacity}
            value={
              showValues && agg.totalValue !== undefined ? formatGold(agg.totalValue) : undefined
            }
            depth={depth}
            accent={useAccentColor}
            subdued={subdued && !useAccentColor}
            actionButtonCount={actionButtonCount}
            expanded={isExpanded}
            onToggle={() => toggle(path)}
          />
          {isExpanded &&
            sortChildren(node.children, resolvedSortMode, resolvedSortDirection).map((child) =>
              renderNode(child, depth + 1, path)
            )}
        </div>
      )
    }

    const leafLabelText =
      node.quality !== undefined && ESO_QUALITY_TEXT_CLASSES[node.quality] != null ? (
        <span className={ESO_QUALITY_TEXT_CLASSES[node.quality]}>{node.label}</span>
      ) : (
        node.label
      )

    const leafLabel =
      !onItemClick && node.tooltipInstance ? (
        <ItemTooltipPopover itemLink={node.itemLink ?? ""} instance={node.tooltipInstance}>
          <span className="cursor-pointer">{leafLabelText}</span>
        </ItemTooltipPopover>
      ) : (
        leafLabelText
      )

    const leafTotalValue =
      node.totalValue ?? (node.value !== undefined ? node.value * node.stackCount : undefined)

    const showLeafQuantity = !hideQuantities && node.stackCount > 1
    const hasLeafValue = showValues && leafTotalValue !== undefined
    const hasValueBreakdown =
      node.replacementValue !== undefined ||
      node.merchantValue !== undefined ||
      node.saleAvg !== undefined
    return (
      <div key={node.key}>
        <ItemRow
          label={leafLabel}
          quantity={showLeafQuantity ? node.stackCount : undefined}
          slotCount={showLeafQuantity ? node.slotCount : undefined}
          bagCapacity={showLeafQuantity ? node.bagCapacity : undefined}
          value={hasLeafValue ? formatGold(leafTotalValue) : undefined}
          subdued={subdued && !useAccentColor}
          onValueClick={
            hasLeafValue && hasValueBreakdown
              ? () => {
                  setValueDialogData(leafToValueData(node))
                  setValueDialogOpen(true)
                }
              : undefined
          }
          depth={depth}
          accent={useAccentColor}
          actionButtonCount={actionButtonCount}
          onClick={onItemClick ? () => onItemClick(node.key) : undefined}
        />
      </div>
    )
  }

  const isSingleCategory = items.length === 1

  let totalCount = 0
  let totalValueAgg: number | undefined
  let hasTotalValue = false
  let totalSlotCount: number | undefined
  let allHaveSlots = true
  for (const item of items) {
    const agg = aggregate(item)
    totalCount += agg.stackCount
    if (agg.totalValue !== undefined) {
      hasTotalValue = true
      totalValueAgg = (totalValueAgg ?? 0) + agg.totalValue
    }
    if (agg.slotCount !== undefined) {
      totalSlotCount = (totalSlotCount ?? 0) + agg.slotCount
    } else {
      allHaveSlots = false
    }
  }

  return (
    <>
      <PanelCard
        id={id ?? (typeof title === "string" ? title : "inventory")}
        title={title}
        collapsible
        collapseProtected={collapseProtected}
        defaultOpen={defaultOpen}
      >
        <div className="flex flex-col gap-1.5">
          {!isSingleCategory && (
            <ItemRow
              label="Total"
              quantity={totalCount}
              slotCount={slotCountOverride ?? (allHaveSlots ? totalSlotCount : undefined)}
              bagCapacity={bagCapacityOverride}
              value={
                showValues && hasTotalValue && totalValueAgg !== undefined
                  ? formatGold(totalValueAgg)
                  : undefined
              }
              accent
              actionButtonCount={actionButtonCount}
              onClick={() => onItemClick?.("total")}
            />
          )}
          {scopeNote}
          {sortChildren(items, resolvedSortMode, resolvedSortDirection).map((item) =>
            renderNode(item, 0, "", isSingleCategory)
          )}
        </div>
      </PanelCard>
      <ValueExplanationDialog
        open={valueDialogOpen}
        onOpenChange={setValueDialogOpen}
        data={valueDialogData}
      />
    </>
  )
}
