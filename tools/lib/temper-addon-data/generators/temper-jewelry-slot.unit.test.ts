import { describe, expect, test } from "bun:test"
import { Page } from "../page.ts"
import { generateTemperJewelrySlot } from "./temper-jewelry-slot.ts"

const SLOT_NECKLACE = "00000000-0000-0000-0000-00000000c001"
const SLOT_RING_1 = "00000000-0000-0000-0000-00000000c002"
const SLOT_RING_2 = "00000000-0000-0000-0000-00000000c003"

const necklace = Page({
  id: SLOT_NECKLACE,
  title: "Necklace",
  icon: "/resources/gearslot_neck.png",
  key: "necklace",
  typeId: "necklace",
  displayOrder: 0,
})
const ring1 = Page({
  id: SLOT_RING_1,
  title: "Ring 1",
  icon: "/resources/gearslot_ring.png",
  key: "ring-1",
  typeId: "ring",
  displayOrder: 1,
})
const ring2 = Page({
  id: SLOT_RING_2,
  title: "Ring 2",
  icon: "/resources/gearslot_ring.png",
  key: "ring-2",
  typeId: "ring",
  displayOrder: 2,
})

describe("generateTemperJewelrySlot", () => {
  test("emits slots sorted by displayOrder regardless of input order", () => {
    const out = generateTemperJewelrySlot([ring2, necklace, ring1])
    const idxNeck = out.indexOf('"necklace"')
    const idxR1 = out.indexOf('"ring-1"')
    const idxR2 = out.indexOf('"ring-2"')
    expect(idxNeck).toBeGreaterThan(-1)
    expect(idxR1).toBeGreaterThan(idxNeck)
    expect(idxR2).toBeGreaterThan(idxR1)
  })

  test("emits each entry as a literal-id-typed record value with typeId and icon", () => {
    const out = generateTemperJewelrySlot([necklace])
    expect(out).toContain(
      '"necklace": { id: "necklace" as const, name: "Necklace", typeId: "necklace" as const, icon: "/resources/gearslot_neck.png" },'
    )
  })

  test("emits ring slots referencing the shared ring typeId", () => {
    const out = generateTemperJewelrySlot([ring1, ring2])
    expect(out).toContain(
      '"ring-1": { id: "ring-1" as const, name: "Ring 1", typeId: "ring" as const, icon: "/resources/gearslot_ring.png" },'
    )
    expect(out).toContain(
      '"ring-2": { id: "ring-2" as const, name: "Ring 2", typeId: "ring" as const, icon: "/resources/gearslot_ring.png" },'
    )
  })

  test("throws when title is null", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000c004",
      title: null,
      icon: "/resources/gearslot_neck.png",
      key: "necklace",
      typeId: "necklace",
      displayOrder: 0,
    })
    expect(() => generateTemperJewelrySlot([broken])).toThrow(/null title/)
  })

  test("throws when icon is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000c005",
      title: "Necklace",
      key: "necklace",
      typeId: "necklace",
      displayOrder: 0,
    })
    expect(() => generateTemperJewelrySlot([broken])).toThrow(/missing icon/)
  })

  test("throws when typeId is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000c006",
      title: "Necklace",
      icon: "/resources/gearslot_neck.png",
      key: "necklace",
      displayOrder: 0,
    })
    expect(() => generateTemperJewelrySlot([broken])).toThrow()
  })

  test("throws when displayOrder is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000c007",
      title: "Necklace",
      icon: "/resources/gearslot_neck.png",
      key: "necklace",
      typeId: "necklace",
    })
    expect(() => generateTemperJewelrySlot([broken])).toThrow()
  })

  test("throws on duplicate displayOrder", () => {
    const dup = Page({
      id: "00000000-0000-0000-0000-00000000c008",
      title: "Duplicate",
      icon: "/resources/gearslot_ring.png",
      key: "ring-1",
      typeId: "ring",
      displayOrder: 0,
    })
    expect(() => generateTemperJewelrySlot([necklace, dup])).toThrow(/duplicate displayOrder/)
  })
})
