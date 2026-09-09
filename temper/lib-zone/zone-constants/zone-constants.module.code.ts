export const LIB_NAME = "LibZone"

export const LIBRARY_INFO = {
  name: "LibZone",
  version: 8.98,
  author: "Baertram",
  url: "https://www.esoui.com/downloads/info2171-LibZone.html",
  svDataName: "LibZone_SV_Data",
  svLocalizedDataName: "LibZone_Localized_SV_Data",
  svGeoDebugDataName: "LibZone_GeoDebug_SV_Data",
  svDebugDataName: "LibZone_Debug_SV_Data",
  svVersion: 8.98,
  svDataTableName: "ZoneData",
  svMissingZoneDataTableName: "MissingZoneData",
} as const

export const SUPPORTED_LANGUAGES: Record<number, string> = {
  [1]: "de",
  [2]: "en",
  [3]: "fr",
  [4]: "jp",
  [5]: "ru",
  [6]: "pl",
  [7]: "es",
  [8]: "zh",
}

export const MAX_MAP_IDS = 3500

export const BLACKLISTED_ZONE_IDS: Record<number, boolean> = {
  [2]: true,
  [279]: true,
  [774]: true,
  [775]: true,
  [776]: true,
  [777]: true,
  [778]: true,
  [779]: true,
  [781]: true,
  [782]: true,
  [783]: true,
  [784]: true,
  [785]: true,
  [786]: true,
  [787]: true,
  [788]: true,
  [789]: true,
  [790]: true,
  [791]: true,
  [792]: true,
  [793]: true,
  [794]: true,
  [795]: true,
  [796]: true,
  [797]: true,
  [798]: true,
  [799]: true,
  [800]: true,
  [801]: true,
  [802]: true,
  [803]: true,
  [804]: true,
  [805]: true,
  [806]: true,
  [807]: true,
  [808]: true,
  [917]: true,
  [1107]: true,
}

export const FORMATTED_ZONE_STR = "%s|caaaaaa - %s"
