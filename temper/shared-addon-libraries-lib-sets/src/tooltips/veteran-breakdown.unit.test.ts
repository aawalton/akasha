import { afterAll, beforeAll, describe, expect, test } from "bun:test"
import type { VeteranPieceEntry } from "./veteran-breakdown"

const EQUIP_TYPE_HEAD = 1
const EQUIP_TYPE_CHEST = 3
const EQUIP_TYPE_SHOULDERS = 4

const shimmedGlobals = [
  "LibSets",
  "zo_iconTextFormat",
  "LIBSETS_SETTYPE_MONSTER",
  "LIBSETS_SETTYPE_IMPERIALCITY_MONSTER",
  "LIBSETS_SETTYPE_CYRODIIL_MONSTER",
  "PopupTooltip",
  "InformationTooltip",
  "ItemTooltip",
  "TOOLTIP_GAME_DATA_MYTHIC_OR_STOLEN",
]

let resolveVeteranPieces: (
  this: void,
  veteranTable: { [equipType: number]: boolean | undefined },
  setEquipTypes: number[]
) => VeteranPieceEntry[]
let isUniformBreakdown: (this: void, entries: VeteranPieceEntry[]) => boolean

beforeAll(async () => {
  Reflect.set(globalThis, "LibSets", {
    clientLang: "en",
    LangAllowedCheck: (): string => "en",
    localization: { en: {} },
    setTypeToTexture: {},
    setTypeToDropZoneLocalizationStr: {},
    undauntedChestIds: { en: {} },
  })
  Reflect.set(globalThis, "zo_iconTextFormat", (): string => "")
  Reflect.set(globalThis, "LIBSETS_SETTYPE_MONSTER", 1)
  Reflect.set(globalThis, "LIBSETS_SETTYPE_IMPERIALCITY_MONSTER", 2)
  Reflect.set(globalThis, "LIBSETS_SETTYPE_CYRODIIL_MONSTER", 3)
  Reflect.set(globalThis, "PopupTooltip", undefined)
  Reflect.set(globalThis, "InformationTooltip", undefined)
  Reflect.set(globalThis, "ItemTooltip", undefined)
  Reflect.set(globalThis, "TOOLTIP_GAME_DATA_MYTHIC_OR_STOLEN", 0)

  const veteranBreakdown = await import("./veteran-breakdown")
  resolveVeteranPieces = veteranBreakdown.resolveVeteranPieces
  isUniformBreakdown = veteranBreakdown.isUniformBreakdown
})

afterAll(() => {
  for (const key of shimmedGlobals) {
    Reflect.deleteProperty(globalThis, key)
  }
})

describe("resolveVeteranPieces", () => {
  test("the 61-set shape {HEAD:true, SHOULDERS:false} expands to two states", () => {
    const entries = resolveVeteranPieces(
      { [EQUIP_TYPE_HEAD]: true, [EQUIP_TYPE_SHOULDERS]: false },
      [EQUIP_TYPE_HEAD, EQUIP_TYPE_SHOULDERS]
    )
    expect(entries).toEqual([
      { equipType: EQUIP_TYPE_HEAD, state: "veteran" },
      { equipType: EQUIP_TYPE_SHOULDERS, state: "normal" },
    ])
  })

  test("an equipType the SET has but the veteran table omits is unknown, not normal", () => {
    const entries = resolveVeteranPieces(
      { [EQUIP_TYPE_HEAD]: true, [EQUIP_TYPE_SHOULDERS]: false },
      [EQUIP_TYPE_HEAD, EQUIP_TYPE_CHEST, EQUIP_TYPE_SHOULDERS]
    )
    expect(entries).toEqual([
      { equipType: EQUIP_TYPE_HEAD, state: "veteran" },
      { equipType: EQUIP_TYPE_CHEST, state: "unknown" },
      { equipType: EQUIP_TYPE_SHOULDERS, state: "normal" },
    ])
  })

  test("an explicitly stored false stays normal — false and absent do not merge", () => {
    const entries = resolveVeteranPieces({ [EQUIP_TYPE_HEAD]: false }, [
      EQUIP_TYPE_HEAD,
      EQUIP_TYPE_SHOULDERS,
    ])
    expect(entries).toEqual([
      { equipType: EQUIP_TYPE_HEAD, state: "normal" },
      { equipType: EQUIP_TYPE_SHOULDERS, state: "unknown" },
    ])
  })

  test("output is sorted ascending by equipType regardless of input order", () => {
    const entries = resolveVeteranPieces(
      { [EQUIP_TYPE_HEAD]: true, [EQUIP_TYPE_CHEST]: false, [EQUIP_TYPE_SHOULDERS]: false },
      [EQUIP_TYPE_SHOULDERS, EQUIP_TYPE_HEAD, EQUIP_TYPE_CHEST]
    )
    expect(entries.map((entry) => entry.equipType)).toEqual([
      EQUIP_TYPE_HEAD,
      EQUIP_TYPE_CHEST,
      EQUIP_TYPE_SHOULDERS,
    ])
  })

  test("a set with no equip types yields no entries", () => {
    expect(resolveVeteranPieces({ [EQUIP_TYPE_HEAD]: true }, [])).toEqual([])
  })
})

describe("isUniformBreakdown", () => {
  test("the 3-set shape {HEAD:false, SHOULDERS:false} is uniform", () => {
    const entries = resolveVeteranPieces(
      { [EQUIP_TYPE_HEAD]: false, [EQUIP_TYPE_SHOULDERS]: false },
      [EQUIP_TYPE_HEAD, EQUIP_TYPE_SHOULDERS]
    )
    expect(isUniformBreakdown(entries)).toBe(true)
  })

  test("an all-veteran breakdown is uniform", () => {
    const entries = resolveVeteranPieces(
      { [EQUIP_TYPE_HEAD]: true, [EQUIP_TYPE_SHOULDERS]: true },
      [EQUIP_TYPE_HEAD, EQUIP_TYPE_SHOULDERS]
    )
    expect(isUniformBreakdown(entries)).toBe(true)
  })

  test("the non-uniform {HEAD:true, SHOULDERS:false} shape is not uniform", () => {
    const entries = resolveVeteranPieces(
      { [EQUIP_TYPE_HEAD]: true, [EQUIP_TYPE_SHOULDERS]: false },
      [EQUIP_TYPE_HEAD, EQUIP_TYPE_SHOULDERS]
    )
    expect(isUniformBreakdown(entries)).toBe(false)
  })

  test("an all-unknown breakdown is NOT uniform", () => {
    const entries = resolveVeteranPieces({}, [EQUIP_TYPE_HEAD, EQUIP_TYPE_SHOULDERS])
    expect(entries.every((entry) => entry.state === "unknown")).toBe(true)
    expect(isUniformBreakdown(entries)).toBe(false)
  })

  test("a single unknown among agreeing pieces breaks uniformity", () => {
    const entries = resolveVeteranPieces(
      { [EQUIP_TYPE_HEAD]: false, [EQUIP_TYPE_SHOULDERS]: false },
      [EQUIP_TYPE_HEAD, EQUIP_TYPE_CHEST, EQUIP_TYPE_SHOULDERS]
    )
    expect(isUniformBreakdown(entries)).toBe(false)
  })

  test("an empty breakdown is vacuously uniform — the faithful path still answers", () => {
    expect(isUniformBreakdown([])).toBe(true)
  })
})
