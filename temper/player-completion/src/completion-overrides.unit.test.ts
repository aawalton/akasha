import { describe, expect, test } from "bun:test"
import type {
  CharacterCompletion,
  SkillPointProgress,
} from "@temper/game-completion/completion-types"
import { applyCompletionOverrides, type CompletionOverride } from "./completion-overrides"

function emptySkillPoints(): SkillPointProgress {
  return {
    total: 0,
    unassigned: 0,
    level: 0,
    mainQuests: 0,
    tutorial: 0,
    foliumDiscognitum: 0,
    pvpRank: 0,
    maelstromArena: 0,
    endlessArchive: 0,
    skyshardPoints: 0,
    totalSkyshards: 0,
    zoneQuestTotal: 0,
    groupDungeonTotal: 0,
    publicDungeonTotal: 0,
    skyshards: {},
    zoneQuests: {},
    groupDungeons: {},
    publicDungeons: {},
  }
}

function override(
  itemPath: readonly (string | number)[],
  floor: number,
  cardId: CompletionOverride["completionCardId"] = "skill-points"
): CompletionOverride {
  return { completionCardId: cardId, completionItemPath: itemPath, floor }
}

describe("applyCompletionOverrides — skill-points general branch", () => {
  test("floors foliumDiscognitum 0 → 2 (the Erin Solstice case)", () => {
    const completion: CharacterCompletion = { skillPoints: emptySkillPoints() }
    const result = applyCompletionOverrides(completion, [
      override(["general", "foliumDiscognitum"], 2),
    ])
    expect(result.skillPoints?.foliumDiscognitum).toBe(2)
  })

  test("does not lower a value already above the floor (floor only raises)", () => {
    const sp = emptySkillPoints()
    sp.level = 50
    const completion: CharacterCompletion = { skillPoints: sp }
    const result = applyCompletionOverrides(completion, [override(["general", "level"], 10)])
    expect(result.skillPoints?.level).toBe(50)
  })

  test("clamps the floor to the source's static max", () => {
    const completion: CharacterCompletion = { skillPoints: emptySkillPoints() }
    const result = applyCompletionOverrides(completion, [
      override(["general", "foliumDiscognitum"], 99),
    ])
    expect(result.skillPoints?.foliumDiscognitum).toBe(2)
  })

  test("is idempotent — applying twice equals applying once", () => {
    const completion: CharacterCompletion = { skillPoints: emptySkillPoints() }
    const once = applyCompletionOverrides(completion, [
      override(["general", "foliumDiscognitum"], 2),
    ])
    const twice = applyCompletionOverrides(once, [override(["general", "foliumDiscognitum"], 2)])
    expect(twice).toEqual(once)
  })

  test("returns the input reference unchanged when the override is a no-op", () => {
    const sp = emptySkillPoints()
    sp.foliumDiscognitum = 2
    const completion: CharacterCompletion = { skillPoints: sp }
    const result = applyCompletionOverrides(completion, [
      override(["general", "foliumDiscognitum"], 2),
    ])
    expect(result).toBe(completion)
  })

  test("does not mutate the input blob", () => {
    const completion: CharacterCompletion = { skillPoints: emptySkillPoints() }
    applyCompletionOverrides(completion, [override(["general", "foliumDiscognitum"], 2)])
    expect(completion.skillPoints?.foliumDiscognitum).toBe(0)
  })

  test("synthesizes skillPoints when the blob has none", () => {
    const completion: CharacterCompletion = {}
    const result = applyCompletionOverrides(completion, [
      override(["general", "foliumDiscognitum"], 2),
    ])
    expect(result.skillPoints?.foliumDiscognitum).toBe(2)
  })

  test("ignores an unknown general key", () => {
    const completion: CharacterCompletion = { skillPoints: emptySkillPoints() }
    const result = applyCompletionOverrides(completion, [override(["general", "notAThing"], 5)])
    expect(result).toBe(completion)
  })
})

describe("applyCompletionOverrides — skill-points nested branches", () => {
  test("floors a skyshards zone entry, clamped to maxSkyshards", () => {
    const completion: CharacterCompletion = { skillPoints: emptySkillPoints() }
    const result = applyCompletionOverrides(completion, [override(["skyshards", "AD1"], 99)])
    expect(result.skillPoints?.skyshards.AD1).toBe(16)
  })

  test("floors a zoneQuests entry, clamped to maxQuests", () => {
    const completion: CharacterCompletion = { skillPoints: emptySkillPoints() }
    const result = applyCompletionOverrides(completion, [override(["zoneQuests", "AD1"], 99)])
    expect(result.skillPoints?.zoneQuests.AD1).toBe(3)
  })

  test("floors a groupDungeons entry to binary 1", () => {
    const completion: CharacterCompletion = { skillPoints: emptySkillPoints() }
    const result = applyCompletionOverrides(completion, [override(["groupDungeons", "BC1"], 5)])
    expect(result.skillPoints?.groupDungeons.BC1).toBe(1)
  })

  test("ignores an unknown zone key", () => {
    const completion: CharacterCompletion = { skillPoints: emptySkillPoints() }
    const result = applyCompletionOverrides(completion, [override(["skyshards", "NOPE"], 1)])
    expect(result).toBe(completion)
  })
})

describe("applyCompletionOverrides — dispatch and composition", () => {
  test("an unsupported card is a no-op", () => {
    const completion: CharacterCompletion = { skillPoints: emptySkillPoints() }
    const result = applyCompletionOverrides(completion, [
      override(["whatever"], 1, "champion-points"),
    ])
    expect(result).toBe(completion)
  })

  test("applies multiple overrides in sequence", () => {
    const completion: CharacterCompletion = { skillPoints: emptySkillPoints() }
    const result = applyCompletionOverrides(completion, [
      override(["general", "foliumDiscognitum"], 2),
      override(["skyshards", "AD1"], 16),
    ])
    expect(result.skillPoints?.foliumDiscognitum).toBe(2)
    expect(result.skillPoints?.skyshards.AD1).toBe(16)
  })

  test("an empty override list returns the input reference", () => {
    const completion: CharacterCompletion = { skillPoints: emptySkillPoints() }
    expect(applyCompletionOverrides(completion, [])).toBe(completion)
  })
})
