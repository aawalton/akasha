import "./test-eso-load-globals"

import { afterEach, beforeEach, describe, expect, it } from "bun:test"
import { scanPersonalBags } from "./inventory-ops"
import { getCharacterLocationKey } from "./location-keys"
import { getDatabase, setSavedVarsInstance } from "./saved-variables-ref"
import { SAVED_VARIABLES_DEFAULTS, type SavedVariablesData } from "./types"

const STUBBED_KEYS = [
  "GetCurrentCharacterId",
  "GetUnitName",
  "GetBagSize",
  "GetTimeStamp",
  "d",
] as const

const originals = new Map<string, unknown>()

let currentCharacterId: unknown = ""

function installStubs(): undefined {
  for (const k of STUBBED_KEYS) originals.set(k, Reflect.get(globalThis, k))
  Reflect.set(globalThis, "GetCurrentCharacterId", (): unknown => currentCharacterId)
  Reflect.set(globalThis, "GetUnitName", (): string => "Auriel")
  Reflect.set(globalThis, "GetBagSize", (): number => 0)
  Reflect.set(globalThis, "GetTimeStamp", (): number => 1)
  Reflect.set(globalThis, "d", (): undefined => undefined)
}

function restoreStubs(): undefined {
  for (const [k, v] of originals) Reflect.set(globalThis, k, v)
  originals.clear()
}

function seedEmptyDatabase(): SavedVariablesData {
  const sv: SavedVariablesData = {
    ...SAVED_VARIABLES_DEFAULTS,
    db: { ...SAVED_VARIABLES_DEFAULTS.db, locations: {} },
  }
  setSavedVarsInstance(sv)
  return sv
}

beforeEach(() => {
  installStubs()
})

afterEach(() => {
  restoreStubs()
})

describe("getCharacterLocationKey", () => {
  it("returns the character id once identity has resolved", () => {
    currentCharacterId = "8796093022208001"
    expect(getCharacterLocationKey()).toBe("8796093022208001")
  })

  it("returns undefined when identity has not resolved", () => {
    currentCharacterId = ""
    expect(getCharacterLocationKey()).toBeUndefined()
  })

  it("returns undefined for the numeric no-character sentinel", () => {
    currentCharacterId = 0
    expect(getCharacterLocationKey()).toBeUndefined()
    currentCharacterId = "0"
    expect(getCharacterLocationKey()).toBeUndefined()
  })
})

describe("scanPersonalBags", () => {
  it("writes the row under the character id", () => {
    currentCharacterId = "8796093022208001"
    const sv = seedEmptyDatabase()

    scanPersonalBags()

    expect(Object.keys(sv.db.locations)).toEqual(["8796093022208001"])
  })

  it("writes no row at all when identity has not resolved", () => {
    currentCharacterId = ""
    const sv = seedEmptyDatabase()

    scanPersonalBags()

    expect(Object.keys(sv.db.locations)).toEqual([])
    expect(getDatabase().locations[""]).toBeUndefined()
  })
})
