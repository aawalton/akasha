import { describe, expect, it } from "bun:test"
import {
  addBuyRule,
  bulkUpdateBuyRules,
  duplicateBuyRule,
  lockBuyRule,
  removeBuyRule,
  updateBuyRule,
} from "./buy-rule-settings"
import type { BuyRule } from "./buy-rule-types"
import type { InventoryRuleSettings } from "./inventory-rule-types"

function settingsWith(buyRules: readonly BuyRule[]): InventoryRuleSettings {
  return { version: 2, rules: [], buyRules }
}

function buyRule(overrides: Partial<BuyRule> = {}): BuyRule {
  return {
    id: "rule-1",
    itemId: 4000,
    itemName: "Lockpick",
    targetQuantity: 4000,
    source: "merchant",
    active: false,
    ...overrides,
  }
}

describe("addBuyRule", () => {
  it("creates an inactive merchant rule with a fresh id, prepended", () => {
    const settings = addBuyRule(
      { version: 2, rules: [] },
      { itemId: 4000, itemName: "Lockpick", targetQuantity: 4000 }
    )

    expect(settings.buyRules).toHaveLength(1)
    const rule = settings.buyRules?.[0]
    expect(rule?.itemId).toBe(4000)
    expect(rule?.itemName).toBe("Lockpick")
    expect(rule?.targetQuantity).toBe(4000)
    expect(rule?.active).toBe(false)
    expect(rule?.source).toBe("merchant")
    expect(rule?.id).toBeTruthy()
  })

  it("prepends the new rule ahead of existing rules", () => {
    const existing = buyRule({ id: "existing", itemId: 1234 })
    const settings = addBuyRule(settingsWith([existing]), {
      itemId: 4000,
      itemName: "Lockpick",
      targetQuantity: 4000,
    })

    expect(settings.buyRules).toHaveLength(2)
    expect(settings.buyRules?.[0]?.itemId).toBe(4000)
    expect(settings.buyRules?.[1]?.id).toBe("existing")
  })
})

describe("updateBuyRule", () => {
  it("patches targetQuantity on an unlocked rule", () => {
    const settings = updateBuyRule(settingsWith([buyRule()]), "rule-1", { targetQuantity: 200 })
    expect(settings.buyRules?.[0]?.targetQuantity).toBe(200)
  })

  it("refuses to patch a locked rule", () => {
    const settings = updateBuyRule(settingsWith([buyRule({ locked: true })]), "rule-1", {
      targetQuantity: 200,
    })
    expect(settings.buyRules?.[0]?.targetQuantity).toBe(4000)
  })
})

describe("removeBuyRule", () => {
  it("removes an unlocked rule", () => {
    const settings = removeBuyRule(settingsWith([buyRule()]), "rule-1")
    expect(settings.buyRules).toHaveLength(0)
  })

  it("keeps a locked rule", () => {
    const settings = removeBuyRule(settingsWith([buyRule({ locked: true })]), "rule-1")
    expect(settings.buyRules).toHaveLength(1)
  })
})

describe("lockBuyRule", () => {
  it("toggles the locked flag", () => {
    const locked = lockBuyRule(settingsWith([buyRule()]), "rule-1", true)
    expect(locked.buyRules?.[0]?.locked).toBe(true)
    const unlocked = lockBuyRule(locked, "rule-1", false)
    expect(unlocked.buyRules?.[0]?.locked).toBe(false)
  })
})

describe("duplicateBuyRule", () => {
  it("clones with active:false, locked:false, and a fresh id", () => {
    const source = buyRule({ id: "rule-1", active: true, locked: true })
    const settings = duplicateBuyRule(settingsWith([source]), "rule-1")

    expect(settings.buyRules).toHaveLength(2)
    const clone = settings.buyRules?.find((r) => r.id !== "rule-1")
    expect(clone).toBeDefined()
    expect(clone?.active).toBe(false)
    expect(clone?.locked).toBe(false)
    expect(clone?.itemId).toBe(source.itemId)
  })
})

describe("bulkUpdateBuyRules", () => {
  it("skips locked rules without force", () => {
    const settings = bulkUpdateBuyRules(
      settingsWith([buyRule({ id: "a", locked: true }), buyRule({ id: "b" })]),
      ["a", "b"],
      { targetQuantity: 999 }
    )
    expect(settings.buyRules?.find((r) => r.id === "a")?.targetQuantity).toBe(4000)
    expect(settings.buyRules?.find((r) => r.id === "b")?.targetQuantity).toBe(999)
  })

  it("updates locked rules when force is set", () => {
    const settings = bulkUpdateBuyRules(
      settingsWith([buyRule({ id: "a", locked: true })]),
      ["a"],
      { targetQuantity: 999 },
      { force: true }
    )
    expect(settings.buyRules?.find((r) => r.id === "a")?.targetQuantity).toBe(999)
  })
})
