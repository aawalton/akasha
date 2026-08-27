import { afterEach, describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  ADDON_BUILD_COMMAND,
  ADDON_DIST_REL,
  addonDistRefusalLine,
  collectAddonDistBundles,
  refuseAddonDistPopulation,
} from "./addon-dist-bundles"

const roots: string[] = []

function scratchRoot(): string {
  const root = mkdtempSync("/var/tmp/addon-dist-bundles-")
  roots.push(root)
  return root
}

function writeBundle(root: string, relative: string): string {
  const path = join(root, ADDON_DIST_REL, relative)
  mkdirSync(join(path, ".."), { recursive: true })
  writeFileSync(path, "-- bundle\n")
  return path
}

afterEach(() => {
  while (roots.length > 0) {
    const root = roots.pop()
    if (root !== undefined) rmSync(root, { recursive: true, force: true })
  }
})

describe("collectAddonDistBundles", () => {
  test("an unbuilt tree yields an empty population, and still names where it looked", () => {
    const root = scratchRoot()
    const bundles = collectAddonDistBundles(root)
    expect(bundles.files).toEqual([])
    expect(bundles.distRoot).toBe(join(root, ADDON_DIST_REL))
  })

  test("a dist/ holding no .lua is empty too — the case a directory listing hides", () => {
    const root = scratchRoot()
    mkdirSync(join(root, ADDON_DIST_REL, "TemperInventory"), { recursive: true })
    expect(collectAddonDistBundles(root).files).toEqual([])
  })

  test("every emitted .lua comes back sorted, and nothing else does", () => {
    const root = scratchRoot()
    const hud = writeBundle(root, "TemperHud/TemperHud.lua")
    const inventory = writeBundle(root, "TemperInventory/TemperInventory.lua")
    const nested = writeBundle(root, "TemperInventory/lib/Helper.lua")
    writeBundle(root, "TemperInventory/TemperInventory.xml")
    expect(collectAddonDistBundles(root).files).toEqual([hud, inventory, nested].sort())
  })

  test("a .lua directly under dist/ is reached — the walk this replaced skipped it", () => {
    const root = scratchRoot()
    const loose = writeBundle(root, "Loose.lua")
    expect(collectAddonDistBundles(root).files).toEqual([loose])
  })
})

describe("the refusal", () => {
  const distRoot = "/nowhere/packages/temper/addons/dist"

  test("an absent tree names the gate, the root and the way out", () => {
    const line = addonDistRefusalLine("addon-sandbox-safety", { distRoot, files: [] }, 0)
    expect(line).toContain("EMPTY POPULATION")
    expect(line).toContain("addon-sandbox-safety")
    expect(line).toContain(distRoot)
    expect(line).toContain(ADDON_BUILD_COMMAND)
  })

  test("a tree that vanished mid-read reports the denominator it could not reach", () => {
    const line = addonDistRefusalLine(
      "tstl-anytable-length",
      { distRoot, files: ["a.lua", "b.lua"] },
      0
    )
    expect(line).toContain("over 0 of 2 addon bundles")
    expect(line).toContain("2 could not be examined")
  })

  test("refusing hands back 2 — the code that parts 'could not look' from 'found a defect'", () => {
    expect(refuseAddonDistPopulation("addon-sandbox-safety", { distRoot, files: [] }, 0)).toBe(2)
  })
})
