import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import {
  computeWorkspaceClosure,
  loadWorkspaceCatalog,
  repoRelOf,
} from "./workspace-closure.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function laidOut(packages: Readonly<Record<string, unknown>>): string {
  const root = scratch.rootFor("temper-closure-")
  writeFileSync(
    join(root, "package.json"),
    JSON.stringify({ name: "root", workspaces: Object.keys(packages) })
  )
  for (const [rel, manifest] of Object.entries(packages)) {
    mkdirSync(join(root, rel), { recursive: true })
    writeFileSync(join(root, rel, "package.json"), JSON.stringify(manifest))
  }
  return root
}

test("a package is in its own closure", () => {
  const root = laidOut({ a: { name: "a" } })
  expect(computeWorkspaceClosure("a", root, loadWorkspaceCatalog(root))).toEqual(["a"])
})

test("a workspace dependency is followed and a registry one is left", () => {
  const root = laidOut({
    a: { name: "a", dependencies: { b: "workspace:*", zod: "^4.0.0" } },
    b: { name: "b", devDependencies: { c: "workspace:*" } },
    c: { name: "c" },
  })
  expect(computeWorkspaceClosure("a", root, loadWorkspaceCatalog(root))).toEqual(["a", "b", "c"])
})

test("a package name the workspace does not answer to is skipped", () => {
  const root = laidOut({ a: { name: "a", dependencies: { gone: "workspace:*" } } })
  expect(computeWorkspaceClosure("a", root, loadWorkspaceCatalog(root))).toEqual(["a"])
})

test("a directory is named relative to the repository root with forward slashes", () => {
  expect(repoRelOf("/repo", "/repo/temper/addons")).toBe("temper/addons")
})
