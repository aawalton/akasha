import { describe, expect, test } from "bun:test"
import { Page } from "../page.ts"
import { generateTemperJewelryEnchant } from "./temper-jewelry-enchant.ts"

const noEnchant = Page({
  id: "00000000-0000-0000-0000-00000000e000",
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

const increasePhysicalHarm = Page({
  id: "00000000-0000-0000-0000-00000000e001",
  title: "Increase Physical Harm",
  key: "increase-physical-harm",
  displayOrder: 1,
  glyphName: "Glyph of Increase Physical Harm",
  essenceRune: "Taderi",
  effect: "Increases Weapon and Spell Damage",
  effects: [
    { metricId: "power-weapon", effectType: "integer", effectValue: 174 },
    { metricId: "power-spell", effectType: "integer", effectValue: 174 },
  ],
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_INCREASE_PHYSICAL_DAMAGE",
  qualityValues: {
    harm: { normal: 134, fine: 141, superior: 153, epic: 160, legendary: 174 },
  },
})

const prismaticRecovery = Page({
  id: "00000000-0000-0000-0000-00000000e002",
  title: "Prismatic Recovery",
  key: "prismatic-recovery",
  displayOrder: 6,
  glyphName: "Glyph of Prismatic Recovery",
  essenceRune: "Indeko",
  effect: "Increases Health, Magicka, and Stamina Recovery",
  effects: [
    { metricId: "health-recovery", effectType: "integer", effectValue: 84 },
    { metricId: "magicka-recovery", effectType: "integer", effectValue: 84 },
    { metricId: "stamina-recovery", effectType: "integer", effectValue: 84 },
  ],
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_PRISMATIC_REGEN",
  qualityValues: {
    "prismatic-recovery": { normal: 67, fine: 71, superior: 75, epic: 80, legendary: 84 },
  },
})

const flameResist = Page({
  id: "00000000-0000-0000-0000-00000000e003",
  title: "Flame Resist",
  key: "flame-resist",
  displayOrder: 10,
  glyphName: "Glyph of Flame Resist",
  essenceRune: "Rakeipa",
  effect: "Increases Flame Resistance",
  effects: [{ metricId: "resistance-flame", effectType: "integer", effectValue: 927 }],
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_FIRE_RESISTANT",
  qualityValues: {
    resistance: { normal: 713, fine: 744, superior: 805, epic: 856, legendary: 927 },
  },
})

describe("generateTemperJewelryEnchant", () => {
  test("emits enchants sorted by displayOrder regardless of input order", () => {
    const out = generateTemperJewelryEnchant([
      flameResist,
      prismaticRecovery,
      increasePhysicalHarm,
      noEnchant,
    ])
    const idxNoEnchant = out.indexOf('"no-enchant"')
    const idxIncreasePhysicalHarm = out.indexOf('"increase-physical-harm"')
    const idxPrismaticRecovery = out.indexOf('"prismatic-recovery"')
    const idxFlameResist = out.indexOf('"flame-resist"')
    expect(idxNoEnchant).toBeGreaterThan(-1)
    expect(idxIncreasePhysicalHarm).toBeGreaterThan(idxNoEnchant)
    expect(idxPrismaticRecovery).toBeGreaterThan(idxIncreasePhysicalHarm)
    expect(idxFlameResist).toBeGreaterThan(idxPrismaticRecovery)
  })

  test("emits each template entry with id/name/glyphName/essenceRune/effect/effects/esoEnchantConstantName", () => {
    const out = generateTemperJewelryEnchant([increasePhysicalHarm])
    expect(out).toContain('"increase-physical-harm":')
    expect(out).toContain('id: "increase-physical-harm" as const')
    expect(out).toContain('name: "Increase Physical Harm"')
    expect(out).toContain('glyphName: "Glyph of Increase Physical Harm"')
    expect(out).toContain('essenceRune: "Taderi"')
    expect(out).toContain('effect: "Increases Weapon and Spell Damage"')
    expect(out).toContain('metricId: "power-weapon"')
    expect(out).toContain('metricId: "power-spell"')
    expect(out).toContain("effectValue: 174")
    expect(out).toContain(
      'esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_INCREASE_PHYSICAL_DAMAGE"'
    )
  })

  test("emits TEMPER_JEWELRY_ENCHANTS_BY_ID and TEMPER_JEWELRY_ENCHANT_QUALITY_VALUES exports", () => {
    const out = generateTemperJewelryEnchant([noEnchant, increasePhysicalHarm, prismaticRecovery])
    expect(out).toContain("export const TEMPER_JEWELRY_ENCHANTS_BY_ID = {")
    expect(out).toContain("export const TEMPER_JEWELRY_ENCHANT_QUALITY_VALUES = {")
  })

  test("omits qualityValues entries for enchants with empty qualityValues record", () => {
    const out = generateTemperJewelryEnchant([noEnchant, increasePhysicalHarm, prismaticRecovery])
    const qvSection = out.split("export const TEMPER_JEWELRY_ENCHANT_QUALITY_VALUES")[1] ?? ""
    expect(qvSection).toContain('"increase-physical-harm"')
    expect(qvSection).toContain('"prismatic-recovery"')
    expect(qvSection).not.toContain('"no-enchant"')
  })

  test("emits enchants with their component-keyed sub-tables", () => {
    const out = generateTemperJewelryEnchant([increasePhysicalHarm, prismaticRecovery, flameResist])
    const qvSection = out.split("export const TEMPER_JEWELRY_ENCHANT_QUALITY_VALUES")[1] ?? ""
    expect(qvSection).toContain('"increase-physical-harm"')
    expect(qvSection).toContain('"prismatic-recovery"')
    expect(qvSection).toContain('"flame-resist"')
    expect(qvSection).toContain('"harm"')
    expect(qvSection).toContain('"prismatic-recovery"')
    expect(qvSection).toContain('"resistance"')
  })

  test("renders quality values with all five quality keys", () => {
    const out = generateTemperJewelryEnchant([increasePhysicalHarm])
    expect(out).toContain("normal: 134")
    expect(out).toContain("fine: 141")
    expect(out).toContain("superior: 153")
    expect(out).toContain("epic: 160")
    expect(out).toContain("legendary: 174")
  })

  test("throws when title is null", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000e004",
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
    expect(() => generateTemperJewelryEnchant([broken])).toThrow(/null title/)
  })

  test("throws on duplicate displayOrder", () => {
    const dup = Page({
      id: "00000000-0000-0000-0000-00000000e005",
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
    expect(() => generateTemperJewelryEnchant([noEnchant, dup])).toThrow(/duplicate displayOrder/)
  })

  test("throws when esoEnchantConstantName is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000e006",
      title: "Broken",
      key: "broken",
      displayOrder: 99,
      glyphName: "",
      essenceRune: "",
      effect: "",
      effects: [],
      qualityValues: {},
    })
    expect(() => generateTemperJewelryEnchant([broken])).toThrow()
  })
})
