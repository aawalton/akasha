import {
  getUniqueEntry,
  itemCacheAdd,
  itemCacheBuildMasterLists,
  itemCacheRemove,
} from "akasha/temper/lost-treasure/modules/lost-treasure-bag-cache/lost-treasure-bag-cache.module.code.ts"
import {
  ADDON_NAME,
  LOST_TREASURE_MARK_OPTIONS_INVENTORY,
  LOST_TREASURE_PIN_TYPE_DATA,
  LOST_TREASURE_PIN_TYPE_TREASURE,
} from "akasha/temper/lost-treasure/modules/lost-treasure-constants/lost-treasure-constants.module.code.ts"
import { createLogger } from "akasha/temper/lost-treasure/modules/lost-treasure-logger/lost-treasure-logger.module.code.ts"
import {
  markOnUsingDoesExist,
  markOnUsingRemove,
} from "akasha/temper/lost-treasure/modules/lost-treasure-mark-on-using/lost-treasure-mark-on-using.module.code.ts"
import { miningIsActive } from "akasha/temper/lost-treasure/modules/lost-treasure-mining/lost-treasure-mining.module.code.ts"
import * as lostTreasure from "akasha/temper/lost-treasure/modules/lost-treasure-opened-map/lost-treasure-opened-map.module.code.ts"
import { getSettingsFromPinType } from "akasha/temper/lost-treasure/modules/lost-treasure-pin-settings/lost-treasure-pin-settings.module.code.ts"
import * as pins from "akasha/temper/lost-treasure/modules/lost-treasure-pins/lost-treasure-pins.module.code.ts"
import type { SlotData } from "akasha/temper/lost-treasure/modules/lost-treasure-types/lost-treasure-types.module.code.ts"
import { isTreasureOrSurveyItemType } from "akasha/temper/lost-treasure/modules/lost-treasure-utilities/lost-treasure-utilities.module.code.ts"

const logger = createLogger("itemCache")

const HIDE_MINI_MAP = true
const MINIMAP_FADE_DURATION = ZO_ONE_SECOND_IN_MILLISECONDS

interface SlotUpdateTally {
  count: number
  totalMs: number
  maxMs: number
}

const MASTER_LIST: SlotUpdateTally = { count: 0, totalMs: 0, maxMs: 0 }
const PIN_REFRESH: SlotUpdateTally = { count: 0, totalMs: 0, maxMs: 0 }

function tally(this: void, into: SlotUpdateTally, ms: number): undefined {
  into.count = into.count + 1
  into.totalMs = into.totalMs + ms
  if (ms > into.maxMs) {
    into.maxMs = ms
  }
}

function tallySaid(this: void, label: string, held: SlotUpdateTally): string {
  return `  ${label}: n=${held.count} total=${held.totalMs}ms max=${held.maxMs}ms`
}

function reportSlotUpdateStats(this: void): undefined {
  d("[LostTreasure] backpack slot-update handler since load:")
  d(tallySaid("masterList", MASTER_LIST))
  d(tallySaid("pinRefresh", PIN_REFRESH))
}

function slotAdded(this: void, bagId: number, slotIndex: number, newSlotData: SlotData): undefined {
  if (bagId !== BAG_BACKPACK) {
    return
  }

  const specializedItemType = newSlotData.specializedItemType
  if (isTreasureOrSurveyItemType(specializedItemType)) {
    const itemId = GetItemId(bagId, slotIndex)
    const uniqueId = GetItemUniqueId(bagId, slotIndex)
    const itemLink = GetItemLink(bagId, slotIndex, LINK_STYLE_DEFAULT)
    if (uniqueId !== undefined) {
      itemCacheAdd(itemId, uniqueId, itemLink)
    }

    for (const [pinType, pinData] of pairs(LOST_TREASURE_PIN_TYPE_DATA)) {
      if (pinData.specializedItemType === specializedItemType) {
        const markOption = getSettingsFromPinType(pinType, "markOption")
        if (markOption === LOST_TREASURE_MARK_OPTIONS_INVENTORY) {
          pins.refreshAllPinsFromPinType(pinType)
        }
        break
      }
    }

    logger.Debug("%s added to your backpack cache. itemLink: %s", newSlotData.name, itemLink)
  } else {
    logger.Verbose("%s added to your backpack", newSlotData.name)
  }
}

function requestHidingMiniMap(this: void, itemId: number, interactionType: number): undefined {
  const lastOpenedItemId = lostTreasure.isLastOpenedItemId(itemId)
  logger.Debug("isLastOpenedTreasureMap: %s", tostring(lastOpenedItemId))
  if (lastOpenedItemId) {
    lostTreasure.processQueue(
      undefined,
      function (this: void): undefined {
        lostTreasure.updateVisibility(HIDE_MINI_MAP, MINIMAP_FADE_DURATION)
      },
      interactionType
    )
  }
}

function requestHidingPins(
  this: void,
  specializedItemType: number,
  itemId: number,
  interactionType: number,
  oldSlotData: SlotData
): undefined {
  for (const [pinType, pinData] of pairs(LOST_TREASURE_PIN_TYPE_DATA)) {
    if (pinData.specializedItemType === specializedItemType) {
      if (markOnUsingDoesExist(pinType, itemId)) {
        markOnUsingRemove(pinType, itemId)
      }

      const itemData = itemCacheRemove(oldSlotData.uniqueId)
      if (itemData !== undefined && itemData.itemLink !== undefined) {
        lostTreasure.processQueue(
          pinType,
          function (this: void): undefined {
            lostTreasure.refreshPinTypePins(pinType)
          },
          interactionType
        )

        if (miningIsActive()) {
          const sceneName = SCENE_MANAGER.GetCurrentSceneName()
          logger.Debug(
            "%s removed from backpack. interactionType %d, sceneName: %s, specializedItemType: %d, itemId: %d",
            oldSlotData.name,
            interactionType,
            sceneName,
            specializedItemType,
            itemId
          )

          lostTreasure.requestReport(
            pinType,
            interactionType,
            itemData.itemId,
            oldSlotData.name,
            itemData.itemLink,
            sceneName
          )
        } else {
          logger.Debug("mining is not active, no report will be requested")
        }
      }
    }
  }
}

function slotRemoved(this: void, bagId: number, oldSlotData: SlotData): undefined {
  if (bagId !== BAG_BACKPACK) {
    return
  }

  const specializedItemType = oldSlotData.specializedItemType
  if (isTreasureOrSurveyItemType(specializedItemType)) {
    const [uniqueEntry] = getUniqueEntry(oldSlotData.uniqueId)
    if (uniqueEntry !== undefined) {
      const itemId = uniqueEntry.itemId
      const interactionType = GetInteractionType()
      requestHidingMiniMap(itemId, interactionType)
      requestHidingPins(specializedItemType, itemId, interactionType, oldSlotData)
    }
  }
}

export function initializeItemCache(this: void): undefined {
  itemCacheBuildMasterLists()

  SHARED_INVENTORY.RegisterCallback(
    "SlotAdded",
    function (this: void, bagId: number, slotIndex: number, newSlotData: SlotData): undefined {
      slotAdded(bagId, slotIndex, newSlotData)
    }
  )
  SHARED_INVENTORY.RegisterCallback(
    "SlotRemoved",
    function (this: void, bagId: number, _slotIndex: number, oldSlotData: SlotData): undefined {
      slotRemoved(bagId, oldSlotData)
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ADDON_NAME}_TemporaryFix`,
    EVENT_INVENTORY_SINGLE_SLOT_UPDATE,
    function (this: void, _eventCode: number, bagId: number): undefined {
      if (bagId !== BAG_BACKPACK) {
        return
      }
      const masterStart = GetGameTimeMilliseconds()
      itemCacheBuildMasterLists()
      tally(MASTER_LIST, GetGameTimeMilliseconds() - masterStart)
      lostTreasure.processQueue(
        LOST_TREASURE_PIN_TYPE_TREASURE,
        function (this: void): undefined {
          const refreshStart = GetGameTimeMilliseconds()
          lostTreasure.refreshPinTypePins(LOST_TREASURE_PIN_TYPE_TREASURE)
          tally(PIN_REFRESH, GetGameTimeMilliseconds() - refreshStart)
        },
        "EVENT_INVENTORY_SINGLE_SLOT_UPDATE"
      )
    }
  )

  SLASH_COMMANDS["/ltstats"] = reportSlotUpdateStats

  logger.Debug("initialized")
}
