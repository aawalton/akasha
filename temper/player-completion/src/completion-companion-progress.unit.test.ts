import { describe, expect, it } from "bun:test"
import type { CharacterCompletion } from "@temper/game-completion/completion-types"
import { MAX_COMPANION_RAPPORT } from "./companion-rapport"
import {
  transformCharacterCompanionRapport,
  transformCompanionProgress,
} from "./completion-companion-progress"

const DEFID_BASTIAN = 1
const DEFID_MIRRI = 2

const NUM_REAL_COMPANIONS = 8
const TOTAL = NUM_REAL_COMPANIONS * MAX_COMPANION_RAPPORT

function charWith(companionRapport: Record<number, number>): CharacterCompletion {
  return { companionRapport } satisfies CharacterCompletion
}

describe("transformCharacterCompanionRapport — points, not tiers", () => {
  it("totalCount is 8 companions × MAX_COMPANION_RAPPORT (32000), matching the task", () => {
    const [progress] = transformCharacterCompanionRapport([
      { id: "char-1", completion: charWith({ [DEFID_BASTIAN]: 2009 }) },
    ])
    expect(progress?.totalCount).toBe(TOTAL)
  })

  it("per-companion rapport is the clamped raw points, not the 1-8 tier", () => {
    const [progress] = transformCharacterCompanionRapport([
      {
        id: "char-1",
        completion: charWith({ [DEFID_BASTIAN]: 2009, [DEFID_MIRRI]: MAX_COMPANION_RAPPORT }),
      },
    ])
    const bastian = progress?.entries.find((e) => e.companionId === "bastian")
    const mirri = progress?.entries.find((e) => e.companionId === "mirri")
    expect(bastian?.rapport).toBe(2009)
    expect(mirri?.rapport).toBe(MAX_COMPANION_RAPPORT)
  })

  it("clamps negative rapport to 0 and over-max to the max", () => {
    const [progress] = transformCharacterCompanionRapport([
      { id: "char-1", completion: charWith({ [DEFID_BASTIAN]: -2500, [DEFID_MIRRI]: 99999 }) },
    ])
    const bastian = progress?.entries.find((e) => e.companionId === "bastian")
    const mirri = progress?.entries.find((e) => e.companionId === "mirri")
    expect(bastian?.rapport).toBe(0)
    expect(mirri?.rapport).toBe(MAX_COMPANION_RAPPORT)
  })

  it("completedCount sums clamped points across companions", () => {
    const [progress] = transformCharacterCompanionRapport([
      { id: "char-1", completion: charWith({ [DEFID_BASTIAN]: 2009, [DEFID_MIRRI]: 1000 }) },
    ])
    expect(progress?.completedCount).toBe(3009)
  })
})

describe("transformCompanionProgress — rapport as points", () => {
  it("per-companion rapport is clamped raw points (max across characters)", () => {
    const { companionProgress } = transformCompanionProgress(
      [],
      [
        { completion: charWith({ [DEFID_BASTIAN]: 1500 }) },
        { completion: charWith({ [DEFID_BASTIAN]: 3200 }) },
      ]
    )
    const bastian = companionProgress.find((c) => c.companionId === "bastian")
    expect(bastian?.rapport).toBe(3200)
  })
})

describe("transformCompanionProgress — an unmeasured companion has no level", () => {
  it("emits no level when no companion row exists at all", () => {
    const { companionProgress } = transformCompanionProgress([], [])
    expect(companionProgress).toHaveLength(NUM_REAL_COMPANIONS)
    for (const entry of companionProgress) {
      expect(entry.level).toBeUndefined()
    }
  })

  it("emits no level for a row whose completion blob was never written", () => {
    const { companionProgress } = transformCompanionProgress(
      [{ companionId: "bastian", completion: null }],
      []
    )
    expect(companionProgress.find((c) => c.companionId === "bastian")?.level).toBeUndefined()
  })

  it("emits no level for an empty completion blob", () => {
    const { companionProgress } = transformCompanionProgress(
      [{ companionId: "bastian", completion: {} }],
      []
    )
    expect(companionProgress.find((c) => c.companionId === "bastian")?.level).toBeUndefined()
  })

  it("carries a real level through untouched", () => {
    const { companionProgress } = transformCompanionProgress(
      [{ companionId: "bastian", completion: { level: 12 } }],
      []
    )
    expect(companionProgress.find((c) => c.companionId === "bastian")?.level).toBe(12)
  })

  it("keeps a measured level of 0 rather than treating it as absent", () => {
    const { companionProgress } = transformCompanionProgress(
      [{ companionId: "bastian", completion: { level: 0 } }],
      []
    )
    expect(companionProgress.find((c) => c.companionId === "bastian")?.level).toBe(0)
  })

  it("still reports character-sourced rapport for a companion with no level", () => {
    const { companionProgress } = transformCompanionProgress(
      [{ companionId: "bastian", completion: {} }],
      [{ completion: charWith({ [DEFID_BASTIAN]: 3200 }) }]
    )
    const bastian = companionProgress.find((c) => c.companionId === "bastian")
    expect(bastian?.level).toBeUndefined()
    expect(bastian?.rapport).toBe(3200)
  })
})
