import { describe, expect, test } from "bun:test"
import { Page } from "../page.ts"
import { generateTemperWeaponTrait } from "./temper-weapon-trait.ts"

const noTrait = Page({
  id: "00000000-0000-0000-0000-00000000c000",
  title: "No Trait",
  key: "no-trait",
  displayOrder: 0,
  esoTraitConstantName: "ITEM_TRAIT_TYPE_NONE",
  material: "",
  effect: "",
  effects: [],
  qualityValues: null,
})

const charged = Page({
  id: "00000000-0000-0000-0000-00000000c001",
  title: "Charged",
  key: "charged",
  displayOrder: 1,
  esoTraitConstantName: "ITEM_TRAIT_TYPE_WEAPON_CHARGED",
  material: "Amethyst",
  effect: "Increases Status Effect Chance",
  effects: [
    { metricId: "status-effect-chance", effectType: "fractional-change", effectValue: 1.175 },
  ],
  qualityValues: { normal: 0.975, fine: 1.025, superior: 1.075, epic: 1.125, legendary: 1.175 },
})

const defending = Page({
  id: "00000000-0000-0000-0000-00000000c002",
  title: "Defending",
  key: "defending",
  displayOrder: 3,
  esoTraitConstantName: "ITEM_TRAIT_TYPE_WEAPON_DEFENDING",
  material: "Turquoise",
  effect: "Increases Physical and Spell Resistance",
  effects: [
    { metricId: "resistance-physical", effectType: "integer", effectValue: 1638 },
    { metricId: "resistance-spell", effectType: "integer", effectValue: 1638 },
  ],
  qualityValues: { normal: 1428, fine: 1485, superior: 1542, epic: 1580, legendary: 1638 },
})

const ornate = Page({
  id: "00000000-0000-0000-0000-00000000c003",
  title: "Ornate",
  key: "ornate",
  displayOrder: 10,
  esoTraitConstantName: "ITEM_TRAIT_TYPE_WEAPON_ORNATE",
  material: "",
  effect: "Increases sell price",
  effects: [],
  qualityValues: null,
})

describe("generateTemperWeaponTrait", () => {
  test("emits traits sorted by displayOrder regardless of input order", () => {
    const out = generateTemperWeaponTrait([ornate, defending, charged, noTrait])
    const idxNoTrait = out.indexOf('"no-trait"')
    const idxCharged = out.indexOf('"charged"')
    const idxDefending = out.indexOf('"defending"')
    const idxOrnate = out.indexOf('"ornate"')
    expect(idxNoTrait).toBeGreaterThan(-1)
    expect(idxCharged).toBeGreaterThan(idxNoTrait)
    expect(idxDefending).toBeGreaterThan(idxCharged)
    expect(idxOrnate).toBeGreaterThan(idxDefending)
  })

  test("emits each template entry with id/name/esoTraitConstantName/material/effect/effects", () => {
    const out = generateTemperWeaponTrait([defending])
    expect(out).toContain('"defending":')
    expect(out).toContain('id: "defending" as const')
    expect(out).toContain('name: "Defending"')
    expect(out).toContain('esoTraitConstantName: "ITEM_TRAIT_TYPE_WEAPON_DEFENDING"')
    expect(out).toContain('material: "Turquoise"')
    expect(out).toContain('effect: "Increases Physical and Spell Resistance"')
    expect(out).toContain('metricId: "resistance-physical"')
    expect(out).toContain('metricId: "resistance-spell"')
    expect(out).toContain('effectType: "integer"')
    expect(out).toContain("effectValue: 1638")
  })

  test("emits TEMPER_WEAPON_TRAITS_BY_ID and TEMPER_WEAPON_TRAIT_QUALITY_VALUES exports", () => {
    const out = generateTemperWeaponTrait([noTrait, charged, ornate])
    expect(out).toContain("export const TEMPER_WEAPON_TRAITS_BY_ID = {")
    expect(out).toContain("export const TEMPER_WEAPON_TRAIT_QUALITY_VALUES = {")
  })

  test("omits qualityValues entries for traits with null qualityValues", () => {
    const out = generateTemperWeaponTrait([noTrait, charged, ornate])
    const qvSection = out.split("TEMPER_WEAPON_TRAIT_QUALITY_VALUES")[1] ?? ""
    expect(qvSection).toContain('"charged"')
    expect(qvSection).not.toContain('"no-trait"')
    expect(qvSection).not.toContain('"ornate"')
  })

  test("renders quality values with all five quality keys", () => {
    const out = generateTemperWeaponTrait([charged])
    expect(out).toContain("normal: 0.975")
    expect(out).toContain("fine: 1.025")
    expect(out).toContain("superior: 1.075")
    expect(out).toContain("epic: 1.125")
    expect(out).toContain("legendary: 1.175")
  })

  test("throws when title is null", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000c004",
      title: null,
      key: "broken",
      displayOrder: 99,
      esoTraitConstantName: "ITEM_TRAIT_TYPE_NONE",
      material: "",
      effect: "",
      effects: [],
      qualityValues: null,
    })
    expect(() => generateTemperWeaponTrait([broken])).toThrow(/null title/)
  })

  test("throws on duplicate displayOrder", () => {
    const dup = Page({
      id: "00000000-0000-0000-0000-00000000c005",
      title: "Duplicate",
      key: "duplicate",
      displayOrder: 0,
      esoTraitConstantName: "ITEM_TRAIT_TYPE_NONE",
      material: "",
      effect: "",
      effects: [],
      qualityValues: null,
    })
    expect(() => generateTemperWeaponTrait([noTrait, dup])).toThrow(/duplicate displayOrder/)
  })

  test("throws when esoTraitConstantName is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000c006",
      title: "Broken",
      key: "broken",
      displayOrder: 99,
      material: "",
      effect: "",
      effects: [],
      qualityValues: null,
    })
    expect(() => generateTemperWeaponTrait([broken])).toThrow()
  })
})
