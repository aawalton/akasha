import { describe, expect, test } from "bun:test"
import { Page } from "../page.ts"
import { generateTemperJewelryTrait } from "./temper-jewelry-trait.ts"

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

const arcane = Page({
  id: "00000000-0000-0000-0000-00000000c001",
  title: "Arcane",
  key: "arcane",
  displayOrder: 1,
  esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_ARCANE",
  material: "Cobalt",
  effect: "Increases Maximum Magicka",
  effects: [{ metricId: "magicka-maximum", effectType: "integer", effectValue: 877 }],
  qualityValues: { normal: 767, fine: 797, superior: 827, epic: 847, legendary: 877 },
})

const swift = Page({
  id: "00000000-0000-0000-0000-00000000c002",
  title: "Swift",
  key: "swift",
  displayOrder: 8,
  esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_SWIFT",
  material: "Gilding Wax",
  effect: "Increases Movement Speed",
  effects: [{ metricId: "movement-speed", effectType: "fractional-change", effectValue: 0.07 }],
  qualityValues: { normal: 0.03, fine: 0.04, superior: 0.05, epic: 0.06, legendary: 0.07 },
})

const triune = Page({
  id: "00000000-0000-0000-0000-00000000c003",
  title: "Triune",
  key: "triune",
  displayOrder: 9,
  esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_TRIUNE",
  material: "Dawn-Prism",
  effect: "Increases Maximum Health, Magicka, and Stamina",
  effects: [
    { metricId: "health-maximum", effectType: "integer", effectValue: 482 },
    { metricId: "magicka-maximum", effectType: "integer", effectValue: 439 },
    { metricId: "stamina-maximum", effectType: "integer", effectValue: 439 },
  ],
  qualityValues: {
    health: { normal: 386, fine: 410, superior: 434, epic: 458, legendary: 482 },
    resource: { normal: 351, fine: 373, superior: 395, epic: 417, legendary: 439 },
  },
})

const ornate = Page({
  id: "00000000-0000-0000-0000-00000000c004",
  title: "Ornate",
  key: "ornate",
  displayOrder: 10,
  esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_ORNATE",
  material: "",
  effect: "Increases sell price",
  effects: [],
  qualityValues: null,
})

describe("generateTemperJewelryTrait", () => {
  test("emits traits sorted by displayOrder regardless of input order", () => {
    const out = generateTemperJewelryTrait([ornate, swift, triune, arcane, noTrait])
    const idxNoTrait = out.indexOf('"no-trait"')
    const idxArcane = out.indexOf('"arcane"')
    const idxSwift = out.indexOf('"swift"')
    const idxTriune = out.indexOf('"triune"')
    const idxOrnate = out.indexOf('"ornate"')
    expect(idxNoTrait).toBeGreaterThan(-1)
    expect(idxArcane).toBeGreaterThan(idxNoTrait)
    expect(idxSwift).toBeGreaterThan(idxArcane)
    expect(idxTriune).toBeGreaterThan(idxSwift)
    expect(idxOrnate).toBeGreaterThan(idxTriune)
  })

  test("emits each template entry with id/name/material/effect/effects/esoTraitConstantName", () => {
    const out = generateTemperJewelryTrait([arcane])
    expect(out).toContain('"arcane":')
    expect(out).toContain('id: "arcane" as const')
    expect(out).toContain('name: "Arcane"')
    expect(out).toContain('material: "Cobalt"')
    expect(out).toContain('effect: "Increases Maximum Magicka"')
    expect(out).toContain('metricId: "magicka-maximum"')
    expect(out).toContain('effectType: "integer"')
    expect(out).toContain("effectValue: 877")
    expect(out).toContain('esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_ARCANE"')
  })

  test("emits TEMPER_JEWELRY_TRAITS_BY_ID and TEMPER_JEWELRY_TRAIT_QUALITY_VALUES exports", () => {
    const out = generateTemperJewelryTrait([noTrait, arcane, ornate])
    expect(out).toContain("export const TEMPER_JEWELRY_TRAITS_BY_ID = {")
    expect(out).toContain("export const TEMPER_JEWELRY_TRAIT_QUALITY_VALUES = {")
  })

  test("omits qualityValues entries for traits with null qualityValues", () => {
    const out = generateTemperJewelryTrait([noTrait, arcane, ornate])
    const qvSection = out.split("TEMPER_JEWELRY_TRAIT_QUALITY_VALUES")[1] ?? ""
    expect(qvSection).toContain('"arcane"')
    expect(qvSection).not.toContain('"no-trait"')
    expect(qvSection).not.toContain('"ornate"')
  })

  test("renders quality values with all five quality keys", () => {
    const out = generateTemperJewelryTrait([swift])
    expect(out).toContain("normal: 0.03")
    expect(out).toContain("fine: 0.04")
    expect(out).toContain("superior: 0.05")
    expect(out).toContain("epic: 0.06")
    expect(out).toContain("legendary: 0.07")
  })

  test("unpacks triune dual quality tables into triune-health and triune-resource keys", () => {
    const out = generateTemperJewelryTrait([triune])
    const qvSection = out.split("TEMPER_JEWELRY_TRAIT_QUALITY_VALUES")[1] ?? ""
    expect(qvSection).toContain('"triune-health":')
    expect(qvSection).toContain('"triune-resource":')
    expect(qvSection).toContain("legendary: 482")
    expect(qvSection).toContain("legendary: 439")
    expect(qvSection).not.toMatch(/"triune":/)
  })

  test("throws when title is null", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000c005",
      title: null,
      key: "broken",
      displayOrder: 99,
      esoTraitConstantName: "ITEM_TRAIT_TYPE_NONE",
      material: "",
      effect: "",
      effects: [],
      qualityValues: null,
    })
    expect(() => generateTemperJewelryTrait([broken])).toThrow(/null title/)
  })

  test("throws on duplicate displayOrder", () => {
    const dup = Page({
      id: "00000000-0000-0000-0000-00000000c006",
      title: "Duplicate",
      key: "duplicate",
      displayOrder: 0,
      esoTraitConstantName: "ITEM_TRAIT_TYPE_NONE",
      material: "",
      effect: "",
      effects: [],
      qualityValues: null,
    })
    expect(() => generateTemperJewelryTrait([noTrait, dup])).toThrow(/duplicate displayOrder/)
  })

  test("throws when esoTraitConstantName is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000c007",
      title: "Broken",
      key: "broken",
      displayOrder: 99,
      material: "",
      effect: "",
      effects: [],
      qualityValues: null,
    })
    expect(() => generateTemperJewelryTrait([broken])).toThrow()
  })
})
