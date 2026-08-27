import { asLib } from "./casts"
import { BLACKLISTED_ZONE_IDS, LIBRARY_INFO, MAX_MAP_IDS, SUPPORTED_LANGUAGES } from "./constants"
import { GEO_DATA_REFERENCE_TABLE } from "./generated/geo-data.generated"
import { PRELOADED_ZONE_NAMES, PUBLIC_DUNGEON_MAP_IDS } from "./generated/zone-data.generated"
import type { Lib } from "./types"
import { UI_STRINGS_EN } from "./ui-strings"

export function checkIfLanguageIsSupported(this: void, lang: string | undefined): boolean {
  if (lang === undefined) return false
  for (const [, langIsSupported] of pairs(SUPPORTED_LANGUAGES)) {
    if (lang === langIsSupported) return true
  }
  return false
}

function buildEnglishTranslations(this: void): Record<string, Record<string, string>> {
  const translations: Record<string, Record<string, string>> = {}
  for (const [, lang] of pairs(SUPPORTED_LANGUAGES)) {
    translations[lang] = UI_STRINGS_EN
  }
  return translations
}

function resolveClientLanguage(this: void): string {
  const clientLang = GetCVar("language.2")
  if (!checkIfLanguageIsSupported(clientLang)) return "en"
  return clientLang
}

export const lib: Lib = asLib({
  libraryInfo: LIBRARY_INFO,
  oldMinor: undefined,
  currentAPIVersion: GetAPIVersion(),
  worldName: GetWorldName(),

  zoneData: {},
  localizedZoneData: {},
  geoDebugData: {},
  svDebugData: undefined,
  publicDungeonMapIds: PUBLIC_DUNGEON_MAP_IDS,

  searchDirty: true,
  searchTranslatedZoneResultList: {},
  searchTranslatedZoneLookupList: {},

  maxZoneIndices: 0,
  maxZoneIds: 0,
  maxMapIds: MAX_MAP_IDS,

  currentClientLanguage: resolveClientLanguage(),
  supportedLanguages: SUPPORTED_LANGUAGES,
  translations: buildEnglishTranslations(),
  blacklistedZoneIdsForAutoCompletion: BLACKLISTED_ZONE_IDS,

  preloadedZoneNames: PRELOADED_ZONE_NAMES,
  geoDataReferenceTable: GEO_DATA_REFERENCE_TABLE,
  adjustedParentZoneIds: {},
  adjustedParentMultiZoneIds: {},

  checkIfLanguageIsSupported,
  mapId2Name: {},
  commandsLzt: {},
  LSC: LibSlashCommander,
  wayshrineString: GetString(SI_DEATH_PROMPT_WAYSHRINE),
})
