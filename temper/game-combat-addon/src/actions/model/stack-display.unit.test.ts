import { describe, expect, test } from "bun:test"
import type { DurationCtx } from "./duration"
import { resolveStackLabels } from "./stack-display"
import type { Ability, Action, ActionFlags, Effect } from "./types"

const NOW = 105_000
const AREA_TYPE = 22

function ability(over: Partial<Ability> = {}): Ability {
  return {
    id: 12345,
    name: "Test Ability",
    showName: "Test Ability",
    icon: "/esoui/art/icons/test.dds",
    description: "A test ability.",
    type: 1,
    ...over,
  }
}

function flags(over: Partial<ActionFlags> = {}): ActionFlags {
  return {
    forArea: false,
    forEnemy: false,
    forGround: false,
    forSelf: false,
    forTank: false,
    shifted: false,
    onlyOneTarget: false,
    ...over,
  }
}

function effect(over: Partial<Effect> = {}): Effect {
  return {
    ability: ability(),
    unitTag: "player",
    unitId: 1,
    startTime: 100_000,
    endTime: 110_000,
    duration: 10_000,
    stackCount: 0,
    level: 1,
    levelIsLow: false,
    ignored: false,
    ignorableDebuff: false,
    isCrux: false,
    activated: false,
    ...over,
  }
}

function action(over: Partial<Action> = {}): Action {
  return {
    sn: 1,
    slotNum: 3,
    hotbarCategory: 0,
    ability: ability(),
    relatedAbilityList: [],
    channeled: false,
    castTime: 0,
    startTime: 100_000,
    duration: 10_000,
    descriptionNums: [],
    endTime: 110_000,
    effectList: [],
    effectEndTimes: [],
    stackCount: 0,
    lastEffectTime: 0,
    targetOut: false,
    fake: false,
    saved: false,
    flags: flags(),
    data: {},
    ...over,
  }
}

function ctx(over: Partial<DurationCtx> = {}): DurationCtx {
  return { now: NOW, ...over }
}

function accrued(count: number): Effect {
  return effect({ ability: ability({ id: 100 }), stackCount: count })
}

function bonus(count: number): Effect {
  return effect({ ability: ability({ id: 200 }), stackCount: count })
}

function accruedDuration0(count: number): Effect {
  return effect({
    ability: ability({ id: 100 }),
    stackCount: count,
    duration: 0,
    startTime: 90_000,
    endTime: 90_000,
  })
}

describe("resolveStackLabels — single-charge-count invariant", () => {
  test("accrued stacks only: single count top-right, left hidden", () => {
    const a = action({ stackEffect: accrued(4) })
    const { right, left } = resolveStackLabels(a, ctx())
    expect(right).toEqual({ kind: "count", text: "4" })
    expect(left).toEqual({ kind: "hidden" })
  })

  test("COLLISION (U47 Relentless Focus): accrued AND bonus both live -> single count right, left suppressed", () => {
    const a = action({ stackEffect: accrued(5), stackEffect2: bonus(5) })
    const { right, left } = resolveStackLabels(a, ctx())
    expect(right).toEqual({ kind: "count", text: "5" })
    expect(left).toEqual({ kind: "hidden" })
  })

  test("triggered-bonus only (Stone Giant-style): count shows top-left, right hidden", () => {
    const a = action({ stackEffect2: bonus(3) })
    const { right, left } = resolveStackLabels(a, ctx())
    expect(right).toEqual({ kind: "hidden" })
    expect(left).toEqual({ kind: "value", text: "3" })
  })

  test("no stacks, no stage: both hidden", () => {
    const a = action()
    const { right, left } = resolveStackLabels(a, ctx())
    expect(right).toEqual({ kind: "hidden" })
    expect(left).toEqual({ kind: "hidden" })
  })

  test("accrued count present suppresses a would-be stage indicator on the right", () => {
    const long = effect({ ability: ability({ id: 100 }), endTime: 200_000, duration: 100_000 })
    const a = action({ stackEffect: accrued(6), effectList: [long] })
    const { right } = resolveStackLabels(a, ctx())
    expect(right).toEqual({ kind: "count", text: "6" })
  })

  test("area multi-target count on the left is preserved when the right is a stage (not an accrued count)", () => {
    const a = action({
      flags: flags({ forArea: true }),
      effectList: [
        effect({ ability: ability({ id: 300, type: AREA_TYPE }), unitId: 1 }),
        effect({ ability: ability({ id: 300, type: AREA_TYPE }), unitId: 2 }),
      ],
    })
    const { right, left } = resolveStackLabels(a, ctx())
    expect(right.kind).not.toBe("count")
    expect(left).toEqual({ kind: "value", text: "2" })
  })

  test("U47 duration-0 accrued stack rendered PAST its stale endTime still shows one count (absent-while-charged regression)", () => {
    const a = action({ stackEffect: accruedDuration0(8) })
    const { right, left } = resolveStackLabels(a, ctx())
    expect(right).toEqual({ kind: "count", text: "8" })
    expect(left).toEqual({ kind: "hidden" })
  })

  test("U47 duration-0 accrued AND bonus both populated past endTime -> single count right, left suppressed", () => {
    const a = action({ stackEffect: accruedDuration0(8), stackEffect2: bonus(8) })
    const { right, left } = resolveStackLabels(a, ctx())
    expect(right).toEqual({ kind: "count", text: "8" })
    expect(left).toEqual({ kind: "hidden" })
  })

  test("a genuinely expired NONZERO-duration stack effect is correctly rejected (right hidden)", () => {
    const expired = effect({
      ability: ability({ id: 100 }),
      stackCount: 8,
      duration: 10_000,
      startTime: 80_000,
      endTime: 90_000,
    })
    const a = action({ stackEffect: expired })
    const { right } = resolveStackLabels(a, ctx())
    expect(right).toEqual({ kind: "hidden" })
  })

  test("invariant holds across every fixture: right-count and left-value are never both shown", () => {
    const cases: Action[] = [
      action({ stackEffect: accrued(4) }),
      action({ stackEffect: accrued(5), stackEffect2: bonus(5) }),
      action({ stackEffect: accruedDuration0(8), stackEffect2: bonus(8) }),
      action({ stackEffect2: bonus(3) }),
      action(),
      action({ stackEffect: accrued(10), stackEffect2: bonus(2) }),
      action({ flags: flags({ forArea: true }), stackEffect: accrued(4) }),
    ]
    for (const a of cases) {
      const { right, left } = resolveStackLabels(a, ctx())
      const doubleCount = right.kind === "count" && left.kind === "value"
      expect(doubleCount).toBe(false)
    }
  })
})
