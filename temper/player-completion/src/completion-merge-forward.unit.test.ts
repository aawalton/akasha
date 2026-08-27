import { describe, expect, test } from "bun:test"
import type {
  AccountCompletion,
  CharacterCompletion,
  CompanionCompletion,
} from "@temper/game-completion/completion-types"
import {
  mergeAccountCompletionForward,
  mergeCharacterCompletionForward,
  mergeCompanionCompletionForward,
} from "./completion-merge-forward"

describe("mergeCharacterCompletionForward — boundaries", () => {
  test("undefined existing yields incoming", () => {
    const incoming: CharacterCompletion = { quests: [1, 2] }
    expect(mergeCharacterCompletionForward(undefined, incoming)).toEqual(incoming)
  })

  test("undefined incoming yields existing", () => {
    const existing: CharacterCompletion = { quests: [1, 2] }
    expect(mergeCharacterCompletionForward(existing, undefined)).toEqual(existing)
  })
})

describe("mergeCharacterCompletionForward — the wipe case", () => {
  test("an emptied incoming never erases stored completion", () => {
    const existing: CharacterCompletion = {
      level: 50,
      bagSize: 140,
      quests: [10, 20, 30],
      achievements: {
        1: { completed: true, criteriaProgress: { completedSteps: 5, totalSteps: 5 } },
      },
      zoneCompletion: { 100: { 1: [1, 2, 3] } },
    }
    const incoming: CharacterCompletion = {}
    const merged = mergeCharacterCompletionForward(existing, incoming)
    expect(merged?.quests).toEqual([10, 20, 30])
    expect(merged?.level).toBe(50)
    expect(merged?.bagSize).toBe(140)
    expect(merged?.achievements?.[1]?.completed).toBe(true)
    expect(merged?.zoneCompletion?.[100]?.[1]).toEqual([1, 2, 3])
  })
})

describe("mergeCharacterCompletionForward — per-field rules", () => {
  test("UNION: quest id arrays union and dedup", () => {
    const merged = mergeCharacterCompletionForward({ quests: [1, 3, 5] }, { quests: [2, 3, 6] })
    expect(merged?.quests).toEqual([1, 2, 3, 5, 6])
  })

  test("MAX: monotonic scalars never decrease", () => {
    const merged = mergeCharacterCompletionForward(
      { level: 50, bagSize: 140, allianceRank: 9 },
      { level: 48, bagSize: 120, allianceRank: 7 }
    )
    expect(merged?.level).toBe(50)
    expect(merged?.bagSize).toBe(140)
    expect(merged?.allianceRank).toBe(9)
  })

  test("DEEP_FORWARD: record keys union, never dropped", () => {
    const merged = mergeCharacterCompletionForward(
      {
        achievements: {
          1: { completed: true, criteriaProgress: { completedSteps: 3, totalSteps: 5 } },
        },
      },
      {
        achievements: {
          2: { completed: false, criteriaProgress: { completedSteps: 1, totalSteps: 4 } },
        },
      }
    )
    expect(Object.keys(merged?.achievements ?? {}).sort()).toEqual(["1", "2"])
  })

  test("DEEP_FORWARD: completed boolean is OR (true never reverts)", () => {
    const merged = mergeCharacterCompletionForward(
      {
        achievements: {
          1: { completed: true, criteriaProgress: { completedSteps: 5, totalSteps: 5 } },
        },
      },
      {
        achievements: {
          1: { completed: false, criteriaProgress: { completedSteps: 2, totalSteps: 5 } },
        },
      }
    )
    expect(merged?.achievements?.[1]?.completed).toBe(true)
    expect(merged?.achievements?.[1]?.criteriaProgress.completedSteps).toBe(5)
  })

  test("DEEP_FORWARD: nested number-arrays union (zone activities)", () => {
    const merged = mergeCharacterCompletionForward(
      { zoneCompletion: { 100: { 1: [1, 2] } } },
      { zoneCompletion: { 100: { 1: [2, 3] }, 200: { 1: [9] } } }
    )
    expect(merged?.zoneCompletion?.[100]?.[1]).toEqual([1, 2, 3])
    expect(merged?.zoneCompletion?.[200]?.[1]).toEqual([9])
  })

  test("LWW: identity/cosmetic fields take incoming", () => {
    const merged = mergeCharacterCompletionForward(
      { gender: 1, classId: 3, className: "Old" },
      { gender: 2, classId: 6, className: "New" }
    )
    expect(merged?.gender).toBe(2)
    expect(merged?.classId).toBe(6)
    expect(merged?.className).toBe("New")
  })

  test("LWW: dailyWrits is taken wholesale (completed resets daily)", () => {
    const merged = mergeCharacterCompletionForward(
      { dailyWrits: { date: "2026-06-06", completed: 7 } },
      { dailyWrits: { date: "2026-06-07", completed: 1 } }
    )
    expect(merged?.dailyWrits).toEqual({ date: "2026-06-07", completed: 1 })
  })
})

describe("mergeCharacterCompletionForward — nested LWW exceptions", () => {
  test("skillPoints.unassigned takes incoming (decreases when spent); total is MAX", () => {
    const existing: CharacterCompletion = {
      skillPoints: makeSkillPoints({ total: 100, unassigned: 30 }),
    }
    const incoming: CharacterCompletion = {
      skillPoints: makeSkillPoints({ total: 100, unassigned: 5 }),
    }
    const merged = mergeCharacterCompletionForward(existing, incoming)
    expect(merged?.skillPoints?.unassigned).toBe(5)
    expect(merged?.skillPoints?.total).toBe(100)
  })

  test("skillMorph.currentMorph takes incoming (selection, not monotonic)", () => {
    const existing: CharacterCompletion = {
      skillLineProgress: {
        1: {
          currentRank: 10,
          currentXP: 500,
          nextRankXP: 1000,
          skills: { 0: makeMorph({ currentMorph: 2, baseRank: 4 }) },
        },
      },
    }
    const incoming: CharacterCompletion = {
      skillLineProgress: {
        1: {
          currentRank: 10,
          currentXP: 500,
          nextRankXP: 1000,
          skills: { 0: makeMorph({ currentMorph: 1, baseRank: 4 }) },
        },
      },
    }
    const merged = mergeCharacterCompletionForward(existing, incoming)
    expect(merged?.skillLineProgress?.[1]?.skills?.[0]?.currentMorph).toBe(1)
  })
})

describe("mergeAccountCompletionForward", () => {
  test("collectibles union, championPoints MAX, achievements keys union", () => {
    const existing: AccountCompletion = {
      achievements: {
        1: { completed: true, criteriaProgress: { completedSteps: 1, totalSteps: 1 } },
      },
      collectibles: [10, 20],
      championPointsEarned: 3600,
    }
    const incoming: AccountCompletion = {
      achievements: {
        2: { completed: true, criteriaProgress: { completedSteps: 1, totalSteps: 1 } },
      },
      collectibles: [20, 30],
      championPointsEarned: 3000,
    }
    const merged = mergeAccountCompletionForward(existing, incoming)
    expect(merged?.collectibles).toEqual([10, 20, 30])
    expect(merged?.championPointsEarned).toBe(3600)
    expect(Object.keys(merged?.achievements ?? {}).sort()).toEqual(["1", "2"])
  })

  test("wiped account incoming preserves stored collectibles", () => {
    const existing: AccountCompletion = { achievements: {}, collectibles: [1, 2, 3] }
    const merged = mergeAccountCompletionForward(existing, { achievements: {} })
    expect(merged?.collectibles).toEqual([1, 2, 3])
  })
})

describe("mergeCompanionCompletionForward", () => {
  test("rapport and level are MAX; currentXP and build are LWW", () => {
    const existing: CompanionCompletion = {
      level: 20,
      rapport: 9000,
      currentXP: 800,
      selectedBuild: "old",
    }
    const incoming: CompanionCompletion = {
      level: 19,
      rapport: 8000,
      currentXP: 100,
      selectedBuild: "new",
    }
    const merged = mergeCompanionCompletionForward(existing, incoming)
    expect(merged?.level).toBe(20)
    expect(merged?.rapport).toBe(9000)
    expect(merged?.currentXP).toBe(100)
    expect(merged?.selectedBuild).toBe("new")
  })
})

function makeSkillPoints(over: {
  total: number
  unassigned: number
}): NonNullable<CharacterCompletion["skillPoints"]> {
  return {
    total: over.total,
    unassigned: over.unassigned,
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

function makeMorph(over: {
  currentMorph: number
  baseRank: number
}): NonNullable<NonNullable<CharacterCompletion["skillLineProgress"]>[number]["skills"]>[number] {
  const ability = (rank: number) => ({
    name: "x",
    rank,
  })
  return {
    base: ability(over.baseRank),
    morph1: ability(0),
    morph2: ability(0),
    currentMorph: over.currentMorph,
    abilityIndex: 0,
  }
}
