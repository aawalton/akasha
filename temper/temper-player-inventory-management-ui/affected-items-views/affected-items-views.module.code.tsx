"use client"

import { ItemRow } from "@akasha/design-patterns/item-row"
import { buildNodePath } from "@akasha/design-patterns/path"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@akasha/design-patterns/tabs"
import { useSetToggle } from "@akasha/design-patterns/use-set-toggle"
import { cn } from "@akasha/design-primitives/cn"
import { formatGold } from "@akasha/design-primitives/format-gold"
import { ScrollArea } from "@akasha/design-primitives/scroll-area"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import { Text } from "@akasha/design-primitives/text-body"
import { ESO_QUALITY_TEXT_CLASSES } from "@akasha/temper-characters-equipment-ui/eso-quality-text-classes"
import type {
  InventoryLeafNode,
  InventoryNode,
} from "@akasha/temper-items-core/inventory-node-types"
import {
  buildAffectedItemLocationNodes,
  buildAffectedItemNodes,
} from "@akasha/temper-items-rules-core/affected-items-tree-builder"
import type { AffectedItem } from "@akasha/temper-items-rules-core/inventory-rule-matcher-types"
import { LayoutList, List, MapPin } from "lucide-react"
import { useMemo, useState } from "react"
import {
  type ValueExplanationData,
  ValueExplanationDialog,
} from "../value-explanation-dialog/value-explanation-dialog.module.code.tsx"

interface AggregateResult {
  stackCount: number
  totalValue: number | undefined
}

function aggregate(node: InventoryNode): AggregateResult {
  if (!("children" in node)) {
    return {
      stackCount: node.stackCount,
      totalValue:
        node.totalValue ?? (node.value !== undefined ? node.value * node.stackCount : undefined),
    }
  }
  let stackCount = 0
  let totalValue: number | undefined
  let hasValue = false
  for (const child of node.children) {
    const result = aggregate(child)
    stackCount += result.stackCount
    if (result.totalValue !== undefined) {
      hasValue = true
      totalValue = (totalValue ?? 0) + result.totalValue
    }
  }
  return {
    stackCount,
    totalValue: hasValue ? totalValue : undefined,
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

const MAX_VISIBLE_LINES = 10

function computeSmartTreeExpanded(nodes: readonly InventoryNode[]): readonly string[] {
  let budget = MAX_VISIBLE_LINES - nodes.length
  if (budget <= 0) return []

  const expanded: string[] = []
  const queue: { node: InventoryNode; parentPath: string }[] = nodes.map((n) => ({
    node: n,
    parentPath: "",
  }))

  while (queue.length > 0) {
    const head = queue.shift()
    if (head === undefined) break
    const { node, parentPath } = head
    if (!("children" in node)) continue

    const path = buildNodePath(parentPath, node.key)
    expanded.push(path)
    budget -= node.children.length
    if (budget < 0) break
    for (const child of node.children) {
      queue.push({ node: child, parentPath: path })
    }
  }

  return expanded
}

interface CollapsedItem {
  itemId: number
  itemName: string
  quality: number
  stackCount: number
  totalValue: number | undefined
}

type ViewMode = "flat" | "type" | "location"

function isViewMode(v: string): v is ViewMode {
  return v === "flat" || v === "type" || v === "location"
}

interface AffectedItemsViewsProps {
  items: readonly AffectedItem[]
  defaultView?: ViewMode
  showFlatTab?: boolean
  header?: React.ReactNode
  className?: string
}

export function AffectedItemsViews({
  items,
  defaultView = "flat",
  showFlatTab = true,
  header,
  className,
}: AffectedItemsViewsProps) {
  const surface = useSurface()
  const [viewMode, setViewMode] = useState<ViewMode>(defaultView)
  const [valueDialogData, setValueDialogData] = useState<ValueExplanationData | null>(null)
  const [valueDialogOpen, setValueDialogOpen] = useState(false)
  const typeNodes = useMemo(() => buildAffectedItemNodes(items), [items])
  const locationNodes = useMemo(() => buildAffectedItemLocationNodes(items), [items])
  const smartTypeExpanded = useMemo(() => computeSmartTreeExpanded(typeNodes), [typeNodes])
  const smartLocationExpanded = useMemo(
    () => computeSmartTreeExpanded(locationNodes),
    [locationNodes]
  )
  const { items: typeExpanded, toggle: typeToggle } = useSetToggle(smartTypeExpanded)
  const { items: locationExpanded, toggle: locationToggle } = useSetToggle(smartLocationExpanded)
  const showValues = hasAnyValue(typeNodes)

  const flatItems = useMemo(() => {
    const collapsed = new Map<string, CollapsedItem>()
    for (const entry of items) {
      const { item } = entry
      const key = `${item.itemId}-${item.quality}`
      const existing = collapsed.get(key)
      const entryValue =
        item.estimatedValue !== undefined ? item.estimatedValue * item.stackCount : undefined
      if (existing) {
        existing.stackCount += item.stackCount
        if (entryValue !== undefined) {
          existing.totalValue = (existing.totalValue ?? 0) + entryValue
        }
      } else {
        collapsed.set(key, {
          itemId: item.itemId,
          itemName: item.itemName,
          quality: item.quality,
          stackCount: item.stackCount,
          totalValue: entryValue,
        })
      }
    }
    return [...collapsed.values()].sort((a, b) => a.itemName.localeCompare(b.itemName))
  }, [items])

  function RenderNode(
    node: InventoryNode,
    depth: number,
    parentPath: string,
    expanded: ReadonlySet<string>,
    toggle: (path: string) => void
  ) {
    const path = buildNodePath(parentPath, node.key)

    if ("children" in node) {
      const agg = aggregate(node)
      const isExpanded = expanded.has(path)
      return (
        <div key={node.key}>
          <ItemRow
            label={node.label}
            quantity={agg.stackCount}
            value={
              showValues && agg.totalValue !== undefined ? formatGold(agg.totalValue) : undefined
            }
            depth={depth}
            actionButtonCount={1}
            expanded={isExpanded}
            onToggle={() => toggle(path)}
          />
          {isExpanded &&
            node.children.map((child) => RenderNode(child, depth + 1, path, expanded, toggle))}
        </div>
      )
    }

    const leafLabel =
      node.quality !== undefined && ESO_QUALITY_TEXT_CLASSES[node.quality] != null ? (
        <span className={ESO_QUALITY_TEXT_CLASSES[node.quality]}>{node.label}</span>
      ) : (
        node.label
      )

    const leafTotalValue =
      node.totalValue ?? (node.value !== undefined ? node.value * node.stackCount : undefined)
    const hasLeafValue = showValues && leafTotalValue !== undefined
    const hasValueBreakdown =
      node.replacementValue !== undefined ||
      node.merchantValue !== undefined ||
      node.saleAvg !== undefined

    return (
      <div key={node.key}>
        <ItemRow
          label={leafLabel}
          quantity={node.stackCount > 1 ? node.stackCount : undefined}
          value={hasLeafValue ? formatGold(leafTotalValue) : undefined}
          onValueClick={
            hasLeafValue && hasValueBreakdown
              ? () => {
                  setValueDialogData(leafToValueData(node))
                  setValueDialogOpen(true)
                }
              : undefined
          }
          depth={depth}
          actionButtonCount={1}
        />
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <Text variant="hint" className="py-4 text-center">
        No items to show.
      </Text>
    )
  }

  return (
    <>
      <Tabs
        value={viewMode}
        onValueChange={(v) => {
          if (isViewMode(v)) setViewMode(v)
        }}
        className={cn("min-h-0 flex-1 gap-4", className)}
      >
        <TabsList className={`w-full ${surfaceClass(surface + 1)}`}>
          {showFlatTab && (
            <TabsTrigger value="flat">
              <List className="size-3.5" />
              List
            </TabsTrigger>
          )}
          <TabsTrigger value="type">
            <LayoutList className="size-3.5" />
            By Type
          </TabsTrigger>
          <TabsTrigger value="location">
            <MapPin className="size-3.5" />
            By Location
          </TabsTrigger>
        </TabsList>
        <TabsContent value="flat" className="min-h-0">
          <ScrollArea className="h-full">
            <div className="flex flex-col">
              {header}
              {flatItems.map((collapsed) => {
                const label =
                  ESO_QUALITY_TEXT_CLASSES[collapsed.quality] != null ? (
                    <span className={ESO_QUALITY_TEXT_CLASSES[collapsed.quality]}>
                      {collapsed.itemName}
                    </span>
                  ) : (
                    collapsed.itemName
                  )
                return (
                  <ItemRow
                    key={`${collapsed.itemId}-${collapsed.quality}`}
                    label={label}
                    quantity={collapsed.stackCount > 1 ? collapsed.stackCount : undefined}
                    value={
                      showValues && collapsed.totalValue !== undefined
                        ? formatGold(collapsed.totalValue)
                        : undefined
                    }
                  />
                )
              })}
            </div>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="type" className="min-h-0">
          <ScrollArea className="h-full">
            <div className="flex flex-col gap-1.5">
              {header}
              {typeNodes.map((node) => RenderNode(node, 0, "", typeExpanded, typeToggle))}
            </div>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="location" className="min-h-0">
          <ScrollArea className="h-full">
            <div className="flex flex-col gap-1.5">
              {header}
              {locationNodes.map((node) =>
                RenderNode(node, 0, "", locationExpanded, locationToggle)
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
      <ValueExplanationDialog
        open={valueDialogOpen}
        onOpenChange={setValueDialogOpen}
        data={valueDialogData}
      />
    </>
  )
}
