import { afterAll, expect, test } from "bun:test"
import { join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import { DataError } from "@akasha/errors-core/exit-code"
import {
  loadTemperCharactersFromPath,
  parseTemperCharacters,
} from "./inventory-characters-reading.module.code.ts"

const SCRATCH = scratchWorld()

afterAll(SCRATCH.sweep)

function savedVariables(accounts: string): string {
  return `TemperCharacters_SavedVariables =\n{\n  ["Default"] =\n  {\n${accounts}\n  },\n}\n`
}

const ONE_CHARACTER = savedVariables(
  `    ["@one"] =
    {
      ["$AccountWide"] =
      {
        ["characters"] =
        {
          ["111"] =
          {
            ["name"] = "Ayrenn",
            ["recipes"] = { ["food"] = { [1] = 41, [2] = 42 }, ["drink"] = { ["a"] = 43 } },
            ["motifKnowledge"] = { ["7"] = { [1] = 1, [2] = 2 } },
            ["scribing"] = { ["scripts"] = { ["5"] = { ["unlocked"] = true }, ["6"] = { ["unlocked"] = false } } },
          },
        },
      },
    },`
)

test("a character is named by the key the addon filed it under", () => {
  const held = parseTemperCharacters(ONE_CHARACTER)
  expect(held).toHaveLength(1)
  expect(held[0]?.id).toBe("111")
  expect(held[0]?.name).toBe("Ayrenn")
})

test("a lua list and a lua table of the same numbers read the same", () => {
  const held = parseTemperCharacters(ONE_CHARACTER)
  expect([...(held[0]?.recipeResultItemIds ?? [])].sort()).toEqual([41, 42, 43])
})

test("a motif style carries the chapters said under it", () => {
  const held = parseTemperCharacters(ONE_CHARACTER)
  expect([...(held[0]?.motifKnowledgeByStyle.get(7) ?? [])].sort()).toEqual([1, 2])
})

test("a scribing script counts as known only where it says it is unlocked", () => {
  const held = parseTemperCharacters(ONE_CHARACTER)
  expect([...(held[0]?.unlockedScriptIds ?? [])]).toEqual([5])
})

test("a character with no name reads as having none rather than refusing", () => {
  const held = parseTemperCharacters(
    savedVariables(`    ["@one"] = { ["$AccountWide"] = { ["characters"] = { ["222"] = { } } } },`)
  )
  expect(held[0]?.name).toBeNull()
})

test("the first account carrying characters answers and an empty one is walked past", () => {
  const held = parseTemperCharacters(
    savedVariables(
      `    ["@empty"] = { ["$AccountWide"] = { ["characters"] = { } } },
    ["@one"] = { ["$AccountWide"] = { ["characters"] = { ["333"] = { ["name"] = "Naryu" } } } },`
    )
  )
  expect(held[0]?.id).toBe("333")
})

test("a file with no characters under any account is refused as data", () => {
  expect(() =>
    parseTemperCharacters(savedVariables(`    ["@one"] = { ["$AccountWide"] = { } },`))
  ).toThrow(DataError)
})

test("a file with no account entry is refused as data", () => {
  expect(() => parseTemperCharacters(savedVariables(`    ["notAnAccount"] = { },`))).toThrow(
    DataError
  )
})

test("a path with no file at it is refused as data", () => {
  const at = join(SCRATCH.rootFor("temper-characters-"), "TemperCharacters.lua")
  expect(loadTemperCharactersFromPath(at)).rejects.toThrow(DataError)
})

test("characters read off a path read the same as ones read off their content", async () => {
  const at = join(SCRATCH.rootFor("temper-characters-"), "TemperCharacters.lua")
  await Bun.write(at, ONE_CHARACTER)
  const fromPath = await loadTemperCharactersFromPath(at)
  expect(fromPath.map((one) => one.id)).toEqual(
    parseTemperCharacters(ONE_CHARACTER).map((o) => o.id)
  )
})
