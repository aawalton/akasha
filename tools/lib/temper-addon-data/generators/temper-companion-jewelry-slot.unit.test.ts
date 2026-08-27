import { describe, expect, test } from "bun:test"
import { Page } from "../page.ts"
import { generateTemperCompanionJewelrySlot } from "./temper-companion-jewelry-slot.ts"

const SLOT_NECKLACE = "00000000-0000-0000-0000-00000000b001"
const SLOT_RING_1 = "00000000-0000-0000-0000-00000000b002"
const SLOT_RING_2 = "00000000-0000-0000-0000-00000000b003"

const necklace = Page({
  id: SLOT_NECKLACE,
  title: "Necklace",
  key: "necklace",
  equipType: 2,
  slotCategory: "necklace",
})

const ring1 = Page({
  id: SLOT_RING_1,
  title: "Ring 1",
  key: "ring-1",
  equipType: 12,
  slotCategory: "ring",
})

const ring2 = Page({
  id: SLOT_RING_2,
  title: "Ring 2",
  key: "ring-2",
  equipType: 12,
  slotCategory: "ring",
})

describe("generateTemperCompanionJewelrySlot", () => {
  test("emits slots in legacy authoring precedence regardless of input order", () => {
    const out = generateTemperCompanionJewelrySlot([ring2, ring1, necklace])
    const idxNecklace = out.indexOf('"necklace":')
    const idxRing1 = out.indexOf('"ring-1":')
    const idxRing2 = out.indexOf('"ring-2":')
    expect(idxNecklace).toBeGreaterThan(-1)
    expect(idxRing1).toBeGreaterThan(idxNecklace)
    expect(idxRing2).toBeGreaterThan(idxRing1)
  })

  test("emits each entry with id, name, equipType, slotCategory", () => {
    const out = generateTemperCompanionJewelrySlot([necklace])
    expect(out).toContain('"necklace": {')
    expect(out).toContain('id: "necklace" as const,')
    expect(out).toContain('name: "Necklace",')
    expect(out).toContain("equipType: 2,")
    expect(out).toContain('slotCategory: "necklace",')
  })

  test("emits numeric equipType as a bare number literal (not a string)", () => {
    const out = generateTemperCompanionJewelrySlot([ring1])
    expect(out).toContain("equipType: 12,")
    expect(out).not.toContain('equipType: "12"')
  })

  test("emits a createDataFile wrapper over CompanionJewelrySlotTemplate", () => {
    const out = generateTemperCompanionJewelrySlot([necklace])
    expect(out).toContain("satisfies Record<string, CompanionJewelrySlotTemplate>")
    expect(out).toContain(
      "export const companionJewelrySlots = createDataFile<CompanionJewelrySlotTemplate>()("
    )
    expect(out).toContain("COMPANION_JEWELRY_SLOTS_DATA")
  })

  test("throws when title is null", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000b0ff",
      title: null,
      key: "necklace",
      equipType: 2,
      slotCategory: "necklace",
    })
    expect(() => generateTemperCompanionJewelrySlot([broken])).toThrow(/null title/)
  })

  test("throws when key is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000b0fe",
      title: "Necklace",
      equipType: 2,
      slotCategory: "necklace",
    })
    expect(() => generateTemperCompanionJewelrySlot([broken])).toThrow()
  })

  test("throws when equipType is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000b0fd",
      title: "Necklace",
      key: "necklace",
      slotCategory: "necklace",
    })
    expect(() => generateTemperCompanionJewelrySlot([broken])).toThrow()
  })

  test("throws when slotCategory is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000b0fc",
      title: "Necklace",
      key: "necklace",
      equipType: 2,
    })
    expect(() => generateTemperCompanionJewelrySlot([broken])).toThrow()
  })
})
