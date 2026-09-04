import { afterAll, expect, test } from "bun:test"
import { join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import { DataError } from "@akasha/errors-core/exit-code"
import {
  loadTemperInventoryConfigFromPath,
  parseTemperInventoryConfig,
} from "./inventory-config-reading.module.code.ts"

const SCRATCH = scratchWorld()

afterAll(SCRATCH.sweep)

function savedVariables(accounts: string): string {
  return `TemperInventory_SavedVariables =\n{\n  ["Default"] =\n  {\n${accounts}\n  },\n}\n`
}

const TWO_RULES = savedVariables(
  `    ["@one"] =
    {
      ["$AccountWide"] =
      {
        ["sellCompiled"] =
        {
          ["orderedRules"] =
          {
            [1] = { ["categoryId"] = "weapons", ["action"] = "sell" },
            [2] = { ["id"] = "named", ["categoryId"] = "armor", ["action"] = "deconstruct" },
          },
          ["characterPriority"] = { [1] = "111", [2] = "222" },
        },
      },
    },`
)

test("an unnamed rule is named for its category and its place, and a named one keeps its name", () => {
  const held = parseTemperInventoryConfig(TWO_RULES)
  expect(held.rules.map((one) => one.id)).toEqual(["weapons#0", "named"])
})

test("an ordered rule carries no id, the id being the caller's to hold", () => {
  const held = parseTemperInventoryConfig(TWO_RULES)
  expect(held.orderedRules).toHaveLength(2)
  for (const one of held.orderedRules) {
    expect(Object.hasOwn(one, "id")).toBe(false)
  }
})

test("a character priority written as a lua list reads as a list", () => {
  expect(parseTemperInventoryConfig(TWO_RULES).characterPriority).toEqual(["111", "222"])
})

test("consumables nobody wants read as none rather than as missing", () => {
  expect(parseTemperInventoryConfig(TWO_RULES).wantedConsumables).toEqual({})
})

test("the first account carrying a compiled block answers and the rest go unread", () => {
  const held = parseTemperInventoryConfig(
    savedVariables(
      `    ["@empty"] = { ["$AccountWide"] = { } },
    ["@one"] =
    {
      ["$AccountWide"] =
      {
        ["sellCompiled"] = { ["orderedRules"] = { [1] = { ["categoryId"] = "gems", ["action"] = "lock" } } },
      },
    },`
    )
  )
  expect(held.rules[0]?.categoryId).toBe("gems")
})

test("a file with no compiled block is refused as data", () => {
  expect(() =>
    parseTemperInventoryConfig(savedVariables(`    ["@one"] = { ["$AccountWide"] = { } },`))
  ).toThrow(DataError)
})

test("a file with no account entry is refused as data", () => {
  expect(() => parseTemperInventoryConfig(savedVariables(`    ["notAnAccount"] = { },`))).toThrow(
    DataError
  )
})

test("a path with no file at it is refused as data, naming the path", async () => {
  const at = join(SCRATCH.rootFor("temper-inventory-config-"), "TemperInventory.lua")
  expect(loadTemperInventoryConfigFromPath(at)).rejects.toThrow(DataError)
})

test("a config read off a path reads the same as one read off its content", async () => {
  const at = join(SCRATCH.rootFor("temper-inventory-config-"), "TemperInventory.lua")
  await Bun.write(at, TWO_RULES)
  expect((await loadTemperInventoryConfigFromPath(at)).rules).toEqual(
    parseTemperInventoryConfig(TWO_RULES).rules
  )
})
