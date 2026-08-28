"use client"

import { Badge } from "@shared/design-badges/components/badge"
import { PanelCard } from "@shared/design-layout/components/panel-card"
import { StatRow } from "@shared/design-patterns/components/stat-row"
import { useSetToggle } from "@shared/design-patterns/hooks/use-set-toggle"
import { buildNodePath } from "@shared/design-patterns/utils/path"
import { type SortDirection } from "@shared/design-patterns/utils/sort-types"
import {
  type ActivityCategoryId,
  activityCategories,
} from "@temper/player-completion/activity-category-data"
import { completionPercent } from "@temper/player-completion/completion-percent"
import { CheckIcon, MinusIcon } from "lucide-react"
import type { ReactNode } from "react"
import { useEffect, useRef, useState } from "react"
import { useCompletionActivityMode } from "./completion-activity-mode-context"
import { useCompletionSearch } from "./completion-search-context"

type NodeFilter = (node: CompletionNode) => boolean

export type CompletionSortMode = "status" | "percent" | "name"

interface CompletionBaseNode {
  key: string
  label: string
  activityCategories?: readonly ActivityCategoryId[]
}

interface CompletionBranchNode extends CompletionBaseNode {
  children: readonly CompletionNode[]
}

interface CompletionCountNode extends CompletionBaseNode {
  count: number
  total: number
}

interface CompletionValueNode extends CompletionBaseNode {
  value: ReactNode
}

export type CompletionNode = CompletionBranchNode | CompletionCountNode | CompletionValueNode

export type CompletionFilter = readonly ("not-started" | "in-progress" | "done")[]

interface CompletionPanelCardProps {
  id?: string
  title: ReactNode
  items: readonly CompletionNode[]
  totalChildren?: readonly CompletionNode[]
  filterNode?: NodeFilter
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
  onItemClick?: (key: string) => void
  collapseProtected?: boolean
  subdued?: boolean
}

export function withActivityCategories(
  nodes: readonly CompletionNode[],
  categories: ActivityCategoryId | readonly ActivityCategoryId[]
): readonly CompletionNode[] {
  const cats = Array.isArray(categories) ? categories : [categories]
  return nodes.map((node) => {
    if ("children" in node) {
      return {
        ...node,
        activityCategories: cats,
        children: withActivityCategories(node.children, cats),
      }
    }
    return { ...node, activityCategories: cats }
  })
}

function matchesFilter(count: number, total: number, filter: CompletionFilter): boolean {
  if (total === 0) return false
  if (filter.length === 0) return true
  return filter.some((f) => {
    if (f === "done") return count === total
    if (f === "not-started") return count === 0
    return count > 0 && count < total
  })
}

export function createNodeFilter(
  completionFilter: CompletionFilter,
  activityFilter: readonly ActivityCategoryId[] | undefined
): NodeFilter | undefined {
  if (completionFilter.length === 0 && (!activityFilter || activityFilter.length === 0))
    return undefined

  return (node) => {
    if ("count" in node) {
      if (completionFilter.length > 0 && !matchesFilter(node.count, node.total, completionFilter))
        return false
      if (activityFilter && activityFilter.length > 0) {
        const cats = node.activityCategories
        if (cats !== undefined && cats.length > 0 && !cats.some((c) => activityFilter.includes(c)))
          return false
      }
      return true
    }
    if ("value" in node) {
      if (activityFilter && activityFilter.length > 0) {
        const cats = node.activityCategories
        if (cats !== undefined && cats.length > 0 && !cats.some((c) => activityFilter.includes(c)))
          return false
      }
      return true
    }
    if (activityFilter && activityFilter.length > 0) {
      const cats = node.activityCategories
      if (cats !== undefined && cats.length > 0 && !cats.some((c) => activityFilter.includes(c)))
        return false
    }
    return true
  }
}

function isNodeVisible(node: CompletionNode, filterNode?: NodeFilter): boolean {
  if ("count" in node) {
    if (node.total === 0) return false
    if (!filterNode) return true
    return filterNode(node)
  }
  if ("value" in node) {
    if (!filterNode) return true
    return filterNode(node)
  }
  if (node.children.some((c) => isNodeVisible(c, filterNode))) return true
  const gatePass = !filterNode || filterNode(node)
  if (
    gatePass &&
    filterNode &&
    node.activityCategories !== undefined &&
    node.activityCategories.length > 0
  ) {
    const agg = aggregate(node)
    if (agg !== null) {
      return filterNode({ key: node.key, label: node.label, count: agg.count, total: agg.total })
    }
  }
  return false
}

function isSearchRelevant(node: CompletionNode, search: string): boolean {
  if (node.label.toLowerCase().includes(search)) return true
  if ("children" in node) {
    return node.children.some((child) => isSearchRelevant(child, search))
  }
  return false
}

function collectSearchMatchPaths(
  nodes: readonly CompletionNode[],
  search: string,
  parentPath: string,
  filterNode?: NodeFilter
): readonly string[] {
  const paths: string[] = []
  for (const node of nodes) {
    if (!isNodeVisible(node, filterNode)) continue
    if (!("children" in node) || node.children.length === 0) continue
    const path = buildNodePath(parentPath, node.key)
    if (!isSearchRelevant(node, search)) continue
    if (aggregate(node) !== null) paths.push(path)
    paths.push(...collectSearchMatchPaths(node.children, search, path, filterNode))
  }
  return paths
}

function aggregate(node: CompletionNode): { count: number; total: number } | null {
  if ("count" in node) return { count: node.count, total: node.total }
  if ("value" in node) return null
  let count = 0
  let total = 0
  let hasAny = false
  for (const child of node.children) {
    const result = aggregate(child)
    if (result) {
      count += result.count
      total += result.total
      hasAny = true
    }
  }
  return hasAny ? { count, total } : null
}

function nodePercent(node: CompletionNode): number | null {
  if ("count" in node) return node.total > 0 ? node.count / node.total : 0
  if ("value" in node) return null
  const agg = aggregate(node)
  return agg && agg.total > 0 ? agg.count / agg.total : agg ? 0 : null
}

function nodeStatusOrder(node: CompletionNode): number {
  const pct = nodePercent(node)
  if (pct === null) return 3
  if (pct === 0) return 0
  if (pct >= 1) return 2
  return 1
}

function sortChildren(
  children: readonly CompletionNode[],
  sortMode: CompletionSortMode,
  sortDirection: SortDirection
): readonly CompletionNode[] {
  const dir = sortDirection === "desc" ? -1 : 1
  return [...children].sort((a, b) => {
    if (sortMode === "status") {
      const diff = nodeStatusOrder(a) - nodeStatusOrder(b)
      if (diff !== 0) return diff * dir
      return a.label.localeCompare(b.label)
    }
    if (sortMode === "percent") {
      const ap = nodePercent(a)
      const bp = nodePercent(b)
      if (ap !== null && bp !== null && ap !== bp) return (ap - bp) * dir
      if (ap !== null && bp === null) return -1
      if (ap === null && bp !== null) return 1
      return a.label.localeCompare(b.label)
    }
    return a.label.localeCompare(b.label) * dir
  })
}

function allNodesUnary(nodes: readonly CompletionNode[], filterNode?: NodeFilter): boolean {
  for (const node of nodes) {
    if (!isNodeVisible(node, filterNode)) continue
    if ("value" in node) continue
    if ("count" in node) {
      if (node.total !== 1) return false
    } else {
      const agg = aggregate(node)
      if (!agg || agg.total !== 1) return false
    }
  }
  return true
}

function renderCountValue(
  count: number,
  total: number,
  useAccentColor = false,
  useIcons = false
): ReactNode {
  if (useIcons && count === total && total === 1)
    return <CheckIcon className="size-4 text-tertiary" />
  if (useIcons && count === 0 && total === 1) return <MinusIcon className="size-4 text-primary" />
  const percent = completionPercent(count, total)
  return (
    <>
      <span className={useAccentColor ? undefined : "text-tertiary"}>
        ({count}/{total})
      </span>
      <span className="inline-block w-[6ch] text-right tabular-nums">{percent}%</span>
    </>
  )
}

export function CompletionPanelCard({
  id,
  title,
  items,
  totalChildren,
  filterNode,
  sortMode,
  sortDirection,
  onItemClick,
  collapseProtected,
  subdued,
}: CompletionPanelCardProps) {
  const resolvedSortMode = sortMode ?? "status"
  const resolvedSortDirection = sortDirection ?? "asc"
  const {
    items: expandedPaths,
    toggle,
    setAll: setExpandedPaths,
    clear: clearExpanded,
  } = useSetToggle()
  const [cardOpen, setCardOpen] = useState<boolean | undefined>(undefined)
  const debugMode = useCompletionActivityMode()
  const search = useCompletionSearch()
  const searchTerm = search.length >= 3 ? search.toLowerCase() : ""
  const prevSearchRef = useRef("")

  useEffect(() => {
    if (searchTerm === prevSearchRef.current) return
    prevSearchRef.current = searchTerm
    if (searchTerm.length > 0) {
      const paths = collectSearchMatchPaths(items, searchTerm, "", filterNode)
      setExpandedPaths(paths)
      setCardOpen(true)
    } else {
      clearExpanded()
      setCardOpen(undefined)
    }
  }, [searchTerm, items, filterNode])

  const hasVisibleItems = items.some((item) => {
    if (!isNodeVisible(item, filterNode)) return false
    if (searchTerm.length > 0 && !isSearchRelevant(item, searchTerm)) return false
    return true
  })
  if (!hasVisibleItems) return null

  function resolveValue(
    node: CompletionNode,
    useIcons: boolean,
    useAccentColor = false
  ): ReactNode {
    if ("count" in node) return renderCountValue(node.count, node.total, useAccentColor, useIcons)
    if ("value" in node) return node.value
    const agg = aggregate(node)
    return agg ? renderCountValue(agg.count, agg.total, useAccentColor) : undefined
  }

  function isNodeComplete(node: CompletionNode): boolean {
    if ("count" in node) return node.total > 0 && node.count === node.total
    if ("value" in node) return false
    const agg = aggregate(node)
    return agg !== null && agg.total > 0 && agg.count === agg.total
  }

  function renderNode(
    node: CompletionNode,
    depth: number,
    parentPath: string,
    useIcons: boolean,
    useAccentColor = false,
    insideSearchMatch = false
  ) {
    if (!isNodeVisible(node, filterNode)) return null
    if (searchTerm.length > 0 && !insideSearchMatch && !isSearchRelevant(node, searchTerm))
      return null
    const labelMatches = searchTerm.length > 0 && node.label.toLowerCase().includes(searchTerm)
    const childInsideMatch = insideSearchMatch || labelMatches
    const path = buildNodePath(parentPath, node.key)
    const hasChildren = "children" in node && node.children.length > 0
    const value = resolveValue(node, useIcons, useAccentColor)
    const alwaysExpanded = hasChildren && value === undefined
    const isExpanded = alwaysExpanded || expandedPaths.has(path)
    const childUseIcons = "children" in node ? allNodesUnary(node.children, filterNode) : false

    const debugLabel =
      debugMode && node.activityCategories && node.activityCategories.length > 0 ? (
        <span className="flex flex-wrap items-center gap-1.5">
          <span>{node.label}</span>
          {node.activityCategories.map((cat) => (
            <Badge
              key={cat}
              variant={activityCategories.data[cat].badgeVariant}
              className="text-[10px]"
            >
              {activityCategories.data[cat].name}
            </Badge>
          ))}
        </span>
      ) : (
        node.label
      )

    return (
      <div key={node.key}>
        <StatRow
          label={debugLabel}
          value={value}
          depth={depth}
          useAccentColor={useAccentColor}
          subdued={subdued && !useAccentColor}
          muted={isNodeComplete(node)}
          emphasized={useIcons && !isNodeComplete(node)}
          onClick={
            hasChildren && !alwaysExpanded
              ? () => toggle(path)
              : !hasChildren && onItemClick
                ? () => onItemClick(node.key)
                : undefined
          }
        />
        {isExpanded &&
          "children" in node &&
          sortChildren(node.children, resolvedSortMode, resolvedSortDirection).map((child) =>
            renderNode(child, depth + 1, path, childUseIcons, false, childInsideMatch)
          )}
      </div>
    )
  }

  const isSingleCategory = items.length === 1

  let totalCount = 0
  let totalTotal = 0
  let hasTotalAgg = false
  for (const item of items) {
    const agg = aggregate(item)
    if (agg) {
      totalCount += agg.count
      totalTotal += agg.total
      hasTotalAgg = true
    }
  }
  const totalValue = hasTotalAgg ? renderCountValue(totalCount, totalTotal, true) : undefined

  const topLevelUseIcons = allNodesUnary(items, filterNode)

  return (
    <PanelCard
      id={id ?? (typeof title === "string" ? title : "completion")}
      title={title}
      collapsible
      collapseProtected={collapseProtected}
      open={cardOpen}
      onOpenChange={setCardOpen}
    >
      <div className="flex flex-col gap-1.5">
        {!isSingleCategory && (
          <>
            <StatRow
              label="Total"
              value={totalValue}
              useAccentColor
              onClick={
                totalChildren && totalChildren.length > 0
                  ? () => toggle("__total__")
                  : () => onItemClick?.("total")
              }
            />
            {totalChildren &&
              totalChildren.length > 0 &&
              expandedPaths.has("__total__") &&
              totalChildren.map((child) =>
                renderNode(child, 1, "__total__", allNodesUnary(totalChildren))
              )}
          </>
        )}
        {sortChildren(items, resolvedSortMode, resolvedSortDirection).map((item) =>
          renderNode(item, 0, "", topLevelUseIcons, isSingleCategory)
        )}
      </div>
    </PanelCard>
  )
}
