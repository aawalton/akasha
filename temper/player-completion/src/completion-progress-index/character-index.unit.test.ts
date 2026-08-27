import { describe, expect, it } from "bun:test"
import type { CharacterCompletion } from "@temper/game-completion/completion-types"
import { buildCharacterCompletionIndex } from "../completion-progress-index"
import { CHAR_FULL, CHAR_PARTIAL } from "./character-fixtures"

describe("buildCharacterCompletionIndex", () => {
  it("emits the cardId-only key for a flat card with no picker (daily-writs)", () => {
    const idx = buildCharacterCompletionIndex("c0", {})
    expect(idx["daily-writs"]).toEqual({ current: 0, total: 7 })
    expect(idx["daily-writs/speed"]).toBeUndefined()
  })

  it("emits depth-0 plus per-stat keys for a 1-deep narrowed card (mount-training)", () => {
    const idx = buildCharacterCompletionIndex("c0", CHAR_PARTIAL)
    expect(idx["mount-training"]).toEqual({ current: 30, total: 180 })
    expect(idx["mount-training/speed"]).toEqual({ current: 30, total: 60 })
    expect(idx["mount-training/stamina"]).toEqual({ current: 0, total: 60 })
    expect(idx["mount-training/carryCapacity"]).toEqual({ current: 0, total: 60 })
  })

  it("skips paths whose resolver returns undefined (no mountTraining data)", () => {
    const idx = buildCharacterCompletionIndex("c0", {})
    expect(idx["mount-training"]).toBeUndefined()
    expect(idx["mount-training/speed"]).toBeUndefined()
  })

  it("does not include account-scoped cards in the character index", () => {
    const idx = buildCharacterCompletionIndex("c0", CHAR_FULL)
    expect(idx["account-achievements"]).toBeUndefined()
  })

  it("emits a skill-morphs key for a character with class/race/skill data (#9434)", () => {
    const completion: CharacterCompletion = {
      classId: 1,
      raceId: 1,
      skillLineProgress: { 35: { currentRank: 0, currentXP: 0, nextRankXP: 0, skills: {} } },
    }
    const idx = buildCharacterCompletionIndex("c1", completion)
    expect(idx["skill-morphs"]).toBeDefined()
    const entry = idx["skill-morphs"]
    if (!entry) throw new Error("skill-morphs missing")
    expect(entry.total).toBeGreaterThan(0)
    expect(entry.current).toBe(0)
  })
})

describe("buildCharacterCompletionIndex / skill-points (now default-working with x/y)", () => {
  const CHAR_SKILL_POINTS: CharacterCompletion = {
    skillPoints: {
      total: 0,
      unassigned: 0,
      level: 0,
      mainQuests: 0,
      tutorial: 0,
      foliumDiscognitum: 2,
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
    },
  }

  it("materializes the Folium Discognitum leaf as x/y", () => {
    const idx = buildCharacterCompletionIndex("c0", CHAR_SKILL_POINTS)
    expect(idx["skill-points/general/foliumDiscognitum"]).toEqual({ current: 2, total: 2 })
  })

  it("materializes the general branch and card-level rollups", () => {
    const idx = buildCharacterCompletionIndex("c0", CHAR_SKILL_POINTS)
    expect(idx["skill-points/general"]).toBeDefined()
    expect(idx["skill-points"]).toBeDefined()
  })
})
