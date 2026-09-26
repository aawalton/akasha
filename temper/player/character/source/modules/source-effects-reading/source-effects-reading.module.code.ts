import {
  recordsIn,
  slugAt,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Effect } from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"
import { temperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.ts"

function effectOf(entry: Value, at: string): Effect {
  const metricId = slugAt(entry, "metric")
  if (metricId === null) throw new Error(`${at} states an effect naming no stat`)
  if (typeof entry.effectType !== "string") {
    throw new Error(`${at} states an effect on \`${metricId}\` with no effect type`)
  }
  if (typeof entry.value !== "number") {
    throw new Error(`${at} states an effect on \`${metricId}\` with no value`)
  }
  return { metricId, effectType: entry.effectType, effectValue: entry.value } as Effect
}

export function sourceEffectsOf(value: Value, at: string): readonly Effect[] {
  return recordsIn(value.effects).map((entry) => effectOf(entry, at))
}

export type MetricNodes = ReadonlyMap<string, string>

export function metricNodesOf(nodes: Iterable<Value>): MetricNodes {
  const found = new Map<string, string>()
  for (const node of nodes) {
    const nodeId = textAt(node, "nodeId")
    if (typeof node.slug === "string" && nodeId !== null) {
      found.set(`${temperMetricTree.slug}/${node.slug}`, nodeId)
    }
  }
  return found
}

function entryEffectOf(entry: Value, nodes: MetricNodes, at: string): Effect {
  const named = textAt(entry, "metricId")
  const metricId = named === null ? undefined : nodes.get(named)
  if (metricId === undefined) {
    throw new Error(`${at} states an effect on \`${String(named)}\`, which is no stat tree node`)
  }
  if (typeof entry.type !== "string") {
    throw new Error(`${at} states an effect on \`${metricId}\` with no effect type`)
  }
  if (typeof entry.value !== "number") {
    throw new Error(`${at} states an effect on \`${metricId}\` with no value`)
  }
  return { metricId, effectType: entry.type, effectValue: entry.value } as Effect
}

export function entryEffectsOf(value: Value, nodes: MetricNodes, at: string): readonly Effect[] {
  return recordsIn(value.effects).map((entry) => entryEffectOf(entry, nodes, at))
}
