import { afterAll, beforeAll, describe, expect, test } from "bun:test"

const SET_ID = 999
const ZONE_ID = 3
const OTHER_ZONE_ID = 57
const DROP_LOCATION = "Fungal Grotto I"
const OTHER_DROP_LOCATION = "Spindleclutch II"

const shimmedGlobals = ["LibSets", "$multi"]

type Table = { [key: string]: unknown } | { [key: number]: unknown } | unknown[]

type LibShim = {
  setsLoaded: boolean
  dropZones: Table
  setId2DropZones: Table
  dropZone2SetIds: Table
  dropLocationNames: Table
  dropLocationNames2SetIds: Table
  setId2DropLocationNames: Table
  setIds: Table
  _safeReturnAPItable: (this: void, tabData: unknown) => unknown
  checkIfSetsAreLoadedProperly: (this: void, setId?: number) => boolean
  LangAllowedCheck: (this: void, lang?: string) => string
  GetCurrentZoneIds: (this: void) => [number | undefined, number | undefined]
  GetAllDropZones?: (this: void) => unknown
  GetDropZonesBySetId?: (this: void, setId: number | undefined) => unknown
  GetSetIdsByDropZone?: (this: void, zoneId: number | undefined) => unknown
  GetSetIdsOfCurrentZone?: (this: void) => [unknown, number | undefined, number | undefined]
  GetAllDropLocationNames?: (this: void, lang?: string) => unknown
  GetDropLocationNamesBySetId?: (this: void, setId: number | undefined, lang?: string) => unknown
  GetSetIdsByDropLocationName?: (
    this: void,
    dropLocationName: string | undefined,
    lang?: string
  ) => unknown
}

function safeReturnAPItable(this: void, tabData: unknown): unknown {
  if (tabData === undefined) {
    return undefined
  }
  if (typeof tabData !== "object" || tabData === null) {
    return tabData
  }
  return Array.isArray(tabData) ? [...tabData] : { ...tabData }
}

const lib: LibShim = {
  setsLoaded: false,
  dropZones: {},
  setId2DropZones: {},
  dropZone2SetIds: {},
  dropLocationNames: {},
  dropLocationNames2SetIds: {},
  setId2DropLocationNames: {},
  setIds: {},
  _safeReturnAPItable: safeReturnAPItable,
  checkIfSetsAreLoadedProperly: (): boolean => lib.setsLoaded,
  LangAllowedCheck: (): string => "en",
  GetCurrentZoneIds: (): [number | undefined, number | undefined] => [ZONE_ID, undefined],
}

function required<T>(value: T | undefined, name: string): T {
  if (value === undefined) {
    throw new Error(`shim is missing ${name} — the module did not publish it`)
  }
  return value
}

function runLoadSets(): undefined {
  lib.dropZones = { [ZONE_ID]: true, [OTHER_ZONE_ID]: true }
  lib.setId2DropZones = { [SET_ID]: { [ZONE_ID]: true } }
  lib.dropZone2SetIds = { [ZONE_ID]: { [SET_ID]: true } }
  lib.dropLocationNames = { en: [DROP_LOCATION, OTHER_DROP_LOCATION] }
  lib.dropLocationNames2SetIds = { en: { [DROP_LOCATION]: { [SET_ID]: true } } }
  lib.setId2DropLocationNames = { [SET_ID]: { en: { [DROP_LOCATION]: true } } }
  lib.setIds = { [SET_ID]: true }
  lib.setsLoaded = true
}

beforeAll(async () => {
  Reflect.set(globalThis, "LibSets", lib)
  Reflect.set(globalThis, "$multi", (...args: unknown[]): unknown[] => args)

  await import("./api-drop-zones-sets")

  runLoadSets()
})

afterAll(() => {
  for (const key of shimmedGlobals) {
    Reflect.deleteProperty(globalThis, key)
  }
})

describe("drop-zone getters report post-LoadSets data", () => {
  test("GetAllDropZones sees the zones LoadSets published", () => {
    expect(required(lib.GetAllDropZones, "GetAllDropZones")()).toEqual({
      [ZONE_ID]: true,
      [OTHER_ZONE_ID]: true,
    })
  })

  test("GetDropZonesBySetId resolves a set to its zones", () => {
    expect(required(lib.GetDropZonesBySetId, "GetDropZonesBySetId")(SET_ID)).toEqual({
      [ZONE_ID]: true,
    })
  })

  test("GetSetIdsByDropZone resolves a zone to its sets", () => {
    expect(required(lib.GetSetIdsByDropZone, "GetSetIdsByDropZone")(ZONE_ID)).toEqual({
      [SET_ID]: true,
    })
  })

  test("GetSetIdsOfCurrentZone reaches the data through its internal self-call", () => {
    const [setIdsOfCurrentZone, currentZoneId] = required(
      lib.GetSetIdsOfCurrentZone,
      "GetSetIdsOfCurrentZone"
    )()
    expect(setIdsOfCurrentZone).toEqual({ [SET_ID]: true })
    expect(currentZoneId).toBe(ZONE_ID)
  })
})

describe("drop-location getters report post-LoadSets data", () => {
  test("GetAllDropLocationNames sees the names LoadSets published", () => {
    expect(required(lib.GetAllDropLocationNames, "GetAllDropLocationNames")()).toEqual([
      DROP_LOCATION,
      OTHER_DROP_LOCATION,
    ])
  })

  test("GetDropLocationNamesBySetId resolves a set to its drop locations", () => {
    expect(
      required(lib.GetDropLocationNamesBySetId, "GetDropLocationNamesBySetId")(SET_ID)
    ).toEqual({ [DROP_LOCATION]: true })
  })

  test("GetSetIdsByDropLocationName resolves a drop location to its sets", () => {
    expect(
      required(lib.GetSetIdsByDropLocationName, "GetSetIdsByDropLocationName")(DROP_LOCATION)
    ).toEqual({ [SET_ID]: true })
  })
})

describe("the loaded-gate stays distinguishable from empty data", () => {
  test("an unloaded library returns undefined, never an empty table", () => {
    lib.setsLoaded = false
    try {
      expect(required(lib.GetAllDropZones, "GetAllDropZones")()).toBeUndefined()
      expect(required(lib.GetAllDropLocationNames, "GetAllDropLocationNames")()).toBeUndefined()
    } finally {
      lib.setsLoaded = true
    }
  })
})
