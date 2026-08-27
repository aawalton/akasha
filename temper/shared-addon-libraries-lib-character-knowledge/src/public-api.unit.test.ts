import { afterAll, beforeAll, describe, expect, test } from "bun:test"

const EVAL_GLOBAL_KEYS = [
  "GetWorldName",
  "GetCVar",
  "zo_clamp",
  "GetDisplayName",
  "GetCurrentCharacterId",
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

let barrel: typeof import("./public-api")

beforeAll(async () => {
  Reflect.set(globalThis, "GetWorldName", () => "NA")
  Reflect.set(globalThis, "GetCVar", () => "en")
  Reflect.set(globalThis, "zo_clamp", (v: number, lo: number, hi: number) =>
    Math.max(lo, Math.min(hi, v))
  )
  Reflect.set(globalThis, "GetDisplayName", () => "@tester")
  Reflect.set(globalThis, "GetCurrentCharacterId", () => "char1")
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

  Reflect.deleteProperty(globalThis, "LibCodesCommonCode")
  Reflect.deleteProperty(globalThis, "LibDataExportImport")

  barrel = await import("./public-api")
})

afterAll(() => {
  for (const key of EVAL_GLOBAL_KEYS) {
    Reflect.deleteProperty(globalThis, key)
  }
})

describe("public-api barrel — publish-when-absent", () => {
  test("publishes the two unconditional library singletons onto _G", () => {
    expect(globalThis.LibCharacterKnowledge).toBeDefined()
    expect(globalThis.LibCharacterKnowledgeInternal).toBeDefined()
    expect(globalThis.LibCharacterKnowledgeInternal.name).toBe("LibCharacterKnowledge")
  })

  test("publishes the embedded LCCC (v36) and LDEI (v4) behind their guards", () => {
    expect(globalThis.LibCodesCommonCode.version).toBe(36)
    expect(globalThis.LibDataExportImport.version).toBe(4)
  })
})

describe("public-api barrel — version-guard arbitration (publishVersioned)", () => {
  test("skips publishing when a newer copy already occupies the slot", () => {
    Reflect.set(globalThis, "LibCodesCommonCode", { version: 9999 })
    barrel.publishVersioned("LibCodesCommonCode", { version: 36 })
    expect(globalThis.LibCodesCommonCode.version).toBe(9999)
  })

  test("publishes when the slot is absent", () => {
    Reflect.deleteProperty(globalThis, "LibDataExportImport")
    const lib = { version: 4 }
    barrel.publishVersioned("LibDataExportImport", lib)
    expect(globalThis.LibDataExportImport).toBe(lib)
  })

  test("replaces when the existing copy is older", () => {
    Reflect.set(globalThis, "LibCodesCommonCode", { version: 1 })
    const lib = { version: 36 }
    barrel.publishVersioned("LibCodesCommonCode", lib)
    expect(globalThis.LibCodesCommonCode).toBe(lib)
  })
})
