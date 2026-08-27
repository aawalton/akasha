import { describe, expect, it } from "bun:test"
import type { CharacterCompletion } from "@temper/game-completion/completion-types"
import { CHARACTER_PROGRESSION_CHECKERS } from "./character-progression-checkers"
import { companionQuestData } from "./companion-quest-data"
import { cadwellData } from "./generated/cadwell-data.generated"

const checker = CHARACTER_PROGRESSION_CHECKERS["cadwells-almanac"]
if (checker?.getItemPickerLevels === undefined) {
  throw new Error("cadwells-almanac checker is missing getItemPickerLevels")
}
const getItemPickerLevels = checker.getItemPickerLevels

describe("cadwells-almanac picker (static universe)", () => {
  it("enumerates every static level at depth 0 in data order", () => {
    const result = getItemPickerLevels([], [])
    expect(result?.options.map((o) => o.value)).toEqual(cadwellData.map((lv) => lv.level))
  })

  it("enumerates a level's zones from static data, independent of completions", () => {
    const lv = cadwellData[0]
    if (lv === undefined) throw new Error("fixture: cadwellData[0] missing")
    const result = getItemPickerLevels([], [lv.level])
    expect(result?.options.map((o) => o.value)).toEqual(lv.zones.map((z) => z.zoneIndex))
    expect(result?.options.map((o) => o.label)).toEqual(lv.zones.map((z) => z.name))
  })

  it("enumerates a zone's POIs from static data in data order", () => {
    const lv = cadwellData[0]
    const zone = lv?.zones[0]
    if (lv === undefined || zone === undefined)
      throw new Error("fixture: cadwellData[0].zones[0] missing")
    const result = getItemPickerLevels([], [lv.level, zone.zoneIndex])
    expect(result?.options.map((o) => o.value)).toEqual(zone.pois.map((p) => p.poiIndex))
    expect(result?.options.map((o) => o.label)).toEqual(zone.pois.map((p) => p.name))
  })

  it("returns the full static level set even when no completion carries cadwell data", () => {
    expect(getItemPickerLevels([], [])?.options.length).toBe(cadwellData.length)
  })
})

const companionQuestsChecker = CHARACTER_PROGRESSION_CHECKERS["companion-quests"]
if (!companionQuestsChecker) throw new Error("companion-quests checker missing")
const cqIsCardComplete = companionQuestsChecker.isCardComplete
const cqIsItemComplete = companionQuestsChecker.isItemComplete
if (!cqIsItemComplete) throw new Error("companion-quests checker missing isItemComplete")
const cqGetItemPickerLevels = companionQuestsChecker.getItemPickerLevels
if (!cqGetItemPickerLevels) throw new Error("companion-quests checker missing getItemPickerLevels")

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

const RAPPORT_RAW_MAX = 4000
const RAPPORT_RAW_TIER_5 = 1000
const RAPPORT_RAW_LOW = 0

const RAPPORT_ALL_MAX: Record<number, number> = {
  [DEFID_BASTIAN]: RAPPORT_RAW_MAX,
  [DEFID_MIRRI]: RAPPORT_RAW_MAX,
  [DEFID_EMBER]: RAPPORT_RAW_MAX,
  [DEFID_ISOBEL]: RAPPORT_RAW_MAX,
  [DEFID_SHARP]: RAPPORT_RAW_MAX,
  [DEFID_AZANDAR]: RAPPORT_RAW_MAX,
  [DEFID_TANLORIN]: RAPPORT_RAW_MAX,
  [DEFID_ZERITH]: RAPPORT_RAW_MAX,
}

const RAPPORT_ALL_LEVEL_5: Record<number, number> = {
  [DEFID_BASTIAN]: RAPPORT_RAW_TIER_5,
  [DEFID_MIRRI]: RAPPORT_RAW_TIER_5,
  [DEFID_EMBER]: RAPPORT_RAW_TIER_5,
  [DEFID_ISOBEL]: RAPPORT_RAW_TIER_5,
  [DEFID_SHARP]: RAPPORT_RAW_TIER_5,
  [DEFID_AZANDAR]: RAPPORT_RAW_TIER_5,
  [DEFID_TANLORIN]: RAPPORT_RAW_TIER_5,
  [DEFID_ZERITH]: RAPPORT_RAW_TIER_5,
}

function mkQuestChar(
  quests: CharacterCompletion["quests"],
  companionRapport?: Record<number, number>
): CharacterCompletion {
  return { quests, companionRapport } satisfies CharacterCompletion
}

describe("companion-quests checker", () => {
  describe("isCardComplete", () => {
    it("returns false when completion is null", () => {
      expect(cqIsCardComplete(null)).toBe(false)
    })

    it("returns false when completion has no quests field", () => {
      expect(cqIsCardComplete(mkQuestChar(undefined, RAPPORT_ALL_MAX))).toBe(false)
    })

    it("returns false when no quests are completed and rapport allows them all", () => {
      expect(cqIsCardComplete(mkQuestChar([], RAPPORT_ALL_MAX))).toBe(false)
    })

    it("returns false when only starters are done and rapport is level 5 (followups actionable)", () => {
      expect(cqIsCardComplete(mkQuestChar(STARTER_QUEST_IDS, RAPPORT_ALL_LEVEL_5))).toBe(false)
    })

    it("returns true when all starters are done and every followup is rapport-locked (low raw everywhere)", () => {
      const lowRapport: Record<number, number> = {
        [DEFID_BASTIAN]: RAPPORT_RAW_LOW,
        [DEFID_MIRRI]: RAPPORT_RAW_LOW,
        [DEFID_EMBER]: RAPPORT_RAW_LOW,
        [DEFID_ISOBEL]: RAPPORT_RAW_LOW,
        [DEFID_SHARP]: RAPPORT_RAW_LOW,
        [DEFID_AZANDAR]: RAPPORT_RAW_LOW,
        [DEFID_TANLORIN]: RAPPORT_RAW_LOW,
        [DEFID_ZERITH]: RAPPORT_RAW_LOW,
      }
      expect(cqIsCardComplete(mkQuestChar(STARTER_QUEST_IDS, lowRapport))).toBe(true)
    })

    it("returns true when every quest in companionQuestData is in the completed set", () => {
      expect(cqIsCardComplete(mkQuestChar(ALL_QUEST_IDS, RAPPORT_ALL_MAX))).toBe(true)
    })

    it("returns true when starters are done and missing companionRapport treats every companion as level 0", () => {
      expect(cqIsCardComplete(mkQuestChar(STARTER_QUEST_IDS, undefined))).toBe(true)
    })

    it("accepts object-shaped quests (Lua-table serialization) and treats every value as a completed quest ID", () => {
      const objectQuests: Record<string, number> = {}
      for (const [i, id] of STARTER_QUEST_IDS.entries()) {
        objectQuests[String(i + 1)] = id
      }
      expect(cqIsCardComplete(mkQuestChar(objectQuests, undefined))).toBe(true)
    })
  })

  describe("isItemComplete", () => {
    it("path length 1 (companion slug): true when every quest for that companion is done", () => {
      const allBastianDone = mkQuestChar([6626, 6662, 6664], RAPPORT_ALL_MAX)
      expect(cqIsItemComplete(allBastianDone, ["bastian"])).toBe(true)
    })

    it("path length 1 (companion slug): false when an actionable quest remains", () => {
      const starterOnly = mkQuestChar([6626], { [DEFID_BASTIAN]: RAPPORT_RAW_TIER_5 })
      expect(cqIsItemComplete(starterOnly, ["bastian"])).toBe(false)
    })

    it("path length 1: true when remaining quests are rapport-locked", () => {
      const starterOnlyLowRapport = mkQuestChar([6626], { [DEFID_BASTIAN]: RAPPORT_RAW_LOW })
      expect(cqIsItemComplete(starterOnlyLowRapport, ["bastian"])).toBe(true)
    })

    it("path length 2 (quest): true for a completed quest", () => {
      const c = mkQuestChar([6626], RAPPORT_ALL_MAX)
      expect(cqIsItemComplete(c, ["bastian", 6626])).toBe(true)
    })

    it("path length 2: true for an uncompleted but rapport-locked quest", () => {
      const c = mkQuestChar([], { [DEFID_BASTIAN]: RAPPORT_RAW_LOW })
      expect(cqIsItemComplete(c, ["bastian", 6662])).toBe(true)
    })

    it("path length 2: false for an actionable uncompleted quest", () => {
      const c = mkQuestChar([], { [DEFID_BASTIAN]: RAPPORT_RAW_TIER_5 })
      expect(cqIsItemComplete(c, ["bastian", 6662])).toBe(false)
    })

    it("returns false for null completion, empty path, or unknown slug", () => {
      expect(cqIsItemComplete(null, ["bastian"])).toBe(false)
      expect(cqIsItemComplete(mkQuestChar([], RAPPORT_ALL_MAX), [])).toBe(false)
      expect(cqIsItemComplete(mkQuestChar([], RAPPORT_ALL_MAX), ["not-a-companion"])).toBe(false)
    })
  })

  describe("getItemPickerLevels", () => {
    it("depth 0 returns Companion options for all 8 companions in name-ascending alphabetical order", () => {
      const result = cqGetItemPickerLevels([mkQuestChar([], RAPPORT_ALL_MAX)], [])
      expect(result?.label).toBe("Companion")
      expect(result?.options.map((o) => o.value)).toEqual([
        "azandar",
        "bastian",
        "ember",
        "isobel",
        "mirri",
        "sharp-as-night",
        "tanlorin",
        "zerith-var",
      ])
      expect(result?.options.map((o) => o.label)).toEqual([
        "Azandar",
        "Bastian",
        "Ember",
        "Isobel",
        "Mirri",
        "Sharp-as-Night",
        "Tanlorin",
        "Zerith-var",
      ])
    })

    it("depth 1 ('bastian') returns 3 quests with the right IDs and names", () => {
      const result = cqGetItemPickerLevels([mkQuestChar([], RAPPORT_ALL_MAX)], ["bastian"])
      expect(result?.label).toBe("Quest")
      expect(result?.options.map((o) => o.value)).toEqual([6626, 6662, 6664])
      expect(result?.options.map((o) => o.label)).toEqual([
        "Competition and Contracts",
        "Things Lost, Things Found",
        "Family Secrets",
      ])
    })

    it("depth 1 ('ember') returns 4 quests", () => {
      const result = cqGetItemPickerLevels([mkQuestChar([], RAPPORT_ALL_MAX)], ["ember"])
      expect(result?.options.map((o) => o.value)).toEqual([6771, 6785, 6786, 6787])
    })

    it("depth >= 2 returns null", () => {
      expect(
        cqGetItemPickerLevels([mkQuestChar([], RAPPORT_ALL_MAX)], ["bastian", 6626])
      ).toBeNull()
    })

    it("depth 1 with unknown slug returns null", () => {
      expect(
        cqGetItemPickerLevels([mkQuestChar([], RAPPORT_ALL_MAX)], ["not-a-companion"])
      ).toBeNull()
    })
  })
})
