import {
  type Effect,
  isMetricEffectType,
  type MetricEffectType,
} from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"

type Value = Readonly<Record<string, unknown>>

export function recordsIn(held: unknown): readonly Value[] {
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
  const effectType = knownEffectType(entry.effectType, metricId, at)
  if (typeof entry.value !== "number") {
    throw new Error(`${at} states an effect on \`${metricId}\` with no value`)
  }
  return { metricId, effectType, effectValue: entry.value } as Effect
}

function knownEffectType(named: unknown, metricId: string, at: string): MetricEffectType {
  if (typeof named !== "string") {
    throw new Error(`${at} states an effect on \`${metricId}\` with no effect type`)
  }
  if (!isMetricEffectType(named)) {
    throw new Error(
      `${at} states an effect on \`${metricId}\` of type \`${named}\`, which no code reads`
    )
  }
  return named
}

export function sourceEffectsOf(value: Value, at: string): readonly Effect[] {
  return recordsIn(value.effects).map((entry) => effectOf(entry, at))
}

export function inHashPlaces<Read>(placed: Iterable<readonly [number, Read]>): readonly Read[] {
  return [...placed].sort(([one], [two]) => one - two).map(([, read]) => read)
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

export function entryEffectOf(entry: Value, nodes: MetricNodes, at: string): Effect {
  const named = entry.metricId
  const slug = slugIn(named)
  const metricId = slug === null ? undefined : nodes.get(slug)
  if (metricId === undefined) {
    throw new Error(`${at} states an effect on \`${String(named)}\`, which is no stat tree node`)
  }
  const effectType = knownEffectType(entry.type, metricId, at)
  if (typeof entry.value !== "number") {
    throw new Error(`${at} states an effect on \`${metricId}\` with no value`)
  }
  const effectValue =
    typeof entry.seconds === "number" ? { value: entry.value, seconds: entry.seconds } : entry.value
  const higherOf = higherOfIn(entry.higherOf, nodes, at)
  const whileBuffs = whileBuffsIn(entry.whileBuffs)
  return {
    metricId,
    effectType,
    effectValue,
    ...(higherOf === null ? {} : { higherOf }),
    ...(whileBuffs === null ? {} : { whileBuffs }),
  } as Effect
}

function whileBuffsIn(named: unknown): readonly string[] | null {
  if (!Array.isArray(named)) return null
  return named.flatMap((one: unknown) => slugIn(one) ?? [])
}

function higherOfIn(named: unknown, nodes: MetricNodes, at: string): readonly string[] | null {
  if (!Array.isArray(named)) return null
  return named.map((one: unknown) => {
    const slug = slugIn(one)
    const metricId = slug === null ? undefined : nodes.get(slug)
    if (metricId === undefined) {
      throw new Error(`${at} compares \`${String(one)}\`, which is no stat tree node`)
    }
    return metricId
  })
}

export function entryEffectsOf(value: Value, nodes: MetricNodes, at: string): readonly Effect[] {
  return recordsIn(value.effects).map((entry) => entryEffectOf(entry, nodes, at))
}
