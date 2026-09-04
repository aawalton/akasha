import {
  convertArithmeticToDisplay,
  type DisplayResult,
} from "@akasha/temper-formula-framework/display-formula-convert"
import type {
  DisplayFormulaNode,
  NumberFormat,
} from "@akasha/temper-formula-framework/display-formula-node"
import { formatDecimal } from "@akasha/temper-formula-framework/number-format"
import { convertRatingToChance } from "@akasha/temper-formula-framework/rating-chance"
import { sourceCategories } from "@akasha/temper-formula-framework/source-category"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import type { CompanionBaseRoleId } from "../companion-base-roles/companion-base-roles.module.code.ts"
import type { CompanionEffectSource } from "../companion-effect-sources/companion-effect-sources.module.code.ts"
import type { CompanionMetricId } from "../companion-metric-ids/companion-metric-ids.module.code.ts"
import type { CompanionFormulaNode } from "../companion-metric-template/companion-metric-template.module.code.ts"
import {
  COMPANION_CATEGORIES,
  type CompanionMetricValue,
  companionMetrics,
  getCompanionMetricName,
} from "../companion-metrics/companion-metrics.module.code.ts"

function getContributionsByCategory(
  sources: readonly CompanionEffectSource[],
  metricId: CompanionMetricId,
  effectType: "fractional-change" | "integer"
): readonly DisplayResult[] {
  const format: NumberFormat = effectType === "fractional-change" ? "percent" : "integer"
  const contributions: DisplayResult[] = []

  for (const categoryId of COMPANION_CATEGORIES) {
    let categoryTotal = 0

    for (const source of sources) {
      if (source.categoryId !== categoryId) continue

      for (const effect of source.effects) {
        if (
          effect.metricId === metricId &&
          effect.effectType === effectType &&
          typeof effect.effectValue === "number"
        ) {
          categoryTotal += effect.effectValue
        }
      }
    }

    if (categoryTotal !== 0) {
      const category = sourceCategories.data[categoryId]
      contributions.push({
        node: {
          type: "labeled-value",
          value: categoryTotal,
          label: category.name,
          format,
        },
        value: categoryTotal,
      })
    }
  }

  return contributions
}

function convertCompanionLeaf(
  node: CompanionFormulaNode,
  sources: readonly CompanionEffectSource[],
  allMetricValues: Map<CompanionMetricId, number>,
  roles: readonly CompanionBaseRoleId[]
): DisplayResult {
  switch (node.type) {
    case "metric-ref": {
      const rawValue = allMetricValues.get(node.metricId) ?? 0
      const name = getCompanionMetricName(node.metricId)

      if (node.convertRatingToChance) {
        const referencedMetric = companionMetrics.data[node.metricId]
        if (referencedMetric.valueType === "rating" && referencedMetric.divisor !== undefined) {
          const chanceValue = convertRatingToChance(
            rawValue,
            referencedMetric.divisor,
            referencedMetric.cap
          )
          return {
            node: {
              type: "labeled-value",
              value: chanceValue,
              label: name,
              format: "percent",
            },
            value: chanceValue,
          }
        }
      }

      return {
        node: {
          type: "labeled-value",
          value: rawValue,
          label: name,
          format: "integer",
        },
        value: rawValue,
      }
    }

    case "sum": {
      const contributions = getContributionsByCategory(sources, node.metricId, node.effectType)
      const total = contributions.reduce((sum, c) => sum + c.value, 0)

      if (contributions.length === 0) {
        return { node: { type: "constant", value: 0, format: "integer" }, value: 0 }
      }

      const single = contributions[0]
      if (contributions.length === 1 && single !== undefined) {
        return single
      }

      return {
        node: { type: "add", operands: contributions.map((c) => c.node) },
        value: total,
      }
    }

    case "role-sum": {
      const results: DisplayResult[] = []
      let total = 0

      for (const operand of node.operands) {
        if (!roles.includes(operand.role)) continue
        const value = allMetricValues.get(operand.metricRef) ?? 0
        const name = getCompanionMetricName(operand.metricRef)

        if (operand.scale !== undefined) {
          const scaled = value * operand.scale
          if (scaled !== 0) {
            results.push({
              node: {
                type: "multiply",
                operands: [
                  { type: "labeled-value", value, label: name, format: "integer" },
                  { type: "constant", value: operand.scale },
                ],
              },
              value: scaled,
            })
            total += scaled
          }
        } else if (value !== 0) {
          results.push({
            node: { type: "labeled-value", value, label: name, format: "integer" },
            value,
          })
          total += value
        }
      }

      if (results.length === 0) {
        return { node: { type: "constant", value: 0, format: "integer" }, value: 0 }
      }

      const singleResult = results[0]
      if (results.length === 1 && singleResult !== undefined) {
        return singleResult
      }

      return {
        node: { type: "add", operands: results.map((r) => r.node) },
        value: total,
      }
    }

    case "product": {
      const contributions = getContributionsByCategory(sources, node.metricId, node.effectType)
      let product = 1
      const factors: DisplayFormulaNode[] = []

      for (const c of contributions) {
        product *= 1 + c.value
        factors.push({
          type: "add",
          operands: [{ type: "constant", value: 1 }, c.node],
        })
      }

      if (factors.length === 0) {
        return { node: { type: "constant", value: 1, format: "decimal" }, value: 1 }
      }

      const singleFactor = factors[0]
      if (factors.length === 1 && singleFactor !== undefined) {
        return { node: singleFactor, value: product }
      }

      return {
        node: { type: "multiply", operands: factors },
        value: product,
      }
    }

    case "constant":
    case "add":
    case "multiply":
    case "divide":
    case "floor":
    case "max":
    case "min":
      throw new Error(`Arithmetic node leaked to companion display leaf converter: ${node.type}`)

    default:
      return assertNever(node)
  }
}

function formulaNodeToDisplay(
  node: CompanionFormulaNode,
  sources: readonly CompanionEffectSource[],
  allMetricValues: Map<CompanionMetricId, number>,
  roles: readonly CompanionBaseRoleId[]
): DisplayResult {
  return convertArithmeticToDisplay(node, (leafNode) =>
    convertCompanionLeaf(leafNode, sources, allMetricValues, roles)
  )
}

function buildResultNode(metricValue: CompanionMetricValue): DisplayFormulaNode {
  switch (metricValue.valueType) {
    case "fractional-change":
      return { type: "constant", value: metricValue.value, format: "percent" }
    case "rating": {
      const divisor = metricValue.divisor ?? 1
      const uncapped = metricValue.value / divisor
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
    default:
      assertNever(metricValue)
  }
}

export function companionMetricToDisplayFormula(
  metricValue: CompanionMetricValue,
  sources: readonly CompanionEffectSource[],
  allStats: Partial<Record<CompanionMetricId, CompanionMetricValue>>,
  roles: readonly CompanionBaseRoleId[]
): DisplayFormulaNode {
  const allMetricValues = new Map<CompanionMetricId, number>()
  for (const mv of Object.values(allStats)) {
    if (mv) {
      allMetricValues.set(mv.id, mv.value)
    }
  }

  const resultNode = buildResultNode(metricValue)

  if (metricValue.formula) {
    const result = formulaNodeToDisplay(metricValue.formula, sources, allMetricValues, roles)
    return {
      type: "equals",
      left: result.node,
      right: resultNode,
    }
  }

  if (metricValue.effectType != null) {
    const contributions = getContributionsByCategory(
      sources,
      metricValue.id,
      metricValue.effectType
    )

    if (contributions.length === 0) {
      return {
        type: "equals",
        left: { type: "constant", value: 0, format: "integer" },
        right: resultNode,
      }
    }

    const firstContribution = contributions[0]
    const formulaNode: DisplayFormulaNode =
      contributions.length === 1 && firstContribution !== undefined
        ? firstContribution.node
        : { type: "add", operands: contributions.map((c) => c.node) }

    return {
      type: "equals",
      left: formulaNode,
      right: resultNode,
    }
  }

  return {
    type: "equals",
    left: { type: "variable", label: "Simulation Result" },
    right: resultNode,
  }
}
