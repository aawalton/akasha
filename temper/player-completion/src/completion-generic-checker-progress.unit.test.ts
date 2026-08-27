import { describe, expect, it } from "bun:test"
import { skillLines } from "@temper/game-characters-skill-lines/skill-lines-data"
import type {
  CharacterCompletion,
  SkillPointProgress,
} from "@temper/game-completion/completion-types"
import { resolveGenericCheckerProgress } from "./completion-generic-checker-progress"
import { skillPointGeneralSources, skillPointGroupDungeonSources } from "./generated/temper-skill-point.generated"

function mkSP(o: Partial<SkillPointProgress> = {}): SkillPointProgress {
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
    ...o,
  }
}

const GENERAL_TOTAL = skillPointGeneralSources.reduce((s, src) => s + src.maxValue, 0)
const FIRST_GROUP_DUNGEON = skillPointGroupDungeonSources[0]
if (FIRST_GROUP_DUNGEON === undefined)
  throw new Error("test fixture: skillPointGroupDungeonSources[0] missing")

describe("resolveGenericCheckerProgress / skill-points (numeric x/y via getItemProgress)", () => {
  it("returns x/y for the Folium Discognitum leaf (count below max)", () => {
    const c: CharacterCompletion = { skillPoints: mkSP({ foliumDiscognitum: 0 }) }
    const out = resolveGenericCheckerProgress(
      "skill-points",
      ["general", "foliumDiscognitum"],
      c,
      null
    )
    expect(out).toEqual({ current: 0, total: 2 })
  })

  it("returns x/y for the Folium Discognitum leaf (count at max)", () => {
    const c: CharacterCompletion = { skillPoints: mkSP({ foliumDiscognitum: 2 }) }
    const out = resolveGenericCheckerProgress(
      "skill-points",
      ["general", "foliumDiscognitum"],
      c,
      null
    )
    expect(out).toEqual({ current: 2, total: 2 })
  })

  it("derives the static total even when the character has no skillPoints blob", () => {
    const out = resolveGenericCheckerProgress(
      "skill-points",
      ["general", "foliumDiscognitum"],
      {},
      null
    )
    expect(out).toEqual({ current: 0, total: 2 })
  })

  it("sums leaves for the general branch", () => {
    const c: CharacterCompletion = { skillPoints: mkSP({ foliumDiscognitum: 2 }) }
    const out = resolveGenericCheckerProgress("skill-points", ["general"], c, null)
    expect(out).toEqual({ current: 2, total: GENERAL_TOTAL })
  })

  it("sums all leaves at the card level (defined, total includes the general branch)", () => {
    const c: CharacterCompletion = { skillPoints: mkSP({ foliumDiscognitum: 2 }) }
    const out = resolveGenericCheckerProgress("skill-points", [], c, null)
    expect(out).toBeDefined()
    expect(out?.current).toBeGreaterThanOrEqual(2)
    expect(out?.total).toBeGreaterThan(GENERAL_TOTAL)
  })

  it("treats a group-dungeon leaf as binary x/1 via getItemProgress", () => {
    const c: CharacterCompletion = {
      skillPoints: mkSP({ groupDungeons: { [FIRST_GROUP_DUNGEON.key]: 1 } }),
    }
    const out = resolveGenericCheckerProgress(
      "skill-points",
      ["groupDungeons", FIRST_GROUP_DUNGEON.key],
      c,
      null
    )
    expect(out).toEqual({ current: 1, total: 1 })
  })
})

describe("resolveGenericCheckerProgress / binary fallback (checker with isItemComplete, no getItemProgress)", () => {
  const LINE = skillLines.list[0]
  if (LINE === undefined) throw new Error("test fixture: skillLines.list[0] missing")
  const LINE_ID = LINE.esoSkillLineId

  it("returns 0/1 for an incomplete skill-line leaf", () => {
    const c: CharacterCompletion = {
      skillLineProgress: { [LINE_ID]: { currentRank: 1, currentXP: 0, nextRankXP: 100 } },
    }
    const out = resolveGenericCheckerProgress("skill-lines", [LINE_ID], c, null)
    expect(out).toEqual({ current: 0, total: 1 })
  })

  it("returns 1/1 for a completed skill-line leaf", () => {
    const c: CharacterCompletion = {
      skillLineProgress: { [LINE_ID]: { currentRank: 1, currentXP: 0, nextRankXP: 0 } },
    }
    const out = resolveGenericCheckerProgress("skill-lines", [LINE_ID], c, null)
    expect(out).toEqual({ current: 1, total: 1 })
  })
})

describe("resolveGenericCheckerProgress / non-trackable", () => {
  it("returns undefined for a card with no checker (guild-sales)", () => {
    expect(resolveGenericCheckerProgress("guild-sales", null, null, null)).toBeUndefined()
  })
})
