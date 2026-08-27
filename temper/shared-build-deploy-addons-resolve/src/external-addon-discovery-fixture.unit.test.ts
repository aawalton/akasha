import { afterAll, beforeAll, describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { listAllAddons, listExternalAddonRelDirs } from "./index"

const NEW_ADDON_REL = "temper/newthing-addon"
const HOST_REL = "temper/newthing-core"
const FLAT_REL = "temper/addons/FlatFoo"
const STRAY_REL = "temper/stray-addon"

let root: string

beforeAll(() => {
  root = mkdtempSync(join(tmpdir(), "addon-discovery-15677-"))

  const writeJson = (rel: string, obj: unknown): undefined => {
    const dir = join(root, rel)
    mkdirSync(dir, { recursive: true })
    writeFileSync(join(dir, "package.json"), JSON.stringify(obj))
  }
  const writeAddonJson = (rel: string, name: string): undefined => {
    writeFileSync(join(root, rel, "addon.json"), JSON.stringify({ name }))
  }

  writeFileSync(
    join(root, "package.json"),
    JSON.stringify({ name: "fixture-root", workspaces: [NEW_ADDON_REL, HOST_REL, FLAT_REL] })
  )

  writeJson(NEW_ADDON_REL, { name: "@fixture/newthing-addon" })
  writeAddonJson(NEW_ADDON_REL, "TemperNewThing")

  writeJson(HOST_REL, { name: "@fixture/newthing-core" })

  writeJson(FLAT_REL, { name: "@fixture/flat-foo" })
  writeAddonJson(FLAT_REL, "FlatFoo")

  mkdirSync(join(root, STRAY_REL), { recursive: true })
  writeAddonJson(STRAY_REL, "TemperStray")
})

afterAll(() => {
  rmSync(root, { recursive: true, force: true })
})

describe("nested-addon discovery discriminates on the on-disk workspace tree", () => {
  test("CATCHES a brand-new nested addon from disk (the exact #15656/#14456 bad shape)", () => {
    expect(listExternalAddonRelDirs(root)).toContain(NEW_ADDON_REL)
    const names = listAllAddons({ repoRoot: root }).map((a) => a.canonicalName)
    expect(names).toContain("TemperNewThing")
  })

  test("EXCLUDES a workspace dir without an addon.json (non-vacuity)", () => {
    expect(listExternalAddonRelDirs(root)).not.toContain(HOST_REL)
  })

  test("EXCLUDES a non-workspace dir even though it carries an addon.json (workspace filter)", () => {
    expect(listExternalAddonRelDirs(root)).not.toContain(STRAY_REL)
    expect(listAllAddons({ repoRoot: root }).map((a) => a.canonicalName)).not.toContain(
      "TemperStray"
    )
  })

  test("EXCLUDES the flat-layout addon from external discovery (owned by the flat scan)", () => {
    expect(listExternalAddonRelDirs(root)).not.toContain(FLAT_REL)
    expect(listAllAddons({ repoRoot: root }).map((a) => a.canonicalName)).toContain("FlatFoo")
  })
})
