import { describe, expect, test } from "bun:test"
import { Page } from "../page.ts"
import { generateTemperBuffMinor } from "./temper-buff-minor.ts"

const brutality = Page({
  id: "00000000-0000-0000-0000-00000000c001",
  title: "Minor Brutality",
  buffId: "minor-brutality",
  description: "Increases Weapon Damage by 10%",
  effects: [{ metricId: "power-weapon", effectType: "fractional-change", effectValue: 0.1 }],
})

const slayer = Page({
  id: "00000000-0000-0000-0000-00000000c002",
  title: "Minor Slayer",
  buffId: "minor-slayer",
  description: "Increases damage done to Dungeon, Trial, and Arena monsters by 5%",
  effects: [
    { metricId: "damage-done-dungeon", effectType: "fractional-change", effectValue: 0.05 },
    { metricId: "damage-done-trial", effectType: "fractional-change", effectValue: 0.05 },
    { metricId: "damage-done-arena", effectType: "fractional-change", effectValue: 0.05 },
  ],
})

const heroism = Page({
  id: "00000000-0000-0000-0000-00000000c003",
  title: "Minor Heroism",
  buffId: "minor-heroism",
  description: "Grants 1 Ultimate every 1.5 seconds",
  effects: [
    {
      metricId: "ultimate-recovery",
      effectType: "number-per-seconds",
      effectValue: { value: 1, seconds: 1.5 },
    },
  ],
})

const savagery = Page({
  id: "00000000-0000-0000-0000-00000000c004",
  title: "Minor Savagery",
  buffId: "minor-savagery",
  description: "Increases Weapon Critical by 1314",
  effects: [{ metricId: "critical-rating-weapon", effectType: "integer", effectValue: 1314 }],
})

describe("generateTemperBuffMinor", () => {
  test("emits buffs sorted by buffId regardless of input order", () => {
    const out = generateTemperBuffMinor([slayer, brutality, savagery, heroism])
    const idxBrutality = out.indexOf('"minor-brutality"')
    const idxHeroism = out.indexOf('"minor-heroism"')
    const idxSavagery = out.indexOf('"minor-savagery"')
    const idxSlayer = out.indexOf('"minor-slayer"')
    expect(idxBrutality).toBeGreaterThan(-1)
    expect(idxHeroism).toBeGreaterThan(idxBrutality)
    expect(idxSavagery).toBeGreaterThan(idxHeroism)
    expect(idxSlayer).toBeGreaterThan(idxSavagery)
  })

  test("emits each template entry with id/name/description/categoryId/subcategoryId/effects", () => {
    const out = generateTemperBuffMinor([brutality])
    expect(out).toContain('"minor-brutality":')
    expect(out).toContain('id: "minor-brutality" as const')
    expect(out).toContain('name: "Minor Brutality"')
    expect(out).toContain('description: "Increases Weapon Damage by 10%"')
    expect(out).toContain('categoryId: "buffs" as const')
    expect(out).toContain('subcategoryId: "minor" as const')
    expect(out).toContain('metricId: "power-weapon"')
    expect(out).toContain('effectType: "fractional-change"')
    expect(out).toContain("effectValue: 0.1")
  })

  test("emits TEMPER_BUFF_MINOR_DATA export", () => {
    const out = generateTemperBuffMinor([brutality])
    expect(out).toContain("export const TEMPER_BUFF_MINOR_DATA = {")
    expect(out).toContain("satisfies Record<string, BuffMinorTemplate>")
  })

  test("renders multi-effect entries as a list of objects", () => {
    const out = generateTemperBuffMinor([slayer])
    expect(out).toContain('metricId: "damage-done-dungeon"')
    expect(out).toContain('metricId: "damage-done-trial"')
    expect(out).toContain('metricId: "damage-done-arena"')
  })

  test("renders number-per-seconds effectValue as a structured object", () => {
    const out = generateTemperBuffMinor([heroism])
    expect(out).toContain('effectType: "number-per-seconds"')
    expect(out).toContain("effectValue: { value: 1, seconds: 1.5 }")
  })

  test("renders integer effectValue as a bare number", () => {
    const out = generateTemperBuffMinor([savagery])
    expect(out).toContain('effectType: "integer"')
    expect(out).toContain("effectValue: 1314")
  })

  test("throws when title is null", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000c099",
      title: null,
      buffId: "minor-broken",
      description: "",
      effects: [{ metricId: "x", effectType: "integer", effectValue: 1 }],
    })
    expect(() => generateTemperBuffMinor([broken])).toThrow(/null title/)
  })

  test("throws when effects array is empty (Zod parse failure)", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000c098",
      title: "Broken",
      buffId: "minor-broken",
      description: "",
      effects: [],
    })
    expect(() => generateTemperBuffMinor([broken])).toThrow()
  })

  test("throws when buffId is missing (Zod parse failure)", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000c097",
      title: "Broken",
      description: "",
      effects: [{ metricId: "x", effectType: "integer", effectValue: 1 }],
    })
    expect(() => generateTemperBuffMinor([broken])).toThrow()
  })
})
