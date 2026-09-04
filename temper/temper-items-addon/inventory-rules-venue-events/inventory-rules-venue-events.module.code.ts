import {
  flushJunkGate,
  openJunkGate,
} from "../inventory-junk-queue/inventory-junk-queue.module.code.ts"
import { onQuestRemoved } from "../inventory-quest-annotations/inventory-quest-annotations.module.code.ts"
import { releaseConfirmDialog } from "../inventory-rules-core-confirm-dialog/inventory-rules-core-confirm-dialog.module.code.ts"
import { onOpenTradingHouse } from "../inventory-rules-dispatch/inventory-rules-dispatch.module.code.ts"
import { onOpenCraftingStation } from "../inventory-rules-dispatch-guild-crafting/inventory-rules-dispatch-guild-crafting.module.code.ts"
import { onOpenMailbox } from "../inventory-rules-dispatch-mail/inventory-rules-dispatch-mail.module.code.ts"
import {
  onOpenFence,
  onOpenStore,
} from "../inventory-rules-dispatch-vendor/inventory-rules-dispatch-vendor.module.code.ts"
import { onTradingHouseClosed } from "../inventory-rules-list/inventory-rules-list.module.code.ts"
import { invalidateScribingKnowledgeCache } from "../inventory-scribing-knowledge/inventory-scribing-knowledge.module.code.ts"
import {
  clearWritCraftQueue,
  onWritCraftCompleted,
} from "../inventory-writ-crafting-queue/inventory-writ-crafting-queue.module.code.ts"
export function registerVenueDispatchEvents(ns: string): undefined {
  EVENT_MANAGER.RegisterForEvent(
    `${ns}_OpenStore`,
    EVENT_OPEN_STORE,
    function (this: void): undefined {
      openJunkGate()
      onOpenStore()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_OpenFence`,
    EVENT_OPEN_FENCE,
    function (
      this: void,
      _eventCode: number,
      allowSell: boolean,
      allowLaunder: boolean
    ): undefined {
      openJunkGate()
      onOpenFence(allowSell, allowLaunder)
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_CraftingStation`,
    EVENT_CRAFTING_STATION_INTERACT,
    function (this: void): undefined {
      onOpenCraftingStation()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_OpenMailbox`,
    EVENT_MAIL_OPEN_MAILBOX,
    function (this: void): undefined {
      onOpenMailbox()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_OpenTradingHouse`,
    EVENT_OPEN_TRADING_HOUSE,
    function (this: void): undefined {
      onOpenTradingHouse()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_CloseTradingHouse`,
    EVENT_CLOSE_TRADING_HOUSE,
    function (this: void): undefined {
      onTradingHouseClosed()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_CloseStore`,
    EVENT_CLOSE_STORE,
    function (this: void): undefined {
      flushJunkGate()
      releaseConfirmDialog()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_CloseCraftingStation`,
    EVENT_END_CRAFTING_STATION_INTERACT,
    function (this: void): undefined {
      clearWritCraftQueue()
      releaseConfirmDialog()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_QuestRemoved`,
    EVENT_QUEST_REMOVED,
    function (
      this: void,
      _eventCode: number,
      isCompleted: boolean,
      _journalIndex: number,
      _questName: string,
      zoneIndex: number,
      poiIndex: number,
      questID: number
    ): undefined {
      onQuestRemoved(isCompleted, zoneIndex, poiIndex, questID)
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_ScriptLockStateChanged`,
    EVENT_CRAFTED_ABILITY_SCRIPT_LOCK_STATE_CHANGED,
    function (this: void): undefined {
      invalidateScribingKnowledgeCache()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_CraftCompleted`,
    EVENT_CRAFT_COMPLETED,
    onWritCraftCompleted
  )
}
