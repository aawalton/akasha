import { afterAll, describe, expect, test } from "bun:test"
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  appendAddonSavedVars,
  appendGlobalToTarget,
  applyConsolidationMigrations,
  type ConsolidationMigration,
  extractTopLevelBlock,
} from "./migrate-saved-vars"

const SCRATCH_ROOT = "/var/tmp"

function crlf(lines: readonly string[]): string {
  return lines.join("\r\n")
}

const made: string[] = []

afterAll(() => {
  for (const one of made) rmSync(one, { recursive: true, force: true })
})

function sandbox(): string {
  const dir = mkdtempSync(join(SCRATCH_ROOT, "sv-consolidate-append-"))
  made.push(dir)
  return dir
}

const ABSORBED_ZO = crlf([
  "TemperActions_SavedVariables =",
  "{",
  '    ["Default"] =',
  "    {",
  '        ["@Alan"] =',
  "        {",
  '            ["$AccountWide"] =',
  "            {",
  '                ["barEnabled"] = true,',
  '                ["barShiftOffsetX"] = 12,',
  "            },",
  "        },",
  "    },",
  "}",
  "",
])

const HUB_ZO = crlf([
  "TemperCombat_Save =",
  "{",
  '    ["Default"] =',
  "    {",
  '        ["@Alan"] =',
  "        {",
  '            ["$AccountWide"] =',
  "            {",
  '                ["Settings"] =',
  "                {",
  '                    ["version"] = 5,',
  "                },",
  "            },",
  "        },",
  "    },",
  "}",
  "",
])

function zoSavedVarsAccountWide(
  content: string,
  globalName: string,
  namespace?: string
): string | undefined {
  const block = extractTopLevelBlock(content, globalName)
  if (block === null) return undefined
  const awIdx = block.indexOf('["$AccountWide"]')
  if (awIdx === -1) return undefined
  let region = block.slice(awIdx)
  if (namespace !== undefined) {
    const nsIdx = region.indexOf(`["${namespace}"]`)
    if (nsIdx === -1) return undefined
    region = region.slice(nsIdx)
  }
  return region
}

describe("appendGlobalToTarget (pure) — ZO_SavedVars-correct fold", () => {
  test("appends the absorbed global verbatim as a SEPARATE top-level global", () => {
    const result = appendGlobalToTarget(ABSORBED_ZO, "TemperActions_SavedVariables", HUB_ZO)
    expect(result.kind).toBe("appended")
    if (result.kind !== "appended") return
    const columnZeroCloses = result.content.split("\r\n").filter((l) => l.startsWith("}")).length
    expect(columnZeroCloses).toBe(2)
    expect(result.content).toContain("TemperCombat_Save =")
    expect(result.content).toContain("TemperActions_SavedVariables =")
    expect(result.content).not.toContain('["TemperActions_SavedVariables"] =')
    expect(result.content).toContain("\r\n")
  })

  test("READ-BACK PATH: the folded ZO_SavedVars global is reachable at _G[G].Default.$AccountWide", () => {
    const result = appendGlobalToTarget(ABSORBED_ZO, "TemperActions_SavedVariables", HUB_ZO)
    expect(result.kind).toBe("appended")
    if (result.kind !== "appended") return
    const region = zoSavedVarsAccountWide(result.content, "TemperActions_SavedVariables")
    expect(region).toBeDefined()
    expect(region).toContain('["barEnabled"] = true')
    expect(region).toContain('["barShiftOffsetX"] = 12')
    expect(zoSavedVarsAccountWide(result.content, "TemperCombat_Save", "Settings")).toContain(
      '["version"] = 5'
    )
  })

  test("is idempotent — a re-append under the same global is a no-op", () => {
    const first = appendGlobalToTarget(ABSORBED_ZO, "TemperActions_SavedVariables", HUB_ZO)
    expect(first.kind).toBe("appended")
    if (first.kind !== "appended") return
    const second = appendGlobalToTarget(ABSORBED_ZO, "TemperActions_SavedVariables", first.content)
    expect(second.kind).toBe("already-appended")
  })

  test("reports absorbed-global-absent when the absorbed global is missing", () => {
    const result = appendGlobalToTarget(ABSORBED_ZO, "NotThere_SavedVariables", HUB_ZO)
    expect(result.kind).toBe("absorbed-global-absent")
  })

  test("appending two ZO globals into one hub keeps three independent top-level globals", () => {
    const first = appendGlobalToTarget(ABSORBED_ZO, "TemperActions_SavedVariables", HUB_ZO)
    expect(first.kind).toBe("appended")
    if (first.kind !== "appended") return
    const other = crlf([
      "TemperOther_SavedVariables =",
      "{",
      '    ["Default"] = { ["@Alan"] = { ["$AccountWide"] = { ["x"] = 1 } } },',
      "}",
      "",
    ])
    const second = appendGlobalToTarget(other, "TemperOther_SavedVariables", first.content)
    expect(second.kind).toBe("appended")
    if (second.kind !== "appended") return
    expect(second.content.split("\r\n").filter((l) => l.startsWith("}")).length).toBe(3)
    expect(zoSavedVarsAccountWide(second.content, "TemperActions_SavedVariables")).toBeDefined()
    expect(zoSavedVarsAccountWide(second.content, "TemperOther_SavedVariables")).toBeDefined()
  })
})

describe("appendAddonSavedVars (append shell)", () => {
  const spec = {
    absorbedFileBase: "TemperActions",
    absorbedGlobal: "TemperActions_SavedVariables",
    targetFileBase: "TemperCombat",
  }

  test("appends the absorbed global into the hub file and backs up the hub once", () => {
    const dir = sandbox()
    writeFileSync(join(dir, "TemperActions.lua"), ABSORBED_ZO)
    writeFileSync(join(dir, "TemperCombat.lua"), HUB_ZO)
    const outcome = appendAddonSavedVars(spec, { savedVarsDir: dir })
    expect(outcome.kind).toBe("appended")
    const bak = join(dir, "TemperCombat.lua.pre-consolidation.bak")
    expect(existsSync(bak)).toBe(true)
    expect(readFileSync(bak, "utf-8")).toBe(HUB_ZO)
    const hub = readFileSync(join(dir, "TemperCombat.lua"), "utf-8")
    expect(hub).toContain("TemperActions_SavedVariables =")
    expect(zoSavedVarsAccountWide(hub, "TemperActions_SavedVariables")).toContain(
      '["barEnabled"] = true'
    )
  })

  test("skip-already-appended on re-run, and the hub file is not rewritten", () => {
    const dir = sandbox()
    writeFileSync(join(dir, "TemperActions.lua"), ABSORBED_ZO)
    writeFileSync(join(dir, "TemperCombat.lua"), HUB_ZO)
    expect(appendAddonSavedVars(spec, { savedVarsDir: dir }).kind).toBe("appended")
    const afterFirst = readFileSync(join(dir, "TemperCombat.lua"), "utf-8")
    expect(appendAddonSavedVars(spec, { savedVarsDir: dir }).kind).toBe("skip-already-appended")
    expect(readFileSync(join(dir, "TemperCombat.lua"), "utf-8")).toBe(afterFirst)
  })

  test("skip-no-source / skip-no-target when a file is absent", () => {
    const dir = sandbox()
    writeFileSync(join(dir, "TemperCombat.lua"), HUB_ZO)
    expect(appendAddonSavedVars(spec, { savedVarsDir: dir }).kind).toBe("skip-no-source")

    const dir2 = sandbox()
    writeFileSync(join(dir2, "TemperActions.lua"), ABSORBED_ZO)
    expect(appendAddonSavedVars(spec, { savedVarsDir: dir2 }).kind).toBe("skip-no-target")
  })

  test("skip-absorbed-global-absent when the source file lacks the expected global", () => {
    const dir = sandbox()
    writeFileSync(join(dir, "TemperActions.lua"), crlf(["Unexpected =", "{", "}", ""]))
    writeFileSync(join(dir, "TemperCombat.lua"), HUB_ZO)
    expect(appendAddonSavedVars(spec, { savedVarsDir: dir }).kind).toBe(
      "skip-absorbed-global-absent"
    )
  })
})

describe("two globals from one absorbed file (FCOCompanion → TemperCompanions)", () => {
  const FCO_ABSORBED = crlf([
    "FCOCompanion_Settings =",
    "{",
    '    ["Default"] =',
    "    {",
    '        ["@Alan"] =',
    "        {",
    '            ["$AccountWide"] =',
    "            {",
    '                ["Settings"] =',
    "                {",
    '                    ["autoReSummon"] = true,',
    "                },",
    "            },",
    "        },",
    "    },",
    "}",
    "FCOCompanion_Settings_PerToon =",
    "{",
    '    ["Default"] =',
    "    {",
    '        ["@Alan"] =',
    "        {",
    '            ["12345678"] =',
    "            {",
    '                ["Settings"] =',
    "                {",
    '                    ["companionItemsJunked"] = {},',
    "                },",
    "            },",
    "        },",
    "    },",
    "}",
    "",
  ])
  const HUB_COMPANIONS = crlf([
    "TemperCompanions_SavedVariables =",
    "{",
    '    ["Default"] =',
    "    {",
    '        ["@Alan"] =',
    "        {",
    '            ["$AccountWide"] =',
    "            {",
    '                ["companions"] = {},',
    "            },",
    "        },",
    "    },",
    "}",
    "",
  ])
  const specAccount = {
    absorbedFileBase: "FCOCompanion",
    absorbedGlobal: "FCOCompanion_Settings",
    targetFileBase: "TemperCompanions",
  }
  const specPerToon = {
    absorbedFileBase: "FCOCompanion",
    absorbedGlobal: "FCOCompanion_Settings_PerToon",
    targetFileBase: "TemperCompanions",
  }

  test("both globals land top-level, hub backed up once, both read back", () => {
    const dir = sandbox()
    writeFileSync(join(dir, "FCOCompanion.lua"), FCO_ABSORBED)
    writeFileSync(join(dir, "TemperCompanions.lua"), HUB_COMPANIONS)

    expect(appendAddonSavedVars(specAccount, { savedVarsDir: dir }).kind).toBe("appended")
    const bak = join(dir, "TemperCompanions.lua.pre-consolidation.bak")
    expect(readFileSync(bak, "utf-8")).toBe(HUB_COMPANIONS)

    expect(appendAddonSavedVars(specPerToon, { savedVarsDir: dir }).kind).toBe("appended")
    expect(readFileSync(bak, "utf-8")).toBe(HUB_COMPANIONS)

    const hub = readFileSync(join(dir, "TemperCompanions.lua"), "utf-8")
    expect(hub.split("\r\n").filter((l) => l.startsWith("}")).length).toBe(3)
    expect(hub).not.toContain('["FCOCompanion_Settings"] =')
    expect(zoSavedVarsAccountWide(hub, "FCOCompanion_Settings", "Settings")).toContain(
      '["autoReSummon"] = true'
    )
    expect(extractTopLevelBlock(hub, "FCOCompanion_Settings_PerToon")).toContain(
      '["companionItemsJunked"] = {}'
    )
    expect(zoSavedVarsAccountWide(hub, "TemperCompanions_SavedVariables")).toContain(
      '["companions"] = {}'
    )
  })

  test("both specs are idempotent on re-run", () => {
    const dir = sandbox()
    writeFileSync(join(dir, "FCOCompanion.lua"), FCO_ABSORBED)
    writeFileSync(join(dir, "TemperCompanions.lua"), HUB_COMPANIONS)
    for (const s of [specAccount, specPerToon]) {
      expect(appendAddonSavedVars(s, { savedVarsDir: dir }).kind).toBe("appended")
    }
    const afterFirst = readFileSync(join(dir, "TemperCompanions.lua"), "utf-8")
    for (const s of [specAccount, specPerToon]) {
      expect(appendAddonSavedVars(s, { savedVarsDir: dir }).kind).toBe("skip-already-appended")
    }
    expect(readFileSync(join(dir, "TemperCompanions.lua"), "utf-8")).toBe(afterFirst)
  })

  test("applyConsolidationMigrations runs both FCOCompanion append entries for TemperCompanions", () => {
    const dir = sandbox()
    writeFileSync(join(dir, "FCOCompanion.lua"), FCO_ABSORBED)
    writeFileSync(join(dir, "TemperCompanions.lua"), HUB_COMPANIONS)
    const migrations: readonly ConsolidationMigration[] = [
      { mode: "append", runFor: "TemperCompanions", spec: specAccount },
      { mode: "append", runFor: "TemperCompanions", spec: specPerToon },
    ]
    applyConsolidationMigrations("TemperCompanions", migrations, { savedVarsDir: dir })
    const hub = readFileSync(join(dir, "TemperCompanions.lua"), "utf-8")
    expect(hub).toContain("FCOCompanion_Settings =")
    expect(hub).toContain("FCOCompanion_Settings_PerToon =")
  })
})

describe("applyConsolidationMigrations (append dispatch)", () => {
  test("runs an append entry whose runFor matches the installing hub", () => {
    const dir = sandbox()
    writeFileSync(join(dir, "TemperActions.lua"), ABSORBED_ZO)
    writeFileSync(join(dir, "TemperCombat.lua"), HUB_ZO)
    const migrations: readonly ConsolidationMigration[] = [
      {
        mode: "append",
        runFor: "TemperCombat",
        spec: {
          absorbedFileBase: "TemperActions",
          absorbedGlobal: "TemperActions_SavedVariables",
          targetFileBase: "TemperCombat",
        },
      },
    ]
    applyConsolidationMigrations("TemperCombat", migrations, { savedVarsDir: dir })
    expect(readFileSync(join(dir, "TemperCombat.lua"), "utf-8")).toContain(
      "TemperActions_SavedVariables ="
    )
  })
})
