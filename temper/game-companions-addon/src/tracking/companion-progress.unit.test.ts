import { afterEach, beforeEach, describe, expect, mock, test } from "bun:test"
import type { SavedVariablesData } from "../saved-variables"

declare global {
  var HasActiveCompanion: () => boolean
  var GetActiveCompanionDefId: () => number
  var GetCurrentCharacterId: () => number
  var TemperCharacters: {
    getSavedVariables: () => {
      characters: Record<number, { companionRapport?: Record<number, number> }>
    }
    scheduleTaskAutoCompletionCheck: () => void
  }
}

const ACTIVE_COMPANION_DEF_ID = 9
const CURRENT_CHARACTER_ID = 1
const RAPPORT_RAW_LEVEL_8 = 4000
const RAPPORT_RAW_WITHIN_TIER_5 = 1145

let mockSavedVars: SavedVariablesData
let charSavedVars: {
  characters: Record<number, { companionRapport?: Record<number, number> }>
}
let scheduleSpy: ReturnType<typeof mock>

function makeEmptySavedVariables(): SavedVariablesData {
  return { companions: {} }
}

const { handleCompanionRapportUpdate } = await import("./companion-progress")
const { _setSavedVarsInstanceForTesting } = await import("../saved-variables")

const originals = {
  HasActiveCompanion: globalThis.HasActiveCompanion,
  GetActiveCompanionDefId: globalThis.GetActiveCompanionDefId,
  GetCurrentCharacterId: globalThis.GetCurrentCharacterId,
  TemperCharacters: globalThis.TemperCharacters,
}

beforeEach(() => {
  mockSavedVars = makeEmptySavedVariables()
  _setSavedVarsInstanceForTesting(mockSavedVars)

  charSavedVars = { characters: { [CURRENT_CHARACTER_ID]: {} } }
  scheduleSpy = mock(() => {})

  globalThis.HasActiveCompanion = () => true
  globalThis.GetActiveCompanionDefId = () => ACTIVE_COMPANION_DEF_ID
  globalThis.GetCurrentCharacterId = () => CURRENT_CHARACTER_ID
  globalThis.TemperCharacters = {
    getSavedVariables: () => charSavedVars,
    scheduleTaskAutoCompletionCheck: () => scheduleSpy(),
  }
})

afterEach(() => {
  globalThis.HasActiveCompanion = originals.HasActiveCompanion
  globalThis.GetActiveCompanionDefId = originals.GetActiveCompanionDefId
  globalThis.GetCurrentCharacterId = originals.GetCurrentCharacterId
  globalThis.TemperCharacters = originals.TemperCharacters
  _setSavedVarsInstanceForTesting(undefined)
})

describe("handleCompanionRapportUpdate", () => {
  test("persists RAW rapport on both the companion entry and the character entry", () => {
    handleCompanionRapportUpdate(RAPPORT_RAW_LEVEL_8)

    expect(mockSavedVars.companions[ACTIVE_COMPANION_DEF_ID]?.rapport).toBe(4000)
    expect(charSavedVars.characters[CURRENT_CHARACTER_ID]?.companionRapport).toEqual({
      [ACTIVE_COMPANION_DEF_ID]: 4000,
    })
  })

  test("stores a within-tier raw value verbatim (regression guard for sub-tier gains)", () => {
    handleCompanionRapportUpdate(RAPPORT_RAW_WITHIN_TIER_5)

    expect(mockSavedVars.companions[ACTIVE_COMPANION_DEF_ID]?.rapport).toBe(1145)
    expect(charSavedVars.characters[CURRENT_CHARACTER_ID]?.companionRapport).toEqual({
      [ACTIVE_COMPANION_DEF_ID]: 1145,
    })
  })

  test("triggers the TemperCharacters auto-completion check (regression guard)", () => {
    handleCompanionRapportUpdate(RAPPORT_RAW_LEVEL_8)

    expect(scheduleSpy).toHaveBeenCalledTimes(1)
  })

  test("still fires the auto-completion check when no active companion (no-op rapport write)", () => {
    globalThis.HasActiveCompanion = () => false

    handleCompanionRapportUpdate(RAPPORT_RAW_LEVEL_8)

    expect(scheduleSpy).toHaveBeenCalledTimes(1)
  })
})
