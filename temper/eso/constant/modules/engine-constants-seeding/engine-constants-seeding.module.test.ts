import { describe, expect, test } from "bun:test"
import {
  constantsLua,
  type EngineConstantsTable,
  engineConstantsTable,
} from "akasha/temper/eso/constant/modules/engine-constants-seeding/engine-constants-seeding.module.code.ts"

const TABLE: EngineConstantsTable = {
  apiVersion: 101050,
  numbers: { CT_LABEL: 1, CT_CONTROL: 0, TEXT_ALIGN_TOP: 3 },
  words: { SCENE_SHOWN: "shown" },
}

describe("constantsLua", () => {
  test("hands every constant over, numbers and words together", () => {
    const chunks = constantsLua(TABLE, 100)
    expect(chunks).toHaveLength(1)
    expect(chunks[0]).toContain(`["CT_LABEL"]=1`)
    expect(chunks[0]).toContain(`["TEXT_ALIGN_TOP"]=3`)
    expect(chunks[0]).toContain(`["SCENE_SHOWN"]="shown"`)
  })

  test("divides the constants into chunks a Lua chunk can hold", () => {
    const chunks = constantsLua(TABLE, 2)
    expect(chunks).toHaveLength(2)
    expect(chunks.every((one) => one.startsWith("__eso_constants({"))).toBe(true)
  })

  test("orders the constants by name, so two runs hand over the same Lua", () => {
    expect(constantsLua(TABLE, 100)).toEqual(constantsLua(TABLE, 100))
    expect(constantsLua(TABLE, 2)[0]).toContain(`["CT_CONTROL"]=0`)
  })

  test("reads the landed table the game's capture wrote", () => {
    const held = engineConstantsTable()
    expect(held.apiVersion).toBeGreaterThan(0)
    expect(held.numbers.TEXT_ALIGN_TOP).toBe(3)
    expect(held.numbers.CT_INVALID_TYPE).toBe(-1)
  })
})
