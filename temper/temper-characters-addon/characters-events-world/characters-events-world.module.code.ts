import { getEsoDayStringFromSec } from "@akasha/temper-dungeons/eso-reset"
import { ADDON_NAME } from "@akasha/temper-player-completion-state/completion-addon-constants"
import { getSavedVariables } from "@akasha/temper-player-completion-state/completion-saved-variables"
import { collectAllianceRank } from "../characters-alliance-rank/characters-alliance-rank.module.code.ts"
import { collectBagSize } from "../characters-bag-size/characters-bag-size.module.code.ts"
import { collectCadwell } from "../characters-cadwell/characters-cadwell.module.code.ts"
import {
  refreshAllCollectibles,
  updateCollectible,
} from "../characters-collectibles/characters-collectibles.module.code.ts"
import { currentCharacterEntry } from "../characters-current-entry/characters-current-entry.module.code.ts"
import {
  reconcileDailyWritStates,
  recordDailyWritCompletion,
} from "../characters-daily-writs/characters-daily-writs.module.code.ts"
import { collectGrandMasterStations } from "../characters-grand-master-stations/characters-grand-master-stations.module.code.ts"
import { collectMountTraining } from "../characters-mount-training/characters-mount-training.module.code.ts"
import {
  collectPointsOfInterest,
  updatePointOfInterest,
} from "../characters-points-of-interest/characters-points-of-interest.module.code.ts"
import { scheduleTaskAutoCompletionCheck } from "../characters-task-auto-complete/characters-task-auto-complete.module.code.ts"
import { refreshTaskHud } from "../characters-task-hud/characters-task-hud.module.code.ts"
import {
  refreshAllTributeCardUpgrades,
  updateTributeCardUpgrade,
} from "../characters-tribute-card-upgrades/characters-tribute-card-upgrades.module.code.ts"
import {
  collectZoneCompletion,
  updateZoneCompletionActivity,
} from "../characters-zone-completion/characters-zone-completion.module.code.ts"

function captureSmithingStations(this: void, craftSkill: number): undefined {
  if (!IsSmithingCraftingType(craftSkill)) return
  collectGrandMasterStations(craftSkill)
  scheduleTaskAutoCompletionCheck()
}

export function registerCompletionWorldEvents(): undefined {
  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_CadwellProgressionChanged",
    EVENT_CADWELL_PROGRESSION_LEVEL_CHANGED,
    function (this: void): undefined {
      collectCadwell()
      scheduleTaskAutoCompletionCheck()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_CollectibleUpdated",
    EVENT_COLLECTIBLE_UPDATED,
    function (this: void, _event: number, collectibleId: number): undefined {
      updateCollectible(collectibleId)
      scheduleTaskAutoCompletionCheck()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_CollectionUpdated",
    EVENT_COLLECTION_UPDATED,
    function (this: void): undefined {
      refreshAllCollectibles()
      scheduleTaskAutoCompletionCheck()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_TributeProgressionChanged",
    EVENT_TRIBUTE_PATRON_PROGRESSION_DATA_CHANGED,
    function (this: void, _event: number, patronId: number | undefined): undefined {
      if (patronId !== undefined && patronId !== 0) {
        updateTributeCardUpgrade(patronId)
      } else {
        refreshAllTributeCardUpgrades()
      }
      scheduleTaskAutoCompletionCheck()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_POIsInitialized",
    EVENT_POIS_INITIALIZED,
    function (this: void): undefined {
      collectZoneCompletion()
      collectPointsOfInterest()
      scheduleTaskAutoCompletionCheck()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_ZoneActivityCompleted",
    EVENT_TRACKED_ZONE_STORY_ACTIVITY_COMPLETED,
    function (
      this: void,
      _event: number,
      zoneId: number,
      completionType: number,
      activityId: number
    ): undefined {
      updateZoneCompletionActivity(zoneId, completionType, activityId)
      scheduleTaskAutoCompletionCheck()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_POIDiscovered",
    EVENT_POI_DISCOVERED,
    function (this: void, _event: number, zoneIndex: number, poiIndex: number): undefined {
      updatePointOfInterest(zoneIndex, poiIndex)
      scheduleTaskAutoCompletionCheck()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_RidingSkillImprovement",
    EVENT_RIDING_SKILL_IMPROVEMENT,
    function (this: void): undefined {
      collectMountTraining()
      scheduleTaskAutoCompletionCheck()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_BagCapacityChanged",
    EVENT_INVENTORY_BAG_CAPACITY_CHANGED,
    function (this: void): undefined {
      collectBagSize()
      scheduleTaskAutoCompletionCheck()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_RankPointUpdate",
    EVENT_RANK_POINT_UPDATE,
    function (this: void, _event: number, unitTag: string): undefined {
      if (unitTag !== "player") return
      collectAllianceRank()
      scheduleTaskAutoCompletionCheck()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_CraftingStationInteract",
    EVENT_CRAFTING_STATION_INTERACT,
    function (
      this: void,
      _event: number,
      craftSkill: number,
      _sameStation: boolean,
      craftMode: number
    ): undefined {
      if (craftMode !== CRAFTING_INTERACTION_MODE_CONSOLIDATED_STATION) return
      captureSmithingStations(craftSkill)
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_ConsolidatedSetsUpdated",
    EVENT_CONSOLIDATED_STATION_SETS_UPDATED,
    function (this: void): undefined {
      captureSmithingStations(GetCraftingInteractionType())
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_BankCapacityChanged",
    EVENT_INVENTORY_BANK_CAPACITY_CHANGED,
    function (
      this: void,
      _event: number,
      _previousCapacity: number,
      _currentCapacity: number,
      _previousUpgrade: number,
      currentUpgrade: number
    ): undefined {
      getSavedVariables().account.bankUpgrade = {
        current: currentUpgrade,
        max: GetMaxBankUpgrade(),
      }
      scheduleTaskAutoCompletionCheck()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_TradingHouseResponse",
    EVENT_TRADING_HOUSE_RESPONSE_RECEIVED,
    function (this: void, _eventCode: number, responseType: number, result: number): undefined {
      if (responseType !== TRADING_HOUSE_RESULT_POST_PENDING) return
      if (result !== TRADING_HOUSE_RESULT_SUCCESS) return
      getSavedVariables().guildSalesPostedDate = getEsoDayStringFromSec(GetTimeStamp())
      scheduleTaskAutoCompletionCheck()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_ZoneChanged",
    EVENT_ZONE_CHANGED,
    function (this: void): undefined {
      refreshTaskHud()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_QuestComplete",
    EVENT_QUEST_COMPLETE,
    function (
      this: void,
      _event: number,
      _questName: string,
      _level: number,
      _prevXP: number,
      _curXP: number,
      _championPts: number,
      questType: number,
      _zoneDisplayType: number
    ): undefined {
      if (questType !== QUEST_TYPE_CRAFTING) return
      const charEntry = currentCharacterEntry()
      if (charEntry === undefined) return
      recordDailyWritCompletion(charEntry)
      reconcileDailyWritStates(charEntry)
      scheduleTaskAutoCompletionCheck()
      refreshTaskHud()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_QuestAdded",
    EVENT_QUEST_ADDED,
    function (this: void): undefined {
      const charEntry = currentCharacterEntry()
      if (charEntry === undefined) return
      reconcileDailyWritStates(charEntry)
      refreshTaskHud()
    }
  )
}
