import { describe, expect, test } from "bun:test"
import { createGraph } from "../lib/graph/graph.ts"
import type { ClosureSeeds } from "../lib/graph/queries/membership.ts"
import type { Node } from "../lib/graph/types.ts"
import { graphOf, importEdge, intersects, tsFile } from "./graph-closure-arm.ts"

const WORKFLOW_SOURCE = "packages/infra/k8s/electric/foundation.workflow.ts"

const electricWorkflow: Node = {
  id: "workflow:code:electric",
  type: "workflow",
  repo: "code",
  key: "electric",
  attrs: { sourcePath: WORKFLOW_SOURCE },
  derived: {},
}

describe("a workflow folds in its own source file", () => {
  test("a change to the workflow's own file reaches the workflow seed", () => {
    const graph = createGraph([electricWorkflow, tsFile(WORKFLOW_SOURCE)], [])
    expect(intersects(graph, { nodes: ["workflow:code:electric"] }, [WORKFLOW_SOURCE])).toBe(true)
  })

  test("a path standing for no node is not reached by the fold alone", () => {
    const graph = createGraph([electricWorkflow], [])
    expect(intersects(graph, { nodes: ["workflow:code:electric"] }, [WORKFLOW_SOURCE])).toBe(false)
  })

  test("an unrelated ts-file is not reached", () => {
    const graph = createGraph([electricWorkflow, tsFile("packages/foo/other.ts")], [])
    expect(intersects(graph, { nodes: ["workflow:code:electric"] }, ["packages/foo/other.ts"])).toBe(
      false
    )
  })
})

const IMPORTED_MODULE = "packages/infra/lint/src/lib/rule-configs.ts"

describe("the import-graph policy walks a workflow's imports", () => {
  const graph = createGraph(
    [electricWorkflow, tsFile(WORKFLOW_SOURCE), tsFile(IMPORTED_MODULE)],
    [importEdge(`ts-file:code:${WORKFLOW_SOURCE}`, `ts-file:code:${IMPORTED_MODULE}`)]
  )

  test("a module the workflow definition imports is reached", () => {
    expect(
      intersects(graph, { nodes: ["workflow:code:electric"], closurePolicy: "import-graph" }, [
        IMPORTED_MODULE,
      ])
    ).toBe(true)
  })

  test("the default policy stops at the workflow's own file", () => {
    expect(intersects(graph, { nodes: ["workflow:code:electric"] }, [IMPORTED_MODULE])).toBe(false)
    expect(intersects(graph, { nodes: ["workflow:code:electric"] }, [WORKFLOW_SOURCE])).toBe(true)
  })

  test("a module nothing imports is not reached", () => {
    const unlinked = createGraph(
      [electricWorkflow, tsFile(WORKFLOW_SOURCE), tsFile("packages/foo/other.ts")],
      []
    )
    expect(
      intersects(unlinked, { nodes: ["workflow:code:electric"], closurePolicy: "import-graph" }, [
        "packages/foo/other.ts",
      ])
    ).toBe(false)
  })
})

describe("seeds decide what a changed path reaches", () => {
  test("no seed at all watches everything, whatever changed", () => {
    const graph = graphOf([], [])
    expect(intersects(graph, {}, ["packages/foo/x.ts"])).toBe(true)
    expect(intersects(graph, { nodes: [], nodeTypes: [] }, ["packages/foo/x.ts"])).toBe(true)
    expect(intersects(graph, {}, [])).toBe(true)
  })

  test("a seed reaches a changed file over one edge", () => {
    const graph = graphOf(
      [
        { id: "workflow:code:foo", type: "workflow" },
        { id: "ts-file:code:packages/foo/index.ts", type: "ts-file" },
      ],
      [
        {
          from: "workflow:code:foo",
          to: "ts-file:code:packages/foo/index.ts",
          type: "workflow-depends-on",
        },
      ]
    )
    expect(intersects(graph, { nodes: ["workflow:code:foo"] }, ["packages/foo/index.ts"])).toBe(true)
  })

  test("a seed reaches a changed file over two edges", () => {
    const graph = graphOf(
      [
        { id: "package:code:@foo", type: "package" },
        { id: "package:code:@bar", type: "package" },
        { id: "ts-file:code:packages/bar/index.ts", type: "ts-file" },
      ],
      [
        { from: "package:code:@foo", to: "package:code:@bar", type: "pkg-depends" },
        {
          from: "package:code:@bar",
          to: "ts-file:code:packages/bar/index.ts",
          type: "workflow-depends-on",
        },
      ]
    )
    expect(intersects(graph, { nodes: ["package:code:@foo"] }, ["packages/bar/index.ts"])).toBe(true)
  })

  test("a seed reaching nothing changed answers no", () => {
    const graph = graphOf(
      [
        { id: "package:code:@foo", type: "package" },
        { id: "ts-file:code:packages/foo/index.ts", type: "ts-file" },
        { id: "ts-file:code:packages/unrelated/x.ts", type: "ts-file" },
      ],
      [
        {
          from: "package:code:@foo",
          to: "ts-file:code:packages/foo/index.ts",
          type: "workflow-depends-on",
        },
      ]
    )
    expect(intersects(graph, { nodes: ["package:code:@foo"] }, ["packages/unrelated/x.ts"])).toBe(
      false
    )
    expect(intersects(graph, { nodes: ["package:code:@foo"] }, ["packages/missing/y.ts"])).toBe(
      false
    )
    expect(intersects(graph, { nodes: ["package:code:@foo"] }, ["packages/foo/index.ts"])).toBe(true)
  })

  test("a node type names every node of that type as a seed", () => {
    const graph = graphOf(
      [
        { id: "ts-file:code:packages/a/x.ts", type: "ts-file" },
        { id: "ts-file:code:packages/b/y.ts", type: "ts-file" },
        { id: "md-file:code:docs/readme.md", type: "md-file" },
      ],
      []
    )
    expect(intersects(graph, { nodeTypes: ["ts-file"] }, ["packages/a/x.ts"])).toBe(true)
    expect(intersects(graph, { nodeTypes: ["md-file"] }, ["packages/a/x.ts"])).toBe(false)
  })

  test("named nodes and node types are seeded together", () => {
    const graph = graphOf(
      [
        { id: "package:code:@foo", type: "package" },
        { id: "ts-file:code:packages/foo/index.ts", type: "ts-file" },
        { id: "md-file:code:docs/a.md", type: "md-file" },
      ],
      [
        {
          from: "package:code:@foo",
          to: "ts-file:code:packages/foo/index.ts",
          type: "workflow-depends-on",
        },
      ]
    )
    const seeds: ClosureSeeds = { nodes: ["package:code:@foo"], nodeTypes: ["md-file"] }
    expect(intersects(graph, seeds, ["docs/a.md"])).toBe(true)
    expect(intersects(graph, seeds, ["packages/foo/index.ts"])).toBe(true)
  })

  test("a path naming no node contributes nothing beside one that does", () => {
    const graph = graphOf(
      [
        { id: "package:code:@foo", type: "package" },
        { id: "ts-file:code:packages/foo/index.ts", type: "ts-file" },
      ],
      [
        {
          from: "package:code:@foo",
          to: "ts-file:code:packages/foo/index.ts",
          type: "workflow-depends-on",
        },
      ]
    )
    expect(
      intersects(graph, { nodes: ["package:code:@foo"] }, [
        "packages/missing/ghost.ts",
        "packages/foo/index.ts",
      ])
    ).toBe(true)
  })

  test("a seed standing nowhere reaches nothing", () => {
    const graph = graphOf([{ id: "ts-file:code:packages/foo/index.ts", type: "ts-file" }], [])
    expect(intersects(graph, { nodes: ["package:code:@ghost"] }, ["packages/foo/index.ts"])).toBe(
      false
    )
  })
})
