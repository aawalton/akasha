import "@akasha/temper-eso-types/eso-api"
import "@akasha/temper-eso-types/eso-event-manager"
import "@akasha/temper-eso-types/eso-events"
import "@akasha/temper-eso-types/eso-extra"
import "@akasha/temper-eso-types/eso-functions-01"
import "@akasha/temper-eso-types/eso-functions-08"
import "@akasha/temper-eso-types/eso-globals"
import "@akasha/temper-eso-types/tstl-eso-sandbox"
import "../housing-ptf-publish/housing-ptf-publish.module.code.ts"

import "../housing-chat-capture/housing-chat-capture.module.code.ts"
import "../housing-comboboxes/housing-comboboxes.module.code.ts"
import "../housing-context-menu/housing-context-menu.module.code.ts"
import "../housing-dropdowns/housing-dropdowns.module.code.ts"
import "../housing-favorites-helpers/housing-favorites-helpers.module.code.ts"
import "../housing-favorites-render/housing-favorites-render.module.code.ts"
import "../housing-house-list/housing-house-list.module.code.ts"
import "../housing-hover/housing-hover.module.code.ts"
import "../housing-library-lookup/housing-library-lookup.module.code.ts"
import "../housing-library-tab/housing-library-tab.module.code.ts"
import "../housing-my-houses/housing-my-houses.module.code.ts"
import "../housing-porting/housing-porting.module.code.ts"
import "../housing-search/housing-search.module.code.ts"
import "../housing-settings-menu/housing-settings-menu.module.code.ts"
import "../housing-slash/housing-slash.module.code.ts"
import "../housing-sliders/housing-sliders.module.code.ts"
import "../housing-tabs/housing-tabs.module.code.ts"
import "../housing-visit-card-send/housing-visit-card-send.module.code.ts"
import "../housing-visit-cards-interact/housing-visit-cards-interact.module.code.ts"
import "../housing-visit-cards-render/housing-visit-cards-render.module.code.ts"
import "../housing-visit-cards-view/housing-visit-cards-view.module.code.ts"
import "../housing-window-controls/housing-window-controls.module.code.ts"

import { isObjectRecord } from "@akasha/utils-narrow/is-object-record"
import { buildHouseTab } from "../housing-build-house-tab/housing-build-house-tab.module.code.ts"
import { buildLibraryTab } from "../housing-build-library-tab/housing-build-library-tab.module.code.ts"
import { buildMyHousesTab } from "../housing-build-my-houses-tab/housing-build-my-houses-tab.module.code.ts"
import { buildVcTab } from "../housing-build-visit-cards-tab/housing-build-visit-cards-tab.module.code.ts"
import { buildWindow } from "../housing-build-window/housing-build-window.module.code.ts"
import {
  SAVED_VARS_NAME,
  SAVED_VARS_VERSION,
  SLASH_CMD,
} from "../housing-constants/housing-constants.module.code.ts"
import { portToFriend } from "../housing-state/housing-state.module.code.ts"
import type { SavedVars } from "../housing-types/housing-types.module.code.ts"
import { registerUiStrings } from "../housing-ui-strings/housing-ui-strings.module.code.ts"

registerUiStrings()

function parseLuaCapture(this: void, captured: string | undefined): string | undefined {
  return captured
}

function ptfSlashCommand(this: void, param: string): undefined {
  d(portToFriend.slashCmd + " " + param)
  const trimmed = zo_strtrim(param)
  const [cmd, rest] = portToFriend.ParseCmd("", trimmed)

  if (cmd === "port") {
    const [lastWordCapture] = string.match(rest, ".* ()")
    const lastWordRaw = parseLuaCapture(lastWordCapture)
    const lastWordIndex = lastWordRaw !== undefined ? tonumber(lastWordRaw) : undefined
    if (lastWordIndex !== undefined) {
      const index = tonumber(string.sub(rest, lastWordIndex))
      if (index !== undefined) {
        let target = zo_strtrim(string.sub(rest, 0, lastWordIndex - 1))
        if (target === GetUnitName("player")) {
          target = GetDisplayName()
        }
        portToFriend.JumpToHouse(target, index)
      } else {
        portToFriend.JumpToDefaultHouse(rest)
      }
    } else {
      portToFriend.JumpToDefaultHouse(rest)
    }
  } else if (cmd === "show") {
    for (const [key, house] of pairs(portToFriend.HOUSES)) {
      if (house !== undefined) {
        d(tostring(key) + ": " + house)
      }
    }
  } else if (cmd === "open") {
    portToFriend.OpenWindow()
  } else if (cmd === "fav") {
    const favId = tonumber(rest)
    if (favId !== undefined && favId > 0) {
      portToFriend.PortToFavoriteBinding(favId)
    } else {
      d(portToFriend.constants.INVALID_FAVORITE_ID ?? "")
    }
  } else if (cmd === "favi") {
    const favId = tonumber(rest)
    if (favId !== undefined && favId > 0) {
      portToFriend.PortToMyHouseBinding(favId, portToFriend.constants.PORT_TYPE_INSIDE)
    } else {
      d(portToFriend.constants.INVALID_FAVORITE_ID ?? "")
    }
  } else if (cmd === "favo") {
    const favId = tonumber(rest)
    if (favId !== undefined && favId > 0) {
      portToFriend.PortToMyHouseBinding(favId, portToFriend.constants.PORT_TYPE_OUTSIDE)
    } else {
      d(portToFriend.constants.INVALID_FAVORITE_ID ?? "")
    }
  } else if (cmd === "menu") {
    if (LibAddonMenu2 !== undefined) {
      LibAddonMenu2.OpenToPanel(portToFriend.menu.lam.panel)
    }
  } else {
    portToFriend.ShowHelp()
  }
}

SLASH_COMMANDS[SLASH_CMD] = ptfSlashCommand

function isSavedVars(value: unknown): value is SavedVars {
  if (!isObjectRecord(value)) return false
  if (!isObjectRecord(value.favorites)) return false
  const vc = value.vc
  if (!isObjectRecord(vc) || !isObjectRecord(vc.receivedCards)) return false
  if (!isObjectRecord(value.vc_chatAllowed)) return false
  if (!isObjectRecord(value.myHousesFavorites)) return false
  if (typeof value.port_mode !== "number") return false
  if (typeof value.defaultTab !== "number") return false
  return true
}

function seedSavedVarsTables(raw: Record<string, unknown>): undefined {
  if (raw.favorites === undefined) {
    raw.favorites = []
  }
  const vc = raw.vc
  if (!isObjectRecord(vc)) {
    raw.vc = { allowSelf: false, receivedCards: [] }
  } else if (vc.receivedCards === undefined) {
    vc.receivedCards = []
  }
  if (raw.myHousesFavorites === undefined) {
    raw.myHousesFavorites = {}
  }
}

function portToFriendOnInitialize(this: void): undefined {
  const raw: unknown = ZO_SavedVars.NewAccountWide(
    SAVED_VARS_NAME,
    SAVED_VARS_VERSION,
    undefined,
    portToFriend.defaults
  )
  if (!isObjectRecord(raw)) {
    throw new Error("PortToFriend SavedVariables is not a table")
  }
  seedSavedVarsTables(raw)
  if (!isSavedVars(raw)) {
    throw new Error("PortToFriend SavedVariables failed validation")
  }
  portToFriend.savedVars = raw

  for (let i = 0; i < portToFriend.savedVars.favorites.length; i += 1) {
    portToFriend.Version12NameFix(i)
  }

  if (GetDisplayName() === "@s0rdrak") {
    portToFriend.config.houseDebug = true
  }

  if (portToFriend.savedVars.selectedMyHousesSort !== undefined) {
    portToFriend.addonState.selectedMyHousesSort = portToFriend.savedVars.selectedMyHousesSort
  }
  if (portToFriend.savedVars.selectedLibraryFilter !== undefined) {
    portToFriend.addonState.selectedLibraryFilter = portToFriend.savedVars.selectedLibraryFilter
  }
  if (portToFriend.savedVars.selectedLibrarySort !== undefined) {
    portToFriend.addonState.selectedLibrarySort = portToFriend.savedVars.selectedLibrarySort
  }

  if (
    portToFriend.savedVars.myHousesFavorites[portToFriend.constants.PORT_TYPE_INSIDE] === undefined
  ) {
    portToFriend.savedVars.myHousesFavorites[portToFriend.constants.PORT_TYPE_INSIDE] = {}
  }
  if (
    portToFriend.savedVars.myHousesFavorites[portToFriend.constants.PORT_TYPE_OUTSIDE] === undefined
  ) {
    portToFriend.savedVars.myHousesFavorites[portToFriend.constants.PORT_TYPE_OUTSIDE] = {}
  }

  portToFriend.HOUSES = portToFriend.CreateHouseList()

  buildWindow()
  buildHouseTab()
  buildVcTab()
  buildMyHousesTab()
  buildLibraryTab()

  portToFriend.addonState.selectedTab = portToFriend.savedVars.defaultTab
  portToFriend.TabOnMouseExit(portToFriend.addonState.selectedTab)
  portToFriend.TabSelected(portToFriend.addonState.selectedTab)

  EVENT_MANAGER.RegisterForEvent(
    portToFriend.addonName,
    EVENT_CHAT_MESSAGE_CHANNEL,
    portToFriend.ChatMessageReceived
  )
  EVENT_MANAGER.RegisterForEvent(
    portToFriend.addonName,
    EVENT_COLLECTIBLE_NOTIFICATION_NEW,
    portToFriend.CollectibleNotification
  )

  portToFriend.menu.Initialize(portToFriend.menu.name, portToFriend.savedVars)

  EVENT_MANAGER.RegisterForUpdate(
    portToFriend.hacks.callbackName,
    portToFriend.hacks.callbackInterval,
    portToFriend.ContextMenuHackOnUpdate
  )
  EVENT_MANAGER.RegisterForEvent(
    portToFriend.callbackName,
    EVENT_PLAYER_DEACTIVATED,
    portToFriend.OnPlayerDeactivated
  )
}
portToFriend.PortToFriendOnInitialize = portToFriendOnInitialize

export function initPtf(this: void): undefined {
  portToFriend.PortToFriendOnInitialize()
  return undefined
}
