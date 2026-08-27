import { beforeEach, describe, expect, mock, test } from "bun:test"
import type { SavedCharacterEntry, SavedVariablesData } from "../saved-variables"

const CHAR_ID = "char-1"

type GlobalsWithEsoStubs = typeof globalThis & {
  GetCurrentCharacterId: () => string
}
const g: GlobalsWithEsoStubs = Object.assign(globalThis, {
  GetCurrentCharacterId: (): string => CHAR_ID,
})

function asSavedVariablesData(value: unknown): SavedVariablesData {
  return value as SavedVariablesData
}

function makeEmptySavedVariables(): SavedVariablesData {
  return asSavedVariablesData({
    navigation: { selectedTab: "character", selectedSubTab: "character-character" },
    account: { achievements: {} },
    characters: {},
    tasks: {},
    completions: {},
    taskProgressSnapshots: {},
    characterPriority: [],
    taskPanelPosition: undefined,
    migrationVersions: {},
  })
}

function putCharacter(sv: SavedVariablesData, entry: SavedCharacterEntry): undefined {
  sv.characters[CHAR_ID] = entry
}

let mockedSavedVariables: SavedVariablesData = makeEmptySavedVariables()

mock.module("../saved-variables", () => ({
  savedVarsInstance: mockedSavedVariables,
  initializeSavedVariables: (): SavedVariablesData => mockedSavedVariables,
  migrateFromFlatStructure: (): undefined => undefined,
  migrateFromTemperSavedVars: (): undefined => undefined,
  getSavedVariables: (): SavedVariablesData => mockedSavedVariables,
  pruneDeletedCharacters: (): undefined => undefined,
}))

const { updateQuest } = await import("./quests")

beforeEach(() => {
  mockedSavedVariables = makeEmptySavedVariables()
  g.GetCurrentCharacterId = (): string => CHAR_ID
})

describe("updateQuest", () => {
  test("no-op when the current character has no entry", () => {
    updateQuest(42)
    expect(mockedSavedVariables.characters[CHAR_ID]).toBeUndefined()
  })

  test("initializes and appends when quests is undefined", () => {
    putCharacter(mockedSavedVariables, { name: "Test" })
    updateQuest(42)
    expect(mockedSavedVariables.characters[CHAR_ID]?.quests).toEqual([42])
  })

  test("appends to an existing list", () => {
    putCharacter(mockedSavedVariables, { name: "Test", quests: [1] })
    updateQuest(2)
    expect(mockedSavedVariables.characters[CHAR_ID]?.quests).toEqual([1, 2])
  })

  test("does not duplicate an already-present id", () => {
    putCharacter(mockedSavedVariables, { name: "Test", quests: [2] })
    updateQuest(2)
    expect(mockedSavedVariables.characters[CHAR_ID]?.quests).toEqual([2])
  })
})
