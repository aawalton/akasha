import {
  CollectibleDataIndex as COLLECTIBLE_INDEX_DE,
  CollectibleDataStore as COLLECTIBLE_STORE_DE,
} from "./generated/collectibles-de-data.generated"
import {
  CollectibleDataIndex as COLLECTIBLE_INDEX_EN,
  CollectibleDataStore as COLLECTIBLE_STORE_EN,
} from "./generated/collectibles-en-data.generated"
import {
  CollectibleDataIndex as COLLECTIBLE_INDEX_FR,
  CollectibleDataStore as COLLECTIBLE_STORE_FR,
} from "./generated/collectibles-fr-data.generated"
import {
  CollectibleDataIndex as COLLECTIBLE_INDEX_FX,
  CollectibleDataStore as COLLECTIBLE_STORE_FX,
} from "./generated/collectibles-fx-data.generated"
import {
  CollectibleDataIndex as COLLECTIBLE_INDEX_JF,
  CollectibleDataStore as COLLECTIBLE_STORE_JF,
} from "./generated/collectibles-jf-data.generated"
import {
  CollectibleDataIndex as COLLECTIBLE_INDEX_JP,
  CollectibleDataStore as COLLECTIBLE_STORE_JP,
} from "./generated/collectibles-jp-data.generated"
import {
  CollectibleDataIndex as COLLECTIBLE_INDEX_PL,
  CollectibleDataStore as COLLECTIBLE_STORE_PL,
} from "./generated/collectibles-pl-data.generated"
import {
  CollectibleDataIndex as COLLECTIBLE_INDEX_RU,
  CollectibleDataStore as COLLECTIBLE_STORE_RU,
} from "./generated/collectibles-ru-data.generated"
import {
  CollectibleDataIndex as COLLECTIBLE_INDEX_ZH,
  CollectibleDataStore as COLLECTIBLE_STORE_ZH,
} from "./generated/collectibles-zh-data.generated"
import { SETTINGS_STRINGS as SETTINGS_DE } from "./generated/settings-de-data.generated"
import { SETTINGS_STRINGS as SETTINGS_EN } from "./generated/settings-en-data.generated"
import { SETTINGS_STRINGS as SETTINGS_ES } from "./generated/settings-es-data.generated"
import { SETTINGS_STRINGS as SETTINGS_FR } from "./generated/settings-fr-data.generated"
import { SETTINGS_STRINGS as SETTINGS_FX } from "./generated/settings-fx-data.generated"
import { SETTINGS_STRINGS as SETTINGS_JF } from "./generated/settings-jf-data.generated"
import { SETTINGS_STRINGS as SETTINGS_JP } from "./generated/settings-jp-data.generated"
import { SETTINGS_STRINGS as SETTINGS_PL } from "./generated/settings-pl-data.generated"
import { SETTINGS_STRINGS as SETTINGS_RU } from "./generated/settings-ru-data.generated"
import { SETTINGS_STRINGS as SETTINGS_ZH } from "./generated/settings-zh-data.generated"

export interface CollectiblesData {
  CollectibleDataIndex: { KEY: number; NUMBER: number; NAME: number }
  CollectibleDataStore: Record<number, (string | number)[][]>
}

const settingsStringsByLanguage: Record<string, Record<string, string> | undefined> = {
  de: SETTINGS_DE,
  en: SETTINGS_EN,
  es: SETTINGS_ES,
  fr: SETTINGS_FR,
  fx: SETTINGS_FX,
  jf: SETTINGS_JF,
  jp: SETTINGS_JP,
  pl: SETTINGS_PL,
  ru: SETTINGS_RU,
  zh: SETTINGS_ZH,
}

const collectiblesByLanguage: Record<string, CollectiblesData | undefined> = {
  de: { CollectibleDataIndex: COLLECTIBLE_INDEX_DE, CollectibleDataStore: COLLECTIBLE_STORE_DE },
  en: { CollectibleDataIndex: COLLECTIBLE_INDEX_EN, CollectibleDataStore: COLLECTIBLE_STORE_EN },
  fr: { CollectibleDataIndex: COLLECTIBLE_INDEX_FR, CollectibleDataStore: COLLECTIBLE_STORE_FR },
  fx: { CollectibleDataIndex: COLLECTIBLE_INDEX_FX, CollectibleDataStore: COLLECTIBLE_STORE_FX },
  jf: { CollectibleDataIndex: COLLECTIBLE_INDEX_JF, CollectibleDataStore: COLLECTIBLE_STORE_JF },
  jp: { CollectibleDataIndex: COLLECTIBLE_INDEX_JP, CollectibleDataStore: COLLECTIBLE_STORE_JP },
  pl: { CollectibleDataIndex: COLLECTIBLE_INDEX_PL, CollectibleDataStore: COLLECTIBLE_STORE_PL },
  ru: { CollectibleDataIndex: COLLECTIBLE_INDEX_RU, CollectibleDataStore: COLLECTIBLE_STORE_RU },
  zh: { CollectibleDataIndex: COLLECTIBLE_INDEX_ZH, CollectibleDataStore: COLLECTIBLE_STORE_ZH },
}

const clientLanguage: string = GetCVar("Language.2")

export function getClientLanguage(): string {
  return clientLanguage
}

const activeSettingsStrings: Record<string, string> =
  settingsStringsByLanguage[clientLanguage] ?? SETTINGS_EN

export function registerSettingsStrings(): undefined {
  for (const [key, value] of Object.entries(activeSettingsStrings)) {
    ZO_CreateStringId(key, value)
  }
}

export function getSettingsString(key: string): string {
  return activeSettingsStrings[key] ?? SETTINGS_EN[key] ?? ""
}

export function getCollectiblesData(): CollectiblesData {
  return (
    collectiblesByLanguage[clientLanguage] ?? {
      CollectibleDataIndex: COLLECTIBLE_INDEX_EN,
      CollectibleDataStore: COLLECTIBLE_STORE_EN,
    }
  )
}
