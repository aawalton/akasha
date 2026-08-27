import { describe, expect, it } from "bun:test"
import { parseTemperInventoryConfig } from "../lib/temper-inventory/parse-temper-inventory-config.ts"

function svFile(sellCompiledBody: string): string {
  return `TemperInventory_SavedVariables = {
  ["Default"] = {
    ["@tester"] = {
      ["$AccountWide"] = {
        ["sellCompiled"] = {
          ["version"] = 1,
${sellCompiledBody}
        },
      },
    },
  },
}`
}

function esoSvFile(sellCompiledBody: string): string {
  return (
    [
      "TemperInventory_SavedVariables =",
      "{",
      '    ["Default"] = ',
      "    {",
      '        ["@tester"] = ',
      "        {",
      '            ["$AccountWide"] = ',
      "            {",
      '                ["sellCompiled"] = ',
      "                {",
      '                    ["version"] = 3,',
      sellCompiledBody,
      "                },",
      "            },",
      "        },",
      "    },",
      "}",
    ].join("\r\n") + "\r\n"
  )
}

describe("parseTemperInventoryConfig", () => {
  it("coerces empty `{}` orderedRules and characterPriority to empty arrays", () => {
    const content = svFile(`          ["orderedRules"] = {},
          ["characterPriority"] = {},`)

    const config = parseTemperInventoryConfig(content)

    expect(config.orderedRules).toEqual([])
    expect(config.rules).toEqual([])
    expect(config.characterPriority).toEqual([])
  })

  it("coerces a rule's empty `{}` location and traits to empty arrays", () => {
    const content = svFile(`          ["orderedRules"] = {
            {
              ["categoryId"] = "containers",
              ["action"] = "destroy",
              ["location"] = {},
              ["traits"] = {},
            },
          },
          ["characterPriority"] = {},`)

    const config = parseTemperInventoryConfig(content)

    expect(config.orderedRules).toHaveLength(1)
    expect(config.orderedRules[0]?.location).toEqual([])
    expect(config.orderedRules[0]?.traits).toEqual([])
  })

  it("parses a rule's populated location list", () => {
    const content = svFile(`          ["orderedRules"] = {
            {
              ["categoryId"] = "weapons",
              ["action"] = "sell",
              ["location"] = {
                "backpack",
                "bank",
              },
            },
          },
          ["characterPriority"] = {},`)

    const config = parseTemperInventoryConfig(content)

    expect(config.orderedRules[0]?.location).toEqual(["backpack", "bank"])
  })

  it("parses populated orderedRules and characterPriority", () => {
    const content = svFile(`          ["orderedRules"] = {
            {
              ["categoryId"] = "weapons",
              ["action"] = "sell",
            },
          },
          ["characterPriority"] = {
            "char-a",
            "char-b",
          },`)

    const config = parseTemperInventoryConfig(content)

    expect(config.orderedRules).toHaveLength(1)
    expect(config.orderedRules[0]?.categoryId).toBe("weapons")
    expect(config.orderedRules[0]?.action).toBe("sell")
    expect(config.characterPriority).toEqual(["char-a", "char-b"])
  })

  describe("ESO-serializer shape (bracketed integer keys)", () => {
    const RULE_WITH_SET_SOURCE_TYPES = [
      "                        [1] = ",
      "                        {",
      '                            ["categoryId"] = "equipment",',
      '                            ["action"] = "sell",',
      '                            ["setSourceTypes"] = ',
      "                            {",
      '                                [1] = "crafted",',
      '                                [2] = "overland",',
      "                            },",
      "                        },",
    ].join("\r\n")

    function orderedRulesBlock(rulesBody: string): string {
      return [
        '                    ["orderedRules"] = ',
        "                    {",
        rulesBody,
        "                    },",
        '                    ["characterPriority"] = ',
        "                    {",
        '                        [1] = "8796093022338107",',
        '                        [2] = "8796093024330045",',
        "                    },",
      ].join("\r\n")
    }

    it("parses bracketed-key orderedRules, setSourceTypes, and characterPriority", () => {
      const config = parseTemperInventoryConfig(
        esoSvFile(orderedRulesBlock(RULE_WITH_SET_SOURCE_TYPES))
      )

      expect(config.orderedRules).toHaveLength(1)
      expect(config.orderedRules[0]?.setSourceTypes).toEqual(["crafted", "overland"])
      expect(config.characterPriority).toEqual(["8796093022338107", "8796093024330045"])
    })

    it("parses a bracketed-key location / traits list", () => {
      const rule = [
        "                        [1] = ",
        "                        {",
        '                            ["categoryId"] = "all",',
        '                            ["action"] = "lock",',
        '                            ["location"] = ',
        "                            {",
        '                                [1] = "worn",',
        "                            },",
        '                            ["traits"] = ',
        "                            {",
        '                                [1] = "ornate",',
        "                            },",
        "                        },",
      ].join("\r\n")

      const config = parseTemperInventoryConfig(esoSvFile(orderedRulesBlock(rule)))

      expect(config.orderedRules[0]?.location).toEqual(["worn"])
      expect(config.orderedRules[0]?.traits).toEqual(["ornate"])
    })

    it("coerces an empty `{}` setSourceTypes to an empty array", () => {
      const rule = [
        "                        [1] = ",
        "                        {",
        '                            ["categoryId"] = "equipment",',
        '                            ["action"] = "sell",',
        '                            ["setSourceTypes"] = {},',
        "                        },",
      ].join("\r\n")

      const config = parseTemperInventoryConfig(esoSvFile(orderedRulesBlock(rule)))

      expect(config.orderedRules[0]?.setSourceTypes).toEqual([])
    })
  })

  it("parses a splice-written (implicit-key) setSourceTypes list", () => {
    const content = svFile(`          ["orderedRules"] = {
            {
              ["categoryId"] = "equipment",
              ["action"] = "sell",
              ["setSourceTypes"] = {
                "crafted",
                "overland",
              },
            },
          },
          ["characterPriority"] = {},`)

    const config = parseTemperInventoryConfig(content)

    expect(config.orderedRules[0]?.setSourceTypes).toEqual(["crafted", "overland"])
  })
})
