import "./public-api"

import { ADDON_NAME } from "./constants"
import {
  HookAddSlotAction,
  HookClearMenu,
  HookContextMenu,
  HookMenuEnter,
  HookShowMenu,
  HookShowPlayerContextMenu,
  HookSocialListContextMenu,
} from "./hooks"
import { lib } from "./lib-state"
import { createSubmenu } from "./submenu/submenu-window"

const identifier = `${ADDON_NAME}${GetTimeStamp()}`

function OnAddonLoaded(this: void, _eventCode: number, name: string): undefined {
  if (string.find(name, "^ZO_")[0] !== undefined) {
    return
  }
  EVENT_MANAGER.UnregisterForEvent(identifier, EVENT_ADD_ON_LOADED)

  lib.submenu = createSubmenu("LibCustomMenuSubmenu")
  HookClearMenu()
  HookShowMenu()
  HookMenuEnter()
  HookAddSlotAction()
  HookContextMenu()

  if (ZO_IsConsoleUI()) {
    return
  }
  HookShowPlayerContextMenu()
  HookSocialListContextMenu(
    lib.friendsListContextMenuRegistry,
    FRIENDS_LIST,
    "FriendsListRow_OnMouseUp",
    "ZO_ScrollList_GetData"
  )
  HookSocialListContextMenu(
    lib.ignoreListContextMenuRegistry,
    IGNORE_LIST,
    "IgnoreListPanelRow_OnMouseUp",
    "ZO_ScrollList_GetData"
  )
  HookSocialListContextMenu(
    lib.groupListContextMenuRegistry,
    GROUP_LIST,
    "GroupListRow_OnMouseUp",
    "ZO_ScrollList_GetData"
  )

  function hookLater(this: void): undefined {
    HookSocialListContextMenu(
      lib.guildRosterContextMenuRegistry,
      GUILD_ROSTER_KEYBOARD,
      "GuildRosterRow_OnMouseUp",
      "GetPlayerGuildMemberIndex"
    )
  }
  EVENT_MANAGER.RegisterForEvent(
    identifier,
    EVENT_PLAYER_ACTIVATED,
    function (this: void): undefined {
      EVENT_MANAGER.UnregisterForEvent(identifier, EVENT_PLAYER_ACTIVATED)
      zo_callLater(hookLater, 200)
    }
  )
}

EVENT_MANAGER.UnregisterForEvent(ADDON_NAME, EVENT_ADD_ON_LOADED)
EVENT_MANAGER.RegisterForEvent(identifier, EVENT_ADD_ON_LOADED, OnAddonLoaded)
