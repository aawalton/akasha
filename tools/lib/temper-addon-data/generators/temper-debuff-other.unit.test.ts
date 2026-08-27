import { describe, expect, test } from "bun:test"
import { Page } from "../page.ts"
import { generateTemperDebuffOther } from "./temper-debuff-other.ts"

const chilled = Page({
  id: "00000000-0000-0000-0000-00000000e001",
  title: "Chilled",
  buffId: "chilled",
  description: "Applies Minor Maim, reducing damage done by 5%",
  effects: [
    { metricId: "target-damage-done", effectType: "fractional-change", effectValue: -0.05 },
  ],
})

const stun = Page({
  id: "00000000-0000-0000-0000-00000000e002",
  title: "Stun",
  buffId: "stun",
  description: "Target is stunned and cannot take actions",
  effects: [],
})

describe("generateTemperDebuffOther", () => {
  test("emits debuffs sorted by buffId regardless of input order", () => {
    const out = generateTemperDebuffOther([stun, chilled])
    const idxChilled = out.indexOf('"chilled"')
    const idxStun = out.indexOf('"stun"')
    expect(idxChilled).toBeGreaterThan(-1)
    expect(idxStun).toBeGreaterThan(idxChilled)
  })

  test("emits each template entry with id/name/description/categoryId/subcategoryId/effects", () => {
    const out = generateTemperDebuffOther([chilled])
    expect(out).toContain('"chilled":')
    expect(out).toContain('id: "chilled" as const')
    expect(out).toContain('name: "Chilled"')
    expect(out).toContain('description: "Applies Minor Maim, reducing damage done by 5%"')
    expect(out).toContain('categoryId: "debuffs" as const')
    expect(out).toContain('subcategoryId: "other" as const')
    expect(out).toContain('metricId: "target-damage-done"')
    expect(out).toContain('effectType: "fractional-change"')
    expect(out).toContain("effectValue: -0.05")
  })

  test("emits TEMPER_DEBUFF_OTHER_DATA export", () => {
    const out = generateTemperDebuffOther([chilled])
    expect(out).toContain("export const TEMPER_DEBUFF_OTHER_DATA = {")
    expect(out).toContain("satisfies Record<string, DebuffOtherTemplate>")
  })

  test("renders entries with empty effects as a compact `effects: []` block", () => {
    const out = generateTemperDebuffOther([stun])
    expect(out).toContain('"stun":')
    expect(out).toContain('name: "Stun"')
    expect(out).toContain("effects: [],")
    expect(out).not.toContain("effects: [\n    ],")
  })

  test("throws when title is null", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000e099",
      title: null,
      buffId: "other-broken",
      description: "",
      effects: [{ metricId: "x", effectType: "integer", effectValue: 1 }],
    })
    expect(() => generateTemperDebuffOther([broken])).toThrow(/null title/)
  })

  test("throws when buffId is missing (Zod parse failure)", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000e098",
      title: "Broken",
      description: "",
      effects: [],
    })
    expect(() => generateTemperDebuffOther([broken])).toThrow()
  })
})
