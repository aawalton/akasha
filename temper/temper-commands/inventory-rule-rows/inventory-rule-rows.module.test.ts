import { describe, expect, test } from "bun:test"
import type { ItemRule } from "@akasha/temper-items-rules-core/inventory-rule-types"
import {
  BUY_RULE_COLUMNS,
  ITEM_RULE_COLUMNS,
  itemRuleRow,
  RULE_SHOW_COLUMNS,
} from "./inventory-rule-rows.module.code.ts"

const RULE = {
  id: "rule-1",
  itemId: 45336,
  itemName: "Rubedite Ore",
  action: "move-to",
  active: true,
  locked: false,
  stockQuantity: 200,
  destination: "bank",
} as unknown as ItemRule

describe("itemRuleRow", () => {
  test("prints the fields the item rule columns name and no others", () => {
    expect(Object.keys(itemRuleRow(RULE)).sort()).toEqual([...ITEM_RULE_COLUMNS].sort())
  })

  test("carries each value off the rule unchanged", () => {
    expect(itemRuleRow(RULE)).toEqual({
      id: "rule-1",
      itemId: 45336,
      itemName: "Rubedite Ore",
      action: "move-to",
      active: true,
      locked: false,
      stockQuantity: 200,
      destination: "bank",
    })
  })
})

describe("the column sets", () => {
  test("every listing names its id first", () => {
    expect(ITEM_RULE_COLUMNS[0]).toBe("id")
    expect(BUY_RULE_COLUMNS[0]).toBe("id")
    expect(RULE_SHOW_COLUMNS[0]).toBe("id")
  })

  test("a buy rule is listed by its target quantity and source", () => {
    expect(BUY_RULE_COLUMNS).toContain("targetQuantity")
    expect(BUY_RULE_COLUMNS).toContain("source")
  })

  test("a rule shown is listed by its category rather than its item", () => {
    expect(RULE_SHOW_COLUMNS).toContain("categoryId")
    expect(RULE_SHOW_COLUMNS).not.toContain("itemId")
  })
})
