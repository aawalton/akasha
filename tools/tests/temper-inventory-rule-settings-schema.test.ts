import { describe, expect, it } from "bun:test"
import type {
  CategoryRule,
  InventoryRuleSettings,
} from "../lib/temper-inventory/game-rule-types.ts"
import { InventoryRuleSettingsSchema } from "../lib/temper-inventory/rule-settings-schema.ts"

describe("InventoryRuleSettingsSchema", () => {
  it("parses a minimal valid settings ({ version: 2, rules: [] })", () => {
    const value: InventoryRuleSettings = { version: 2, rules: [] }
    const parsed = InventoryRuleSettingsSchema.parse(value)
    expect(parsed.version).toBe(2)
    expect(parsed.rules).toEqual([])
  })

  it("parses a settings carrying a CategoryRule with every condition field set", () => {
    const fullRule: CategoryRule = {
      id: "rule-full",
      categoryId: "equipment",
      action: "move-to",
      active: true,
      locked: false,
      goal: "test goal",
      title: "test title",
      notes: "test notes",
      destination: "bank",
      stockScope: "any-character",
      updatedAt: 1_700_000_000_000,
      conditions: {
        maxQuality: 4,
        qualityOp: "<=",
        traits: ["divines", "infused"] as const,
        setSourceTypes: ["overland", "crafted"] as const,
        maxLevel: 50,
        levelOp: "<=",
        stolen: "not-stolen",
        crafted: "crafted",
        bound: "not-bound",
        locked: "not-locked",
        reconstructed: "not-reconstructed",
        transmuted: "not-transmuted",
        known: "known",
        canInspire: "can-inspire",
        canResearch: "can-research",
        canUnlock: "can-unlock",
        canOpen: "can-open",
        canSell: "can-sell",
        canListAtGuildTrader: "can-list-at-guild-trader",
        canGiveMaxRewards: "can-give-max-rewards",
        canCompanionEquip: "can-companion-equip",
        isTargetEquip: "is-target-equip",
        isTargetCompanionEquip: "is-target-companion-equip",
        allStocked: "all-stocked",
        stockThreshold: 200,
        maxValue: 1000,
        minValue: 10,
        value: 500,
        valueOp: ">=",
        marketValue: 800,
        marketValueOp: ">=",
        merchantValue: 50,
        merchantValueOp: ">=",
        replacementValue: 200,
        replacementValueOp: ">=",
        keepQuantity: 5,
        targetQuantity: 10,
        itemNamePattern: "^Lava Foot",
      },
    }
    const value: InventoryRuleSettings = { version: 2, rules: [fullRule] }

    const parsed = InventoryRuleSettingsSchema.parse(value)
    expect(parsed.rules.length).toBe(1)
    expect(parsed.rules[0]).toEqual(fullRule)
  })

  it("parses settings with an ItemRule array", () => {
    const value: InventoryRuleSettings = {
      version: 2,
      rules: [],
      itemRules: [
        {
          id: "item-rule-1",
          itemId: 12345,
          itemName: "Lava Foot Soup",
          action: "stock",
          active: true,
          locked: false,
          stockQuantity: 100,
          stockScope: "any-character",
          destination: "bank",
          updatedAt: 1_700_000_000_000,
        },
      ],
    }
    const parsed = InventoryRuleSettingsSchema.parse(value)
    expect(parsed.itemRules?.length).toBe(1)
    expect(parsed.itemRules?.[0]?.itemId).toBe(12345)
  })

  it("round-trips unknown fields via passthrough on rules and on the root", () => {
    const value = {
      version: 2,
      rules: [
        {
          id: "rule-x",
          categoryId: "equipment",
          action: "nothing",
          legacyField: "preserved",
        },
      ],
      futureSliceField: { foo: 1 },
    }
    const parsed = InventoryRuleSettingsSchema.parse(value)
    expect(parsed.rules[0]).toHaveProperty("legacyField", "preserved")
    expect(parsed).toHaveProperty("futureSliceField", { foo: 1 })
  })

  it("rejects version: 1 with a Zod error mentioning the version field", () => {
    expect(() => InventoryRuleSettingsSchema.parse({ version: 1, rules: [] })).toThrow(/version/i)
  })

  it("rejects version: 3 with a Zod error mentioning the version field", () => {
    expect(() => InventoryRuleSettingsSchema.parse({ version: 3, rules: [] })).toThrow(/version/i)
  })

  it("rejects a rule missing id with a clear path in the error", () => {
    let err: unknown
    try {
      InventoryRuleSettingsSchema.parse({
        version: 2,
        rules: [{ categoryId: "equipment", action: "nothing" }],
      })
    } catch (e) {
      err = e
    }
    expect(err).toBeDefined()
    expect(String(err)).toMatch(/id/i)
  })

  it("rejects a rule missing categoryId with a clear path in the error", () => {
    let err: unknown
    try {
      InventoryRuleSettingsSchema.parse({
        version: 2,
        rules: [{ id: "r1", action: "nothing" }],
      })
    } catch (e) {
      err = e
    }
    expect(err).toBeDefined()
    expect(String(err)).toMatch(/categoryId/i)
  })
})
