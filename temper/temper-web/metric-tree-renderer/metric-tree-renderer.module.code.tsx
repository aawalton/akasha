import { StatRow } from "@akasha/design-patterns/stat-row"
import {
  isMetricNode,
  isSubcategoryNode,
  type MetricTreeNode,
} from "@akasha/temper-characters-stats/metric-tree-types"
import type { MetricValue } from "@akasha/temper-characters-stats/metric-value"
import { getMetricDisplayName } from "@akasha/temper-characters-stats/metrics"
import { formatStatValue } from "@akasha/temper-formula-framework/number-format"
import type { ReactElement } from "react"
import type { StatsRecord } from "../stats-types/stats-types.module.code.ts"

export function hasVisibleMetricRows(
  nodes: readonly MetricTreeNode[],
  stats: StatsRecord,
  showAdvancedMetrics: boolean | undefined
): boolean {
  function hasValuedMetric(node: MetricTreeNode): boolean {
    if (isMetricNode(node) && stats[node.id]) return true
    if (node.children && (isSubcategoryNode(node) || showAdvancedMetrics)) {
      return node.children.some(hasValuedMetric)
    }
    return false
  }
  return nodes.some(hasValuedMetric)
}

interface MetricTreeRendererProps {
  nodes: readonly MetricTreeNode[]
  stats: StatsRecord
  searchTerm?: string
  depth?: number
  onMetricClick: (metric: MetricValue) => void
  showAdvancedMetrics?: boolean
}

export function MetricTreeRenderer({
  nodes,
  stats,
  searchTerm,
  depth = 0,
  onMetricClick,
  showAdvancedMetrics,
}: MetricTreeRendererProps) {
  const lowerSearch = searchTerm?.trim().toLowerCase()

  function getNodeLabel(node: MetricTreeNode): string {
    return isSubcategoryNode(node) ? node.name : getMetricDisplayName(node.id)
  }

  function getNodeValue(node: MetricTreeNode): MetricValue | undefined {
    return isMetricNode(node) ? stats[node.id] : undefined
  }

  function getNodeOnClick(
    node: MetricTreeNode,
    value: MetricValue | undefined
  ): (() => void) | undefined {
    return value && isMetricNode(node) ? () => onMetricClick(value) : undefined
  }

  function getNodeUseAccentColor(node: MetricTreeNode): boolean {
    return isMetricNode(node) ? (node.useAccentColor ?? false) : false
  }

  function shouldRenderNode(node: MetricTreeNode): boolean {
    if (lowerSearch == null) {
      return true
    }

    const label = getNodeLabel(node)
    if (label.toLowerCase().includes(lowerSearch)) {
      return true
    }

    const value = getNodeValue(node)
    if (value) {
      return true
    }

    if (node.children) {
      return node.children.some((child) => shouldRenderNode(child))
    }

    return false
  }

  const renderedNodes: ReactElement[] = []

  for (const node of nodes) {
    if (!shouldRenderNode(node)) {
      continue
    }

    const label = getNodeLabel(node)
    const value = getNodeValue(node)
    const onClick = getNodeOnClick(node, value)
    const useAccentColor = getNodeUseAccentColor(node)

    const childrenElement =
      node.children && showAdvancedMetrics ? (
        <MetricTreeRenderer
          nodes={node.children}
          stats={stats}
          searchTerm={searchTerm}
          depth={depth + 1}
          onMetricClick={onMetricClick}
          showAdvancedMetrics={showAdvancedMetrics}
        />
      ) : null

    const shouldShowStatRow =
      (isSubcategoryNode(node) && childrenElement) || (isMetricNode(node) && value)

    if (shouldShowStatRow || childrenElement) {
      renderedNodes.push(
        <div key={node.id}>
          {shouldShowStatRow && (
            <StatRow
              label={label}
              value={value ? formatStatValue(value) : undefined}
              depth={depth}
              onClick={onClick}
              useAccentColor={useAccentColor}
            />
          )}
          {childrenElement}
        </div>
      )
    }
  }

  return <>{renderedNodes}</>
}
