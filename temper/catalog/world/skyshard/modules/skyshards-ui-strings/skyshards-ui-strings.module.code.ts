import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-05/eso-functions-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-string-ids/eso-string-ids.type-declaration.d.ts"

export function registerStrings(this: void): undefined {
  const [explorationCategoryName] = GetAchievementCategoryInfo(6)
  const explorationName = explorationCategoryName ?? ""

  const strings: Record<string, string> = {
    SI_TEMPER_SKYSHARDS_KNOWN: "Collected",

    SI_TEMPER_SKYSHARDS_MOREINFO1: "Town",
    SI_TEMPER_SKYSHARDS_MOREINFO2: "Delve",
    SI_TEMPER_SKYSHARDS_MOREINFO3: "Public Dungeon",
    SI_TEMPER_SKYSHARDS_MOREINFO4: "Under ground",
    SI_TEMPER_SKYSHARDS_MOREINFO5: "Group Delve",

    SI_TEMPER_SKYSHARDS_SET_WAYPOINT: "Set waypoint to skyshard",

    SI_TEMPER_SKYSHARDS_TITLE: "SkyShards",

    SI_TEMPER_SKYSHARDS_PIN_TEXTURE: "Select map pin icons",
    SI_TEMPER_SKYSHARDS_PIN_TEXTURE_DESC: "Select map pin icons.",
    SI_TEMPER_SKYSHARDS_PIN_SIZE: "Pin size",
    SI_TEMPER_SKYSHARDS_PIN_SIZE_DESC: "Set the size of the map pins.",
    SI_TEMPER_SKYSHARDS_PIN_LAYER: "Pin layer",
    SI_TEMPER_SKYSHARDS_PIN_LAYER_DESC:
      "Set the layer of the map pins when they are at same coordinates than others",

    SI_TEMPER_SKYSHARDS_COMPASS_UNKNOWN: "Show skyshards on the compass.",
    SI_TEMPER_SKYSHARDS_COMPASS_UNKNOWN_DESC:
      "Show/hide icons for uncollected skyshards on the compass.",
    SI_TEMPER_SKYSHARDS_COMPASS_DIST: "Max pin distance",
    SI_TEMPER_SKYSHARDS_COMPASS_DIST_DESC:
      "The maximum distance for pins to appear on the compass.",

    SI_TEMPER_SKYSHARDS_MAINWORLD: "Pin color for Skyshards in overworld",
    SI_TEMPER_SKYSHARDS_MAINWORLD_DESC:
      "The color of the pins for skyshards directly available in the overworld",

    SI_TEMPER_SKYSHARDS_SKILLS: "Recap on the skill panel",
    SI_TEMPER_SKYSHARDS_SKILLS_DESC:
      "Select the display format of the SkyShards count on the skill panel.",
    SI_TEMPER_SKYSHARDS_SKILLS_OPTION1: "Basic",
    SI_TEMPER_SKYSHARDS_SKILLS_OPTION2: "Detailed",
    SI_TEMPER_SKYSHARDS_SKILLS_OPTION3: "Advanced",

    SI_TEMPER_SKYSHARDS_UNKNOWN: "Show unknown skyshards",
    SI_TEMPER_SKYSHARDS_UNKNOWN_DESC: "Show/hide icons for unknown skyshards on the map.",
    SI_TEMPER_SKYSHARDS_COLLECTED: "Show collected skyshards",
    SI_TEMPER_SKYSHARDS_COLLECTED_DESC:
      "Show/hide icons for already collected skyshards on the map.",

    SI_TEMPER_SKYSHARDS_FILTER_UNKNOWN: "(Sky) Unknown skyshards",
    SI_TEMPER_SKYSHARDS_FILTER_COLLECTED: "(Sky) Collected skyshards",

    SI_TEMPER_SKYSHARDS_IMMERSIVE: "Enable Immersive Mode based on",
    SI_TEMPER_SKYSHARDS_IMMERSIVE_DESC:
      "Unknown SkyShards won't be displayed based on the completion of the following objective on the current zone you are looking at",

    SI_TEMPER_SKYSHARDS_IMMERSIVE_CHOICE1: "Disabled",
    SI_TEMPER_SKYSHARDS_IMMERSIVE_CHOICE2: "Zone Main Quest",
    SI_TEMPER_SKYSHARDS_IMMERSIVE_CHOICE3: GetString(SI_MAPFILTER8),
    SI_TEMPER_SKYSHARDS_IMMERSIVE_CHOICE4: explorationName,
    SI_TEMPER_SKYSHARDS_IMMERSIVE_CHOICE5: "Zone Quests",
  }

  for (const [stringId, stringValue] of Object.entries(strings)) {
    ZO_CreateStringId(stringId, stringValue)
    SafeAddVersion(stringId, 1)
  }
}
