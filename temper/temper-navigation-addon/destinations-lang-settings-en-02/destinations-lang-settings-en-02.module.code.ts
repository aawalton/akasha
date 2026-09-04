import { achievementName } from "../destinations-data-runtime/destinations-data-runtime.module.code.ts"

export const SETTINGS_STRINGS_02: Record<string, string> = {
  POITYPE_ENDLESS_ARCHIVE: "Endless Archive",
  POITYPE_FISH: "Fishing",
  POITYPE_GATE: "Gate",
  POITYPE_GIVE_TO_THE_POOR: zo_strformat(achievementName(871)),
  POITYPE_GROUPBOSS: "Group Boss",
  POITYPE_GROUPDELVE: "Group Delve",
  POITYPE_GROUPDUNGEON: "Group Dungeon",
  POITYPE_GROUPEVENT: "Group Event",
  POITYPE_HOUSING: "House",
  POITYPE_LB_GTTP_CP:
    zo_strformat(achievementName(873)) +
    "/" +
    zo_strformat(achievementName(871)) +
    "/" +
    zo_strformat(achievementName(869)),
  POITYPE_LIGHTBRINGER: zo_strformat(achievementName(873)),
  POITYPE_MAIQ: zo_strformat(achievementName(872)),
  POITYPE_MUNDUS: "Mundus Stone",
  POITYPE_NOSEDIVER: zo_strformat(achievementName(406)),
  POITYPE_ON_ME: zo_strformat(achievementName(704)),
  POITYPE_PATRON: zo_strformat(achievementName(1316)),
  POITYPE_PEACEMAKER: zo_strformat(achievementName(716)),
  POITYPE_PUBLICDUNGEON: "Public Dungeon",
  POITYPE_QUESTHUB: "Quest Hub",
  POITYPE_RELICHUNTER: zo_strformat(achievementName(1250)),
  POITYPE_SOLOTRIAL: "Trial",
  POITYPE_TRADER: "Guild Traders",
  POITYPE_TRIALINSTANCE: "Trial Instance",
  POITYPE_UNDETERMINED: "Undetermined",
  POITYPE_UNKNOWN: "Unknown",
  POITYPE_VAMPIRE_ALTAR: "Vampire Altar",
  POITYPE_VAULT: "Vault",
  POITYPE_WAYSHRINE: "Wayshrine",
  POITYPE_WEREWOLF_SHRINE: "Werewolf Shrine",
  POITYPE_WROTHGAR_JUMPER: zo_strformat(achievementName(1331)),
  POITYPE_WWVAMP: "Werewolf/Vampire",
  RELOADUI_INFO:
    "Changes to this setting will not be in effect until after you have clicked the 'ReloadUI' button.",
  RELOADUI_WARNING: "If you click this button, the game will do a /reloadui",
}
