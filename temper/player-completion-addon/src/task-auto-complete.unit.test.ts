import { afterAll, beforeEach, describe, expect, mock, test } from "bun:test"
import type { SavedCharacterEntry, SavedVariablesData, TaskData } from "./saved-variables"

const CURRENT_CHAR = "char-current"
const SIBLING_A = "char-sibling-a"
const SIBLING_B = "char-sibling-b"

const NOW_SEC = 1784000000

type GlobalsWithEsoStubs = typeof globalThis & {
  ZO_CreateStringId: (id: string, value: string) => undefined
  LuaSet: typeof Set
}

const g: GlobalsWithEsoStubs = Object.assign(globalThis, {
  ZO_CreateStringId: (_id: string, _value: string): undefined => undefined,
  LuaSet: Set,
  GetTimeStamp: (): number => NOW_SEC,
  GetCurrentCharacterId: (): string => CURRENT_CHAR,
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

mock.module("./saved-variables", () => ({
  savedVarsInstance: mockedSavedVariables,
  initializeSavedVariables: (): SavedVariablesData => mockedSavedVariables,
  migrateFromFlatStructure: (): undefined => undefined,
  migrateFromTemperSavedVars: (): undefined => undefined,
  getSavedVariables: (): SavedVariablesData => mockedSavedVariables,
  pruneDeletedCharacters: (): undefined => undefined,
}))

mock.module("./ui/task-hud", () => ({
  clearInitialCompletion: (): undefined => undefined,
  getRelevantSkillLineIds: (): number[] => [],
  getSkillMorphEnrichment: (): undefined => undefined,
  isCurrentCharacterNext: (): boolean => true,
  InitializeTaskHUD: (): undefined => undefined,
  RefreshTaskHUD: (): undefined => undefined,
}))

mock.module(
  "@temper/game-characters-skills-morphs-addon/ui/task-auto-complete-skill-morphs",
  () => ({
    isSkillMorphTaskComplete: (): boolean => false,
    countEnrichmentSlots: (): { equipped: number; available: number } => ({
      equipped: 0,
      available: 0,
    }),
  })
)

const { checkTaskAutoCompletion, resolveProgressForTask } = await import("./task-auto-complete")

function trainedCharacter(name: string): SavedCharacterEntry {
  return {
    name,
    mountTraining: {
      speed: 10,
      maxSpeed: 10,
      stamina: 10,
      maxStamina: 10,
      carryCapacity: 10,
      maxCarryCapacity: 10,
    },
  }
}

function unplayedCharacter(name: string): SavedCharacterEntry {
  return { name }
}

const TASK_ID = "task-mount-speed"

function mountSpeedTask(overrides: Partial<TaskData>): TaskData {
  return {
    title: "Train mount speed on every character",
    scope: "all_characters",
    sortOrder: 0,
    completionCardId: "mount-training",
    completionItemPath: ["speed"],
    ...overrides,
  }
}

function rosterWithUnmeasuredCurrentCharacter(): SavedVariablesData {
  const sv = makeEmptySavedVariables()
  sv.characters[CURRENT_CHAR] = unplayedCharacter("Current")
  sv.characters[SIBLING_A] = trainedCharacter("Sibling A")
  sv.characters[SIBLING_B] = trainedCharacter("Sibling B")
  return sv
}

let originalConfig: typeof globalThis.TemperCharactersConfig

beforeEach(() => {
  originalConfig = globalThis.TemperCharactersConfig
  mockedSavedVariables = rosterWithUnmeasuredCurrentCharacter()
  g.GetCurrentCharacterId = (): string => CURRENT_CHAR
})

afterAll(() => {
  globalThis.TemperCharactersConfig = originalConfig
  mockedSavedVariables = makeEmptySavedVariables()
})

function completionsAfterPass(task: TaskData): Record<string, number> {
  globalThis.TemperCharactersConfig = {
    version: 1,
    tasks: { [TASK_ID]: task },
    characterPriority: [],
  }
  checkTaskAutoCompletion()
  return mockedSavedVariables.completions
}

describe("all_characters progress is per-character, never a roster sum", () => {
  test("a character with no captured data is never reported complete", () => {
    const sv = rosterWithUnmeasuredCurrentCharacter()

    const progress = resolveProgressForTask(sv, mountSpeedTask({}))

    const readsComplete = progress !== undefined && progress.current >= progress.total
    expect(readsComplete).toBe(false)
  })

  test("the completion verdict matches the current character, not the account", () => {
    const sv = rosterWithUnmeasuredCurrentCharacter()
    sv.characters[CURRENT_CHAR] = trainedCharacter("Current")
    sv.characters[SIBLING_A] = unplayedCharacter("Sibling A")

    expect(resolveProgressForTask(sv, mountSpeedTask({}))).toEqual({ current: 10, total: 10 })
  })
})

describe("the same task completes on one definition of done", () => {
  test("an all_characters task agrees with and without an rrule", () => {
    const recurring = completionsAfterPass(mountSpeedTask({ rrule: "FREQ=DAILY" }))
    const recurringKeys = Object.keys(recurring).sort()

    mockedSavedVariables = rosterWithUnmeasuredCurrentCharacter()
    const oneShot = completionsAfterPass(mountSpeedTask({}))
    const oneShotKeys = Object.keys(oneShot).sort()

    expect(oneShotKeys).toEqual(recurringKeys)
  })
})
