import { afterAll, beforeAll, describe, expect, test } from "bun:test"

import type { Diagnostics as DiagnosticsShape } from "../shape"

const EVAL_GLOBAL_KEYS = [
  "GetWorldName",
  "GetCVar",
  "zo_clamp",
  "GetDisplayName",
  "GetCurrentCharacterId",
  "GetGameTimeMilliseconds",
  "string",
  "LFG_ROLE_TANK",
  "LFG_ROLE_HEAL",
  "LFG_ROLE_DPS",
  "LFG_ROLE_INVALID",
  "type",
] as const

function luaType(this: void, value: unknown): string {
  if (value === undefined || value === null) return "nil"
  const t = typeof value
  if (t === "object" || t === "function") return t === "function" ? "function" : "table"
  return t
}

function sprintf(this: void, template: string, ...args: unknown[]): string {
  let i = 0
  return template.replace(/%[sdxq%]/g, (m) => (m === "%%" ? "%" : String(args[i++])))
}

let Diagnostics: DiagnosticsShape
let clock: number

beforeAll(async () => {
  clock = 0
  Reflect.set(globalThis, "GetWorldName", () => "NA")
  Reflect.set(globalThis, "GetCVar", () => "en")
  Reflect.set(globalThis, "zo_clamp", (v: number, lo: number, hi: number) =>
    Math.max(lo, Math.min(hi, v))
  )
  Reflect.set(globalThis, "GetDisplayName", () => "@tester")
  Reflect.set(globalThis, "GetCurrentCharacterId", () => "char1")
  Reflect.set(globalThis, "GetGameTimeMilliseconds", () => {
    clock = clock + 10
    return clock
  })
  Reflect.set(globalThis, "LFG_ROLE_TANK", 1)
  Reflect.set(globalThis, "LFG_ROLE_HEAL", 2)
  Reflect.set(globalThis, "LFG_ROLE_DPS", 3)
  Reflect.set(globalThis, "LFG_ROLE_INVALID", 0)
  Reflect.set(globalThis, "type", luaType)
  Reflect.set(globalThis, "string", {
    format: sprintf,
    byte: (s: string, i?: number) => s.charCodeAt((i ?? 1) - 1),
    char: (...codes: number[]) => String.fromCharCode(...codes),
  })

  const state = await import("./state")
  Diagnostics = state.Internal.diagnostics
})

afterAll(() => {
  for (const key of EVAL_GLOBAL_KEYS) {
    Reflect.deleteProperty(globalThis, key)
  }
})

describe("Diagnostics.Stopwatch (cast-wrapped table.insert → push)", () => {
  test("Stopwatch(true) resets times to an empty array", () => {
    Diagnostics.Stopwatch(true)
    expect(Diagnostics.times).toEqual([])
  })

  test("subsequent Stopwatch() calls push each elapsed delta onto the live Diagnostics.times", () => {
    Diagnostics.Stopwatch(true)
    const times = Diagnostics.times
    Diagnostics.Stopwatch()
    Diagnostics.Stopwatch()
    expect(Diagnostics.times).toEqual([10, 10])
    expect(Diagnostics.times).toBe(times)
  })
})
