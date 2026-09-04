import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import { temperAddonResolve } from "./temper-addon-resolve.command.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const NESTED = "TemperNested"
const NESTED_LEAF = "temper-nested-addon"
const NESTED_DIR = `akasha/temper/${NESTED_LEAF}`

function manifestFor(name: string): string {
  return JSON.stringify({
    name,
    title: name,
    description: `${name} for a test`,
    author: "test",
    version: "1.0.0",
    addonVersion: 100,
    apiVersion: ["101041"],
    savedVariables: [],
    dependsOn: [],
  })
}

function fixtureFor(): string {
  const root = scratch.rootFor("temper-resolve-root-")
  writeFileSync(
    join(root, "package.json"),
    JSON.stringify({ name: "scratch", workspaces: ["akasha/temper/*"] })
  )
  const nested = join(root, NESTED_DIR)
  mkdirSync(nested, { recursive: true })
  writeFileSync(join(nested, "addon.json"), manifestFor(NESTED))
  writeFileSync(
    join(nested, "package.json"),
    JSON.stringify({ name: `@akasha/${NESTED_LEAF}`, dependencies: {} })
  )
  return root
}

function reached(root: string, name: string): { canonicalName: string; dir: string } {
  const said = temperAddonResolve([name, "--repo-root", root])
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  return JSON.parse(said.report.join("\n")) as { canonicalName: string; dir: string }
}

test("a canonical name reaches the addon", () => {
  const root = fixtureFor()
  expect(reached(root, NESTED).canonicalName).toBe(NESTED)
})

test("the directory leaf reaches the same addon the canonical name does", () => {
  const root = fixtureFor()
  expect(reached(root, NESTED_LEAF).dir).toBe(reached(root, NESTED).dir)
})

test("the parent domain reaches the same addon the canonical name does", () => {
  const root = fixtureFor()
  expect(reached(root, "temper").dir).toBe(reached(root, NESTED).dir)
})

test("a name reaching no addon is refused by that name rather than answered", () => {
  const root = fixtureFor()
  const said = temperAddonResolve(["NotAnAddonHere", "--repo-root", root])
  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("NotAnAddonHere")
  expect(said.refusals.join("\n")).toContain("reaches no addon")
})

test("naming no addon at all is refused", () => {
  const root = fixtureFor()
  const said = temperAddonResolve(["--repo-root", root])
  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("names the addon resolved")
})

test("the checkout named is the one resolved in", () => {
  const root = fixtureFor()
  expect(reached(root, NESTED).dir.startsWith(root)).toBe(true)
})
