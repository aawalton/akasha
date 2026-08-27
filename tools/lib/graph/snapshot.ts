import { existsSync, readdirSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { createEngine } from "./engine.ts"
import { readRepos } from "./repos.ts"
import type { Engine, Graph, Producer } from "./types.ts"

export const PRODUCERS_DIR = join(dirname(fileURLToPath(import.meta.url)), "producers")

const REGISTRAR_FILE = "register.ts"

const PRODUCER_SUFFIX = ".producer.ts"

export const registrarPaths = (root: string): readonly string[] =>
  readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => join(root, entry.name, REGISTRAR_FILE))
    .filter((path) => existsSync(path))
    .sort()

export const producerPaths = (root: string): readonly string[] =>
  readdirSync(root, { recursive: true, encoding: "utf-8" })
    .filter((rel) => rel.endsWith(PRODUCER_SUFFIX))
    .map((rel) => join(root, rel))
    .sort()

export const applyRegistrars = async (
  engine: Engine,
  paths: readonly string[]
): Promise<undefined> => {
  for (const path of paths) {
    const module = (await import(path)) as Record<string, unknown>
    const called = Object.keys(module)
      .sort()
      .filter((name) => typeof module[name] === "function")
    if (called.length === 0) {
      throw new Error(`graph: ${path} stands as a registrar and hands back nothing to call`)
    }
    for (const name of called) (module[name] as (engine: Engine) => void)(engine)
  }
}

export const registerProducers = async (
  engine: Engine,
  paths: readonly string[]
): Promise<undefined> => {
  for (const path of paths) {
    const module = (await import(path)) as { readonly default?: Producer }
    const producer = module.default
    if (producer === undefined) {
      throw new Error(`graph: ${path} is named as a producer and hands back none`)
    }
    engine.registerProducer(producer)
  }
}

export const assembleEngine = async (root: string = PRODUCERS_DIR): Promise<Engine> => {
  const engine = createEngine()
  await applyRegistrars(engine, registrarPaths(root))
  await registerProducers(engine, producerPaths(root))
  return engine
}

export const buildSnapshot = async (commit: string): Promise<Graph> =>
  (await assembleEngine()).build(readRepos(commit))
