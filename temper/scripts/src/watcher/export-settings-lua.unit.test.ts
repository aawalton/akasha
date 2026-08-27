import { describe, expect, test } from "bun:test"
import { detectIndent, replaceOrInsertLuaBlock } from "./export-settings-lua"

const TEMPER_CHARACTERS_SIBLINGS = ["characters", "account", "navigation"] as const
const TEMPER_INVENTORY_SIBLINGS = ["db", "version"] as const

describe("replaceOrInsertLuaBlock", () => {
  describe("key-found-replace", () => {
    test("replaces a multi-line block using brace-depth tracking", () => {
      const lines = [
        "TemperCharacters_SavedVariables =",
        "{",
        '    ["Default"] =',
        "    {",
        '        ["@Alanarre"] =',
        "        {",
        '            ["$AccountWide"] =',
        "            {",
        '                ["tasks"] =',
        "                {",
        '                    ["old"] = "value",',
        "                },",
        '                ["characters"] = {},',
        "            },",
        "        },",
        "    },",
        "}",
      ]
      const newBlock = ['                ["tasks"] = { ["new"] = "value", },']

      const result = replaceOrInsertLuaBlock(lines, "tasks", newBlock, TEMPER_CHARACTERS_SIBLINGS)

      expect(result.join("\n")).toBe(
        [
          "TemperCharacters_SavedVariables =",
          "{",
          '    ["Default"] =',
          "    {",
          '        ["@Alanarre"] =',
          "        {",
          '            ["$AccountWide"] =',
          "            {",
          '                ["tasks"] = { ["new"] = "value", },',
          '                ["characters"] = {},',
          "            },",
          "        },",
          "    },",
          "}",
        ].join("\n")
      )
    })

    test("replaces a single-line block", () => {
      const lines = [
        "TemperInventory_SavedVariables =",
        "{",
        '    ["Default"] = { ["sell"] = { 1, 2, 3, }, ["db"] = {}, },',
        "}",
      ]
      const newBlock = ['    ["Default"] = { ["sell"] = { 9, }, ["db"] = {}, },']

      const result = replaceOrInsertLuaBlock(lines, "sell", newBlock, TEMPER_INVENTORY_SIBLINGS)

      expect(result).toEqual([
        "TemperInventory_SavedVariables =",
        "{",
        '    ["Default"] = { ["sell"] = { 9, }, ["db"] = {}, },',
        "}",
      ])
    })
  })

  describe("sibling-anchor-insert", () => {
    test("inserts before the first listed sibling when the key is absent", () => {
      const lines = [
        "TemperCharacters_SavedVariables =",
        "{",
        '            ["$AccountWide"] =',
        "            {",
        '                ["characters"] = {},',
        '                ["navigation"] = {},',
        "            },",
        "}",
      ]
      const newBlock = ['                ["tasks"] = { ["x"] = "y", },']

      const result = replaceOrInsertLuaBlock(lines, "tasks", newBlock, TEMPER_CHARACTERS_SIBLINGS)

      expect(result).toEqual([
        "TemperCharacters_SavedVariables =",
        "{",
        '            ["$AccountWide"] =',
        "            {",
        '                ["tasks"] = { ["x"] = "y", },',
        '                ["characters"] = {},',
        '                ["navigation"] = {},',
        "            },",
        "}",
      ])
    })

    test("falls through to the next listed sibling when the first is absent", () => {
      const lines = [
        "TemperCharacters_SavedVariables =",
        "{",
        '            ["$AccountWide"] =',
        "            {",
        '                ["navigation"] = {},',
        "            },",
        "}",
      ]
      const newBlock = ['                ["tasks"] = { },']

      const result = replaceOrInsertLuaBlock(lines, "tasks", newBlock, TEMPER_CHARACTERS_SIBLINGS)

      expect(result).toEqual([
        "TemperCharacters_SavedVariables =",
        "{",
        '            ["$AccountWide"] =',
        "            {",
        '                ["tasks"] = { },',
        '                ["navigation"] = {},',
        "            },",
        "}",
      ])
    })
  })

  describe("refuse-to-write (no anchor)", () => {
    test("empty input returns input unchanged", () => {
      const lines = [""]
      const newBlock = ['["tasks"] = { },']

      const result = replaceOrInsertLuaBlock(lines, "tasks", newBlock, TEMPER_CHARACTERS_SIBLINGS)

      expect(result).toEqual(lines)
    })

    test("wrapper-less orphan content (the #9989 file shape) returns input unchanged", () => {
      const lines = ['["tasks"] =', "{", '    ["uuid"] = { ["title"] = "Skill Morphs", },', "},"]
      const newBlock = ['["characterPriority"] = { "8796093022338107", },']

      const result = replaceOrInsertLuaBlock(
        lines,
        "characterPriority",
        newBlock,
        TEMPER_CHARACTERS_SIBLINGS
      )

      expect(result).toEqual(lines)
    })

    test("wrapper present but no key and no sibling returns input unchanged", () => {
      const lines = [
        "TemperCharacters_SavedVariables =",
        "{",
        '    ["Default"] =',
        "    {",
        '        ["@Alanarre"] =',
        "        {",
        '            ["$AccountWide"] = {},',
        "        },",
        "    },",
        "}",
      ]
      const newBlock = ['            ["tasks"] = { },']

      const result = replaceOrInsertLuaBlock(lines, "tasks", newBlock, TEMPER_CHARACTERS_SIBLINGS)

      expect(result).toEqual(lines)
    })

    test("empty sibling-keys list returns input unchanged on missing key", () => {
      const lines = ["TemperInventory_SavedVariables =", "{", '    ["other"] = {},', "}"]
      const newBlock = ['    ["sell"] = { },']

      const result = replaceOrInsertLuaBlock(lines, "sell", newBlock, [])

      expect(result).toEqual(lines)
    })
  })
})

describe("detectIndent", () => {
  test("returns the indent of the existing key line", () => {
    const lines = ["TemperCharacters_SavedVariables =", "{", '            ["tasks"] = { },', "}"]

    expect(detectIndent(lines, "tasks", TEMPER_CHARACTERS_SIBLINGS)).toBe("            ")
  })

  test("falls back to a sibling key's indent when the key is absent", () => {
    const lines = ["TemperCharacters_SavedVariables =", "{", '        ["characters"] = { },', "}"]

    expect(detectIndent(lines, "tasks", TEMPER_CHARACTERS_SIBLINGS)).toBe("        ")
  })

  test("returns the 12-space default when neither key nor sibling is found", () => {
    const lines = ["TemperCharacters_SavedVariables =", "{", "}"]

    expect(detectIndent(lines, "tasks", TEMPER_CHARACTERS_SIBLINGS)).toBe("            ")
  })
})
