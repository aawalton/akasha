import { describe, expect, test } from "bun:test"
import { Page } from "../page.ts"
import { generateTemperSpecialEffectType } from "./temper-special-effect-type.ts"

const EFFECT_BLOCK_ALL = "00000000-0000-0000-0000-00000000e001"
const EFFECT_REFLECT_ALL = "00000000-0000-0000-0000-00000000e002"
const EFFECT_HEAL_TO_FULL = "00000000-0000-0000-0000-00000000e003"
const EFFECT_CLEANSE = "00000000-0000-0000-0000-00000000e00a"

const blockAll = Page({
  id: EFFECT_BLOCK_ALL,
  title: "Block All",
  key: "block-all",
})

const reflectAll = Page({
  id: EFFECT_REFLECT_ALL,
  title: "Reflect Projectiles",
  key: "reflect-all",
})

const healToFull = Page({
  id: EFFECT_HEAL_TO_FULL,
  title: "Full Heal",
  key: "heal-to-full",
})

const cleanse = Page({
  id: EFFECT_CLEANSE,
  title: "Cleanse",
  key: "cleanse",
})

describe("generateTemperSpecialEffectType", () => {
  test("emits effects in legacy authoring precedence regardless of input order", () => {
    const out = generateTemperSpecialEffectType([cleanse, healToFull, blockAll, reflectAll])
    const idxBlock = out.indexOf('"block-all"')
    const idxReflect = out.indexOf('"reflect-all"')
    const idxHeal = out.indexOf('"heal-to-full"')
    const idxCleanse = out.indexOf('"cleanse"')
    expect(idxBlock).toBeGreaterThan(-1)
    expect(idxReflect).toBeGreaterThan(idxBlock)
    expect(idxHeal).toBeGreaterThan(idxReflect)
    expect(idxCleanse).toBeGreaterThan(idxHeal)
  })

  test("emits each entry as a record value matching the consumer shape", () => {
    const out = generateTemperSpecialEffectType([blockAll])
    expect(out).toContain('"block-all": { id: "block-all", name: "Block All" },')
  })

  test("emits a satisfies clause against SpecialEffectTypeTemplate", () => {
    const out = generateTemperSpecialEffectType([blockAll])
    expect(out).toContain("} as const satisfies Record<string, SpecialEffectTypeTemplate>")
  })

  test("throws when title is null", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000e0ff",
      title: null,
      key: "block-all",
    })
    expect(() => generateTemperSpecialEffectType([broken])).toThrow(/null title/)
  })

  test("throws when key is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000e0fe",
      title: "Block All",
    })
    expect(() => generateTemperSpecialEffectType([broken])).toThrow()
  })
})
