import { describe, expect, test } from "bun:test"
import { buildAction } from "./action"
import { buildEffect } from "./effect"
import { LEVEL_STACK, LEVEL_STACK_LOW } from "./model-constants"
import { updateStackInfo } from "./stacks"
import type { Ability, Action, Effect } from "./types"

function ability(over: Partial<Ability> = {}): Ability {
  return {
    id: 100,
    name: "Stone Giant",
    showName: "Stone Giant",
    icon: "/esoui/art/icons/test.dds",
    description: "Deals damage and grants up to 3 stacks.",
    type: 1,
    ...over,
  }
}

function action(over: Partial<Action> = {}): Action {
  const a = buildAction({
    sn: 1,
    slotNum: 3,
    hotbarCategory: 0,
    ability: ability(),
    channeled: false,
    castTime: 0,
    startTime: 100_000,
    rawDuration: 0,
  })
  return { ...a, ...over }
}

function stackEffect(stackCount: number, abilityOver: Partial<Ability> = {}): Effect {
  return buildEffect({
    ability: ability(abilityOver),
    unitTag: "player",
    unitId: 0,
    startTime: 100_000,
    endTime: 0,
    stackCount,
  })
}

describe("updateStackInfo routing", () => {
  test("a sudden >=3 stack at action start matching a description number → stackEffect2 (bonus)", () => {
    const a = action()
    const eff = stackEffect(3)
    updateStackInfo(a, eff, { now: 100_500, descriptionNums: [3] })
    expect(a.stackEffect2).toBe(eff)
    expect(a.stackEffect).toBeUndefined()
    expect(eff.level).toBe(LEVEL_STACK_LOW)
  })

  test("an accrued stack (<3) → stackEffect", () => {
    const a = action()
    const eff = stackEffect(1)
    updateStackInfo(a, eff, { now: 100_500, descriptionNums: [3] })
    expect(a.stackEffect).toBe(eff)
    expect(a.stackEffect2).toBeUndefined()
    expect(a.stackCount).toBe(1)
    expect(eff.level).toBe(LEVEL_STACK)
  })

  test(">=3 stack NOT matching any description number → accrued stackEffect, not bonus", () => {
    const a = action()
    const eff = stackEffect(4)
    updateStackInfo(a, eff, { now: 100_500, descriptionNums: [3, 5] })
    expect(a.stackEffect).toBe(eff)
    expect(a.stackEffect2).toBeUndefined()
    expect(eff.level).toBe(LEVEL_STACK)
  })

  test(">=3 matching stack but LATE (outside the 1000ms start window) → accrued, not bonus", () => {
    const a = action()
    const eff = stackEffect(3)
    updateStackInfo(a, eff, { now: 101_000, descriptionNums: [3] })
    expect(a.stackEffect).toBe(eff)
    expect(a.stackEffect2).toBeUndefined()
  })

  test("fake action never gets a bonus stack — accrues instead", () => {
    const a = action({ fake: true })
    const eff = stackEffect(3)
    updateStackInfo(a, eff, { now: 100_500, descriptionNums: [3] })
    expect(a.stackEffect).toBe(eff)
    expect(a.stackEffect2).toBeUndefined()
  })

  test("same-ability refresh updates the existing accrued stackEffect", () => {
    const a = action()
    const first = stackEffect(1)
    updateStackInfo(a, first, { now: 100_500, descriptionNums: [3] })
    const second = stackEffect(2)
    updateStackInfo(a, second, { now: 100_600, descriptionNums: [3] })
    expect(a.stackEffect).toBe(second)
    expect(a.stackCount).toBe(2)
    expect(a.stackEffect2).toBeUndefined()
  })

  test("a different ability than the accrued stack routes to stackEffect2", () => {
    const a = action()
    const accrued = stackEffect(1, { id: 100 })
    updateStackInfo(a, accrued, { now: 100_500, descriptionNums: [3] })
    const other = stackEffect(2, { id: 200 })
    updateStackInfo(a, other, { now: 100_600, descriptionNums: [3] })
    expect(a.stackEffect).toBe(accrued)
    expect(a.stackEffect2).toBe(other)
    expect(other.level).toBe(LEVEL_STACK_LOW)
  })

  test("sudden-bonus is ignored when a DIFFERENT-ability stackEffect2 already exists", () => {
    const a = action()
    const existingBonus = stackEffect(3, { id: 300 })
    a.stackEffect2 = existingBonus
    const incoming = stackEffect(3, { id: 100 })
    updateStackInfo(a, incoming, { now: 100_500, descriptionNums: [3] })
    expect(a.stackEffect2).toBe(existingBonus)
    expect(a.stackEffect).toBeUndefined()
  })
})
