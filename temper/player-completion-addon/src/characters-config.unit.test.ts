import { afterAll, afterEach, beforeEach, describe, expect, mock, test } from "bun:test"
import type { CharactersConfigGlobal, SavedVariablesData, TaskData } from "./saved-variables"

let mockedSavedVariables: SavedVariablesData

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

mockedSavedVariables = makeEmptySavedVariables()

mock.module("./saved-variables", () => ({
  savedVarsInstance: mockedSavedVariables,
  initializeSavedVariables: (): SavedVariablesData => mockedSavedVariables,
  getSavedVariables: (): SavedVariablesData => mockedSavedVariables,
  migrateFromFlatStructure: (): undefined => undefined,
  migrateFromTemperSavedVars: (): undefined => undefined,
  pruneDeletedCharacters: (): undefined => undefined,
  getOrderedCharacterIds: (): string[] => [],
}))

const { getCharactersConfig, getCompletionOverridesForCharacter } = await import(
  "./characters-config"
)

let originalConfig: CharactersConfigGlobal | undefined

beforeEach(() => {
  originalConfig = globalThis.TemperCharactersConfig
  mockedSavedVariables = makeEmptySavedVariables()
})

afterEach(() => {
  globalThis.TemperCharactersConfig = originalConfig
})

afterAll(() => {
  mockedSavedVariables = makeEmptySavedVariables()
})

const SV_TASKS: Record<string, TaskData> = {
  "task-a": {
    title: "SV Task A",
    scope: "account",
    sortOrder: 0,
  },
}
const SV_PRIORITY = ["char-1", "char-2"]

function populateSavedVariables(): undefined {
  mockedSavedVariables = asSavedVariablesData({
    ...mockedSavedVariables,
    tasks: SV_TASKS,
    characterPriority: SV_PRIORITY,
  })
}

describe("getCharactersConfig", () => {
  test("returns SavedVariables values when TemperCharactersConfig is absent", () => {
    populateSavedVariables()
    globalThis.TemperCharactersConfig = undefined

    const cfg = getCharactersConfig()
    expect(cfg.tasks).toBe(SV_TASKS)
    expect(cfg.characterPriority).toBe(SV_PRIORITY)
  })

  test("falls back to SavedVariables when version is 0 (placeholder)", () => {
    populateSavedVariables()
    globalThis.TemperCharactersConfig = {
      version: 0,
      tasks: { "task-side": { title: "Side", scope: "account", sortOrder: 0 } },
      characterPriority: ["char-side"],
    }

    const cfg = getCharactersConfig()
    expect(cfg.tasks).toBe(SV_TASKS)
    expect(cfg.characterPriority).toBe(SV_PRIORITY)
  })

  test("prefers side-file values when version > 0 and key is present", () => {
    populateSavedVariables()
    const sideTasks: Record<string, TaskData> = {
      "task-side": { title: "Side", scope: "account", sortOrder: 0 },
    }
    const sidePriority = ["char-side"]
    globalThis.TemperCharactersConfig = {
      version: 1,
      tasks: sideTasks,
      characterPriority: sidePriority,
    }

    const cfg = getCharactersConfig()
    expect(cfg.tasks).toBe(sideTasks)
    expect(cfg.characterPriority).toBe(sidePriority)
  })

  test("falls back to SavedVariables for keys absent from the side-file", () => {
    populateSavedVariables()
    const sideTasks: Record<string, TaskData> = {
      "task-side": { title: "Side", scope: "account", sortOrder: 0 },
    }
    globalThis.TemperCharactersConfig = {
      version: 1,
      tasks: sideTasks,
    }

    const cfg = getCharactersConfig()
    expect(cfg.tasks).toBe(sideTasks)
    expect(cfg.characterPriority).toBe(SV_PRIORITY)
  })

  test("ignores non-object TemperCharactersConfig (defensive narrowing)", () => {
    populateSavedVariables()
    Reflect.set(globalThis, "TemperCharactersConfig", "not-an-object")

    const cfg = getCharactersConfig()
    expect(cfg.tasks).toBe(SV_TASKS)
    expect(cfg.characterPriority).toBe(SV_PRIORITY)
  })

  test("treats negative version as absent (defensive narrowing)", () => {
    populateSavedVariables()
    globalThis.TemperCharactersConfig = {
      version: -1,
      tasks: { "task-side": { title: "Side", scope: "account", sortOrder: 0 } },
      characterPriority: ["char-side"],
    }

    const cfg = getCharactersConfig()
    expect(cfg.tasks).toBe(SV_TASKS)
    expect(cfg.characterPriority).toBe(SV_PRIORITY)
  })

  test("exposes the side-file completionOverrides record when present", () => {
    populateSavedVariables()
    globalThis.TemperCharactersConfig = {
      version: 1,
      completionOverrides: {
        "1234567890123456": [
          {
            completionCardId: "skill-points",
            completionItemPath: ["general", "foliumDiscognitum"],
            floor: 1,
          },
        ],
      },
    }

    const cfg = getCharactersConfig()
    expect(cfg.completionOverrides["1234567890123456"]?.length).toBe(1)
  })

  test("completionOverrides defaults to {} when neither source carries it", () => {
    populateSavedVariables()
    globalThis.TemperCharactersConfig = undefined

    const cfg = getCharactersConfig()
    expect(cfg.completionOverrides).toEqual({})
  })
})

describe("getCompletionOverridesForCharacter", () => {
  test("returns the character's override rows from the side-file", () => {
    globalThis.TemperCharactersConfig = {
      version: 1,
      completionOverrides: {
        "1234567890123456": [
          {
            completionCardId: "skill-points",
            completionItemPath: ["general", "foliumDiscognitum"],
            floor: 1,
          },
        ],
      },
    }

    const rows = getCompletionOverridesForCharacter("1234567890123456")
    expect(rows.length).toBe(1)
    expect(rows[0]?.floor).toBe(1)
  })

  test("returns [] for a character with no overrides", () => {
    globalThis.TemperCharactersConfig = { version: 1, completionOverrides: {} }
    expect(getCompletionOverridesForCharacter("9999")).toEqual([])
  })
})
