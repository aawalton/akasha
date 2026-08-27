import "./test-eso-load-globals"

import { afterEach, beforeEach, describe, expect, it } from "bun:test"
import { migrateEmptyLocationKey, pruneDeletedCharacters } from "./saved-variables"
import { setSavedVarsInstance } from "./saved-variables-ref"
import { type LocationData, SAVED_VARIABLES_DEFAULTS, type SavedVariablesData } from "./types"

const LIVE = "8796093022208001"
const DELETED = "8796093022208002"

const STUBBED_KEYS = ["GetNumCharacters", "GetCharacterInfo", "d"] as const

const originals = new Map<string, unknown>()

let accountCharacterIds: string[] = []

function installStubs(): undefined {
  for (const k of STUBBED_KEYS) originals.set(k, Reflect.get(globalThis, k))
  Reflect.set(globalThis, "GetNumCharacters", (): number => accountCharacterIds.length)
  Reflect.set(globalThis, "GetCharacterInfo", (index: number): unknown[] => [
    `Character ${index}`,
    0,
    50,
    0,
    0,
    0,
    accountCharacterIds[index - 1],
    0,
  ])
  Reflect.set(globalThis, "d", (): undefined => undefined)
}

function restoreStubs(): undefined {
  for (const [k, v] of originals) Reflect.set(globalThis, k, v)
  originals.clear()
}

function rowWithBags(displayName: string, bagIds: number[]): LocationData {
  const bags: Record<number, Record<number, never>> = {}
  const bagSizes: Record<number, number> = {}
  for (const bagId of bagIds) {
    bags[bagId] = {}
    bagSizes[bagId] = 60
  }
  return { bags, bagSizes, displayName, lastScanned: 1 }
}

function characterRow(name: string): LocationData {
  return rowWithBags(name, [BAG_WORN, BAG_BACKPACK])
}

function guildBankRow(guildName: string): LocationData {
  return rowWithBags(guildName, [BAG_GUILDBANK])
}

function seed(locations: Record<string, LocationData>): SavedVariablesData {
  const sv: SavedVariablesData = {
    ...SAVED_VARIABLES_DEFAULTS,
    db: {
      ...SAVED_VARIABLES_DEFAULTS.db,
      locations,
      currencies: { characters: { [LIVE]: { balances: {} }, [DELETED]: { balances: {} } } },
    },
    craftingLevels: { [LIVE]: {}, [DELETED]: {} },
  }
  setSavedVarsInstance(sv)
  return sv
}

beforeEach(() => {
  accountCharacterIds = [LIVE]
  installStubs()
})

afterEach(() => {
  restoreStubs()
})

describe("pruneDeletedCharacters", () => {
  it("has a guild-bank bag id distinct from the personal bags", () => {
    expect(BAG_GUILDBANK).not.toBe(BAG_WORN)
    expect(BAG_GUILDBANK).not.toBe(BAG_BACKPACK)
  })

  it("removes the location row of a character that is no longer on the account", () => {
    const sv = seed({
      [LIVE]: characterRow("Live"),
      [DELETED]: characterRow("Deleted"),
    })

    pruneDeletedCharacters()

    expect(Object.keys(sv.db.locations).sort()).toEqual([LIVE])
  })

  it("keeps a guild bank whose name is all digits", () => {
    const sv = seed({
      [LIVE]: characterRow("Live"),
      "1337": guildBankRow("1337"),
    })

    pruneDeletedCharacters()

    expect(sv.db.locations["1337"]).toBeDefined()
  })

  it("keeps guild banks whose names merely parse as Lua numbers", () => {
    const guildNames = ["0x1F", "1e5", "3.14", "-7", ".5", " 42", "Inf", "NaN"]
    const locations: Record<string, LocationData> = { [LIVE]: characterRow("Live") }
    for (const name of guildNames) locations[name] = guildBankRow(name)
    const sv = seed(locations)

    pruneDeletedCharacters()

    for (const name of guildNames) {
      expect(sv.db.locations[name], `guild bank ${JSON.stringify(name)} was deleted`).toBeDefined()
    }
  })

  it("keeps a row it cannot positively identify as a character row", () => {
    const sv = seed({
      [LIVE]: characterRow("Live"),
      "8796093022208003": rowWithBags("No bags scanned yet", []),
      "8796093022208004": rowWithBags("Collision", [BAG_WORN, BAG_BACKPACK, BAG_GUILDBANK]),
    })

    pruneDeletedCharacters()

    expect(sv.db.locations["8796093022208003"]).toBeDefined()
    expect(sv.db.locations["8796093022208004"]).toBeDefined()
  })

  it("deletes nothing when the account reports zero characters", () => {
    accountCharacterIds = []
    const sv = seed({
      [LIVE]: characterRow("Live"),
      [DELETED]: characterRow("Deleted"),
    })

    pruneDeletedCharacters()

    expect(Object.keys(sv.db.locations).sort()).toEqual([LIVE, DELETED].sort())
    expect(Object.keys(sv.db.currencies?.characters ?? {}).sort()).toEqual([LIVE, DELETED].sort())
    expect(Object.keys(sv.craftingLevels ?? {}).sort()).toEqual([LIVE, DELETED].sort())
  })

  it("still prunes currencies and crafting levels for a deleted character", () => {
    const sv = seed({ [LIVE]: characterRow("Live") })

    pruneDeletedCharacters()

    expect(Object.keys(sv.db.currencies?.characters ?? {})).toEqual([LIVE])
    expect(Object.keys(sv.craftingLevels ?? {})).toEqual([LIVE])
  })

  it("does not remove the empty location key, which is not a character row", () => {
    const sv = seed({ [LIVE]: characterRow("Live"), "": rowWithBags("", []) })

    pruneDeletedCharacters()

    expect(sv.db.locations[""]).toBeDefined()
  })
})

describe("migrateEmptyLocationKey", () => {
  it("removes a location saved under an empty key", () => {
    const sv = seed({ [LIVE]: characterRow("Live"), "": rowWithBags("", [BAG_BACKPACK]) })

    migrateEmptyLocationKey()

    expect(sv.db.locations[""]).toBeUndefined()
    expect(sv.db.locations[LIVE]).toBeDefined()
  })

  it("is a no-op when there is no empty key", () => {
    const sv = seed({ [LIVE]: characterRow("Live") })

    migrateEmptyLocationKey()
    migrateEmptyLocationKey()

    expect(Object.keys(sv.db.locations)).toEqual([LIVE])
  })
})
