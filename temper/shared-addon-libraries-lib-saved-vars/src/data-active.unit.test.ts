import { afterAll, beforeAll, describe, expect, test } from "bun:test"
import { asDataInstance, asManagerInstance } from "./casts"
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

let getSavedVarsManagers: (
  this: void,
  self: DataInstance,
  scope?: unknown
) => SavedVarsManagerInstance[]

beforeAll(async () => {
  Reflect.set(globalThis, "ZO_SAVED_VARS_CHARACTER_NAME_KEY", 1)
  Reflect.set(globalThis, "ZO_SAVED_VARS_CHARACTER_ID_KEY", 2)
  Reflect.set(globalThis, "LibLua52", undefined)
  Reflect.set(globalThis, "next", nextShim)
  Reflect.set(globalThis, "ipairs", ipairsShim)
  Reflect.set(globalThis, "type", luaType)

  const registry = await import("./registry")
  Reflect.set(registry.LSV, "protected", { Debug: (): undefined => undefined })

  const dataActive = await import("./data-active")
  getSavedVarsManagers = dataActive.getSavedVarsManagers
})

afterAll(() => {
  for (const key of [
    "ZO_SAVED_VARS_CHARACTER_NAME_KEY",
    "ZO_SAVED_VARS_CHARACTER_ID_KEY",
    "LibLua52",
    "next",
    "ipairs",
    "type",
  ]) {
    Reflect.deleteProperty(globalThis, key)
  }
})

function makeManager(this: void, id: number): SavedVarsManagerInstance {
  return asManagerInstance({ id })
}

function makeSelf(
  this: void,
  character?: SavedVarsManagerInstance,
  account?: SavedVarsManagerInstance
): DataInstance {
  return asDataInstance({ __dataSource: { character, account, defaultToAccount: false } })
}

describe("getSavedVarsManagers (table.insert → push)", () => {
  test("wildcard scope appends character then account, in that order", () => {
    const character = makeManager(1)
    const account = makeManager(2)
    const result = getSavedVarsManagers(makeSelf(character, account), undefined)
    expect(result).toEqual([character, account])
  })

  test("only character present → single-element list", () => {
    const character = makeManager(1)
    const result = getSavedVarsManagers(makeSelf(character, undefined), undefined)
    expect(result).toEqual([character])
  })

  test("only account present → single-element list", () => {
    const account = makeManager(2)
    const result = getSavedVarsManagers(makeSelf(undefined, account), undefined)
    expect(result).toEqual([account])
  })

  test("neither present → empty list", () => {
    const result = getSavedVarsManagers(makeSelf(undefined, undefined), undefined)
    expect(result).toEqual([])
  })
})
