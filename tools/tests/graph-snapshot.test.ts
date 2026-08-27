import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { afterAll, describe, expect, test } from "bun:test"
import { validateProducers } from "../lib/graph/producer-run.ts"
import {
  applyRegistrars,
  assembleEngine,
  PRODUCERS_DIR,
  producerPaths,
  registerProducers,
  registrarPaths,
} from "../lib/graph/snapshot.ts"
import type { EdgeTypeDef, Engine, NodeTypeDef, Producer } from "../lib/graph/types.ts"

const planted: string[] = []

const plant = (files: Record<string, string>): string => {
  const root = mkdtempSync(join(tmpdir(), "graph-snapshot-"))
  planted.push(root)
  for (const [rel, body] of Object.entries(files)) {
    const path = join(root, rel)
    mkdirSync(join(path, ".."), { recursive: true })
    writeFileSync(path, body)
  }
  return root
}

afterAll(() => {
  for (const root of planted) rmSync(root, { recursive: true, force: true })
})

type Registry = {
  readonly nodeTypes: Map<string, NodeTypeDef>
  readonly edgeTypes: Map<string, EdgeTypeDef>
  readonly producers: Producer[]
}

const recorded = async (): Promise<Registry> => {
  const registry: Registry = { nodeTypes: new Map(), edgeTypes: new Map(), producers: [] }
  const engine: Engine = {
    registerNodeType: (def) => {
      registry.nodeTypes.set(def.name, def)
    },
    registerEdgeType: (def) => {
      registry.edgeTypes.set(def.name, def)
    },
    registerProducer: (producer) => {
      registry.producers.push(producer)
    },
    registerDeriver: () => undefined,
    build: () => {
      throw new Error("this engine only records what was registered on it")
    },
  }
  await applyRegistrars(engine, registrarPaths(PRODUCERS_DIR))
  await registerProducers(engine, producerPaths(PRODUCERS_DIR))
  return registry
}

const relative = (paths: readonly string[]): readonly string[] =>
  paths.map((path) => path.slice(PRODUCERS_DIR.length + 1))

describe("what the snapshot assembles is found rather than listed", () => {
  test("each producer folder's own registrar is taken, and the ones it composes are left to it", () => {
    const found = relative(registrarPaths(PRODUCERS_DIR))
    expect(found).toContain("pipeline/register.ts")
    expect(found).toContain("cluster-check/register.ts")
    expect(found).toContain("file/register.ts")
    expect(found).not.toContain("file/ts-file/register.ts")
    expect(found.every((rel) => rel.split("/").length === 2)).toBe(true)
  })

  test("a folder holding no registrar is passed over rather than refused", () => {
    expect(relative(registrarPaths(PRODUCERS_DIR))).not.toContain("lib/register.ts")
  })

  test("a producer is found at whatever depth it sits", () => {
    const found = relative(producerPaths(PRODUCERS_DIR))
    expect(found).toContain("pipeline/pipeline.node.producer.ts")
    expect(found).toContain("file/ts-file/ts-file.edge.producer.ts")
    expect(found).toContain("cluster-check/cluster-check.node.producer.ts")
  })

  test("a file named as a producer and handing back none is refused", async () => {
    const root = plant({
      "one/register.ts": `export const registerOne = (): undefined => undefined\n`,
      "one/one.node.producer.ts": `export const one = 1\n`,
    })
    expect(assembleEngine(root)).rejects.toThrow(/hands back none/)
  })

  test("a registrar handing back nothing to call is refused", async () => {
    const root = plant({ "one/register.ts": `export const name = "one"\n` })
    expect(assembleEngine(root)).rejects.toThrow(/nothing to call/)
  })
})

describe("every producer standing here composes into one registry", () => {
  test("every type a producer declares was registered by some registrar", async () => {
    const registry = await recorded()
    expect(registry.producers.length).toBeGreaterThan(0)
    expect(() =>
      validateProducers(registry.producers, registry.nodeTypes, registry.edgeTypes)
    ).not.toThrow()
  })

  test("every edge type runs between node types some registrar registered", async () => {
    const registry = await recorded()
    const dangling = [...registry.edgeTypes.values()].filter(
      (def) => !registry.nodeTypes.has(def.from) || !registry.nodeTypes.has(def.to)
    )
    expect(registry.edgeTypes.size).toBeGreaterThan(0)
    expect(dangling.map((def) => def.name)).toEqual([])
  })

  test("the check pages and the workflow steps they become meet in one registry", async () => {
    const registry = await recorded()
    expect(registry.nodeTypes.has("cluster-check")).toBe(true)
    expect(registry.nodeTypes.has("step")).toBe(true)
  })
})
