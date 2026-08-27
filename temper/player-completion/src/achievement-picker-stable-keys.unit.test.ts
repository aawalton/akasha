import { describe, expect, test } from "bun:test"
import type { CharacterCompletion } from "@temper/game-completion/completion-types"
import { ACCOUNT_COMPLETION_CARD_CHECKERS } from "./account-checkers"
import { CHARACTER_PROGRESSION_CHECKERS } from "./character-progression-checkers"

const EMPTY_CHARACTER_COMPLETION: CharacterCompletion = {}

describe("achievement-card picker emits stable identifiers", () => {
  test("account-achievements depth 0 options use string `value` (category name)", () => {
    const checker = ACCOUNT_COMPLETION_CARD_CHECKERS["account-achievements"]
    if (!checker?.getItemPickerLevels) throw new Error("missing checker")
    const level = checker.getItemPickerLevels([])
    if (level === null) throw new Error("expected non-null level")
    expect(level.options.length).toBeGreaterThan(0)
    for (const option of level.options) {
      expect(typeof option.value).toBe("string")
    }
  })

  test("account-achievements depth 1 options use string `value` (subcategory name)", () => {
    const checker = ACCOUNT_COMPLETION_CARD_CHECKERS["account-achievements"]
    if (!checker?.getItemPickerLevels) throw new Error("missing checker")
    const depth0 = checker.getItemPickerLevels([])
    if (depth0 === null || depth0.options[0] === undefined) throw new Error("missing depth 0")
    const firstCatValue = depth0.options[0].value
    const depth1 = checker.getItemPickerLevels([firstCatValue])
    if (depth1 === null) throw new Error("expected non-null depth 1")
    expect(depth1.options.length).toBeGreaterThan(0)
    for (const option of depth1.options) {
      expect(typeof option.value).toBe("string")
    }
  })

  test("account-achievements depth 2 leaf options use number `value` (achievementId)", () => {
    const checker = ACCOUNT_COMPLETION_CARD_CHECKERS["account-achievements"]
    if (!checker?.getItemPickerLevels) throw new Error("missing checker")
    const depth0 = checker.getItemPickerLevels([])
    if (depth0 === null || depth0.options[0] === undefined) throw new Error("missing depth 0")
    const catValue = depth0.options[0].value
    const depth1 = checker.getItemPickerLevels([catValue])
    if (depth1 === null || depth1.options[0] === undefined) throw new Error("missing depth 1")
    const subValue = depth1.options[0].value
    const depth2 = checker.getItemPickerLevels([catValue, subValue])
    if (depth2 === null) throw new Error("expected non-null depth 2")
    expect(depth2.options.length).toBeGreaterThan(0)
    for (const option of depth2.options) {
      expect(typeof option.value).toBe("number")
    }
  })

  test("character-achievements depth 0 options use string `value` (category name)", () => {
    const checker = CHARACTER_PROGRESSION_CHECKERS["character-achievements"]
    if (!checker?.getItemPickerLevels) throw new Error("missing checker")
    const level = checker.getItemPickerLevels([EMPTY_CHARACTER_COMPLETION], [])
    if (level === null) throw new Error("expected non-null level")
    expect(level.options.length).toBeGreaterThan(0)
    for (const option of level.options) {
      expect(typeof option.value).toBe("string")
    }
  })

  test("character-achievements depth 1 options use string `value` (subcategory name)", () => {
    const checker = CHARACTER_PROGRESSION_CHECKERS["character-achievements"]
    if (!checker?.getItemPickerLevels) throw new Error("missing checker")
    const depth0 = checker.getItemPickerLevels([EMPTY_CHARACTER_COMPLETION], [])
    if (depth0 === null || depth0.options[0] === undefined) throw new Error("missing depth 0")
    const firstCatValue = depth0.options[0].value
    const depth1 = checker.getItemPickerLevels([EMPTY_CHARACTER_COMPLETION], [firstCatValue])
    if (depth1 === null) throw new Error("expected non-null depth 1")
    expect(depth1.options.length).toBeGreaterThan(0)
    for (const option of depth1.options) {
      expect(typeof option.value).toBe("string")
    }
  })

  test("character-achievements depth 2 leaf options use number `value` (achievementId)", () => {
    const checker = CHARACTER_PROGRESSION_CHECKERS["character-achievements"]
    if (!checker?.getItemPickerLevels) throw new Error("missing checker")
    const depth0 = checker.getItemPickerLevels([EMPTY_CHARACTER_COMPLETION], [])
    if (depth0 === null || depth0.options[0] === undefined) throw new Error("missing depth 0")
    const catValue = depth0.options[0].value
    const depth1 = checker.getItemPickerLevels([EMPTY_CHARACTER_COMPLETION], [catValue])
    if (depth1 === null || depth1.options[0] === undefined) throw new Error("missing depth 1")
    const subValue = depth1.options[0].value
    const depth2 = checker.getItemPickerLevels([EMPTY_CHARACTER_COMPLETION], [catValue, subValue])
    if (depth2 === null) throw new Error("expected non-null depth 2")
    expect(depth2.options.length).toBeGreaterThan(0)
    for (const option of depth2.options) {
      expect(typeof option.value).toBe("number")
    }
  })
})
