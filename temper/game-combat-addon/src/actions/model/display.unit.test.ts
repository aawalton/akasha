import { describe, expect, test } from "bun:test"
import {
  bracketLowPriority,
  cooldownGeometry,
  formatRemainLabel,
  getAreaEffectCount,
  getStageInfo,
  getStageInfo2,
  needEndingAlert,
  scaleCooldown,
} from "./display"
import type { DurationCtx } from "./duration"
import type { Ability, Action, ActionFlags, Effect } from "./types"

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
    startTime: 0,
    endTime: 10_000,
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

const NOW = 105_000

function ctx(over: Partial<DurationCtx> = {}): DurationCtx {
  return { now: NOW, ...over }
}

describe("getAreaEffectCount", () => {
  test("counts only area-effect-typed effects", () => {
    const a = action({
      effectList: [
        effect({ ability: ability({ type: AREA_TYPE }) }),
        effect({ ability: ability({ type: AREA_TYPE }) }),
        effect({ ability: ability({ type: 1 }) }),
      ],
    })
    expect(getAreaEffectCount(a)).toBe(2)
  })

  test("returns 0 when no area effects present", () => {
    const a = action({ effectList: [effect({ ability: ability({ type: 1 }) })] })
    expect(getAreaEffectCount(a)).toBe(0)
  })
})

describe("getStageInfo", () => {
  test("tick effect with no usable duration → ∞", () => {
    const a = action({
      duration: 0,
      tickEffect: effect({ tickRate: 1000, startTime: 100_000 }),
    })
    expect(getStageInfo(a, ctx())).toBe("∞")
  })

  test("tick effect with duration → 'done/total' progress label", () => {
    const a = action({
      duration: 10_000,
      tickEffect: effect({ tickRate: 2000, startTime: 100_000, endTime: 110_000 }),
    })
    expect(getStageInfo(a, ctx())).toBe("2/5")
  })

  test("stackEffect.stageInfo takes precedence (Power Lash guide)", () => {
    const a = action({ stackEffect: effect({ stageInfo: "2/3" }) })
    expect(getStageInfo(a, ctx())).toBe("2/3")
  })

  test("delayed activated effect on a non-ground action → @", () => {
    const opt = effect({
      ability: ability({ id: 999 }),
      startTime: 102_000,
      endTime: 112_000,
      duration: 4000,
      activated: false,
      level: 1,
    })
    const a = action({
      ability: ability({ id: 12345 }),
      startTime: 100_000,
      duration: 10_000,
      effectList: [opt],
    })
    expect(getStageInfo(a, ctx())).toBe("@")
  })

  test("targetOut with no earlier match → #", () => {
    const opt = effect({
      ability: ability({ id: 12345 }),
      startTime: 100_000,
      endTime: 110_000,
      duration: 10_000,
    })
    const a = action({
      ability: ability({ id: 12345 }),
      startTime: 100_000,
      duration: 10_000,
      targetOut: true,
      effectList: [opt],
    })
    expect(getStageInfo(a, ctx())).toBe("#")
  })

  test("no opt effect → undefined", () => {
    const a = action({ effectList: [] })
    expect(getStageInfo(a, ctx())).toBeUndefined()
  })
})

describe("getStageInfo2", () => {
  test("stackEffect2 stack count is rendered", () => {
    const a = action({ stackEffect2: effect({ stackCount: 3, duration: 5000, endTime: 110_000 }) })
    expect(getStageInfo2(a, ctx())).toBe("3")
  })

  test("area action multi-target count → max distinct units for one ability", () => {
    const a = action({
      flags: flags({ forArea: true }),
      effectList: [
        effect({ ability: ability({ id: 7 }), unitId: 100 }),
        effect({ ability: ability({ id: 7 }), unitId: 101 }),
        effect({ ability: ability({ id: 7 }), unitId: 102 }),
        effect({ ability: ability({ id: 9 }), unitId: 100 }),
      ],
    })
    expect(getStageInfo2(a, ctx())).toBe("3")
  })

  test("single target area → undefined (maxCount not > 1)", () => {
    const a = action({
      flags: flags({ forArea: true }),
      effectList: [effect({ ability: ability({ id: 7 }), unitId: 100 })],
    })
    expect(getStageInfo2(a, ctx())).toBeUndefined()
  })

  test("non-area, no stackEffect2 → undefined", () => {
    const a = action({ flags: flags({ forArea: false }) })
    expect(getStageInfo2(a, ctx())).toBeUndefined()
  })
})

describe("needEndingAlert", () => {
  test("plain duration action → true", () => {
    expect(needEndingAlert(action())).toBe(true)
  })

  test("tick action → false", () => {
    expect(needEndingAlert(action({ tickEffect: effect({ tickRate: 1000 }) }))).toBe(false)
  })

  test("channeled action → false", () => {
    expect(needEndingAlert(action({ channelStartTime: 100_000 }))).toBe(false)
  })
})

describe("formatRemainLabel", () => {
  test("5000ms → '5.0' (one decimal)", () => {
    expect(formatRemainLabel(5000, { ignoreDecimal: false, ignoreDecimalThreshold: 10 })).toBe(
      "5.0"
    )
  })

  test("12000ms with ignoreDecimal at threshold 10 → '12' (integer)", () => {
    expect(formatRemainLabel(12_000, { ignoreDecimal: true, ignoreDecimalThreshold: 10 })).toBe(
      "12"
    )
  })

  test("12000ms with ignoreDecimal but below threshold → '12.0'", () => {
    expect(formatRemainLabel(12_000, { ignoreDecimal: true, ignoreDecimalThreshold: 20 })).toBe(
      "12.0"
    )
  })

  test("3450ms → '3.5' (rounds the tenth)", () => {
    expect(formatRemainLabel(3450, { ignoreDecimal: false, ignoreDecimalThreshold: 10 })).toBe(
      "3.5"
    )
  })

  test("9990ms → '10.0' (tenth carries into integer part)", () => {
    expect(formatRemainLabel(9990, { ignoreDecimal: false, ignoreDecimalThreshold: 100 })).toBe(
      "10.0"
    )
  })

  test("integer format truncates toward zero", () => {
    expect(formatRemainLabel(12_900, { ignoreDecimal: true, ignoreDecimalThreshold: 10 })).toBe(
      "12"
    )
  })
})

describe("bracketLowPriority", () => {
  test("wraps in angle brackets", () => {
    expect(bracketLowPriority("5")).toBe("<5>")
  })
})

describe("scaleCooldown", () => {
  test("short remain passes through unchanged", () => {
    expect(scaleCooldown(5000, 6000)).toEqual({ remain: 5000, duration: 6000 })
  })

  test("long remain on short duration passes through (duration <= 8000)", () => {
    expect(scaleCooldown(7500, 8000)).toEqual({ remain: 7500, duration: 8000 })
  })

  test("long duration compresses per ADR arithmetic", () => {
    expect(scaleCooldown(15_000, 20_000)).toEqual({ remain: 255_000, duration: 260_000 })
  })
})

describe("cooldownGeometry", () => {
  test("zero duration → all-zero fractions", () => {
    expect(cooldownGeometry(5000, 0)).toEqual({
      topLeft: 0,
      topRight: 0,
      right: 0,
      bottom: 0,
      left: 0,
    })
  })

  test("full remain → all segments saturate to 1", () => {
    const g = cooldownGeometry(10_000, 10_000)
    expect(g.topLeft).toBe(1)
    expect(g.topRight).toBe(1)
    expect(g.right).toBe(1)
    expect(g.bottom).toBe(1)
    expect(g.left).toBe(1)
  })

  test("half remain → late segments active, top-right gone", () => {
    const g = cooldownGeometry(5000, 10_000)
    expect(g.topRight).toBe(0)
    expect(g.right).toBe(0)
    expect(g.bottom).toBe(0.5)
    expect(g.left).toBe(1)
    expect(g.topLeft).toBe(1)
  })

  test("near-zero remain → only topLeft fractionally active, early segments 0", () => {
    const g = cooldownGeometry(500, 10_000)
    expect(g.topRight).toBe(0)
    expect(g.right).toBe(0)
    expect(g.bottom).toBe(0)
    expect(g.left).toBe(0)
    expect(g.topLeft).toBeCloseTo(0.4, 10)
  })
})
