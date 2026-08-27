import { describe, expect, test } from "bun:test"
import { mergeProducerOutputs } from "../lib/graph/merge.ts"
import { parseSerializedGraph } from "../lib/graph/serde/deserialize.ts"
import { serializeGraph } from "../lib/graph/serde/serialize.ts"

const built = () =>
  mergeProducerOutputs([
    {
      nodes: [
        { type: "json-file", repo: "instructions", key: "package.json", attrs: { a: 1 } },
        { type: "json-file", repo: "code", key: "package.json", attrs: { a: 2 } },
        { type: "db-table", key: "public.users", attrs: {} },
      ],
      edges: [],
    },
  ])

describe("serializeGraph", () => {
  test("a serialized graph names the commit it reflects", () => {
    expect(serializeGraph(built(), "abc1234").commit).toBe("abc1234")
  })

  test("every serialized node carries the parts of its key and never a key", () => {
    const nodes = serializeGraph(built(), "abc1234").nodes
    expect(nodes.length).toBeGreaterThan(0)
    for (const node of nodes) {
      const expected = node.repo === undefined
        ? ["attrs", "derived", "key", "type"]
        : ["attrs", "derived", "key", "repo", "type"]
      expect(Object.keys(node).toSorted()).toEqual(expected)
    }
  })

  test("two graphs holding the same nodes serialize alike", () => {
    expect(serializeGraph(built(), "abc1234")).toEqual(serializeGraph(built(), "abc1234"))
  })
})

describe("parseSerializedGraph", () => {
  test("a parsed node reaches the graph with its key composed from its parts", () => {
    const graph = parseSerializedGraph(serializeGraph(built(), "abc1234"))
    expect(graph.node("json-file:code:package.json")?.attrs).toEqual({ a: 2 })
  })

  test("a node standing in no repository survives the round trip", () => {
    const graph = parseSerializedGraph(serializeGraph(built(), "abc1234"))
    expect(graph.node("db-table:public.users")?.key).toBe("public.users")
  })

  test("a serialized graph carrying a key of its own is refused", () => {
    const raw = serializeGraph(built(), "abc1234")
    const tampered = { ...raw, nodes: [{ ...raw.nodes[0], id: "json-file:code:elsewhere" }] }
    expect(() => parseSerializedGraph(tampered)).toThrow()
  })
})
