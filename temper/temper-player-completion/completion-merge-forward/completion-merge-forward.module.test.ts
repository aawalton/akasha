import { describe, expect, test } from "bun:test"
import type {
  AccountCompletion,
  CharacterCompletion,
  CompanionCompletion,
} from "@akasha/temper-completion/completion-progress"
import fc from "fast-check"
import {
  deepForward,
  mergeAccountCompletionForward,
  mergeCharacterCompletionForward,
  mergeCompanionCompletionForward,
} from "./completion-merge-forward.module.code.ts"

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
  const ability = (rank: number) => ({ name: "x", rank })
  return {
    base: ability(over.baseRank),
    morph1: ability(0),
    morph2: ability(0),
    currentMorph: over.currentMorph,
    abilityIndex: 0,
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function dominatesForward(merged: unknown, base: unknown): boolean {
  if (base === undefined) return true
  if (typeof base === "number") {
    return typeof merged === "number" && merged >= base
  }
  if (typeof base === "boolean") {
    return typeof merged === "boolean" && (!base || merged)
  }
  if (Array.isArray(base)) {
    if (!Array.isArray(merged)) return false
    const present = new Set<unknown>(merged)
    return base.every((entry) => present.has(entry))
  }
  if (isPlainObject(base)) {
    if (!isPlainObject(merged)) return false
    return Object.keys(base).every((key) => dominatesForward(merged[key], base[key]))
  }
  return true
}

const numberArb = fc.integer({ min: 0, max: 1000 })
const numberArrayArb = fc.array(fc.integer({ min: 0, max: 50 }), { maxLength: 8 })

const letrecPairs = fc.letrec<{ pair: readonly [unknown, unknown] }>((tie) => ({
  pair: fc
    .oneof(
      { depthSize: "small", withCrossShrink: true },
      fc.tuple(numberArb, numberArb),
      fc.tuple(fc.boolean(), fc.boolean()),
      fc.tuple(numberArrayArb, numberArrayArb),
      fc
        .dictionary(
          fc.constantFrom("a", "b", "c", "d", "e"),
          fc.tuple(tie("pair"), fc.constantFrom("both", "existing", "incoming")),
          { maxKeys: 5 }
        )
        .map((dict): readonly [unknown, unknown] => {
          const existing: Record<string, unknown> = {}
          const incoming: Record<string, unknown> = {}
          for (const [key, [[existingValue, incomingValue], where]] of Object.entries(dict)) {
            if (where === "both" || where === "existing") existing[key] = existingValue
            if (where === "both" || where === "incoming") incoming[key] = incomingValue
          }
          return [existing, incoming]
        })
    )
    .map((value): readonly [unknown, unknown] => value),
}))

const pairArb = letrecPairs.pair

describe("merging a character forward at the boundaries", () => {
  test("an absent existing reading yields the incoming reading", () => {
    const incoming: CharacterCompletion = { quests: [1, 2] }
    expect(mergeCharacterCompletionForward(undefined, incoming)).toEqual(incoming)
  })

  test("an absent incoming reading yields the existing reading", () => {
    const existing: CharacterCompletion = { quests: [1, 2] }
    expect(mergeCharacterCompletionForward(existing, undefined)).toEqual(existing)
  })
})

describe("merging a character forward when the fresh reading came back empty", () => {
  test("an emptied incoming reading never erases stored completion", () => {
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

describe("merging a character forward field by field", () => {
  test("quest id arrays union and shed duplicates", () => {
    const merged = mergeCharacterCompletionForward({ quests: [1, 3, 5] }, { quests: [2, 3, 6] })
    expect(merged?.quests).toEqual([1, 2, 3, 5, 6])
  })

  test("monotonic scalars take the greater of the two and never decrease", () => {
    const merged = mergeCharacterCompletionForward(
      { level: 50, bagSize: 140, allianceRank: 9 },
      { level: 48, bagSize: 120, allianceRank: 7 }
    )
    expect(merged?.level).toBe(50)
    expect(merged?.bagSize).toBe(140)
    expect(merged?.allianceRank).toBe(9)
  })

  test("record keys union so an achievement absent from the fresh reading is kept", () => {
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

  test("an achievement once completed stays completed however the fresh reading reads", () => {
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

  test("number arrays nested two deep union, as zone activities are", () => {
    const merged = mergeCharacterCompletionForward(
      { zoneCompletion: { 100: { 1: [1, 2] } } },
      { zoneCompletion: { 100: { 1: [2, 3] }, 200: { 1: [9] } } }
    )
    expect(merged?.zoneCompletion?.[100]?.[1]).toEqual([1, 2, 3])
    expect(merged?.zoneCompletion?.[200]?.[1]).toEqual([9])
  })

  test("naming and appearance fields take the fresh reading whole", () => {
    const merged = mergeCharacterCompletionForward(
      { gender: 1, classId: 3, className: "Old" },
      { gender: 2, classId: 6, className: "New" }
    )
    expect(merged?.gender).toBe(2)
    expect(merged?.classId).toBe(6)
    expect(merged?.className).toBe("New")
  })

  test("daily writs are taken whole because the count resets each day", () => {
    const merged = mergeCharacterCompletionForward(
      { dailyWrits: { date: "2026-06-06", completed: 7 } },
      { dailyWrits: { date: "2026-06-07", completed: 1 } }
    )
    expect(merged?.dailyWrits).toEqual({ date: "2026-06-07", completed: 1 })
  })
})

describe("merging a character forward where a nested field takes the fresh reading", () => {
  test("unassigned skill points take the fresh reading while the total never decreases", () => {
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

  test("the chosen morph takes the fresh reading because a choice is not monotonic", () => {
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

describe("merging an account forward", () => {
  test("collectibles union, champion points take the greater, achievement keys union", () => {
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

  test("an emptied account reading preserves stored collectibles", () => {
    const existing: AccountCompletion = { achievements: {}, collectibles: [1, 2, 3] }
    const merged = mergeAccountCompletionForward(existing, { achievements: {} })
    expect(merged?.collectibles).toEqual([1, 2, 3])
  })
})

describe("merging a companion forward", () => {
  test("rapport and level take the greater while current xp and build take the fresh reading", () => {
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

describe("merging any two values forward stays monotonic", () => {
  test("a merged value forward-dominates both sides so nothing goes backwards", () => {
    fc.assert(
      fc.property(pairArb, ([existing, incoming]) => {
        const merged = deepForward(existing, incoming)
        return dominatesForward(merged, existing) && dominatesForward(merged, incoming)
      }),
      { numRuns: 3000 }
    )
  })

  test("an absent incoming reading preserves the existing value exactly", () => {
    fc.assert(
      fc.property(pairArb, ([existing]) => {
        return dominatesForward(deepForward(existing, undefined), existing)
      }),
      { numRuns: 1000 }
    )
  })

  test("merging either way round yields two answers that dominate each other", () => {
    fc.assert(
      fc.property(pairArb, ([existing, incoming]) => {
        const ab = deepForward(existing, incoming)
        const ba = deepForward(incoming, existing)
        return dominatesForward(ab, ba) && dominatesForward(ba, ab)
      }),
      { numRuns: 1000 }
    )
  })
})
