import { afterAll, beforeAll, describe, expect, test } from "bun:test"
import type { AccountAndProfile, LibSavedVarsTable } from "./types"

function luaType(this: void, v: unknown): string {
  if (v === undefined || v === null) {
    return "nil"
  }
  if (Array.isArray(v)) {
    return "table"
  }
  return typeof v === "object" ? "table" : typeof v
}

function pairsShim(this: void, obj: Record<string, unknown>): Iterable<[string, unknown]> {
  return Object.entries(obj)
}

function nextShim(this: void, t: Record<string, unknown>, key?: unknown): [unknown, unknown] {
  const keys = Object.keys(t).filter((k) => t[k] !== undefined)
  if (key === undefined) {
    return keys.length === 0 ? [undefined, undefined] : [keys[0], t[keys[0]]]
  }
  const nextKey = keys[keys.indexOf(String(key)) + 1]
  return nextKey === undefined ? [undefined, undefined] : [nextKey, t[nextKey]]
}

function ipairsShim<T>(this: void, list: readonly T[]): Iterable<[number, T]> {
  return {
    [Symbol.iterator]() {
      let index = 0
      return {
        next(): IteratorResult<[number, T]> {
          index += 1
          const value = list[index - 1]
          if (value === undefined) {
            return { done: true, value: undefined }
          }
          return { done: false, value: [index, value] }
        },
      }
    },
  }
}

let lib: LibSavedVarsTable

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
  Reflect.set(globalThis, "LibLua52", undefined)
  Reflect.set(globalThis, "next", nextShim)
  Reflect.set(globalThis, "ipairs", ipairsShim)
  Reflect.set(globalThis, "type", luaType)
  Reflect.set(globalThis, "pairs", pairsShim)
  Reflect.set(globalThis, "string", {
    sub: (s: string, i: number, j?: number) => s.slice(i - 1, j),
  })
  Reflect.set(globalThis, "error", (m: string) => {
    throw new Error(m)
  })

  const libCore = await import("./lib-core")
  libCore.installLibCore()
  const registry = await import("./registry")
  lib = registry.LSV.lib
})

afterAll(() => {
  for (const key of [
    "ZO_SAVED_VARS_CHARACTER_NAME_KEY",
    "ZO_SAVED_VARS_CHARACTER_ID_KEY",
    "LuaTable",
    "LibLua52",
    "next",
    "ipairs",
    "type",
    "pairs",
    "string",
    "error",
  ]) {
    Reflect.deleteProperty(globalThis, key)
  }
})

function collect(this: void, name: string, table: Record<string, unknown>): AccountAndProfile[] {
  Reflect.set(globalThis, "_G", { [name]: table })
  const getAccountsAndProfiles = Reflect.get(lib, "GetAccountsAndProfiles")
  return getAccountsAndProfiles(undefined, name)
}

describe("getAccountsAndProfiles (table.insert → push)", () => {
  test("collects each top-level @account key in pairs order", () => {
    const result = collect("TestVarA", {
      "@alice": { setting: 1 },
      "@bob": { setting: 2 },
    })
    expect(result).toEqual([{ account: "@alice" }, { account: "@bob" }])
  })

  test("non-@ top-level keys contribute nothing (unreachable nested push quirk)", () => {
    const result = collect("TestVarB", {
      "@alice": { setting: 1 },
      ProfileBucket: { "@bob": { setting: 2 } },
    })
    expect(result).toEqual([{ account: "@alice" }])
  })

  test("no @account keys → empty list", () => {
    const result = collect("TestVarC", { ProfileBucket: { "@bob": {} } })
    expect(result).toEqual([])
  })
})
