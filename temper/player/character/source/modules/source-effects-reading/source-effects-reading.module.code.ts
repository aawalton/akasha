import type { Effect } from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"

type Value = Readonly<Record<string, unknown>>

function recordsIn(held: unknown): readonly Value[] {
  if (!Array.isArray(held)) return []
  return held.filter(
    (one): one is Value => one !== null && typeof one === "object" && !Array.isArray(one)
  )
}

function slugIn(named: unknown): string | null {
  return typeof named === "string" ? named.slice(named.lastIndexOf("/") + 1) : null
}

function effectOf(entry: Value, at: string): Effect {
  const metricId = slugIn(entry.metric)
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
    if (typeof node.slug === "string" && typeof node.nodeId === "string") {
      found.set(node.slug, node.nodeId)
    }
  }
  return found
}

function entryEffectOf(entry: Value, nodes: MetricNodes, at: string): Effect {
  const named = entry.metricId
  const slug = slugIn(named)
  const metricId = slug === null ? undefined : nodes.get(slug)
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
