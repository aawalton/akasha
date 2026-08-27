import { expect, test } from "bun:test"
import {
  LEVEL_CRUX,
  LEVEL_DURATION_LONGER,
  LEVEL_DURATION_MATCH,
  LEVEL_EXACT,
  LEVEL_LOW_THRESHOLD,
  LEVEL_ROLE,
  LEVEL_SIDE_BUFF,
  LEVEL_STACK,
  LEVEL_STACK_LOW,
  LEVEL_TAIL,
} from "./model-constants"
import { calcLevel, recalcEffectLevels, sortEffectList } from "./priority"
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
    startTime: 0,
    endTime: 10000,
    duration: 10000,
    stackCount: 0,
    level: LEVEL_TAIL,
    levelIsLow: true,
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
    duration: 10000,
    descriptionNums: [],
    endTime: 11000,
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

test("calcLevel: exact action-id + duration match = LEVEL_EXACT", () => {
  const a = action({ ability: ability({ id: 100 }), duration: 10000 })
  const e = effect({ ability: ability({ id: 100 }), duration: 10000 })
  expect(calcLevel(a, e, "dps")).toBe(LEVEL_EXACT)
})

test("calcLevel: stackEffect ability id = LEVEL_STACK", () => {
  const stack = effect({ ability: ability({ id: 555 }) })
  const a = action({ stackEffect: stack })
  const e = effect({ ability: ability({ id: 555 }), duration: 3000 })
  expect(calcLevel(a, e, "dps")).toBe(LEVEL_STACK)
})

test("calcLevel: stackEffect2 ability id = LEVEL_STACK_LOW", () => {
  const stack2 = effect({ ability: ability({ id: 777 }) })
  const a = action({ stackEffect2: stack2 })
  const e = effect({ ability: ability({ id: 777 }), duration: 3000 })
  expect(calcLevel(a, e, "dps")).toBe(LEVEL_STACK_LOW)
})

test("calcLevel: DPS prefers enemy-side (non-player) effect = LEVEL_ROLE", () => {
  const a = action({ ability: ability({ id: 100 }), duration: 10000, flags: flags() })
  const e = effect({ ability: ability({ id: 200 }), unitTag: "others", duration: 8000 })
  expect(calcLevel(a, e, "dps")).toBe(LEVEL_ROLE)
})

test("calcLevel: TANK prefers player-side effect = LEVEL_ROLE", () => {
  const a = action({ ability: ability({ id: 100 }), duration: 10000, flags: flags() })
  const e = effect({ ability: ability({ id: 200 }), unitTag: "player", duration: 8000 })
  expect(calcLevel(a, e, "tank")).toBe(LEVEL_ROLE)
})

test("calcLevel: HEAL prefers player-side effect = LEVEL_ROLE", () => {
  const a = action({ ability: ability({ id: 100 }), duration: 10000, flags: flags() })
  const e = effect({ ability: ability({ id: 200 }), unitTag: "player", duration: 8000 })
  expect(calcLevel(a, e, "heal")).toBe(LEVEL_ROLE)
})

test("calcLevel: HEAL with forArea action does NOT role-prefer", () => {
  const a = action({
    ability: ability({ id: 100 }),
    duration: 10000,
    flags: flags({ forArea: true }),
  })
  const e = effect({ ability: ability({ id: 200 }), unitTag: "player", duration: 10000 })
  expect(calcLevel(a, e, "heal")).toBe(LEVEL_DURATION_MATCH)
})

test("calcLevel: duration match (player-side, tank, no id match) = LEVEL_DURATION_MATCH", () => {
  const a = action({ ability: ability({ id: 100 }), duration: 10000, flags: flags() })
  const e = effect({ ability: ability({ id: 200 }), unitTag: "player", duration: 10000 })
  expect(calcLevel(a, e, "dps")).toBe(LEVEL_DURATION_MATCH)
})

test("calcLevel: tail effect (> 2x action and > 10000) = LEVEL_TAIL", () => {
  const a = action({ ability: ability({ id: 100 }), duration: 5000, flags: flags() })
  const e = effect({ ability: ability({ id: 200 }), unitTag: "player", duration: 12000 })
  expect(calcLevel(a, e, "dps")).toBe(LEVEL_TAIL)
})

test("calcLevel: longer-duration default = LEVEL_DURATION_LONGER", () => {
  const a = action({ ability: ability({ id: 100 }), duration: 5000, flags: flags() })
  const e = effect({ ability: ability({ id: 200 }), unitTag: "player", duration: 8000 })
  expect(calcLevel(a, e, "dps")).toBe(LEVEL_DURATION_LONGER)
})

test("calcLevel: major/minor side buff demoted = LEVEL_SIDE_BUFF (before stack/role)", () => {
  const buffIcon = "/esoui/art/icons/ability_buff_major_brutality.dds"
  const stack = effect({ ability: ability({ id: 300, icon: buffIcon }) })
  const a = action({ ability: ability({ id: 100 }), duration: 10000, stackEffect: stack })
  const e = effect({ ability: ability({ id: 300, icon: buffIcon }), duration: 5000 })
  expect(calcLevel(a, e, "dps")).toBe(LEVEL_SIDE_BUFF)
})

test("calcLevel: major/minor buff with MATCHING duration falls through (not demoted)", () => {
  const buffIcon = "/esoui/art/icons/ability_buff_minor_savagery.dds"
  const a = action({ ability: ability({ id: 100 }), duration: 10000, flags: flags() })
  const e = effect({
    ability: ability({ id: 300, icon: buffIcon }),
    unitTag: "player",
    duration: 10000,
  })
  expect(calcLevel(a, e, "dps")).toBe(LEVEL_DURATION_MATCH)
})

test("calcLevel: crux-flagged effect = LEVEL_CRUX", () => {
  const a = action()
  const e = effect({ isCrux: true })
  expect(calcLevel(a, e, "dps")).toBe(LEVEL_CRUX)
})

test("calcLevel: sets levelIsLow = level >= LEVEL_LOW_THRESHOLD", () => {
  const a = action({ ability: ability({ id: 100 }), duration: 10000 })
  const exactEffect = effect({ ability: ability({ id: 100 }), duration: 10000 })
  calcLevel(a, exactEffect, "dps")
  expect(exactEffect.level).toBe(LEVEL_EXACT)
  expect(exactEffect.levelIsLow).toBe(false)

  const cruxEffect = effect({ isCrux: true })
  calcLevel(a, cruxEffect, "dps")
  expect(cruxEffect.levelIsLow).toBe(LEVEL_CRUX >= LEVEL_LOW_THRESHOLD)
  expect(cruxEffect.levelIsLow).toBe(true)
})

test("sortEffectList: orders by level asc, then longer duration, then later endTime", () => {
  const low = effect({
    ability: ability({ id: 1 }),
    level: LEVEL_TAIL,
    duration: 5000,
    endTime: 5000,
  })
  const high = effect({
    ability: ability({ id: 2 }),
    level: LEVEL_EXACT,
    duration: 3000,
    endTime: 3000,
  })
  const mid = effect({
    ability: ability({ id: 3 }),
    level: LEVEL_DURATION_MATCH,
    duration: 9000,
    endTime: 9000,
  })
  const a = action({ effectList: [low, mid, high] })
  const result = sortEffectList(a)
  expect(result).toBeUndefined()
  expect(a.effectList.map((e) => e.ability.id)).toEqual([2, 3, 1])
})

test("sortEffectList: compacts nil/undefined holes before sorting (combat crash regression)", () => {
  const low = effect({
    ability: ability({ id: 1 }),
    level: LEVEL_TAIL,
    duration: 5000,
    endTime: 5000,
  })
  const high = effect({
    ability: ability({ id: 2 }),
    level: LEVEL_EXACT,
    duration: 3000,
    endTime: 3000,
  })
  const sparse: Effect[] = [low]
  sparse[2] = high
  const a = action({ effectList: sparse })
  sortEffectList(a)
  expect(a.effectList.length).toBe(2)
  expect(a.effectList.map((e) => e.ability.id)).toEqual([2, 1])
})

test("sortEffectList: same level prefers longer duration", () => {
  const shortE = effect({
    ability: ability({ id: 1 }),
    level: LEVEL_ROLE,
    duration: 4000,
    endTime: 4000,
  })
  const longE = effect({
    ability: ability({ id: 2 }),
    level: LEVEL_ROLE,
    duration: 9000,
    endTime: 9000,
  })
  const a = action({ effectList: [shortE, longE] })
  sortEffectList(a)
  expect(a.effectList.map((e) => e.ability.id)).toEqual([2, 1])
})

test("sortEffectList: same level and duration prefers later endTime", () => {
  const earlier = effect({
    ability: ability({ id: 1 }),
    level: LEVEL_ROLE,
    duration: 5000,
    endTime: 5000,
  })
  const later = effect({
    ability: ability({ id: 2 }),
    level: LEVEL_ROLE,
    duration: 5000,
    endTime: 8000,
  })
  const a = action({ effectList: [earlier, later] })
  sortEffectList(a)
  expect(a.effectList.map((e) => e.ability.id)).toEqual([2, 1])
})

test("recalcEffectLevels: assigns levels then sorts", () => {
  const a = action({ ability: ability({ id: 100 }), duration: 10000, flags: flags() })
  const exact = effect({ ability: ability({ id: 100 }), duration: 10000, endTime: 11000 })
  const enemy = effect({
    ability: ability({ id: 200 }),
    unitTag: "others",
    duration: 8000,
    endTime: 9000,
  })
  a.effectList = [enemy, exact]
  recalcEffectLevels(a, "dps")
  expect(a.effectList.map((e) => e.ability.id)).toEqual([100, 200])
  expect(exact.level).toBe(LEVEL_EXACT)
  expect(enemy.level).toBe(LEVEL_ROLE)
})
