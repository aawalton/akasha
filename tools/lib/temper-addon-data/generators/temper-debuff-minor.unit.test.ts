import { describe, expect, test } from "bun:test"
import { Page } from "../page.ts"
import { generateTemperDebuffMinor } from "./temper-debuff-minor.ts"

const breach = Page({
  id: "00000000-0000-0000-0000-00000000f001",
  title: "Minor Breach",
  debuffId: "minor-breach",
  description: "Reduces Physical and Spell Resistance by 2974",
  effects: [
    { metricId: "target-physical-resistance", effectType: "integer", effectValue: -2974 },
    { metricId: "target-spell-resistance", effectType: "integer", effectValue: -2974 },
  ],
})

const vulnerability = Page({
  id: "00000000-0000-0000-0000-00000000f002",
  title: "Minor Vulnerability",
  debuffId: "minor-vulnerability",
  description: "Increases damage taken by 5%",
  effects: [
    { metricId: "target-damage-taken", effectType: "fractional-change", effectValue: 0.05 },
  ],
})

const maim = Page({
  id: "00000000-0000-0000-0000-00000000f003",
  title: "Minor Maim",
  debuffId: "minor-maim",
  description: "Reduces damage done by 5%",
  effects: [
    { metricId: "target-damage-done", effectType: "fractional-change", effectValue: -0.05 },
  ],
})

const timidity = Page({
  id: "00000000-0000-0000-0000-00000000f004",
  title: "Minor Timidity",
  debuffId: "minor-timidity",
  description: "Consumes 1 Ultimate every 1.5 seconds",
  effects: [
    {
      metricId: "target-ultimate-restoration",
      effectType: "number-per-seconds",
      effectValue: { value: -1, seconds: 1.5 },
    },
  ],
})

const lifesteal = Page({
  id: "00000000-0000-0000-0000-00000000f005",
  title: "Minor Lifesteal",
  debuffId: "minor-lifesteal",
  description: "Heals attackers for 600 Health when dealing damage",
  effects: [],
})

describe("generateTemperDebuffMinor", () => {
  test("emits debuffs sorted by debuffId regardless of input order", () => {
    const out = generateTemperDebuffMinor([vulnerability, maim, breach])
    const idxBreach = out.indexOf('"minor-breach"')
    const idxMaim = out.indexOf('"minor-maim"')
    const idxVulnerability = out.indexOf('"minor-vulnerability"')
    expect(idxBreach).toBeGreaterThan(-1)
    expect(idxMaim).toBeGreaterThan(idxBreach)
    expect(idxVulnerability).toBeGreaterThan(idxMaim)
  })

  test("emits each template entry with id/name/description/categoryId/subcategoryId/effects", () => {
    const out = generateTemperDebuffMinor([vulnerability])
    expect(out).toContain('"minor-vulnerability":')
    expect(out).toContain('id: "minor-vulnerability" as const')
    expect(out).toContain('name: "Minor Vulnerability"')
    expect(out).toContain('description: "Increases damage taken by 5%"')
    expect(out).toContain('categoryId: "debuffs" as const')
    expect(out).toContain('subcategoryId: "minor" as const')
    expect(out).toContain('metricId: "target-damage-taken"')
    expect(out).toContain('effectType: "fractional-change"')
    expect(out).toContain("effectValue: 0.05")
  })

  test("emits TEMPER_DEBUFF_MINOR_DATA export", () => {
    const out = generateTemperDebuffMinor([breach])
    expect(out).toContain("export const TEMPER_DEBUFF_MINOR_DATA = {")
    expect(out).toContain("satisfies Record<string, DebuffMinorTemplate>")
  })

  test("renders multi-effect entries as a list of objects", () => {
    const out = generateTemperDebuffMinor([breach])
    expect(out).toContain('metricId: "target-physical-resistance"')
    expect(out).toContain('metricId: "target-spell-resistance"')
    expect(out).toContain("effectValue: -2974")
  })

  test("renders integer effectValue as a bare number", () => {
    const out = generateTemperDebuffMinor([breach])
    expect(out).toContain('effectType: "integer"')
    expect(out).toContain("effectValue: -2974")
  })

  test("renders number-per-seconds effectValue as a nested object", () => {
    const out = generateTemperDebuffMinor([timidity])
    expect(out).toContain('effectType: "number-per-seconds"')
    expect(out).toContain("effectValue: { value: -1, seconds: 1.5 }")
  })

  test("renders entries with empty effects as a compact `effects: []` block", () => {
    const out = generateTemperDebuffMinor([lifesteal])
    expect(out).toContain('"minor-lifesteal":')
    expect(out).toContain('name: "Minor Lifesteal"')
    expect(out).toContain("effects: [],")
    expect(out).not.toContain("effects: [\n    ],")
  })

  test("throws when title is null", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000f099",
      title: null,
      debuffId: "minor-broken",
      description: "",
      effects: [{ metricId: "x", effectType: "integer", effectValue: 1 }],
    })
    expect(() => generateTemperDebuffMinor([broken])).toThrow(/null title/)
  })

  test("throws when debuffId is missing (Zod parse failure)", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000f098",
      title: "Broken",
      description: "",
      effects: [{ metricId: "x", effectType: "integer", effectValue: 1 }],
    })
    expect(() => generateTemperDebuffMinor([broken])).toThrow()
  })
})
