import { describe, expect, test } from "bun:test"
import { decidePlanEmptyState } from "./characters-plan-empty-state.module.code.ts"

describe("decidePlanEmptyState", () => {
  test("an unconfirmed zero is never the no-characters claim", () => {
    expect(
      decidePlanEmptyState({ charactersUnconfirmed: true, importedCharacterCount: 0 })
    ).toEqual({ kind: "unconfirmed" })
  })

  test("a measured zero is the no-characters claim", () => {
    expect(
      decidePlanEmptyState({ charactersUnconfirmed: false, importedCharacterCount: 0 })
    ).toEqual({ kind: "no-characters" })
  })

  test("a positive count outranks unconfirmed — it was measured, so it is trusted", () => {
    expect(
      decidePlanEmptyState({ charactersUnconfirmed: true, importedCharacterCount: 20 })
    ).toEqual({ kind: "no-builds", importedCharacterCount: 20 })
  })

  test("a confirmed positive count is the no-builds claim", () => {
    expect(
      decidePlanEmptyState({ charactersUnconfirmed: false, importedCharacterCount: 3 })
    ).toEqual({ kind: "no-builds", importedCharacterCount: 3 })
  })

  test("the regression that filed the row: 20 characters must never decide no-characters", () => {
    for (const charactersUnconfirmed of [true, false]) {
      const state = decidePlanEmptyState({ charactersUnconfirmed, importedCharacterCount: 20 })
      expect(state.kind).not.toBe("no-characters")
    }
  })
})
