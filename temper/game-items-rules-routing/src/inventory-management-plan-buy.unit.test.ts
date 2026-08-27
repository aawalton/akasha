import { describe, expect, it } from "bun:test"
import { requireFirst } from "../../../shared/utils-narrow/src/require-first"
import type { BuyRule } from "@temper/game-items-rules-core/buy-rule-types"
import { buildManagementPlan } from "./inventory-management-plan"
import {
  ESO_BAG_BACKPACK,
  makeInventory,
  makeItem,
  makeLocation,
} from "./inventory-management-plan.test-utils"
import { BUY_CHARACTER_NAME, collectBuyShortfalls } from "./inventory-management-plan-buy"

const LOCKPICK_ID = 33

function buyRule(overrides: Partial<BuyRule> = {}): BuyRule {
  return {
    id: "buy-lockpicks",
    itemId: LOCKPICK_ID,
    itemName: "Lockpick",
    targetQuantity: 4000,
    source: "merchant",
    active: true,
    ...overrides,
  }
}

describe("collectBuyShortfalls", () => {
  it("returns the full target when no copies are held", () => {
    const shortfalls = collectBuyShortfalls([buyRule()], null)
    expect(shortfalls).toHaveLength(1)
    expect(requireFirst(shortfalls, "shortfall").quantity).toBe(4000)
  })

  it("subtracts the GLOBAL cross-location total from the target", () => {
    const charId = "1001"
    const charPicks = { ...makeItem("Lockpick"), itemId: LOCKPICK_ID, stackCount: 300 }
    const bankPicks = { ...makeItem("Lockpick"), itemId: LOCKPICK_ID, stackCount: 700 }
    const inventory = makeInventory({
      [charId]: makeLocation("Azara", { [ESO_BAG_BACKPACK]: { 0: charPicks } }),
      Bank: makeLocation("Bank", { 2: { 0: bankPicks } }),
    })
    const shortfalls = collectBuyShortfalls([buyRule()], inventory)
    expect(requireFirst(shortfalls, "shortfall").quantity).toBe(3000)
  })

  it("skips rules already at or above target (zero shortfall)", () => {
    const charId = "1001"
    const charPicks = { ...makeItem("Lockpick"), itemId: LOCKPICK_ID, stackCount: 5000 }
    const inventory = makeInventory({
      [charId]: makeLocation("Azara", { [ESO_BAG_BACKPACK]: { 0: charPicks } }),
    })
    expect(collectBuyShortfalls([buyRule()], inventory)).toHaveLength(0)
  })

  it("skips inactive rules", () => {
    expect(collectBuyShortfalls([buyRule({ active: false })], null)).toHaveLength(0)
  })
})

describe("buildManagementPlan — buy injection", () => {
  it("renders a character-agnostic merchant buy stop for the shortfall", () => {
    const plan = buildManagementPlan([], [], new Map(), null, undefined, undefined, [buyRule()])
    expect(plan.sessions).toHaveLength(1)
    const session = requireFirst(plan.sessions, "session")
    expect(session.characterName).toBe(BUY_CHARACTER_NAME)
    const venue = requireFirst(session.venues, "venue")
    expect(venue.venue).toBe("vendor")
    const group = requireFirst(venue.actionGroups, "group")
    expect(group.label).toBe("Buy")
    const item = requireFirst(group.items, "item")
    expect(item.itemId).toBe(LOCKPICK_ID)
    expect(item.itemName).toBe("Lockpick")
    expect(item.stackCount).toBe(4000)
  })

  it("emits no buy stop when there is nothing to buy", () => {
    const plan = buildManagementPlan([], [], new Map(), null, undefined, undefined, [
      buyRule({ targetQuantity: 0 }),
    ])
    expect(plan.sessions).toHaveLength(0)
  })

  it("does nothing when buyRules is undefined", () => {
    const plan = buildManagementPlan([], [], new Map(), null)
    expect(plan.sessions).toHaveLength(0)
  })
})
