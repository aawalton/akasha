import { describe, expect, test } from "bun:test"
import {
  extractGlobalNames,
  extractStringIdNames,
  isEsoGlobalName,
} from "./eso-base-game-globals.ts"

describe("isEsoGlobalName — ESO global-naming convention", () => {
  test.each([
    "WORLD_MAP_SCENE",
    "HOUSING_EDITOR_STATE",
    "ZO_KeyboardOptions",
    "ZO_Object",
    "GAMEPAD_WORLD_MAP_SCENE",
    "SHARED_INVENTORY",
    "A",
  ])("accepts base-game global name: %s", (n) => {
    expect(isEsoGlobalName(n)).toBe(true)
  })

  test.each([
    "localThing",
    "mapScene",
    "LibDebugLogger",
    "i",
    "zo_lowercase",
  ])("rejects non-base-game name: %s", (n) => {
    expect(isEsoGlobalName(n)).toBe(false)
  })
})

describe("extractGlobalNames — top-level global assignments only", () => {
  test("captures a bare top-level global assignment", () => {
    expect(extractGlobalNames("WORLD_MAP_SCENE = ZO_Scene:New('worldMap')")).toEqual([
      "WORLD_MAP_SCENE",
    ])
  })

  test("captures an indented (non-`local`) global assignment", () => {
    expect(extractGlobalNames("    HOUSING_EDITOR_STATE = ZO_HousingEditorState:New()")).toEqual([
      "HOUSING_EDITOR_STATE",
    ])
  })

  test("excludes `local` declarations", () => {
    expect(extractGlobalNames("local WORLD_MAP_SCENE = 5")).toEqual([])
  })

  test("excludes field / index assignments", () => {
    expect(extractGlobalNames("FOO.bar = 1\nBAZ[1] = 2")).toEqual([])
  })

  test("excludes equality comparisons", () => {
    expect(extractGlobalNames("if WORLD_MAP_SCENE == nil then")).toEqual([])
  })

  test("excludes lowercase / mixed-case locals that are global-assigned", () => {
    expect(extractGlobalNames("mapScene = something")).toEqual([])
  })

  test("captures multiple distinct globals across lines", () => {
    const src = `WORLD_MAP_SCENE = a\nZO_KeyboardOptions = b\nlocal skip = c\nGAMEPAD_WORLD_MAP_SCENE = d`
    expect(new Set(extractGlobalNames(src))).toEqual(
      new Set(["WORLD_MAP_SCENE", "ZO_KeyboardOptions", "GAMEPAD_WORLD_MAP_SCENE"])
    )
  })
})

describe("extractStringIdNames — every SI_* name the source mentions", () => {
  test("captures a SafeAddString declaration, which no assignment scan reaches", () => {
    const src = 'SAS(SI_ACCOUNT_NAME, "UserID", 3)'
    expect(extractGlobalNames(src)).toEqual([])
    expect(extractStringIdNames(src)).toEqual(["SI_ACCOUNT_NAME"])
  })

  test("captures an id read rather than declared", () => {
    expect(extractStringIdNames("label:SetText(GetString(SI_GAMEPAD_HELP_SEARCH))")).toEqual([
      "SI_GAMEPAD_HELP_SEARCH",
    ])
  })

  test("does not read an SI_ name out of the middle of a longer identifier", () => {
    expect(extractStringIdNames("local MY_SI_THING = 1")).toEqual([])
  })

  test("captures nothing from source that mentions no string id", () => {
    expect(extractStringIdNames("WORLD_MAP_SCENE = ZO_Scene:New('worldMap')")).toEqual([])
  })

  test("dedupes within one source and keeps every distinct id", () => {
    const src = 'SAS(SI_A_ID, "a", 1)\nGetString(SI_A_ID)\nSAS(SI_B_ID, "b", 1)'
    expect(new Set(extractStringIdNames(src))).toEqual(new Set(["SI_A_ID", "SI_B_ID"]))
  })
})
