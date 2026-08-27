import { describe, expect, it } from "bun:test"
import { companionQuestData } from "./companion-quest-data"
import {
  isCompanionQuestActionable,
  isCompanionQuestPathComplete,
  pickFirstActionableCompanionQuest,
} from "./completion-companion-quest-actionability"

const DEFID_BASTIAN = 1
const DEFID_MIRRI = 2
const DEFID_EMBER = 5
const DEFID_ISOBEL = 6
const DEFID_SHARP = 8
const DEFID_AZANDAR = 9
const DEFID_TANLORIN = 12
const DEFID_ZERITH = 13

const STARTER_QUEST_IDS = [6626, 6648, 6760, 6771, 7017, 7021, 7186, 7194]
const ALL_QUEST_IDS = companionQuestData.flatMap((g) => g.quests.map((q) => q.questId))

const RAPPORT_ALL_MAX: Record<number, number> = {
  [DEFID_BASTIAN]: 4000,
  [DEFID_MIRRI]: 4000,
  [DEFID_EMBER]: 4000,
  [DEFID_ISOBEL]: 4000,
  [DEFID_SHARP]: 4000,
  [DEFID_AZANDAR]: 4000,
  [DEFID_TANLORIN]: 4000,
  [DEFID_ZERITH]: 4000,
}

const RAPPORT_ALL_LOCKED: Record<number, number> = {
  [DEFID_BASTIAN]: 0,
  [DEFID_MIRRI]: 0,
  [DEFID_EMBER]: 0,
  [DEFID_ISOBEL]: 0,
  [DEFID_SHARP]: 0,
  [DEFID_AZANDAR]: 0,
  [DEFID_TANLORIN]: 0,
  [DEFID_ZERITH]: 0,
}

describe("isCompanionQuestActionable", () => {
  it("is actionable when incomplete and no rapport requirement (starter)", () => {
    expect(isCompanionQuestActionable({ questId: 6626 }, new Set(), 0)).toBe(true)
  })

  it("is not actionable when already completed", () => {
    expect(isCompanionQuestActionable({ questId: 6626 }, new Set([6626]), 8)).toBe(false)
  })

  it("is not actionable when rapport is below the requirement", () => {
    expect(
      isCompanionQuestActionable({ questId: 6662, requiredRapportLevel: 5 }, new Set(), 4)
    ).toBe(false)
  })

  it("is actionable once rapport meets the requirement", () => {
    expect(
      isCompanionQuestActionable({ questId: 6662, requiredRapportLevel: 5 }, new Set(), 5)
    ).toBe(true)
  })
})

describe("pickFirstActionableCompanionQuest", () => {
  it("returns the companionName-ascending first actionable quest (Azandar before others)", () => {
    const pick = pickFirstActionableCompanionQuest(new Set(), RAPPORT_ALL_MAX)
    expect(pick?.companionName).toBe("Azandar")
  })

  it("returns undefined when every quest is completed", () => {
    expect(
      pickFirstActionableCompanionQuest(new Set(ALL_QUEST_IDS), RAPPORT_ALL_MAX)
    ).toBeUndefined()
  })

  it("returns undefined when starters are done and every followup is rapport-locked", () => {
    expect(
      pickFirstActionableCompanionQuest(new Set(STARTER_QUEST_IDS), RAPPORT_ALL_LOCKED)
    ).toBeUndefined()
  })

  it("missing rapport map treats every companion as level 0 (followups locked)", () => {
    expect(pickFirstActionableCompanionQuest(new Set(STARTER_QUEST_IDS), {})).toBeUndefined()
  })

  it("restricts the search to a single companion when companionId is given", () => {
    const pick = pickFirstActionableCompanionQuest(new Set(), RAPPORT_ALL_MAX, "bastian")
    expect(pick?.companionId).toBe("bastian")
  })

  it("returns undefined for a companion whose quests are all locked", () => {
    expect(
      pickFirstActionableCompanionQuest(new Set([6626]), { [DEFID_BASTIAN]: 0 }, "bastian")
    ).toBeUndefined()
  })

  it("derives the tier from RAW rapport — a tier-5 raw value (1145) does not unlock a tier-6 quest", () => {
    expect(
      pickFirstActionableCompanionQuest(new Set([6626, 6662]), { [DEFID_BASTIAN]: 1145 }, "bastian")
    ).toBeUndefined()
    expect(
      pickFirstActionableCompanionQuest(new Set([6626]), { [DEFID_BASTIAN]: 1145 }, "bastian")
        ?.questId
    ).toBe(6662)
  })
})

describe("isCompanionQuestPathComplete", () => {
  describe("card-level (no path)", () => {
    it("false when actionable quests remain", () => {
      expect(isCompanionQuestPathComplete(new Set(), RAPPORT_ALL_MAX)).toBe(false)
    })

    it("true when all done", () => {
      expect(isCompanionQuestPathComplete(new Set(ALL_QUEST_IDS), RAPPORT_ALL_MAX)).toBe(true)
    })

    it("true when starters done and the rest rapport-locked (the skip case)", () => {
      expect(isCompanionQuestPathComplete(new Set(STARTER_QUEST_IDS), RAPPORT_ALL_LOCKED)).toBe(
        true
      )
    })

    it("treats null/empty path identically to no path", () => {
      expect(isCompanionQuestPathComplete(new Set(ALL_QUEST_IDS), RAPPORT_ALL_MAX, [])).toBe(true)
      expect(isCompanionQuestPathComplete(new Set(ALL_QUEST_IDS), RAPPORT_ALL_MAX, null)).toBe(true)
    })
  })

  describe("companion-level (path length 1)", () => {
    it("true when that companion's quests are all done", () => {
      expect(
        isCompanionQuestPathComplete(new Set([6626, 6662, 6664]), RAPPORT_ALL_MAX, ["bastian"])
      ).toBe(true)
    })

    it("false when an actionable quest remains for that companion", () => {
      expect(
        isCompanionQuestPathComplete(new Set([6626]), { [DEFID_BASTIAN]: 1000 }, ["bastian"])
      ).toBe(false)
    })

    it("true when remaining quests are rapport-locked", () => {
      expect(
        isCompanionQuestPathComplete(new Set([6626]), { [DEFID_BASTIAN]: 0 }, ["bastian"])
      ).toBe(true)
    })

    it("false for an unknown companion slug", () => {
      expect(isCompanionQuestPathComplete(new Set(), RAPPORT_ALL_MAX, ["nobody"])).toBe(false)
    })
  })

  describe("quest-level (path length 2)", () => {
    it("true for a completed quest", () => {
      expect(
        isCompanionQuestPathComplete(new Set([6626]), RAPPORT_ALL_MAX, ["bastian", 6626])
      ).toBe(true)
    })

    it("true for an uncompleted but rapport-locked quest", () => {
      expect(
        isCompanionQuestPathComplete(new Set([6626]), { [DEFID_BASTIAN]: 0 }, ["bastian", 6662])
      ).toBe(true)
    })

    it("false for an uncompleted, unlocked quest", () => {
      expect(
        isCompanionQuestPathComplete(new Set([6626]), { [DEFID_BASTIAN]: 1000 }, ["bastian", 6662])
      ).toBe(false)
    })

    it("false for an unknown quest id", () => {
      expect(isCompanionQuestPathComplete(new Set(), RAPPORT_ALL_MAX, ["bastian", 999999])).toBe(
        false
      )
    })
  })
})
