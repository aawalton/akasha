import { afterAll, expect, test } from "bun:test"
import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import {
  appendAddonSavedVars,
  appendMarkerName,
} from "akasha/temper/eso/saved-variable/saved-vars-migration/modules/saved-vars-migration/saved-vars-migration.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const SPEC = {
  absorbedFileBase: "Old",
  absorbedGlobal: "Old_Settings",
  targetFileBase: "New",
}

function savedVarsDir(): string {
  const dir = scratch.rootFor("temper-sv-append-")
  writeFileSync(join(dir, "Old.lua"), "Old_Settings =\n{\n    a = 1,\n}\n")
  writeFileSync(join(dir, "New.lua"), "New_Settings =\n{\n}\n")
  return dir
}

test("an append writes the absorbed global into the target once", () => {
  const dir = savedVarsDir()
  expect(appendAddonSavedVars(SPEC, { savedVarsDir: dir }).kind).toBe("appended")
  expect(readFileSync(join(dir, "New.lua"), "utf-8")).toContain("Old_Settings =")
})

test("an append already made is never made again, even once the game drops the global", () => {
  const dir = savedVarsDir()
  appendAddonSavedVars(SPEC, { savedVarsDir: dir })
  writeFileSync(join(dir, "New.lua"), "New_Settings =\n{\n}\n")
  expect(appendAddonSavedVars(SPEC, { savedVarsDir: dir }).kind).toBe("skip-already-appended")
  expect(readFileSync(join(dir, "New.lua"), "utf-8")).not.toContain("Old_Settings")
})

test("the marker is named for the target and the global it lands as", () => {
  expect(appendMarkerName({ ...SPEC, renamedTo: "New_Old" })).toBe("append-New-New_Old.json")
})
