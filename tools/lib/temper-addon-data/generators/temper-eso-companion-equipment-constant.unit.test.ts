import { describe, expect, test } from "bun:test"
import { Page } from "../page.ts"
import { generateTemperEsoCompanionEquipmentConstant } from "./temper-eso-companion-equipment-constant.ts"

const equipTypeHead = Page({
  id: "00000000-0000-0000-0000-00000000e001",
  title: "Equip Type Head",
  key: "equip-type:EQUIP_TYPE_HEAD",
  kind: "equip-type",
  keyText: "EQUIP_TYPE_HEAD",
  valueNum: 1,
  valueText: null,
  displayOrder: 1,
})

const equipTypeRing = Page({
  id: "00000000-0000-0000-0000-00000000e002",
  title: "Equip Type Ring",
  key: "equip-type:EQUIP_TYPE_RING",
  kind: "equip-type",
  keyText: "EQUIP_TYPE_RING",
  valueNum: 12,
  valueText: null,
  displayOrder: 11,
})

const qualityEsoToCompanion3 = Page({
  id: "00000000-0000-0000-0000-00000000e003",
  title: "ESO Quality 3 → Superior",
  key: "quality-eso-to-companion:3",
  kind: "quality-eso-to-companion",
  keyText: "3",
  valueNum: null,
  valueText: "superior",
  displayOrder: 3,
})

const qualityEsoToCompanion1 = Page({
  id: "00000000-0000-0000-0000-00000000e004",
  title: "ESO Quality 1 → Normal",
  key: "quality-eso-to-companion:1",
  kind: "quality-eso-to-companion",
  keyText: "1",
  valueNum: null,
  valueText: "normal",
  displayOrder: 1,
})

const companionToEsoNoQuality = Page({
  id: "00000000-0000-0000-0000-00000000e005",
  title: "No Quality → ESO 5",
  key: "quality-companion-to-eso:no-quality",
  kind: "quality-companion-to-eso",
  keyText: "no-quality",
  valueNum: 5,
  valueText: null,
  displayOrder: 1,
})

const companionToEsoLegendary = Page({
  id: "00000000-0000-0000-0000-00000000e006",
  title: "Legendary → ESO 5",
  key: "quality-companion-to-eso:legendary",
  kind: "quality-companion-to-eso",
  keyText: "legendary",
  valueNum: 5,
  valueText: null,
  displayOrder: 6,
})

const allRows = [
  equipTypeRing,
  qualityEsoToCompanion3,
  companionToEsoLegendary,
  equipTypeHead,
  companionToEsoNoQuality,
  qualityEsoToCompanion1,
]

describe("generateTemperEsoCompanionEquipmentConstant", () => {
  test("emits the three named records in fixed positional order", () => {
    const out = generateTemperEsoCompanionEquipmentConstant(allRows)
    const idxEquip = out.indexOf("export const ESO_EQUIP_TYPES_GENERATED")
    const idxEsoToCompanion = out.indexOf("export const ESO_QUALITY_TO_COMPANION_QUALITY_GENERATED")
    const idxCompanionToEso = out.indexOf("export const COMPANION_QUALITY_TO_ESO_GENERATED")
    expect(idxEquip).toBeGreaterThan(-1)
    expect(idxEsoToCompanion).toBeGreaterThan(idxEquip)
    expect(idxCompanionToEso).toBeGreaterThan(idxEsoToCompanion)
  })

  test("emits equip-type rows sorted by displayOrder with bare-identifier keys and bare-number values", () => {
    const out = generateTemperEsoCompanionEquipmentConstant(allRows)
    const idxHead = out.indexOf("EQUIP_TYPE_HEAD: 1,")
    const idxRing = out.indexOf("EQUIP_TYPE_RING: 12,")
    expect(idxHead).toBeGreaterThan(-1)
    expect(idxRing).toBeGreaterThan(idxHead)
  })

  test("emits quality-eso-to-companion rows with bare-number keys and quoted string values", () => {
    const out = generateTemperEsoCompanionEquipmentConstant(allRows)
    const idx1 = out.indexOf('  1: "normal",')
    const idx3 = out.indexOf('  3: "superior",')
    expect(idx1).toBeGreaterThan(-1)
    expect(idx3).toBeGreaterThan(idx1)
  })

  test("emits quality-companion-to-eso rows with quoted-string keys and bare-number values", () => {
    const out = generateTemperEsoCompanionEquipmentConstant(allRows)
    expect(out).toContain('"no-quality": 5,')
    expect(out).toContain('"legendary": 5,')
    const idxNoQuality = out.indexOf('"no-quality": 5,')
    const idxLegendary = out.indexOf('"legendary": 5,')
    expect(idxLegendary).toBeGreaterThan(idxNoQuality)
  })

  test("preserves the equip-type record `as const` so consumers see literal numbers", () => {
    const out = generateTemperEsoCompanionEquipmentConstant(allRows)
    expect(out).toContain("} as const")
  })

  test("throws when an equip-type row has null valueNum", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000e0ff",
      title: "Bad",
      key: "equip-type:EQUIP_TYPE_BAD",
      kind: "equip-type",
      keyText: "EQUIP_TYPE_BAD",
      valueNum: null,
      valueText: null,
      displayOrder: 99,
    })
    expect(() => generateTemperEsoCompanionEquipmentConstant([broken])).toThrow(/null valueNum/)
  })

  test("throws when a quality-eso-to-companion row has null valueText", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000e0fe",
      title: "Bad",
      key: "quality-eso-to-companion:9",
      kind: "quality-eso-to-companion",
      keyText: "9",
      valueNum: 9,
      valueText: null,
      displayOrder: 99,
    })
    expect(() => generateTemperEsoCompanionEquipmentConstant([broken])).toThrow(/null valueText/)
  })

  test("throws when a quality-companion-to-eso row has null valueNum", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000e0fd",
      title: "Bad",
      key: "quality-companion-to-eso:bogus",
      kind: "quality-companion-to-eso",
      keyText: "bogus",
      valueNum: null,
      valueText: null,
      displayOrder: 99,
    })
    expect(() => generateTemperEsoCompanionEquipmentConstant([broken])).toThrow(/null valueNum/)
  })
})
