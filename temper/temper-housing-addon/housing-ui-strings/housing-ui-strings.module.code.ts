import "@akasha/temper-eso-types/eso-globals"
import "@akasha/temper-eso-types/tstl-eso-sandbox"
import { HOUSES_SEED } from "../housing-house-names/housing-house-names.module.code.ts"
import { portToFriend } from "../housing-state/housing-state.module.code.ts"

const PORT_TO_FAVORITE_PREFIX = "Port to favorite #"
const PORT_TO_FAVORITE_MY_HOUSE_INSIDE_PREFIX = "Port to my house #"
const PORT_TO_FAVORITE_MY_HOUSE_INSIDE_SUFFIX = " (inside)"
const PORT_TO_FAVORITE_MY_HOUSE_OUTSIDE_SUFFIX = " (outside)"

export function registerUiStrings(this: void): undefined {
  const c = portToFriend.constants

  c.HEADER_TITLE = "Port to Friend's House"
  c.LABEL_PLAYER = "Player:"
  c.BUTTON_PORT = "Port"
  c.BUTTON_ADD_FAVORITE = "Add Favorite"
  c.BUTTON_SEND_VISITCARD = "Send visit card"
  c.BUTTON_MAIN_RESIDENCE = "Main Residence"
  c.VC_HEADER_TITLE = "Visit Cards"
  c.VC_PLAYER = "Player: "
  c.VC_HOUSE = "House: "
  c.BUTTON_REMOVE = "Remove"
  c.BUTTON_VC = "VC"
  c.TOGGLE_PORT_WINDOW = "Toggle Port Window"
  c.PORT_TO_FAVORITE = "Port to favorite #%d"
  c.PORT_TO_FAVORITE_MY_HOUSE_INSIDE = "Port to my house #%d (inside)"
  c.PORT_TO_FAVORITE_MY_HOUSE_OUTSIDE = "Port to my house #%d (outside)"
  c.INVALID_FAVORITE_ID = "An invalid ID has been specified"
  c.SORT_NAME = "Player"
  c.SORT_HOUSE = "House"
  c.CMD_HELP_1 = " open: opens the Port to Friend's House menu"
  c.CMD_HELP_2 = " show: displays the IDs of all possible houses"
  c.CMD_HELP_3 = " port <player> <ID>: tries to port to the specified house. The ID is optional"
  c.CMD_HELP_4 = " fav <ID>: Port to favorite <ID>"
  c.CMD_HELP_5 = ' favi <ID>: Port to "My House" <ID> inside'
  c.CMD_HELP_6 = ' favo <ID>: Port to "My House" <ID> outside'
  c.CMD_HELP_7 = " menu: Opens the addon's configuration"
  c.TAB_HOUSE_TITLE = "Houses"
  c.TAB_VC_TITLE = "Visit Cards"
  c.TAB_MYHOUSES_TITLE = "My Houses"
  c.TAB_LIBRARY_TITLE = "Library"
  c.LIBRARY_MESSAGE =
    "The library contains player supplied houses. If you want your house to be part of the library, leave a note in one of the PTF threads on the ESO forums or ESOUI (AddOn comment)."
  c.SORT_LABEL = "Order"
  c.SORT_LOCATION = "Location"
  c.FILTER_LABEL = "Category Filter"
  c.FILTER_NONE = "--NONE--"
  c.FILTER_HIGHLIGHT = "Highlight"
  c.FILTER_LABYRINTH = "Labyrinth"
  c.FILTER_JUMPNRUN = "Jump 'n' Run"
  c.FILTER_CRAFTING = "Crafting / Mundus"
  c.FILTER_GUILD = "Guild Hall"
  c.FILTER_ROLEPLAY = "Roleplay"
  c.FILTER_RAID = "Raid / DPS"
  c.FILTER_HIDE_SEEK = "Hide and Seek"
  c.FILTER_ERP = "ERP"
  c.LIBRARY_SORT_LABEL = "Order"
  c.LIBRARY_SORT_NONE = "--NONE--"
  c.LIBRARY_SORT_NAME = "Name"
  c.LIBRARY_SORT_HOUSE = "House"
  c.MYHOUSES_FRONT_DOOR = "Front Door"
  c.MYHOUSES_PORT_INSIDE = "Port Inside"
  c.CONTEXT_MENU_SEND = "Send to PTF"

  const m = c.menu
  m.DISPLAY_NAME = "|c4592FFPort To Friend's House Configuration|r"
  m.AUTHOR =
    "|cFF8174" + portToFriend.author + "|r\r\nThanks to: |cFF8174" + portToFriend.credits + "|r\r\n"
  m.VERSION = "|cFF8174" + portToFriend.versionString + "|r"
  m.TITLE = "Chat Configuration"
  m.DESCRIPTION = "Configure the chats which should be allowed to add visit cards"
  m.G1 = "Guild 1"
  m.O1 = "Officer 1"
  m.G2 = "Guild 2"
  m.O2 = "Officer 2"
  m.G3 = "Guild 3"
  m.O3 = "Officer 3"
  m.G4 = "Guild 4"
  m.O4 = "Officer 4"
  m.G5 = "Guild 5"
  m.O5 = "Officer 5"
  m.EMOTE = "Emote"
  m.SAY = "Say"
  m.YELL = "Yell"
  m.GROUP = "Group"
  m.TELL = "Tell"
  m.ZONE = "Zone"
  m.ENZONE = "Zone - English"
  m.FRZONE = "Zone - French"
  m.DEZONE = "Zone - German"
  m.JPZONE = "Zone - Japan"
  m.ALLOW_SELF = "Allow Self VC"
  m.PORT_MODE = "Port Mode (Window Close)"
  m.PORT_MODE_NONE = "None"
  m.PORT_MODE_CLICK = "Click"
  m.PORT_MODE_DEACTIVATE = "Loading Screen"
  m.DEFAULT_TAB = "Default Tab"

  portToFriend.HOUSES = HOUSES_SEED

  registerKeybindStrings()
}

function registerKeybindStrings(this: void): undefined {
  const c = portToFriend.constants
  ZO_CreateStringId("SI_BINDING_NAME_PORTTOFRIENDSHOUSE_OPEN", c.TOGGLE_PORT_WINDOW ?? "")

  for (let i = 1; i <= 10; i += 1) {
    const n = tostring(i)
    ZO_CreateStringId("SI_BINDING_NAME_PORTTOFRIENDSHOUSE_FAV_" + n, PORT_TO_FAVORITE_PREFIX + n)
    ZO_CreateStringId(
      "SI_BINDING_NAME_PORTTOFRIENDSHOUSE_FAV_MYHOUSE_INSIDE_" + n,
      PORT_TO_FAVORITE_MY_HOUSE_INSIDE_PREFIX + n + PORT_TO_FAVORITE_MY_HOUSE_INSIDE_SUFFIX
    )
    ZO_CreateStringId(
      "SI_BINDING_NAME_PORTTOFRIENDSHOUSE_FAV_MYHOUSE_OUTSIDE_" + n,
      PORT_TO_FAVORITE_MY_HOUSE_INSIDE_PREFIX + n + PORT_TO_FAVORITE_MY_HOUSE_OUTSIDE_SUFFIX
    )
  }
}
