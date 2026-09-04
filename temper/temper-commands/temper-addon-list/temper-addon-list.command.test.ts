import { afterAll, expect, test } from "bun:test"
import { mkdirSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import { temperAddonList } from "./temper-addon-list.command.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const FLAT = "TemperFlat"
const NESTED = "TemperNested"
const NESTED_DIR = "akasha/temper/temper-nested-addon"

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
  const root = scratch.rootFor("temper-list-root-")
  writeFileSync(
    join(root, "package.json"),
    JSON.stringify({ name: "scratch", workspaces: ["akasha/temper/*"] })
  )

  const flat = join(root, "temper/addons", FLAT)
  mkdirSync(flat, { recursive: true })
  writeFileSync(join(flat, "addon.json"), manifestFor(FLAT))

  const nested = join(root, NESTED_DIR)
  mkdirSync(nested, { recursive: true })
  writeFileSync(join(nested, "addon.json"), manifestFor(NESTED))
  writeFileSync(
    join(nested, "package.json"),
    JSON.stringify({ name: "@akasha/temper-nested-addon", dependencies: {} })
  )
  return root
}

test("the flat layout and the nested layout are both named", () => {
  const root = fixtureFor()
  const said = temperAddonList(["--repo-root", root])
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  const whole = said.report.join("\n")
  expect(whole).toContain(FLAT)
  expect(whole).toContain(NESTED)
  expect(whole).toContain("2 addon(s)")
})

test("each addon is named beside the folder it was found in", () => {
  const root = fixtureFor()
  const said = temperAddonList(["--repo-root", root])
  expect(said.report.join("\n")).toContain(NESTED_DIR)
  expect(said.report.join("\n")).toContain(`temper/addons/${FLAT}`)
})

test("the roster is read from the checkout named rather than from this one", () => {
  const root = fixtureFor()
  const said = temperAddonList(["--repo-root", root])
  expect(said.report.join("\n")).not.toContain("TemperInventory")
  expect(said.report.join("\n")).toContain("2 addon(s)")
})

test("a checkout holding no addon is refused rather than reported empty", () => {
  const root = fixtureFor()
  rmSync(join(root, "temper/addons", FLAT), { recursive: true, force: true })
  rmSync(join(root, NESTED_DIR), { recursive: true, force: true })
  const said = temperAddonList(["--repo-root", root])
  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("holds no addon folder")
})

test("the json answer parses and carries one record per addon", () => {
  const root = fixtureFor()
  const said = temperAddonList(["--repo-root", root, "--json"])
  expect(said.code).toBe(0)
  const parsed = JSON.parse(said.report.join("\n")) as readonly { canonicalName: string }[]
  expect(parsed.length).toBe(2)
  expect(parsed.map((one) => one.canonicalName).sort()).toEqual([FLAT, NESTED])
})

test("the closure each addon reaches is counted rather than left off", () => {
  const root = fixtureFor()
  const said = temperAddonList(["--repo-root", root])
  expect(said.report.join("\n")).toContain("closure=1")
})
