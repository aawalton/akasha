import type { MetricId } from "akasha/temper/player/character/formula-framework/modules/metric-id/metric-id.module.code.ts"

interface SubcategoryNode {
  type: "subcategory"
  id: string
  name: string
  children?: readonly MetricTreeNode[]
}

interface MetricNode {
  type: "metric"
  id: MetricId
  children?: readonly MetricTreeNode[]
  includeInChildAggregates?: boolean
  useAccentColor?: boolean
}

export interface StatusEffectNode {
  type: "status-effect"
  id: string
  name: string
  equations: readonly string[]
  children?: readonly MetricTreeNode[]
}

export type MetricTreeNode = SubcategoryNode | MetricNode | StatusEffectNode

export interface CategoryNode {
  id: string
  name: string
  children?: readonly MetricTreeNode[]
}

export interface MetricTree {
  [categoryId: string]: CategoryNode
}

export function isSubcategoryNode(node: MetricTreeNode): node is SubcategoryNode {
  return node.type === "subcategory"
}

export function isMetricNode(node: MetricTreeNode): node is MetricNode {
  return node.type === "metric"
}

export function isStatusEffectNode(node: MetricTreeNode): node is StatusEffectNode {
  return node.type === "status-effect"
}
