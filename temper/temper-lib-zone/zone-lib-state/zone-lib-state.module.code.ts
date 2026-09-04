import { asLib, libSlashCommander } from "../zone-casts/zone-casts.module.code.ts"
import {
  BLACKLISTED_ZONE_IDS,
  LIBRARY_INFO,
  MAX_MAP_IDS,
  SUPPORTED_LANGUAGES,
} from "../zone-constants/zone-constants.module.code.ts"
import { GEO_DATA_REFERENCE_TABLE } from "../zone-geo-data/zone-geo-data.module.code.ts"
import { PRELOADED_ZONE_NAMES } from "../zone-names-data/zone-names-data.module.code.ts"
import { PUBLIC_DUNGEON_MAP_IDS } from "../zone-public-dungeon-map-ids/zone-public-dungeon-map-ids.module.code.ts"
import type { Lib } from "../zone-types/zone-types.module.code.ts"
import { UI_STRINGS_EN } from "../zone-ui-strings/zone-ui-strings.module.code.ts"

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
  LSC: libSlashCommander(),
  wayshrineString: GetString(SI_DEATH_PROMPT_WAYSHRINE),
})
