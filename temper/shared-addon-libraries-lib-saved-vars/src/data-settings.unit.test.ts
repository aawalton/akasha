import { afterAll, beforeAll, describe, expect, test } from "bun:test"
import { asDataInstance, asManagerInstance, asNumber } from "./casts"
import type { DataInstance, SavedVarsManagerInstance } from "./types"

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

type RemoveCall = [number, readonly string[]]

let removeSettings: (
  this: void,
  self: DataInstance,
  versionNum: number,
  scope?: unknown,
  settingsToRemove?: unknown,
  ...rest: string[]
) => DataInstance

beforeAll(async () => {
  Reflect.set(globalThis, "ZO_SAVED_VARS_CHARACTER_NAME_KEY", 1)
  Reflect.set(globalThis, "ZO_SAVED_VARS_CHARACTER_ID_KEY", 2)
  Reflect.set(globalThis, "LibLua52", undefined)
  Reflect.set(globalThis, "next", nextShim)
  Reflect.set(globalThis, "ipairs", ipairsShim)
  Reflect.set(globalThis, "type", luaType)
  Reflect.set(globalThis, "tostring", (v: unknown) => String(v))
  Reflect.set(globalThis, "error", (m: string) => {
    throw new Error(m)
  })

  const registry = await import("./registry")
  Reflect.set(registry.LSV, "protected", { Debug: (): undefined => undefined })

  const dataSettings = await import("./data-settings")
  removeSettings = dataSettings.removeSettings
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
    "error",
  ]) {
    Reflect.deleteProperty(globalThis, key)
  }
})

function makeSelf(this: void, calls: RemoveCall[]): DataInstance {
  const recMgr = asManagerInstance({
    RemoveSettings(
      this: SavedVarsManagerInstance,
      version: number,
      settingsToRemove: readonly string[]
    ): SavedVarsManagerInstance {
      calls.push([version, [...settingsToRemove]])
      return this
    },
  })
  return asDataInstance({ __dataSource: { character: recMgr, defaultToAccount: false } })
}

describe("removeSettings (positional table.insert → unshift)", () => {
  test("string in the scope slot: both unshifts fire, settings prepended in order", () => {
    const calls: RemoveCall[] = []
    removeSettings(makeSelf(calls), 5, "keyA", "keyB")
    expect(calls).toEqual([[5, ["keyA", "keyB"]]])
  })

  test("explicit nil scope, string settings + rest: site 196 prepends the setting", () => {
    const calls: RemoveCall[] = []
    removeSettings(makeSelf(calls), 7, undefined, "first", "second")
    expect(calls).toEqual([[7, ["first", "second"]]])
  })

  test("array settings (not a string): no unshift, list passed through verbatim", () => {
    const calls: RemoveCall[] = []
    removeSettings(makeSelf(calls), 9, undefined, ["x", "y"])
    expect(calls).toEqual([[9, ["x", "y"]]])
  })

  test("non-number version raises", () => {
    expect(() => removeSettings(makeSelf([]), asNumber("bad"), "k")).toThrow()
  })
})
