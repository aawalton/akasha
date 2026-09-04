import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import { isCoveredByWorkspaceGlob, listWorkspaceDirs } from "./workspace-dirs.module.code.ts"

const SCRATCH = scratchWorld()

afterAll(SCRATCH.sweep)

function rootWith(workspaces: readonly string[]): string {
  const root = SCRATCH.rootFor("workspace-dirs-")
  writeFileSync(join(root, "package.json"), JSON.stringify({ workspaces }))
  return root
}

function packageAt(root: string, rel: string): undefined {
  mkdirSync(join(root, rel), { recursive: true })
  writeFileSync(join(root, rel, "package.json"), "{}")
  return undefined
}

test("a doubled star finds a package at any depth, nested packages among them", () => {
  const root = rootWith(["akasha/**"])
  packageAt(root, "akasha/temper")
  packageAt(root, "akasha/temper/temper-lib-table-functions")
  packageAt(root, "akasha/code-system/eso-addon/ios-apps/one")
  expect(listWorkspaceDirs(root)).toEqual([
    "akasha/code-system/eso-addon/ios-apps/one",
    "akasha/temper",
    "akasha/temper/temper-lib-table-functions",
  ])
})

test("a doubled star leaves out the folder of linked packages", () => {
  const root = rootWith(["akasha/**"])
  packageAt(root, "akasha/temper")
  packageAt(root, "akasha/temper/node_modules/@akasha/temper-lib-async")
  expect(listWorkspaceDirs(root)).toEqual(["akasha/temper"])
})

test("a folder holding no manifest is left out of either expansion", () => {
  const root = rootWith(["akasha/**", "infra/*"])
  mkdirSync(join(root, "akasha/day"), { recursive: true })
  mkdirSync(join(root, "infra/notes"), { recursive: true })
  packageAt(root, "infra/scripts")
  expect(listWorkspaceDirs(root)).toEqual(["infra/scripts"])
})

test("a single star is expanded one folder down for each star", () => {
  const root = rootWith(["lua-compiler/vendor/*"])
  packageAt(root, "lua-compiler/vendor/one")
  packageAt(root, "lua-compiler/vendor/one/deeper")
  expect(listWorkspaceDirs(root)).toEqual(["lua-compiler/vendor/one"])
})

test("an entry naming no glob is carried through as it is", () => {
  const root = rootWith(["temper/addons"])
  expect(listWorkspaceDirs(root)).toEqual(["temper/addons"])
})

test("a glob of any other shape is thrown on", () => {
  const root = rootWith(["temper/*/src"])
  expect(() => listWorkspaceDirs(root)).toThrow("unsupported workspaces glob")
})

test("a doubled star covers a path at any depth below its prefix", () => {
  expect(isCoveredByWorkspaceGlob(["akasha/**"], "akasha/temper")).toBe(true)
  expect(isCoveredByWorkspaceGlob(["akasha/**"], "akasha/temper/temper-lib-async")).toBe(true)
  expect(isCoveredByWorkspaceGlob(["akasha/**"], "akasha")).toBe(false)
  expect(isCoveredByWorkspaceGlob(["akasha/**"], "temper/addons")).toBe(false)
})

test("a single star covers only a path one folder down", () => {
  expect(isCoveredByWorkspaceGlob(["infra/*"], "infra/scripts")).toBe(true)
  expect(isCoveredByWorkspaceGlob(["infra/*"], "infra/scripts/src")).toBe(false)
})

test("a doubled star carrying no prefix is expanded from the repository root", () => {
  const root = rootWith(["**"])
  packageAt(root, "temper")
  packageAt(root, "temper/temper-lib-table-functions")
  packageAt(root, "language-design/lua-compiler")
  expect(listWorkspaceDirs(root)).toEqual([
    "language-design/lua-compiler",
    "temper",
    "temper/temper-lib-table-functions",
  ])
})

test("a doubled star carrying no prefix leaves out a folder whose name opens with a dot", () => {
  const root = rootWith(["**"])
  packageAt(root, "temper")
  packageAt(root, ".git/data/one")
  packageAt(root, "temper/.cache/two")
  expect(listWorkspaceDirs(root)).toEqual(["temper"])
})

test("a doubled star carrying no prefix leaves out the folder of linked packages", () => {
  const root = rootWith(["**"])
  packageAt(root, "temper")
  packageAt(root, "node_modules/@akasha/temper-lib-async")
  expect(listWorkspaceDirs(root)).toEqual(["temper"])
})

test("a doubled star carrying no prefix covers every path below the root", () => {
  expect(isCoveredByWorkspaceGlob(["**"], "temper")).toBe(true)
  expect(isCoveredByWorkspaceGlob(["**"], "temper/temper-lib-async")).toBe(true)
  expect(isCoveredByWorkspaceGlob(["**"], "")).toBe(false)
})
