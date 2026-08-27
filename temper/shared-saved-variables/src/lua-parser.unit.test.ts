import { describe, expect, it } from "bun:test"
import { asRecord } from "../../../shared/utils-narrow/src/as-record"
import { parseLuaSavedVariablesFile } from "./lua-parser"
import { serializeLuaBlock } from "./lua-serializer"

function roundTrip(value: Record<string, unknown>): Record<string, unknown> {
  const lines: string[] = []
  for (const [key, val] of Object.entries(value)) {
    lines.push(...serializeLuaBlock(key, val, "    "))
  }
  const lua = `TestVar =\n{\n${lines.join("\n")}\n}\n`
  return parseLuaSavedVariablesFile(lua, "TestVar")
}

function expectRecord(value: unknown): Record<string, unknown> {
  const rec = asRecord(value)
  if (!rec) throw new Error(`Expected Record, got ${typeof value}`)
  return rec
}

describe("lua round-trip: serialize → parse", () => {
  it("simple string values", () => {
    const input = { greeting: "hello", name: "world" }
    expect(roundTrip(input)).toEqual(input)
  })

  it("boolean values", () => {
    const input = { enabled: true, disabled: false }
    expect(roundTrip(input)).toEqual(input)
  })

  it("number values (integers)", () => {
    const input = { count: 42, negative: -7, zero: 0 }
    expect(roundTrip(input)).toEqual({ count: 42, negative: -7, zero: 0 })
  })

  it("number values (floats)", () => {
    const input = { ratio: 3.14, tiny: 0.001 }
    expect(roundTrip(input)).toEqual(input)
  })

  it("empty object", () => {
    const input = { settings: {} }
    const result = roundTrip(input)
    expect(result.settings).toBeDefined()
  })

  it("nested objects", () => {
    const input = {
      player: {
        stats: { health: 100, stamina: 200 },
        name: "TestChar",
      },
    }
    expect(roundTrip(input)).toEqual(input)
  })

  it("arrays of strings (implicit-key tables)", () => {
    const input = { tags: ["warrior", "tank", "healer"] }
    expect(roundTrip(input)).toEqual(input)
  })

  it("arrays of numbers", () => {
    const input = { scores: [10, 20, 30] }
    expect(roundTrip(input)).toEqual(input)
  })

  it("arrays of booleans", () => {
    const input = { flags: [true, false, true] }
    expect(roundTrip(input)).toEqual(input)
  })

  it("nested arrays", () => {
    const input = {
      matrix: [
        [1, 2],
        [3, 4],
      ],
    }
    expect(roundTrip(input)).toEqual(input)
  })

  it("mixed-type arrays", () => {
    const input = { mixed: [1, "two", true] }
    expect(roundTrip(input)).toEqual(input)
  })

  it("objects with numeric string keys (short → number keys)", () => {
    const input = { items: { 64710: "sword", 12345: "shield" } }
    const result = roundTrip(input)
    const items = expectRecord(result.items)
    expect(items["12345"]).toBe("shield")
    expect(items["64710"]).toBe("sword")
  })

  it("objects with long numeric string keys (→ string keys)", () => {
    const input = { chars: { "8796093072550001": "MainChar" } }
    expect(roundTrip(input)).toEqual(input)
  })

  it("strings with escape characters", () => {
    const input = {
      escaped: "line1\nline2",
      quoted: 'he said "hello"',
      backslash: "path\\to\\file",
    }
    expect(roundTrip(input)).toEqual(input)
  })

  it("deep nesting (3+ levels)", () => {
    const input = {
      level1: {
        level2: {
          level3: {
            level4: { value: "deep" },
          },
        },
      },
    }
    expect(roundTrip(input)).toEqual(input)
  })

  it("complex real-world structure with string keys", () => {
    const input = {
      inventory: {
        "8796093072550001": {
          name: "Iron Sword",
          count: 1,
          bound: true,
          traits: ["sharpened", "infused"],
        },
        "8796093072550002": {
          name: "Health Potion",
          count: 50,
          bound: false,
          traits: [],
        },
      },
    }
    const result = roundTrip(input)
    const inv = expectRecord(result.inventory)
    expect(inv["8796093072550001"]).toEqual({
      name: "Iron Sword",
      count: 1,
      bound: true,
      traits: ["sharpened", "infused"],
    })
    const potion = expectRecord(inv["8796093072550002"])
    expect(potion.name).toBe("Health Potion")
    expect(potion.count).toBe(50)
    expect(potion.bound).toBe(false)
  })

  it("object nested inside array", () => {
    const input = {
      steps: [
        { id: 1, action: "move" },
        { id: 2, action: "attack" },
      ],
    }
    expect(roundTrip(input)).toEqual(input)
  })

  it("single-element array", () => {
    const input = { solo: ["only"] }
    expect(roundTrip(input)).toEqual(input)
  })

  it("negative numbers in arrays", () => {
    const input = { offsets: [-1, -2, -3] }
    expect(roundTrip(input)).toEqual(input)
  })

  it("object keys containing embedded quotes", () => {
    const input = {
      'scrolls|item-name:"Counterfeit Pardon Edict"': 1780318612,
      'recipe|item-name:"Recipe: Bowl of "Peeled Eyeballs""': 7,
    }
    expect(roundTrip(input)).toEqual(input)
  })
})

describe("lua parser: direct parse tests", () => {
  it("parses bareword keys", () => {
    const lua = `TestVar = { enabled = true, count = 5 }`
    const result = parseLuaSavedVariablesFile(lua, "TestVar")
    expect(result.enabled).toBe(true)
    expect(result.count).toBe(5)
  })

  it("parses nil values", () => {
    const lua = `TestVar = { ["key"] = nil }`
    const result = parseLuaSavedVariablesFile(lua, "TestVar")
    expect(result.key).toBeNull()
  })

  it("parses explicit 1-indexed array keys as object", () => {
    const lua = `TestVar = { ["items"] = { [1] = "a", [2] = "b", [3] = "c" } }`
    const result = parseLuaSavedVariablesFile(lua, "TestVar")
    expect(result.items).toEqual({ "1": "a", "2": "b", "3": "c" })
  })

  it("parses implicit-key arrays inside a wrapper", () => {
    const lua = `TestVar = { ["items"] = { "alpha", "beta", "gamma" } }`
    const result = parseLuaSavedVariablesFile(lua, "TestVar")
    expect(result.items).toEqual(["alpha", "beta", "gamma"])
  })

  it("parses mixed explicit and implicit keys", () => {
    const lua = `TestVar = { [1] = "first", ["extra"] = true }`
    const result = parseLuaSavedVariablesFile(lua, "TestVar")
    expect(result).toEqual({ "1": "first", extra: true })
  })

  it("parses 0-indexed keys as object (not array)", () => {
    const lua = `TestVar = { [0] = "head", [1] = "chest" }`
    const result = parseLuaSavedVariablesFile(lua, "TestVar")
    expect(result).toEqual({ "0": "head", "1": "chest" })
  })

  it("parses bareword identifiers as string values", () => {
    const lua = `TestVar = { ["type"] = SOME_CONSTANT }`
    const result = parseLuaSavedVariablesFile(lua, "TestVar")
    expect(result.type).toBe("SOME_CONSTANT")
  })

  it("parses tab and carriage-return escape sequences", () => {
    const lua = `TestVar = { ["msg"] = "col1\\tcol2\\rend" }`
    const result = parseLuaSavedVariablesFile(lua, "TestVar")
    expect(result.msg).toBe("col1\tcol2\rend")
  })

  it("parses empty table", () => {
    const lua = `TestVar = {}`
    const result = parseLuaSavedVariablesFile(lua, "TestVar")
    expect(result).toBeDefined()
  })

  it("skips an inline Lua line comment after a keyed value", () => {
    const lua = [
      "TestVar =",
      "{",
      '    ["traceback"] = nil, -- invalid string value (was your string larger than 2000 characters?)',
      '    ["eventCode"] = 65543,',
      "}",
    ].join("\n")
    const result = parseLuaSavedVariablesFile(lua, "TestVar")
    expect(result.traceback).toBeNull()
    expect(result.eventCode).toBe(65543)
  })

  it("skips an inline Lua line comment after an array element", () => {
    const lua = `TestVar = { ["items"] = { "a", -- a comment here\n "b" } }`
    const result = parseLuaSavedVariablesFile(lua, "TestVar")
    expect(result.items).toEqual(["a", "b"])
  })

  it("skips a Lua block comment between entries", () => {
    const lua = `TestVar = { ["a"] = 1, --[[ block ]] ["b"] = 2 }`
    const result = parseLuaSavedVariablesFile(lua, "TestVar")
    expect(result.a).toBe(1)
    expect(result.b).toBe(2)
  })

  it("parses nested tables with mixed formatting", () => {
    const lua = `TestVar =
{
    ["outer"] =
    {
        ["inner"] = 42,
        flag = true,
    },
}`
    const result = parseLuaSavedVariablesFile(lua, "TestVar")
    const outer = expectRecord(result.outer)
    expect(outer.inner).toBe(42)
    expect(outer.flag).toBe(true)
  })

  it("handles whitespace variations", () => {
    const lua = `TestVar={["a"]=1,["b"]=2}`
    const result = parseLuaSavedVariablesFile(lua, "TestVar")
    expect(result.a).toBe(1)
    expect(result.b).toBe(2)
  })

  it("throws on missing variable", () => {
    const lua = `OtherVar = { ["key"] = "value" }`
    expect(() => parseLuaSavedVariablesFile(lua, "TestVar")).toThrow(
      "Invalid SavedVariables format: missing TestVar assignment"
    )
  })

  it("throws on non-table top-level value", () => {
    const lua = `TestVar = "just a string"`
    expect(() => parseLuaSavedVariablesFile(lua, "TestVar")).toThrow("Expected top-level table")
  })

  it("parses numbers with scientific notation", () => {
    const lua = `TestVar = { ["big"] = 1.5e10, ["small"] = 2e-3 }`
    const result = parseLuaSavedVariablesFile(lua, "TestVar")
    expect(result.big).toBe(1.5e10)
    expect(result.small).toBe(2e-3)
  })

  it("parses deeply nested implicit-key arrays", () => {
    const lua = `TestVar = { ["data"] = { { "a", "b" }, { "c", "d" } } }`
    const result = parseLuaSavedVariablesFile(lua, "TestVar")
    expect(result.data).toEqual([
      ["a", "b"],
      ["c", "d"],
    ])
  })

  it("parses bracketed string keys containing unescaped embedded quotes", () => {
    const lua = `TestVar = { ["scrolls|fence-launder||stolen:stolen|item-name:"Counterfeit Pardon Edict""] = 1780318612 }`
    const result = parseLuaSavedVariablesFile(lua, "TestVar")
    expect(result).toEqual({
      'scrolls|fence-launder||stolen:stolen|item-name:"Counterfeit Pardon Edict"': 1780318612,
    })
  })

  it("parses an array-part numeric entry followed by an embedded-quote string key (position-2186 shape)", () => {
    const lua = `TestVar =
{
    ["bucket"] =
    {
        ["knowledge-collectibles|move-to|house-storage:4680"] = 1780318414,
        ["scrolls|fence-launder||stolen:stolen|item-name:"Counterfeit Pardon Edict""] = 1780318612,
        ["scrolls|stock|character:by-priority"] = 1780318700,
    },
}`
    const result = parseLuaSavedVariablesFile(lua, "TestVar")
    const bucket = expectRecord(result.bucket)
    expect(bucket["knowledge-collectibles|move-to|house-storage:4680"]).toBe(1780318414)
    expect(
      bucket['scrolls|fence-launder||stolen:stolen|item-name:"Counterfeit Pardon Edict"']
    ).toBe(1780318612)
    expect(bucket["scrolls|stock|character:by-priority"]).toBe(1780318700)
  })

  it("parses multiple consecutive embedded-quote keys without bleeding into the next entry", () => {
    const lua = `TestVar =
{
    ["a|item-name:"First Item""] = 1,
    ["b|item-name:"Second Item""] = 2,
}`
    const result = parseLuaSavedVariablesFile(lua, "TestVar")
    expect(result).toEqual({
      'a|item-name:"First Item"': 1,
      'b|item-name:"Second Item"': 2,
    })
  })
})
