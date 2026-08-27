import { describe, expect, test } from "bun:test"
import { Page } from "../page.ts"
import { generateTemperWeaponSlot } from "./temper-weapon-slot.ts"

const SLOT_MAIN_HAND = "00000000-0000-0000-0000-00000000b001"
const SLOT_OFF_HAND = "00000000-0000-0000-0000-00000000b002"
const SLOT_POISON = "00000000-0000-0000-0000-00000000b003"

const mainHand = Page({
  id: SLOT_MAIN_HAND,
  title: "Main Hand",
  icon: "/resources/gearslot_mainhand.png",
  key: "main-hand",
  displayOrder: 0,
})
const offHand = Page({
  id: SLOT_OFF_HAND,
  title: "Off Hand",
  icon: "/resources/gearslot_offhand.png",
  key: "off-hand",
  displayOrder: 1,
})
const poison = Page({
  id: SLOT_POISON,
  title: "Poison",
  key: "poison",
  displayOrder: 2,
})

describe("generateTemperWeaponSlot", () => {
  test("emits slots sorted by displayOrder regardless of input order", () => {
    const out = generateTemperWeaponSlot([poison, mainHand, offHand])
    const idxMain = out.indexOf('"main-hand"')
    const idxOff = out.indexOf('"off-hand"')
    const idxPoison = out.indexOf('"poison"')
    expect(idxMain).toBeGreaterThan(-1)
    expect(idxOff).toBeGreaterThan(idxMain)
    expect(idxPoison).toBeGreaterThan(idxOff)
  })

  test("emits the icon path verbatim from the universal column", () => {
    const out = generateTemperWeaponSlot([mainHand, offHand])
    expect(out).toContain('icon: "/resources/gearslot_mainhand.png"')
    expect(out).toContain('icon: "/resources/gearslot_offhand.png"')
  })

  test("emits each entry as a literal-id-typed record value", () => {
    const out = generateTemperWeaponSlot([mainHand])
    expect(out).toContain(
      '"main-hand": { id: "main-hand" as const, name: "Main Hand", icon: "/resources/gearslot_mainhand.png" },'
    )
  })

  test("omits the icon field entirely when the universal column is missing", () => {
    const out = generateTemperWeaponSlot([poison])
    expect(out).toContain('"poison": { id: "poison" as const, name: "Poison" },')
    const poisonLine = out.split("\n").find((l) => l.includes('"poison"'))
    expect(poisonLine).toBeDefined()
    expect(poisonLine).not.toContain("icon")
  })

  test("throws when title is null", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000b004",
      title: null,
      icon: "/resources/gearslot_mainhand.png",
      key: "main-hand",
      displayOrder: 0,
    })
    expect(() => generateTemperWeaponSlot([broken])).toThrow(/null title/)
  })

  test("throws when key is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000b005",
      title: "Main Hand",
      icon: "/resources/gearslot_mainhand.png",
      displayOrder: 0,
    })
    expect(() => generateTemperWeaponSlot([broken])).toThrow()
  })

  test("throws when displayOrder is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000b006",
      title: "Main Hand",
      icon: "/resources/gearslot_mainhand.png",
      key: "main-hand",
    })
    expect(() => generateTemperWeaponSlot([broken])).toThrow()
  })

  test("throws on duplicate displayOrder", () => {
    const dup = Page({
      id: "00000000-0000-0000-0000-00000000b007",
      title: "Duplicate",
      icon: "/resources/gearslot_mainhand.png",
      key: "off-hand",
      displayOrder: 0,
    })
    expect(() => generateTemperWeaponSlot([mainHand, dup])).toThrow(/duplicate displayOrder/)
  })
})
