import { describe, expect, it } from "bun:test"
import { companions } from "@temper/game-companions-core/companions-data"
import type { CharacterCompletion } from "@temper/game-completion/completion-types"
import { MAX_COMPANION_RAPPORT } from "../companion-rapport"
import { resolveTaskProgress } from "../completion-card-progress-resolver"

const REAL_COMPANIONS = companions.list.filter((c) => c.esoCompanionId !== 0)
const TOTAL_RAPPORT = REAL_COMPANIONS.length * MAX_COMPANION_RAPPORT
const RAPPORT_COMPANION_ID_A = REAL_COMPANIONS[0]?.esoCompanionId
const RAPPORT_COMPANION_ID_B = REAL_COMPANIONS[1]?.esoCompanionId
if (RAPPORT_COMPANION_ID_A === undefined || RAPPORT_COMPANION_ID_B === undefined)
  throw new Error("test fixture: expected at least two real companions")

describe("resolveTaskProgress / companion-rapport-character", () => {
  it("returns 0/TOTAL_RAPPORT when charCompletion has no companionRapport (real character, no rapport logged yet)", () => {
    expect(resolveTaskProgress("companion-rapport-character", null, {}, null)).toEqual({
      current: 0,
      total: TOTAL_RAPPORT,
    })
  })

  it("returns 0/TOTAL_RAPPORT when charCompletion is null (parallel to resolveDailyWrits null-tolerance)", () => {
    expect(resolveTaskProgress("companion-rapport-character", null, null, null)).toEqual({
      current: 0,
      total: TOTAL_RAPPORT,
    })
  })

  it("item-level: returns 0/4000 when charCompletion has no companionRapport", () => {
    expect(
      resolveTaskProgress("companion-rapport-character", [RAPPORT_COMPANION_ID_A], {}, null)
    ).toEqual({ current: 0, total: MAX_COMPANION_RAPPORT })
  })

  it("card-level: zero rapport across the canonical roster", () => {
    const charCompletion: CharacterCompletion = { companionRapport: {} }
    const out = resolveTaskProgress("companion-rapport-character", null, charCompletion, null)
    expect(out).toEqual({ current: 0, total: TOTAL_RAPPORT })
  })

  it("card-level: all real companions at raw max (4000) totals to TOTAL_RAPPORT", () => {
    const rapport: Record<number, number> = {}
    for (const c of REAL_COMPANIONS) rapport[c.esoCompanionId] = MAX_COMPANION_RAPPORT
    const charCompletion: CharacterCompletion = { companionRapport: rapport }
    const out = resolveTaskProgress("companion-rapport-character", null, charCompletion, null)
    expect(out).toEqual({ current: TOTAL_RAPPORT, total: TOTAL_RAPPORT })
  })

  it("card-level: partial across two companions sums RAW points against full total", () => {
    const charCompletion: CharacterCompletion = {
      companionRapport: { [RAPPORT_COMPANION_ID_A]: 4000, [RAPPORT_COMPANION_ID_B]: 1000 },
    }
    const out = resolveTaskProgress("companion-rapport-character", null, charCompletion, null)
    expect(out).toEqual({ current: 5000, total: TOTAL_RAPPORT })
  })

  it("card-level: ignores entries for unknown companion IDs in the total", () => {
    const charCompletion: CharacterCompletion = {
      companionRapport: { [RAPPORT_COMPANION_ID_A]: 4000, 9999: 4000 },
    }
    const out = resolveTaskProgress("companion-rapport-character", null, charCompletion, null)
    expect(out).toEqual({ current: 4000, total: TOTAL_RAPPORT })
  })

  it("card-level: a within-tier raw gain increases card current (sub-tier gains register)", () => {
    const lower = resolveTaskProgress(
      "companion-rapport-character",
      null,
      { companionRapport: { [RAPPORT_COMPANION_ID_A]: 1000 } },
      null
    )
    const higher = resolveTaskProgress(
      "companion-rapport-character",
      null,
      { companionRapport: { [RAPPORT_COMPANION_ID_A]: 1145 } },
      null
    )
    if (lower === undefined || higher === undefined)
      throw new Error("test: card-level rapport resolution returned undefined")
    expect(higher.current - lower.current).toBe(145)
  })

  it("item-level: returns raw/4000 for a tracked companion", () => {
    const charCompletion: CharacterCompletion = {
      companionRapport: { [RAPPORT_COMPANION_ID_A]: 1000 },
    }
    const out = resolveTaskProgress(
      "companion-rapport-character",
      [RAPPORT_COMPANION_ID_A],
      charCompletion,
      null
    )
    expect(out).toEqual({ current: 1000, total: MAX_COMPANION_RAPPORT })
  })

  it("item-level: returns 0/4000 for an untracked but real companion", () => {
    const charCompletion: CharacterCompletion = { companionRapport: {} }
    const out = resolveTaskProgress(
      "companion-rapport-character",
      [RAPPORT_COMPANION_ID_A],
      charCompletion,
      null
    )
    expect(out).toEqual({ current: 0, total: MAX_COMPANION_RAPPORT })
  })

  it("item-level: returns undefined when itemPath[0] is a string", () => {
    const charCompletion: CharacterCompletion = {
      companionRapport: { [RAPPORT_COMPANION_ID_A]: 4000 },
    }
    const out = resolveTaskProgress(
      "companion-rapport-character",
      ["bastian"],
      charCompletion,
      null
    )
    expect(out).toBeUndefined()
  })
})
