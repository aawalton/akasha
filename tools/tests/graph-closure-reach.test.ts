import { describe, expect, test } from "bun:test"
import { CHECK_EXEMPT_DIRS } from "../lib/graph/producers/lib/constants.ts"
import {
  type ClosureSeeds,
  GRAPH_EXEMPT_DIRS,
  pathsStandingNowhere,
} from "../lib/graph/queries/membership.ts"
import type { Graph } from "../lib/graph/types.ts"
import { type EdgeSpec, graphOf, intersects, type NodeSpec } from "./graph-closure-arm.ts"

const SYNTH = "packages/infra/k8s/postgrest/synth.ts"

const RESOURCE = "k8s-resource:code:Deployment/postgrest/postgrest"

describe("a synth-generated-by edge carries the module a deploy runs to generate the resource", () => {
  const synthGraph = (extraNodes: readonly NodeSpec[], extraEdges: readonly EdgeSpec[]): Graph =>
    graphOf(
      [{ id: RESOURCE, type: "k8s-resource" }, ...extraNodes],
      [{ from: RESOURCE, to: `ts-file:code:${SYNTH}`, type: "synth-generated-by" }, ...extraEdges]
    )

  const seeds: ClosureSeeds = { nodes: [RESOURCE] }

  test("a change to the generating synth.ts reaches the resource", () => {
    const graph = synthGraph([{ id: `ts-file:code:${SYNTH}`, type: "ts-file" }], [])
    expect(intersects(graph, seeds, [SYNTH])).toBe(true)
  })

  test("another synth.ts does not reach it", () => {
    expect(intersects(synthGraph([], []), seeds, ["packages/infra/k8s/gotrue/synth.ts"])).toBe(false)
  })

  test("a helper the synth.ts imports reaches the resource", () => {
    const helper = "infra/k8s-types/src/hostnames.ts"
    const graph = synthGraph(
      [
        { id: `ts-file:code:${SYNTH}`, type: "ts-file" },
        { id: `ts-file:code:${helper}`, type: "ts-file" },
      ],
      [
        {
          from: `ts-file:code:${SYNTH}`,
          to: `ts-file:code:${helper}`,
          type: "import-static",
          attrs: { typeOnly: false },
        },
      ]
    )
    expect(intersects(graph, seeds, [helper])).toBe(true)
  })

  test("a file outside the synth.ts import closure does not", () => {
    const helper = "infra/k8s-types/src/hostnames.ts"
    const graph = synthGraph(
      [
        { id: `ts-file:code:${SYNTH}`, type: "ts-file" },
        { id: `ts-file:code:${helper}`, type: "ts-file" },
        { id: "ts-file:code:packages/infra/k8s/gotrue/synth.ts", type: "ts-file" },
      ],
      [
        {
          from: `ts-file:code:${SYNTH}`,
          to: `ts-file:code:${helper}`,
          type: "import-static",
          attrs: { typeOnly: false },
        },
      ]
    )
    expect(intersects(graph, seeds, ["packages/infra/k8s/gotrue/synth.ts"])).toBe(false)
  })

  test("a type-only import out of the synth.ts does not carry", () => {
    const types = "packages/infra/k8s-types/src/types.ts"
    const graph = synthGraph(
      [
        { id: `ts-file:code:${SYNTH}`, type: "ts-file" },
        { id: `ts-file:code:${types}`, type: "ts-file" },
      ],
      [
        {
          from: `ts-file:code:${SYNTH}`,
          to: `ts-file:code:${types}`,
          type: "import-static",
          attrs: { typeOnly: true },
        },
      ]
    )
    expect(intersects(graph, seeds, [types])).toBe(false)
  })
})

describe("a tunnel config recipe is reached from its fragments", () => {
  const seeds: ClosureSeeds = {
    nodes: ["tunnel-config-recipe:code:cloudflared"],
    nodeTypes: ["tunnel-route"],
  }

  test("a changed tunnel-routes.ts standing as a node reaches the recipe", () => {
    const graph = graphOf(
      [
        { id: "tunnel-config-recipe:code:cloudflared", type: "tunnel-config-recipe" },
        { id: "tunnel-route:code:packages/temper/web/tunnel-routes.ts", type: "tunnel-route" },
      ],
      []
    )
    expect(intersects(graph, seeds, ["packages/temper/web/tunnel-routes.ts"])).toBe(true)
  })

  test("the recipe reaches a fragment over the recipe-input edge", () => {
    const graph = graphOf(
      [
        { id: "tunnel-config-recipe:code:cloudflared", type: "tunnel-config-recipe" },
        { id: "tunnel-route:code:packages/ntfy/tunnel-routes.ts", type: "tunnel-route" },
      ],
      [
        {
          from: "tunnel-config-recipe:code:cloudflared",
          to: "tunnel-route:code:packages/ntfy/tunnel-routes.ts",
          type: "tunnel-config-recipe-input",
        },
      ]
    )
    expect(
      intersects(graph, { nodes: ["tunnel-config-recipe:code:cloudflared"] }, [
        "packages/ntfy/tunnel-routes.ts",
      ])
    ).toBe(true)
  })

  test("a ts-file that is no fragment does not reach the recipe", () => {
    const graph = graphOf(
      [
        { id: "tunnel-config-recipe:code:cloudflared", type: "tunnel-config-recipe" },
        { id: "ts-file:code:packages/temper/web/other.ts", type: "ts-file" },
      ],
      []
    )
    expect(intersects(graph, seeds, ["packages/temper/web/other.ts"])).toBe(false)
  })
})

describe("one key can name more than one node", () => {
  const NESTED = "packages/x/tsconfig.json"
  const AT_ROOT = "tsconfig.base.json"

  const tsconfigGraph = (): Graph =>
    graphOf(
      [
        { id: `json-file:code:${NESTED}`, type: "json-file" },
        { id: `tsconfig-file:code:${NESTED}`, type: "tsconfig-file" },
        { id: `json-file:code:${AT_ROOT}`, type: "json-file" },
        { id: `tsconfig-file:code:${AT_ROOT}`, type: "tsconfig-file" },
      ],
      []
    )

  test("a seed set holding either node is reached from the one key", () => {
    expect(intersects(tsconfigGraph(), { nodeTypes: ["tsconfig-file"] }, [NESTED])).toBe(true)
    expect(intersects(tsconfigGraph(), { nodeTypes: ["json-file"] }, [NESTED])).toBe(true)
  })

  test("a key at the repository root is named like any other", () => {
    expect(intersects(tsconfigGraph(), { nodeTypes: ["tsconfig-file"] }, [AT_ROOT])).toBe(true)
  })

  test("a node type no extension table names is reached all the same", () => {
    const graph = graphOf([{ id: "png-file:code:packages/x/assets/logo.png", type: "png-file" }], [])
    expect(intersects(graph, { nodeTypes: ["png-file"] }, ["packages/x/assets/logo.png"])).toBe(true)
  })

  test("a key the graph does not carry reaches nothing", () => {
    expect(
      intersects(tsconfigGraph(), { nodeTypes: ["tsconfig-file"] }, ["packages/y/tsconfig.json"])
    ).toBe(false)
  })
})

describe("a changed path the graph should have carried is named", () => {
  const graphWithout = (): Graph =>
    graphOf([{ id: "ts-file:code:packages/other/src/keep.ts", type: "ts-file" }], [])

  test("a source file the graph is missing is named", () => {
    expect(pathsStandingNowhere(graphWithout(), ["packages/foo/src/bar.ts"])).toEqual([
      "packages/foo/src/bar.ts",
    ])
  })

  test("a fixture is not named", () => {
    expect(
      pathsStandingNowhere(graphWithout(), [
        "packages/infra/lint/__fixtures__/component-layout/root-padding.tsx",
      ])
    ).toEqual([])
  })

  test("a TypeScript file outside every workspace root is named", () => {
    expect(pathsStandingNowhere(graphWithout(), ["tools/lib/graph/queries/membership.ts"])).toEqual([
      "tools/lib/graph/queries/membership.ts",
    ])
  })

  test("TypeScript under a generated directory is still named", () => {
    expect(
      pathsStandingNowhere(graphWithout(), ["packages/foo/src/generated/x.generated.ts"])
    ).toEqual(["packages/foo/src/generated/x.generated.ts"])
  })

  test("a non-TypeScript file under a generated directory is not named", () => {
    expect(pathsStandingNowhere(graphWithout(), ["packages/foo/generated/data.json"])).toEqual([])
  })

  test("the directories held exempt here are the ones the producers hold exempt", () => {
    expect(GRAPH_EXEMPT_DIRS).toEqual(CHECK_EXEMPT_DIRS)
  })
})
