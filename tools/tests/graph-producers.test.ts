import { describe, expect, test } from "bun:test"
import { runProducers, validateProducers } from "../lib/graph/producer-run.ts"
import type { BuildContext, Producer, ProducerOutput } from "../lib/graph/types.ts"

const ctx: BuildContext = { repoRoots: new Map(), repoFiles: new Map(), commit: "abc1234" }

const emitting = (
  name: string,
  output: ProducerOutput,
  dependsOn?: readonly string[]
): Producer => ({
  name,
  nodeTypes: [],
  edgeTypes: [],
  ...(dependsOn === undefined ? {} : { dependsOn }),
  build: () => output,
})

const node = (repo: "code" | "instructions", key: string) => ({
  type: "json-file",
  repo,
  key,
  attrs: {},
})

const NO_TYPES = new Map<string, unknown>()

describe("runProducers", () => {
  test("a producer sees what the producer it named emitted", async () => {
    let seen = 0
    const first = emitting("first", { nodes: [node("code", "package.json")], edges: [] })
    const second: Producer = {
      name: "second",
      nodeTypes: [],
      edgeTypes: [],
      dependsOn: ["first"],
      build: (_ctx, upstream) => {
        seen = upstream.nodes("json-file").length
        return { nodes: [], edges: [] }
      },
    }
    await runProducers([second, first], ctx)
    expect(seen).toBe(1)
  })

  test("an edge producer joins nodes standing in different repositories", async () => {
    const nodes = emitting("nodes", {
      nodes: [node("code", "package.json"), node("instructions", "package.json")],
      edges: [],
    })
    const edges: Producer = {
      name: "edges",
      nodeTypes: [],
      edgeTypes: [],
      dependsOn: ["nodes"],
      build: (_ctx, upstream) => ({
        nodes: [],
        edges:
          upstream.nodes("json-file").length === 2
            ? [
                {
                  type: "mirrors",
                  from: "json-file:code:package.json",
                  to: "json-file:instructions:package.json",
                  attrs: {},
                },
              ]
            : [],
      }),
    }
    const graph = await runProducers([nodes, edges], ctx)
    expect(graph.outEdges("json-file:code:package.json")).toHaveLength(1)
  })
})

describe("the whole set of producers is weighed together, never one against those before it", () => {
  test("a producer naming one that is nowhere in the set is refused", () => {
    const spec = emitting("second", { nodes: [], edges: [] }, ["absent"])
    expect(() => validateProducers([spec], NO_TYPES, NO_TYPES)).toThrow(/absent/)
  })

  test("a producer naming one that comes after it stands, the order being no part of it", () => {
    const first = emitting("first", { nodes: [], edges: [] })
    const second = emitting("second", { nodes: [], edges: [] }, ["first"])
    expect(() => validateProducers([second, first], NO_TYPES, NO_TYPES)).not.toThrow()
  })

  test("a producer named twice is refused", () => {
    const first = emitting("first", { nodes: [], edges: [] })
    expect(() => validateProducers([first, first], NO_TYPES, NO_TYPES)).toThrow(/already/)
  })

  test("two producers naming each other are refused", () => {
    const first = emitting("first", { nodes: [], edges: [] }, ["second"])
    const second = emitting("second", { nodes: [], edges: [] }, ["first"])
    expect(() => validateProducers([first, second], NO_TYPES, NO_TYPES)).toThrow(/cycle/)
  })

  test("a producer declaring a node type nothing registered is refused", () => {
    const spec: Producer = {
      name: "first",
      nodeTypes: ["absent-type"],
      edgeTypes: [],
      build: () => ({ nodes: [], edges: [] }),
    }
    expect(() => validateProducers([spec], NO_TYPES, NO_TYPES)).toThrow(/absent-type/)
  })
})
