import {
  DEST_PIN_TEXT_COLOR_AYLEID,
  DEST_PIN_TINT_AYLEID,
  DEST_PIN_TINT_DWEMER,
} from "../destinations-colors/destinations-colors.module.code.ts"
import { DEFAULTS } from "../destinations-defaults/destinations-defaults.module.code.ts"
import { getSettingsString } from "../destinations-lang-strings/destinations-lang-strings.module.code.ts"
import { PIN_TEXTURE_PATHS } from "../destinations-pin-texture-paths/destinations-pin-texture-paths.module.code.ts"
import { PIN_TEXTURE_LISTS } from "../destinations-pin-textures/destinations-pin-textures.module.code.ts"
import { PIN_TYPES } from "../destinations-pin-type-constants/destinations-pin-type-constants.module.code.ts"
import { togglePins } from "../destinations-pins-filters/destinations-pins-filters.module.code.ts"
import {
  getCharacterSavedVariables,
  getSavedVariables,
} from "../destinations-saved-variables/destinations-saved-variables.module.code.ts"
import {
  achHeaderName,
  choiceAt,
  colorDefaultRgb,
  colorDefaultRgba,
  compassPinLayout,
  isFilterEnabled,
  perCharName,
  perCharToggleTooltip,
  redrawAllPins,
  redrawCompassPinsOnly,
  texturePathAt,
  tooltipWithPerChar,
  unpackRgb,
  unpackRgba,
} from "../destinations-settings-helpers/destinations-settings-helpers.module.code.ts"
import { getIconPreviews } from "../destinations-settings-icon-previews/destinations-settings-icon-previews.module.code.ts"

const LMP = LibMapPins

const MISC_POI_TYPES: readonly string[] = [
  PIN_TYPES.AYLEID,
  PIN_TYPES.DEADLANDS,
  PIN_TYPES.HIGHISLE,
  PIN_TYPES.DWEMER,
]

function filterDisabled(pinType: string): (this: void) => boolean {
  return () => !isFilterEnabled(getCharacterSavedVariables().filters, pinType)
}

function allMiscFiltersDisabled(): boolean {
  const filters = getCharacterSavedVariables().filters
  for (const pinType of MISC_POI_TYPES) {
    if (isFilterEnabled(filters, pinType)) {
      return false
    }
  }
  return true
}

function appendAyleidControls(controls: LamControlData[]): undefined {
  const sv = getSavedVariables()
  controls.push({
    type: "header",
    name: achHeaderName("DEST_SETTINGS_MISC_AYLEID_WELL_HEADER"),
  })
  controls.push({
    type: "checkbox",
    width: "half",
    name: perCharName("DEST_SETTINGS_MISC_PIN_AYLEID_WELL_TOGGLE"),
    tooltip: tooltipWithPerChar("DEST_SETTINGS_MISC_PIN_AYLEID_WELL_TOGGLE_TT"),
    getFunc: () => isFilterEnabled(getCharacterSavedVariables().filters, PIN_TYPES.AYLEID),
    setFunc: (state) => {
      togglePins(PIN_TYPES.AYLEID, state)
      redrawAllPins(PIN_TYPES.AYLEID)
    },
    default: DEFAULTS.filters[PIN_TYPES.AYLEID] ?? false,
  })
  controls.push({
    type: "dropdown",
    width: "half",
    name: "",
    reference: "previewpinTextureAyleid",
    choices: PIN_TEXTURE_LISTS.Ayleid,
    getFunc: () => choiceAt(PIN_TEXTURE_LISTS.Ayleid, sv.pins.pinTextureAyleid.type),
    setFunc: (selected) => {
      for (let i = 0; i < PIN_TEXTURE_LISTS.Ayleid.length; i++) {
        if (PIN_TEXTURE_LISTS.Ayleid[i] === selected) {
          const index = i + 1
          sv.pins.pinTextureAyleid.type = index
          LMP.SetLayoutKey(
            PIN_TYPES.AYLEID,
            "texture",
            texturePathAt(PIN_TEXTURE_PATHS.Ayleid, index)
          )
          getIconPreviews().ayleid.SetTexture(texturePathAt(PIN_TEXTURE_PATHS.Ayleid, index))
          redrawAllPins(PIN_TYPES.AYLEID)
          break
        }
      }
    },
    disabled: filterDisabled(PIN_TYPES.AYLEID),
    default: choiceAt(PIN_TEXTURE_LISTS.Ayleid, DEFAULTS.pins.pinTextureAyleid.type),
  })
  controls.push({
    type: "slider",
    name: getSettingsString("DEST_SETTINGS_MISC_PIN_AYLEID_WELL_SIZE"),
    min: 20,
    max: 70,
    getFunc: () => sv.pins.pinTextureAyleid.size,
    setFunc: (size) => {
      sv.pins.pinTextureAyleid.size = size
      getIconPreviews().ayleid.SetDimensions(size, size)
      LMP.SetLayoutKey(PIN_TYPES.AYLEID, "size", size)
      redrawAllPins(PIN_TYPES.AYLEID)
    },
    disabled: filterDisabled(PIN_TYPES.AYLEID),
    default: DEFAULTS.pins.pinTextureAyleid.size,
  })
  controls.push({
    type: "colorpicker",
    name: getSettingsString("DEST_SETTINGS_MISC_PIN_AYLEID_WELL_COLOR"),
    tooltip: getSettingsString("DEST_SETTINGS_MISC_PIN_AYLEID_WELL_COLOR_TT"),
    getFunc: () => {
      return unpackRgba(sv.pins.pinTextureAyleid.tint)
    },
    setFunc: (r, g, b, a) => {
      sv.pins.pinTextureAyleid.tint = [r, g, b, a ?? 1]
      DEST_PIN_TINT_AYLEID.SetRGBA(r, g, b, a ?? 1)
      getIconPreviews().ayleid.SetColor(r, g, b, a)
      redrawAllPins(PIN_TYPES.AYLEID)
    },
    disabled: filterDisabled(PIN_TYPES.AYLEID),
    default: colorDefaultRgba(DEFAULTS.pins.pinTextureAyleid.tint),
  })
  controls.push({
    type: "colorpicker",
    name: getSettingsString("DEST_SETTINGS_MISC_PINTEXT_AYLEID_WELL_COLOR"),
    tooltip: getSettingsString("DEST_SETTINGS_MISC_PINTEXT_AYLEID_WELL_COLOR_TT"),
    getFunc: () => {
      return unpackRgb(sv.pins.pinTextureAyleid.textcolor)
    },
    setFunc: (r, g, b) => {
      sv.pins.pinTextureAyleid.textcolor = [r, g, b]
      DEST_PIN_TEXT_COLOR_AYLEID.SetRGB(r, g, b)
      LMP.RefreshPins(PIN_TYPES.AYLEID)
    },
    disabled: filterDisabled(PIN_TYPES.AYLEID),
    default: colorDefaultRgb(DEFAULTS.pins.pinTextureAyleid.textcolor),
  })
}

function appendSimpleMiscPoiControls(
  controls: LamControlData[],
  spec: {
    headerKey: string
    toggleKey: string
    sizeKey: string
    textColorKey: string
    pinType: string
    pinSettings: { size: number; textcolor: number[] }
    sizeDefault: number
    textColorDefault: readonly number[]
  }
): undefined {
  controls.push({ type: "header", name: achHeaderName(spec.headerKey) })
  controls.push({
    type: "checkbox",
    name: perCharName(spec.toggleKey),
    tooltip: tooltipWithPerChar(`${spec.toggleKey}_TT`),
    getFunc: () => isFilterEnabled(getCharacterSavedVariables().filters, spec.pinType),
    setFunc: (state) => {
      togglePins(spec.pinType, state)
      redrawAllPins(spec.pinType)
    },
    default: DEFAULTS.filters[spec.pinType] ?? false,
  })
  controls.push({
    type: "slider",
    name: getSettingsString(spec.sizeKey),
    min: 20,
    max: 70,
    getFunc: () => spec.pinSettings.size,
    setFunc: (size) => {
      spec.pinSettings.size = size
      LMP.SetLayoutKey(spec.pinType, "size", size)
      redrawAllPins(spec.pinType)
    },
    disabled: filterDisabled(spec.pinType),
    default: spec.sizeDefault,
  })
  controls.push({
    type: "colorpicker",
    name: getSettingsString(spec.textColorKey),
    tooltip: getSettingsString(`${spec.textColorKey}_TT`),
    getFunc: () => {
      return unpackRgb(spec.pinSettings.textcolor)
    },
    setFunc: (r, g, b) => {
      spec.pinSettings.textcolor = [r, g, b]
      LMP.RefreshPins(spec.pinType)
    },
    disabled: filterDisabled(spec.pinType),
    default: colorDefaultRgb(spec.textColorDefault),
  })
}

function appendDwemerControls(controls: LamControlData[]): undefined {
  const sv = getSavedVariables()
  controls.push({ type: "header", name: achHeaderName("DEST_SETTINGS_MISC_DWEMER_HEADER") })
  controls.push({
    type: "checkbox",
    width: "half",
    name: perCharName("DEST_SETTINGS_MISC_DWEMER_PIN_TOGGLE"),
    tooltip: tooltipWithPerChar("DEST_SETTINGS_MISC_DWEMER_PIN_TOGGLE_TT"),
    getFunc: () => isFilterEnabled(getCharacterSavedVariables().filters, PIN_TYPES.DWEMER),
    setFunc: (state) => {
      togglePins(PIN_TYPES.DWEMER, state)
      redrawAllPins(PIN_TYPES.DWEMER)
    },
    default: DEFAULTS.filters[PIN_TYPES.DWEMER] ?? false,
  })
  controls.push({
    type: "dropdown",
    width: "half",
    name: "",
    reference: "previewpinTextureDwemer",
    choices: PIN_TEXTURE_LISTS.Dwemer,
    getFunc: () => choiceAt(PIN_TEXTURE_LISTS.Dwemer, sv.pins.pinTextureDwemer.type),
    setFunc: (selected) => {
      for (let i = 0; i < PIN_TEXTURE_LISTS.Dwemer.length; i++) {
        if (PIN_TEXTURE_LISTS.Dwemer[i] === selected) {
          const index = i + 1
          sv.pins.pinTextureDwemer.type = index
          LMP.SetLayoutKey(
            PIN_TYPES.DWEMER,
            "texture",
            texturePathAt(PIN_TEXTURE_PATHS.dwemer, index)
          )
          getIconPreviews().dwemer.SetTexture(texturePathAt(PIN_TEXTURE_PATHS.dwemer, index))
          redrawAllPins(PIN_TYPES.DWEMER)
          break
        }
      }
    },
    disabled: filterDisabled(PIN_TYPES.DWEMER),
    default: choiceAt(PIN_TEXTURE_LISTS.Dwemer, DEFAULTS.pins.pinTextureDwemer.type),
  })
  controls.push({
    type: "slider",
    name: getSettingsString("DEST_SETTINGS_MISC_DWEMER_PIN_SIZE"),
    min: 20,
    max: 70,
    getFunc: () => sv.pins.pinTextureDwemer.size,
    setFunc: (size) => {
      sv.pins.pinTextureDwemer.size = size
      getIconPreviews().dwemer.SetDimensions(size, size)
      LMP.SetLayoutKey(PIN_TYPES.DWEMER, "size", size)
      redrawAllPins(PIN_TYPES.DWEMER)
    },
    disabled: filterDisabled(PIN_TYPES.DWEMER),
    default: DEFAULTS.pins.pinTextureDwemer.size,
  })
  controls.push({
    type: "colorpicker",
    name: getSettingsString("DEST_SETTINGS_MISC_DWEMER_PIN_COLOR"),
    tooltip: getSettingsString("DEST_SETTINGS_MISC_DWEMER_PIN_COLOR_TT"),
    getFunc: () => {
      return unpackRgba(sv.pins.pinTextureDwemer.tint)
    },
    setFunc: (r, g, b, a) => {
      sv.pins.pinTextureDwemer.tint = [r, g, b, a ?? 1]
      DEST_PIN_TINT_DWEMER.SetRGBA(r, g, b, a ?? 1)
      getIconPreviews().dwemer.SetColor(r, g, b, a)
      redrawAllPins(PIN_TYPES.DWEMER)
    },
    disabled: filterDisabled(PIN_TYPES.DWEMER),
    default: colorDefaultRgba(DEFAULTS.pins.pinTextureDwemer.tint),
  })
  controls.push({
    type: "colorpicker",
    name: getSettingsString("DEST_SETTINGS_MISC_DWEMER_PINTEXT_COLOR"),
    tooltip: getSettingsString("DEST_SETTINGS_MISC_DWEMER_PINTEXT_COLOR_TT"),
    getFunc: () => {
      return unpackRgb(sv.pins.pinTextureDwemer.textcolor)
    },
    setFunc: (r, g, b) => {
      sv.pins.pinTextureDwemer.textcolor = [r, g, b]
      LMP.RefreshPins(PIN_TYPES.DWEMER)
    },
    disabled: filterDisabled(PIN_TYPES.DWEMER),
    default: colorDefaultRgb(DEFAULTS.pins.pinTextureDwemer.textcolor),
  })
}

function appendCompassControls(controls: LamControlData[]): undefined {
  const sv = getSavedVariables()
  controls.push({ type: "header", name: achHeaderName("DEST_SETTINGS_MISC_COMPASS_HEADER") })
  controls.push({
    type: "checkbox",
    name: perCharName("DEST_SETTINGS_MISC_COMPASS_PIN_TOGGLE"),
    tooltip: perCharToggleTooltip(),
    getFunc: () => isFilterEnabled(getCharacterSavedVariables().filters, PIN_TYPES.MISC_COMPASS),
    setFunc: (state) => {
      togglePins(PIN_TYPES.MISC_COMPASS, state)
      for (const pinType of MISC_POI_TYPES) {
        redrawCompassPinsOnly(pinType)
      }
    },
    disabled: allMiscFiltersDisabled,
    default: DEFAULTS.filters[PIN_TYPES.MISC_COMPASS] ?? false,
  })
  controls.push({
    type: "slider",
    name: getSettingsString("DEST_SETTINGS_MISC_COMPASS_DIST"),
    min: 1,
    max: 100,
    getFunc: () => sv.pins.pinTextureAyleid.maxDistance * 1000,
    setFunc: (maxDistance) => {
      sv.pins.pinTextureAyleid.maxDistance = maxDistance / 1000
      sv.pins.pinTextureDeadlands.maxDistance = maxDistance / 1000
      sv.pins.pinTextureHighIsle.maxDistance = maxDistance / 1000
      sv.pins.pinTextureDwemer.maxDistance = maxDistance / 1000
      for (const pinType of MISC_POI_TYPES) {
        compassPinLayout(pinType).maxDistance = maxDistance / 1000
        redrawCompassPinsOnly(pinType)
      }
    },
    disabled: () =>
      allMiscFiltersDisabled() ||
      !isFilterEnabled(getCharacterSavedVariables().filters, PIN_TYPES.MISC_COMPASS),
    default: DEFAULTS.pins.pinTextureAyleid.maxDistance * 1000,
  })
  controls.push({
    type: "slider",
    name: getSettingsString("DEST_SETTINGS_MISC_PIN_LAYER"),
    min: 10,
    max: 200,
    step: 5,
    getFunc: () => sv.pins.pinTextureAyleid.level,
    setFunc: (level) => {
      sv.pins.pinTextureAyleid.level = level
      sv.pins.pinTextureDeadlands.level = level
      sv.pins.pinTextureHighIsle.level = level
      sv.pins.pinTextureDwemer.level = level
      for (const pinType of MISC_POI_TYPES) {
        LMP.SetLayoutKey(pinType, "level", level)
      }
      for (const pinType of MISC_POI_TYPES) {
        redrawAllPins(pinType)
      }
    },
    disabled: allMiscFiltersDisabled,
    default: DEFAULTS.pins.pinTextureAyleid.level,
  })
}

export function buildMiscPoiSubmenu(): LamSubmenuData {
  const sv = getSavedVariables()
  const controls: LamControlData[] = []
  appendAyleidControls(controls)
  appendSimpleMiscPoiControls(controls, {
    headerKey: "DEST_SETTINGS_MISC_DEADLANDS_ENTRANCE_HEADER",
    toggleKey: "DEST_SETTINGS_MISC_PIN_DEADLANDS_ENTRANCE_TOGGLE",
    sizeKey: "DEST_SETTINGS_MISC_PIN_DEADLANDS_ENTRANCE_SIZE",
    textColorKey: "DEST_SETTINGS_MISC_PINTEXT_DEADLANDS_ENTRANCE_COLOR",
    pinType: PIN_TYPES.DEADLANDS,
    pinSettings: sv.pins.pinTextureDeadlands,
    sizeDefault: DEFAULTS.pins.pinTextureDeadlands.size,
    textColorDefault: DEFAULTS.pins.pinTextureDeadlands.textcolor,
  })
  appendSimpleMiscPoiControls(controls, {
    headerKey: "DEST_SETTINGS_MISC_HIGHISLE_SHRINE_HEADER",
    toggleKey: "DEST_SETTINGS_MISC_PIN_HIGHISLE_DRUIDICSHRINES_TOGGLE",
    sizeKey: "DEST_SETTINGS_MISC_PIN_HIGHISLE_DRUIDICSHRINES_SIZE",
    textColorKey: "DEST_SETTINGS_MISC_PINTEXT_HIGHISLE_DRUIDICSHRINES_COLOR",
    pinType: PIN_TYPES.HIGHISLE,
    pinSettings: sv.pins.pinTextureHighIsle,
    sizeDefault: DEFAULTS.pins.pinTextureHighIsle.size,
    textColorDefault: DEFAULTS.pins.pinTextureHighIsle.textcolor,
  })
  appendDwemerControls(controls)
  appendCompassControls(controls)
  return {
    type: "submenu",
    name: DEFAULTS.miscColorCodes.settingsTextMiscellaneous.Colorize(
      getSettingsString("DEST_SETTINGS_MISC_HEADER")
    ),
    tooltip: getSettingsString("DEST_SETTINGS_MISC_HEADER_TT"),
    controls,
  }
}
