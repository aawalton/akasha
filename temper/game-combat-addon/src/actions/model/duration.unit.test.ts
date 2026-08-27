import { expect, test } from "bun:test"
import type { DurationCtx } from "./duration"
import { getDuration, getEndTime, getStartTime, optEffect } from "./duration"
import { LEVEL_EXACT, LEVEL_TAIL } from "./model-constants"
import type { Ability, Action, ActionFlags, Effect } from "./types"

function ability(overrides: Partial<Ability> = {}): Ability {
  return {
    id: 100,
    name: "Test",
    showName: "Test",
    icon: "/esoui/art/icons/ability_foo_001.dds",
    description: "",
    type: 1,
    ...overrides,
  }
}

function flags(overrides: Partial<ActionFlags> = {}): ActionFlags {
  return {
    forArea: false,
    forEnemy: false,
    forGround: false,
    forSelf: false,
    forTank: false,
    shifted: false,
    onlyOneTarget: false,
    ...overrides,
  }
}

function effect(overrides: Partial<Effect> = {}): Effect {
  return {
    ability: ability(),
    unitTag: "others",
    unitId: 5,
    startTime: 1000,
    endTime: 11000,
    duration: 10000,
    stackCount: 0,
    level: LEVEL_EXACT,
    levelIsLow: false,
    isCrux: false,
    ignored: false,
    ignorableDebuff: false,
    activated: false,
    ...overrides,
  }
}

function action(overrides: Partial<Action> = {}): Action {
  return {
    sn: 1,
    slotNum: 3,
    hotbarCategory: 0,
    ability: ability(),
    relatedAbilityList: [],
    channeled: false,
    castTime: 0,
    startTime: 1000,
    duration: 0,
    descriptionNums: [],
    endTime: 0,
    effectList: [],
    effectEndTimes: [],
    stackCount: 0,
    targetOut: false,
    fake: false,
    saved: false,
    flags: flags(),
    data: {},
    ...overrides,
  }
}

const ctx = (overrides: Partial<DurationCtx> = {}): DurationCtx => ({ now: 5000, ...overrides })

test("getDuration: tick source (tickEffect present, duration===0)", () => {
  const tick = effect({ tickRate: 2000 })
  const a = action({ duration: 0, tickEffect: tick })
  expect(getDuration(a, ctx())).toEqual({ duration: 2000, source: "tick" })
})

test("getDuration: channel source (channelStart/End present)", () => {
  const a = action({ duration: 0, channelStartTime: 1000, channelEndTime: 5000 })
  expect(getDuration(a, ctx())).toEqual({ duration: 4000, source: "channel" })
})

test("getDuration: filter source (configDuration set)", () => {
  const a = action({ duration: 0, configDuration: 7777 })
  expect(getDuration(a, ctx())).toEqual({ duration: 7777, source: "filter" })
})

test("getDuration: priority source (optEffect resolved)", () => {
  const e = effect({ duration: 6000, endTime: 11000, levelIsLow: false })
  const a = action({ duration: 12000, effectList: [e] })
  expect(getDuration(a, ctx({ now: 5000 }))).toEqual({ duration: 6000, source: "priority" })
})

test("getDuration: self source (action.duration > 0, no effects)", () => {
  const a = action({ duration: 9000, effectList: [] })
  expect(getDuration(a, ctx())).toEqual({ duration: 9000, source: "self" })
})

test("getDuration: description source (descriptionDuration > 0, no self)", () => {
  const a = action({ duration: 0, descriptionDuration: 4500, effectList: [] })
  expect(getDuration(a, ctx())).toEqual({ duration: 4500, source: "description" })
})

test("getDuration: none when nothing resolves", () => {
  const a = action({ duration: 0, effectList: [] })
  expect(getDuration(a, ctx())).toEqual({ duration: 0, source: "none" })
})

test("getDuration: crux-fallback action with no stackEffect → {0, none} before self", () => {
  const expiredCrux = effect({ isCrux: true, duration: 3000, endTime: 4000, levelIsLow: true })
  const a = action({ duration: 9000, effectList: [] })
  expect(getDuration(a, ctx({ now: 5000, cruxFallback: expiredCrux }))).toEqual({
    duration: 0,
    source: "none",
  })
})

test("optEffect: returns active non-low stackEffect immediately", () => {
  const stack = effect({
    ability: ability({ id: 9 }),
    duration: 5000,
    endTime: 11000,
    levelIsLow: false,
  })
  const other = effect({ ability: ability({ id: 2 }), duration: 8000, endTime: 11000 })
  const a = action({ stackEffect: stack, effectList: [other] })
  expect(optEffect(a, ctx())?.ability.id).toBe(9)
})

test("optEffect: skips filtered (expired) effects, returns first live one", () => {
  const expired = effect({ ability: ability({ id: 1 }), endTime: 4000 })
  const live = effect({ ability: ability({ id: 2 }), endTime: 20000 })
  const a = action({ effectList: [expired, live] })
  expect(optEffect(a, ctx({ now: 5000 }))?.ability.id).toBe(2)
})

test("optEffect: low stackEffect used only after the list yields nothing", () => {
  const lowStack = effect({
    ability: ability({ id: 9 }),
    duration: 5000,
    endTime: 20000,
    levelIsLow: true,
  })
  const expired = effect({ ability: ability({ id: 1 }), endTime: 4000 })
  const a = action({ stackEffect: lowStack, effectList: [expired] })
  expect(optEffect(a, ctx({ now: 5000 }))?.ability.id).toBe(9)
})

test("optEffect: crux fallback when nothing else and crux still live", () => {
  const crux = effect({ isCrux: true, duration: 0, endTime: 20000 })
  const a = action({ effectList: [] })
  expect(optEffect(a, ctx({ now: 5000, cruxFallback: crux }))?.isCrux).toBe(true)
})

test("optEffect: Major Gallop returned only when mounted", () => {
  const gallop = effect({
    ability: ability({ id: 4, icon: "/esoui/art/icons/ability_mage_065_major_gallop.dds" }),
    endTime: 20000,
  })
  const a = action({ effectList: [gallop] })
  expect(optEffect(a, ctx({ now: 5000, mounted: false }))).toBeUndefined()
  expect(optEffect(a, ctx({ now: 5000, mounted: true }))?.ability.id).toBe(4)
})

test("getStartTime: tick effect → its startTime", () => {
  const tick = effect({ startTime: 3210, tickRate: 1000 })
  const a = action({ duration: 0, tickEffect: tick })
  expect(getStartTime(a)).toBe(3210)
})

test("getStartTime: channel → channelStartTime", () => {
  const a = action({ duration: 0, channelStartTime: 2222 })
  expect(getStartTime(a)).toBe(2222)
})

test("getStartTime: default → action.startTime", () => {
  const a = action({ duration: 5000, startTime: 1234 })
  expect(getStartTime(a)).toBe(1234)
})

test("getEndTime: tick boundary snap to next tick", () => {
  const tick = effect({ startTime: 1000, tickRate: 3000 })
  const a = action({ duration: 0, tickEffect: tick })
  expect(getEndTime(a, ctx({ now: 5000 }))).toBe(7000)
})

test("getEndTime: tick boundary at exact multiple", () => {
  const tick = effect({ startTime: 0, tickRate: 2000 })
  const a = action({ duration: 0, tickEffect: tick })
  expect(getEndTime(a, ctx({ now: 6000 }))).toBe(8000)
})

test("getEndTime: channel → channelEndTime", () => {
  const a = action({ duration: 0, channelEndTime: 9999 })
  expect(getEndTime(a, ctx())).toBe(9999)
})

test("getEndTime: configDuration → startTime + configDuration", () => {
  const a = action({ duration: 0, startTime: 1000, configDuration: 5000 })
  expect(getEndTime(a, ctx())).toBe(6000)
})

test("getEndTime: optEffect endTime", () => {
  const e = effect({ endTime: 13000, levelIsLow: false })
  const a = action({ duration: 12000, effectList: [e] })
  expect(getEndTime(a, ctx({ now: 5000 }))).toBe(13000)
})

test("getEndTime: ignorableDebuff outlasting a live action returns action.endTime", () => {
  const e = effect({ endTime: 20000, ignorableDebuff: true, levelIsLow: false })
  const a = action({ duration: 8000, endTime: 9000, effectList: [e] })
  expect(getEndTime(a, ctx({ now: 5000 }))).toBe(9000)
  expect(a.data.firstStageId).toBe(a.ability.id)
})

test("getEndTime: falls back to action.endTime when no optEffect", () => {
  const a = action({ duration: 0, endTime: 8500, effectList: [] })
  expect(getEndTime(a, ctx())).toBe(8500)
})

test("getEndTime: max effectEndTimes when no optEffect and no action.endTime", () => {
  const a = action({ duration: 0, endTime: 0, effectList: [], effectEndTimes: [3000, 7000, 5000] })
  expect(getEndTime(a, ctx())).toBe(7000)
})

test("getEndTime: descriptionDuration fallback", () => {
  const a = action({
    duration: 0,
    endTime: 0,
    startTime: 1000,
    descriptionDuration: 4000,
    effectList: [],
  })
  expect(getEndTime(a, ctx())).toBe(5000)
})

test("getEndTime: bare startTime fallback", () => {
  const a = action({ duration: 0, endTime: 0, startTime: 1500, effectList: [] })
  expect(getEndTime(a, ctx())).toBe(1500)
})
