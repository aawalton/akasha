import { afterAll, describe, expect, test } from "bun:test"
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  type BundleMemberMigrationOutcome,
  extractMemberGlobalBlocks,
  isBundleMemberMigrated,
  migrateBundleMemberSavedVars,
} from "./extract-bundle-member-saved-vars"

const SCRATCH_ROOT = "/var/tmp"

const MERGED = [
  "TemperFoo_SavedVariables =",
  "{",
  '    ["Default"] =',
  "    {",
  '        ["nested"] = { ["a"] = 1, ["b"] = 2 },',
  '        ["list"] = { 1, 2, 3 },',
  "    },",
  "}",
  "TemperFoo_GlobalSavedVariables =",
  "{",
  '    ["useGlobal"] = true,',
  "}",
  "TemperBar_SavedVariables =",
  "{",
  '    ["x"] = 7,',
  "}",
  "",
].join("\n")

const made: string[] = []

afterAll(() => {
  for (const one of made) rmSync(one, { recursive: true, force: true })
})

function sandbox(): string {
  const dir = mkdtempSync(join(SCRATCH_ROOT, "sv-migrate-"))
  made.push(dir)
  return dir
}

function seedMerged(dir: string): undefined {
  writeFileSync(join(dir, "Temper.lua"), MERGED)
  return undefined
}

describe("extractMemberGlobalBlocks", () => {
  test("extracts a single global's full block, bounded by the column-0 close", () => {
    const { blocks, present, missing } = extractMemberGlobalBlocks(MERGED, [
      "TemperFoo_GlobalSavedVariables",
    ])
    expect(missing).toEqual([])
    expect(present).toEqual(["TemperFoo_GlobalSavedVariables"])
    expect(blocks).toEqual([
      "TemperFoo_GlobalSavedVariables =\n{\n" + '    ["useGlobal"] = true,\n}',
    ])
  })

  test("nested braces inside a value never trigger a false close", () => {
    const { blocks } = extractMemberGlobalBlocks(MERGED, ["TemperFoo_SavedVariables"])
    const block = blocks[0] ?? ""
    expect(block.startsWith("TemperFoo_SavedVariables =")).toBe(true)
    expect(block.endsWith("\n}")).toBe(true)
    expect(block).toContain('["nested"] = { ["a"] = 1, ["b"] = 2 }')
    expect(block).toContain('["list"] = { 1, 2, 3 }')
    const columnZeroCloses = block.split("\n").filter((l) => l.startsWith("}")).length
    expect(columnZeroCloses).toBe(1)
  })

  test("extracts multiple globals in input order", () => {
    const { blocks, present } = extractMemberGlobalBlocks(MERGED, [
      "TemperFoo_SavedVariables",
      "TemperFoo_GlobalSavedVariables",
    ])
    expect(present).toEqual(["TemperFoo_SavedVariables", "TemperFoo_GlobalSavedVariables"])
    expect(blocks).toHaveLength(2)
    expect(blocks[1]).toContain('["useGlobal"] = true')
  })

  test("a declared-but-absent global is reported missing, present ones still extracted", () => {
    const { blocks, present, missing } = extractMemberGlobalBlocks(MERGED, [
      "TemperBar_SavedVariables",
      "TemperBar_Character",
    ])
    expect(present).toEqual(["TemperBar_SavedVariables"])
    expect(missing).toEqual(["TemperBar_Character"])
    expect(blocks).toHaveLength(1)
  })

  test("a prefix-collision global name is not matched (exact assignment only)", () => {
    const { present, missing } = extractMemberGlobalBlocks(MERGED, ["TemperFoo_Saved"])
    expect(present).toEqual([])
    expect(missing).toEqual(["TemperFoo_Saved"])
  })
})

function expectKind<K extends BundleMemberMigrationOutcome["kind"]>(
  outcome: BundleMemberMigrationOutcome,
  kind: K
): undefined {
  expect(outcome.kind).toBe(kind)
  return undefined
}

describe("migrateBundleMemberSavedVars — sentinel-gated one-time migration", () => {
  const nowIso = "2026-06-23T12:00:00.000Z"

  test("first run extracts the member's globals and records a sentinel", () => {
    const dir = sandbox()
    seedMerged(dir)
    const outcome = migrateBundleMemberSavedVars(
      "TemperFoo",
      ["TemperFoo_SavedVariables", "TemperFoo_GlobalSavedVariables"],
      { savedVarsDir: dir, nowIso }
    )
    expectKind(outcome, "migrated")
    const written = readFileSync(join(dir, "TemperFoo.lua"), "utf-8")
    expect(written).toContain("TemperFoo_SavedVariables =")
    expect(written).toContain("TemperFoo_GlobalSavedVariables =")
    expect(written).not.toContain("TemperBar_SavedVariables")
    expect(isBundleMemberMigrated(dir, "TemperFoo")).toBe(true)
  })

  test("second run skips and never clobbers a freshly-saved standalone", () => {
    const dir = sandbox()
    seedMerged(dir)
    migrateBundleMemberSavedVars("TemperFoo", ["TemperFoo_SavedVariables"], {
      savedVarsDir: dir,
      nowIso,
    })
    const freshContent = 'TemperFoo_SavedVariables =\n{\n    ["new"] = 99,\n}\n'
    writeFileSync(join(dir, "TemperFoo.lua"), freshContent)
    const second = migrateBundleMemberSavedVars("TemperFoo", ["TemperFoo_SavedVariables"], {
      savedVarsDir: dir,
      nowIso,
    })
    expectKind(second, "skip-already-migrated")
    expect(readFileSync(join(dir, "TemperFoo.lua"), "utf-8")).toBe(freshContent)
  })

  test("a stale pre-bundle file is overwritten with authoritative data and backed up once", () => {
    const dir = sandbox()
    seedMerged(dir)
    const stale = 'TemperFoo_SavedVariables =\n{\n    ["stale"] = true,\n}\n'
    writeFileSync(join(dir, "TemperFoo.lua"), stale)
    const outcome = migrateBundleMemberSavedVars("TemperFoo", ["TemperFoo_SavedVariables"], {
      savedVarsDir: dir,
      nowIso,
    })
    expect(outcome.kind).toBe("migrated")
    if (outcome.kind === "migrated") expect(outcome.backedUp).toBe(true)
    const written = readFileSync(join(dir, "TemperFoo.lua"), "utf-8")
    expect(written).not.toContain('["stale"]')
    expect(written).toContain('["Default"]')
    expect(readFileSync(join(dir, "TemperFoo.lua.pre-bundle-migration.bak"), "utf-8")).toBe(stale)
  })

  test("a present sentinel skips regardless of the SV file's size/existence (stale-immunity)", () => {
    const dir = sandbox()
    seedMerged(dir)
    migrateBundleMemberSavedVars("TemperFoo", ["TemperFoo_SavedVariables"], {
      savedVarsDir: dir,
      nowIso,
    })
    writeFileSync(join(dir, "TemperFoo.lua"), "x".repeat(2_000_000))
    const outcome = migrateBundleMemberSavedVars("TemperFoo", ["TemperFoo_SavedVariables"], {
      savedVarsDir: dir,
      nowIso,
    })
    expectKind(outcome, "skip-already-migrated")
    expect(readFileSync(join(dir, "TemperFoo.lua"), "utf-8").length).toBe(2_000_000)
  })

  test("no merged source file → skip-no-source (no write, no sentinel)", () => {
    const dir = sandbox()
    const outcome = migrateBundleMemberSavedVars("TemperFoo", ["TemperFoo_SavedVariables"], {
      savedVarsDir: dir,
      nowIso,
    })
    expectKind(outcome, "skip-no-source")
    expect(isBundleMemberMigrated(dir, "TemperFoo")).toBe(false)
  })

  test("no declared globals → skip-no-globals", () => {
    const dir = sandbox()
    seedMerged(dir)
    expectKind(
      migrateBundleMemberSavedVars("TemperFoo", [], { savedVarsDir: dir, nowIso }),
      "skip-no-globals"
    )
  })

  test("declared globals all absent → skip-no-member-data, leaving migration open", () => {
    const dir = sandbox()
    seedMerged(dir)
    const outcome = migrateBundleMemberSavedVars(
      "TemperInventory",
      ["TemperInventory_SavedVariables"],
      {
        savedVarsDir: dir,
        nowIso,
      }
    )
    expectKind(outcome, "skip-no-member-data")
    expect(isBundleMemberMigrated(dir, "TemperInventory")).toBe(false)
    expect(existsSync(join(dir, "TemperInventory.lua"))).toBe(false)
  })
})
