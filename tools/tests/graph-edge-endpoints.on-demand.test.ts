import { execFileSync } from "node:child_process"
import { describe, expect, test } from "bun:test"
import { createEngine } from "../lib/graph/engine.ts"
import { fileNodeProducer } from "../lib/graph/producers/file/file.node.producer.ts"
import { registerFileNodeTypes } from "../lib/graph/producers/file/register.ts"
import { yamlFileEdgeProducer } from "../lib/graph/producers/file/yaml-file/yaml-file.edge.producer.ts"
import { k8sSynthEdgeProducer } from "../lib/graph/producers/k8s/k8s-synth.edge.producer.ts"
import { k8sSynthNodeProducer } from "../lib/graph/producers/k8s/k8s-synth.node.producer.ts"
import { k8sEdgeProducer } from "../lib/graph/producers/k8s/k8s.edge.producer.ts"
import { k8sNodeProducer } from "../lib/graph/producers/k8s/k8s.node.producer.ts"
import { rbacEdgeProducer } from "../lib/graph/producers/k8s/rbac.edge.producer.ts"
import {
  registerK8sNodeTypes,
  registerK8sSynthEdgeTypes,
} from "../lib/graph/producers/k8s/register.ts"
import { packageNodeProducer } from "../lib/graph/producers/package/package.node.producer.ts"
import { registerPackageTypes } from "../lib/graph/producers/package/register.ts"
import { pipelineNodeProducer } from "../lib/graph/producers/pipeline/pipeline.node.producer.ts"
import { registerPipelineTypes } from "../lib/graph/producers/pipeline/register.ts"
import { readRepos } from "../lib/graph/repos.ts"
import type { EdgeTypeDef, Engine, Graph, NodeTypeDef } from "../lib/graph/types.ts"
import { resolveRoots } from "../../repo/roots/roots"
import { endpointsOf, type Reading } from "./graph-edge-endpoints-arm.ts"

const recording = (declared: Map<string, EdgeTypeDef>): Engine => {
  const engine = createEngine()
  return {
    registerNodeType: (def: NodeTypeDef) => engine.registerNodeType(def),
    registerEdgeType: (def: EdgeTypeDef) => {
      declared.set(def.name, def)
      engine.registerEdgeType(def)
    },
    registerProducer: (producer) => engine.registerProducer(producer),
    registerDeriver: (spec) => engine.registerDeriver(spec),
    build: (ctx) => engine.build(ctx),
  }
}

const headCommit = (): string =>
  execFileSync("git", ["-C", resolveRoots().code, "rev-parse", "HEAD"], {
    encoding: "utf-8",
    timeout: 10_000,
  }).trim()

const BUILD_CEILING_MS = 60_000

type Built = { graph: Graph; declared: ReadonlyMap<string, EdgeTypeDef> }

const buildK8s = async (): Promise<Built> => {
  const declared = new Map<string, EdgeTypeDef>()
  const engine = recording(declared)
  registerPackageTypes(engine)
  registerK8sNodeTypes(engine)
  registerFileNodeTypes(engine)
  registerPipelineTypes(engine)
  registerK8sSynthEdgeTypes(engine)
  engine.registerProducer(packageNodeProducer)
  engine.registerProducer(k8sNodeProducer)
  engine.registerProducer(fileNodeProducer)
  engine.registerProducer(pipelineNodeProducer)
  engine.registerProducer(k8sEdgeProducer)
  engine.registerProducer(rbacEdgeProducer)
  engine.registerProducer(yamlFileEdgeProducer)
  engine.registerProducer(k8sSynthNodeProducer)
  engine.registerProducer(k8sSynthEdgeProducer)
  return { graph: await engine.build(readRepos(headCommit())), declared }
}

const report = (name: string, built: Built, reading: Reading): undefined => {
  console.log(
    `graph-edge-endpoints ${name}: ${reading.resolved} endpoint(s) resolved over ${built.graph.edges().length} edge(s) against ${built.declared.size} declared edge type(s)`
  )
}

describe("an edge in the standing graph lands on nodes of the types its edge type declares", () => {
  test("every k8s edge whose endpoint a node answers to lands on the declared type", async () => {
    const built = await buildK8s()
    const reading = endpointsOf(built.graph, built.declared)
    report("k8s", built, reading)
    console.log(
      `graph-edge-endpoints k8s: ${built.graph.nodes("k8s-resource").length} k8s-resource, ${built.graph.nodes("namespace-role").length} namespace-role, ${built.graph.nodes("node-hostname").length} node-hostname`
    )
    expect(built.graph.nodes("k8s-resource").length).toBeGreaterThan(0)
    expect(built.graph.nodes("namespace-role").length).toBeGreaterThan(0)
    expect(reading.resolved).toBeGreaterThan(0)
    expect(reading.misplaced).toEqual([])
  }, BUILD_CEILING_MS)
})
