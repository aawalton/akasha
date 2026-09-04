import {
  convertArithmeticToDisplay,
  type DisplayResult,
} from "@akasha/temper-formula-framework/display-formula-convert"
import type {
  DisplayFormulaNode,
  NumberFormat,
} from "@akasha/temper-formula-framework/display-formula-node"
import type { EffectSource } from "@akasha/temper-formula-framework/effect-source"
import type { MetricId } from "@akasha/temper-formula-framework/metric-id"
import { formatDecimal } from "@akasha/temper-formula-framework/number-format"
import { convertRatingToChance } from "@akasha/temper-formula-framework/rating-chance"
import { sourceCategories } from "@akasha/temper-formula-framework/source-category"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import { requireFirst } from "@akasha/utils-narrow/require-first"
import {
  getAttributeEffects,
  getConditionalChanceEffects,
  getIndividualIntegerEffects,
  getIndividualPercentageEffects,
  getIntegerEffects,
  getNumberPerSecondsEffects,
  getPercentageEffects,
} from "../extractors/extractors.module.code.ts"
import type { FormulaNode } from "../formula-types/formula-types.module.code.ts"
import { getAggregateMetricIds } from "../metric-tree-queries/metric-tree-queries.module.code.ts"
import type { MetricValue } from "../metric-value/metric-value.module.code.ts"
import { getMetricDisplayName, hasFormula, metrics } from "../metrics/metrics.module.code.ts"

function effectTypeToFormat(effectType: string): NumberFormat {
  switch (effectType) {
    case "fractional-change":
      return "percent"
    case "integer":
      return "integer"
    default:
      return "decimal"
  }
}

function convertPlayerLeaf(
  metric: MetricValue,
  node: FormulaNode,
  sources: readonly EffectSource[],
  metricValues: Map<MetricId, number>
): DisplayResult {
  switch (node.type) {
    case "metric-refs": {
      if (node.metricIds.length === 0) {
        return { node: { type: "constant", value: 0, format: "integer" }, value: 0 }
      }

      const results: DisplayResult[] = []

      for (const metricIdStr of node.metricIds) {
        if (!metrics.has(metricIdStr)) {
          results.push({
            node: { type: "variable", label: metricIdStr },
            value: 0,
          })
          continue
        }

        const metricId = metricIdStr
        const rawValue = metricValues.get(metricId)
        const name = getMetricDisplayName(metricId)

        if (rawValue === undefined) {
          results.push({
            node: { type: "variable", label: name },
            value: 0,
          })
          continue
        }

        if (node.convertRatingToChance) {
          const referencedMetric = metrics.data[metricId]
          if (referencedMetric.valueType === "rating" && "divisor" in referencedMetric) {
            const chanceValue = convertRatingToChance(
              rawValue,
              referencedMetric.divisor,
              referencedMetric.cap
            )
            results.push({
              node: {
                type: "labeled-value",
                value: chanceValue,
                label: name,
                format: "percent",
              },
              value: chanceValue,
            })
            continue
          }
        }

        const referencedMetric = metrics.data[metricId]
        const format: NumberFormat =
          referencedMetric.valueType === "fractional-change" ? "percent" : "integer"
        results.push({
          node: {
            type: "labeled-value",
            value: rawValue,
            label: name,
            format,
          },
          value: rawValue,
        })
      }

      const nonZero = results.filter((r) => r.value !== 0)

      if (nonZero.length === 0) {
        return { node: { type: "constant", value: 0, format: "integer" }, value: 0 }
      }

      if (nonZero.length === 1) {
        return requireFirst(nonZero)
      }

      const total = results.reduce((sum, r) => sum + r.value, 0)
      return {
        node: { type: "add", operands: nonZero.map((r) => r.node) },
        value: total,
      }
    }

    case "sum":
    case "sum-for-metric": {
      const metricIds =
        node.type === "sum"
          ? getAggregateMetricIds(metric.id)
          : getAggregateMetricIds(node.metricId)

      const contributions: DisplayResult[] = []
      const categories = node.categories ?? sourceCategories.ids
      const format = effectTypeToFormat(node.effectType)

      for (const categoryId of categories) {
        let categoryTotal = 0

        switch (node.effectType) {
          case "integer":
            if (categoryId === "attributes") {
              categoryTotal = getAttributeEffects(metricIds, sources)
            } else {
              categoryTotal = getIntegerEffects(categoryId, metricIds, sources)
            }
            break
          case "fractional-change":
            categoryTotal = getPercentageEffects(categoryId, metricIds, sources)
            break
          case "number-per-seconds":
            categoryTotal = getNumberPerSecondsEffects(categoryId, metricIds, sources)
            break
          case "conditional-chance":
            categoryTotal = getConditionalChanceEffects(categoryId, metricIds, sources)
            break
          case "number":
          case "number-for-seconds":
          case "fraction-change-for-seconds":
            break
          default:
            assertNever(node.effectType)
        }

        if (categoryTotal !== 0) {
          const label = sourceCategories.data[categoryId].name
          contributions.push({
            node: {
              type: "labeled-value",
              value: categoryTotal,
              label,
              format,
            },
            value: categoryTotal,
          })
        }
      }

      const total = contributions.reduce((sum, c) => sum + c.value, 0)

      if (contributions.length === 0) {
        return { node: { type: "constant", value: 0, format: "integer" }, value: 0 }
      }

      if (contributions.length === 1) {
        return requireFirst(contributions)
      }

      return {
        node: { type: "add", operands: contributions.map((c) => c.node) },
        value: total,
      }
    }

    case "product": {
      const metricIds = getAggregateMetricIds(metric.id)
      const effectValues: number[] = []
      const categories = node.categories ?? sourceCategories.ids
      const format = effectTypeToFormat(node.effectType)

      for (const categoryId of categories) {
        switch (node.effectType) {
          case "integer":
            effectValues.push(...getIndividualIntegerEffects(categoryId, metricIds, sources))
            break
          case "fractional-change":
            effectValues.push(...getIndividualPercentageEffects(categoryId, metricIds, sources))
            break
          case "number":
          case "number-per-seconds":
          case "number-for-seconds":
          case "fraction-change-for-seconds":
          case "conditional-chance":
            break
          default:
            assertNever(node.effectType)
        }
      }

      if (effectValues.length === 0) {
        return { node: { type: "constant", value: 1 }, value: 1 }
      }

      const product = effectValues.reduce((p, v) => p * (1 + v), 1)

      const terms: DisplayFormulaNode[] = effectValues.map((v) => ({
        type: "group" as const,
        operand: {
          type: "add" as const,
          operands: [
            { type: "constant", value: 1 } satisfies DisplayFormulaNode,
            { type: "constant", value: v, format } satisfies DisplayFormulaNode,
          ],
        },
      }))

      if (terms.length === 1) {
        return { node: requireFirst(terms), value: product }
      }

      return {
        node: { type: "multiply", operands: terms },
        value: product,
      }
    }

    case "floor-product": {
      const baseResult = formulaNodeToDisplay(metric, node.operand, sources, metricValues)
      const metricIds = getAggregateMetricIds(metric.id)
      const effectValues: number[] = []
      const categories = node.categories ?? sourceCategories.ids
      const format = effectTypeToFormat(node.effectType)

      for (const categoryId of categories) {
        switch (node.effectType) {
          case "integer":
            effectValues.push(...getIndividualIntegerEffects(categoryId, metricIds, sources))
            break
          case "fractional-change":
            effectValues.push(...getIndividualPercentageEffects(categoryId, metricIds, sources))
            break
          case "number":
          case "number-per-seconds":
          case "number-for-seconds":
          case "fraction-change-for-seconds":
          case "conditional-chance":
            break
          default:
            assertNever(node.effectType)
        }
      }

      if (effectValues.length === 0) {
        return baseResult
      }

      let value = baseResult.value
      let current: DisplayFormulaNode = baseResult.node

      for (const v of effectValues) {
        value = Math.floor(value * (1 + v))
        const term: DisplayFormulaNode = {
          type: "group",
          operand: {
            type: "add",
            operands: [
              { type: "constant", value: 1 },
              { type: "constant", value: v, format },
            ],
          },
        }
        current = {
          type: "floor",
          operand: {
            type: "multiply",
            operands: [current, term],
          },
        }
      }

      return { node: current, value }
    }

    case "floor-multiply": {
      if (node.operands.length === 0) {
        return { node: { type: "constant", value: 1 }, value: 1 }
      }

      const results = node.operands.map((op) =>
        formulaNodeToDisplay(metric, op, sources, metricValues)
      )

      if (results.length === 1) {
        return requireFirst(results)
      }

      const head = requireFirst(results)
      let value = head.value
      let current: DisplayFormulaNode = head.node

      for (const next of results.slice(1)) {
        value = Math.floor(value * next.value)
        current = {
          type: "floor",
          operand: {
            type: "multiply",
            operands: [current, next.node],
          },
        }
      }

      return { node: current, value }
    }

    case "constant":
    case "add":
    case "multiply":
    case "divide":
    case "floor":
    case "max":
    case "min":
      throw new Error(`Arithmetic node "${node.type}" reached player leaf callback`)
    default:
      assertNever(node)
  }
}

function formulaNodeToDisplay(
  metric: MetricValue,
  node: FormulaNode,
  sources: readonly EffectSource[],
  metricValues: Map<MetricId, number>
): DisplayResult {
  return convertArithmeticToDisplay(node, (leafNode) =>
    convertPlayerLeaf(metric, leafNode, sources, metricValues)
  )
}

function buildResultNode(metricValue: MetricValue): DisplayFormulaNode {
  switch (metricValue.valueType) {
    case "fractional-change":
      return { type: "constant", value: metricValue.value, format: "percent" }
    case "rating": {
      const uncapped = metricValue.value / metricValue.divisor
      const capped = metricValue.cap !== undefined ? Math.min(metricValue.cap, uncapped) : uncapped
      return {
        type: "labeled-value",
        value: capped,
        label: `${formatDecimal(metricValue.value)} rating`,
        format: "percent",
      }
    }
    case "integer":
      return { type: "constant", value: metricValue.value, format: "integer" }

    case "number-per-second":
      return { type: "constant", value: metricValue.value, format: "integer" }

    default:
      assertNever(metricValue)
  }
}

export function metricToDisplayFormula(
  metricValue: MetricValue,
  sources: readonly EffectSource[],
  metricValues: Map<MetricId, number>
): DisplayFormulaNode | null {
  if (!hasFormula(metricValue)) {
    return null
  }

  const result = formulaNodeToDisplay(metricValue, metricValue.formula, sources, metricValues)
  const resultNode = buildResultNode(metricValue)

  return {
    type: "equals",
    left: result.node,
    right: resultNode,
  }
}
