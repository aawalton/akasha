import { indexBy } from "akasha/temper/player/character/build/build-support/modules/row-grouping/row-grouping.module.code.ts"
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import { buffOrDebuff } from "akasha/temper/player/character/formula-framework/modules/buff-or-debuff-source/buff-or-debuff-source.module.code.ts"
import { isMetricEffect } from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"
import type { EffectSource } from "akasha/temper/player/character/formula-framework/modules/effect-source/effect-source.module.code.ts"
import type { MetricId } from "akasha/temper/player/character/formula-framework/modules/metric-id/metric-id.module.code.ts"
import { topologicalSort } from "akasha/temper/player/character/formula-framework/modules/topological-sort/topological-sort.module.code.ts"
import { baseSource } from "akasha/temper/player/character/source/modules/base-source/base-source.module.code.ts"
import { foodOrDrink } from "akasha/temper/player/character/source/modules/food-or-drink-source/food-or-drink-source.module.code.ts"
import { mundus } from "akasha/temper/player/character/source/modules/mundus-source/mundus-source.module.code.ts"
import { calculateBuffs } from "akasha/temper/player/character/stat/modules/buff-or-debuff-calculator/buff-or-debuff-calculator.module.code.ts"
import { buildStateToEffectSources } from "akasha/temper/player/character/stat/modules/build-state-adapter/build-state-adapter.module.code.ts"
import { starShareOf } from "akasha/temper/player/character/stat/modules/champion-damage-taken/champion-damage-taken.module.code.ts"
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

function buffsUp(sources: readonly EffectSource[]): ReadonlySet<string> {
  const up = new Set<string>()
  for (const source of sources) if (source.categoryId === "buffs") up.add(source.id)
  return up
}

function withConditionsMet(sources: readonly EffectSource[]): readonly EffectSource[] {
  const up = buffsUp(sources)
  const met = (effect: unknown): boolean =>
    !isMetricEffect(effect) ||
    effect.whileBuffs === undefined ||
    effect.whileBuffs.some((buff) => up.has(buff))
  return sources.map((source) =>
    source.effects.every(met)
      ? source
      : ({ ...source, effects: source.effects.filter(met) } as EffectSource)
  )
}

function isPerStack(effect: unknown): boolean {
  return isMetricEffect(effect) && effect.effectType === "integer-per-stack"
}

function stacked(buff: EffectSource, stacks: number): EffectSource {
  if (!buff.effects.some(isPerStack)) return buff
  const effects = buff.effects.map((effect) =>
    isMetricEffect(effect) && effect.effectType === "integer-per-stack"
      ? { ...effect, effectType: "integer" as const, effectValue: effect.effectValue * stacks }
      : effect
  )
  return { ...buff, effects } as EffectSource
}

const ULTIMATE_STEP = 10

function isPerTenUltimate(effect: unknown): boolean {
  return isMetricEffect(effect) && effect.effectType === "integer-per-ten-ultimate"
}

function withUltimate(source: EffectSource, ultimate: number): EffectSource {
  if (!source.effects.some(isPerTenUltimate)) return source
  const steps = Math.floor(ultimate / ULTIMATE_STEP)
  const effects = source.effects.map((effect) =>
    isMetricEffect(effect) && effect.effectType === "integer-per-ten-ultimate"
      ? { ...effect, effectType: "integer" as const, effectValue: effect.effectValue * steps }
      : effect
  )
  return { ...source, effects } as EffectSource
}

function isHigherOf(effect: unknown): boolean {
  return isMetricEffect(effect) && effect.higherOf !== undefined
}

function withHigherOfSettled(sources: readonly EffectSource[]): readonly EffectSource[] {
  if (!sources.some((source) => source.effects.some(isHigherOf))) return sources
  const left = sources.map(
    (source) =>
      ({
        ...source,
        effects: source.effects.filter((effect) => !isHigherOf(effect)),
      }) as EffectSource
  )
  const before = new Map<string, number>(evaluated(left).map((metric) => [metric.id, metric.value]))
  const poolOf = (metricId: string): number => before.get(metricId) ?? 0
  const highest = (metricIds: readonly string[]): string | undefined =>
    metricIds.reduce<string | undefined>(
      (best, metricId) => (best === undefined || poolOf(metricId) > poolOf(best) ? metricId : best),
      undefined
    )
  const met = (effect: unknown): boolean =>
    !isMetricEffect(effect) ||
    effect.higherOf === undefined ||
    highest(effect.higherOf) === effect.metricId
  return sources.map((source) =>
    source.effects.every(met)
      ? source
      : ({ ...source, effects: source.effects.filter(met) } as EffectSource)
  )
}

function calculateBaseStats(
  given: readonly EffectSource[]
): Partial<Record<MetricId, MetricValue>> {
  const results = evaluated(withHigherOfSettled(withConditionsMet(given)))

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

function evaluated(sources: readonly EffectSource[]): MetricValue[] {
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

  return results
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

type StarPoints = {
  readonly championSkillId: number
  readonly points: number
  readonly maxPoints: number
}

function jumpPointsOf(source: EffectSource): readonly number[] {
  return "jumpPoints" in source && Array.isArray(source.jumpPoints) ? source.jumpPoints : []
}

function asSpent(
  source: EffectSource,
  spent: ReadonlyMap<number, StarPoints>
): EffectSource | undefined {
  if (source.categoryId !== "champion-points") return source
  if (!("esoChampionSkillId" in source) || typeof source.esoChampionSkillId !== "number") {
    return source
  }
  const star = spent.get(source.esoChampionSkillId)
  if (star === undefined) return undefined
  const share = starShareOf(jumpPointsOf(source), star.points, star.maxPoints)
  const effects = source.effects.map((effect) =>
    isMetricEffect(effect) &&
    (effect.effectType === "integer" || effect.effectType === "fractional-change")
      ? { ...effect, effectValue: effect.effectValue * share }
      : effect
  )
  return { ...source, effects } as EffectSource
}

export function calculateReadingStatsByBar(
  build: CharacterState,
  bar: "primary-weapon-bar" | "backup-weapon-bar",
  listed: readonly {
    readonly abilityId: number
    readonly name: string
    readonly stacks?: number | undefined
  }[],
  stars?: readonly StarPoints[],
  ultimate = 0
): CalculationResult & { unmatchedBuffNames: readonly string[] } {
  const buffByName = new Map<string, EffectSource>()
  for (const buff of Object.values(buffOrDebuff().data)) buffByName.set(buff.name, buff)
  const foodByAbility = new Map<number, string>()
  for (const food of Object.values(foodOrDrink().data)) {
    if (food.abilityId !== null) foodByAbility.set(food.abilityId, food.id)
  }
  const stoneByAbility = new Map<number, string>()
  for (const stone of Object.values(mundus().data)) stoneByAbility.set(stone.esoMundusId, stone.id)

  let foodOrDrinkId = "no-food-or-drink"
  let mundusStone = "no-mundus"
  const activeBuffs: EffectSource[] = []
  const unmatchedBuffNames: string[] = []
  for (const { abilityId, name, stacks } of listed) {
    const food = foodByAbility.get(abilityId)
    const stone = stoneByAbility.get(abilityId)
    const buff = buffByName.get(name)
    if (food !== undefined) foodOrDrinkId = food
    else if (stone !== undefined) mundusStone = stone
    else if (buff !== undefined) activeBuffs.push(stacked(buff, stacks ?? 0))
    else unmatchedBuffNames.push(name)
  }

  const asListed: CharacterState = {
    ...build,
    character: { ...build.character, mundusStone },
    consumables: { ...build.consumables, foodOrDrink: foodOrDrinkId },
  }
  const spent = new Map((stars ?? []).map((star) => [star.championSkillId, star] as const))
  const fromBuild = buildStateToEffectSources(asListed, bar).map((source) =>
    withUltimate(source, ultimate)
  )
  const built =
    stars === undefined ? fromBuild : fromBuild.flatMap((source) => asSpent(source, spent) ?? [])
  const sources: EffectSource[] = [baseSource(), ...built, ...activeBuffs]
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
