import { afterAll, beforeAll, describe, expect, test } from "bun:test"
import { asLsvTable, asManagerInstance, asSavedVarsInfo } from "./casts"
import type { LsvTable, ProtectedTable, SavedVarsInfo, SavedVarsManagerInstance } from "./types"

function luaType(this: void, v: unknown): string {
  if (v === undefined || v === null) {
    return "nil"
  }
  if (Array.isArray(v)) {
    return "table"
  }
  return typeof v === "object" ? "table" : typeof v
}

function nextShim(this: void, t: Record<string, unknown>, key?: unknown): [unknown, unknown] {
  const keys = Object.keys(t).filter((k) => t[k] !== undefined)
  if (key === undefined) {
    return keys.length === 0 ? [undefined, undefined] : [keys[0], t[keys[0]]]
  }
  const nextKey = keys[keys.indexOf(String(key)) + 1]
  return nextKey === undefined ? [undefined, undefined] : [nextKey, t[nextKey]]
}

function rangeShim(this: void, start: number, stop: number): Iterable<number> {
  const out: number[] = []
  for (let i = start; i <= stop; i += 1) {
    out.push(i)
  }
  return out
}

let proto: ProtectedTable

function makeManager(this: void, info: SavedVarsInfo): SavedVarsManagerInstance {
  return asManagerInstance({
    name: info.name,
    rawSavedVarsTable: { libSavedVarsMigrated: true },
    LoadRawTableData: (): readonly [undefined] => [undefined],
    Validate: (): readonly [boolean] => [true],
    FireMigrateStartCallbacks: (): undefined => undefined,
  })
}

function luaTableShim(this: void): {
  get: (this: void, key: unknown) => unknown
  set: (this: void, key: unknown, value: unknown) => undefined
} {
  const map = new Map<unknown, unknown>()
  return {
    get: (key: unknown): unknown => map.get(key),
    set: (key: unknown, value: unknown): undefined => {
      map.set(key, value)
      return undefined
    },
  }
}

beforeAll(async () => {
  Reflect.set(globalThis, "ZO_SAVED_VARS_CHARACTER_NAME_KEY", 1)
  Reflect.set(globalThis, "ZO_SAVED_VARS_CHARACTER_ID_KEY", 2)
  Reflect.set(globalThis, "LuaTable", luaTableShim)
  Reflect.set(globalThis, "$multi", (...args: unknown[]) => args)
  Reflect.set(globalThis, "$range", rangeShim)
  Reflect.set(globalThis, "table", { concat: (arr: unknown[], sep: string) => arr.join(sep) })
  Reflect.set(globalThis, "tostring", (v: unknown) => String(v))
  Reflect.set(globalThis, "type", luaType)
  Reflect.set(globalThis, "next", nextShim)
  Reflect.set(globalThis, "getmetatable", () => undefined)
  Reflect.set(globalThis, "error", (m: string) => {
    throw new Error(m)
  })

  const libCore = await import("./lib-core")
  libCore.installLibCore()
  const registry = await import("./registry")
  Reflect.set(registry.LSV, "manager", {
    New: (info: SavedVarsInfo) => makeManager(info),
  })
  const protectedMod = await import("./protected")
  protectedMod.installProtected()
  proto = registry.LSV.protected
})

afterAll(() => {
  for (const key of [
    "ZO_SAVED_VARS_CHARACTER_NAME_KEY",
    "ZO_SAVED_VARS_CHARACTER_ID_KEY",
    "LuaTable",
    "$multi",
    "$range",
    "table",
    "tostring",
    "type",
    "next",
    "getmetatable",
    "error",
  ]) {
    Reflect.deleteProperty(globalThis, key)
  }
})

describe("UnsetPath (table.remove → pop)", () => {
  test("drains every empty tail level, removing the whole chain", () => {
    const t = asLsvTable({ a: { b: {} } })
    proto.UnsetPath(t, ["a", "b"])
    expect(t).toEqual({})
  })

  test("stops as soon as a level still holds a sibling key", () => {
    const t = asLsvTable({ a: { b: {}, c: 1 } })
    proto.UnsetPath(t, ["a", "b"])
    expect(t).toEqual({ a: { c: 1 } })
  })

  test("nulls the leaf and drains up to the first level still holding a sibling", () => {
    const t = asLsvTable({ a: { b: { c: {} }, d: 9 } })
    proto.UnsetPath(t, ["a", "b", "c"])
    expect(t).toEqual({ a: { d: 9 } })
  })
})

function migrateManagerNames(
  this: void,
  defaultKeyType: number | SavedVarsInfo | undefined,
  fromInfo: SavedVarsInfo,
  toInfo1: SavedVarsInfo,
  ...rest: SavedVarsInfo[]
): (string | undefined)[] {
  const [toParams] = proto.Migrate(defaultKeyType, fromInfo, toInfo1, ...rest)
  return (toParams ?? []).map((m) => m.name)
}

describe("Migrate (positional table.insert → unshift / push)", () => {
  test("toInfo1 is processed first, rest follow in order (sites 278 + 299)", () => {
    const names = migrateManagerNames(
      1,
      asSavedVarsInfo({ name: "FROM" }),
      asSavedVarsInfo({ name: "T1" }),
      asSavedVarsInfo({ name: "TA" }),
      asSavedVarsInfo({ name: "TB" })
    )
    expect(names).toEqual(["T1", "TA", "TB"])
  })

  test("table-typed first arg shifts params (site 226), then front-inserts (278)", () => {
    const names = migrateManagerNames(
      asSavedVarsInfo({ name: "TBL" }),
      asSavedVarsInfo({ name: "FROM" }),
      asSavedVarsInfo({ name: "TO" })
    )
    expect(names).toEqual(["FROM", "TO"])
  })
})
