import { describe, expect, test } from "bun:test"
import { Page } from "../page.ts"
import { generateTemperArmorSlot } from "./temper-armor-slot.ts"

const SLOT_HEAD = "00000000-0000-0000-0000-00000000a001"
const SLOT_SHOULDERS = "00000000-0000-0000-0000-00000000a002"
const SLOT_CHEST = "00000000-0000-0000-0000-00000000a003"
const SLOT_FEET = "00000000-0000-0000-0000-00000000a007"

const head = Page({
  id: SLOT_HEAD,
  title: "Head",
  icon: "/resources/gearslot_head.png",
  key: "head",
  displayOrder: 0,
})
const shoulders = Page({
  id: SLOT_SHOULDERS,
  title: "Shoulders",
  icon: "/resources/gearslot_shoulders.png",
  key: "shoulders",
  displayOrder: 1,
})
const chest = Page({
  id: SLOT_CHEST,
  title: "Chest",
  icon: "/resources/gearslot_chest.png",
  key: "chest",
  displayOrder: 2,
})
const feet = Page({
  id: SLOT_FEET,
  title: "Feet",
  icon: "/resources/gearslot_feet.png",
  key: "feet",
  displayOrder: 6,
})

describe("generateTemperArmorSlot", () => {
  test("emits slots sorted by displayOrder regardless of input order", () => {
    const out = generateTemperArmorSlot([feet, chest, head, shoulders])
    const idxHead = out.indexOf('"head"')
    const idxShoulders = out.indexOf('"shoulders"')
    const idxChest = out.indexOf('"chest"')
    const idxFeet = out.indexOf('"feet"')
    expect(idxHead).toBeGreaterThan(-1)
    expect(idxShoulders).toBeGreaterThan(idxHead)
    expect(idxChest).toBeGreaterThan(idxShoulders)
    expect(idxFeet).toBeGreaterThan(idxChest)
  })

  test("emits the icon path verbatim from the universal column", () => {
    const out = generateTemperArmorSlot([head, shoulders])
    expect(out).toContain('icon: "/resources/gearslot_head.png"')
    expect(out).toContain('icon: "/resources/gearslot_shoulders.png"')
  })

  test("emits each entry as a literal-id-typed record value", () => {
    const out = generateTemperArmorSlot([head])
    expect(out).toContain(
      '"head": { id: "head" as const, name: "Head", icon: "/resources/gearslot_head.png" },'
    )
  })

  test("throws when title is null", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000a008",
      title: null,
      icon: "/resources/gearslot_head.png",
      key: "head",
      displayOrder: 0,
    })
    expect(() => generateTemperArmorSlot([broken])).toThrow(/null title/)
  })

  test("throws when icon is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000a009",
      title: "Head",
      key: "head",
      displayOrder: 0,
    })
    expect(() => generateTemperArmorSlot([broken])).toThrow(/missing or empty icon/)
  })

  test("throws when key is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000a00a",
      title: "Head",
      icon: "/resources/gearslot_head.png",
      displayOrder: 0,
    })
    expect(() => generateTemperArmorSlot([broken])).toThrow()
  })

  test("throws when displayOrder is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000a00b",
      title: "Head",
      icon: "/resources/gearslot_head.png",
      key: "head",
    })
    expect(() => generateTemperArmorSlot([broken])).toThrow()
  })

  test("throws on duplicate displayOrder", () => {
    const dup = Page({
      id: "00000000-0000-0000-0000-00000000a00c",
      title: "Duplicate",
      icon: "/resources/gearslot_head.png",
      key: "shoulders",
      displayOrder: 0,
    })
    expect(() => generateTemperArmorSlot([head, dup])).toThrow(/duplicate displayOrder/)
  })
})
