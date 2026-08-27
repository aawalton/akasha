import { describe, expect, it } from "bun:test"
import type { SkillPointProgress } from "@temper/game-completion/completion-types"
import type { SavedCharacterEntry } from "../saved-variables"
import { resolveSkillPoints } from "./task-progress-resolver-skills"

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

function charWithSkillPoints(skillPoints: SkillPointProgress | undefined): SavedCharacterEntry {
  return { name: "test-char", skillPoints }
}

describe("resolveSkillPoints", () => {
  it("resolves Folium Discognitum to 0/2 when uncompleted", () => {
    const char = charWithSkillPoints(emptySkillPoints())
    expect(resolveSkillPoints(char, ["general", "foliumDiscognitum"])).toEqual({
      current: 0,
      total: 2,
    })
  })

  it("resolves Folium Discognitum to 2/2 when completed", () => {
    const sp = emptySkillPoints()
    sp.foliumDiscognitum = 2
    expect(resolveSkillPoints(charWithSkillPoints(sp), ["general", "foliumDiscognitum"])).toEqual({
      current: 2,
      total: 2,
    })
  })

  it("returns the static denominator (0/2) even when the character has no skillPoints blob", () => {
    expect(
      resolveSkillPoints(charWithSkillPoints(undefined), ["general", "foliumDiscognitum"])
    ).toEqual({ current: 0, total: 2 })
  })

  it("returns undefined for a missing item path", () => {
    expect(resolveSkillPoints(charWithSkillPoints(emptySkillPoints()), undefined)).toBeUndefined()
  })

  it("returns undefined for an unknown general source key", () => {
    expect(
      resolveSkillPoints(charWithSkillPoints(emptySkillPoints()), ["general", "notARealSource"])
    ).toBeUndefined()
  })
})
