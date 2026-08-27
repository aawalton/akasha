import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import type {
  CompanionsConfigGlobal,
  SavedCompanionEntry,
  SavedVariablesData,
} from "./saved-variables"

declare global {
  var tonumber: (value: unknown) => number | undefined
}
if (typeof globalThis.tonumber !== "function") {
  globalThis.tonumber = (value: unknown): number | undefined => {
    if (typeof value === "number") return Number.isFinite(value) ? value : undefined
    if (typeof value === "string") {
      const n = Number(value)
      return Number.isFinite(n) ? n : undefined
    }
    return undefined
  }
}

let mockSavedVars: SavedVariablesData

function makeEmptySavedVariables(): SavedVariablesData {
  return {
    companions: {},
  }
}

function asSavedCompanionEntry(value: unknown): SavedCompanionEntry {
  return value as SavedCompanionEntry
}

mockSavedVars = makeEmptySavedVariables()

const { restoreTargetBuildsFromSync, _setSavedVarsInstanceForTesting } = await import(
  "./saved-variables"
)

let originalConfig: CompanionsConfigGlobal | undefined

beforeEach(() => {
  originalConfig = globalThis.TemperCompanionsConfig
  mockSavedVars = makeEmptySavedVariables()
  _setSavedVarsInstanceForTesting(mockSavedVars)
})

afterEach(() => {
  globalThis.TemperCompanionsConfig = originalConfig
  _setSavedVarsInstanceForTesting(undefined)
})

const SV_BUILDS = { 1: "sv-hash-1", 8: "sv-hash-8" } as const
const SV_TIMESTAMPS = { 1: 1700000000, 8: 1700000008 } as const
const SIDE_BUILDS = { 1: "side-hash-1", 3: "side-hash-3" } as const
const SIDE_TIMESTAMPS = { 1: 1800000000, 3: 1800000003 } as const

function populateSavedVariables(): undefined {
  mockSavedVars.companionTargetBuilds = { ...SV_BUILDS }
  mockSavedVars.companionTargetTimestamps = { ...SV_TIMESTAMPS }
}

describe("restoreTargetBuildsFromSync", () => {
  test("reads SavedVariables when TemperCompanionsConfig is absent", () => {
    populateSavedVariables()
    globalThis.TemperCompanionsConfig = undefined

    restoreTargetBuildsFromSync()

    expect(asSavedCompanionEntry(mockSavedVars.companions[1]).targetBuildHash).toBe("sv-hash-1")
    expect(asSavedCompanionEntry(mockSavedVars.companions[8]).targetBuildHash).toBe("sv-hash-8")
  })

  test("falls back to SavedVariables when version is 0 (placeholder)", () => {
    populateSavedVariables()
    globalThis.TemperCompanionsConfig = {
      version: 0,
      companionTargetBuilds: SIDE_BUILDS,
    }

    restoreTargetBuildsFromSync()

    expect(asSavedCompanionEntry(mockSavedVars.companions[1]).targetBuildHash).toBe("sv-hash-1")
    expect(asSavedCompanionEntry(mockSavedVars.companions[8]).targetBuildHash).toBe("sv-hash-8")
    expect(mockSavedVars.companions[3]).toBeUndefined()
  })

  test("prefers side-file when version > 0 and companionTargetBuilds is present", () => {
    populateSavedVariables()
    globalThis.TemperCompanionsConfig = {
      version: 1,
      companionTargetBuilds: SIDE_BUILDS,
      companionTargetTimestamps: SIDE_TIMESTAMPS,
    }

    restoreTargetBuildsFromSync()

    expect(asSavedCompanionEntry(mockSavedVars.companions[1]).targetBuildHash).toBe("side-hash-1")
    expect(asSavedCompanionEntry(mockSavedVars.companions[3]).targetBuildHash).toBe("side-hash-3")
    expect(mockSavedVars.companions[8]).toBeUndefined()
  })

  test("falls back to SavedVariables when side-file omits companionTargetBuilds", () => {
    populateSavedVariables()
    globalThis.TemperCompanionsConfig = {
      version: 1,
    }

    restoreTargetBuildsFromSync()

    expect(asSavedCompanionEntry(mockSavedVars.companions[1]).targetBuildHash).toBe("sv-hash-1")
    expect(asSavedCompanionEntry(mockSavedVars.companions[8]).targetBuildHash).toBe("sv-hash-8")
  })

  test("no-op when both sides are absent", () => {
    globalThis.TemperCompanionsConfig = undefined

    restoreTargetBuildsFromSync()

    expect(Object.keys(mockSavedVars.companions).length).toBe(0)
  })

  test("ignores non-object TemperCompanionsConfig (defensive narrowing)", () => {
    populateSavedVariables()
    Reflect.set(globalThis, "TemperCompanionsConfig", "not-an-object")

    restoreTargetBuildsFromSync()

    expect(asSavedCompanionEntry(mockSavedVars.companions[1]).targetBuildHash).toBe("sv-hash-1")
    expect(asSavedCompanionEntry(mockSavedVars.companions[8]).targetBuildHash).toBe("sv-hash-8")
  })

  test("treats negative version as absent (defensive narrowing)", () => {
    populateSavedVariables()
    globalThis.TemperCompanionsConfig = {
      version: -1,
      companionTargetBuilds: SIDE_BUILDS,
    }

    restoreTargetBuildsFromSync()

    expect(asSavedCompanionEntry(mockSavedVars.companions[1]).targetBuildHash).toBe("sv-hash-1")
    expect(asSavedCompanionEntry(mockSavedVars.companions[8]).targetBuildHash).toBe("sv-hash-8")
  })

  test("skips empty-string and undefined hashes in side-file map", () => {
    globalThis.TemperCompanionsConfig = {
      version: 1,
      companionTargetBuilds: { 1: "good-hash", 2: "" },
    }

    restoreTargetBuildsFromSync()

    expect(asSavedCompanionEntry(mockSavedVars.companions[1]).targetBuildHash).toBe("good-hash")
    expect(mockSavedVars.companions[2]).toBeUndefined()
  })
})
