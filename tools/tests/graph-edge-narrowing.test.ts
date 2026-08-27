import { describe, expect, test } from "bun:test"
import { createGraph } from "../lib/graph/graph.ts"
import type { Edge, Graph, Node } from "../lib/graph/types.ts"

const node = (id: string): Node => ({ id, type: "file", key: id, attrs: {}, derived: {} })

const edge = (type: string, from: string, to: string): Edge => ({
  type,
  from,
  to,
  attrs: {},
  derived: {},
})

const built = (): Graph =>
  createGraph(
    [node("a"), node("b"), node("c")],
    [
      edge("dockerfile-recipe-input", "a", "b"),
      edge("dockerfile-recipe-input", "a", "c"),
      edge("import-static", "b", "c"),
    ]
  )

describe("narrowing edges by type", () => {
  test("one type named as a bare string narrows the same as that type in an array", () => {
    expect(built().edges({ type: "dockerfile-recipe-input" })).toHaveLength(2)
    expect(built().edges({ type: ["dockerfile-recipe-input"] })).toHaveLength(2)
  })

  test("a bare string narrows by the whole name rather than by its characters", () => {
    expect(built().outEdges("a", "dockerfile-recipe-input")).toHaveLength(2)
    expect(built().inEdges("c", "import-static")).toHaveLength(1)
  })

  test("a type no edge carries narrows to nothing rather than to everything", () => {
    expect(built().edges({ type: "no-such-edge-type" })).toHaveLength(0)
    expect(built().outEdges("a", "no-such-edge-type")).toHaveLength(0)
  })

  test("several types named in an array narrow to their union", () => {
    expect(built().edges({ type: ["dockerfile-recipe-input", "import-static"] })).toHaveLength(3)
  })

  test("naming no type at all leaves every edge", () => {
    expect(built().edges()).toHaveLength(3)
    expect(built().edges({ from: "a" })).toHaveLength(2)
    expect(built().outEdges("a")).toHaveLength(2)
  })
})
