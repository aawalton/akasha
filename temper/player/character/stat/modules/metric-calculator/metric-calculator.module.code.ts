import { indexBy } from "akasha/temper/player/character/build/build-support/modules/row-grouping/row-grouping.module.code.ts"
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import { buffOrDebuff } from "akasha/temper/player/character/formula-framework/modules/buff-or-debuff-source/buff-or-debuff-source.module.code.ts"
import type { EffectSource } from "akasha/temper/player/character/formula-framework/modules/effect-source/effect-source.module.code.ts"
import type { MetricId } from "akasha/temper/player/character/formula-framework/modules/metric-id/metric-id.module.code.ts"
import { topologicalSort } from "akasha/temper/player/character/formula-framework/modules/topological-sort/topological-sort.module.code.ts"
import { baseSource } from "akasha/temper/player/character/source/modules/base-source/base-source.module.code.ts"
import { foodOrDrink } from "akasha/temper/player/character/source/modules/food-or-drink-source/food-or-drink-source.module.code.ts"
import { mundus } from "akasha/temper/player/character/source/modules/mundus-source/mundus-source.module.code.ts"
import { calculateBuffs } from "akasha/temper/player/character/stat/modules/buff-or-debuff-calculator/buff-or-debuff-calculator.module.code.ts"
import { buildStateToEffectSources } from "akasha/temper/player/character/stat/modules/build-state-adapter/build-state-adapter.module.code.ts"
import type { FormulaNode } from "akasha/temper/player/character/stat/modules/formula-types/formula-types.module.code.ts"
import {
  evaluateFormula,
  roundMetricValue,
} from "akasha/temper/player/character/stat/modules/metric-formulas/metric-formulas.module.code.ts"
import type { MetricValue } from "akasha/temper/player/character/stat/modules/metric-value/metric-value.module.code.ts"
import {
  hasFormula,
  type MetricWithFormula,
  metrics,
  metricsWithFormulas,
} from "akasha/temper/player/character/stat/modules/metrics/metrics.module.code.ts"

interface CalculationResult {
  sources: readonly EffectSource[]
  metrics: Partial<Record<MetricId, MetricValue>>
}

function extractMetricReferences(node: FormulaNode): Set<MetricId> {
  const refs = new Set<MetricId>()

  if (node.type === "metric-refs") {
    for (const metricIdStr of node.metricIds) {
      if (metrics().has(metricIdStr)) {
        refs.add(metricIdStr)
      }
    }
  } else if (
    node.type === "add" ||
    node.type === "multiply" ||
    node.type === "divide" ||
    node.type === "max" ||
    node.type === "min" ||
    node.type === "floor-multiply"
  ) {
    for (const operand of node.operands) {
      for (const ref of extractMetricReferences(operand)) {
        refs.add(ref)
      }
    }
  } else if (node.type === "floor" || node.type === "floor-product") {
    for (const ref of extractMetricReferences(node.operand)) {
      refs.add(ref)
    }
  }

  return refs
}

function buildDependencyGraph(metrics: readonly MetricWithFormula[]): Map<MetricId, Set<MetricId>> {
  const graph = new Map<MetricId, Set<MetricId>>()

  for (const metric of metrics) {
    const deps = extractMetricReferences(metric.formula)
    graph.set(metric.id, deps)
  }

  return graph
}

function calculateBaseStats(
  sources: readonly EffectSource[]
): Partial<Record<MetricId, MetricValue>> {
  const withFormulas = metricsWithFormulas()
  const dependencies = buildDependencyGraph(withFormulas)

  const allReferencedMetricIds = new Set<MetricId>()
  for (const deps of dependencies.values()) {
    for (const dep of deps) {
      allReferencedMetricIds.add(dep)
    }
  }

  const metricValues = new Map<MetricId, number>()
  for (const metricId of allReferencedMetricIds) {
    if (metrics().has(metricId)) {
      const metric = metrics().data[metricId]
      if (!hasFormula(metric)) {
        metricValues.set(metricId, 0)
      }
    }
  }

  const calculationOrder = topologicalSort(
    withFormulas,
    (metric) => metric.id,
    (metric) => dependencies.get(metric.id) ?? new Set()
  )

  const results: MetricValue[] = []

  for (const metric of calculationOrder) {
    const rawValue = evaluateFormula(metric, sources, metricValues)
    metricValues.set(metric.id, rawValue)

    const value = roundMetricValue(metric, rawValue)
    results.push({ ...metric, value })
  }

  for (const metric of results) {
    if (
      (metric.valueType === "integer" || metric.valueType === "rating") &&
      !Number.isInteger(metric.value)
    ) {
      throw new Error(
        `Metric '${metric.id}' has valueType 'integer' but value ${metric.value} is not an integer`
      )
    }
  }

  const nonZeroResults = results.filter((metric) => metric.value !== 0)

  return indexBy(nonZeroResults, "id")
}

function calculateMetricValues(sources: readonly EffectSource[]): CalculationResult {
  const buffSources = calculateBuffs(sources)

  const existingBuffIds = new Set<string>()
  for (const source of sources) {
    if (source.categoryId === "buffs" || source.categoryId === "debuffs") {
      existingBuffIds.add(source.id)
    }
  }
  const newBuffs =
    existingBuffIds.size > 0 ? buffSources.filter((b) => !existingBuffIds.has(b.id)) : buffSources

  const sourcesWithBuffs: EffectSource[] = sources.concat(newBuffs)

  const baseStats = calculateBaseStats(sourcesWithBuffs)

  return {
    sources: sourcesWithBuffs,
    metrics: baseStats,
  }
}

export function calculateReadingStatsByBar(
  build: CharacterState,
  bar: "primary-weapon-bar" | "backup-weapon-bar",
  listed: readonly { readonly abilityId: number; readonly name: string }[]
): CalculationResult & { unmatchedBuffNames: readonly string[] } {
  const buffByName = new Map<string, EffectSource>()
  for (const buff of Object.values(buffOrDebuff().data)) buffByName.set(buff.name, buff)
  const foodByAbility = new Map<number, string>()
  for (const food of Object.values(foodOrDrink().data)) foodByAbility.set(food.abilityId, food.id)
  const stoneByAbility = new Map<number, string>()
  for (const stone of Object.values(mundus().data)) stoneByAbility.set(stone.esoMundusId, stone.id)

  let foodOrDrinkId = "no-food-or-drink"
  let mundusStone = "no-mundus"
  const activeBuffs: EffectSource[] = []
  const unmatchedBuffNames: string[] = []
  for (const { abilityId, name } of listed) {
    const food = foodByAbility.get(abilityId)
    const stone = stoneByAbility.get(abilityId)
    const buff = buffByName.get(name)
    if (food !== undefined) foodOrDrinkId = food
    else if (stone !== undefined) mundusStone = stone
    else if (buff !== undefined) activeBuffs.push(buff)
    else unmatchedBuffNames.push(name)
  }

  const asListed: CharacterState = {
    ...build,
    character: { ...build.character, mundusStone },
    consumables: { ...build.consumables, foodOrDrink: foodOrDrinkId },
  }
  const sources: EffectSource[] = [
    baseSource(),
    ...buildStateToEffectSources(asListed, bar),
    ...activeBuffs,
  ]
  return { sources, metrics: calculateBaseStats(sources), unmatchedBuffNames }
}

export function calculateBuildStatsByBar(
  build: CharacterState,
  bar: "primary-weapon-bar" | "backup-weapon-bar",
  additionalSources?: readonly EffectSource[]
): CalculationResult {
  const buildSources = buildStateToEffectSources(build, bar)

  const baseArray: EffectSource[] = [baseSource()]
  let allSources: EffectSource[] = baseArray.concat(buildSources)

  if (additionalSources) {
    allSources = allSources.concat(additionalSources)
  }

  const result = calculateMetricValues(allSources)

  return result
}
