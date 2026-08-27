import { describe, expect, it } from "bun:test"
import type { AutomationSettings } from "../lib/temper-inventory/automation-types.ts"
import { applyToggle, parseScope } from "../lib/temper-inventory/automation-set.ts"

function freshSettings(): AutomationSettings {
  return {
    global: {
      characters: { equipment: true, dailyWrits: false },
      companions: { equipment: false },
    },
    characters: {
      "@aawalton__char1": { equipment: false },
      "@aawalton__char2": { dailyWrits: true },
    },
    companions: {
      bastian: { equipment: true },
    },
  }
}

describe("parseScope", () => {
  it("global + character-only toggle → kind=global, target=characters", () => {
    const scope = parseScope("global", "dailyWrits", undefined)
    expect(scope).toEqual({ kind: "global", target: "characters" })
  })

  it("global + character-only toggle (dailyWrits) → kind=global, target=characters", () => {
    const scope = parseScope("global", "dailyWritBlacksmithing", undefined)
    expect(scope).toEqual({ kind: "global", target: "characters" })
  })

  it("global + overlapping toggle without --target → throws ambiguity error", () => {
    expect(() => parseScope("global", "equipment", undefined)).toThrow(/ambiguous|--target/)
  })

  it("global + overlapping toggle with --target characters → routes to characters", () => {
    const scope = parseScope("global", "equipment", "characters")
    expect(scope).toEqual({ kind: "global", target: "characters" })
  })

  it("global + overlapping toggle with --target companions → routes to companions", () => {
    const scope = parseScope("global", "skills", "companions")
    expect(scope).toEqual({ kind: "global", target: "companions" })
  })

  it("character:<id> scope → kind=character with id", () => {
    const scope = parseScope("character:@user__char", "dailyWrits", undefined)
    expect(scope).toEqual({ kind: "character", esoCharId: "@user__char" })
  })

  it("companion:<id> scope → kind=companion with id", () => {
    const scope = parseScope("companion:bastian", "equipment", undefined)
    expect(scope).toEqual({ kind: "companion", companionId: "bastian" })
  })

  it("character:<id> with companion-only toggle → throws", () => {
    expect(() => parseScope("character:@x", "notARealToggle", undefined)).toThrow(
      /character toggle/
    )
  })

  it("companion:<id> with character-only toggle → throws", () => {
    expect(() => parseScope("companion:bastian", "dailyWrits", undefined)).toThrow(
      /companion toggle/
    )
  })

  it("--target with --scope=character → throws", () => {
    expect(() => parseScope("character:@x", "equipment", "characters")).toThrow(/global/)
  })

  it("invalid scope syntax → throws", () => {
    expect(() => parseScope("user:foo", "equipment", undefined)).toThrow(/--scope must be/)
  })
})

describe("applyToggle (parseScope is correct, see prior block)", () => {
  it("global characters toggle: set false → updates global.characters slot, leaves companions/characters dict alone", () => {
    const settings = freshSettings()
    const next = applyToggle(
      settings,
      { kind: "global", target: "characters" },
      "dailyWrits",
      false
    )
    expect(next.global?.characters?.dailyWrits).toBe(false)
    expect(next.global?.characters?.equipment).toBe(true)
    expect(next.global?.companions).toEqual({ equipment: false })
    expect(next.characters).toEqual(settings.characters)
    expect(next.companions).toEqual(settings.companions)
  })

  it("global companions toggle: set true → updates global.companions slot", () => {
    const settings = freshSettings()
    const next = applyToggle(settings, { kind: "global", target: "companions" }, "skills", true)
    expect(next.global?.companions?.skills).toBe(true)
    expect(next.global?.companions?.equipment).toBe(false)
    expect(next.global?.characters).toEqual(settings.global?.characters)
  })

  it("character: scope: set adds per-character entry, sibling chars untouched", () => {
    const settings = freshSettings()
    const next = applyToggle(
      settings,
      { kind: "character", esoCharId: "@aawalton__char1" },
      "dailyWrits",
      true
    )
    expect(next.characters["@aawalton__char1"]).toEqual({ equipment: false, dailyWrits: true })
    expect(next.characters["@aawalton__char2"]).toEqual({ dailyWrits: true })
    expect(next.global).toEqual(settings.global)
  })

  it("character: scope on a previously-absent char: creates the entry shell", () => {
    const settings = freshSettings()
    const next = applyToggle(
      settings,
      { kind: "character", esoCharId: "@aawalton__newchar" },
      "equipment",
      true
    )
    expect(next.characters["@aawalton__newchar"]).toEqual({ equipment: true })
  })

  it("companion: scope: set adds per-companion entry", () => {
    const settings = freshSettings()
    const next = applyToggle(settings, { kind: "companion", companionId: "mirri" }, "skills", true)
    expect(next.companions.mirri).toEqual({ skills: true })
    expect(next.companions.bastian).toEqual({ equipment: true })
  })

  it("--value null on per-character entry: deletes the toggle (falls through to global)", () => {
    const settings = freshSettings()
    const next = applyToggle(
      settings,
      { kind: "character", esoCharId: "@aawalton__char1" },
      "equipment",
      null
    )
    expect(next.characters["@aawalton__char1"]).toEqual({})
    expect("equipment" in (next.characters["@aawalton__char1"] ?? {})).toBe(false)
  })

  it("--value null on global characters cohort: deletes the global default", () => {
    const settings = freshSettings()
    const next = applyToggle(settings, { kind: "global", target: "characters" }, "equipment", null)
    expect(next.global?.characters?.equipment).toBeUndefined()
    expect("equipment" in (next.global?.characters ?? {})).toBe(false)
    expect(next.global?.characters?.dailyWrits).toBe(false)
  })

  it("--value null on companion: scope: deletes the per-companion toggle", () => {
    const settings = freshSettings()
    const next = applyToggle(
      settings,
      { kind: "companion", companionId: "bastian" },
      "equipment",
      null
    )
    const bastian = next.companions.bastian
    expect(bastian).toBeDefined()
    expect("equipment" in (bastian ?? {})).toBe(false)
  })

  it("input settings object is structurally untouched (no mutation)", () => {
    const settings = freshSettings()
    const before = JSON.stringify(settings)
    applyToggle(settings, { kind: "character", esoCharId: "@aawalton__char1" }, "dailyWrits", true)
    expect(JSON.stringify(settings)).toBe(before)
  })

  it("global with no prior global slot at all: creates the slot", () => {
    const settings: AutomationSettings = { characters: {}, companions: {} }
    const next = applyToggle(settings, { kind: "global", target: "characters" }, "dailyWrits", true)
    expect(next.global?.characters?.dailyWrits).toBe(true)
  })
})
