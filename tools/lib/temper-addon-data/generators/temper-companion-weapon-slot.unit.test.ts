import { describe, expect, test } from "bun:test"
import { Page } from "../page.ts"
import { generateTemperCompanionWeaponSlot } from "./temper-companion-weapon-slot.ts"

const SLOT_MAIN_HAND = "00000000-0000-0000-0000-00000000c001"
const SLOT_OFF_HAND = "00000000-0000-0000-0000-00000000c002"

const mainHand = Page({
  id: SLOT_MAIN_HAND,
  title: "Main Hand",
  key: "main-hand",
})

const offHand = Page({
  id: SLOT_OFF_HAND,
  title: "Off Hand",
  key: "off-hand",
})

describe("generateTemperCompanionWeaponSlot", () => {
  test("emits slots in legacy authoring precedence regardless of input order", () => {
    const out = generateTemperCompanionWeaponSlot([offHand, mainHand])
    const idxMain = out.indexOf('"main-hand"')
    const idxOff = out.indexOf('"off-hand"')
    expect(idxMain).toBeGreaterThan(-1)
    expect(idxOff).toBeGreaterThan(idxMain)
  })

  test("emits each entry as a record value matching the consumer shape", () => {
    const out = generateTemperCompanionWeaponSlot([mainHand])
    expect(out).toContain('"main-hand": { id: "main-hand", name: "Main Hand" },')
  })

  test("emits a satisfies clause against CompanionWeaponSlotTemplate", () => {
    const out = generateTemperCompanionWeaponSlot([mainHand])
    expect(out).toContain("} as const satisfies Record<string, CompanionWeaponSlotTemplate>")
  })

  test("throws when title is null", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000c0ff",
      title: null,
      key: "main-hand",
    })
    expect(() => generateTemperCompanionWeaponSlot([broken])).toThrow(/null title/)
  })

  test("throws when key is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000c0fe",
      title: "Main Hand",
    })
    expect(() => generateTemperCompanionWeaponSlot([broken])).toThrow()
  })
})
