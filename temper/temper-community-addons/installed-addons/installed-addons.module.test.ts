import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import { parseManifestVersion, readInstalledAddons } from "./installed-addons.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

test("a version is read from the manifest's own version line", () => {
  expect(parseManifestVersion("## Title: A\n## Version: 7.0\n")).toBe("7.0")
  expect(parseManifestVersion("## version:  7.0  \n")).toBe("7.0")
  expect(parseManifestVersion("## Title: A\n")).toBeUndefined()
})

test("a folder is one addon and a loose file is none", () => {
  const root = scratch.rootFor("temper-installed-")
  mkdirSync(join(root, "LibGPS"))
  writeFileSync(join(root, "LibGPS", "LibGPS.txt"), "## Version: 7.0\n")
  mkdirSync(join(root, "Older"))
  writeFileSync(join(root, "Older", "Older.addon"), "## Version: 1.0\n")
  mkdirSync(join(root, "Bare"))
  writeFileSync(join(root, "loose.txt"), "## Version: 9\n")
  return readInstalledAddons(root).then((held) => {
    expect(held).toEqual([
      { dir: "Bare", version: undefined },
      { dir: "LibGPS", version: "7.0" },
      { dir: "Older", version: "1.0" },
    ])
  })
})
