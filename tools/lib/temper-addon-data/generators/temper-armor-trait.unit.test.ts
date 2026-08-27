import { describe, expect, test } from "bun:test"
import { Page } from "../page.ts"
import { generateTemperArmorTrait } from "./temper-armor-trait.ts"

const noTrait = Page({
  id: "00000000-0000-0000-0000-00000000b000",
  title: "No Trait",
  key: "no-trait",
  displayOrder: 0,
  esoTraitConstantName: "ITEM_TRAIT_TYPE_NONE",
  material: "",
  effect: "",
  effects: [],
  qualityValues: null,
})

const divines = Page({
  id: "00000000-0000-0000-0000-00000000b001",
  title: "Divines",
  key: "divines",
  displayOrder: 1,
  esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_DIVINES",
  material: "Sapphire",
  effect: "Increases Mundus Stone effect",
  effects: [],
  qualityValues: { normal: 0.051, fine: 0.061, superior: 0.071, epic: 0.0806, legendary: 0.091 },
})

const impenetrable = Page({
  id: "00000000-0000-0000-0000-00000000b002",
  title: "Impenetrable",
  key: "impenetrable",
  displayOrder: 2,
  esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_IMPENETRABLE",
  material: "Diamond",
  effect: "Increases Critical Resistance",
  effects: [{ metricId: "resistance-critical", effectType: "integer", effectValue: 127 }],
  qualityValues: { normal: 116, fine: 118, superior: 121, epic: 124, legendary: 127 },
})

const ornate = Page({
  id: "00000000-0000-0000-0000-00000000b003",
  title: "Ornate",
  key: "ornate",
  displayOrder: 10,
  esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_ORNATE",
  material: "",
  effect: "Increases sell price",
  effects: [],
  qualityValues: null,
})

describe("generateTemperArmorTrait", () => {
  test("emits traits sorted by displayOrder regardless of input order", () => {
    const out = generateTemperArmorTrait([ornate, divines, impenetrable, noTrait])
    const idxNoTrait = out.indexOf('"no-trait"')
    const idxDivines = out.indexOf('"divines"')
    const idxImpen = out.indexOf('"impenetrable"')
    const idxOrnate = out.indexOf('"ornate"')
    expect(idxNoTrait).toBeGreaterThan(-1)
    expect(idxDivines).toBeGreaterThan(idxNoTrait)
    expect(idxImpen).toBeGreaterThan(idxDivines)
    expect(idxOrnate).toBeGreaterThan(idxImpen)
  })

  test("emits each template entry with id/name/esoTraitConstantName/material/effect/effects", () => {
    const out = generateTemperArmorTrait([impenetrable])
    expect(out).toContain('"impenetrable":')
    expect(out).toContain('id: "impenetrable" as const')
    expect(out).toContain('name: "Impenetrable"')
    expect(out).toContain('esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_IMPENETRABLE"')
    expect(out).toContain('material: "Diamond"')
    expect(out).toContain('effect: "Increases Critical Resistance"')
    expect(out).toContain('metricId: "resistance-critical"')
    expect(out).toContain('effectType: "integer"')
    expect(out).toContain("effectValue: 127")
  })

  test("emits TEMPER_ARMOR_TRAITS_BY_ID and TEMPER_ARMOR_TRAIT_QUALITY_VALUES exports", () => {
    const out = generateTemperArmorTrait([noTrait, divines, ornate])
    expect(out).toContain("export const TEMPER_ARMOR_TRAITS_BY_ID = {")
    expect(out).toContain("export const TEMPER_ARMOR_TRAIT_QUALITY_VALUES = {")
  })

  test("omits qualityValues entries for traits with null qualityValues", () => {
    const out = generateTemperArmorTrait([noTrait, divines, ornate])
    const qvSection = out.split("TEMPER_ARMOR_TRAIT_QUALITY_VALUES")[1] ?? ""
    expect(qvSection).toContain('"divines"')
    expect(qvSection).not.toContain('"no-trait"')
    expect(qvSection).not.toContain('"ornate"')
  })

  test("renders quality values with all five quality keys", () => {
    const out = generateTemperArmorTrait([divines])
    expect(out).toContain("normal: 0.051")
    expect(out).toContain("fine: 0.061")
    expect(out).toContain("superior: 0.071")
    expect(out).toContain("epic: 0.0806")
    expect(out).toContain("legendary: 0.091")
  })

  test("throws when title is null", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000b004",
      title: null,
      key: "broken",
      displayOrder: 99,
      esoTraitConstantName: "ITEM_TRAIT_TYPE_NONE",
      material: "",
      effect: "",
      effects: [],
      qualityValues: null,
    })
    expect(() => generateTemperArmorTrait([broken])).toThrow(/null title/)
  })

  test("throws on duplicate displayOrder", () => {
    const dup = Page({
      id: "00000000-0000-0000-0000-00000000b005",
      title: "Duplicate",
      key: "duplicate",
      displayOrder: 0,
      esoTraitConstantName: "ITEM_TRAIT_TYPE_NONE",
      material: "",
      effect: "",
      effects: [],
      qualityValues: null,
    })
    expect(() => generateTemperArmorTrait([noTrait, dup])).toThrow(/duplicate displayOrder/)
  })

  test("throws when esoTraitConstantName is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000b006",
      title: "Broken",
      key: "broken",
      displayOrder: 99,
      material: "",
      effect: "",
      effects: [],
      qualityValues: null,
    })
    expect(() => generateTemperArmorTrait([broken])).toThrow()
  })
})
