import { describe, expect, it } from "bun:test"
import type { CompanionId } from "@temper/game-companions-core/companions-data"
import { MAX_COMPANION_RAPPORT } from "./companion-rapport"
import type { AccountQuestUnionProgress } from "./completion-account-union-progress"
import { buildCompanionSummary } from "./completion-summary-companion"
import type { CompanionProgressEntry } from "./completion-ui-types"

const EMPTY_QUEST_UNION: AccountQuestUnionProgress = {
  zones: [],
  completedCount: 0,
  totalCount: 0,
}

function companionEntry(
  companionId: CompanionId,
  name: string,
  rapport: number
): CompanionProgressEntry {
  return { companionId, name, level: 20, maxLevel: 20, rapport } satisfies CompanionProgressEntry
}

function unmeasuredCompanionEntry(
  companionId: CompanionId,
  name: string,
  rapport: number
): CompanionProgressEntry {
  return { companionId, name, maxLevel: 20, rapport } satisfies CompanionProgressEntry
}

describe("buildCompanionSummary — companion-rapport in points", () => {
  it("rapport total is companion-count × MAX_COMPANION_RAPPORT", () => {
    const progress = [
      companionEntry("bastian", "Bastian Hallix", 4000),
      companionEntry("mirri", "Mirri Elendis", 2009),
    ]
    const summary = buildCompanionSummary(progress, [], EMPTY_QUEST_UNION)
    expect(summary["companion-rapport"].total).toBe(2 * MAX_COMPANION_RAPPORT)
  })

  it("rapport count sums raw points across companions", () => {
    const progress = [
      companionEntry("bastian", "Bastian Hallix", 4000),
      companionEntry("mirri", "Mirri Elendis", 2009),
    ]
    const summary = buildCompanionSummary(progress, [], EMPTY_QUEST_UNION)
    expect(summary["companion-rapport"].count).toBe(6009)
  })
})

describe("buildCompanionSummary — companion-level counts only what was measured", () => {
  it("an unmeasured companion contributes neither numerator nor denominator", () => {
    const progress = [
      unmeasuredCompanionEntry("bastian", "Bastian Hallix", 0),
      unmeasuredCompanionEntry("mirri", "Mirri Elendis", 0),
    ]
    const summary = buildCompanionSummary(progress, [], EMPTY_QUEST_UNION)
    expect(summary["companion-level"]).toEqual({ count: 0, total: 0 })
  })

  it("a measured companion contributes both", () => {
    const progress = [companionEntry("bastian", "Bastian Hallix", 0)]
    const summary = buildCompanionSummary(progress, [], EMPTY_QUEST_UNION)
    expect(summary["companion-level"]).toEqual({ count: 20, total: 20 })
  })

  it("a mixed roster narrows the denominator to the measured companions", () => {
    const progress = [
      companionEntry("bastian", "Bastian Hallix", 0),
      unmeasuredCompanionEntry("mirri", "Mirri Elendis", 0),
    ]
    const summary = buildCompanionSummary(progress, [], EMPTY_QUEST_UNION)
    expect(summary["companion-level"]).toEqual({ count: 20, total: 20 })
  })

  it("a measured level of 0 still contributes its denominator", () => {
    const progress = [{ ...companionEntry("bastian", "Bastian Hallix", 0), level: 0 }]
    const summary = buildCompanionSummary(progress, [], EMPTY_QUEST_UNION)
    expect(summary["companion-level"]).toEqual({ count: 0, total: 20 })
  })

  it("leaves companion-rapport whole when levels are unmeasured", () => {
    const progress = [
      unmeasuredCompanionEntry("bastian", "Bastian Hallix", 4000),
      unmeasuredCompanionEntry("mirri", "Mirri Elendis", 2009),
    ]
    const summary = buildCompanionSummary(progress, [], EMPTY_QUEST_UNION)
    expect(summary["companion-rapport"]).toEqual({
      count: 6009,
      total: 2 * MAX_COMPANION_RAPPORT,
    })
  })
})
