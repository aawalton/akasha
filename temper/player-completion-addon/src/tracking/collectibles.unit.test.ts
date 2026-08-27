import { beforeEach, describe, expect, mock, test } from "bun:test"
import type { SavedVariablesData } from "../saved-variables"

type GlobalsWithEsoStubs = typeof globalThis & {
  IsCollectibleUnlocked: (id: number) => boolean
}
const g: GlobalsWithEsoStubs = Object.assign(globalThis, {
  IsCollectibleUnlocked: (_id: number): boolean => true,
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

let mockedSavedVariables: SavedVariablesData = makeEmptySavedVariables()

mock.module("../saved-variables", () => ({
  savedVarsInstance: mockedSavedVariables,
  initializeSavedVariables: (): SavedVariablesData => mockedSavedVariables,
  migrateFromFlatStructure: (): undefined => undefined,
  migrateFromTemperSavedVars: (): undefined => undefined,
  getSavedVariables: (): SavedVariablesData => mockedSavedVariables,
  pruneDeletedCharacters: (): undefined => undefined,
}))

const { updateCollectible } = await import("./collectibles")

beforeEach(() => {
  mockedSavedVariables = makeEmptySavedVariables()
  g.IsCollectibleUnlocked = (_id: number): boolean => true
})

describe("updateCollectible", () => {
  test("initializes and appends when undefined + unlocked + absent", () => {
    updateCollectible(7)
    expect(mockedSavedVariables.account.collectibles).toEqual([7])
  })

  test("appends to an existing list", () => {
    mockedSavedVariables.account.collectibles = [5]
    updateCollectible(7)
    expect(mockedSavedVariables.account.collectibles).toEqual([5, 7])
  })

  test("does not duplicate an already-present id", () => {
    mockedSavedVariables.account.collectibles = [7]
    updateCollectible(7)
    expect(mockedSavedVariables.account.collectibles).toEqual([7])
  })

  test("does not append a locked collectible", () => {
    mockedSavedVariables.account.collectibles = [5]
    g.IsCollectibleUnlocked = (_id: number): boolean => false
    updateCollectible(7)
    expect(mockedSavedVariables.account.collectibles).toEqual([5])
  })
})
