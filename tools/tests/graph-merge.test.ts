import { describe, expect, test } from "bun:test"
import { mergeProducerOutputs } from "../lib/graph/merge.ts"
import type { ProducerOutput } from "../lib/graph/types.ts"

const output = (nodes: ProducerOutput["nodes"]): ProducerOutput => ({ nodes, edges: [] })

describe("mergeProducerOutputs", () => {
  test("a node reaches the graph with a key composed from its parts", () => {
    const graph = mergeProducerOutputs([
      output([{ type: "ts-file", repo: "code", key: "tools/read.ts", attrs: {} }]),
    ])
    expect(graph.nodes()[0]?.id).toBe("ts-file:code:tools/read.ts")
  })

  test("every part of a key stands on the node, so none is read by parsing", () => {
    const graph = mergeProducerOutputs([
      output([{ type: "ts-file", repo: "code", key: "tools/read.ts", attrs: {} }]),
    ])
    const node = graph.nodes()[0]
    expect(node?.type).toBe("ts-file")
    expect(node?.repo).toBe("code")
    expect(node?.key).toBe("tools/read.ts")
  })

  test("one key in two repositories reaches the graph as two nodes", () => {
    const graph = mergeProducerOutputs([
      output([
        { type: "json-file", repo: "code", key: "package.json", attrs: {} },
        { type: "json-file", repo: "instructions", key: "package.json", attrs: {} },
      ]),
    ])
    expect(graph.nodes("json-file")).toHaveLength(2)
  })

  test("a node standing in no repository still reaches the graph keyed", () => {
    const graph = mergeProducerOutputs([output([{ type: "db-table", key: "public.users", attrs: {} }])])
    expect(graph.nodes()[0]?.id).toBe("db-table:public.users")
  })
})
