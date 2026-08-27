import { afterEach, describe, expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  assertSafeSiblingName,
  readSiblingAddonNames,
  SIBLING_ADDONS_DIR,
  siblingDistDir,
  siblingSourceDir,
} from "./sibling-addons"

const SCRATCH_ROOT = "/var/tmp"

const made: string[] = []

function packageDir(addonJson: string | null): string {
  const dir = mkdtempSync(join(SCRATCH_ROOT, "sibling-addons-"))
  made.push(dir)
  if (addonJson !== null) writeFileSync(join(dir, "addon.json"), addonJson)
  return dir
}

afterEach(() => {
  for (const dir of made.splice(0)) rmSync(dir, { recursive: true, force: true })
})

describe("readSiblingAddonNames", () => {
  test("reads the names a package declares", () => {
    const dir = packageDir('{"name":"X","siblingAddons":["LibMediaProvider-1.0"]}')
    expect(readSiblingAddonNames(dir)).toEqual(["LibMediaProvider-1.0"])
  })

  test("a package declaring none emits none", () => {
    expect(readSiblingAddonNames(packageDir('{"name":"X"}'))).toEqual([])
  })

  test("a package with no addon.json emits none", () => {
    expect(readSiblingAddonNames(packageDir(null))).toEqual([])
  })

  test("unparseable addon.json emits none rather than throwing", () => {
    expect(readSiblingAddonNames(packageDir("{ not json"))).toEqual([])
  })

  test("an unusable declared name is refused at the read, before any path is built from it", () => {
    const dir = packageDir('{"name":"X","siblingAddons":["../../etc"]}')
    expect(() => readSiblingAddonNames(dir)).toThrow(/not a usable addon folder name/)
  })
})

describe("assertSafeSiblingName", () => {
  test.each([
    ["LibMediaProvider-1.0"],
    ["LibAddonMenu-2.0"],
    ["TemperHud"],
    ["a_b.c-1"],
  ])("accepts %p, an ESO addon folder name", (name) => {
    expect(() => assertSafeSiblingName(name)).not.toThrow()
  })

  test.each([
    ["../escape"],
    ["a/b"],
    [".."],
    ["."],
    [""],
    ["-leading"],
    ["with space"],
  ])("refuses %p, which would become a path that gets removed and recreated", (name) => {
    expect(() => assertSafeSiblingName(name)).toThrow()
  })
})

describe("sibling paths", () => {
  test("source stands under the package's siblings directory, outside metadata", () => {
    expect(siblingSourceDir("/pkg", "LibMediaProvider-1.0")).toBe(
      join("/pkg", SIBLING_ADDONS_DIR, "LibMediaProvider-1.0")
    )
    expect(SIBLING_ADDONS_DIR).not.toBe("metadata")
  })

  test("dist stands beside the owner's own folder rather than inside it", () => {
    expect(siblingDistDir("/addons", "LibMediaProvider-1.0")).toBe(
      join("/addons", "dist", "LibMediaProvider-1.0")
    )
  })

  test.each([
    [siblingDistDir],
    [siblingSourceDir],
  ])("%p refuses an unsafe name before it becomes a path", (makePath) => {
    expect(() => makePath("/root", "../../escape")).toThrow()
  })
})
