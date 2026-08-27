import { ADDON_NAME } from "./constants"
import { getSavedVariables } from "./saved-variables"
import { scheduleTaskAutoCompletionCheck } from "./task-auto-complete"
import { updateAllianceRank } from "./tracking/alliance-rank"
import { updateBagSize } from "./tracking/bag-size"
import { refreshCadwellProgress } from "./tracking/cadwell"
import { refreshAllCollectibles, updateCollectible } from "./tracking/collectibles"
import {
  getEsoDateString,
  reconcileDailyWritStates,
  recordDailyWritCompletion,
} from "./tracking/daily-writs"
import { collectGrandMasterStations } from "./tracking/grand-master-stations"
import { updateMountTraining } from "./tracking/mount-training"
import { collectPointsOfInterest, updatePointOfInterest } from "./tracking/points-of-interest"
import {
  refreshAllTributeCardUpgrades,
  updateTributeCardUpgrade,
} from "./tracking/tribute-card-upgrades"
import { collectZoneCompletion, updateZoneCompletionActivity } from "./tracking/zone-completion"
import { RefreshTaskHUD } from "./ui/task-hud"
export function registerCompletionWorldEvents(): undefined {
  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_CadwellProgressionChanged",
    EVENT_CADWELL_PROGRESSION_LEVEL_CHANGED,
    function (this: void): undefined {
      refreshCadwellProgress()
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
      updateMountTraining()
      scheduleTaskAutoCompletionCheck()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_BagCapacityChanged",
    EVENT_INVENTORY_BAG_CAPACITY_CHANGED,
    function (this: void): undefined {
      updateBagSize()
      scheduleTaskAutoCompletionCheck()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_RankPointUpdate",
    EVENT_RANK_POINT_UPDATE,
    function (this: void, _event: number, unitTag: string): undefined {
      if (unitTag === "player") {
        updateAllianceRank()
        scheduleTaskAutoCompletionCheck()
      }
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
      if (
        craftMode === CRAFTING_INTERACTION_MODE_CONSOLIDATED_STATION &&
        IsSmithingCraftingType(craftSkill)
      ) {
        collectGrandMasterStations(craftSkill)
        scheduleTaskAutoCompletionCheck()
      }
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_ConsolidatedSetsUpdated",
    EVENT_CONSOLIDATED_STATION_SETS_UPDATED,
    function (this: void): undefined {
      const craftSkill = GetCraftingInteractionType()
      if (IsSmithingCraftingType(craftSkill)) {
        collectGrandMasterStations(craftSkill)
        scheduleTaskAutoCompletionCheck()
      }
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
      getSavedVariables().guildSalesPostedDate = getEsoDateString(GetTimeStamp())
      scheduleTaskAutoCompletionCheck()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_ZoneChanged",
    EVENT_ZONE_CHANGED,
    function (this: void): undefined {
      RefreshTaskHUD()
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
      const charEntry = getSavedVariables().characters[GetCurrentCharacterId()]
      if (charEntry === undefined) return
      recordDailyWritCompletion(charEntry)
      reconcileDailyWritStates(charEntry)
      scheduleTaskAutoCompletionCheck()
      RefreshTaskHUD()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_QuestAdded",
    EVENT_QUEST_ADDED,
    function (this: void): undefined {
      const charEntry = getSavedVariables().characters[GetCurrentCharacterId()]
      if (charEntry === undefined) return
      reconcileDailyWritStates(charEntry)
      RefreshTaskHUD()
    }
  )
}
