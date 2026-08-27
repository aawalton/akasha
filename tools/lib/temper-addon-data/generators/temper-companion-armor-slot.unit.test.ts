import { describe, expect, test } from "bun:test"
import { Page } from "../page.ts"
import { generateTemperCompanionArmorSlot } from "./temper-companion-armor-slot.ts"

const SLOT_HEAD = "00000000-0000-0000-0000-00000000c001"
const SLOT_SHOULDERS = "00000000-0000-0000-0000-00000000c002"
const SLOT_CHEST = "00000000-0000-0000-0000-00000000c003"
const SLOT_HANDS = "00000000-0000-0000-0000-00000000c004"
const SLOT_WAIST = "00000000-0000-0000-0000-00000000c005"
const SLOT_LEGS = "00000000-0000-0000-0000-00000000c006"
const SLOT_FEET = "00000000-0000-0000-0000-00000000c007"

const head = Page({
  id: SLOT_HEAD,
  title: "Head",
  key: "head",
  equipType: 1,
})

const shoulders = Page({
  id: SLOT_SHOULDERS,
  title: "Shoulders",
  key: "shoulders",
  equipType: 4,
})

const chest = Page({
  id: SLOT_CHEST,
  title: "Chest",
  key: "chest",
  equipType: 3,
})

const hands = Page({
  id: SLOT_HANDS,
  title: "Hands",
  key: "hands",
  equipType: 13,
})

const waist = Page({
  id: SLOT_WAIST,
  title: "Waist",
  key: "waist",
  equipType: 8,
})

const legs = Page({
  id: SLOT_LEGS,
  title: "Legs",
  key: "legs",
  equipType: 9,
})

const feet = Page({
  id: SLOT_FEET,
  title: "Feet",
  key: "feet",
  equipType: 10,
})

describe("generateTemperCompanionArmorSlot", () => {
  test("emits slots in head→feet precedence regardless of input order", () => {
    const out = generateTemperCompanionArmorSlot([feet, legs, waist, hands, chest, shoulders, head])
    const idxHead = out.indexOf('"head":')
    const idxShoulders = out.indexOf('"shoulders"')
    const idxChest = out.indexOf('"chest"')
    const idxHands = out.indexOf('"hands"')
    const idxWaist = out.indexOf('"waist"')
    const idxLegs = out.indexOf('"legs"')
    const idxFeet = out.indexOf('"feet"')
    expect(idxHead).toBeGreaterThan(-1)
    expect(idxShoulders).toBeGreaterThan(idxHead)
    expect(idxChest).toBeGreaterThan(idxShoulders)
    expect(idxHands).toBeGreaterThan(idxChest)
    expect(idxWaist).toBeGreaterThan(idxHands)
    expect(idxLegs).toBeGreaterThan(idxWaist)
    expect(idxFeet).toBeGreaterThan(idxLegs)
  })

  test("emits each entry as a record value matching the consumer shape", () => {
    const out = generateTemperCompanionArmorSlot([hands])
    expect(out).toContain('"hands": { id: "hands" as const, name: "Hands", equipType: 13 },')
  })

  test("preserves the equipType numeric field per row", () => {
    const out = generateTemperCompanionArmorSlot([head, chest, feet])
    expect(out).toContain("equipType: 1")
    expect(out).toContain("equipType: 3")
    expect(out).toContain("equipType: 10")
  })

  test("emits a satisfies clause against CompanionArmorSlotTemplate", () => {
    const out = generateTemperCompanionArmorSlot([head])
    expect(out).toContain("} as const satisfies Record<string, CompanionArmorSlotTemplate>")
  })

  test("throws when title is null", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000c0ff",
      title: null,
      key: "head",
      equipType: 1,
    })
    expect(() => generateTemperCompanionArmorSlot([broken])).toThrow(/null title/)
  })

  test("throws when key is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000c0fe",
      title: "Head",
      equipType: 1,
    })
    expect(() => generateTemperCompanionArmorSlot([broken])).toThrow()
  })

  test("throws when equipType is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000c0fd",
      title: "Head",
      key: "head",
    })
    expect(() => generateTemperCompanionArmorSlot([broken])).toThrow()
  })

  test("throws on duplicate key", () => {
    const dup = Page({
      id: "00000000-0000-0000-0000-00000000c0fc",
      title: "Head Duplicate",
      key: "head",
      equipType: 1,
    })
    expect(() => generateTemperCompanionArmorSlot([head, dup])).toThrow(/duplicate key/)
  })
})
