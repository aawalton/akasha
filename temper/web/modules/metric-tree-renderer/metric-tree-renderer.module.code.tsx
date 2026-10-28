import { StatRow } from "akasha/design/interface/pattern/modules/stat-row/stat-row.module.code.tsx"
import { formatStatValue } from "akasha/temper/player/character/formula-framework/modules/number-format/number-format.module.code.ts"
import {
  isMetricNode,
  isStatusEffectNode,
  isSubcategoryNode,
  type MetricTreeNode,
} from "akasha/temper/player/character/stat/modules/metric-tree-types/metric-tree-types.module.code.ts"
import type { MetricValue } from "akasha/temper/player/character/stat/modules/metric-value/metric-value.module.code.ts"
import { getMetricDisplayName } from "akasha/temper/player/character/stat/modules/metrics/metrics.module.code.ts"
import type { StatsRecord } from "akasha/temper/web/modules/stats-types/stats-types.module.code.ts"
import type { ReactElement } from "react"

type StatusDamage = Readonly<Record<string, number>>

export function hasVisibleMetricRows(
  nodes: readonly MetricTreeNode[],
  stats: StatsRecord,
  statusDamage: StatusDamage,
  showAdvancedMetrics: boolean | undefined
): boolean {
  function hasValuedMetric(node: MetricTreeNode): boolean {
    if (isMetricNode(node) && stats[node.id]) return true
    if (isStatusEffectNode(node) && statusDamage[node.id]) return true
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
  statusDamage: StatusDamage
  searchTerm?: string
  depth?: number
  onMetricClick: (metric: MetricValue) => void
  showAdvancedMetrics?: boolean
}

export function MetricTreeRenderer({
  nodes,
  stats,
  statusDamage,
  searchTerm,
  depth = 0,
  onMetricClick,
  showAdvancedMetrics,
}: MetricTreeRendererProps) {
  const lowerSearch = searchTerm?.trim().toLowerCase()

  function getNodeLabel(node: MetricTreeNode): string {
    return isMetricNode(node) ? getMetricDisplayName(node.id) : node.name
  }

  function getNodeValue(node: MetricTreeNode): MetricValue | undefined {
    return isMetricNode(node) ? stats[node.id] : undefined
  }

  function getNodeShown(node: MetricTreeNode, value: MetricValue | undefined): string | undefined {
    if (value) return formatStatValue(value)
    const dealt = isStatusEffectNode(node) ? statusDamage[node.id] : undefined
    return dealt ? formatStatValue({ value: dealt, valueType: "integer" }) : undefined
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

    if (getNodeShown(node, getNodeValue(node))) {
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
    const shown = getNodeShown(node, value)
    const onClick = getNodeOnClick(node, value)
    const useAccentColor = getNodeUseAccentColor(node)

    const childrenElement =
      node.children && showAdvancedMetrics ? (
        <MetricTreeRenderer
          nodes={node.children}
          stats={stats}
          statusDamage={statusDamage}
          searchTerm={searchTerm}
          depth={depth + 1}
          onMetricClick={onMetricClick}
          showAdvancedMetrics={showAdvancedMetrics}
        />
      ) : null

    const shouldShowStatRow = (isSubcategoryNode(node) && childrenElement) || shown

    if (shouldShowStatRow || childrenElement) {
      renderedNodes.push(
        <div key={node.id}>
          {shouldShowStatRow && (
            <StatRow
              label={label}
              value={shown}
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
