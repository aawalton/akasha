import {
  DEST_PIN_TEXT_COLOR_ENGLISH_KEEP,
  DEST_PIN_TEXT_COLOR_ENGLISH_POI,
} from "../destinations-colors/destinations-colors.module.code.ts"
import { DEFAULTS } from "../destinations-defaults/destinations-defaults.module.code.ts"
import {
  getClientLanguage,
  getSettingsString,
} from "../destinations-lang-strings/destinations-lang-strings.module.code.ts"
import {
  getAccountWideSavedVariables,
  getSavedVariables,
} from "../destinations-saved-variables/destinations-saved-variables.module.code.ts"
import {
  accountWideColored,
  reloadWarningColored,
} from "../destinations-settings-helpers/destinations-settings-helpers.module.code.ts"

function buildAccountWideToggle(): LamCheckboxData {
  return {
    type: "checkbox",
    name: accountWideColored("DEST_SETTINGS_USE_ACCOUNTWIDE"),
    tooltip: getSettingsString("DEST_SETTINGS_USE_ACCOUNTWIDE_TT"),
    getFunc: () => getAccountWideSavedVariables().settings.useAccountWide,
    setFunc: (state) => {
      getAccountWideSavedVariables().settings.useAccountWide = state
      ReloadUI("ingame")
    },
    warning: reloadWarningColored("DEST_SETTINGS_RELOAD_WARNING"),
    default: DEFAULTS.settings.useAccountWide,
  }
}

function buildPoiImprovementsSubmenu(): LamSubmenuData {
  const sv = getSavedVariables()
  const controls: LamControlData[] = []
  controls.push({
    type: "checkbox",
    name: getSettingsString("DEST_SETTINGS_POI_SHOW_ENGLISH"),
    tooltip: getSettingsString("DEST_SETTINGS_POI_SHOW_ENGLISH_TT"),
    getFunc: () => sv.settings.AddEnglishOnUnknwon,
    setFunc: (state) => {
      sv.settings.AddEnglishOnUnknwon = state
    },
    default: DEFAULTS.settings.AddEnglishOnUnknwon,
    disabled: () => getClientLanguage() === "en",
  })
  controls.push({
    type: "colorpicker",
    name: getSettingsString("DEST_SETTINGS_POI_ENGLISH_COLOR"),
    tooltip: getSettingsString("DEST_SETTINGS_POI_ENGLISH_COLOR_TT"),
    getFunc: () => {
      return DEST_PIN_TEXT_COLOR_ENGLISH_POI.UnpackRGBA()
    },
    setFunc: (r, g, b, a) => {
      DEST_PIN_TEXT_COLOR_ENGLISH_POI.SetRGBA(r, g, b, a ?? 1)
      sv.settings.EnglishColorPOI = DEST_PIN_TEXT_COLOR_ENGLISH_POI.ToHex()
    },
    default: ZO_HIGHLIGHT_TEXT,
    disabled: () => !sv.settings.AddEnglishOnUnknwon,
  })
  controls.push({
    type: "checkbox",
    name: getSettingsString("DEST_SETTINGS_POI_SHOW_ENGLISH_KEEPS"),
    tooltip: getSettingsString("DEST_SETTINGS_POI_SHOW_ENGLISH_KEEPS_TT"),
    getFunc: () => sv.settings.AddEnglishOnKeeps,
    setFunc: (state) => {
      sv.settings.AddEnglishOnKeeps = state
    },
    default: DEFAULTS.settings.AddEnglishOnKeeps,
    disabled: () => getClientLanguage() === "en",
  })
  controls.push({
    type: "colorpicker",
    name: getSettingsString("DEST_SETTINGS_POI_ENGLISH_KEEPS_COLOR"),
    tooltip: getSettingsString("DEST_SETTINGS_POI_ENGLISH_KEEPS_COLOR_TT"),
    getFunc: () => {
      return DEST_PIN_TEXT_COLOR_ENGLISH_KEEP.UnpackRGBA()
    },
    setFunc: (r, g, b, a) => {
      DEST_PIN_TEXT_COLOR_ENGLISH_KEEP.SetRGBA(r, g, b, a ?? 1)
      sv.settings.EnglishColorKeeps = DEST_PIN_TEXT_COLOR_ENGLISH_KEEP.ToHex()
    },
    default: ZO_HIGHLIGHT_TEXT,
    disabled: () => !sv.settings.AddEnglishOnKeeps,
  })
  controls.push({
    type: "checkbox",
    name: getSettingsString("DEST_SETTINGS_POI_ENGLISH_KEEPS_HA"),
    tooltip: getSettingsString("DEST_SETTINGS_POI_ENGLISH_KEEPS_HA_TT"),
    getFunc: () => sv.settings.HideAllianceOnKeeps,
    setFunc: (value) => {
      sv.settings.HideAllianceOnKeeps = value
    },
    default: DEFAULTS.settings.HideAllianceOnKeeps,
    disabled: () => !sv.settings.AddEnglishOnKeeps,
  })
  controls.push({
    type: "checkbox",
    name: getSettingsString("DEST_SETTINGS_POI_ENGLISH_KEEPS_NL"),
    tooltip: getSettingsString("DEST_SETTINGS_POI_ENGLISH_KEEPS_NL_TT"),
    getFunc: () => sv.settings.AddNewLineOnKeeps,
    setFunc: (value) => {
      sv.settings.AddNewLineOnKeeps = value
    },
    default: DEFAULTS.settings.AddNewLineOnKeeps,
    disabled: () => !sv.settings.AddEnglishOnKeeps,
  })
  controls.push({
    type: "checkbox",
    name: getSettingsString("DEST_SETTINGS_POI_IMPROVE_MUNDUS"),
    tooltip: getSettingsString("DEST_SETTINGS_POI_IMPROVE_MUNDUS_TT"),
    getFunc: () => sv.settings.ImproveMundus,
    setFunc: (state) => {
      sv.settings.ImproveMundus = state
    },
    default: DEFAULTS.settings.ImproveMundus,
  })
  controls.push({
    type: "checkbox",
    name: getSettingsString("DEST_SETTINGS_POI_IMPROVE_CRAFTING"),
    tooltip: getSettingsString("DEST_SETTINGS_POI_IMPROVE_CRAFTING_TT"),
    getFunc: () => sv.settings.ImproveCrafting,
    setFunc: (state) => {
      sv.settings.ImproveCrafting = state
    },
    default: DEFAULTS.settings.ImproveCrafting,
  })
  return {
    type: "submenu",
    name: DEFAULTS.miscColorCodes.settingsTextImprove.Colorize(
      getSettingsString("DEST_SETTINGS_IMPROVEMENT_HEADER")
    ),
    tooltip: getSettingsString("DEST_SETTINGS_IMPROVEMENT_HEADER_TT"),
    controls,
  }
}

export function buildGeneralOptions(): LamControlData[] {
  const options: LamControlData[] = [buildAccountWideToggle()]
  if (getAccountWideSavedVariables().settings.useAccountWide) {
    options.push({
      type: "description",
      text: accountWideColored("DEST_SETTINGS_PER_CHAR_HEADER"),
    })
  }
  options.push(buildPoiImprovementsSubmenu())
  return options
}
