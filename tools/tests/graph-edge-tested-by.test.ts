import { readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, test } from "bun:test"
import { createGraph } from "../lib/graph/graph.ts"
import { producerPaths, registrarPaths, PRODUCERS_DIR } from "../lib/graph/snapshot.ts"
import { testedByEdgeProducer } from "../lib/graph/producers/test-file/tested-by.edge.producer.ts"
import {
  COMPILE_TIME_ASSERTION_MODULE,
  TEST_FILE_ENDINGS,
  TESTED_BY_EDGE_TYPE,
} from "../lib/graph/producers/test-file/types.ts"
import { deployedNodeTypes, rootedIn, rootingEdgeTypes } from "../lib/graph/queries/rooted.ts"
import type { BuildContext, Edge, Graph, Node, ProducerOutput } from "../lib/graph/types.ts"

const REPO_ROOT = join(import.meta.dir, "..", "..")

const WEB_APP_NODE_TYPE = "web-app"

const K8S_RESOURCE_NODE_TYPE = "k8s-resource"

const tsFile = (path: string): Node => ({
  id: `ts-file:code:${path}`,
  type: "ts-file",
  repo: "code",
  key: path,
  attrs: {},
  derived: {},
})

const app = (key: string): Node => ({
  id: `${WEB_APP_NODE_TYPE}:code:${key}`,
  type: WEB_APP_NODE_TYPE,
  repo: "code",
  key,
  attrs: {},
  derived: {},
})

const resource = (key: string): Node => ({
  id: `${K8S_RESOURCE_NODE_TYPE}:code:${key}`,
  type: K8S_RESOURCE_NODE_TYPE,
  repo: "code",
  key,
  attrs: {},
  derived: {},
})

const edge = (type: string, from: string, to: string): Edge => ({
  type,
  from,
  to,
  attrs: {},
  derived: {},
})

const ctx: BuildContext = {
  repoRoots: new Map(),
  repoFiles: new Map(),
  commit: "0",
}

const ranOn = async (graph: Graph): Promise<ProducerOutput> =>
  await testedByEdgeProducer.build(ctx, graph)

const importing = (test: string, subject: string): Graph =>
  createGraph(
    [tsFile(subject), tsFile(test)],
    [edge("import-static", `ts-file:code:${test}`, `ts-file:code:${subject}`)]
  )

const synthedNodes = (test: string, synth: string): readonly Node[] => [
  resource("Deployment/gotrue/gotrue"),
  tsFile(synth),
  tsFile(test),
]

const synthedEdges = (synth: string): readonly Edge[] => [
  edge(
    "synth-generated-by",
    `${K8S_RESOURCE_NODE_TYPE}:code:Deployment/gotrue/gotrue`,
    `ts-file:code:${synth}`
  ),
]

const assertingNodes = (schema: string, subject: string): readonly Node[] => [
  tsFile(subject),
  tsFile(schema),
  tsFile(COMPILE_TIME_ASSERTION_MODULE),
]

const assertingEdges = (schema: string, subject: string): readonly Edge[] => [
  edge("import-static", `ts-file:code:${schema}`, `ts-file:code:${subject}`),
  edge(
    "import-static",
    `ts-file:code:${schema}`,
    `ts-file:code:${COMPILE_TIME_ASSERTION_MODULE}`
  ),
]

describe("the tested-by edge", () => {
  test("runs from the subject to the test, the reverse of the import", async () => {
    const out = await ranOn(importing("src/a.test.ts", "src/a.ts"))
    expect(out.edges).toEqual([
      {
        type: TESTED_BY_EDGE_TYPE,
        from: "ts-file:code:src/a.ts",
        to: "ts-file:code:src/a.test.ts",
        attrs: {},
      },
    ])
  })

  test("is emitted once for a subject a test imports twice", async () => {
    const graph = createGraph(
      [tsFile("src/a.ts"), tsFile("src/a.test.ts")],
      [
        edge("import-static", "ts-file:code:src/a.test.ts", "ts-file:code:src/a.ts"),
        edge("re-export", "ts-file:code:src/a.test.ts", "ts-file:code:src/a.ts"),
      ]
    )
    expect((await ranOn(graph)).edges).toHaveLength(1)
  })

  test("is not emitted for a file that is not a test", async () => {
    const out = await ranOn(importing("src/b.ts", "src/a.ts"))
    expect(out.edges).toEqual([])
  })

  test("is emitted for a test the suite holds back", async () => {
    const out = await ranOn(importing("src/a.on-demand.test.ts", "src/a.ts"))
    expect(out.edges).toHaveLength(1)
  })

  test("is emitted for a file asserting a schema at compile time, whatever it is named", async () => {
    const graph = createGraph(
      assertingNodes("src/a-schema.ts", "src/a-catalog.ts"),
      assertingEdges("src/a-schema.ts", "src/a-catalog.ts")
    )
    expect((await ranOn(graph)).edges).toContainEqual({
      type: TESTED_BY_EDGE_TYPE,
      from: "ts-file:code:src/a-catalog.ts",
      to: "ts-file:code:src/a-schema.ts",
      attrs: {},
    })
  })

  test("leaves the assertion module the edge its own test gives it", async () => {
    const out = await ranOn(importing("src/assert.test.ts", COMPILE_TIME_ASSERTION_MODULE))
    expect(out.edges).toContainEqual({
      type: TESTED_BY_EDGE_TYPE,
      from: `ts-file:code:${COMPILE_TIME_ASSERTION_MODULE}`,
      to: "ts-file:code:src/assert.test.ts",
      attrs: {},
    })
  })

  test("is emitted from a synth module to a test standing in its folder that imports nothing", async () => {
    const graph = createGraph(
      synthedNodes("src/gotrue/health.smoke.test.ts", "src/gotrue/synth.ts"),
      synthedEdges("src/gotrue/synth.ts")
    )
    expect((await ranOn(graph)).edges).toEqual([
      {
        type: TESTED_BY_EDGE_TYPE,
        from: "ts-file:code:src/gotrue/synth.ts",
        to: "ts-file:code:src/gotrue/health.smoke.test.ts",
        attrs: {},
      },
    ])
  })

  test("is not emitted from a synth module to a test standing in another folder", async () => {
    const graph = createGraph(
      synthedNodes("src/elsewhere/health.smoke.test.ts", "src/gotrue/synth.ts"),
      synthedEdges("src/gotrue/synth.ts")
    )
    expect((await ranOn(graph)).edges).toEqual([])
  })

  test("is not emitted from a synth module to a file beside it that is not a test", async () => {
    const graph = createGraph(
      synthedNodes("src/gotrue/health.ts", "src/gotrue/synth.ts"),
      synthedEdges("src/gotrue/synth.ts")
    )
    expect((await ranOn(graph)).edges).toEqual([])
  })

  test("stands among the edge types that root", () => {
    expect(rootingEdgeTypes()).toContain(TESTED_BY_EDGE_TYPE)
  })
})

describe("what the tested-by edge roots", () => {
  const rootedWith = async (nodes: readonly Node[], edges: readonly Edge[]): Promise<ReadonlySet<string>> => {
    const upstream = createGraph(nodes, edges)
    const produced = await ranOn(upstream)
    return rootedIn(createGraph(nodes, [...edges, ...produced.edges.map((one) => ({ ...one, derived: {} }))]))
  }

  test("a deploy reaching the subject reaches its test", async () => {
    const rooted = await rootedWith(
      [app("shop"), tsFile("src/a.ts"), tsFile("src/a.test.ts")],
      [
        edge("web-app-built-from", `${WEB_APP_NODE_TYPE}:code:shop`, "ts-file:code:src/a.ts"),
        edge("import-static", "ts-file:code:src/a.test.ts", "ts-file:code:src/a.ts"),
      ]
    )
    expect(rooted.has("ts-file:code:src/a.ts")).toBe(true)
    expect(rooted.has("ts-file:code:src/a.test.ts")).toBe(true)
  })

  test("a test whose every subject is unrooted stays unrooted", async () => {
    const rooted = await rootedWith(
      [app("shop"), tsFile("src/live.ts"), tsFile("src/dead.ts"), tsFile("src/dead.test.ts")],
      [
        edge("web-app-built-from", `${WEB_APP_NODE_TYPE}:code:shop`, "ts-file:code:src/live.ts"),
        edge("import-static", "ts-file:code:src/dead.test.ts", "ts-file:code:src/dead.ts"),
      ]
    )
    expect(rooted.has("ts-file:code:src/live.ts")).toBe(true)
    expect(rooted.has("ts-file:code:src/dead.ts")).toBe(false)
    expect(rooted.has("ts-file:code:src/dead.test.ts")).toBe(false)
  })

  test("rootedness carries on through a test's own imports rather than stopping at the test", async () => {
    const rooted = await rootedWith(
      [app("shop"), tsFile("src/live.ts"), tsFile("src/live.test.ts"), tsFile("src/dead.ts")],
      [
        edge("web-app-built-from", `${WEB_APP_NODE_TYPE}:code:shop`, "ts-file:code:src/live.ts"),
        edge("import-static", "ts-file:code:src/live.test.ts", "ts-file:code:src/live.ts"),
        edge("import-static", "ts-file:code:src/live.test.ts", "ts-file:code:src/dead.ts"),
      ]
    )
    expect(rooted.has("ts-file:code:src/live.test.ts")).toBe(true)
    expect(rooted.has("ts-file:code:src/dead.ts")).toBe(true)
  })

  test("a deployed resource roots the smoke test standing beside the module generating it", async () => {
    const rooted = await rootedWith(
      synthedNodes("src/gotrue/health.smoke.test.ts", "src/gotrue/synth.ts"),
      synthedEdges("src/gotrue/synth.ts")
    )
    expect(rooted.has("ts-file:code:src/gotrue/synth.ts")).toBe(true)
    expect(rooted.has("ts-file:code:src/gotrue/health.smoke.test.ts")).toBe(true)
  })

  test("a deploy reaching a type roots the schema asserted against it", async () => {
    const rooted = await rootedWith(
      [app("shop"), ...assertingNodes("src/a-schema.ts", "src/a-catalog.ts")],
      [
        edge(
          "web-app-built-from",
          `${WEB_APP_NODE_TYPE}:code:shop`,
          "ts-file:code:src/a-catalog.ts"
        ),
        ...assertingEdges("src/a-schema.ts", "src/a-catalog.ts"),
      ]
    )
    expect(rooted.has("ts-file:code:src/a-schema.ts")).toBe(true)
  })
})

describe("the producer's reach", () => {
  test("the endings it calls a test are the ones the file-purpose pages declare", () => {
    const dir = join(REPO_ROOT, "pages", "file-purpose")
    const declared = readdirSync(dir)
      .filter((name) => name.endsWith(".md"))
      .map((name) => {
        const line = readFileSync(join(dir, name), "utf-8")
          .split("\n")
          .find((one) => one.startsWith("ending:"))
        if (line === undefined) throw new Error(`pages/file-purpose/${name} declares no ending`)
        return `.${line.slice("ending:".length).trim()}`
      })
      .sort()
    expect(declared).toEqual([...TEST_FILE_ENDINGS].sort())
  })

  test("its registrar and its producer both stand where assembly looks", () => {
    expect(registrarPaths(PRODUCERS_DIR)).toContain(
      join(PRODUCERS_DIR, "test-file", "register.ts")
    )
    expect(producerPaths(PRODUCERS_DIR)).toContain(
      join(PRODUCERS_DIR, "test-file", "tested-by.edge.producer.ts")
    )
  })

  test("no file node type is itself a deploy root", () => {
    expect(deployedNodeTypes()).not.toContain("ts-file")
    expect(deployedNodeTypes()).not.toContain("tsx-file")
  })
})
