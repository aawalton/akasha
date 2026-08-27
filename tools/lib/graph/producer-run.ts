import { type MergeRegistry, mergeProducerOutputs } from "./merge.ts"
import type { BuildContext, Graph, Producer, ProducerOutput } from "./types.ts"

const findProducerCycleFrom = (
  start: string,
  producers: readonly Producer[]
): readonly string[] | null => {
  const byName = new Map<string, Producer>()
  for (const producer of producers) byName.set(producer.name, producer)
  const stack: string[] = []
  const onStack = new Set<string>()
  const visited = new Set<string>()
  const walk = (name: string): readonly string[] | null => {
    if (onStack.has(name)) return stack.slice(stack.indexOf(name))
    if (visited.has(name)) return null
    const spec = byName.get(name)
    if (spec === undefined) return null
    visited.add(name)
    stack.push(name)
    onStack.add(name)
    for (const dep of spec.dependsOn ?? []) {
      const cycle = walk(dep)
      if (cycle) return cycle
    }
    stack.pop()
    onStack.delete(name)
    return null
  }
  return walk(start)
}

export const validateProducers = (
  producers: readonly Producer[],
  nodeTypes: ReadonlyMap<string, unknown>,
  edgeTypes: ReadonlyMap<string, unknown>
): undefined => {
  const known = new Set<string>()
  for (const producer of producers) {
    if (known.has(producer.name)) {
      throw new Error(`graph: producer already registered: ${producer.name}`)
    }
    known.add(producer.name)
  }
  for (const producer of producers) {
    for (const name of producer.nodeTypes) {
      if (!nodeTypes.has(name)) {
        throw new Error(`graph: producer ${producer.name} declares unregistered node type ${name}`)
      }
    }
    for (const name of producer.edgeTypes) {
      if (!edgeTypes.has(name)) {
        throw new Error(`graph: producer ${producer.name} declares unregistered edge type ${name}`)
      }
    }
    for (const dep of producer.dependsOn ?? []) {
      if (!known.has(dep)) {
        throw new Error(
          `graph: producer '${producer.name}' names '${dep}', which no producer here answers to`
        )
      }
    }
    const cycle = findProducerCycleFrom(producer.name, producers)
    if (cycle && cycle.length > 0) {
      throw new Error(
        `graph: cycle detected in producer dependsOn: ${cycle.join(" -> ")} -> ${cycle[0]}`
      )
    }
  }
}

const computeTiers = (producers: readonly Producer[]): readonly (readonly Producer[])[] => {
  const remaining = new Map<string, Producer>()
  for (const producer of producers) remaining.set(producer.name, producer)
  const placed = new Set<string>()
  const tiers: Producer[][] = []
  while (remaining.size > 0) {
    const tier: Producer[] = []
    for (const producer of producers) {
      if (placed.has(producer.name) || !remaining.has(producer.name)) continue
      if ((producer.dependsOn ?? []).every((dep) => placed.has(dep))) tier.push(producer)
    }
    if (tier.length === 0) {
      throw new Error(
        "graph: producer dependsOn graph is unsatisfiable (cycle or unknown dep escaped registration validation)"
      )
    }
    for (const producer of tier) {
      placed.add(producer.name)
      remaining.delete(producer.name)
    }
    tiers.push(tier)
  }
  return tiers
}

export const runProducers = async (
  producers: readonly Producer[],
  ctx: BuildContext,
  registry?: MergeRegistry
): Promise<Graph> => {
  if (producers.length === 0) return mergeProducerOutputs([], registry)
  const tiers = computeTiers(producers)
  const accumulated: ProducerOutput[] = []
  let cumulative: Graph = mergeProducerOutputs([], registry)
  for (const tier of tiers) {
    const outputs = await Promise.all(tier.map((producer) => producer.build(ctx, cumulative)))
    accumulated.push(...outputs)
    cumulative = mergeProducerOutputs(accumulated, registry)
  }
  return cumulative
}
