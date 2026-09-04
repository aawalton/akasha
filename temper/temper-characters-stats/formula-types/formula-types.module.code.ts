import type {
  AddNode,
  ConstantNode,
  DivideNode,
  FloorNode,
  MaxNode,
  MinNode,
  MultiplyNode,
} from "@akasha/temper-formula-framework/arithmetic-node"
import type { MetricId } from "@akasha/temper-formula-framework/metric-id"
import type { SourceCategoryId } from "@akasha/temper-formula-framework/source-category"

type MetricEffectType =
  | "integer"
  | "fractional-change"
  | "number"
  | "number-per-seconds"
  | "number-for-seconds"
  | "fraction-change-for-seconds"
  | "conditional-chance"

type AggregateNode = {
  type: "sum"
  categories?: readonly SourceCategoryId[]
  effectType: MetricEffectType
}

type CrossMetricAggregateNode = {
  type: "sum-for-metric"
  metricId: MetricId
  categories?: readonly SourceCategoryId[]
  effectType: MetricEffectType
}

type MetricReferenceNode = {
  type: "metric-refs"
  metricIds: readonly MetricId[]
  convertRatingToChance?: boolean
}

type ProductNode = {
  type: "product"
  categories?: readonly SourceCategoryId[]
  effectType: MetricEffectType
}

type FloorProductNode = {
  type: "floor-product"
  operand: FormulaNode
  categories?: readonly SourceCategoryId[]
  effectType: MetricEffectType
}

type FloorMultiplyNode = {
  type: "floor-multiply"
  operands: readonly FormulaNode[]
}

export type FormulaNode =
  | ConstantNode
  | AddNode<FormulaNode>
  | MultiplyNode<FormulaNode>
  | DivideNode<FormulaNode>
  | FloorNode<FormulaNode>
  | MaxNode<FormulaNode>
  | MinNode<FormulaNode>
  | AggregateNode
  | CrossMetricAggregateNode
  | MetricReferenceNode
  | ProductNode
  | FloorProductNode
  | FloorMultiplyNode
