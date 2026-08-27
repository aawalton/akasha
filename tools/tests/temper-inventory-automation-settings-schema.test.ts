import { describe, expect, it } from "bun:test"
import type {
  AutomationSettings,
  CharacterAutomationToggles,
  CompanionAutomationToggles,
} from "../lib/temper-inventory/automation-types.ts"
import { AutomationSettingsSchema } from "../lib/temper-inventory/automation-settings-schema.ts"

describe("AutomationSettingsSchema", () => {
  it("parses an empty settings ({ characters: {}, companions: {} })", () => {
    const value: AutomationSettings = { characters: {}, companions: {} }
    const parsed = AutomationSettingsSchema.parse(value)
    expect(parsed.characters).toEqual({})
    expect(parsed.companions).toEqual({})
    expect(parsed.global).toBeUndefined()
  })

  it("parses settings with global.characters set to a full CharacterAutomationToggles", () => {
    const fullToggles: CharacterAutomationToggles = {
      equipment: true,
      food: true,
      potions: true,
      skills: true,
      championPoints: true,
      attributes: true,
      soulGems: true,
      repairKits: true,
      recharge: true,
      repair: true,
      lockpicks: true,
      experienceScrolls: true,
      dailyWrits: true,
      dailyWritBlacksmithing: true,
      dailyWritClothier: true,
      dailyWritWoodworking: true,
      dailyWritJewelrycrafting: true,
      dailyWritEnchanting: true,
      dailyWritAlchemy: true,
      dailyWritProvisioning: true,
      dailyWritAutoCraft: true,
    }
    const fullCompanion: CompanionAutomationToggles = {
      equipment: true,
      skills: true,
    }
    const value: AutomationSettings = {
      global: { characters: fullToggles, companions: fullCompanion },
      characters: {},
      companions: {},
    }
    const parsed = AutomationSettingsSchema.parse(value)
    expect(parsed.global?.characters).toEqual(fullToggles)
    expect(parsed.global?.companions).toEqual(fullCompanion)
  })

  it("parses settings with per-entity overrides keyed by esoCharacterId / companionId", () => {
    const value: AutomationSettings = {
      global: { characters: { equipment: true } },
      characters: {
        "char-a": { equipment: false, food: true },
        "char-b": { equipment: true },
      },
      companions: {
        "companion-a": { equipment: true, skills: false },
      },
    }
    const parsed = AutomationSettingsSchema.parse(value)
    expect(parsed.characters["char-a"]?.equipment).toBe(false)
    expect(parsed.characters["char-a"]?.food).toBe(true)
    expect(parsed.characters["char-b"]?.equipment).toBe(true)
    expect(parsed.companions["companion-a"]?.equipment).toBe(true)
    expect(parsed.companions["companion-a"]?.skills).toBe(false)
  })

  it("survives unknown fields under global.characters via passthrough", () => {
    const value = {
      global: {
        characters: { equipment: true, futureToggle: true },
      },
      characters: {},
      companions: {},
    }
    const parsed = AutomationSettingsSchema.parse(value)
    expect(parsed.global?.characters?.equipment).toBe(true)
    expect(parsed.global?.characters).toHaveProperty("futureToggle", true)
  })

  it("rejects a non-boolean toggle value with a Zod error mentioning the offending path", () => {
    let err: unknown
    try {
      AutomationSettingsSchema.parse({
        characters: { "char-a": { equipment: "yes" } },
        companions: {},
      })
    } catch (e) {
      err = e
    }
    expect(err).toBeDefined()
    expect(String(err)).toMatch(/equipment/i)
  })
})
