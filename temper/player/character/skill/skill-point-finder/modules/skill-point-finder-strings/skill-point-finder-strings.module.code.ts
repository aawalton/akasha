import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

export function registerStrings(this: void): undefined {
  const strings: Record<string, string> = {
    SI_TEMPER_SKILLPOINTFINDER_SETTINGS_COLOR_TITLE: "Color Settings",
    SI_TEMPER_SKILLPOINTFINDER_SETTINGS_COLOR_GSP_DONE: "General - Done",
    SI_TEMPER_SKILLPOINTFINDER_SETTINGS_COLOR_GSP_PROG: "General - In Progress",
    SI_TEMPER_SKILLPOINTFINDER_SETTINGS_COLOR_GSP_NOT_DONE: "General - Not Done",
    SI_TEMPER_SKILLPOINTFINDER_SETTINGS_COLOR_ZQ_DONE: "Zone Quests - Done",
    SI_TEMPER_SKILLPOINTFINDER_SETTINGS_COLOR_ZQ_PROG: "Zone Quests - In Progress",
    SI_TEMPER_SKILLPOINTFINDER_SETTINGS_COLOR_ZQ_NOT_DONE: "Zone Quests - Not Done",
    SI_TEMPER_SKILLPOINTFINDER_SETTINGS_COLOR_SS_DONE: "Skyshards - Done",
    SI_TEMPER_SKILLPOINTFINDER_SETTINGS_COLOR_SS_PROG: "Skyshards - In Progress",
    SI_TEMPER_SKILLPOINTFINDER_SETTINGS_COLOR_SS_NOT_DONE: "Skyshards - Not Done",
    SI_TEMPER_SKILLPOINTFINDER_SETTINGS_COLOR_GDQ_DONE: "Group Dungeons - Done",
    SI_TEMPER_SKILLPOINTFINDER_SETTINGS_COLOR_GDQ_NOT_DONE: "Group Dungeons - Not Done",
    SI_TEMPER_SKILLPOINTFINDER_SETTINGS_COLOR_PDB_DONE: "Public Dungeons - Done",
    SI_TEMPER_SKILLPOINTFINDER_SETTINGS_COLOR_PDB_NOT_DONE: "Public Dungeons - Not Done",
    SI_TEMPER_SKILLPOINTFINDER_SETTINGS_COLOR_DESC_DONE: "Set the color for complete skill points.",
    SI_TEMPER_SKILLPOINTFINDER_SETTINGS_COLOR_DESC_PROG:
      "Set the color for incomplete, started skill points.",
    SI_TEMPER_SKILLPOINTFINDER_SETTINGS_COLOR_DESC_NOT_DONE:
      "Set the color for incomplete skill points.",

    SI_TEMPER_SKILLPOINTFINDER_SETTINGS_SORT_TITLE: "Sort Option Settings",
    SI_TEMPER_SKILLPOINTFINDER_SETTINGS_SORT_SQS: "Quest and Skyshard Sorting",
    SI_TEMPER_SKILLPOINTFINDER_SETTINGS_SORT_SQS_DESC:
      "Set the sort order for the Storyline Quests and Skyshards table.",
    SI_TEMPER_SKILLPOINTFINDER_SETTINGS_SORT_GDQ: "Group Dungeon Sorting",
    SI_TEMPER_SKILLPOINTFINDER_SETTINGS_SORT_GDQ_DESC:
      "Set the sort order for the Group Dungeon Quests table.",
    SI_TEMPER_SKILLPOINTFINDER_SETTINGS_SORT_PDB: "Public Dungeon Sorting",
    SI_TEMPER_SKILLPOINTFINDER_SETTINGS_SORT_PDB_DESC:
      "Set the sort order for the Public Dungeon Group Boss Events table.",

    SI_TEMPER_SKILLPOINTFINDER_SETTINGS_OVERRIDE_TITLE: "Override Settings",
    SI_TEMPER_SKILLPOINTFINDER_SETTINGS_OVERRIDE_FOLIUM: "Folium Discognitum Override",
    SI_TEMPER_SKILLPOINTFINDER_SETTINGS_OVERRIDE_FOLIUM_DESC:
      "This setting allows you to override the window's built-in Folium Discognitum logic. This is usually only necessary if you've not received skill points that you've actually earned.",
    SI_TEMPER_SKILLPOINTFINDER_SETTINGS_OVERRIDE_WARN:
      "May result in an incorrect total amount of skill points.",
    SI_TEMPER_SKILLPOINTFINDER_SETTINGS_OVERRIDE_FOLIUM_SET: "Character Has Folium Discognitum",
    SI_TEMPER_SKILLPOINTFINDER_SETTINGS_OVERRIDE_FOLIUM_SET_DESC:
      "This setting forces the window's built-in Folium Discognitum points. You must select the Folium Discognitum Override option for this to have any effect.",

    SI_TEMPER_SKILLPOINTFINDER_SETTINGS_OVERRIDE_TUT_SET: "Tutorial Quest Override",
    SI_TEMPER_SKILLPOINTFINDER_SETTINGS_OVERRIDE_TUT_SET_DESC:
      "This setting allows you to override the window's built-in intro quest logic. This is usually only necessary if you've created a character after the release of Morrowind and skipped the introduction quest.",

    SI_TEMPER_SKILLPOINTFINDER_GUI_CHAR_LEVEL: "Character Level",
    SI_TEMPER_SKILLPOINTFINDER_GUI_MAIN_QUEST: "Main Quest",
    SI_TEMPER_SKILLPOINTFINDER_GUI_FOLIUM: "Folium Discognitum",
    SI_TEMPER_SKILLPOINTFINDER_GUI_TUTORIAL: "Tutorial",
    SI_TEMPER_SKILLPOINTFINDER_GUI_AVA_RANK: "Alliance War Rank",
    SI_TEMPER_SKILLPOINTFINDER_GUI_MAEL_ARENA: "Maelstrom Arena",

    SI_TEMPER_SKILLPOINTFINDER_GUI_TITLE: "Temper Completion — Skill Points",

    SI_TEMPER_SKILLPOINTFINDER_GUI_GSP: "General Skill Points",
    SI_TEMPER_SKILLPOINTFINDER_GUI_SQS: "Storyline Quests & Skyshards",
    SI_TEMPER_SKILLPOINTFINDER_GUI_GDQ: "Group Dungeon Quests",
    SI_TEMPER_SKILLPOINTFINDER_GUI_PDB: "Public Dungeon Group Boss Events",
    SI_TEMPER_SKILLPOINTFINDER_GUI_SOURCE: "Source",
    SI_TEMPER_SKILLPOINTFINDER_GUI_PROGRESS: "Progress",
    SI_TEMPER_SKILLPOINTFINDER_GUI_ZONE: "Zone",
    SI_TEMPER_SKILLPOINTFINDER_GUI_STORYLINE: "Storyline",
    SI_TEMPER_SKILLPOINTFINDER_GUI_SKYSHARDS: "Skyshards",
    SI_TEMPER_SKILLPOINTFINDER_GUI_GROUP_DUNGEON: "Group Dungeon",
    SI_TEMPER_SKILLPOINTFINDER_GUI_PUBLIC_DUNGEON: "Public Dungeon",
    SI_TEMPER_SKILLPOINTFINDER_GUI_DUNGEON_NAME: "Dungeon Name",

    SI_TEMPER_SKILLPOINTFINDER_GUI_TOTAL: "Total",
    SI_TEMPER_SKILLPOINTFINDER_GUI_CHAR_TOTAL: "Character Total",
    SI_TEMPER_SKILLPOINTFINDER_GUI_UNASSIGNED: "unassigned",

    SI_BINDING_NAME_USPF_TOGGLE: "Show/Hide the Temper Completion — Skill Points window.",
    SI_TEMPER_SKILLPOINTFINDER_GUI_ZN_MQ: "Main Quest",

    SI_TEMPER_SKILLPOINTFINDER_MSG_SHOW_GUI: "Skill Points window displayed.",
    SI_TEMPER_SKILLPOINTFINDER_MSG_HIDE_GUI: "Skill Points window hidden.",

    SI_TEMPER_SKILLPOINTFINDER_MSG_BAD_SLASH: "Invalid Skill Points command.",
    SI_TEMPER_SKILLPOINTFINDER_MSG_CMD_TITLE: "Skill Points slash commands:",
    SI_TEMPER_SKILLPOINTFINDER_MSG_CMD_OPTION: "    /uspf - To %s the addon. This can be keybound.",
    SI_TEMPER_SKILLPOINTFINDER_MSG_ACTIVATE: "activate",
    SI_TEMPER_SKILLPOINTFINDER_MSG_DEACTVATE: "deactivate",

    SI_TEMPER_SKILLPOINTFINDER_MSG_INIT:
      "Running Temper Completion — Skill Points for the first time!",
    SI_TEMPER_SKILLPOINTFINDER_MSG_HELP: "Temper Completion — Skill Points activated!",

    SI_TEMPER_SKILLPOINTFINDER_QUEST_NA: "These skill points are not quest based.",
    SI_TEMPER_SKILLPOINTFINDER_QUEST_NONE: "There are no skill point quests in this zone.",
  }

  for (const [stringId, stringValue] of Object.entries(strings)) {
    ZO_CreateStringId(stringId, stringValue)
    SafeAddVersion(stringId, 1)
  }
}
