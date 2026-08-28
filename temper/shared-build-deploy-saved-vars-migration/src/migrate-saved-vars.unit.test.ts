import { afterAll, describe, expect, test } from "bun:test"
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  applyConsolidationMigrations,
  type ConsolidationMigration,
  migrateAddonSavedVars,
  renameGlobals,
} from "./migrate-saved-vars"

const SCRATCH_ROOT = "/var/tmp"

function crlf(lines: readonly string[]): string {
  return lines.join("\r\n")
}

describe("renameGlobals", () => {
  const SOURCE = crlf(["VotansMiniMap_Data =", "{", '    ["zoom"] = 1.5,', "}", ""])

  test("renames a top-level global declaration and counts the match", () => {
    const { content, renamedCount } = renameGlobals(SOURCE, [
      [/^VotansMiniMap_Data\s*=/m, "TemperMiniMap_SavedVariables ="],
    ])
    expect(renamedCount).toBe(1)
    expect(content.startsWith("TemperMiniMap_SavedVariables =")).toBe(true)
    expect(content).not.toContain("VotansMiniMap_Data =")
    expect(content).toContain('["zoom"] = 1.5,')
    expect(content).toContain("\r\n")
  })

  test("renames every supplied global independently (multi-global addon)", () => {
    const twoGlobals = crlf([
      "LostTreasure_Account =",
      "{",
      '    ["a"] = 1,',
      "}",
      "LostTreasure_Character =",
      "{",
      '    ["c"] = 2,',
      "}",
      "",
    ])
    const { content, renamedCount } = renameGlobals(twoGlobals, [
      [/^LostTreasure_Account\s*=/m, "TemperLostTreasure_Account ="],
      [/^LostTreasure_Character\s*=/m, "TemperLostTreasure_Character ="],
    ])
    expect(renamedCount).toBe(2)
    expect(content).toContain("TemperLostTreasure_Account =")
    expect(content).toContain("TemperLostTreasure_Character =")
  })

  test("reports zero renames when no pattern matches (caller mistake signal)", () => {
    const { content, renamedCount } = renameGlobals(SOURCE, [
      [/^NoSuchGlobal\s*=/m, "TemperX_SavedVariables ="],
    ])
    expect(renamedCount).toBe(0)
    expect(content).toBe(SOURCE)
  })
})

const made: string[] = []

afterAll(() => {
  for (const one of made) rmSync(one, { recursive: true, force: true })
})

function sandbox(): string {
  const dir = mkdtempSync(join(SCRATCH_ROOT, "sv-consolidate-"))
  made.push(dir)
  return dir
}

describe("migrateAddonSavedVars (rename shell)", () => {
  test("renames the file and rewrites the global on first run", () => {
    const dir = sandbox()
    writeFileSync(join(dir, "VotansMiniMap.lua"), crlf(["VotansMiniMap_Data =", "{", "}", ""]))
    const outcome = migrateAddonSavedVars(
      "VotansMiniMap",
      "TemperMiniMap",
      [[/^VotansMiniMap_Data\s*=/m, "TemperMiniMap_SavedVariables ="]],
      { savedVarsDir: dir }
    )
    expect(outcome.kind).toBe("renamed")
    expect(existsSync(join(dir, "TemperMiniMap.lua"))).toBe(true)
    expect(readFileSync(join(dir, "TemperMiniMap.lua"), "utf-8")).toContain(
      "TemperMiniMap_SavedVariables ="
    )
  })

  test("skip-already-renamed never clobbers a freshly in-game-saved target", () => {
    const dir = sandbox()
    writeFileSync(join(dir, "VotansMiniMap.lua"), crlf(["VotansMiniMap_Data =", "{", "}", ""]))
    const fresh = crlf(["TemperMiniMap_SavedVariables =", "{", '    ["new"] = 1,', "}", ""])
    writeFileSync(join(dir, "TemperMiniMap.lua"), fresh)
    const outcome = migrateAddonSavedVars(
      "VotansMiniMap",
      "TemperMiniMap",
      [[/^VotansMiniMap_Data\s*=/m, "TemperMiniMap_SavedVariables ="]],
      { savedVarsDir: dir }
    )
    expect(outcome.kind).toBe("skip-already-renamed")
    expect(readFileSync(join(dir, "TemperMiniMap.lua"), "utf-8")).toBe(fresh)
  })

  test("skip-no-source when the old file is absent", () => {
    const dir = sandbox()
    const outcome = migrateAddonSavedVars("Missing", "TemperMissing", [[/^X\s*=/m, "Y ="]], {
      savedVarsDir: dir,
    })
    expect(outcome.kind).toBe("skip-no-source")
  })

  test("skip-no-globals when the source lacks the expected globals", () => {
    const dir = sandbox()
    writeFileSync(join(dir, "Old.lua"), crlf(["Unexpected_Global =", "{", "}", ""]))
    const outcome = migrateAddonSavedVars(
      "Old",
      "TemperNew",
      [[/^Expected_Global\s*=/m, "TemperNew_SavedVariables ="]],
      { savedVarsDir: dir }
    )
    expect(outcome.kind).toBe("skip-no-globals")
    expect(existsSync(join(dir, "TemperNew.lua"))).toBe(false)
  })
})

describe("applyConsolidationMigrations (registry dispatch)", () => {
  test("runs only the entry whose runFor matches the installing addon", () => {
    const dir = sandbox()
    writeFileSync(
      join(dir, "TemperVotansKeybinder.lua"),
      crlf(["TemperVotansKeybinder_SavedVariables =", "{", "}", ""])
    )
    const migrations: readonly ConsolidationMigration[] = [
      {
        mode: "rename",
        runFor: "TemperKeybinder",
        oldFileBase: "TemperVotansKeybinder",
        newFileBase: "TemperKeybinder",
        renames: [
          [/^TemperVotansKeybinder_SavedVariables\s*=/m, "TemperKeybinder_SavedVariables ="],
        ],
      },
      {
        mode: "rename",
        runFor: "TemperOtherAddonEntirely",
        oldFileBase: "Old",
        newFileBase: "TemperOtherAddonEntirely",
        renames: [[/^Old_SV\s*=/m, "TemperOtherAddonEntirely_SavedVariables ="]],
      },
    ]
    applyConsolidationMigrations("TemperKeybinder", migrations, { savedVarsDir: dir })
    expect(existsSync(join(dir, "TemperKeybinder.lua"))).toBe(true)
    expect(readFileSync(join(dir, "TemperKeybinder.lua"), "utf-8")).toContain(
      "TemperKeybinder_SavedVariables ="
    )
    expect(existsSync(join(dir, "TemperOtherAddonEntirely.lua"))).toBe(false)
  })

  test("empty registry is a clean no-op for any addon", () => {
    const dir = sandbox()
    applyConsolidationMigrations("TemperAnything", [], { savedVarsDir: dir })
    expect(existsSync(join(dir, "TemperAnything.lua"))).toBe(false)
  })
})
