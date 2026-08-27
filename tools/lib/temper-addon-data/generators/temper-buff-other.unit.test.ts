import { describe, expect, test } from "bun:test"
import { Page } from "../page.ts"
import { generateTemperBuffOther } from "./temper-buff-other.ts"

const empower = Page({
  id: "00000000-0000-0000-0000-00000000d001",
  title: "Empower",
  buffId: "empower",
  description: "Increases Heavy Attack damage against monsters by 70%",
  effects: [
    { metricId: "damage-done-heavy-attack", effectType: "fractional-change", effectValue: 0.7 },
  ],
})

const vanish = Page({
  id: "00000000-0000-0000-0000-00000000d002",
  title: "Vanish",
  buffId: "vanish",
  description: "Disappear from sight",
  effects: [],
})

describe("generateTemperBuffOther", () => {
  test("emits buffs sorted by buffId regardless of input order", () => {
    const out = generateTemperBuffOther([vanish, empower])
    const idxEmpower = out.indexOf('"empower"')
    const idxVanish = out.indexOf('"vanish"')
    expect(idxEmpower).toBeGreaterThan(-1)
    expect(idxVanish).toBeGreaterThan(idxEmpower)
  })

  test("emits each template entry with id/name/description/categoryId/subcategoryId/effects", () => {
    const out = generateTemperBuffOther([empower])
    expect(out).toContain('"empower":')
    expect(out).toContain('id: "empower" as const')
    expect(out).toContain('name: "Empower"')
    expect(out).toContain('description: "Increases Heavy Attack damage against monsters by 70%"')
    expect(out).toContain('categoryId: "buffs" as const')
    expect(out).toContain('subcategoryId: "other" as const')
    expect(out).toContain('metricId: "damage-done-heavy-attack"')
    expect(out).toContain('effectType: "fractional-change"')
    expect(out).toContain("effectValue: 0.7")
  })

  test("emits TEMPER_BUFF_OTHER_DATA export", () => {
    const out = generateTemperBuffOther([empower])
    expect(out).toContain("export const TEMPER_BUFF_OTHER_DATA = {")
    expect(out).toContain("satisfies Record<string, BuffOtherTemplate>")
  })

  test("renders entries with empty effects as a compact `effects: []` block", () => {
    const out = generateTemperBuffOther([vanish])
    expect(out).toContain('"vanish":')
    expect(out).toContain('name: "Vanish"')
    expect(out).toContain("effects: [],")
    expect(out).not.toContain("effects: [\n    ],")
  })

  test("throws when title is null", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000d099",
      title: null,
      buffId: "other-broken",
      description: "",
      effects: [{ metricId: "x", effectType: "integer", effectValue: 1 }],
    })
    expect(() => generateTemperBuffOther([broken])).toThrow(/null title/)
  })

  test("throws when buffId is missing (Zod parse failure)", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000d098",
      title: "Broken",
      description: "",
      effects: [],
    })
    expect(() => generateTemperBuffOther([broken])).toThrow()
  })
})
