import "./public-api"

import "./chat-capture"
import "./comboboxes"
import "./context-menu"
import "./dropdowns"
import "./favorites-helpers"
import "./favorites-render"
import "./house-list"
import "./hover"
import "./libdata"
import "./library-tab"
import "./my-houses"
import "./porting"
import "./search"
import "./settings-menu"
import "./slash"
import "./sliders"
import "./tabs"
import "./visit-card-send"
import "./visit-cards-interact"
import "./visit-cards-render"
import "./visit-cards-view"
import "./window-controls"

import { isObjectRecord } from "@temper/shared-narrow"
import { SAVED_VARS_NAME, SAVED_VARS_VERSION, SLASH_CMD } from "./constants"
import { registerUiStrings } from "./locale/ui-strings"
import { PortToFriend } from "./state"
import type { SavedVars } from "./types"
import { buildHouseTab } from "./window/build-house-tab"
import { buildLibraryTab } from "./window/build-library-tab"
import { buildMyHousesTab } from "./window/build-myhouses-tab"
import { buildVcTab } from "./window/build-vc-tab"
import { buildWindow } from "./window/build-window"

registerUiStrings()

function parseLuaCapture(this: void, captured: string | undefined): string | undefined {
  return captured
}

function PtfSlashCommand(this: void, param: string): undefined {
  d(PortToFriend.slashCmd + " " + param)
  const trimmed = zo_strtrim(param)
  const [cmd, rest] = PortToFriend.ParseCmd("", trimmed)

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
        PortToFriend.JumpToHouse(target, index)
      } else {
        PortToFriend.JumpToDefaultHouse(rest)
      }
    } else {
      PortToFriend.JumpToDefaultHouse(rest)
    }
  } else if (cmd === "show") {
    for (const [key, house] of pairs(PortToFriend.HOUSES)) {
      if (house !== undefined) {
        d(tostring(key) + ": " + house)
      }
    }
  } else if (cmd === "open") {
    PortToFriend.OpenWindow()
  } else if (cmd === "fav") {
    const favId = tonumber(rest)
    if (favId !== undefined && favId > 0) {
      PortToFriend.PortToFavoriteBinding(favId)
    } else {
      d(PortToFriend.constants.INVALID_FAVORITE_ID ?? "")
    }
  } else if (cmd === "favi") {
    const favId = tonumber(rest)
    if (favId !== undefined && favId > 0) {
      PortToFriend.PortToMyHouseBinding(favId, PortToFriend.constants.PORT_TYPE_INSIDE)
    } else {
      d(PortToFriend.constants.INVALID_FAVORITE_ID ?? "")
    }
  } else if (cmd === "favo") {
    const favId = tonumber(rest)
    if (favId !== undefined && favId > 0) {
      PortToFriend.PortToMyHouseBinding(favId, PortToFriend.constants.PORT_TYPE_OUTSIDE)
    } else {
      d(PortToFriend.constants.INVALID_FAVORITE_ID ?? "")
    }
  } else if (cmd === "menu") {
    if (LibAddonMenu2 !== undefined) {
      LibAddonMenu2.OpenToPanel(PortToFriend.menu.lam.panel)
    }
  } else {
    PortToFriend.ShowHelp()
  }
}

SLASH_COMMANDS[SLASH_CMD] = PtfSlashCommand

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

function PortToFriendOnInitialize(this: void): undefined {
  const raw: unknown = ZO_SavedVars.NewAccountWide(
    SAVED_VARS_NAME,
    SAVED_VARS_VERSION,
    undefined,
    PortToFriend.defaults
  )
  if (!isObjectRecord(raw)) {
    throw new Error("PortToFriend SavedVariables is not a table")
  }
  seedSavedVarsTables(raw)
  if (!isSavedVars(raw)) {
    throw new Error("PortToFriend SavedVariables failed validation")
  }
  PortToFriend.savedVars = raw

  for (let i = 0; i < PortToFriend.savedVars.favorites.length; i += 1) {
    PortToFriend.Version12NameFix(i)
  }

  if (GetDisplayName() === "@s0rdrak") {
    PortToFriend.config.houseDebug = true
  }

  if (PortToFriend.savedVars.selectedMyHousesSort !== undefined) {
    PortToFriend.addonState.selectedMyHousesSort = PortToFriend.savedVars.selectedMyHousesSort
  }
  if (PortToFriend.savedVars.selectedLibraryFilter !== undefined) {
    PortToFriend.addonState.selectedLibraryFilter = PortToFriend.savedVars.selectedLibraryFilter
  }
  if (PortToFriend.savedVars.selectedLibrarySort !== undefined) {
    PortToFriend.addonState.selectedLibrarySort = PortToFriend.savedVars.selectedLibrarySort
  }

  if (
    PortToFriend.savedVars.myHousesFavorites[PortToFriend.constants.PORT_TYPE_INSIDE] === undefined
  ) {
    PortToFriend.savedVars.myHousesFavorites[PortToFriend.constants.PORT_TYPE_INSIDE] = {}
  }
  if (
    PortToFriend.savedVars.myHousesFavorites[PortToFriend.constants.PORT_TYPE_OUTSIDE] === undefined
  ) {
    PortToFriend.savedVars.myHousesFavorites[PortToFriend.constants.PORT_TYPE_OUTSIDE] = {}
  }

  PortToFriend.HOUSES = PortToFriend.CreateHouseList()

  buildWindow()
  buildHouseTab()
  buildVcTab()
  buildMyHousesTab()
  buildLibraryTab()

  PortToFriend.addonState.selectedTab = PortToFriend.savedVars.defaultTab
  PortToFriend.TabOnMouseExit(PortToFriend.addonState.selectedTab)
  PortToFriend.TabSelected(PortToFriend.addonState.selectedTab)

  EVENT_MANAGER.RegisterForEvent(
    PortToFriend.addonName,
    EVENT_CHAT_MESSAGE_CHANNEL,
    PortToFriend.ChatMessageReceived
  )
  EVENT_MANAGER.RegisterForEvent(
    PortToFriend.addonName,
    EVENT_COLLECTIBLE_NOTIFICATION_NEW,
    PortToFriend.CollectibleNotification
  )

  PortToFriend.menu.Initialize(PortToFriend.menu.name, PortToFriend.savedVars)

  EVENT_MANAGER.RegisterForUpdate(
    PortToFriend.hacks.callbackName,
    PortToFriend.hacks.callbackInterval,
    PortToFriend.ContextMenuHackOnUpdate
  )
  EVENT_MANAGER.RegisterForEvent(
    PortToFriend.callbackName,
    EVENT_PLAYER_DEACTIVATED,
    PortToFriend.OnPlayerDeactivated
  )
}
PortToFriend.PortToFriendOnInitialize = PortToFriendOnInitialize

export function initPtf(this: void): undefined {
  PortToFriend.PortToFriendOnInitialize()
  return undefined
}
