import "akasha/temper/catalog/world/lost-treasure/lost-treasure-string-ids/lost-treasure-string-ids.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-map-ui/eso-map-ui.type-declaration.d.ts"

export function registerUiStrings(this: void): undefined {
  const simpleStrings: Record<string, string> = {
    SI_LOST_TREASURE_MAP_NOT_OPENED: "no map opened",

    SI_LOST_TREASURE_MAP_FILTER_CHECKBOX_NAME: "<<C:1>> (<<C:2>>)",

    SI_LOST_TREASURE_SHOW_ON_MAP_TT: "Show pins on player map.",
    SI_LOST_TREASURE_SHOW_ON_COMPASS: "Show on compass",
    SI_LOST_TREASURE_SHOW_ON_COMPASS_TT: "Show pins on compass.",
    SI_LOST_TREASURE_PIN_ICON_TT: "Choose your desired icon for pins.",
    SI_LOST_TREASURE_PIN_SIZE: "Size",
    SI_LOST_TREASURE_PIN_SIZE_TT: "Choose the size of the pin on player map.",
    SI_LOST_TREASURE_MARK_OPTION: "Mark options",
    SI_LOST_TREASURE_MARK_OPTION_TT:
      "Defines when a pin should be visible on the player map and in the compass.",
    SI_LOST_TREASURE_MARK_OPTION1_TT:
      "Shows a pin only after opening a treasure map or a survey report.",
    SI_LOST_TREASURE_MARK_OPTION2_TT:
      "Show pins of treasure maps and survey reports that are in your inventory.",
    SI_LOST_TREASURE_MARK_OPTION3_TT:
      "Show all pins regardless of whether you have them in your inventory.",
    SI_LOST_TREASURE_MARK_MAP_MENU_OPTION1: "on use",
    SI_LOST_TREASURE_MARK_MAP_MENU_OPTION2: "all in inventory",
    SI_LOST_TREASURE_MARK_MAP_MENU_OPTION3: "all locations",
    SI_LOST_TREASURE_PIN_LEVEL: "Level on Map",
    SI_LOST_TREASURE_PIN_LEVEL_TT:
      "Higher level draws pin over lower level pins. Increase this value, if a pin is obscured by other pins.",
    SI_LOST_TREASURE_MARKER_DELAY: "Hiding delay",

    SI_LOST_TREASURE_SHOW_MINIMAP_HEADER: "Mini Map",
    SI_LOST_TREASURE_SHOW_MINIMAP: "Show Mini Map",
    SI_LOST_TREASURE_SHOW_MINIMAP_TT: "Show Mini Map, after using a treasure map or survey report.",
    SI_LOST_TREASURE_SHOW_MINIMAP_SIZE: "Mini Map Size",
    SI_LOST_TREASURE_SHOW_MINIMAP_DELAY: "Hiding delay",
    SI_LOST_TREASURE_SHOW_MINIMAP_DELAY_TT:
      "Delay (in seconds) before hiding Mini Map, after you picked up the treasure or survey.",

    SI_LOST_TREASURE_DEBUG: "Enable Debug",
    SI_LOST_TREASURE_DEBUG_TT:
      "Enables the debug function to help find potential issues. This option will reset after a Logout.",
  }

  for (const stringId in simpleStrings) {
    const value = simpleStrings[stringId]
    if (value !== undefined) {
      ZO_CreateStringId(stringId, value)
      SafeAddVersion(stringId, 1)
    }
  }

  ZO_CreateStringId(
    "SI_LOST_TREASURE_MARKER_DELAY_TT",
    zo_strformat(
      "Adds a delay before deleting a marked location on the map. Only works in conjunction with <<1>> or <<2>>. This will not work when you have choosen option <<3>> or open up the map as it refreshes all pins then.",
      ZO_SELECTED_TEXT.Colorize(GetString(SI_LOST_TREASURE_MARK_MAP_MENU_OPTION1)),
      ZO_SELECTED_TEXT.Colorize(GetString(SI_LOST_TREASURE_MARK_MAP_MENU_OPTION2)),
      ZO_SELECTED_TEXT.Colorize(GetString(SI_LOST_TREASURE_MARK_MAP_MENU_OPTION3))
    )
  )
  SafeAddVersion("SI_LOST_TREASURE_MARKER_DELAY_TT", 1)
}
