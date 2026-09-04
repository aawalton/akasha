import { describe, expect, test } from "bun:test"
import type { SkillPointProgress } from "@akasha/temper-completion/completion-progress"
import type { SavedCharacterEntry } from "@akasha/temper-player-completion-state/completion-saved-variables"
import { resolveSkillPoints } from "./characters-task-progress-resolver-skills.module.code.ts"

const FOLIUM_DISCOGNITUM_CEILING = 2

function skillPointCapture(fields: Partial<SkillPointProgress>): SkillPointProgress {
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
    ...fields,
  }
}

function characterEntry(fields: Partial<SavedCharacterEntry>): SavedCharacterEntry {
  return { name: "Fixture Character", ...fields }
}

describe("resolveSkillPoints", () => {
  test("the Folium Discognitum leaf counts what the entry holds out of the two it gives", () => {
    const entry = characterEntry({ skillPoints: skillPointCapture({ foliumDiscognitum: 2 }) })
    expect(resolveSkillPoints(entry, ["general", "foliumDiscognitum"])).toEqual({
      current: 2,
      total: FOLIUM_DISCOGNITUM_CEILING,
    })
  })

  test("an absent entry still counts the leaf's ceiling with nothing earned against it", () => {
    expect(resolveSkillPoints(undefined, ["general", "foliumDiscognitum"])).toEqual({
      current: 0,
      total: FOLIUM_DISCOGNITUM_CEILING,
    })
  })

  test("an entry holding no skill point capture counts the leaf's ceiling at nothing", () => {
    expect(resolveSkillPoints(characterEntry({}), ["general", "foliumDiscognitum"])).toEqual({
      current: 0,
      total: FOLIUM_DISCOGNITUM_CEILING,
    })
  })

  test("no path at all yields no progress", () => {
    const entry = characterEntry({ skillPoints: skillPointCapture({ foliumDiscognitum: 2 }) })
    expect(resolveSkillPoints(entry, undefined)).toBeUndefined()
  })

  test("a branch no source answers to yields no progress", () => {
    const entry = characterEntry({ skillPoints: skillPointCapture({ foliumDiscognitum: 2 }) })
    expect(resolveSkillPoints(entry, ["not-a-branch", "foliumDiscognitum"])).toBeUndefined()
  })

  test("a source key no general source answers to yields no progress", () => {
    const entry = characterEntry({ skillPoints: skillPointCapture({ foliumDiscognitum: 2 }) })
    expect(resolveSkillPoints(entry, ["general", "not-a-source"])).toBeUndefined()
  })
})
