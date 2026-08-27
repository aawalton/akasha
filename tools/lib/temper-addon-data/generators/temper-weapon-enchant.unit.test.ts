import { describe, expect, test } from "bun:test"
import { Page } from "../page.ts"
import { generateTemperWeaponEnchant } from "./temper-weapon-enchant.ts"

const noEnchant = Page({
  id: "00000000-0000-0000-0000-00000000d000",
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

const weaponDamage = Page({
  id: "00000000-0000-0000-0000-00000000d001",
  title: "Weapon Damage",
  key: "weapon-damage",
  displayOrder: 1,
  glyphName: "Glyph of Weapon Damage",
  essenceRune: "Okori",
  effect: "Increases Weapon and Spell Damage",
  effects: [
    { metricId: "power-weapon", effectType: "integer", effectValue: 174 },
    { metricId: "power-spell", effectType: "integer", effectValue: 174 },
  ],
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_BERSERKER",
  qualityValues: {
    "weapon-damage": { normal: 134, fine: 141, superior: 153, epic: 160, legendary: 174 },
  },
})

const crushing = Page({
  id: "00000000-0000-0000-0000-00000000d002",
  title: "Crushing",
  key: "crushing",
  displayOrder: 5,
  glyphName: "Glyph of Crushing",
  essenceRune: "Derado",
  effect: "Reduces target armor for 5 seconds (proc-based with ~50% uptime)",
  effects: [
    { metricId: "penetration-physical", effectType: "integer", effectValue: 2108 },
    { metricId: "penetration-spell", effectType: "integer", effectValue: 2108 },
  ],
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_REDUCE_ARMOR",
  qualityValues: {
    crushing: { normal: 1621, fine: 1692, superior: 1830, epic: 1947, legendary: 2108 },
  },
})

const flame = Page({
  id: "00000000-0000-0000-0000-00000000d003",
  title: "Flame",
  key: "flame",
  displayOrder: 7,
  glyphName: "Glyph of Flame",
  essenceRune: "Rakeipa",
  effect: "Deals fire damage on proc",
  effects: [],
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_FIERY_WEAPON",
  qualityValues: {},
})

describe("generateTemperWeaponEnchant", () => {
  test("emits enchants sorted by displayOrder regardless of input order", () => {
    const out = generateTemperWeaponEnchant([crushing, flame, weaponDamage, noEnchant])
    const idxNoEnchant = out.indexOf('"no-enchant"')
    const idxWeaponDamage = out.indexOf('"weapon-damage"')
    const idxCrushing = out.indexOf('"crushing"')
    const idxFlame = out.indexOf('"flame"')
    expect(idxNoEnchant).toBeGreaterThan(-1)
    expect(idxWeaponDamage).toBeGreaterThan(idxNoEnchant)
    expect(idxCrushing).toBeGreaterThan(idxWeaponDamage)
    expect(idxFlame).toBeGreaterThan(idxCrushing)
  })

  test("emits each template entry with id/name/glyphName/essenceRune/effect/effects/esoEnchantConstantName", () => {
    const out = generateTemperWeaponEnchant([weaponDamage])
    expect(out).toContain('"weapon-damage":')
    expect(out).toContain('id: "weapon-damage" as const')
    expect(out).toContain('name: "Weapon Damage"')
    expect(out).toContain('glyphName: "Glyph of Weapon Damage"')
    expect(out).toContain('essenceRune: "Okori"')
    expect(out).toContain('effect: "Increases Weapon and Spell Damage"')
    expect(out).toContain('metricId: "power-weapon"')
    expect(out).toContain('metricId: "power-spell"')
    expect(out).toContain("effectValue: 174")
    expect(out).toContain('esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_BERSERKER"')
  })

  test("emits TEMPER_WEAPON_ENCHANTS_BY_ID and TEMPER_WEAPON_ENCHANT_QUALITY_VALUES exports", () => {
    const out = generateTemperWeaponEnchant([noEnchant, weaponDamage, crushing, flame])
    expect(out).toContain("export const TEMPER_WEAPON_ENCHANTS_BY_ID = {")
    expect(out).toContain("export const TEMPER_WEAPON_ENCHANT_QUALITY_VALUES = {")
  })

  test("omits qualityValues entries for enchants with empty qualityValues record", () => {
    const out = generateTemperWeaponEnchant([noEnchant, weaponDamage, crushing, flame])
    const qvSection = out.split("export const TEMPER_WEAPON_ENCHANT_QUALITY_VALUES")[1] ?? ""
    expect(qvSection).toContain('"weapon-damage"')
    expect(qvSection).toContain('"crushing"')
    expect(qvSection).not.toContain('"no-enchant"')
    expect(qvSection).not.toContain('"flame"')
  })

  test("emits weapon-damage and crushing with their single-component sub-tables", () => {
    const out = generateTemperWeaponEnchant([weaponDamage, crushing])
    const qvSection = out.split("export const TEMPER_WEAPON_ENCHANT_QUALITY_VALUES")[1] ?? ""
    expect(qvSection).toContain('"weapon-damage"')
    expect(qvSection).toContain('"crushing"')
    expect(qvSection).toContain("legendary: 174")
    expect(qvSection).toContain("legendary: 2108")
  })

  test("renders single-component quality values with all five quality keys", () => {
    const out = generateTemperWeaponEnchant([weaponDamage])
    expect(out).toContain("normal: 134")
    expect(out).toContain("fine: 141")
    expect(out).toContain("superior: 153")
    expect(out).toContain("epic: 160")
    expect(out).toContain("legendary: 174")
  })

  test("throws when title is null", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000d004",
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
    expect(() => generateTemperWeaponEnchant([broken])).toThrow(/null title/)
  })

  test("throws on duplicate displayOrder", () => {
    const dup = Page({
      id: "00000000-0000-0000-0000-00000000d005",
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
    expect(() => generateTemperWeaponEnchant([noEnchant, dup])).toThrow(/duplicate displayOrder/)
  })

  test("throws when esoEnchantConstantName is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000d006",
      title: "Broken",
      key: "broken",
      displayOrder: 99,
      glyphName: "",
      essenceRune: "",
      effect: "",
      effects: [],
      qualityValues: {},
    })
    expect(() => generateTemperWeaponEnchant([broken])).toThrow()
  })
})
