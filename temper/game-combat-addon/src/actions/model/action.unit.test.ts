import { describe, expect, test } from "bun:test"
import {
  buildAction,
  getGallopEffect,
  TARGET_AREA,
  TARGET_ENEMY,
  TARGET_GROUND,
  TARGET_SELF,
} from "./action"
import type { Ability, Effect } from "./types"

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

const BASE = {
  sn: 1,
  slotNum: 3,
  hotbarCategory: 0,
  ability: ability(),
  channeled: false,
  castTime: 0,
  startTime: 100_000,
}

describe("buildAction duration floor", () => {
  test("rawDuration below the 1000ms floor → duration 0, endTime 0", () => {
    const a = buildAction({ ...BASE, rawDuration: 999 })
    expect(a.duration).toBe(0)
    expect(a.endTime).toBe(0)
  })

  test("rawDuration at the floor → kept", () => {
    const a = buildAction({ ...BASE, rawDuration: 1000 })
    expect(a.duration).toBe(1000)
    expect(a.endTime).toBe(101_000)
  })

  test("rawDuration above the floor → kept, endTime = startTime + duration", () => {
    const a = buildAction({ ...BASE, rawDuration: 20_000, startTime: 5_000 })
    expect(a.duration).toBe(20_000)
    expect(a.endTime).toBe(25_000)
  })

  test("rawDuration 0 → duration 0, endTime 0", () => {
    const a = buildAction({ ...BASE, rawDuration: 0 })
    expect(a.duration).toBe(0)
    expect(a.endTime).toBe(0)
  })
})

describe("buildAction flag derivation from target metadata", () => {
  test("self-buff (SELF target) → forSelf only", () => {
    const a = buildAction({
      ...BASE,
      rawDuration: 20_000,
      targetDescription: TARGET_SELF,
    })
    expect(a.flags.forSelf).toBe(true)
    expect(a.flags.forEnemy).toBe(false)
    expect(a.flags.forArea).toBe(false)
    expect(a.flags.forGround).toBe(false)
    expect(a.flags.forTank).toBe(false)
  })

  test("self via radius==500 → forSelf", () => {
    const a = buildAction({ ...BASE, rawDuration: 5_000, radius: 500 })
    expect(a.flags.forSelf).toBe(true)
  })

  test("enemy-target ability → forEnemy only", () => {
    const a = buildAction({
      ...BASE,
      rawDuration: 10_000,
      targetDescription: TARGET_ENEMY,
    })
    expect(a.flags.forEnemy).toBe(true)
    expect(a.flags.forSelf).toBe(false)
    expect(a.flags.forArea).toBe(false)
  })

  test("ground ability → forGround", () => {
    const a = buildAction({
      ...BASE,
      rawDuration: 10_000,
      targetDescription: TARGET_GROUND,
    })
    expect(a.flags.forGround).toBe(true)
    expect(a.flags.forEnemy).toBe(false)
  })

  test("area ability with radius 0 → forArea (Lua radius==0 counts)", () => {
    const a = buildAction({
      ...BASE,
      rawDuration: 10_000,
      targetDescription: TARGET_AREA,
      radius: 0,
    })
    expect(a.flags.forArea).toBe(true)
  })

  test("area ability with radius>200 → forArea", () => {
    const a = buildAction({
      ...BASE,
      rawDuration: 10_000,
      targetDescription: TARGET_AREA,
      radius: 800,
    })
    expect(a.flags.forArea).toBe(true)
  })

  test("area token with small radius (<=200, !=0) → not forArea", () => {
    const a = buildAction({
      ...BASE,
      rawDuration: 10_000,
      targetDescription: TARGET_AREA,
      radius: 150,
    })
    expect(a.flags.forArea).toBe(false)
  })

  test("explicit roles override derivation", () => {
    const a = buildAction({
      ...BASE,
      rawDuration: 10_000,
      targetDescription: TARGET_ENEMY,
      roles: { forTank: true, forEnemy: true, forArea: true },
    })
    expect(a.flags.forTank).toBe(true)
    expect(a.flags.forEnemy).toBe(true)
    expect(a.flags.forArea).toBe(true)
  })
})

describe("buildAction initialization", () => {
  test("zero-inits live-tracking fields and applies onlyOneTarget default", () => {
    const a = buildAction({ ...BASE, rawDuration: 5_000 })
    expect(a.effectList).toEqual([])
    expect(a.effectEndTimes).toEqual([])
    expect(a.stackCount).toBe(0)
    expect(a.targetOut).toBe(false)
    expect(a.fake).toBe(false)
    expect(a.saved).toBe(false)
    expect(a.data).toEqual({})
    expect(a.descriptionNums).toEqual([])
    expect(a.relatedAbilityList).toEqual([])
    expect(a.flags.shifted).toBe(false)
    expect(a.flags.onlyOneTarget).toBe(false)
  })

  test("passes through descriptionNums / relatedAbilityList / onlyOneTarget", () => {
    const a = buildAction({
      ...BASE,
      rawDuration: 5_000,
      descriptionNums: [2, 5],
      relatedAbilityList: [111, 222],
      descriptionDuration: 20_000,
      onlyOneTarget: true,
    })
    expect(a.descriptionNums).toEqual([2, 5])
    expect(a.relatedAbilityList).toEqual([111, 222])
    expect(a.descriptionDuration).toBe(20_000)
    expect(a.flags.onlyOneTarget).toBe(true)
  })
})

describe("getGallopEffect", () => {
  function effect(icon: string): Effect {
    return {
      ability: ability({ icon }),
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
      activated: true,
    }
  }

  test("returns the first Major Gallop effect by icon substring", () => {
    const a = buildAction({ ...BASE, rawDuration: 5_000 })
    const gallop = effect("/esoui/art/icons/ability_mounticon_major_gallop.dds")
    a.effectList = [effect("/esoui/art/icons/other.dds"), gallop]
    expect(getGallopEffect(a)).toBe(gallop)
  })

  test("returns undefined when no effect carries the gallop icon", () => {
    const a = buildAction({ ...BASE, rawDuration: 5_000 })
    a.effectList = [effect("/esoui/art/icons/other.dds")]
    expect(getGallopEffect(a)).toBeUndefined()
  })

  test("returns undefined for an empty effect list", () => {
    const a = buildAction({ ...BASE, rawDuration: 5_000 })
    expect(getGallopEffect(a)).toBeUndefined()
  })
})
