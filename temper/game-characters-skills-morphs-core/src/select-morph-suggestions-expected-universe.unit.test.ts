import { describe, expect, it } from "bun:test"

import {
  DK_ARDENT_FLAME,
  DK_DRACONIC_POWER,
  defaultInput,
  lineOf,
  makeSkill,
} from "./_select-morph-suggestions-test-helpers"
import {
  type ExpectedMorphableSkillForSuggestion,
  selectMorphSuggestions,
} from "./select-morph-suggestions"

describe("selectMorphSuggestions — static expected universe", () => {
  it("surfaces an unpurchased-but-available skill (in expected, missing from skillLineProgress) as a rank-0 base entry", () => {
    const expected: ReadonlyArray<ExpectedMorphableSkillForSuggestion> = [
      {
        baseName: "unpurchased",
        morph1Name: "unpurchased-m1",
        morph2Name: "unpurchased-m2",
        skillType: "active",
        lineRankNeeded: 1,
      },
    ]
    const result = selectMorphSuggestions(
      defaultInput({
        skillLineProgress: {},
        expectedSkillsByEsoLineId: new Map([[DK_ARDENT_FLAME, expected]]),
        skillLineRanks: new Map([[DK_ARDENT_FLAME, 50]]),
      })
    )
    const names = result.suggestions?.map((e) => e.skillName) ?? []
    expect(names).toContain("unpurchased")
    const entry = result.suggestions?.find((e) => e.skillName === "unpurchased")
    expect(entry?.variant).toBe("base")
    expect(entry?.rank).toBe(0)
    expect(entry?.isEquipped).toBe(false)
    expect(entry?.isLineConflict).toBe(false)
    expect(entry?.isIncompatible).toBe(false)
  })

  it("excludes skills below their lineRankNeeded from suggestions and from completion", () => {
    const expected: ReadonlyArray<ExpectedMorphableSkillForSuggestion> = [
      {
        baseName: "too-high",
        morph1Name: "too-high-m1",
        morph2Name: "too-high-m2",
        skillType: "active",
        lineRankNeeded: 10,
      },
    ]
    const result = selectMorphSuggestions(
      defaultInput({
        skillLineProgress: {
          [DK_ARDENT_FLAME]: lineOf({
            10: makeSkill({
              base: { name: "too-high", rank: 0 },
              morph1: { name: "too-high-m1", rank: 0 },
              morph2: { name: "too-high-m2", rank: 0 },
              currentMorph: 0,
              abilityIndex: 1,
            }),
          }),
        },
        expectedSkillsByEsoLineId: new Map([[DK_ARDENT_FLAME, expected]]),
        skillLineRanks: new Map([[DK_ARDENT_FLAME, 5]]),
      })
    )
    expect(result.suggestions?.find((e) => e.skillName === "too-high")).toBeUndefined()
    expect(result.isComplete).toBe(true)
  })

  it("excludes skills on undiscovered lines (no skillLineRanks entry) from suggestions and completion", () => {
    const expected: ReadonlyArray<ExpectedMorphableSkillForSuggestion> = [
      {
        baseName: "undiscovered",
        morph1Name: "undiscovered-m1",
        morph2Name: "undiscovered-m2",
        skillType: "active",
        lineRankNeeded: 1,
      },
    ]
    const result = selectMorphSuggestions(
      defaultInput({
        skillLineProgress: {
          [DK_DRACONIC_POWER]: lineOf({
            10: makeSkill({
              base: { name: "undiscovered", rank: 0 },
              morph1: { name: "undiscovered-m1", rank: 0 },
              morph2: { name: "undiscovered-m2", rank: 0 },
              currentMorph: 0,
              abilityIndex: 1,
            }),
          }),
        },
        expectedSkillsByEsoLineId: new Map([[DK_DRACONIC_POWER, expected]]),
        skillLineRanks: new Map<number, number>(),
      })
    )
    expect(result.suggestions?.find((e) => e.skillName === "undiscovered")).toBeUndefined()
    expect(result.isComplete).toBe(true)
  })
})
