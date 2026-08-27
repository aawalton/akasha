import { describe, expect, test } from "bun:test"
import { Page } from "../page.ts"
import { generateTemperArmorEnchant } from "./temper-armor-enchant.ts"

const noEnchant = Page({
  id: "00000000-0000-0000-0000-00000000c000",
  title: "No Enchant",
  key: "no-enchant",
  displayOrder: 0,
  glyphName: "",
  essenceRune: "",
  effect: "",
  effects: [],
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_NONE",
  qualityValues: {},
})

const health = Page({
  id: "00000000-0000-0000-0000-00000000c001",
  title: "Health",
  key: "health",
  displayOrder: 1,
  glyphName: "Glyph of Health",
  essenceRune: "Oko",
  effect: "Increases Maximum Health",
  effects: [{ metricId: "health-maximum", effectType: "integer", effectValue: 954 }],
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_HEALTH",
  qualityValues: {
    health: { normal: 734, fine: 774, superior: 839, epic: 882, legendary: 954 },
  },
})

const prismatic = Page({
  id: "00000000-0000-0000-0000-00000000c002",
  title: "Prismatic Defense",
  key: "prismatic-defense",
  displayOrder: 4,
  glyphName: "Glyph of Prismatic Defense",
  essenceRune: "Hakeijo",
  effect: "Increases Maximum Health, Magicka, and Stamina",
  effects: [
    { metricId: "health-maximum", effectType: "integer", effectValue: 477 },
    { metricId: "magicka-maximum", effectType: "integer", effectValue: 434 },
    { metricId: "stamina-maximum", effectType: "integer", effectValue: 434 },
  ],
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_PRISMATIC_DEFENSE",
  qualityValues: {
    "prismatic-health": { normal: 381, fine: 405, superior: 429, epic: 453, legendary: 477 },
    "prismatic-resource": { normal: 347, fine: 368, superior: 390, epic: 412, legendary: 434 },
  },
})

describe("generateTemperArmorEnchant", () => {
  test("emits enchants sorted by displayOrder regardless of input order", () => {
    const out = generateTemperArmorEnchant([prismatic, health, noEnchant])
    const idxNoEnchant = out.indexOf('"no-enchant"')
    const idxHealth = out.indexOf('"health"')
    const idxPrismatic = out.indexOf('"prismatic-defense"')
    expect(idxNoEnchant).toBeGreaterThan(-1)
    expect(idxHealth).toBeGreaterThan(idxNoEnchant)
    expect(idxPrismatic).toBeGreaterThan(idxHealth)
  })

  test("emits each template entry with id/name/glyphName/essenceRune/effect/effects/esoEnchantConstantName", () => {
    const out = generateTemperArmorEnchant([health])
    expect(out).toContain('"health":')
    expect(out).toContain('id: "health" as const')
    expect(out).toContain('name: "Health"')
    expect(out).toContain('glyphName: "Glyph of Health"')
    expect(out).toContain('essenceRune: "Oko"')
    expect(out).toContain('effect: "Increases Maximum Health"')
    expect(out).toContain('metricId: "health-maximum"')
    expect(out).toContain("effectValue: 954")
    expect(out).toContain('esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_HEALTH"')
  })

  test("emits TEMPER_ARMOR_ENCHANTS_BY_ID and TEMPER_ARMOR_ENCHANT_QUALITY_VALUES exports", () => {
    const out = generateTemperArmorEnchant([noEnchant, health, prismatic])
    expect(out).toContain("export const TEMPER_ARMOR_ENCHANTS_BY_ID = {")
    expect(out).toContain("export const TEMPER_ARMOR_ENCHANT_QUALITY_VALUES = {")
  })

  test("omits qualityValues entries for enchants with empty qualityValues record", () => {
    const out = generateTemperArmorEnchant([noEnchant, health, prismatic])
    const qvSection = out.split("export const TEMPER_ARMOR_ENCHANT_QUALITY_VALUES")[1] ?? ""
    expect(qvSection).toContain('"health"')
    expect(qvSection).toContain('"prismatic-defense"')
    expect(qvSection).not.toContain('"no-enchant"')
  })

  test("emits prismatic-defense with both component sub-tables", () => {
    const out = generateTemperArmorEnchant([prismatic])
    const qvSection = out.split("export const TEMPER_ARMOR_ENCHANT_QUALITY_VALUES")[1] ?? ""
    expect(qvSection).toContain('"prismatic-health"')
    expect(qvSection).toContain('"prismatic-resource"')
    expect(qvSection).toContain("legendary: 477")
    expect(qvSection).toContain("legendary: 434")
  })

  test("renders single-component quality values with all five quality keys", () => {
    const out = generateTemperArmorEnchant([health])
    expect(out).toContain("normal: 734")
    expect(out).toContain("fine: 774")
    expect(out).toContain("superior: 839")
    expect(out).toContain("epic: 882")
    expect(out).toContain("legendary: 954")
  })

  test("throws when title is null", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000c003",
      title: null,
      key: "broken",
      displayOrder: 99,
      glyphName: "",
      essenceRune: "",
      effect: "",
      effects: [],
      esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_NONE",
      qualityValues: {},
    })
    expect(() => generateTemperArmorEnchant([broken])).toThrow(/null title/)
  })

  test("throws on duplicate displayOrder", () => {
    const dup = Page({
      id: "00000000-0000-0000-0000-00000000c004",
      title: "Duplicate",
      key: "duplicate",
      displayOrder: 0,
      glyphName: "",
      essenceRune: "",
      effect: "",
      effects: [],
      esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_NONE",
      qualityValues: {},
    })
    expect(() => generateTemperArmorEnchant([noEnchant, dup])).toThrow(/duplicate displayOrder/)
  })

  test("throws when esoEnchantConstantName is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000c005",
      title: "Broken",
      key: "broken",
      displayOrder: 99,
      glyphName: "",
      essenceRune: "",
      effect: "",
      effects: [],
      qualityValues: {},
    })
    expect(() => generateTemperArmorEnchant([broken])).toThrow()
  })
})
