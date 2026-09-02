import { getEsoDateString } from "@akasha/temper-formula-framework/eso-date"
import type { CompletionCardChecker } from "./completion-card-checker-types"
import type { CharacterCardId } from "./completion-card-registry"
import { questData } from "./generated/quest-data.generated"

const TOTAL_QUESTS = questData.reduce((sum, zone) => sum + zone.quests.length, 0)

export const CHARACTER_SIMPLE_CHECKERS: Partial<Record<CharacterCardId, CompletionCardChecker>> = {
  "character-level": {
    isCardComplete(completion) {
      if (!completion) return false
      return (completion.level ?? 0) >= 50
    },
  },

  "pack-upgrades": {
    isCardComplete(completion) {
      if (!completion) return false
      return (completion.bagSize ?? 0) >= 210
    },
  },

  quests: {
    isCardComplete(completion) {
      if (!completion) return false
      const quests = completion.quests
      if (!quests) return false
      const count = Array.isArray(quests) ? quests.length : Object.keys(quests).length
      return count >= TOTAL_QUESTS
    },
  },

  "daily-writs": {
    isCardComplete(completion) {
      if (!completion) return false
      const dw = completion.dailyWrits
      if (!dw) return false
      if (dw.date !== getEsoDateString()) return false
      return dw.completed >= 7
    },
    getItemProgress(completion) {
      const dw = completion?.dailyWrits
      if (!dw || dw.date !== getEsoDateString()) return { current: 0, total: 7 }
      return { current: dw.completed, total: 7 }
    },
  },

  "zone-completion": {
    isCardComplete(completion) {
      if (!completion) return false
      const zc = completion.zoneCompletion
      if (!zc) return false
      return false
    },
  },

  "points-of-interest": {
    isCardComplete(completion) {
      if (!completion) return false
      const poi = completion.pointsOfInterest
      if (!poi) return false
      return false
    },
  },

  "alliance-rank": {
    isCardComplete(completion) {
      if (!completion) return false
      return (completion.allianceRank ?? 0) >= 50
    },
  },
}
