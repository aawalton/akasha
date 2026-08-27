import { afterAll, beforeAll, describe, expect, test } from "bun:test"
import { asDataInstance, asLsvTable, asManagerInstance } from "./casts"
import type { DataInstance, LsvTable, NextFn } from "./types"

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

let getIterator: (this: void, self: DataInstance | undefined) => [NextFn, DataInstance | undefined]

beforeAll(async () => {
  Reflect.set(globalThis, "ZO_SAVED_VARS_CHARACTER_NAME_KEY", 1)
  Reflect.set(globalThis, "ZO_SAVED_VARS_CHARACTER_ID_KEY", 2)
  Reflect.set(globalThis, "LibLua52", undefined)
  Reflect.set(globalThis, "next", nextShim)
  Reflect.set(globalThis, "ipairs", ipairsShim)
  Reflect.set(globalThis, "type", luaType)
  Reflect.set(globalThis, "tostring", (v: unknown) => String(v))
  Reflect.set(globalThis, "$multi", (...args: unknown[]) => args)
  Reflect.set(globalThis, "rawget", (t: Record<string, unknown>, k: string) => t[k])

  const registry = await import("./registry")
  Reflect.set(registry.LSV, "protected", { Debug: (): undefined => undefined })
  Reflect.set(registry.LSV, "lib", { GetRawDataTable: (sv: LsvTable) => sv })

  const dataIterator = await import("./data-iterator")
  getIterator = dataIterator.getIterator
})

afterAll(() => {
  for (const key of [
    "ZO_SAVED_VARS_CHARACTER_NAME_KEY",
    "ZO_SAVED_VARS_CHARACTER_ID_KEY",
    "LibLua52",
    "next",
    "ipairs",
    "type",
    "tostring",
    "$multi",
    "rawget",
  ]) {
    Reflect.deleteProperty(globalThis, key)
  }
})

function drain(this: void, iter: NextFn, self: DataInstance): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  let key: unknown
  for (;;) {
    const [nextKey, value] = iter(self, key)
    if (nextKey === undefined) {
      break
    }
    out[String(nextKey)] = value
    key = nextKey
  }
  return out
}

describe("getIterator (table.insert → push)", () => {
  test("streams the active raw-data pairs, then the __dataSource sentinel last", () => {
    const ds = { active: asManagerInstance({ savedVars: asLsvTable({ x: 1, y: 2 }) }) }
    const self = asDataInstance({ __dataSource: ds })
    const [iterator] = getIterator(self)
    const streamed = drain(iterator, self)
    expect(streamed).toEqual({ x: 1, y: 2, __dataSource: ds })
  })

  test("with no active saved vars, streams only the __dataSource sentinel (site 82)", () => {
    const ds = { active: undefined, account: undefined, character: undefined }
    const self = asDataInstance({ __dataSource: ds })
    const [iterator] = getIterator(self)
    const streamed = drain(iterator, self)
    expect(streamed).toEqual({ __dataSource: ds })
  })
})
