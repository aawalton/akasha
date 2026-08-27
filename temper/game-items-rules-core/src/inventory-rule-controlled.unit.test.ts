import { describe, expect, it } from "bun:test"
import type {
  AutomationSettings,
  CharacterAutomationToggles,
} from "@temper/shared-engine/automation/automation-settings-types"
import { buildAllControlledRules } from "./inventory-rule-controlled"

const LOCK_WORN_ID = "controlled:character:lock-worn"

function settingsWith(characters?: CharacterAutomationToggles): AutomationSettings {
  return {
    global: { characters },
    characters: {},
    companions: {},
  }
}

describe("buildControlledCharacterRules — lock worn gear", () => {
  it("emits the lock-worn rule first when lockWornGear is unset (defaults on)", () => {
    const { characterRules } = buildAllControlledRules(settingsWith())
    expect(characterRules.length).toBeGreaterThan(0)
    expect(characterRules[0]?.id).toBe(LOCK_WORN_ID)
  })

  it("emits the lock-worn rule first ahead of the equipment rule", () => {
    const { characterRules } = buildAllControlledRules(settingsWith({ equipment: true }))
    expect(characterRules[0]?.id).toBe(LOCK_WORN_ID)
    expect(characterRules.map((r) => r.id)).toContain("controlled:character:equipment")
  })

  it("still emits the lock-worn rule (action=nothing) when lockWornGear is false, so worn items don't fall through", () => {
    const { characterRules } = buildAllControlledRules(settingsWith({ lockWornGear: false }))
    expect(characterRules[0]?.id).toBe(LOCK_WORN_ID)
    const lockWorn = characterRules.find((r) => r.id === LOCK_WORN_ID)
    expect(lockWorn?.action).toBe("nothing")
    expect(lockWorn?.conditions).toEqual({ location: ["worn"], locked: "not-locked" })
  })

  it("uses location=[worn], locked=not-locked, action=lock when enabled", () => {
    const { characterRules } = buildAllControlledRules(settingsWith())
    const lockWorn = characterRules.find((r) => r.id === LOCK_WORN_ID)
    expect(lockWorn).toBeDefined()
    expect(lockWorn?.action).toBe("lock")
    expect(lockWorn?.conditions).toEqual({ location: ["worn"], locked: "not-locked" })
  })
})
