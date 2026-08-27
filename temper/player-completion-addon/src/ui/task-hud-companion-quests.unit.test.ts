import { describe, expect, it } from "bun:test"
import type { TaskData } from "../saved-variables"
import {
  isCompanionQuestTask,
  pickFirstIncompleteCompanionQuest,
} from "./task-hud-companion-quests"

function task(cardId: string, completionItemPath?: (string | number)[]): TaskData {
  return {
    title: "x",
    scope: "today",
    sortOrder: 0,
    completionCardId: cardId,
    completionItemPath,
  }
}

describe("isCompanionQuestTask", () => {
  it("matches the companion-quests cardId", () => {
    expect(isCompanionQuestTask(task("companion-quests"))).toBe(true)
  })

  it("rejects other completion-card cardIds", () => {
    expect(isCompanionQuestTask(task("companion-rapport-character"))).toBe(false)
    expect(isCompanionQuestTask(task("cadwells-almanac"))).toBe(false)
    expect(isCompanionQuestTask(task("skill-lines"))).toBe(false)
  })

  it("ignores completionItemPath — predicate is cardId-only", () => {
    expect(isCompanionQuestTask(task("companion-quests", [1]))).toBe(true)
    expect(isCompanionQuestTask(task("companion-quests", []))).toBe(true)
  })
})

describe("pickFirstIncompleteCompanionQuest", () => {
  it("returns Azandar's starter when both inputs are undefined", () => {
    const result = pickFirstIncompleteCompanionQuest(undefined, undefined)
    expect(result?.companionName).toBe("Azandar")
    expect(result?.questName).toBe("The Fateweaver Key")
  })

  it("returns Azandar's starter when inputs are empty", () => {
    const result = pickFirstIncompleteCompanionQuest(new Set(), {})
    expect(result?.companionName).toBe("Azandar")
    expect(result?.questName).toBe("The Fateweaver Key")
  })

  it("skips Azandar's rapport-locked followup, walks to Bastian's starter", () => {
    const result = pickFirstIncompleteCompanionQuest(new Set([7021]), undefined)
    expect(result?.companionName).toBe("Bastian")
    expect(result?.questName).toBe("Competition and Contracts")
  })

  it("returns undefined when every starter is completed and no rapport anywhere", () => {
    const allStartersDone = new Set([6626, 6648, 6771, 6760, 7017, 7021, 7186, 7194])
    expect(pickFirstIncompleteCompanionQuest(allStartersDone, undefined)).toBeUndefined()
  })

  it("unlocks Bastian's level-5 followup when rapport reaches 5 (Azandar fully locked)", () => {
    const allStartersDone = new Set([6626, 6648, 6771, 6760, 7017, 7021, 7186, 7194])
    const result = pickFirstIncompleteCompanionQuest(allStartersDone, { 1: 1000 })
    expect(result?.companionName).toBe("Bastian")
    expect(result?.questName).toBe("Things Lost, Things Found")
  })

  it("walks past Azandar+Bastian+Ember+Isobel fully done, returns Mirri's first actionable followup at level 6", () => {
    const completed = new Set([
      7021, 7022, 7023, 7024, 6626, 6662, 6664, 6771, 6785, 6786, 6787, 6760, 6789, 6790, 6791,
      6648,
    ])
    const rapport: Record<number, number> = { 9: 4000, 1: 4000, 5: 4000, 6: 4000, 2: 2000 }
    const result = pickFirstIncompleteCompanionQuest(completed, rapport)
    expect(result?.companionName).toBe("Mirri")
    expect(result?.questName).toBe("A Mother's Obsession")
  })

  it("skips Ember entirely when Ember's starter is done and rapport is below 5", () => {
    const completed = new Set([7021, 7022, 7023, 7024, 6626, 6662, 6664, 6771])
    const rapport: Record<number, number> = { 9: 4000, 1: 4000, 5: 750 }
    const result = pickFirstIncompleteCompanionQuest(completed, rapport)
    expect(result?.companionName).toBe("Isobel")
    expect(result?.questName).toBe("Tournament of the Heart")
  })

  it("returns Bastian's level-6 third quest when only it remains (Azandar fully done)", () => {
    const completed = new Set([7021, 7022, 7023, 7024, 6626, 6662])
    const result = pickFirstIncompleteCompanionQuest(completed, { 9: 4000, 1: 2000 })
    expect(result?.companionName).toBe("Bastian")
    expect(result?.questName).toBe("Family Secrets")
  })

  it("returns undefined when every quest across every companion is complete", () => {
    const everyQuest = new Set([
      6626, 6662, 6664, 6648, 6666, 6667, 6771, 6785, 6786, 6787, 6760, 6789, 6790, 6791, 7017,
      7018, 7019, 7020, 7021, 7022, 7023, 7024, 7186, 7187, 7188, 7189, 7194, 7207, 7216, 7221,
    ])
    const maxAll: Record<number, number> = {
      1: 4000,
      2: 4000,
      5: 4000,
      6: 4000,
      8: 4000,
      9: 4000,
      12: 4000,
      13: 4000,
    }
    expect(pickFirstIncompleteCompanionQuest(everyQuest, maxAll)).toBeUndefined()
  })

  it("treats rapport exactly at threshold as unlocked (level 5 unlocks Bastian's level-5 quest with Azandar fully done)", () => {
    const completed = new Set([7021, 7022, 7023, 7024, 6626])
    const result = pickFirstIncompleteCompanionQuest(completed, { 9: 4000, 1: 1000 })
    expect(result?.companionName).toBe("Bastian")
    expect(result?.questName).toBe("Things Lost, Things Found")
  })

  it("treats rapport one below threshold as still locked (level 4 keeps Bastian's level-5 quest gated, walks past to Ember)", () => {
    const completed = new Set([7021, 7022, 7023, 7024, 6626])
    const result = pickFirstIncompleteCompanionQuest(completed, { 9: 4000, 1: 750 })
    expect(result?.companionName).toBe("Ember")
    expect(result?.questName).toBe("Tower Full of Trouble")
  })
})
