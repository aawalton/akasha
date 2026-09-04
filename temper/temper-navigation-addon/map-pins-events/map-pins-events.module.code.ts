import {
  onAchievementUpdate,
  onBookLearned,
  onSkyshardsUpdated,
} from "../map-pins-achievement-events/map-pins-achievement-events.module.code.ts"
import {
  onInteract,
  trackChestsRange,
} from "../map-pins-chest-capture/map-pins-chest-capture.module.code.ts"
import { scanInventory } from "../map-pins-inventory-scan/map-pins-inventory-scan.module.code.ts"
import { onLootReceived } from "../map-pins-item-events/map-pins-item-events.module.code.ts"
import { ADDON_NAME } from "../map-pins-names/map-pins-names.module.code.ts"
import {
  getSavedGlobal,
  getSavedVars,
} from "../map-pins-saved-variables/map-pins-saved-variables.module.code.ts"
import { getPinTypeId, STATE } from "../map-pins-state/map-pins-state.module.code.ts"

export function resizePins(this: void, minimap: boolean): undefined {
  if (BUI === undefined) return
  const unknownPoi = ZO_MapPin.PIN_DATA[getPinTypeId(8)]
  if (unknownPoi !== undefined) {
    unknownPoi.size = minimap ? (40 * BUI.Vars.PinScale) / 100 : 40
  }
  const fishingNodes = ZO_MapPin.PIN_DATA[getPinTypeId(17)]
  if (fishingNodes !== undefined) {
    fishingNodes.size = minimap ? 10 : getSavedGlobal().pinsize
  }
}

export function registerEvents(this: void): undefined {
  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME,
    EVENT_ACHIEVEMENT_UPDATED,
    (_eventCode, achievementId: number, _link: unknown) => onAchievementUpdate(achievementId)
  )
  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME,
    EVENT_ACHIEVEMENT_AWARDED,
    (_eventCode, _a: unknown, _b: unknown, achievementId: number, _link: unknown) =>
      onAchievementUpdate(achievementId)
  )
  if (getSavedVars()[3] === true) {
    EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_SKYSHARDS_UPDATED, onSkyshardsUpdated)
  } else {
    EVENT_MANAGER.UnregisterForEvent(ADDON_NAME, EVENT_SKYSHARDS_UPDATED)
  }
  if (getSavedVars()[5] === true) {
    EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_LORE_BOOK_LEARNED, onBookLearned)
  } else {
    EVENT_MANAGER.UnregisterForEvent(ADDON_NAME, EVENT_LORE_BOOK_LEARNED)
  }
  if (
    getSavedVars()[11] === true ||
    getSavedVars()[13] === true ||
    getSavedVars()[14] === true ||
    getSavedVars()[18] === true ||
    getSavedVars()[19] === true ||
    getSavedVars()[20] === true ||
    getSavedVars()[22] === true
  ) {
    scanInventory()
    EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_LOOT_RECEIVED, onLootReceived)
  } else {
    EVENT_MANAGER.UnregisterForEvent(ADDON_NAME, EVENT_LOOT_RECEIVED)
  }
  if (getSavedVars()[7] === true || getSavedVars()[15] === true) {
    EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_CLIENT_INTERACT_RESULT, onInteract)
  } else {
    EVENT_MANAGER.UnregisterForEvent(ADDON_NAME, EVENT_CLIENT_INTERACT_RESULT)
  }
  if (getSavedVars()[7] === true) {
    if (BUI !== undefined && BUI.name === "BanditsUserInterface") {
      CALLBACK_MANAGER.RegisterCallback("BUI_MiniMap_Update", trackChestsRange)
    } else {
      WORLD_MAP_SCENE.RegisterCallback("StateChange", (_oldState: unknown, newState: number) => {
        if (newState === SCENE_SHOWING) trackChestsRange()
      })
    }
  } else {
    CALLBACK_MANAGER.UnregisterCallback("BUI_MiniMap_Update")
    WORLD_MAP_SCENE.UnregisterCallback("StateChange")
  }
  if (getSavedVars()[8] === true && BUI !== undefined && BUI.name === "BanditsUserInterface") {
    CALLBACK_MANAGER.RegisterCallback("BUI_MiniMap_Shown", resizePins)
  } else {
    CALLBACK_MANAGER.UnregisterCallback("BUI_MiniMap_Shown")
  }
  if (getSavedVars()[15] === true) {
    for (let i = 1; i <= GetNumSkillLines(5); i++) {
      if (GetSkillAbilityId(5, i, 1, false) === 103478) {
        STATE.psijicSkillLine = i
        break
      }
    }
  }
}
