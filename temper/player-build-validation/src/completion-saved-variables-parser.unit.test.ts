import { describe, expect, test } from "bun:test"
import { parseSavedVariablesContent } from "./completion-saved-variables-parser"

function savedVariables(accountWideBody: string): string {
  return `TemperCharacters_SavedVariables =
{
    ["Default"] =
    {
        ["@tester"] =
        {
            ["$AccountWide"] =
            {
${accountWideBody}
            },
        },
    },
}
`
}

describe("parseSavedVariablesContent diagnostics", () => {
  test("a recognised file reports the sections it read", () => {
    const parsed = parseSavedVariablesContent(
      savedVariables(`                ["account"] = { ["championPointsEarned"] = 100, },
                ["characters"] = { ["c1"] = { ["name"] = "A", ["level"] = 5, }, },
                ["companions"] = {},`)
    )
    expect(parsed.diagnostics.knownSectionCount).toBe(3)
    expect(parsed.diagnostics.skippedCharacters).toBe(0)
    expect(parsed.diagnostics.skippedCompanions).toBe(0)
  })

  test("an unrecognised shape reports zero known sections", () => {
    const parsed = parseSavedVariablesContent(
      savedVariables(`                ["version"] = 2,
                ["characterData"] = { ["c1"] = { ["name"] = "A", }, },`)
    )
    expect(parsed.diagnostics.knownSectionCount).toBe(0)
    expect(parsed.account).toBeUndefined()
    expect(Object.keys(parsed.characters)).toHaveLength(0)
  })

  test("a genuinely empty but recognised file is distinguishable from an unrecognised one", () => {
    const parsed = parseSavedVariablesContent(
      savedVariables(`                ["characters"] = {},
                ["companions"] = {},`)
    )
    expect(parsed.diagnostics.knownSectionCount).toBe(2)
    expect(Object.keys(parsed.characters)).toHaveLength(0)
  })

  test("character entries dropped as non-tables are counted, not silent", () => {
    const parsed = parseSavedVariablesContent(
      savedVariables(`                ["characters"] =
                {
                    ["c1"] = { ["name"] = "A", },
                    ["c2"] = "not-a-table",
                },`)
    )
    expect(Object.keys(parsed.characters)).toHaveLength(1)
    expect(parsed.diagnostics.skippedCharacters).toBe(1)
  })

  test("companions with an unknown ESO def-id are counted, not silent", () => {
    const parsed = parseSavedVariablesContent(
      savedVariables(`                ["companions"] =
                {
                    [99901] = { ["level"] = 20, },
                    [99902] = { ["level"] = 15, },
                },`)
    )
    expect(Object.keys(parsed.companions)).toHaveLength(0)
    expect(parsed.diagnostics.skippedCompanions).toBe(2)
  })

  test("still throws when the envelope itself is missing", () => {
    expect(() => parseSavedVariablesContent("SomethingElse = { }")).toThrow()
  })
})

describe("parseSavedVariablesContent list fields", () => {
  const explicitKeyForm = savedVariables(`                ["account"] =
                {
                    ["collectibles"] = { [1] = 201, [2] = 202, [3] = 203, },
                },
                ["characters"] =
                {
                    ["c1"] = { ["name"] = "A", ["quests"] = { [1] = 465, [2] = 467, }, },
                },`)

  test("reads quests written as an explicit-key Lua array", () => {
    const parsed = parseSavedVariablesContent(explicitKeyForm)
    expect(parsed.characters.c1?.quests).toEqual([465, 467])
  })

  test("reads collectibles written as an explicit-key Lua array", () => {
    const parsed = parseSavedVariablesContent(explicitKeyForm)
    expect(parsed.account?.collectibles).toEqual([201, 202, 203])
  })

  test("still reads the implicit-key array form", () => {
    const parsed = parseSavedVariablesContent(
      savedVariables(`                ["account"] = { ["collectibles"] = { 201, 202, }, },
                ["characters"] = { ["c1"] = { ["name"] = "A", ["quests"] = { 465, 467, }, }, },`)
    )
    expect(parsed.characters.c1?.quests).toEqual([465, 467])
    expect(parsed.account?.collectibles).toEqual([201, 202])
  })
})
