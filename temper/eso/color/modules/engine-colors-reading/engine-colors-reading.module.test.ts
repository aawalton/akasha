import { describe, expect, test } from "bun:test"
import {
  colorsBody,
  engineColorsIn,
} from "akasha/temper/eso/color/modules/engine-colors-reading/engine-colors-reading.module.code.ts"

const CAPTURE = {
  apiVersion: 101050,
  colors: [
    { type: 13, field: 2, red: 1, green: 0.5, blue: 0, alpha: 1 },
    { type: 1, field: 4, red: 0.6, green: 0.2, blue: 0.9, alpha: 1 },
    { type: 1, field: 0, red: 0.5, green: 0.5, blue: 0.5, alpha: 1 },
    { type: 1, field: 9, red: "bad" },
  ],
}

describe("engineColorsIn", () => {
  test("keeps each color under its type and field as four channels", () => {
    const held = engineColorsIn(CAPTURE)
    expect(held?.apiVersion).toBe(101050)
    expect(held?.colors["13"]?.["2"]).toEqual([1, 0.5, 0, 1])
  })

  test("sorts types and fields by number, so a capture writes the same body twice", () => {
    const held = engineColorsIn(CAPTURE)
    expect(Object.keys(held?.colors ?? {})).toEqual(["1", "13"])
    expect(Object.keys(held?.colors["1"] ?? {})).toEqual(["0", "4"])
  })

  test("passes over an entry missing a channel", () => {
    expect(engineColorsIn(CAPTURE)?.colors["1"]?.["9"]).toBeUndefined()
  })

  test("reads a catalog holding no colors as no type", () => {
    expect(engineColorsIn({}).colors).toEqual({})
  })

  test("reads a catalog naming no API version as version nothing", () => {
    expect(engineColorsIn({ colors: [] }).apiVersion).toBe(0)
  })

  test("writes a body ending in one newline", () => {
    expect(colorsBody(engineColorsIn(CAPTURE)).endsWith("}\n")).toBe(true)
  })
})
