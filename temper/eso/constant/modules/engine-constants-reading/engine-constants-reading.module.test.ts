import { describe, expect, test } from "bun:test"
import {
  constantsBody,
  engineConstantsIn,
} from "akasha/temper/eso/constant/modules/engine-constants-reading/engine-constants-reading.module.code.ts"
import { z } from "zod"

const VERSIONED_SCHEMA = z.object({ apiVersion: z.number() })

const CATALOG = {
  apiVersion: 101050,
  listedBy: "InsecureNext",
  numbers: { CT_LABEL: 1, CT_CONTROL: 0, BAD: "not a number" },
  words: { SCENE_SHOWN: "shown" },
  named: ["SCENE_SHOWN"],
  unwritable: {},
}

describe("engineConstantsIn", () => {
  test("reads the constants out of the catalog", () => {
    const held = engineConstantsIn(CATALOG)
    expect(held.apiVersion).toBe(101050)
    expect(held.listedBy).toBe("InsecureNext")
    expect(held.words.SCENE_SHOWN).toBe("shown")
    expect(held.named).toEqual(["SCENE_SHOWN"])
    expect(held.unwritable).toEqual([])
  })

  test("passes over a value of the wrong kind rather than coercing it", () => {
    const held = engineConstantsIn(CATALOG)
    expect(held.numbers.BAD).toBeUndefined()
    expect(held.numbers.CT_LABEL).toBe(1)
  })

  test("sorts the names, so a capture writes the same body twice", () => {
    const held = engineConstantsIn(CATALOG)
    expect(Object.keys(held.numbers)).toEqual(["CT_CONTROL", "CT_LABEL"])
  })

  test("reads a catalog missing its fields as empty rather than raising", () => {
    const held = engineConstantsIn({})
    expect(held.apiVersion).toBe(0)
    expect(held.numbers).toEqual({})
    expect(held.named).toEqual([])
  })

  test("writes a body ending in one newline", () => {
    const body = constantsBody(engineConstantsIn(CATALOG))
    expect(body.endsWith("}\n")).toBe(true)
    expect(VERSIONED_SCHEMA.parse(JSON.parse(body)).apiVersion).toBe(101050)
  })
})
