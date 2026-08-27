import { describe, expect, test } from "bun:test"
import { Page } from "../page.ts"
import { generateTemperCompanionTrait } from "./temper-companion-trait.ts"

const TRAIT_NT = "00000000-0000-0000-0000-00000000d001"
const TRAIT_AGG = "00000000-0000-0000-0000-00000000d002"
const TRAIT_AUG = "00000000-0000-0000-0000-00000000d003"
const TRAIT_BOL = "00000000-0000-0000-0000-00000000d004"
const TRAIT_FOC = "00000000-0000-0000-0000-00000000d005"
const TRAIT_PRO = "00000000-0000-0000-0000-00000000d006"
const TRAIT_QUI = "00000000-0000-0000-0000-00000000d007"
const TRAIT_SHA = "00000000-0000-0000-0000-00000000d008"
const TRAIT_SOO = "00000000-0000-0000-0000-00000000d009"
const TRAIT_VIG = "00000000-0000-0000-0000-00000000d00a"

const noTrait = Page({
  id: TRAIT_NT,
  title: "No Trait",
  key: "no-trait",
  description: "",
  metricId: null,
  effectType: null,
  isReduction: false,
  qualityValues: null,
})
const aggressive = Page({
  id: TRAIT_AGG,
  title: "Aggressive",
  key: "aggressive",
  description: "Increases companion damage done",
  metricId: "companion-damage-done",
  effectType: "fractional-change",
  isReduction: false,
  qualityValues: {
    normal: 0.00425,
    fine: 0.0085,
    superior: 0.01275,
    epic: 0.017,
    legendary: 0.02125,
  },
})
const augmented = Page({
  id: TRAIT_AUG,
  title: "Augmented",
  key: "augmented",
  description: "Increases duration of all companion buffs and debuffs",
  metricId: "companion-buff-duration",
  effectType: "fractional-change",
  isReduction: false,
  qualityValues: { normal: 0.014, fine: 0.018, superior: 0.022, epic: 0.026, legendary: 0.03 },
})
const bolstered = Page({
  id: TRAIT_BOL,
  title: "Bolstered",
  key: "bolstered",
  description: "Reduces companion damage taken",
  metricId: "companion-damage-taken",
  effectType: "fractional-change",
  isReduction: true,
  qualityValues: {
    normal: 0.00925,
    fine: 0.012,
    superior: 0.01475,
    epic: 0.0175,
    legendary: 0.02025,
  },
})
const focused = Page({
  id: TRAIT_FOC,
  title: "Focused",
  key: "focused",
  description: "Increases companion Critical Strike rating",
  metricId: "companion-critical-chance",
  effectType: "integer",
  isReduction: false,
  qualityValues: { normal: 307, fine: 394, superior: 481, epic: 569, legendary: 657 },
})
const prolific = Page({
  id: TRAIT_PRO,
  title: "Prolific",
  key: "prolific",
  description: "Increases companion Ultimate generation",
  metricId: "companion-ultimate-generation",
  effectType: "fractional-change",
  isReduction: false,
  qualityValues: { normal: 0.07, fine: 0.09, superior: 0.11, epic: 0.13, legendary: 0.15 },
})
const quickened = Page({
  id: TRAIT_QUI,
  title: "Quickened",
  key: "quickened",
  description: "Reduces companion ability cooldowns",
  metricId: "companion-ability-cooldown",
  effectType: "fractional-change",
  isReduction: true,
  qualityValues: { normal: 0.014, fine: 0.018, superior: 0.022, epic: 0.026, legendary: 0.03 },
})
const shattering = Page({
  id: TRAIT_SHA,
  title: "Shattering",
  key: "shattering",
  description: "Increases companion Penetration",
  metricId: "companion-penetration",
  effectType: "integer",
  isReduction: false,
  qualityValues: { normal: 700, fine: 900, superior: 1100, epic: 1300, legendary: 1500 },
})
const soothing = Page({
  id: TRAIT_SOO,
  title: "Soothing",
  key: "soothing",
  description: "Increases companion healing done",
  metricId: "companion-healing-done",
  effectType: "fractional-change",
  isReduction: false,
  qualityValues: { normal: 0.005, fine: 0.009, superior: 0.013, epic: 0.017, legendary: 0.021 },
})
const vigorous = Page({
  id: TRAIT_VIG,
  title: "Vigorous",
  key: "vigorous",
  description: "Increases companion Maximum Health",
  metricId: "companion-health-maximum",
  effectType: "fractional-change",
  isReduction: false,
  qualityValues: { normal: 0.014, fine: 0.018, superior: 0.022, epic: 0.026, legendary: 0.03 },
})

describe("generateTemperCompanionTrait", () => {
  test("emits traits in legacy authoring precedence regardless of input order", () => {
    const out = generateTemperCompanionTrait([
      vigorous,
      soothing,
      shattering,
      quickened,
      prolific,
      focused,
      bolstered,
      augmented,
      aggressive,
      noTrait,
    ])
    const idxNoTrait = out.indexOf('  "no-trait":')
    const idxAgg = out.indexOf('  "aggressive":')
    const idxAug = out.indexOf('  "augmented":')
    const idxBol = out.indexOf('  "bolstered":')
    const idxFoc = out.indexOf('  "focused":')
    const idxPro = out.indexOf('  "prolific":')
    const idxQui = out.indexOf('  "quickened":')
    const idxSha = out.indexOf('  "shattering":')
    const idxSoo = out.indexOf('  "soothing":')
    const idxVig = out.indexOf('  "vigorous":')
    expect(idxNoTrait).toBeGreaterThan(-1)
    expect(idxAgg).toBeGreaterThan(idxNoTrait)
    expect(idxAug).toBeGreaterThan(idxAgg)
    expect(idxBol).toBeGreaterThan(idxAug)
    expect(idxFoc).toBeGreaterThan(idxBol)
    expect(idxPro).toBeGreaterThan(idxFoc)
    expect(idxQui).toBeGreaterThan(idxPro)
    expect(idxSha).toBeGreaterThan(idxQui)
    expect(idxSoo).toBeGreaterThan(idxSha)
    expect(idxVig).toBeGreaterThan(idxSoo)
  })

  test("emits sentinel with null metricId / effectType / qualityValues", () => {
    const out = generateTemperCompanionTrait([noTrait])
    expect(out).toContain(
      '"no-trait": { id: "no-trait" as const, name: "No Trait", description: "", metricId: null, effectType: null, isReduction: false, qualityValues: null },'
    )
  })

  test("emits aggressive with all fields populated", () => {
    const out = generateTemperCompanionTrait([aggressive])
    expect(out).toContain(
      '"aggressive": { id: "aggressive" as const, name: "Aggressive", description: "Increases companion damage done", metricId: "companion-damage-done" as const, effectType: "fractional-change" as const, isReduction: false, qualityValues: { normal: 0.00425, fine: 0.0085, superior: 0.01275, epic: 0.017, legendary: 0.02125 } },'
    )
  })

  test("emits bolstered with isReduction: true", () => {
    const out = generateTemperCompanionTrait([bolstered])
    expect(out).toContain("isReduction: true")
  })

  test("emits focused with effectType integer", () => {
    const out = generateTemperCompanionTrait([focused])
    expect(out).toContain('effectType: "integer" as const')
  })

  test("emits a satisfies clause against CompanionTraitTemplate", () => {
    const out = generateTemperCompanionTrait([noTrait])
    expect(out).toContain("} as const satisfies Record<string, CompanionTraitTemplate>")
  })

  test("throws when title is null", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000d0ff",
      title: null,
      key: "aggressive",
      description: "x",
      metricId: "companion-damage-done",
      effectType: "fractional-change",
      isReduction: false,
      qualityValues: { normal: 1, fine: 2, superior: 3, epic: 4, legendary: 5 },
    })
    expect(() => generateTemperCompanionTrait([broken])).toThrow(/null title/)
  })

  test("throws when key is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000d0fe",
      title: "Aggressive",
      description: "x",
      metricId: "companion-damage-done",
      effectType: "fractional-change",
      isReduction: false,
      qualityValues: { normal: 1, fine: 2, superior: 3, epic: 4, legendary: 5 },
    })
    expect(() => generateTemperCompanionTrait([broken])).toThrow()
  })
})
