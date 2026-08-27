import { describe, expect, test } from "bun:test"
import { Page } from "../page.ts"
import { generateTemperEsoCompanion } from "./temper-eso-companion.ts"

const COMPANION_NO_COMPANION = "00000000-0000-0000-0000-00000000e000"
const COMPANION_BASTIAN = "00000000-0000-0000-0000-00000000e001"
const COMPANION_MIRRI = "00000000-0000-0000-0000-00000000e002"
const COMPANION_EMBER = "00000000-0000-0000-0000-00000000e005"

const noCompanion = Page({
  id: COMPANION_NO_COMPANION,
  title: "No Companion",
  icon: null,
  key: "no-companion",
  subtitle: "",
  alliance: "none",
  esoCompanionId: 0,
  classPassiveId: null,
  passiveEffects: [],
})

const bastian = Page({
  id: COMPANION_BASTIAN,
  title: "Bastian Hallix",
  icon: "/esoui/art/icons/comp_bastian.dds",
  key: "bastian",
  subtitle: "The Dragonknight",
  alliance: "daggerfall-covenant",
  esoCompanionId: 1,
  classPassiveId: "bastian-tough",
  passiveEffects: [
    { metricId: "companion-health-maximum", value: 0.03 },
    { metricId: "companion-damage-done", value: 0.03 },
  ],
})

const mirri = Page({
  id: COMPANION_MIRRI,
  title: "Mirri Elendis",
  icon: "/esoui/art/icons/comp_mirri.dds",
  key: "mirri",
  subtitle: "The Nightblade",
  alliance: "ebonheart-pact",
  esoCompanionId: 2,
  classPassiveId: "mirri-dynamic",
  passiveEffects: [
    { metricId: "companion-damage-done", value: 0.03 },
    { metricId: "companion-healing-done", value: 0.03 },
  ],
})

const ember = Page({
  id: COMPANION_EMBER,
  title: "Ember",
  icon: "/esoui/art/icons/comp_ember.dds",
  key: "ember",
  subtitle: "The Sorcerer",
  alliance: "aldmeri-dominion",
  esoCompanionId: 5,
  classPassiveId: "ember-cunning",
  passiveEffects: [
    { metricId: "companion-critical-chance", value: 0.03 },
    { metricId: "companion-damage-done", value: 0.03 },
  ],
})

describe("generateTemperEsoCompanion", () => {
  test("orders rows by esoCompanionId ascending regardless of input order", () => {
    const out = generateTemperEsoCompanion([ember, mirri, noCompanion, bastian])
    const idxNo = out.indexOf('"no-companion":')
    const idxBastian = out.indexOf('"bastian":')
    const idxMirri = out.indexOf('"mirri":')
    const idxEmber = out.indexOf('"ember":')
    expect(idxNo).toBeGreaterThan(-1)
    expect(idxBastian).toBeGreaterThan(idxNo)
    expect(idxMirri).toBeGreaterThan(idxBastian)
    expect(idxEmber).toBeGreaterThan(idxMirri)
  })

  test("places no-companion sentinel first (codec index 0)", () => {
    const out = generateTemperEsoCompanion([bastian, noCompanion])
    expect(out.indexOf('"no-companion":')).toBeLessThan(out.indexOf('"bastian":'))
  })

  test("emits the satisfies clause against CompanionTemplate", () => {
    const out = generateTemperEsoCompanion([noCompanion])
    expect(out).toContain("} satisfies Record<string, CompanionTemplate>")
  })

  test("re-exports as a createDataFile-wrapped companions snapshot", () => {
    const out = generateTemperEsoCompanion([noCompanion])
    expect(out).toContain("createDataFile<CompanionTemplate>()")
    expect(out).toContain("export const companionsFromPages = createDataFile")
  })

  test("emits scalar and FK fields for a populated row", () => {
    const out = generateTemperEsoCompanion([bastian])
    expect(out).toContain('id: "bastian" as const')
    expect(out).toContain('name: "Bastian Hallix"')
    expect(out).toContain('title: "The Dragonknight"')
    expect(out).toContain('alliance: "daggerfall-covenant" as const')
    expect(out).toContain('icon: "/esoui/art/icons/comp_bastian.dds"')
    expect(out).toContain("esoCompanionId: 1")
    expect(out).toContain('classPassiveId: "bastian-tough" as const')
    expect(out).toContain('"companion-health-maximum"')
  })

  test("emits null icon and null classPassiveId for the no-companion sentinel", () => {
    const out = generateTemperEsoCompanion([noCompanion])
    expect(out).toContain("icon: null")
    expect(out).toContain("classPassiveId: null")
    expect(out).toContain("passiveEffects: [] as const")
  })

  test("throws when title is null", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000e0ff",
      title: null,
      icon: null,
      key: "broken",
      subtitle: "",
      alliance: "none",
      esoCompanionId: 99,
      classPassiveId: null,
      passiveEffects: [],
    })
    expect(() => generateTemperEsoCompanion([broken])).toThrow(/null title/)
  })

  test("throws when a required field is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000e0fe",
      title: "Broken",
      icon: null,
      key: "broken",
    })
    expect(() => generateTemperEsoCompanion([broken])).toThrow()
  })
})
