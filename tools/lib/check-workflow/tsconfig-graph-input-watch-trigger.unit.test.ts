import { describe, expect, it } from "bun:test"
import { closureIntersectsChangedFiles } from "../ci-worker-pure/closure-reach.ts"
import { createGraph } from "../graph/graph.ts"
import type { Edge, Node } from "../graph/types.ts"
import { codeRoot as ownCodeRoot } from "../code-root.ts"
import { declaredCheckEntries } from "./declared-check-configs.ts"

const PKG_PATH = "scope/p"

const PKG_ID = "package:code:@scope/p"

const NESTED_TSCONFIG = `${PKG_PATH}/tsconfig.json`

const NESTED_MANIFEST = `${PKG_PATH}/package.json`

const SOURCE = `${PKG_PATH}/src/a.ts`

const UNRELATED = `${PKG_PATH}/README.md`

const ROOT_TSCONFIG = "tsconfig.base.json"

const ROOT_MANIFEST = "package.json"

const LOCKFILE = "bun.lock"

const GRAPH_CHECKS = ["typecheck"] as const

const fileNode = (type: string, path: string): Node => ({
  type,
  id: `${type}:code:${path}`,
  key: path,
  repo: "code",
  attrs: { path },
  derived: {},
})

const contains = (to: string): Edge => ({
  type: "pkg-contains-file",
  from: PKG_ID,
  to,
  attrs: {},
  derived: {},
})

const graph = createGraph(
  [
    {
      type: "package",
      id: PKG_ID,
      key: "@scope/p",
      repo: "code",
      attrs: { path: PKG_PATH },
      derived: {},
    },
    fileNode("json-file", NESTED_TSCONFIG),
    fileNode("tsconfig-file", NESTED_TSCONFIG),
    fileNode("json-file", ROOT_TSCONFIG),
    fileNode("tsconfig-file", ROOT_TSCONFIG),
    fileNode("json-file", NESTED_MANIFEST),
    fileNode("json-file", ROOT_MANIFEST),
    fileNode("lock-file", LOCKFILE),
    fileNode("ts-file", SOURCE),
    fileNode("md-file", UNRELATED),
  ],
  [
    contains(`json-file:code:${NESTED_TSCONFIG}`),
    contains(`json-file:code:${NESTED_MANIFEST}`),
    contains(`ts-file:code:${SOURCE}`),
  ]
)

const codeRoot = process.env.WORKSPACE ?? ownCodeRoot()

const { entries } = await declaredCheckEntries(codeRoot)

const listAt = (config: Record<string, unknown>, field: string): readonly unknown[] => {
  const held = config[field]
  return Array.isArray(held) ? held : []
}

const configOf = (name: string): Record<string, unknown> => {
  const found = entries.find((one) => one.config.name === name)
  if (found === undefined) {
    throw new Error(
      `no check named "${name}" stands in the declared tables, so this file would decide nothing about it`
    )
  }
  return found.config
}

const wakes = (name: string, changed: readonly string[]): boolean => {
  const config = configOf(name)
  return closureIntersectsChangedFiles(
    graph,
    {
      nodes: listAt(config, "dispatchNodes") as readonly string[],
      nodeTypes: listAt(config, "dispatchNodeTypes") as readonly string[],
    },
    changed
  )
}

describe("tsconfig wakes every check built on the module graph", () => {
  it("finds every check it decides about, so a renamed one fails here rather than passing vacuously", () => {
    expect([...GRAPH_CHECKS, "unused-deps"].map((name) => configOf(name).name)).toEqual([
      ...GRAPH_CHECKS,
      "unused-deps",
    ])
  })

  it("seeds a non-empty set, so every case below decides something", () => {
    for (const name of GRAPH_CHECKS) {
      expect([name, wakes(name, [UNRELATED])]).toEqual([name, false])
    }
  })

  it("wakes on a tsconfig inside a package", () => {
    for (const name of GRAPH_CHECKS) {
      expect([name, wakes(name, [NESTED_TSCONFIG])]).toEqual([name, true])
    }
  })

  it("wakes on a tsconfig at the repo root, which no package population reaches", () => {
    for (const name of GRAPH_CHECKS) {
      expect([name, wakes(name, [ROOT_TSCONFIG])]).toEqual([name, true])
    }
  })

  it("still wakes on a TypeScript source", () => {
    for (const name of GRAPH_CHECKS) {
      expect([name, wakes(name, [SOURCE])]).toEqual([name, true])
    }
  })
})

describe("typecheck reaches the root inputs it is declared over", () => {
  it("wakes on the root manifest and the lockfile", () => {
    expect(wakes("typecheck", [ROOT_MANIFEST])).toBe(true)
    expect(wakes("typecheck", [LOCKFILE])).toBe(true)
  })

  it("still wakes on a manifest inside a package", () => {
    expect(wakes("typecheck", [NESTED_MANIFEST])).toBe(true)
  })
})

describe("the narrow population is added rather than carved out", () => {
  it("leaves every generic-json consumer reaching tsconfigs", () => {
    expect(wakes("unused-deps", [NESTED_TSCONFIG])).toBe(true)
    expect(wakes("unused-deps", [ROOT_TSCONFIG])).toBe(true)
  })
})
