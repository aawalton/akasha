import { afterEach, describe, expect, test } from "bun:test"
import {
  lstatSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readlinkSync,
  realpathSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs"
import { dirname, join, resolve } from "node:path"
import {
  linkModulesInto,
  workspacesDeclaredIn,
} from "../lib/main-pipeline-creator/sha-pinned-tree.ts"

const made: string[] = []

afterEach(() => {
  for (const one of made.splice(0)) rmSync(one, { recursive: true, force: true })
})

function scratch(): string {
  const one = realpathSync(mkdtempSync("/var/tmp/sha-pinned-tree-"))
  made.push(one)
  return one
}

function writeJson(path: string, held: unknown): undefined {
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, JSON.stringify(held))
}

function packageAt(root: string, dir: string, named: string): undefined {
  writeJson(join(root, dir, "package.json"), { name: named, version: "0.0.0" })
}

const WORKSPACES: ReadonlyMap<string, string> = new Map([
  ["@infra/workflow-dsl", "packages/infra/workflow-dsl"],
  ["@infra/ci-worker", "packages/infra/ci/worker"],
])

function treeDeclaring(names: ReadonlyMap<string, string>): string {
  const root = scratch()
  writeJson(join(root, "package.json"), {
    name: "root",
    workspaces: ["packages/*/*", "packages/*/*/*"],
  })
  for (const [named, dir] of names) packageAt(root, dir, named)
  return root
}

function hostWith(entries: ReadonlyMap<string, string | null>): string {
  const host = scratch()
  const modules = join(host, "node_modules")
  mkdirSync(modules, { recursive: true })
  for (const [entry, target] of entries) {
    const at = join(modules, entry)
    mkdirSync(dirname(at), { recursive: true })
    if (target === null) {
      mkdirSync(at, { recursive: true })
      continue
    }
    packageAt(host, target, entry)
    symlinkSync(join(host, target), at)
  }
  return host
}

function targetOf(modules: string, entry: string): string {
  const at = join(modules, entry)
  return resolve(dirname(at), readlinkSync(at))
}

function scopeEntries(modules: string, scope: string): readonly string[] {
  const at = join(modules, scope)
  return readdirSync(at).filter((one) => lstatSync(join(at, one)).isSymbolicLink())
}

describe("workspacesDeclaredIn", () => {
  test("names every workspace the tree's own root package.json reaches", async () => {
    const pinned = treeDeclaring(WORKSPACES)
    expect(await workspacesDeclaredIn(pinned)).toEqual(new Map(WORKSPACES))
  })

  test("a tree declaring no workspaces answers empty, which is what the caller refuses on", async () => {
    const pinned = scratch()
    writeJson(join(pinned, "package.json"), { name: "root" })
    expect((await workspacesDeclaredIn(pinned)).size).toBe(0)
  })
})

describe("linkModulesInto", () => {
  test("every workspace the tree declares resolves inside the tree, never against the host", () => {
    const pinned = treeDeclaring(WORKSPACES)
    const host = hostWith(
      new Map([
        ["zod", null],
        ["@infra/workflow-dsl", "packages/infra/workflow-dsl"],
        ["@infra/ci-worker", "packages/infra/ci/worker"],
      ])
    )

    linkModulesInto(pinned, host, WORKSPACES)

    const modules = join(pinned, "node_modules")
    for (const [named, dir] of WORKSPACES) {
      expect(targetOf(modules, named)).toBe(join(pinned, dir))
    }
  })

  test("a package the tree does not declare still comes from the host", () => {
    const pinned = treeDeclaring(WORKSPACES)
    const host = hostWith(new Map([["zod", null]]))

    linkModulesInto(pinned, host, WORKSPACES)

    expect(targetOf(join(pinned, "node_modules"), "zod")).toBe(join(host, "node_modules", "zod"))
  })

  test("a host entry that is itself a link into the host is left out rather than carried in", () => {
    const pinned = treeDeclaring(WORKSPACES)
    const host = hostWith(
      new Map([
        ["@infra/workflow-dsl", "packages/infra/workflow-dsl"],
        ["@infra/gone-from-this-commit", "packages/infra/gone"],
      ])
    )

    linkModulesInto(pinned, host, WORKSPACES)

    const modules = join(pinned, "node_modules")
    expect(scopeEntries(modules, "@infra").toSorted()).toEqual(["ci-worker", "workflow-dsl"])
  })

  test("reports how many workspaces it linked", () => {
    const pinned = treeDeclaring(WORKSPACES)
    const host = hostWith(new Map([["zod", null]]))
    expect(linkModulesInto(pinned, host, WORKSPACES)).toBe(WORKSPACES.size)
  })
})
