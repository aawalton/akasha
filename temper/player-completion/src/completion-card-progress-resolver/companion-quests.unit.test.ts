import { describe, expect, it } from "bun:test"
import type { CharacterCompletion } from "@temper/game-completion/completion-types"
import { companionQuestData } from "../companion-quest-data"
import { resolveTaskProgress } from "../completion-card-progress-resolver"

const ALL_COMPANION_QUEST_IDS: readonly number[] = companionQuestData.flatMap((g) =>
  g.quests.map((q) => q.questId)
)
const TOTAL_COMPANION_QUESTS = ALL_COMPANION_QUEST_IDS.length

const BASTIAN = companionQuestData.find((g) => g.companionId === "bastian")
if (BASTIAN === undefined)
  throw new Error("test fixture: bastian group missing from companionQuestData")
const BASTIAN_Q0 = BASTIAN.quests[0]
const BASTIAN_Q1 = BASTIAN.quests[1]
if (BASTIAN_Q0 === undefined || BASTIAN_Q1 === undefined)
  throw new Error("test fixture: bastian quests[0..1] missing from companionQuestData")

describe("resolveTaskProgress / companion-quests", () => {
  it("reports { 0, total } against the full static universe when charCompletion has no quests array", () => {
    const charCompletion: CharacterCompletion = {}
    const out = resolveTaskProgress("companion-quests", null, charCompletion, null)
    expect(out).toEqual({ current: 0, total: TOTAL_COMPANION_QUESTS })
  })

  it("reports { 0, total } when charCompletion is null", () => {
    expect(resolveTaskProgress("companion-quests", null, null, null)).toEqual({
      current: 0,
      total: TOTAL_COMPANION_QUESTS,
    })
  })

  it("counts the full set of completed quests across all companions when no itemPath given", () => {
    const charCompletion: CharacterCompletion = { quests: ALL_COMPANION_QUEST_IDS }
    const out = resolveTaskProgress("companion-quests", null, charCompletion, null)
    expect(out).toEqual({ current: TOTAL_COMPANION_QUESTS, total: TOTAL_COMPANION_QUESTS })
  })

  it("counts a partial set against the full total", () => {
    const charCompletion: CharacterCompletion = {
      quests: [BASTIAN_Q0.questId, BASTIAN_Q1.questId],
    }
    const out = resolveTaskProgress("companion-quests", null, charCompletion, null)
    expect(out).toEqual({ current: 2, total: TOTAL_COMPANION_QUESTS })
  })

  it("ignores quest IDs that are not companion quests", () => {
    const charCompletion: CharacterCompletion = { quests: [9999, 12345] }
    const out = resolveTaskProgress("companion-quests", null, charCompletion, null)
    expect(out).toEqual({ current: 0, total: TOTAL_COMPANION_QUESTS })
  })

  it("narrows to one companion when itemPath[0] is a companionId", () => {
    const charCompletion: CharacterCompletion = {
      quests: [BASTIAN_Q0.questId, 9999],
    }
    const out = resolveTaskProgress("companion-quests", ["bastian"], charCompletion, null)
    expect(out).toEqual({ current: 1, total: BASTIAN.quests.length })
  })

  it("treats an unknown companionId as a single unrecognized leaf ({ 0, 1 })", () => {
    const charCompletion: CharacterCompletion = { quests: ALL_COMPANION_QUEST_IDS }
    const out = resolveTaskProgress("companion-quests", ["not-a-companion"], charCompletion, null)
    expect(out).toEqual({ current: 0, total: 1 })
  })

  it("treats a numeric companionId (companionIds are strings) as a single unrecognized leaf", () => {
    const charCompletion: CharacterCompletion = { quests: ALL_COMPANION_QUEST_IDS }
    const out = resolveTaskProgress("companion-quests", [0], charCompletion, null)
    expect(out).toEqual({ current: 0, total: 1 })
  })
})

describe("resolveTaskProgress / companion-quests / object-shaped quests (Lua-serialized)", () => {
  it("counts the full set when quests is a Record<string, number>", () => {
    const questsObject: Record<string, number> = {}
    ALL_COMPANION_QUEST_IDS.forEach((id, i) => {
      questsObject[String(i + 1)] = id
    })
    const charCompletion: CharacterCompletion = { quests: questsObject }
    const out = resolveTaskProgress("companion-quests", null, charCompletion, null)
    expect(out).toEqual({ current: TOTAL_COMPANION_QUESTS, total: TOTAL_COMPANION_QUESTS })
  })

  it("counts a partial set when quests is a Record<string, number>", () => {
    const charCompletion: CharacterCompletion = {
      quests: { "1": BASTIAN_Q0.questId, "2": BASTIAN_Q1.questId },
    }
    const out = resolveTaskProgress("companion-quests", null, charCompletion, null)
    expect(out).toEqual({ current: 2, total: TOTAL_COMPANION_QUESTS })
  })

  it("narrows to one companion when itemPath[0] is a companionId and quests is a Record", () => {
    const charCompletion: CharacterCompletion = {
      quests: { "1": BASTIAN_Q0.questId, "2": 9999 },
    }
    const out = resolveTaskProgress("companion-quests", ["bastian"], charCompletion, null)
    expect(out).toEqual({ current: 1, total: BASTIAN.quests.length })
  })
})
