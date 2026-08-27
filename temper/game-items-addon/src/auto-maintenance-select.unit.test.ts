import { expect, test } from "bun:test"
import {
  type ConsumableStack,
  needsRecharge,
  needsRepair,
  orderRepairKits,
  orderSoulGems,
} from "./auto-maintenance-select"

function stack(partial: Partial<ConsumableStack> & { tier: number }): ConsumableStack {
  return {
    bag: 0,
    index: partial.index ?? 0,
    size: partial.size ?? 1,
    tier: partial.tier,
    isCrown: partial.isCrown ?? false,
  }
}

test("needsRecharge: full charge is never recharged", () => {
  expect(needsRecharge(100, 100, 0.1)).toBe(false)
})

test("needsRecharge: non-chargeable item (maxCharge 0) is skipped", () => {
  expect(needsRecharge(0, 0, 0.1)).toBe(false)
})

test("needsRecharge: below threshold recharges", () => {
  expect(needsRecharge(5, 100, 0.1)).toBe(true)
})

test("needsRecharge: exactly at threshold recharges (<=, matches isAbove uses strict >)", () => {
  expect(needsRecharge(10, 100, 0.1)).toBe(true)
})

test("needsRecharge: above threshold but not full is left alone", () => {
  expect(needsRecharge(50, 100, 0.1)).toBe(false)
})

test("needsRepair: pristine item is not repaired", () => {
  expect(needsRepair(100, 0.1)).toBe(false)
})

test("needsRepair: below threshold repairs", () => {
  expect(needsRepair(5, 0.1)).toBe(true)
})

test("needsRepair: exactly at threshold repairs", () => {
  expect(needsRepair(10, 0.1)).toBe(true)
})

test("needsRepair: above threshold is left alone", () => {
  expect(needsRepair(80, 0.1)).toBe(false)
})

test("orderSoulGems default (crown NOT first): ascending tier, highest tier at tail = used first", () => {
  const gems = [
    stack({ tier: 2, index: 1 }),
    stack({ tier: 0, index: 2, isCrown: true }),
    stack({ tier: 1, index: 3 }),
  ]
  const ordered = orderSoulGems(gems, false)
  expect(ordered.map((g) => g.tier)).toEqual([0, 1, 2])
  expect(ordered[ordered.length - 1]?.tier).toBe(2)
})

test("orderSoulGems crown-first: descending tier, crown tier 0 at tail = used first", () => {
  const gems = [
    stack({ tier: 2, index: 1 }),
    stack({ tier: 0, index: 2, isCrown: true }),
    stack({ tier: 1, index: 3 }),
  ]
  const ordered = orderSoulGems(gems, true)
  expect(ordered.map((g) => g.tier)).toEqual([2, 1, 0])
  expect(ordered[ordered.length - 1]?.isCrown).toBe(true)
})

test("orderRepairKits default: descending tier, lowest tier at tail = used first, crown mixed by tier", () => {
  const kits = [
    stack({ tier: 1, index: 1 }),
    stack({ tier: 3, index: 2 }),
    stack({ tier: 2, index: 3, isCrown: true }),
  ]
  const ordered = orderRepairKits(kits, { dontUseCrown: false, useCrownFirst: false })
  expect(ordered.map((k) => k.tier)).toEqual([3, 2, 1])
  expect(ordered[ordered.length - 1]?.tier).toBe(1)
})

test("orderRepairKits dontUseCrown: crown kits filtered out entirely", () => {
  const kits = [stack({ tier: 1, index: 1 }), stack({ tier: 2, index: 2, isCrown: true })]
  const ordered = orderRepairKits(kits, { dontUseCrown: true, useCrownFirst: false })
  expect(ordered.every((k) => !k.isCrown)).toBe(true)
  expect(ordered.length).toBe(1)
})

test("orderRepairKits useCrownFirst: crown kits appended at tail = used first", () => {
  const kits = [
    stack({ tier: 1, index: 1 }),
    stack({ tier: 3, index: 2 }),
    stack({ tier: 2, index: 3, isCrown: true }),
  ]
  const ordered = orderRepairKits(kits, { dontUseCrown: false, useCrownFirst: true })
  expect(ordered[ordered.length - 1]?.isCrown).toBe(true)
  expect(ordered.filter((k) => !k.isCrown).map((k) => k.tier)).toEqual([3, 1])
})
