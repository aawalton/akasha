import { describe, expect, test } from "bun:test"
import type { CharacterCompletion } from "@temper/game-completion/completion-types"
import { classifyCompletionImport } from "./completion-import-outcome"
import { mergeCharacterCompletionForward } from "./completion-merge-forward"

function verdictFor(
  existing: CharacterCompletion | undefined,
  incoming: CharacterCompletion | undefined
) {
  return classifyCompletionImport(
    existing,
    incoming,
    mergeCharacterCompletionForward(existing, incoming)
  )
}

function classifyCharacter(
  existing: CharacterCompletion | undefined,
  incoming: CharacterCompletion | undefined
) {
  return classifyCompletionImport(
    existing,
    incoming,
    mergeCharacterCompletionForward(existing, incoming)
  ).outcome
}

describe("classifyCompletionImport", () => {
  test("created — nothing stored yet", () => {
    expect(classifyCharacter(undefined, { level: 10 })).toBe("created")
  })

  test("updated — incoming advances stored completion", () => {
    expect(classifyCharacter({ level: 10 }, { level: 20 })).toBe("updated")
  })

  test("unchanged — incoming is identical to stored", () => {
    expect(
      classifyCharacter({ level: 20, quests: [1, 2, 3] }, { level: 20, quests: [1, 2, 3] })
    ).toBe("unchanged")
  })

  test("unchanged — incoming reorders a quest array but adds nothing", () => {
    expect(classifyCharacter({ quests: [1, 2, 3] }, { quests: [3, 1, 2] })).toBe("unchanged")
  })

  test("preserved — incoming would have dropped a quest list entirely", () => {
    expect(classifyCharacter({ level: 50, quests: [1, 2, 3] }, { level: 50 })).toBe("preserved")
  })

  test("preserved — incoming regresses a monotonic scalar", () => {
    expect(classifyCharacter({ level: 50 }, { level: 3 })).toBe("preserved")
  })

  test("preserved — incoming is a wholesale wipe", () => {
    expect(classifyCharacter({ level: 50, quests: [1, 2, 3] }, {})).toBe("preserved")
  })

  test("preserved wins over updated when incoming both adds and drops", () => {
    expect(classifyCharacter({ level: 50, quests: [1, 2] }, { level: 60 })).toBe("preserved")
  })

  test("a legitimate last-write-wins change is not a regression", () => {
    expect(classifyCharacter({ gender: 1, level: 50 }, { gender: 0, level: 50 })).toBe("updated")
  })

  test("unchanged — no incoming data at all is a no-op, not a loss", () => {
    expect(classifyCharacter({ level: 50 }, undefined)).toBe("unchanged")
  })
})

describe("classifyCompletionImport preservedFields", () => {
  test("names the field the merge held back, not merely that it fired", () => {
    const verdict = verdictFor({ level: 50, quests: [1, 2, 3] }, { level: 50 })
    expect(verdict.outcome).toBe("preserved")
    expect(verdict.preservedFields).toEqual(["quests"])
  })

  test("names every held-back field", () => {
    const verdict = verdictFor({ level: 50, quests: [1], bagSize: 140 }, { level: 50 })
    expect(verdict.preservedFields).toEqual(["bagSize", "quests"])
  })

  test("reports no held-back fields when nothing was held back", () => {
    expect(verdictFor({ level: 10 }, { level: 20 }).preservedFields).toEqual([])
    expect(verdictFor({ level: 20 }, { level: 20 }).preservedFields).toEqual([])
  })
})
