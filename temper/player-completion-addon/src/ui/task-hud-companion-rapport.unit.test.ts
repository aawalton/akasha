import { describe, expect, it } from "bun:test"
import type { TaskData } from "../saved-variables"
import {
  COMPANION_RAPPORT_POINTS_MAX,
  isCompanionRapportTask,
  pickFirstIncompleteCompanionRapport,
} from "./task-hud-companion-rapport"

const RAPPORT_RAW_MAX = 4000
const RAPPORT_RAW_ABOVE_MAX = 5200
const RAPPORT_RAW_NEAR_MAX = 3000
const RAPPORT_RAW_MID = 1000

function task(cardId: string, completionItemPath?: (string | number)[]): TaskData {
  return {
    title: "x",
    scope: "today",
    sortOrder: 0,
    completionCardId: cardId,
    completionItemPath,
  }
}

describe("isCompanionRapportTask", () => {
  it("matches the companion-rapport-character cardId", () => {
    expect(isCompanionRapportTask(task("companion-rapport-character"))).toBe(true)
  })

  it("rejects other completion-card cardIds", () => {
    expect(isCompanionRapportTask(task("companion-rapport"))).toBe(false)
    expect(isCompanionRapportTask(task("cadwells-almanac"))).toBe(false)
    expect(isCompanionRapportTask(task("skill-lines"))).toBe(false)
  })

  it("ignores completionItemPath — predicate is cardId-only", () => {
    expect(isCompanionRapportTask(task("companion-rapport-character", [1]))).toBe(true)
    expect(isCompanionRapportTask(task("companion-rapport-character", []))).toBe(true)
  })
})

describe("pickFirstIncompleteCompanionRapport", () => {
  it("returns Azandar first when rapport is undefined (no rapport logged yet — Erin Solstice case)", () => {
    const result = pickFirstIncompleteCompanionRapport(undefined)
    expect(result?.companionName).toBe("Azandar")
    expect(result?.sources).toEqual(["Enchanting Writ Daily", "Necrom Delve Daily"])
    expect(result?.currentPoints).toBe(0)
  })

  it("returns undefined when all 8 companions are at raw max (4000 points)", () => {
    const allMax: Record<number, number> = {
      1: RAPPORT_RAW_MAX,
      2: RAPPORT_RAW_MAX,
      5: RAPPORT_RAW_MAX,
      6: RAPPORT_RAW_MAX,
      8: RAPPORT_RAW_MAX,
      9: RAPPORT_RAW_MAX,
      12: RAPPORT_RAW_MAX,
      13: RAPPORT_RAW_MAX,
    }
    expect(pickFirstIncompleteCompanionRapport(allMax)).toBeUndefined()
  })

  it("treats rapport above the 4000 cap as complete (clamped — only first 4000 counts)", () => {
    const allAboveMax: Record<number, number> = {
      1: RAPPORT_RAW_ABOVE_MAX,
      2: RAPPORT_RAW_ABOVE_MAX,
      5: RAPPORT_RAW_ABOVE_MAX,
      6: RAPPORT_RAW_ABOVE_MAX,
      8: RAPPORT_RAW_ABOVE_MAX,
      9: RAPPORT_RAW_ABOVE_MAX,
      12: RAPPORT_RAW_ABOVE_MAX,
      13: RAPPORT_RAW_ABOVE_MAX,
    }
    expect(pickFirstIncompleteCompanionRapport(allAboveMax)).toBeUndefined()
  })

  it("returns Azandar first when all companions are at level 0", () => {
    const result = pickFirstIncompleteCompanionRapport({})
    expect(result).toBeDefined()
    expect(result?.companionName).toBe("Azandar")
    expect(result?.sources).toEqual(["Enchanting Writ Daily", "Necrom Delve Daily"])
  })

  it("skips Azandar when at raw max, returns Bastian next (alphabetical)", () => {
    const result = pickFirstIncompleteCompanionRapport({ 9: RAPPORT_RAW_MAX })
    expect(result?.companionName).toBe("Bastian")
    expect(result?.sources).toEqual(["Mages Guild Daily"])
  })

  it("walks alphabetical order — returns Ember when Azandar + Bastian complete", () => {
    const rapport: Record<number, number> = {
      9: RAPPORT_RAW_MAX,
      1: RAPPORT_RAW_MAX,
    }
    const result = pickFirstIncompleteCompanionRapport(rapport)
    expect(result?.companionName).toBe("Ember")
    expect(result?.sources).toEqual([
      "Mages Guild Daily",
      "Thieves Guild Heist Daily",
      "High Isle Delve Daily",
    ])
  })

  it("returns Zerith-var last when only Zerith-var remains incomplete", () => {
    const rapport: Record<number, number> = {
      1: RAPPORT_RAW_MAX,
      2: RAPPORT_RAW_MAX,
      5: RAPPORT_RAW_MAX,
      6: RAPPORT_RAW_MAX,
      8: RAPPORT_RAW_MAX,
      9: RAPPORT_RAW_MAX,
      12: RAPPORT_RAW_MAX,
      13: RAPPORT_RAW_MID,
    }
    const result = pickFirstIncompleteCompanionRapport(rapport)
    expect(result?.companionName).toBe("Zerith-var")
    expect(result?.sources).toEqual([
      "Northern Elsweyr Defense Force Daily",
      "Tales of Tribute Daily",
    ])
  })

  it("treats missing defId entry as 0 points (still incomplete)", () => {
    const result = pickFirstIncompleteCompanionRapport({ 9: RAPPORT_RAW_MID })
    expect(result?.companionName).toBe("Azandar")
    expect(result?.currentPoints).toBe(1000)
  })

  it("treats explicit raw just below max as incomplete, reporting clamped points", () => {
    const result = pickFirstIncompleteCompanionRapport({ 9: RAPPORT_RAW_NEAR_MAX })
    expect(result?.companionName).toBe("Azandar")
    expect(result?.currentPoints).toBe(RAPPORT_RAW_NEAR_MAX)
    expect(RAPPORT_RAW_NEAR_MAX).toBeLessThan(COMPANION_RAPPORT_POINTS_MAX)
  })

  it("Sharp-as-Night uses the canonical hyphenated display name", () => {
    const rapport: Record<number, number> = {
      9: RAPPORT_RAW_MAX,
      1: RAPPORT_RAW_MAX,
      5: RAPPORT_RAW_MAX,
      6: RAPPORT_RAW_MAX,
      2: RAPPORT_RAW_MAX,
    }
    const result = pickFirstIncompleteCompanionRapport(rapport)
    expect(result?.companionName).toBe("Sharp-as-Night")
    expect(result?.sources).toEqual(["Ashlander Hunt Daily", "Necrom World Boss Daily"])
  })
})
