import { describe, expect, test } from "bun:test"
import { skillLines } from "akasha/temper/player/character/skill/line/modules/skill-lines/skill-lines.module.code.ts"
import type {
  CharacterCompletion,
  SkillPointProgress,
} from "akasha/temper/player/completion/modules/completion-progress/completion-progress.module.code.ts"
import type { AccountCheckerInput } from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-checker-types/completion-card-checker-types.module.code.ts"
import { NO_COMPLETION_CATALOGS } from "akasha/temper/player/completion/temper-player-completion/modules/completion-catalogs/completion-catalogs.module.code.ts"
import { resolveGenericCheckerProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-generic-checker-progress/completion-generic-checker-progress.module.code.ts"
import { SKILL_POINT_GENERAL_SOURCES } from "akasha/temper/player/completion/temper-player-completion/modules/skill-point-general-sources/skill-point-general-sources.module.code.ts"
import { SKILL_POINT_GROUP_DUNGEON_SOURCES } from "akasha/temper/player/completion/temper-player-completion/modules/skill-point-group-dungeons/skill-point-group-dungeons.module.code.ts"
import { SKILL_POINT_STORY_ZONE_SOURCES } from "akasha/temper/player/completion/temper-player-completion/modules/skill-point-zone-sources/skill-point-zone-sources.module.code.ts"

const NO_ACCOUNT: AccountCheckerInput = {
  account: null,
  rows: [],
  catalogs: NO_COMPLETION_CATALOGS,
}

function mkSP(overrides: Partial<SkillPointProgress> = {}): SkillPointProgress {
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
    ...overrides,
  }
}

const GENERAL_TOTAL = SKILL_POINT_GENERAL_SOURCES.reduce((sum, src) => sum + src.maxValue, 0)

const FIRST_GROUP_DUNGEON = SKILL_POINT_GROUP_DUNGEON_SOURCES[0]
if (FIRST_GROUP_DUNGEON === undefined) {
  throw new Error("test fixture: SKILL_POINT_GROUP_DUNGEON_SOURCES[0] missing")
}

const LINE = skillLines.list.find((line) => line.esoSkillLineId !== 0 && line.maxRank > 0)
if (LINE === undefined) throw new Error("test fixture: no ranked skill line")
const LINE_ID = LINE.esoSkillLineId

describe("resolveGenericCheckerProgress / skill-points (numeric x/y via getItemProgress)", () => {
  test("returns x/y for the Folium Discognitum leaf (count below max)", () => {
    const completion: CharacterCompletion = { skillPoints: mkSP({ foliumDiscognitum: 0 }) }
    const out = resolveGenericCheckerProgress(
      "skill-points",
      ["general", "foliumDiscognitum"],
      completion,
      NO_ACCOUNT
    )
    expect(out).toEqual({ current: 0, total: 2 })
  })

  test("returns x/y for the Folium Discognitum leaf (count at max)", () => {
    const completion: CharacterCompletion = { skillPoints: mkSP({ foliumDiscognitum: 2 }) }
    const out = resolveGenericCheckerProgress(
      "skill-points",
      ["general", "foliumDiscognitum"],
      completion,
      NO_ACCOUNT
    )
    expect(out).toEqual({ current: 2, total: 2 })
  })

  test("derives the static total even when the character has no skillPoints blob", () => {
    const out = resolveGenericCheckerProgress(
      "skill-points",
      ["general", "foliumDiscognitum"],
      {},
      NO_ACCOUNT
    )
    expect(out).toEqual({ current: 0, total: 2 })
  })

  test("sums leaves for the general branch", () => {
    const completion: CharacterCompletion = { skillPoints: mkSP({ foliumDiscognitum: 2 }) }
    const out = resolveGenericCheckerProgress("skill-points", ["general"], completion, NO_ACCOUNT)
    expect(out).toEqual({ current: 2, total: GENERAL_TOTAL })
  })

  test("sums all leaves at the card level (total includes the general branch)", () => {
    const completion: CharacterCompletion = { skillPoints: mkSP({ foliumDiscognitum: 2 }) }
    const out = resolveGenericCheckerProgress("skill-points", [], completion, NO_ACCOUNT)
    expect(out).toBeDefined()
    expect(out?.current).toBeGreaterThanOrEqual(2)
    expect(out?.total).toBeGreaterThan(GENERAL_TOTAL)
  })

  test("treats a group-dungeon leaf as binary x/1 via getItemProgress", () => {
    const completion: CharacterCompletion = {
      skillPoints: mkSP({ groupDungeons: { [FIRST_GROUP_DUNGEON.key]: 1 } }),
    }
    const out = resolveGenericCheckerProgress(
      "skill-points",
      ["groupDungeons", FIRST_GROUP_DUNGEON.key],
      completion,
      NO_ACCOUNT
    )
    expect(out).toEqual({ current: 1, total: 1 })
  })
})

const STORY_ZONE_TOTAL = SKILL_POINT_STORY_ZONE_SOURCES.reduce(
  (sum, zone) => sum + zone.maxQuests,
  0
)

const FIRST_STORY_ZONE = SKILL_POINT_STORY_ZONE_SOURCES[0]
if (FIRST_STORY_ZONE === undefined) {
  throw new Error("test fixture: SKILL_POINT_STORY_ZONE_SOURCES[0] missing")
}

describe("resolveGenericCheckerProgress / skill-points story zone quests", () => {
  test("totals the quest skill points every story zone holds", () => {
    const out = resolveGenericCheckerProgress("skill-points", ["storyZoneQuests"], {}, NO_ACCOUNT)
    expect(out).toEqual({ current: 0, total: STORY_ZONE_TOTAL })
  })

  test("counts a story zone the character has finished", () => {
    const completion: CharacterCompletion = {
      skillPoints: mkSP({ zoneQuests: { [FIRST_STORY_ZONE.key]: FIRST_STORY_ZONE.maxQuests } }),
    }
    const out = resolveGenericCheckerProgress(
      "skill-points",
      ["storyZoneQuests"],
      completion,
      NO_ACCOUNT
    )
    expect(out).toEqual({ current: FIRST_STORY_ZONE.maxQuests, total: STORY_ZONE_TOTAL })
  })

  test("leaves out Imperial City, which the whole zone-quest branch still counts", () => {
    const completion: CharacterCompletion = { skillPoints: mkSP({ zoneQuests: { IC: 1 } }) }
    expect(
      resolveGenericCheckerProgress("skill-points", ["storyZoneQuests"], completion, NO_ACCOUNT)
    ).toEqual({ current: 0, total: STORY_ZONE_TOTAL })
    expect(
      resolveGenericCheckerProgress("skill-points", ["zoneQuests"], completion, NO_ACCOUNT)
    ).toEqual({ current: 1, total: STORY_ZONE_TOTAL + 1 })
  })
})

describe("resolveGenericCheckerProgress / binary fallback (isItemComplete, no getItemProgress)", () => {
  test("returns 0/1 for an incomplete skill-line leaf", () => {
    const completion: CharacterCompletion = {
      skillLineProgress: { [LINE_ID]: { currentRank: 1, currentXP: 0, nextRankXP: 100 } },
    }
    const out = resolveGenericCheckerProgress("skill-lines", [LINE_ID], completion, NO_ACCOUNT)
    expect(out).toEqual({ current: 0, total: 1 })
  })

  test("returns 1/1 for a completed skill-line leaf", () => {
    const completion: CharacterCompletion = {
      skillLineProgress: { [LINE_ID]: { currentRank: 1, currentXP: 0, nextRankXP: 0 } },
    }
    const out = resolveGenericCheckerProgress("skill-lines", [LINE_ID], completion, NO_ACCOUNT)
    expect(out).toEqual({ current: 1, total: 1 })
  })
})

describe("resolveGenericCheckerProgress / non-trackable", () => {
  test("returns undefined for a card with no checker (guild-sales)", () => {
    expect(resolveGenericCheckerProgress("guild-sales", null, null, NO_ACCOUNT)).toBeUndefined()
  })
})
