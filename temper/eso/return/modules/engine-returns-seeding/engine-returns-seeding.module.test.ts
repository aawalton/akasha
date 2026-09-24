import { describe, expect, test } from "bun:test"
import type { EngineReturns } from "akasha/temper/eso/return/modules/engine-returns-reading/engine-returns-reading.module.code.ts"
import {
  answerLua,
  engineReturnsTable,
  returnsLua,
} from "akasha/temper/eso/return/modules/engine-returns-seeding/engine-returns-seeding.module.code.ts"

const HELD: EngineReturns = {
  apiVersion: 101050,
  returns: {
    IsItemStolen: ["truth"],
    GetItemName: ["word"],
    ClearItem: [],
    GetItemOwner: ["nothing", "word"],
    GetItemType: ["number", "number"],
  },
  controlMethods: [],
}

describe("answerLua", () => {
  test("writes a function giving back nothing where the documentation names no return", () => {
    expect(answerLua([])).toBe("function() end")
  })

  test("writes the emptiest value of each kind", () => {
    expect(answerLua(["number", "word", "truth"])).toBe('function() return 0,"",false end')
  })

  test("carries a hole, which a list of values could not", () => {
    expect(answerLua(["nothing", "word"])).toBe('function() return nil,"" end')
  })

  test("answers a thing with a stub, which answers to anything", () => {
    expect(answerLua(["thing"])).toBe("function() return __eso_make_stub() end")
  })
})

describe("returnsLua", () => {
  test("hands the sandbox one call per chunk", () => {
    const chunks = returnsLua(HELD, 2)
    expect(chunks.length).toBe(3)
    for (const chunk of chunks) {
      expect(chunk.startsWith("__eso_defaults({")).toBe(true)
      expect(chunk.endsWith("})")).toBe(true)
    }
  })

  test("orders the functions by name, so two runs hand over the same Lua", () => {
    const chunks = returnsLua(HELD, 2)
    expect(chunks[0]?.startsWith('__eso_defaults({["ClearItem"]=')).toBe(true)
    expect(returnsLua(HELD, 2)).toEqual(chunks)
  })

  test("writes every function the table carries", () => {
    const all = returnsLua(HELD).join("")
    for (const name of Object.keys(HELD.returns)) {
      expect(all.includes(`["${name}"]=`)).toBe(true)
    }
  })

  test("hands over nothing for a table carrying no functions", () => {
    expect(returnsLua({ apiVersion: 0, returns: {}, controlMethods: [] })).toEqual([])
  })
})

describe("engineReturnsTable", () => {
  test("reads the table akasha holds", () => {
    const held = engineReturnsTable()
    expect(typeof held.apiVersion).toBe("number")
    expect(typeof held.returns).toBe("object")
  })
})
