import { runDerivers, validateDeriverRegistration } from "./deriver-run.ts"
import { runProducers, validateProducers } from "./producer-run.ts"
import type { Deriver, EdgeTypeDef, Engine, NodeTypeDef, Producer } from "./types.ts"

const validateEdgeTypes = (
  edgeTypes: ReadonlyMap<string, EdgeTypeDef>,
  nodeTypes: ReadonlyMap<string, NodeTypeDef>
): undefined => {
  for (const def of edgeTypes.values()) {
    if (!nodeTypes.has(def.from)) {
      throw new Error(`graph: edge type ${def.name} references unregistered node type ${def.from}`)
    }
    if (!nodeTypes.has(def.to)) {
      throw new Error(`graph: edge type ${def.name} references unregistered node type ${def.to}`)
    }
  }
}

export const createEngine = (): Engine => {
  const nodeTypes = new Map<string, NodeTypeDef>()
  const edgeTypes = new Map<string, EdgeTypeDef>()
  const producers: Producer[] = []
  const derivers: Deriver[] = []

  return {
    registerNodeType: (def) => {
      if (nodeTypes.has(def.name)) {
        throw new Error(`graph: node type already registered: ${def.name}`)
      }
      nodeTypes.set(def.name, def)
    },
    registerEdgeType: (def) => {
      if (edgeTypes.has(def.name)) {
        throw new Error(`graph: edge type already registered: ${def.name}`)
      }
      edgeTypes.set(def.name, def)
    },
    registerProducer: (producer) => {
      producers.push(producer)
    },
    registerDeriver: (spec) => {
      validateDeriverRegistration(spec, derivers)
      derivers.push(spec)
    },
    build: async (ctx) => {
      validateEdgeTypes(edgeTypes, nodeTypes)
      validateProducers(producers, nodeTypes, edgeTypes)
      return runDerivers(await runProducers(producers, ctx, { nodeTypes, edgeTypes }), derivers)
    },
  }
}
