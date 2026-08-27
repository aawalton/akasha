import { describe, expect, test } from "bun:test"
import { Page } from "../page.ts"
import { generateTemperCompanionEquipmentQuality } from "./temper-companion-equipment-quality.ts"

const NO_QUALITY = Page({
  id: "00000000-0000-0000-0000-00000000c001",
  title: "No Quality",
  key: "no-quality",
  available: true,
  displayOrder: 0,
})

const NORMAL = Page({
  id: "00000000-0000-0000-0000-00000000c002",
  title: "Normal",
  key: "normal",
  available: true,
  displayOrder: 1,
})

const FINE = Page({
  id: "00000000-0000-0000-0000-00000000c003",
  title: "Fine",
  key: "fine",
  available: true,
  displayOrder: 2,
})

const SUPERIOR = Page({
  id: "00000000-0000-0000-0000-00000000c004",
  title: "Superior",
  key: "superior",
  available: true,
  displayOrder: 3,
})

const EPIC = Page({
  id: "00000000-0000-0000-0000-00000000c005",
  title: "Epic",
  key: "epic",
  available: true,
  displayOrder: 4,
})

const LEGENDARY = Page({
  id: "00000000-0000-0000-0000-00000000c006",
  title: "Legendary",
  key: "legendary",
  available: false,
  displayOrder: 5,
})

describe("generateTemperCompanionEquipmentQuality", () => {
  test("emits qualities sorted by displayOrder regardless of input order", () => {
    const out = generateTemperCompanionEquipmentQuality([
      LEGENDARY,
      FINE,
      NO_QUALITY,
      EPIC,
      NORMAL,
      SUPERIOR,
    ])
    const idxNoQuality = out.indexOf('"no-quality"')
    const idxNormal = out.indexOf('"normal"')
    const idxFine = out.indexOf('"fine"')
    const idxSuperior = out.indexOf('"superior"')
    const idxEpic = out.indexOf('"epic"')
    const idxLegendary = out.indexOf('"legendary"')
    expect(idxNoQuality).toBeGreaterThan(-1)
    expect(idxNormal).toBeGreaterThan(idxNoQuality)
    expect(idxFine).toBeGreaterThan(idxNormal)
    expect(idxSuperior).toBeGreaterThan(idxFine)
    expect(idxEpic).toBeGreaterThan(idxSuperior)
    expect(idxLegendary).toBeGreaterThan(idxEpic)
  })

  test("emits each row with id as const literal and an inline available boolean", () => {
    const out = generateTemperCompanionEquipmentQuality([NO_QUALITY, NORMAL, LEGENDARY])
    expect(out).toContain('id: "no-quality" as const')
    expect(out).toContain('id: "normal" as const')
    expect(out).toContain('id: "legendary" as const')
    expect(out).toContain("available: true,")
    expect(out).toContain("available: false,")
  })

  test("preserves the human-readable name in the `name:` field", () => {
    const out = generateTemperCompanionEquipmentQuality([NO_QUALITY, NORMAL, LEGENDARY])
    expect(out).toContain('name: "No Quality"')
    expect(out).toContain('name: "Normal"')
    expect(out).toContain('name: "Legendary"')
  })

  test("emits the satisfies clause against CompanionEquipmentQualityTemplate", () => {
    const out = generateTemperCompanionEquipmentQuality([NO_QUALITY])
    expect(out).toContain("} satisfies Record<string, CompanionEquipmentQualityTemplate>")
  })

  test("throws when title is null", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000c007",
      title: null,
      key: "broken",
      available: true,
      displayOrder: 0,
    })
    expect(() => generateTemperCompanionEquipmentQuality([broken])).toThrow(/null title/)
  })

  test("throws when key is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000c008",
      title: "Bad",
      available: true,
      displayOrder: 0,
    })
    expect(() => generateTemperCompanionEquipmentQuality([broken])).toThrow()
  })

  test("throws when available is not a boolean", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000c009",
      title: "Bad",
      key: "bad",
      available: "yes",
      displayOrder: 0,
    })
    expect(() => generateTemperCompanionEquipmentQuality([broken])).toThrow()
  })

  test("throws on duplicate displayOrder", () => {
    const dup = Page({
      id: "00000000-0000-0000-0000-00000000c00a",
      title: "Duplicate",
      key: "dup",
      available: true,
      displayOrder: 0,
    })
    expect(() => generateTemperCompanionEquipmentQuality([NO_QUALITY, dup])).toThrow(
      /duplicate displayOrder/
    )
  })
})
