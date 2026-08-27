import { describe, expect, test } from "bun:test"
import {
  coerceStoredBoolean,
  migrateHiddenToVisible,
  needsFrameMigration,
  VISIBILITY_SCHEMA_VERSION_BASELINE,
  VISIBILITY_SCHEMA_VERSION_CURRENT,
} from "./saved-variables-parse"

describe("coerceStoredBoolean", () => {
  test("a stored true passes through", () => {
    expect(coerceStoredBoolean(true)).toBe(true)
  })

  test("a stored false passes through (an explicit preference)", () => {
    expect(coerceStoredBoolean(false)).toBe(false)
  })

  test("nil / undefined means no stored preference", () => {
    expect(coerceStoredBoolean(undefined)).toBeUndefined()
  })

  test("non-boolean values collapse to undefined", () => {
    const nonBooleans: readonly unknown[] = [0, 1, "true", "false", "", {}, []]
    for (const value of nonBooleans) {
      expect(coerceStoredBoolean(value)).toBeUndefined()
    }
  })
})

describe("needsFrameMigration", () => {
  test("the current frame version skips migration", () => {
    expect(needsFrameMigration(VISIBILITY_SCHEMA_VERSION_CURRENT)).toBe(false)
  })

  test("a future version skips migration", () => {
    expect(needsFrameMigration(VISIBILITY_SCHEMA_VERSION_CURRENT + 1)).toBe(false)
  })

  test("the baseline (old On=hidden frame) needs migration", () => {
    expect(needsFrameMigration(VISIBILITY_SCHEMA_VERSION_BASELINE)).toBe(true)
  })

  test("absent version (pre-version install) needs migration", () => {
    expect(needsFrameMigration(undefined)).toBe(true)
  })

  test("a non-number hand-edit needs migration", () => {
    const garbage: readonly unknown[] = ["2", null, {}, []]
    for (const value of garbage) {
      expect(needsFrameMigration(value)).toBe(true)
    }
  })
})

describe("migrateHiddenToVisible", () => {
  const knownIds = ["reticle", "compass", "perf", "untoggled"]

  test("a stored hidden=true becomes visible=false (stays hidden)", () => {
    const migrated = migrateHiddenToVisible({ reticle: true }, knownIds)
    expect(migrated.reticle).toBe(false)
  })

  test("a stored hidden=false becomes visible=true (stays shown)", () => {
    const migrated = migrateHiddenToVisible({ compass: false }, knownIds)
    expect(migrated.compass).toBe(true)
  })

  test("a component with no stored preference is omitted (falls back to default)", () => {
    const migrated = migrateHiddenToVisible({ reticle: true }, knownIds)
    expect("untoggled" in migrated).toBe(false)
  })

  test("a fresh / empty stored map migrates to nothing (no-op)", () => {
    expect(migrateHiddenToVisible({}, knownIds)).toEqual({})
  })

  test("only known ids are visited; an unknown stored key is dropped", () => {
    const migrated = migrateHiddenToVisible({ reticle: true, "stale-id": true }, knownIds)
    expect("stale-id" in migrated).toBe(false)
    expect(migrated.reticle).toBe(false)
  })

  test("a non-boolean stored value is dropped (treated as no preference)", () => {
    const stored: Record<string, unknown> = { reticle: 1 }
    const migrated = migrateHiddenToVisible(stored, knownIds)
    expect("reticle" in migrated).toBe(false)
  })

  test("observable visibility is preserved across the frame upgrade", () => {
    const oldDefaultHidden = (id: string): boolean => id === "perf"
    const newDefaultVisible = (id: string): boolean => id !== "perf"

    const oldStoredHidden: Record<string, boolean> = {
      reticle: true,
      compass: false,
      perf: false,
    }

    const migrated = migrateHiddenToVisible(oldStoredHidden, knownIds)

    for (const id of knownIds) {
      const storedHidden = oldStoredHidden[id]
      const observableHiddenBefore =
        typeof storedHidden === "boolean" ? storedHidden : oldDefaultHidden(id)

      const migratedVisible = migrated[id]
      const observableVisibleAfter =
        typeof migratedVisible === "boolean" ? migratedVisible : newDefaultVisible(id)

      expect(observableVisibleAfter).toBe(!observableHiddenBefore)
    }
  })
})
