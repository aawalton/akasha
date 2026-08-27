import { afterEach, describe, expect, test } from "bun:test"
import { clearCrux, getCruxEffect, getCruxStacks, isCruxConsumerIcon, setCruxStacks } from "./crux"
import { LEVEL_CRUX } from "./model-constants"
import type { Ability } from "./types"

function cruxAbility(over: Partial<Ability> = {}): Ability {
  return {
    id: 999,
    name: "Crux",
    showName: "Crux",
    icon: "/esoui/art/icons/ability_arcanist_crux.dds",
    description: "Arcanist crux.",
    type: 1,
    ...over,
  }
}

afterEach(() => {
  clearCrux()
})

describe("crux set/get/clear", () => {
  test("setCruxStacks records the count", () => {
    setCruxStacks(2, 1000, 5000)
    expect(getCruxStacks()).toBe(2)
  })

  test("clearCrux resets to 0 stacks", () => {
    setCruxStacks(3, 1000, 5000)
    clearCrux()
    expect(getCruxStacks()).toBe(0)
  })

  test("setting 0 (or negative) stacks clears the registry", () => {
    setCruxStacks(3, 1000, 5000)
    setCruxStacks(0, 2000, 0)
    expect(getCruxStacks()).toBe(0)
    expect(getCruxEffect(cruxAbility())).toBeUndefined()
  })
})

describe("getCruxEffect", () => {
  test("returns undefined at 0 stacks", () => {
    expect(getCruxEffect(cruxAbility())).toBeUndefined()
  })

  test("builds a representative Effect at LEVEL_CRUX with the live stack count", () => {
    setCruxStacks(3, 1000, 6000)
    const eff = getCruxEffect(cruxAbility())
    expect(eff).toBeDefined()
    if (eff === undefined) throw new Error("expected crux effect")
    expect(eff.level).toBe(LEVEL_CRUX)
    expect(eff.levelIsLow).toBe(true)
    expect(eff.stackCount).toBe(3)
    expect(eff.startTime).toBe(1000)
    expect(eff.endTime).toBe(6000)
    expect(eff.isCrux).toBe(true)
    expect(eff.ability.id).toBe(999)
  })

  test("crux is flagged isCrux even when the passed icon lacks the crux texture", () => {
    setCruxStacks(1, 0, 3000)
    const eff = getCruxEffect(cruxAbility({ icon: "/esoui/art/icons/plain.dds" }))
    if (eff === undefined) throw new Error("expected crux effect")
    expect(eff.isCrux).toBe(true)
  })
})

describe("isCruxConsumerIcon", () => {
  test("a crux-consuming slot icon (arcanist_002 / arcanist_003_b) is true", () => {
    expect(isCruxConsumerIcon("/esoui/art/icons/ability_arcanist_002.dds")).toBe(true)
    expect(isCruxConsumerIcon("/esoui/art/icons/ability_arcanist_003_b.dds")).toBe(true)
  })

  test("a non-consuming icon is false", () => {
    expect(isCruxConsumerIcon("/esoui/art/icons/ability_arcanist_crux.dds")).toBe(false)
    expect(isCruxConsumerIcon("/esoui/art/icons/ability_mage_065.dds")).toBe(false)
  })

  test("the empty string is false", () => {
    expect(isCruxConsumerIcon("")).toBe(false)
  })
})
