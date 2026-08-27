import { beforeEach, describe, expect, test } from "bun:test"
import { buildAction } from "../model/action"
import type { Ability, Action } from "../model/types"
import { enqueueAction, removeAction, resetState, state } from "./registries"

function ability(over: Partial<Ability> = {}): Ability {
  return {
    id: 100,
    name: "Test Ability",
    showName: "Test Ability",
    icon: "/esoui/art/icons/test.dds",
    description: "A test ability.",
    type: 1,
    ...over,
  }
}

function action(sn: number, abilityId: number): Action {
  return buildAction({
    sn,
    slotNum: 3,
    hotbarCategory: 0,
    ability: ability({ id: abilityId }),
    channeled: false,
    castTime: 0,
    startTime: 100_000,
    rawDuration: 20_000,
  })
}

describe("removeAction registry eviction", () => {
  beforeEach(() => {
    resetState()
  })

  test("evicts the action from idActionMap, snActionMap, and actionQueue", () => {
    const a = action(1, 100)
    enqueueAction(a)
    state.idActionMap.set(a.ability.id, a)

    removeAction(a)

    expect(state.idActionMap.has(100)).toBe(false)
    expect(state.snActionMap.has(1)).toBe(false)
    expect(state.actionQueue.length).toBe(0)
  })

  test("identity guard: removing a stale duplicate leaves the newer same-id action installed", () => {
    const older = action(1, 100)
    const newer = action(2, 100)
    enqueueAction(older)
    enqueueAction(newer)
    state.idActionMap.set(100, newer)

    removeAction(older)

    expect(state.idActionMap.get(100)).toBe(newer)
    expect(state.snActionMap.has(2)).toBe(true)
    expect(state.snActionMap.has(1)).toBe(false)
  })
})
