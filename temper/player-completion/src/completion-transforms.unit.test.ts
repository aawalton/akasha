import { describe, expect, test } from "bun:test"
import type { CharacterCompletion } from "@temper/game-completion/completion-types"
import type { CompletionCharacterRow } from "./completion-character-row-type"
import { transformCompletionCharacters } from "./completion-transforms"

const ROSTER_IDENTITY: CharacterCompletion = {
  gender: 1,
  level: 27,
  classId: 3,
  allianceId: 2,
  raceId: 5,
  className: "Sorcerer",
  classIcon: "/esoui/art/class/sorcerer.dds",
}

const MAX_CHARACTER_LEVEL = 50
const MAX_PACK_UPGRADES = 8

function row(id: string, completion: CharacterCompletion | null): CompletionCharacterRow {
  return {
    id,
    userId: "user-1",
    esoCharacterId: `eso-${id}`,
    title: id,
    completion,
    createdAt: 0,
    updatedAt: 0,
    roles: [],
  }
}

describe("transformCompletionCharacters — unmeasured characters are dropped", () => {
  test("a roster-identity-only character is excluded from every returned array", () => {
    const result = transformCompletionCharacters([row("never-played", ROSTER_IDENTITY)])

    expect(result.characters).toEqual([])
    expect(result.progress).toEqual([])
    expect(result.morphProgress).toEqual([])
    expect(result.recipeProgress).toEqual([])
    expect(result.scribingProgress).toEqual([])
    expect(result.traitResearchProgress).toEqual([])
    expect(result.mountTrainingProgress).toEqual([])
    expect(result.packUpgradesProgress).toEqual([])
  })

  test("a null completion is still excluded", () => {
    const result = transformCompletionCharacters([row("no-blob", null)])
    expect(result.characters).toEqual([])
    expect(result.mountTrainingProgress).toEqual([])
    expect(result.packUpgradesProgress).toEqual([])
  })

  test("an EMPTY deferred value counts as measured and carries the full static denominator", () => {
    const result = transformCompletionCharacters([
      row("played", { ...ROSTER_IDENTITY, quests: [] }),
    ])

    expect(result.characters).toHaveLength(1)
    expect(result.characters[0]?.level).toBe(27)
    expect(result.characters[0]?.maxLevel).toBe(MAX_CHARACTER_LEVEL)

    expect(result.mountTrainingProgress).toHaveLength(1)
    expect(result.mountTrainingProgress[0]?.maxSpeed).toBe(60)
    expect(result.mountTrainingProgress[0]?.maxStamina).toBe(60)
    expect(result.mountTrainingProgress[0]?.maxCarryCapacity).toBe(60)

    expect(result.packUpgradesProgress).toHaveLength(1)
    expect(result.packUpgradesProgress[0]?.maxPackUpgrades).toBe(MAX_PACK_UPGRADES)

    expect(result.recipeProgress).toHaveLength(1)
    expect(result.recipeProgress[0]?.entries.length).toBeGreaterThan(0)
    expect(result.scribingProgress).toHaveLength(1)
    expect(result.scribingProgress[0]?.grimoires.length).toBeGreaterThan(0)

    expect(result.progress).toHaveLength(1)
    expect(result.progress[0]?.entries).toEqual([])
  })
})

describe("transformCompletionCharacters — roster vs measured counts", () => {
  test("rosterSize counts every row; measuredCharacterCount counts only measured rows", () => {
    const result = transformCompletionCharacters([
      row("played", { ...ROSTER_IDENTITY, quests: [] }),
      row("never-played", ROSTER_IDENTITY),
    ])

    expect(result.rosterSize).toBe(2)
    expect(result.measuredCharacterCount).toBe(1)
  })

  test("a mixed roster of 2 measured + 2 identity-only yields 4 / 2", () => {
    const result = transformCompletionCharacters([
      row("played-a", { ...ROSTER_IDENTITY, quests: [] }),
      row("never-played-a", ROSTER_IDENTITY),
      row("played-b", { ...ROSTER_IDENTITY, traitResearch: {} }),
      row("never-played-b", ROSTER_IDENTITY),
    ])

    expect(result.rosterSize).toBe(4)
    expect(result.measuredCharacterCount).toBe(2)
    expect(result.characters.map((c) => c.id)).toEqual(["played-a", "played-b"])
  })

  test("an empty roster reports zero for both", () => {
    const result = transformCompletionCharacters([])
    expect(result.rosterSize).toBe(0)
    expect(result.measuredCharacterCount).toBe(0)
  })
})

describe("transformCompletionCharacters — no fabricated level", () => {
  test("a measured character with no level contributes neither numerator nor denominator", () => {
    const result = transformCompletionCharacters([row("no-level", { quests: [] })])
    const character = result.characters[0]

    expect(result.characters).toHaveLength(1)
    expect(character?.level ?? 0).toBe(0)
    expect(character?.maxLevel ?? 0).toBe(0)
  })

  test("a measured character with a level keeps the real static denominator", () => {
    const result = transformCompletionCharacters([row("lvl-9", { level: 9, quests: [] })])
    expect(result.characters[0]?.level).toBe(9)
    expect(result.characters[0]?.maxLevel).toBe(MAX_CHARACTER_LEVEL)
  })
})
