import { afterAll, expect, test } from "bun:test"
import { join } from "node:path"
import { DataError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import {
  loadTemperInventoryConfigFromPath,
  parseTemperInventoryConfig,
} from "akasha/temper/commands/inventory-config-reading/inventory-config-reading.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"

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

test("an ordered rule carries the id the addon gave it", () => {
  const held = parseTemperInventoryConfig(TWO_RULES)
  expect(held.orderedRules).toHaveLength(2)
  expect(held.orderedRules[1]?.id).toBe("named")
})

test("an ordered rule the addon left unnamed carries no id", () => {
  const held = parseTemperInventoryConfig(TWO_RULES)
  expect(Object.hasOwn(held.orderedRules[0] ?? {}, "id")).toBe(false)
})

test("a character priority written as a lua list reads as a list", () => {
  expect(parseTemperInventoryConfig(TWO_RULES).characterPriority).toEqual(["111", "222"])
})

const A_CHAINED_RULE = savedVariables(
  `    ["@one"] =
    {
      ["$AccountWide"] =
      {
        ["sellCompiled"] =
        {
          ["orderedRules"] =
          {
            [1] =
            {
              ["categoryId"] = "potions",
              ["action"] = "move-to",
              ["potionEffects"] = { [1] = "health-restore", [2] = "magicka-restore" },
              ["potionEffectsMode"] = "any",
              ["destinationChain"] =
              {
                [1] = { ["destination"] = "character:by-priority", ["targetQuantity"] = 200 },
                [2] = { ["destination"] = "bank" },
              },
            },
          },
        },
      },
    },`
)

test("a rule's potion effects written as a lua list read as a list", () => {
  const rule = parseTemperInventoryConfig(A_CHAINED_RULE).orderedRules[0]
  expect(rule?.potionEffects).toEqual(["health-restore", "magicka-restore"])
  expect(Array.isArray(rule?.potionEffects)).toBe(true)
})

test("a rule's destination chain written as a lua list reads as a list", () => {
  const rule = parseTemperInventoryConfig(A_CHAINED_RULE).orderedRules[0]
  expect(Array.isArray(rule?.destinationChain)).toBe(true)
  expect(rule?.destinationChain).toEqual([
    { destination: "character:by-priority", targetQuantity: 200 },
    { destination: "bank" },
  ])
})

test("a chain leg's skill line ids are a lua list of their own", () => {
  const held = parseTemperInventoryConfig(
    savedVariables(
      `    ["@one"] =
    {
      ["$AccountWide"] =
      {
        ["sellCompiled"] =
        {
          ["orderedRules"] =
          {
            [1] =
            {
              ["categoryId"] = "gear",
              ["action"] = "move-to",
              ["destinationChain"] =
              {
                [1] =
                {
                  ["destination"] = "bank",
                  ["charEligibility"] =
                  {
                    ["requiredSkillLines"] =
                    {
                      ["mode"] = "any-not-maxed",
                      ["skillLineIds"] = { [1] = "world-legerdemain" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },`
    )
  )
  const leg = held.orderedRules[0]?.destinationChain?.[0]
  expect(leg?.charEligibility?.requiredSkillLines?.skillLineIds).toEqual(["world-legerdemain"])
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
