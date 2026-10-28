import { expect, test } from "bun:test"
import type { PlanItem } from "akasha/temper/items/rules/routing/core/modules/inventory-management-plan-types/inventory-management-plan-types.module.code.ts"
import {
  buildActionGroups,
  stacksOf,
} from "akasha/temper/items/rules/routing/modules/inventory-management-plan-grouping/inventory-management-plan-grouping.module.code.ts"

const SOUL_GEM = 33271

function gems(stackCount: number, maxStackSize?: number): PlanItem {
  return {
    itemId: SOUL_GEM,
    itemName: "Soul Gem (Empty)",
    stackCount,
    maxStackSize,
    quality: 1,
    action: "fill",
    note: "Fill",
  }
}

test("a merged item takes its units over its stack size, rounded up, in stacks", () => {
  expect(stacksOf(gems(14998, 200))).toBe(75)
  expect(stacksOf(gems(200, 200))).toBe(1)
  expect(stacksOf(gems(201, 200))).toBe(2)
})

test("each unstackable item takes a stack of its own", () => {
  expect(stacksOf(gems(3, 1))).toBe(3)
})

test("an item whose stack size the holdings never read takes one stack", () => {
  expect(stacksOf(gems(14998))).toBe(1)
})

test("a group counts the stacks its merged items take rather than the items", () => {
  const [group] = buildActionGroups([gems(10000, 200), gems(4998, 200)])

  expect(group?.items).toHaveLength(1)
  expect(group?.items[0]?.stackCount).toBe(14998)
  expect(group?.slotCount).toBe(75)
})

test("a merge keeps the stack size a later entry read where the first read none", () => {
  const [group] = buildActionGroups([gems(150), gems(150, 200)])

  expect(group?.slotCount).toBe(2)
})
