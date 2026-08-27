import { PortToFriend } from "./state"

interface HouseEditbox {
  SetText: (this: HouseEditbox, text: string) => void
}
interface HouseEditboxPanel {
  editbox: HouseEditbox
}
function asHouseEditboxPanel(value: unknown): HouseEditboxPanel {
  return value as HouseEditboxPanel
}

interface ChatSystemWithContextMenu {
  ShowPlayerContextMenu: (
    this: ChatSystemWithContextMenu,
    displayName: string,
    rawName: string
  ) => void
}
function asChatSystemWithContextMenu(value: unknown): ChatSystemWithContextMenu {
  return value as ChatSystemWithContextMenu
}

interface GuildRosterRowData {
  displayName: string
}

interface GuildRosterKeyboard {
  GuildRosterRow_OnMouseUp: (
    this: GuildRosterKeyboard,
    control: Control,
    button: number,
    upInside: boolean
  ) => void
  ShowMenu: (this: GuildRosterKeyboard, control: Control) => void
}
function asGuildRosterKeyboard(value: unknown): GuildRosterKeyboard {
  return value as GuildRosterKeyboard
}

function ContextMenuHackOnUpdate(this: void): undefined {
  if (PortToFriend.hacks.contextMenuHackUpdated === undefined) {
    PortToFriend.hacks.contextMenuHackUpdated = true
  } else {
    PortToFriend.AdjustContextMenus()
    EVENT_MANAGER.UnregisterForUpdate(PortToFriend.hacks.callbackName)
  }
}
PortToFriend.ContextMenuHackOnUpdate = ContextMenuHackOnUpdate

function SendNameToPTF(this: void, name: string): undefined {
  asHouseEditboxPanel(PortToFriend.controls.house).editbox.SetText(name)
  PortToFriend.OpenWindow()
}
PortToFriend.SendNameToPTF = SendNameToPTF

function AdjustContextMenus(this: void): undefined {
  const chatSystem = asChatSystemWithContextMenu(CHAT_SYSTEM)
  const ShowPlayerContextMenu = chatSystem.ShowPlayerContextMenu
  chatSystem.ShowPlayerContextMenu = function (
    this: ChatSystemWithContextMenu,
    displayName: string,
    rawName: string
  ): undefined {
    ShowPlayerContextMenu.call(this, displayName, rawName)
    AddCustomMenuItem(PortToFriend.constants.CONTEXT_MENU_SEND ?? "", () => {
      PortToFriend.SendNameToPTF(displayName)
    })
    if (ZO_Menu_GetNumMenuItems() > 0) {
      ShowMenu()
    }
  }

  const guildRoster = asGuildRosterKeyboard(GUILD_ROSTER_KEYBOARD)
  const GuildRosterRow_OnMouseUp = guildRoster.GuildRosterRow_OnMouseUp
  guildRoster.GuildRosterRow_OnMouseUp = function (
    this: GuildRosterKeyboard,
    control: Control,
    button: number,
    upInside: boolean
  ): undefined {
    const data = ZO_ScrollList_GetData<GuildRosterRowData>(control)
    GuildRosterRow_OnMouseUp.call(this, control, button, upInside)

    if (button !== MOUSE_BUTTON_INDEX_RIGHT) {
      return
    }

    if (data !== undefined) {
      AddCustomMenuItem(PortToFriend.constants.CONTEXT_MENU_SEND ?? "", () => {
        PortToFriend.SendNameToPTF(data.displayName)
      })
      this.ShowMenu(control)
    }
  }
}
PortToFriend.AdjustContextMenus = AdjustContextMenus
