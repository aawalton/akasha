import { STRINGS_2 } from "@akasha/temper-combat-addon/combat-strings-table"

const STRINGS_1: Record<string, string> = {
  SI_TEMPER_COMBAT_SEP_COLOR: "FFAAAAAA",
  SI_TEMPER_COMBAT_HEALTH_COLOR: "FFDE6531",
  SI_TEMPER_COMBAT_MAGICKA_COLOR: "FF5EBDE7",
  SI_TEMPER_COMBAT_STAMINA_COLOR: "FFA6D852",
  SI_TEMPER_COMBAT_ULTIMATE_COLOR: "FFffe785",

  SI_TEMPER_COMBAT_LANG: "en",
  SI_TEMPER_COMBAT_ENCHANTMENT_TRIM: " Enchantment",

  SI_TEMPER_COMBAT_STD_FONT: "$(MEDIUM_FONT)",
  SI_TEMPER_COMBAT_BOLD_FONT: "$(BOLD_FONT)",

  SI_TEMPER_COMBAT_FONT_SIZE_SMALL: "14",
  SI_TEMPER_COMBAT_FONT_SIZE: "15",
  SI_TEMPER_COMBAT_FONT_SIZE_TITLE: "20",

  SI_TEMPER_COMBAT_CALC: "Calculating...",
  SI_TEMPER_COMBAT_LOADING: "Loading...",
  SI_TEMPER_COMBAT_FINALIZING: "Finalizing...",
  SI_TEMPER_COMBAT_GROUP: "Group",
  SI_TEMPER_COMBAT_SELECTION: "Selection",

  SI_TEMPER_COMBAT_BASE_REG: "Base Regeneration",
  SI_TEMPER_COMBAT_DRAIN: "Drain",
  SI_TEMPER_COMBAT_UNKNOWN: "Unknown",

  SI_TEMPER_COMBAT_BLOCKS: "Blocks",
  SI_TEMPER_COMBAT_CRITS: "Crits",

  SI_TEMPER_COMBAT_DAMAGE: "Damage",
  SI_TEMPER_COMBAT_DAMAGEC: "Damage: ",
  SI_TEMPER_COMBAT_HIT: "Hit",
  SI_TEMPER_COMBAT_DPS: "DPS",
  SI_TEMPER_COMBAT_INCOMING_DPS: "Incoming DPS",

  SI_TEMPER_COMBAT_HEALING: "Healing",
  SI_TEMPER_COMBAT_HEALS: "Heals",
  SI_TEMPER_COMBAT_HPS: "HPS",
  SI_TEMPER_COMBAT_HPSA: "HPS + Overheal",
  SI_TEMPER_COMBAT_INCOMING_HPS: "Incoming HPS",

  SI_TEMPER_COMBAT_EDIT_TITLE: "Double click to edit fight name",

  SI_TEMPER_COMBAT_DAMAGE_CAUSED: "Damage Caused",
  SI_TEMPER_COMBAT_DAMAGE_RECEIVED: "Damage Received",
  SI_TEMPER_COMBAT_HEALING_DONE: "Healing Done",
  SI_TEMPER_COMBAT_HEALING_RECEIVED: "Healing Received",

  SI_TEMPER_COMBAT_TOGGLE_FIGHTSTATS: "Fight Stats",
  SI_TEMPER_COMBAT_TOGGLE_COMBAT_LOG: "Combat Log",
  SI_TEMPER_COMBAT_TOGGLE_GRAPH: "Graph",
  SI_TEMPER_COMBAT_TOGGLE_INFO: "Info",
  SI_TEMPER_COMBAT_TOGGLE_SETTINGS: "Options",

  SI_TEMPER_COMBAT_SIGIL_WARNING: "This Icon indicates that a sigil has been used.",

  SI_TEMPER_COMBAT_SHOWIDS: "Show IDs",
  SI_TEMPER_COMBAT_HIDEIDS: "Hide IDs",

  SI_TEMPER_COMBAT_SHOWOVERHEAL: "Show overheal",
  SI_TEMPER_COMBAT_HIDEOVERHEAL: "Hide overheal",

  SI_TEMPER_COMBAT_POSTDPS: "Post DPS/HPS",
  SI_TEMPER_COMBAT_POSTSINGLEDPS: "Post single target DPS",
  SI_TEMPER_COMBAT_POSTSMARTDPS: "Post boss target DPS",
  SI_TEMPER_COMBAT_POSTMULTIDPS: "Post total DPS",
  SI_TEMPER_COMBAT_POSTALLDPS: "Post single and total DPS",
  SI_TEMPER_COMBAT_POSTHPS: "Post HPS",
  SI_TEMPER_COMBAT_POSTUNITDPS: "Post DPS to this unit",
  SI_TEMPER_COMBAT_POSTUNITNAMEDPS: "Post DPS to '<<tm:1>>' units",
  SI_TEMPER_COMBAT_POSTSELECTIONDPS: "Post DPS to selected units",
  SI_TEMPER_COMBAT_POSTSELECTIONHPS: "Post HPS to selected units",

  SI_TEMPER_COMBAT_BOSS_DPS: "Boss DPS",

  SI_TEMPER_COMBAT_POSTDPS_FORMAT: "<<1>> - DPS: <<2>> (<<3>> in <<4>>)",
  SI_TEMPER_COMBAT_POSTSMARTDPS_FORMAT: "<<1>><<2>> - Boss DPS: <<3>> (<<4>> in <<5>>)",
  SI_TEMPER_COMBAT_POSTMULTIDPS_FORMAT: "<<1>> (+<<2>>) - DPS: <<3>> (<<4>> in <<5>>)",
  SI_TEMPER_COMBAT_POSTALLDPS_FORMAT_A: "<<1>> - Total DPS (+<<2>>): <<3>> (<<4>> in <<5>>)",
  SI_TEMPER_COMBAT_POSTALLDPS_FORMAT_B: "<<1>>: <<2>> (<<3>> in <<4>>)",
  SI_TEMPER_COMBAT_POSTSELECTIONDPS_FORMAT: "<<1>><<2>> - Selection DPS: <<3>> (<<4>> in <<5>>)",
  SI_TEMPER_COMBAT_POSTHPS_FORMAT: "<<1>> - HPS: <<2>> (<<3>> in <<4>>)",
  SI_TEMPER_COMBAT_POSTSELECTIONHPS_FORMAT:
    "<<1>> - Selection HPS (x<<2>>): <<3>> (<<4>> in <<5>>)",

  SI_TEMPER_COMBAT_POSTBUFF: "Post buff uptime",
  SI_TEMPER_COMBAT_POSTBUFF_BOSS: "Post buff uptime on bosses",
  SI_TEMPER_COMBAT_POSTBUFF_GROUP: "Post buff uptime on group members",
  SI_TEMPER_COMBAT_POSTBUFF_FORMAT: "<<1>> - Uptime: <<2>> (<<3>><<4[/ on $d/ on $d units]>>)",
  SI_TEMPER_COMBAT_POSTBUFF_FORMAT_GROUP:
    "<<1>> - Uptime: <<2>>/<<5>> (<<3>>/<<6>><<4[/ on $d/ on $d units]>>)",

  SI_TEMPER_COMBAT_SHOW_XPS: "<<1>> / <<2>> (<<3>>%)",
  SI_TEMPER_COMBAT_LIVEREPORT_GROUP_TOOLTIP: "Player / Group",
  SI_TEMPER_COMBAT_LIVEREPORT_DPSSINGLE_TOOLTIP: "Single Target DPS",
  SI_TEMPER_COMBAT_LIVEREPORT_DPSBOSS_TOOLTIP: "Boss DPS",
  SI_TEMPER_COMBAT_LIVEREPORT_DPSMULTI_TOOLTIP: "Multi Target DPS",
  SI_TEMPER_COMBAT_LIVEREPORT_HPSOUT_TOOLTIP: "HPS",
  SI_TEMPER_COMBAT_LIVEREPORT_HPSRAW_TOOLTIP: "Raw HPS (incl. overheal)",
  SI_TEMPER_COMBAT_LIVEREPORT_DPSINC_TOOLTIP: "Incoming DPS",
  SI_TEMPER_COMBAT_LIVEREPORT_HPSINC_TOOLTIP: "Incoming HPS",
  SI_TEMPER_COMBAT_LIVEREPORT_TIME_TOOLTIP: "Combat duration",

  SI_TEMPER_COMBAT_SETTINGS: "Addon Settings",

  SI_TEMPER_COMBAT_TOGGLE_CURSOR: "Toggle to show cursor and value tooltip",
  SI_TEMPER_COMBAT_GRAPH_BUFF_GROUP_SELECTOR: "Toggle to show group uptime",

  SI_TEMPER_COMBAT_RECALCULATE: "Recalculate Fight",
  SI_TEMPER_COMBAT_SMOOTHED: "Smoothed",
  SI_TEMPER_COMBAT_TOTAL: "Total",
  SI_TEMPER_COMBAT_ABSOLUTE: "Absolute %",
  SI_TEMPER_COMBAT_SMOOTH_LABEL: "Smooth: %d s",
  SI_TEMPER_COMBAT_NONE: "None",
  SI_TEMPER_COMBAT_BOSS_HP: "Boss HP",
  SI_TEMPER_COMBAT_ENLARGE: "Enlarge",
  SI_TEMPER_COMBAT_SHRINK: "Shrink",

  SI_TEMPER_COMBAT_SAVEDFIGHTS_FULL:
    "You're exceeding the maximum number of saved fights. Delete <<1[a fight/a fight/$d fights]>> or increase the allowed number in the settings!",
  SI_TEMPER_COMBAT_CONVERT_DB_TITLE: "COMBAT METRICS",
  SI_TEMPER_COMBAT_CONVERT_DB_TEXT:
    "This version features a new way to store fights. It takes up less space and reduces UI loading times, even with much more fights saved. \n\nTo benefit from this and allow new fights to be saved, all stored fights need to be converted. \n\nThis process may take a up to a few minutes.",
  SI_TEMPER_COMBAT_CONVERT_DB_BUTTON1_TEXT: "Convert",
  SI_TEMPER_COMBAT_CONVERT_DB_BUTTON2_TEXT: "Abort",
  SI_TEMPER_COMBAT_CONVERSION_TITLE_TEXT: "Converting Fight <<1>>/<<2>> ...",
  SI_TEMPER_COMBAT_CONVERSION_FINISHED_TEXT: "Conversion Finished!",

  SI_TEMPER_COMBAT_PREVIOUS_FIGHT: "Previous Fight",
  SI_TEMPER_COMBAT_NEXT_FIGHT: "Next Fight",
  SI_TEMPER_COMBAT_MOST_RECENT_FIGHT: "Most Recent Fight",
  SI_TEMPER_COMBAT_LOAD_FIGHT: "Load Fight",
  SI_TEMPER_COMBAT_SAVE_FIGHT: "Click: Save fight",
  SI_TEMPER_COMBAT_SAVE_FIGHT2: "Shift+Click: Save fight with combat log",
  SI_TEMPER_COMBAT_DELETE_COMBAT_LOG: "Delete Combat Log",
  SI_TEMPER_COMBAT_DELETE_FIGHT: "Delete Fight",

  SI_TEMPER_COMBAT_RECENT_FIGHT: "Recent Fights",
  SI_TEMPER_COMBAT_DURATION: "Duration",
  SI_TEMPER_COMBAT_CHARACTER: "Character",
  SI_TEMPER_COMBAT_ZONE: "Zone",
  SI_TEMPER_COMBAT_TIME: "Time",
  SI_TEMPER_COMBAT_TIME2: "Time",
  SI_TEMPER_COMBAT_TIMEC: "Time: ",

  SI_TEMPER_COMBAT_SHOW: "Show",
  SI_TEMPER_COMBAT_DELETE: "Delete",

  SI_TEMPER_COMBAT_SAVED_FIGHTS: "Saved Fights",

  SI_TEMPER_COMBAT_ACTIVE_TIME: "Active Time: ",
  SI_TEMPER_COMBAT_ZERO_SEC: "0 s",
  SI_TEMPER_COMBAT_IN_COMBAT: "In Combat: ",

  SI_TEMPER_COMBAT_PLAYER: "Player",

  SI_TEMPER_COMBAT_TOTALC: " Total: ",
  SI_TEMPER_COMBAT_NORMAL: "Normal: ",
  SI_TEMPER_COMBAT_CRITICAL: "Critical: ",
  SI_TEMPER_COMBAT_BLOCKED: "Blocked: ",
  SI_TEMPER_COMBAT_SHIELDED: "Shielded: ",
  SI_TEMPER_COMBAT_ABSOLUTEC: "Absolute: ",
  SI_TEMPER_COMBAT_OVERHEAL: "Overheal: ",

  SI_TEMPER_COMBAT_HITS: "Hits",
  SI_TEMPER_COMBAT_NORM: "Norm",
  SI_TEMPER_COMBAT_OH: "OH",

  SI_TEMPER_COMBAT_RESOURCES: "Resources",

  SI_TEMPER_COMBAT_STATS: "Stats",
  SI_TEMPER_COMBAT_AVE: "Avg",
  SI_TEMPER_COMBAT_AVE_N: "Avg N",
  SI_TEMPER_COMBAT_AVE_C: "Avg C",
  SI_TEMPER_COMBAT_AVE_B: "Avg B",
  SI_TEMPER_COMBAT_AVERAGE: "Average",
  SI_TEMPER_COMBAT_NORMAL_HITS: "Normal Hits",
  SI_TEMPER_COMBAT_MAX: "Max",
  SI_TEMPER_COMBAT_MIN: "Min",
  SI_TEMPER_COMBAT_EFFECTIVE: "Effective",

  SI_TEMPER_COMBAT_STATS_MAGICKA1: "Max Magicka",
  SI_TEMPER_COMBAT_STATS_MAGICKA2: "Spell Damage",
  SI_TEMPER_COMBAT_STATS_MAGICKA3: "Spell Critical",
  SI_TEMPER_COMBAT_STATS_MAGICKA_FORMAT3: "%.1f %%",
  SI_TEMPER_COMBAT_STATS_MAGICKA4: "Critical Damage",
  SI_TEMPER_COMBAT_STATS_MAGICKA5: "Spell Penetration",
  SI_TEMPER_COMBAT_STATS_MAGICKA6: "Overpenetration",
  SI_TEMPER_COMBAT_STATS_MAGICKA_FORMAT6: "%.1f %%",
  SI_TEMPER_COMBAT_STATS_MAGICKA7: "Status Effect Procs",

  SI_TEMPER_COMBAT_STATS_STAMINA1: "Max Stamina",
  SI_TEMPER_COMBAT_STATS_STAMINA2: "Weapon Damage",
  SI_TEMPER_COMBAT_STATS_STAMINA3: "Weapon Critical",
  SI_TEMPER_COMBAT_STATS_STAMINA_FORMAT3: "%.1f %%",
  SI_TEMPER_COMBAT_STATS_STAMINA4: "Critical Damage",
  SI_TEMPER_COMBAT_STATS_STAMINA5: "Phys. Penetration",
  SI_TEMPER_COMBAT_STATS_STAMINA6: "Overpenetration",
  SI_TEMPER_COMBAT_STATS_STAMINA_FORMAT6: "%.1f %%",
  SI_TEMPER_COMBAT_STATS_STAMINA7: "Status Effect Procs",

  SI_TEMPER_COMBAT_STATS_HEALTH1: "Max Health",
  SI_TEMPER_COMBAT_STATS_HEALTH2: "Physical Resist.",
  SI_TEMPER_COMBAT_STATS_HEALTH3: "Spell Resistance",
  SI_TEMPER_COMBAT_STATS_HEALTH4: "Critical Resist.",
  SI_TEMPER_COMBAT_STATS_HEALTH_FORMAT4: "%.1f %%",

  SI_TEMPER_COMBAT_PERFORMANCE: "Performance",
  SI_TEMPER_COMBAT_PERFORMANCE_FPSAVG: "Average FPS",
  SI_TEMPER_COMBAT_PERFORMANCE_FPSMIN: "Minimum FPS",
  SI_TEMPER_COMBAT_PERFORMANCE_FPSMAX: "Maximum FPS",
  SI_TEMPER_COMBAT_PERFORMANCE_FPSPING: "Ping",
  SI_TEMPER_COMBAT_PERFORMANCE_DESYNC: "Skill Desync",

  SI_TEMPER_COMBAT_PENETRATION_TT: "Penetration vs. Damage",
  SI_TEMPER_COMBAT_CRITBONUS_TT: "Crit vs. Damage",
  SI_TEMPER_COMBAT_BACKSTABBER_TT: "*Backstabber is included as if all targets were always flanked",

  SI_TEMPER_COMBAT_COMBAT_LOG: "Combat Log",

  SI_TEMPER_COMBAT_GOTO_PREVIOUS: "Go to previous page",
  SI_TEMPER_COMBAT_PAGE: "Go to page <<1>>",
  SI_TEMPER_COMBAT_GOTO_NEXT: "Go to next page",

  SI_TEMPER_COMBAT_COPY_PASTE: "Toggle copy paste mode of the combat log.",

  SI_TEMPER_COMBAT_TOGGLE_HEAL: "Toggle received healing events",
  SI_TEMPER_COMBAT_TOGGLE_DAMAGE: "Toggle received damage events",
  SI_TEMPER_COMBAT_TOGGLE_YOUR_HEAL: "Toggle your healing events",
  SI_TEMPER_COMBAT_TOGGLE_YOUR_DAMAGE: "Toggle your damage events",

  SI_TEMPER_COMBAT_TOGGLE_BUFFIN_EVENTS: "Toggle incoming buff events",
  SI_TEMPER_COMBAT_TOGGLE_BUFFOUT_EVENTS: "Toggle outbound buff events",
  SI_TEMPER_COMBAT_TOGGLE_GROUPBUFFIN_EVENTS: "Toggle incoming groupbuff events",
  SI_TEMPER_COMBAT_TOGGLE_GROUPBUFFOUT_EVENTS: "Toggle outbound groupbuff events",
  SI_TEMPER_COMBAT_TOGGLE_RESOURCE_EVENTS: "Toggle resource events",
  SI_TEMPER_COMBAT_TOGGLE_STATS_CHANGE_EVENTS: "Toggle stats change events",
  SI_TEMPER_COMBAT_TOGGLE_MESSAGE_CHANGE_EVENTS: "Toggle info events (e.g. weapon swap)",
  SI_TEMPER_COMBAT_TOGGLE_SKILL_USE_EVENTS: "Toggle used skills events",
  SI_TEMPER_COMBAT_TOGGLE_PERFORMANCE_EVENTS: "Toggle performance info",

  SI_TEMPER_COMBAT_DEBUFF_IN: "(De-)Buffs\nIn",
  SI_TEMPER_COMBAT_DEBUFF_OUT: "(De-)Buffs\nOut",
  SI_TEMPER_COMBAT_MAGICKA_PM: "Magicka\n +/-",
  SI_TEMPER_COMBAT_STAMINA_PM: "Stamina\n +/-",
  SI_TEMPER_COMBAT_RESOURCES_PM: "Resources\n +/-",

  SI_TEMPER_COMBAT_BUFF: "Buff",
  SI_TEMPER_COMBAT_BUFFS: "Buffs",
  SI_TEMPER_COMBAT_DEBUFFS: "Debuffs",
  SI_TEMPER_COMBAT_SHARP: "#",
  SI_TEMPER_COMBAT_BUFFCOUNT_TT: "Player / Overall",
  SI_TEMPER_COMBAT_UPTIME: "Uptime %",
  SI_TEMPER_COMBAT_UPTIME_TT: "Player % / Overall %",

  SI_TEMPER_COMBAT_REGENERATION: "Regeneration",
  SI_TEMPER_COMBAT_CONSUMPTION: "Consumption",
  SI_TEMPER_COMBAT_PM_SEC: "±/s",
  SI_TEMPER_COMBAT_TARGET: "Target",
  SI_TEMPER_COMBAT_PERCENT: "%",
  SI_TEMPER_COMBAT_UNITDPS_TT:
    "Real DPS, e.g. the damage per second between your first and your last hit to that target",

  SI_TEMPER_COMBAT_ABILITY: "Ability",
  SI_TEMPER_COMBAT_PER_HITS: "/Hits",
  SI_TEMPER_COMBAT_CRITS_PER: "Crit %",

  SI_TEMPER_COMBAT_FAVOURITE_ADD: "Add to Favourites",
  SI_TEMPER_COMBAT_FAVOURITE_REMOVE: "Remove from Favourites",

  SI_TEMPER_COMBAT_UNCOLLAPSE: "Show Details",
  SI_TEMPER_COMBAT_COLLAPSE: "Collapse",

  SI_TEMPER_COMBAT_SKILL: "Skill",

  SI_TEMPER_COMBAT_BAR: "Bar ",
  SI_TEMPER_COMBAT_AVERAGEC: "Average: ",

  SI_TEMPER_COMBAT_SKILLTIME_LABEL2: "weave",
  SI_TEMPER_COMBAT_SKILLTIME_LABEL3: "miss",

  SI_TEMPER_COMBAT_SKILLTIME_TT1: "Number of casts of this skill",
  SI_TEMPER_COMBAT_SKILLTIME_TT2:
    "Weaving Time\n\nThe average time wasted until the next skill was cast.",
  SI_TEMPER_COMBAT_SKILLTIME_TT3:
    "Weaving Errors\n\nNumber of times the skill activation wasn't followed by a weapon attack or vice versa",
  SI_TEMPER_COMBAT_SKILLTIME_TT4: "Average time between subsequent activations of this skill",

  SI_TEMPER_COMBAT_SKILLTIME_WEAVING: "Weaving Average: ",

  SI_TEMPER_COMBAT_SKILLAVG_TT: "Average time wasted between two skill casts",
  SI_TEMPER_COMBAT_SKILLTOTAL_TT: "Total time wasted between skill casts",

  SI_TEMPER_COMBAT_TOTALWA: "Weapon attacks: ",
  SI_TEMPER_COMBAT_TOTALWA_TT: "Total light and heavy attacks",
  SI_TEMPER_COMBAT_TOTALSKILLS: "Skills: ",
  SI_TEMPER_COMBAT_TOTALSKILLS_TT: "Total skills cast",

  SI_TEMPER_COMBAT_SAVED_DATA: "Saved Data",
}

export function registerStrings(): undefined {
  const zosStrings: Record<string, string> = {
    SI_TEMPER_COMBAT_HEALTH: GetString(SI_COMBATMECHANICFLAGS32),
    SI_TEMPER_COMBAT_MAGICKA: GetString(SI_COMBATMECHANICFLAGS1),
    SI_TEMPER_COMBAT_STAMINA: GetString(SI_COMBATMECHANICFLAGS4),
    SI_TEMPER_COMBAT_ULTIMATE: GetString(SI_COMBATMECHANICFLAGS8),
  }

  for (const stringTable of [STRINGS_1, STRINGS_2, zosStrings]) {
    for (const [stringId, stringValue] of Object.entries(stringTable)) {
      ZO_CreateStringId(stringId, stringValue)
      SafeAddVersion(stringId, 1)
    }
  }
}
