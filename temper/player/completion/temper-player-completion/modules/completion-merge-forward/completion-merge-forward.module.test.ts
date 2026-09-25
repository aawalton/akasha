import { describe, expect, test } from "bun:test"
import {
  type AccountCompletion,
  accountCompletionSchema,
  type CharacterCompletion,
  type CompanionCompletion,
  characterCompletionSchema,
  companionCompletionSchema,
} from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"
import {
  deepForward,
  mergeAccountCompletionForward,
  mergeCharacterCompletionForward,
  mergeCompanionCompletionForward,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-merge-forward/completion-merge-forward.module.code.ts"
import {
  dominatesForward,
  heldIds,
  makeMorph,
  makeSkillPoints,
  pairArb,
  RAFAEMA_LIST_23_BEFORE,
  RAFAEMA_LIST_23_LIVE,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-merge-forward/completion-merge-forward.module.test-fixtures.ts"
import fc from "fast-check"

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

describe("merging a list", () => {
  test("a recipe list gains the ids the game put in the middle rather than the larger id at each position", () => {
    const merged = deepForward(
      { recipes: { 23: RAFAEMA_LIST_23_BEFORE } },
      { recipes: { 23: RAFAEMA_LIST_23_LIVE } }
    )
    expect(merged).toEqual({
      recipes: { 23: [...RAFAEMA_LIST_23_LIVE].sort((a, b) => a - b) },
    })
  })

  test("a list of records is merged position by position", () => {
    const merged = deepForward(
      [{ name: "Vault", unlocked: true }],
      [
        { name: "Vault", unlocked: false },
        { name: "Smash", unlocked: true },
      ]
    )
    expect(merged).toEqual([
      { name: "Vault", unlocked: true },
      { name: "Smash", unlocked: true },
    ])
  })

  test("a list holding neither ids nor records takes the fresh reading whole", () => {
    expect(deepForward(["a", "b"], ["c"])).toEqual(["c"])
  })

  test("a record of numbers keyed one to n keeps the greater number under each key", () => {
    expect(deepForward({ 1: 4000, 2: 1000 }, { 1: 3000, 2: 2000 })).toEqual({ 1: 4000, 2: 2000 })
  })

  test("merging two id lists keeps every id either side held", () => {
    const listArb = fc.uniqueArray(fc.integer({ min: 1, max: 60 }), { minLength: 1, maxLength: 12 })
    fc.assert(
      fc.property(listArb, listArb, (existing, incoming) => {
        const held = new Set(heldIds(deepForward(existing, incoming)))
        return [...existing, ...incoming].every((id) => held.has(id))
      }),
      { numRuns: 1000 }
    )
  })
})

describe("merging a character forward where a state follows the latest reading", () => {
  test("a curse the game stopped writing is not kept", () => {
    const merged = mergeCharacterCompletionForward(
      { curseState: "vampire", level: 50 },
      { level: 50 }
    )
    expect(merged?.curseState).toBeUndefined()
  })

  test("the day's writ states are taken whole because they reset each day", () => {
    const existing: CharacterCompletion = {
      level: 50,
      dailyWritStates: { date: "2026-09-24", completed: [1, 6], seen: [5] },
    }
    const incoming: CharacterCompletion = {
      level: 50,
      dailyWritStates: { date: "2026-09-25", completed: [2], seen: [3] },
    }
    const merged = mergeCharacterCompletionForward(existing, incoming)
    expect(merged?.dailyWritStates).toEqual({ date: "2026-09-25", completed: [2], seen: [3] })
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

describe("a merged reading is one its record's schema reads", () => {
  test("a character merged forward reads back through the character schema unchanged", () => {
    const existing = characterCompletionSchema.parse({
      buildHash: "old",
      level: 40,
      quests: [1, 2],
      skillLineProgress: {
        1: {
          currentRank: 3,
          currentXP: 10,
          nextRankXP: 20,
          skills: {
            0: {
              base: { name: "a", rank: 1 },
              morph1: { name: "b" },
              morph2: { name: "c" },
              currentMorph: 0,
              abilityIndex: 0,
            },
          },
        },
      },
      dailyWritStates: { date: "2026-09-24", seen: [1], completed: [] },
    })
    const incoming = characterCompletionSchema.parse({
      buildHash: "new",
      level: 41,
      quests: [3],
      curseState: "werewolf",
      dailyWritStates: { date: "2026-09-25", seen: [2], completed: [2] },
    })
    const merged = mergeCharacterCompletionForward(existing, incoming)
    expect(merged).toEqual(characterCompletionSchema.parse(merged))
    expect(merged?.buildHash).toBe(incoming.buildHash)
    expect(merged?.skillLineProgress?.[1]?.skills?.[0]?.base.rank).toBe(1)
  })

  test("an account merged forward reads back through the account schema unchanged", () => {
    const existing = accountCompletionSchema.parse({
      achievements: {},
      itemSets: {
        7: {
          name: "Set",
          slotsUnlocked: 1,
          totalSlots: 2,
          pieces: [{ name: "Helm", unlocked: true }],
        },
      },
    })
    const incoming = accountCompletionSchema.parse({
      achievements: {},
      itemSets: {
        7: {
          name: "Set",
          slotsUnlocked: 0,
          totalSlots: 2,
          pieces: [
            { name: "Helm", unlocked: false },
            { name: "Boots", unlocked: true },
          ],
        },
      },
    })
    const merged = mergeAccountCompletionForward(existing, incoming)
    expect(merged).toEqual(accountCompletionSchema.parse(merged))
    expect(merged?.itemSets?.[7]?.pieces).toEqual([
      { name: "Helm", unlocked: true },
      { name: "Boots", unlocked: true },
    ])
  })

  test("a companion merged forward reads back through the companion schema unchanged", () => {
    const existing = companionCompletionSchema.parse({
      build: { slots: [1, 2], name: "old" },
      targetBuildHash: "old",
      rapport: 10,
    })
    const incoming = companionCompletionSchema.parse({
      build: { slots: [3], name: "new" },
      targetBuildHash: "new",
      rapport: 5,
    })
    const merged = mergeCompanionCompletionForward(existing, incoming)
    expect(merged).toEqual(companionCompletionSchema.parse(merged))
    expect(merged?.build).toEqual({ slots: [3], name: "new" })
    expect(merged?.rapport).toBe(10)
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
