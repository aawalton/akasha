import { describe, expect, test } from "bun:test"
import { Page } from "../page.ts"
import { generateTemperDebuffMajor } from "./temper-debuff-major.ts"

const breach = Page({
  id: "00000000-0000-0000-0000-00000000e001",
  title: "Major Breach",
  debuffId: "major-breach",
  description: "Reduces Physical and Spell Resistance by 5948",
  effects: [
    { metricId: "target-physical-resistance", effectType: "integer", effectValue: -5948 },
    { metricId: "target-spell-resistance", effectType: "integer", effectValue: -5948 },
  ],
})

const vulnerability = Page({
  id: "00000000-0000-0000-0000-00000000e002",
  title: "Major Vulnerability",
  debuffId: "major-vulnerability",
  description: "Increases damage taken by 10%",
  effects: [{ metricId: "target-damage-taken", effectType: "fractional-change", effectValue: 0.1 }],
})

const maim = Page({
  id: "00000000-0000-0000-0000-00000000e003",
  title: "Major Maim",
  debuffId: "major-maim",
  description: "Reduces damage done by 10%",
  effects: [{ metricId: "target-damage-done", effectType: "fractional-change", effectValue: -0.1 }],
})

describe("generateTemperDebuffMajor", () => {
  test("emits debuffs sorted by debuffId regardless of input order", () => {
    const out = generateTemperDebuffMajor([vulnerability, maim, breach])
    const idxBreach = out.indexOf('"major-breach"')
    const idxMaim = out.indexOf('"major-maim"')
    const idxVulnerability = out.indexOf('"major-vulnerability"')
    expect(idxBreach).toBeGreaterThan(-1)
    expect(idxMaim).toBeGreaterThan(idxBreach)
    expect(idxVulnerability).toBeGreaterThan(idxMaim)
  })

  test("emits each template entry with id/name/description/categoryId/subcategoryId/effects", () => {
    const out = generateTemperDebuffMajor([vulnerability])
    expect(out).toContain('"major-vulnerability":')
    expect(out).toContain('id: "major-vulnerability" as const')
    expect(out).toContain('name: "Major Vulnerability"')
    expect(out).toContain('description: "Increases damage taken by 10%"')
    expect(out).toContain('categoryId: "debuffs" as const')
    expect(out).toContain('subcategoryId: "major" as const')
    expect(out).toContain('metricId: "target-damage-taken"')
    expect(out).toContain('effectType: "fractional-change"')
    expect(out).toContain("effectValue: 0.1")
  })

  test("emits TEMPER_DEBUFF_MAJOR_DATA export", () => {
    const out = generateTemperDebuffMajor([breach])
    expect(out).toContain("export const TEMPER_DEBUFF_MAJOR_DATA = {")
    expect(out).toContain("satisfies Record<string, DebuffMajorTemplate>")
  })

  test("renders multi-effect entries as a list of objects", () => {
    const out = generateTemperDebuffMajor([breach])
    expect(out).toContain('metricId: "target-physical-resistance"')
    expect(out).toContain('metricId: "target-spell-resistance"')
    expect(out).toContain("effectValue: -5948")
  })

  test("renders integer effectValue as a bare number", () => {
    const out = generateTemperDebuffMajor([breach])
    expect(out).toContain('effectType: "integer"')
    expect(out).toContain("effectValue: -5948")
  })

  test("throws when title is null", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000e099",
      title: null,
      debuffId: "major-broken",
      description: "",
      effects: [{ metricId: "x", effectType: "integer", effectValue: 1 }],
    })
    expect(() => generateTemperDebuffMajor([broken])).toThrow(/null title/)
  })

  test("throws when effects array is empty (Zod parse failure)", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000e098",
      title: "Broken",
      debuffId: "major-broken",
      description: "",
      effects: [],
    })
    expect(() => generateTemperDebuffMajor([broken])).toThrow()
  })

  test("throws when debuffId is missing (Zod parse failure)", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000e097",
      title: "Broken",
      description: "",
      effects: [{ metricId: "x", effectType: "integer", effectValue: 1 }],
    })
    expect(() => generateTemperDebuffMajor([broken])).toThrow()
  })
})
