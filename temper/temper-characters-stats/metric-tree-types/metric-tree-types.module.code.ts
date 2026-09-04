import type { MetricId } from "@akasha/temper-formula-framework/metric-id"

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

export type MetricTreeNode = SubcategoryNode | MetricNode

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
