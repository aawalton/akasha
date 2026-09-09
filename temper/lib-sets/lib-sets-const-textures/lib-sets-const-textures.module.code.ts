import { asPresent, asStringOpt } from "../lib-sets-casts/lib-sets-casts.module.code.ts"

const lib = LibSets

const LANG_DE = "de"
const LANG_EN = "en"
const LANG_ES = "es"
const LANG_FR = "fr"
const LANG_RU = "ru"
const LANG_ZH = "zh"
const LANG_JP = "jp"
const LANG_PL = "pl"

const fallbackLang = lib.fallbackLang

lib.countUndauntedChests = 3
const UNDAUNTED_CHEST_IDS: { [lang: string]: { [chestIndex: number]: string } } = {
  [LANG_DE]: {
    [1]: "Glirion der Rotbart",
    [2]: "Maj al-Ragath",
    [3]: "Urgarlag Häuptlingsfluch",
  },
  [LANG_EN]: {
    [1]: "Glirion the Redbeard",
    [2]: "Maj al-Ragath",
    [3]: "Urgarlag Chief-bane",
  },
  [LANG_ES]: {
    [1]: "Glirion el Barbarroja",
    [2]: "Maj al-Ragath",
    [3]: "Urgarlag la Castradora",
  },
  [LANG_FR]: {
    [1]: "Glirion Barbe-Rousse",
    [2]: "Maj al-Ragath",
    [3]: "Urgalarg l'Èmasculatrice",
  },
  [LANG_PL]: {
    [1]: "Glirion Czerwonobrody",
    [2]: "Maj al-Ragath",
    [3]: "Urgarlag Zguba-Wodzów",
  },
  [LANG_RU]: {
    [1]: "Глирион Краснобородый",
    [2]: "Мадж аль-Рагат",
    [3]: "Ургарлаг Бич Вождей",
  },
  [LANG_ZH]: {
    [1]: "紅胡子格利里恩",
    [2]: "瑪吉·阿示拉加斯",
    [3]: "烏示加拉格·酋長克星",
  },
  [LANG_JP]: {
    [1]: "赤髭グリリオン",
    [2]: "マジ・アルラガス",
    [3]: "族長殺しのウルガルラグ",
  },
}
lib.undauntedChestIds = UNDAUNTED_CHEST_IDS

lib.armorTypeNames = {
  [ARMORTYPE_LIGHT]: GetString(SI_ARMORTYPE1) ?? "Light",
  [ARMORTYPE_MEDIUM]: GetString(SI_ARMORTYPE2) ?? "Medium",
  [ARMORTYPE_HEAVY]: GetString(SI_ARMORTYPE3) ?? "Heavy",
}

lib.weaponTypeNames = {
  [WEAPONTYPE_NONE]: GetString(SI_WEAPONTYPE0),
  [WEAPONTYPE_AXE]: GetString(SI_WEAPONTYPE1),
  [WEAPONTYPE_BOW]: GetString(SI_WEAPONTYPE8),
  [WEAPONTYPE_DAGGER]: GetString(SI_WEAPONTYPE11),
  [WEAPONTYPE_FIRE_STAFF]: GetString(SI_WEAPONTYPE12),
  [WEAPONTYPE_FROST_STAFF]: GetString(SI_WEAPONTYPE13),
  [WEAPONTYPE_HAMMER]: GetString(SI_WEAPONTYPE2),
  [WEAPONTYPE_HEALING_STAFF]: GetString(SI_WEAPONTYPE9),
  [WEAPONTYPE_LIGHTNING_STAFF]: GetString(SI_WEAPONTYPE15),
  [WEAPONTYPE_RUNE]: GetString(SI_WEAPONTYPE10),
  [WEAPONTYPE_SHIELD]: GetString(SI_WEAPONTYPE14),
  [WEAPONTYPE_SWORD]: GetString(SI_WEAPONTYPE3),
  [WEAPONTYPE_TWO_HANDED_AXE]: GetString(SI_WEAPONTYPE5),
  [WEAPONTYPE_TWO_HANDED_HAMMER]: GetString(SI_WEAPONTYPE6),
  [WEAPONTYPE_TWO_HANDED_SWORD]: GetString(SI_WEAPONTYPE4),
}

const SPECIAL_ZONE_NAMES = lib.specialZoneNames
const specialZoneNamesEn = asPresent(SPECIAL_ZONE_NAMES[fallbackLang])

const dropMechanicNames = lib.dropMechanicIdToName
const dropMechanicNamesEn = asPresent(dropMechanicNames[fallbackLang])

const dropMechanicTooltipNames = lib.dropMechanicIdToNameTooltip
const dropMechanicTooltipNamesEn = asPresent(dropMechanicTooltipNames[fallbackLang])

const localization = lib.localization
const localizationEn = asPresent(lib.localization[fallbackLang])

for (const [supportedLanguage, isSupported] of pairs(lib.supportedLanguages)) {
  if (isSupported === true && supportedLanguage !== fallbackLang) {
    const specialZoneNamesLang = SPECIAL_ZONE_NAMES[supportedLanguage]
    if (specialZoneNamesLang !== undefined) {
      setmetatable(specialZoneNamesLang, { __index: specialZoneNamesEn })
    }
    const dropMechanicNamesLang = dropMechanicNames[supportedLanguage]
    if (dropMechanicNamesLang !== undefined) {
      setmetatable(dropMechanicNamesLang, { __index: dropMechanicNamesEn })
    }
    const dropMechanicTooltipNamesLang = dropMechanicTooltipNames[supportedLanguage]
    if (dropMechanicTooltipNamesLang !== undefined) {
      setmetatable(dropMechanicTooltipNamesLang, { __index: dropMechanicTooltipNamesEn })
    }
    const localizationLang = localization[supportedLanguage]
    if (localizationLang !== undefined) {
      setmetatable(localizationLang, { __index: localizationEn })
    }
  }
}

const clientLocalization = asPresent(lib.localization[lib.clientLang])

const SUPPORTED_LANGUAGE_CHOICES = lib.supportedLanguageChoices
const SUPPORTED_LANGUAGE_CHOICES_TOOLTIPS: string[] = []
for (const [langIndex, langStr] of ipairs(SUPPORTED_LANGUAGE_CHOICES)) {
  let langStrLong = asStringOpt(clientLocalization[langStr])
  if (langStrLong === undefined || langStrLong === "") {
    langStrLong = langStr
  }
  SUPPORTED_LANGUAGE_CHOICES_TOOLTIPS[langIndex - 1] = langStrLong
  if (langStr !== langStrLong) {
    SUPPORTED_LANGUAGE_CHOICES[langIndex - 1] = langStrLong
  }
}
lib.supportedLanguageChoicesTooltips = SUPPORTED_LANGUAGE_CHOICES_TOOLTIPS
