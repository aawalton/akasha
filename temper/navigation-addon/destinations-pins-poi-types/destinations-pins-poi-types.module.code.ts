import { getSettingsString } from "../destinations-lang-strings/destinations-lang-strings.module.code.ts"

export const DESTINATIONS_PIN_TYPE_AOI = 1
export const DESTINATIONS_PIN_TYPE_AYLEIDRUIN = 2
export const DESTINATIONS_PIN_TYPE_BATTLEFIELD = 3
export const DESTINATIONS_PIN_TYPE_CAMP = 4
export const DESTINATIONS_PIN_TYPE_CAVE = 5
export const DESTINATIONS_PIN_TYPE_CEMETERY = 6
export const DESTINATIONS_PIN_TYPE_CITY = 7
export const DESTINATIONS_PIN_TYPE_CRAFTING = 8
export const DESTINATIONS_PIN_TYPE_CRYPT = 9
export const DESTINATIONS_PIN_TYPE_DAEDRICRUIN = 10
export const DESTINATIONS_PIN_TYPE_DELVE = 11
export const DESTINATIONS_PIN_TYPE_DOCK = 12
export const DESTINATIONS_PIN_TYPE_DUNGEON = 13
export const DESTINATIONS_PIN_TYPE_DWEMERRUIN = 14
export const DESTINATIONS_PIN_TYPE_ESTATE = 15
export const DESTINATIONS_PIN_TYPE_FARM = 16
export const DESTINATIONS_PIN_TYPE_GATE = 17
export const DESTINATIONS_PIN_TYPE_GROUPBOSS = 18
export const DESTINATIONS_PIN_TYPE_GROUPDELVE = 19
export const DESTINATIONS_PIN_TYPE_GROUPINSTANCE = 20
export const DESTINATIONS_PIN_TYPE_GROVE = 21
export const DESTINATIONS_PIN_TYPE_KEEP = 22
export const DESTINATIONS_PIN_TYPE_LIGHTHOUSE = 23
export const DESTINATIONS_PIN_TYPE_MINE = 24
export const DESTINATIONS_PIN_TYPE_MUNDUS = 25
export const DESTINATIONS_PIN_TYPE_PORTAL = 26
export const DESTINATIONS_PIN_TYPE_RAIDDUNGEON = 27
export const DESTINATIONS_PIN_TYPE_RUIN = 28
export const DESTINATIONS_PIN_TYPE_SEWER = 29
export const DESTINATIONS_PIN_TYPE_SOLOTRIAL = 30
export const DESTINATIONS_PIN_TYPE_TOWER = 31
export const DESTINATIONS_PIN_TYPE_TOWN = 32
export const DESTINATIONS_PIN_TYPE_WAYSHRINE = 33
export const DESTINATIONS_PIN_TYPE_GUILDKIOSK = 34
export const DESTINATIONS_PIN_TYPE_PLANARARMORSCRAPS = 35
export const DESTINATIONS_PIN_TYPE_TINYCLAW = 36
export const DESTINATIONS_PIN_TYPE_MONSTROUSTEETH = 37
export const DESTINATIONS_PIN_TYPE_BONESHARD = 38
export const DESTINATIONS_PIN_TYPE_MARKLEGION = 39
export const DESTINATIONS_PIN_TYPE_DARKETHER = 40
export const DESTINATIONS_PIN_TYPE_DARKBROTHERHOOD = 41
export const DESTINATIONS_PIN_TYPE_GROUPLIGHTHOUSE = 42
export const DESTINATIONS_PIN_TYPE_GROUPESTATE = 43
export const DESTINATIONS_PIN_TYPE_GROUPRUIN = 44
export const DESTINATIONS_PIN_TYPE_GROUPCAVE = 45
export const DESTINATIONS_PIN_TYPE_GROUPCEMETERY = 46
export const DESTINATIONS_PIN_TYPE_GROUPKEEP = 47
export const DESTINATIONS_PIN_TYPE_GROUPAREAOFINTEREST = 48
export const DESTINATIONS_PIN_TYPE_HOUSING = 49
export const DESTINATIONS_PIN_TYPE_DWEMERGEAR = 50
export const DESTINATIONS_PIN_TYPE_NORDBOAT = 51
export const DESTINATIONS_PIN_TYPE_DEADLANDS = 52
export const DESTINATIONS_PIN_TYPE_HIGHISLE = 53
export const DESTINATIONS_PIN_TYPE_MUSHROMTOWER = 54
export const DESTINATIONS_PIN_TYPE_GROUPPORTAL = 55
export const DESTINATIONS_PIN_TYPE_ENDLESSARCHIVE = 56
export const DESTINATIONS_PIN_TYPE_UNKNOWN = 99
export const DESTINATIONS_PIN_PRIORITY_OFFSET = 1

const POI_TYPES: Record<number, string | undefined> = {
  [DESTINATIONS_PIN_TYPE_AOI]: getSettingsString("POITYPE_AOI"),
  [DESTINATIONS_PIN_TYPE_AYLEIDRUIN]: getSettingsString("POITYPE_QUESTHUB"),
  [DESTINATIONS_PIN_TYPE_DEADLANDS]: getSettingsString("POITYPE_DEADLANDS_ENTRANCE"),
  [DESTINATIONS_PIN_TYPE_HIGHISLE]: getSettingsString("POITYPE_DRUIDIC_SHRINE"),
  [DESTINATIONS_PIN_TYPE_BATTLEFIELD]: getSettingsString("POITYPE_QUESTHUB"),
  [DESTINATIONS_PIN_TYPE_CAMP]: getSettingsString("POITYPE_QUESTHUB"),
  [DESTINATIONS_PIN_TYPE_CAVE]: getSettingsString("POITYPE_QUESTHUB"),
  [DESTINATIONS_PIN_TYPE_CEMETERY]: getSettingsString("POITYPE_QUESTHUB"),
  [DESTINATIONS_PIN_TYPE_CITY]: getSettingsString("POITYPE_QUESTHUB"),
  [DESTINATIONS_PIN_TYPE_CRAFTING]: getSettingsString("POITYPE_CRAFTING"),
  [DESTINATIONS_PIN_TYPE_CRYPT]: getSettingsString("POITYPE_QUESTHUB"),
  [DESTINATIONS_PIN_TYPE_DAEDRICRUIN]: getSettingsString("POITYPE_QUESTHUB"),
  [DESTINATIONS_PIN_TYPE_DELVE]: getSettingsString("POITYPE_DELVE"),
  [DESTINATIONS_PIN_TYPE_DOCK]: getSettingsString("POITYPE_QUESTHUB"),
  [DESTINATIONS_PIN_TYPE_DUNGEON]: getSettingsString("POITYPE_PUBLICDUNGEON"),
  [DESTINATIONS_PIN_TYPE_DWEMERRUIN]: getSettingsString("POITYPE_QUESTHUB"),
  [DESTINATIONS_PIN_TYPE_ESTATE]: getSettingsString("POITYPE_QUESTHUB"),
  [DESTINATIONS_PIN_TYPE_FARM]: getSettingsString("POITYPE_QUESTHUB"),
  [DESTINATIONS_PIN_TYPE_GATE]: getSettingsString("POITYPE_GATE"),
  [DESTINATIONS_PIN_TYPE_GROUPBOSS]: getSettingsString("POITYPE_GROUPBOSS"),
  [DESTINATIONS_PIN_TYPE_GROUPDELVE]: getSettingsString("POITYPE_GROUPDELVE"),
  [DESTINATIONS_PIN_TYPE_GROUPINSTANCE]: getSettingsString("POITYPE_GROUPDUNGEON"),
  [DESTINATIONS_PIN_TYPE_GROVE]: getSettingsString("POITYPE_QUESTHUB"),
  [DESTINATIONS_PIN_TYPE_KEEP]: getSettingsString("POITYPE_QUESTHUB"),
  [DESTINATIONS_PIN_TYPE_LIGHTHOUSE]: getSettingsString("POITYPE_QUESTHUB"),
  [DESTINATIONS_PIN_TYPE_MINE]: getSettingsString("POITYPE_QUESTHUB"),
  [DESTINATIONS_PIN_TYPE_MUNDUS]: getSettingsString("POITYPE_MUNDUS"),
  [DESTINATIONS_PIN_TYPE_PORTAL]: getSettingsString("POITYPE_DOLMEN"),
  [DESTINATIONS_PIN_TYPE_RAIDDUNGEON]: getSettingsString("POITYPE_TRIALINSTANCE"),
  [DESTINATIONS_PIN_TYPE_RUIN]: getSettingsString("POITYPE_QUESTHUB"),
  [DESTINATIONS_PIN_TYPE_SEWER]: getSettingsString("POITYPE_QUESTHUB"),
  [DESTINATIONS_PIN_TYPE_SOLOTRIAL]: getSettingsString("POITYPE_SOLOTRIAL"),
  [DESTINATIONS_PIN_TYPE_TOWER]: getSettingsString("POITYPE_QUESTHUB"),
  [DESTINATIONS_PIN_TYPE_TOWN]: getSettingsString("POITYPE_QUESTHUB"),
  [DESTINATIONS_PIN_TYPE_WAYSHRINE]: getSettingsString("POITYPE_WAYSHRINE"),
  [DESTINATIONS_PIN_TYPE_GUILDKIOSK]: getSettingsString("POITYPE_TRADER"),
  [DESTINATIONS_PIN_TYPE_PLANARARMORSCRAPS]: getSettingsString("POITYPE_VAULT"),
  [DESTINATIONS_PIN_TYPE_TINYCLAW]: getSettingsString("POITYPE_VAULT"),
  [DESTINATIONS_PIN_TYPE_MONSTROUSTEETH]: getSettingsString("POITYPE_VAULT"),
  [DESTINATIONS_PIN_TYPE_BONESHARD]: getSettingsString("POITYPE_VAULT"),
  [DESTINATIONS_PIN_TYPE_MARKLEGION]: getSettingsString("POITYPE_VAULT"),
  [DESTINATIONS_PIN_TYPE_DARKETHER]: getSettingsString("POITYPE_VAULT"),
  [DESTINATIONS_PIN_TYPE_DARKBROTHERHOOD]: getSettingsString("POITYPE_DARK_BROTHERHOOD"),
  [DESTINATIONS_PIN_TYPE_GROUPLIGHTHOUSE]: getSettingsString("POITYPE_QUESTHUB"),
  [DESTINATIONS_PIN_TYPE_GROUPESTATE]: getSettingsString("POITYPE_QUESTHUB"),
  [DESTINATIONS_PIN_TYPE_GROUPRUIN]: getSettingsString("POITYPE_QUESTHUB"),
  [DESTINATIONS_PIN_TYPE_GROUPCAVE]: getSettingsString("POITYPE_QUESTHUB"),
  [DESTINATIONS_PIN_TYPE_GROUPCEMETERY]: getSettingsString("POITYPE_QUESTHUB"),
  [DESTINATIONS_PIN_TYPE_GROUPKEEP]: getSettingsString("POITYPE_QUESTHUB"),
  [DESTINATIONS_PIN_TYPE_GROUPAREAOFINTEREST]: getSettingsString("POITYPE_AOI"),
  [DESTINATIONS_PIN_TYPE_HOUSING]: getSettingsString("POITYPE_HOUSING"),
  [DESTINATIONS_PIN_TYPE_DWEMERGEAR]: getSettingsString("POITYPE_QUESTHUB"),
  [DESTINATIONS_PIN_TYPE_NORDBOAT]: getSettingsString("POITYPE_QUESTHUB"),
  [DESTINATIONS_PIN_TYPE_ENDLESSARCHIVE]: getSettingsString("POITYPE_ENDLESS_ARCHIVE"),
  [DESTINATIONS_PIN_TYPE_UNKNOWN]: getSettingsString("POITYPE_UNKNOWN"),
}

const POI_TYPES_IC: Record<number, string | undefined> = {
  [DESTINATIONS_PIN_TYPE_AOI]: getSettingsString("POITYPE_AOI"),
  [DESTINATIONS_PIN_TYPE_BATTLEFIELD]: getSettingsString("POITYPE_GROUPBOSS"),
  [DESTINATIONS_PIN_TYPE_CRAFTING]: getSettingsString("POITYPE_CRAFTING"),
  [DESTINATIONS_PIN_TYPE_GROUPINSTANCE]: getSettingsString("POITYPE_GROUPDUNGEON"),
  [DESTINATIONS_PIN_TYPE_SEWER]: getSettingsString("POITYPE_WAYSHRINE"),
  [DESTINATIONS_PIN_TYPE_TOWN]: getSettingsString("POITYPE_QUESTHUB"),
  [DESTINATIONS_PIN_TYPE_PLANARARMORSCRAPS]: getSettingsString("POITYPE_VAULT"),
  [DESTINATIONS_PIN_TYPE_TINYCLAW]: getSettingsString("POITYPE_VAULT"),
  [DESTINATIONS_PIN_TYPE_MONSTROUSTEETH]: getSettingsString("POITYPE_VAULT"),
  [DESTINATIONS_PIN_TYPE_BONESHARD]: getSettingsString("POITYPE_VAULT"),
  [DESTINATIONS_PIN_TYPE_MARKLEGION]: getSettingsString("POITYPE_VAULT"),
  [DESTINATIONS_PIN_TYPE_DARKETHER]: getSettingsString("POITYPE_VAULT"),
  [DESTINATIONS_PIN_TYPE_UNKNOWN]: getSettingsString("POITYPE_UNKNOWN"),
}

const ACH_TYPES: Record<number, string | undefined> = {
  [1]: getSettingsString("POITYPE_MAIQ"),
  [2]: getSettingsString("POITYPE_LB_GTTP_CP"),
  [3]: getSettingsString("POITYPE_PEACEMAKER"),
  [4]: getSettingsString("POITYPE_CRIME_PAYS"),
  [5]: getSettingsString("POITYPE_GIVE_TO_THE_POOR"),
  [6]: getSettingsString("POITYPE_LIGHTBRINGER"),
  [7]: getSettingsString("POITYPE_NOSEDIVER"),
  [8]: getSettingsString("POITYPE_EARTHLYPOS"),
  [9]: getSettingsString("POITYPE_ON_ME"),
  [10]: getSettingsString("POITYPE_BRAWL"),
  [11]: getSettingsString("POITYPE_PATRON"),
  [12]: getSettingsString("POITYPE_WROTHGAR_JUMPER"),
  [13]: getSettingsString("POITYPE_CHAMPION"),
  [14]: getSettingsString("POITYPE_RELICHUNTER"),
  [15]: getSettingsString("POITYPE_BREAKING_ENTERING"),
  [16]: getSettingsString("POITYPE_CUTPURSE_ABOVE"),
  [20]: getSettingsString("POITYPE_AYLEID_WELL"),
  [21]: getSettingsString("POITYPE_WWVAMP"),
  [22]: getSettingsString("POITYPE_VAMPIRE_ALTAR"),
  [23]: getSettingsString("POITYPE_DWEMER_RUIN"),
  [24]: getSettingsString("POITYPE_WEREWOLF_SHRINE"),
  [25]: getSettingsString("POITYPE_DEADLANDS_ENTRANCE"),
  [26]: getSettingsString("POITYPE_DRUIDIC_SHRINE"),
  [30]: getSettingsString("POITYPE_COLLECTIBLE"),
  [31]: getSettingsString("POITYPE_FISH"),
  [50]: getSettingsString("POITYPE_UNDETERMINED"),
  [55]: getSettingsString("POITYPE_UNKNOWN"),
}

export const ZONE_TO_ACHIEVEMENTS: Record<number, Record<string, number | undefined> | undefined> =
  {
    [872]: {
      khenarthisroost_base_0: 1,
      auridon_base_0: 2,
      grahtwood_base_0: 3,
      greenshade_base_0: 4,
      malabaltor_base_0: 5,
      reapersmarch_base_0: 6,
      balfoyen_base_0: 7,
      stonefalls_base_0: 8,
      deshaan_base_0: 9,
      shadowfen_base_0: 10,
      eastmarch_base_0: 11,
      therift_base_0: 12,
      betnihk_base_0: 13,
      glenumbra_base_0: 14,
      stormhaven_base_0: 15,
      rivenspire_base_0: 16,
      alikr_base_0: 17,
      bangkorai_base_0: 18,
      coldharbour_base_0: 19,
    },
    [767167]: {
      auridon_base_0: 1,
      grahtwood_base_0: 2,
      greenshade_base_0: 3,
      malabaltor_base_0: 4,
      reapersmarch_base_0: 5,
      stonefalls_base_0: 6,
      deshaan_base_0: 7,
      shadowfen_base_0: 8,
      eastmarch_base_0: 9,
      therift_base_0: 10,
      glenumbra_base_0: 11,
      stormhaven_base_0: 12,
      rivenspire_base_0: 13,
      alikr_base_0: 14,
      bangkorai_base_0: 15,
    },
    [704]: {
      glenumbra_base_0: 1,
      stonefalls_base_0: 2,
      auridon_base_0: 3,
      stormhaven_base_0: 4,
      deshaan_base_0: 5,
      grahtwood_base_0: 6,
      rivenspire_base_0: 7,
      shadowfen_base_0: 8,
      greenshade_base_0: 9,
      alikr_base_0: 10,
      eastmarch_base_0: 11,
      malabaltor_base_0: 12,
      bangkorai_base_0: 13,
      therift_base_0: 14,
      reapersmarch_base_0: 15,
      coldharbour_base_0: 16,
    },
  }

export function zoneToAchievementCriterion(
  achievementZoneMap: number,
  zoneTextureName: string | undefined
): number | undefined {
  if (zoneTextureName === undefined) return undefined
  return ZONE_TO_ACHIEVEMENTS[achievementZoneMap]?.[zoneTextureName]
}

export function getPoiTypeName(poiTypeId: number): string {
  return POI_TYPES[poiTypeId] ?? POI_TYPES[99] ?? ""
}

export function getImperialCityPoiTypeName(poiTypeId: number): string {
  return POI_TYPES_IC[poiTypeId] ?? POI_TYPES_IC[99] ?? ""
}

export function getAchTypeName(achTypeId: number): string {
  return ACH_TYPES[achTypeId] ?? ACH_TYPES[55] ?? ""
}
