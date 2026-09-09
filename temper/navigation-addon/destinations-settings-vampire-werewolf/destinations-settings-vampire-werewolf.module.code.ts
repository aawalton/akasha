import {
  DEST_PIN_TINT_VAMPALTAR,
  DEST_PIN_TINT_WWSHRINE,
  DEST_PIN_TINT_WWVAMP,
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
import type { IconPreviews } from "../destinations-settings-icon-previews/destinations-settings-icon-previews.module.code.ts"
import { getIconPreviews } from "../destinations-settings-icon-previews/destinations-settings-icon-previews.module.code.ts"

const LMP = LibMapPins

const VWW_PIN_TYPES: readonly string[] = [
  PIN_TYPES.WWVAMP,
  PIN_TYPES.VAMPIRE_ALTAR,
  PIN_TYPES.WEREWOLF_SHRINE,
]

function filterDisabled(pinType: string): (this: void) => boolean {
  return () => !isFilterEnabled(getCharacterSavedVariables().filters, pinType)
}

function allVwwFiltersDisabled(): boolean {
  const filters = getCharacterSavedVariables().filters
  for (const pinType of VWW_PIN_TYPES) {
    if (isFilterEnabled(filters, pinType)) {
      return false
    }
  }
  return true
}

function appendVwwPinControls(
  controls: LamControlData[],
  spec: {
    headerKey: string
    toggleKey: string
    sizeKey: string
    pinType: string
    choices: readonly string[]
    paths: readonly string[]
    pinSettings: { type: number; size: number }
    preview: (this: void, previews: IconPreviews) => TextureControl
    reference: string
    typeDefault: number
    sizeDefault: number
  }
): undefined {
  controls.push({ type: "header", name: achHeaderName(spec.headerKey) })
  controls.push({
    type: "checkbox",
    width: "half",
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
    type: "dropdown",
    width: "half",
    name: "",
    reference: spec.reference,
    choices: spec.choices,
    getFunc: () => choiceAt(spec.choices, spec.pinSettings.type),
    setFunc: (selected) => {
      for (let i = 0; i < spec.choices.length; i++) {
        if (spec.choices[i] === selected) {
          const index = i + 1
          spec.pinSettings.type = index
          LMP.SetLayoutKey(spec.pinType, "texture", texturePathAt(spec.paths, index))
          spec.preview(getIconPreviews()).SetTexture(texturePathAt(spec.paths, index))
          redrawAllPins(spec.pinType)
          break
        }
      }
    },
    disabled: filterDisabled(spec.pinType),
    default: choiceAt(spec.choices, spec.typeDefault),
  })
  controls.push({
    type: "slider",
    name: getSettingsString(spec.sizeKey),
    min: 20,
    max: 70,
    getFunc: () => spec.pinSettings.size,
    setFunc: (size) => {
      spec.pinSettings.size = size
      spec.preview(getIconPreviews()).SetDimensions(size, size)
      LMP.SetLayoutKey(spec.pinType, "size", size)
      redrawAllPins(spec.pinType)
    },
    disabled: filterDisabled(spec.pinType),
    default: spec.sizeDefault,
  })
}

function appendVwwCompassControls(controls: LamControlData[]): undefined {
  const sv = getSavedVariables()
  controls.push({ type: "header", name: achHeaderName("DEST_SETTINGS_VWW_COMPASS_HEADER") })
  controls.push({
    type: "checkbox",
    name: perCharName("DEST_SETTINGS_VWW_COMPASS_PIN_TOGGLE"),
    tooltip: perCharToggleTooltip(),
    getFunc: () => isFilterEnabled(getCharacterSavedVariables().filters, PIN_TYPES.VWW_COMPASS),
    setFunc: (state) => {
      togglePins(PIN_TYPES.VWW_COMPASS, state)
      for (const pinType of VWW_PIN_TYPES) {
        redrawCompassPinsOnly(pinType)
      }
    },
    disabled: allVwwFiltersDisabled,
    default: DEFAULTS.filters[PIN_TYPES.VWW_COMPASS] ?? false,
  })
  controls.push({
    type: "slider",
    name: getSettingsString("DEST_SETTINGS_VWW_COMPASS_DIST"),
    min: 1,
    max: 100,
    getFunc: () => sv.pins.pinTextureWWShrine.maxDistance * 1000,
    setFunc: (maxDistance) => {
      sv.pins.pinTextureWWVamp.maxDistance = maxDistance / 1000
      sv.pins.pinTextureWWShrine.maxDistance = maxDistance / 1000
      sv.pins.pinTextureVampAltar.maxDistance = maxDistance / 1000
      for (const pinType of VWW_PIN_TYPES) {
        compassPinLayout(pinType).maxDistance = maxDistance / 1000
      }
      for (const pinType of VWW_PIN_TYPES) {
        redrawCompassPinsOnly(pinType)
      }
    },
    disabled: () =>
      allVwwFiltersDisabled() ||
      !isFilterEnabled(getCharacterSavedVariables().filters, PIN_TYPES.VWW_COMPASS),
    default: DEFAULTS.pins.pinTextureWWShrine.maxDistance * 1000,
  })
  controls.push({
    type: "slider",
    name: getSettingsString("DEST_SETTINGS_VWW_PIN_LAYER"),
    min: 10,
    max: 200,
    step: 5,
    getFunc: () => sv.pins.pinTextureWWShrine.level,
    setFunc: (level) => {
      sv.pins.pinTextureWWVamp.level = level
      sv.pins.pinTextureWWShrine.level = level
      sv.pins.pinTextureVampAltar.level = level
      for (const pinType of VWW_PIN_TYPES) {
        LMP.SetLayoutKey(pinType, "level", level)
      }
      for (const pinType of VWW_PIN_TYPES) {
        redrawAllPins(pinType)
      }
    },
    disabled: allVwwFiltersDisabled,
    default: DEFAULTS.pins.pinTextureWWShrine.level,
  })
  controls.push({
    type: "colorpicker",
    name: getSettingsString("DEST_SETTINGS_VWW_PIN_COLOR"),
    tooltip: getSettingsString("DEST_SETTINGS_VWW_PIN_COLOR_TT"),
    getFunc: () => {
      return unpackRgba(sv.pins.pinTextureWWVamp.tint)
    },
    setFunc: (r, g, b, a) => {
      sv.pins.pinTextureWWVamp.tint = [r, g, b, a ?? 1]
      sv.pins.pinTextureVampAltar.tint = [r, g, b, a ?? 1]
      sv.pins.pinTextureWWShrine.tint = [r, g, b, a ?? 1]

      DEST_PIN_TINT_WWVAMP.SetRGBA(r, g, b, a ?? 1)
      DEST_PIN_TINT_VAMPALTAR.SetRGBA(r, g, b, a ?? 1)
      DEST_PIN_TINT_WWSHRINE.SetRGBA(r, g, b, a ?? 1)

      const previews = getIconPreviews()
      previews.wwVamp.SetColor(r, g, b, a)
      previews.vampAltar.SetColor(r, g, b, a)
      previews.wwShrine.SetColor(r, g, b, a)

      for (const pinType of VWW_PIN_TYPES) {
        redrawAllPins(pinType)
      }
    },
    disabled: allVwwFiltersDisabled,
    default: colorDefaultRgba(DEFAULTS.pins.pinTextureWWVamp.tint),
  })
  controls.push({
    type: "colorpicker",
    name: getSettingsString("DEST_SETTINGS_VWW_PINTEXT_COLOR"),
    tooltip: getSettingsString("DEST_SETTINGS_VWW_PINTEXT_COLOR_TT"),
    getFunc: () => {
      return unpackRgb(sv.pins.pinTextureWWVamp.textcolor)
    },
    setFunc: (r, g, b) => {
      sv.pins.pinTextureWWVamp.textcolor = [r, g, b]
      sv.pins.pinTextureVampAltar.textcolor = [r, g, b]
      sv.pins.pinTextureWWShrine.textcolor = [r, g, b]
      for (const pinType of VWW_PIN_TYPES) {
        LMP.RefreshPins(pinType)
      }
    },
    disabled: allVwwFiltersDisabled,
    default: colorDefaultRgb(DEFAULTS.pins.pinTextureWWVamp.textcolor),
  })
}

export function buildVampireWerewolfSubmenu(): LamSubmenuData {
  const sv = getSavedVariables()
  const controls: LamControlData[] = []
  appendVwwPinControls(controls, {
    headerKey: "DEST_SETTINGS_VWW_WWVAMP_HEADER",
    toggleKey: "DEST_SETTINGS_VWW_PIN_WWVAMP_TOGGLE",
    sizeKey: "DEST_SETTINGS_VWW_PIN_WWVAMP_SIZE",
    pinType: PIN_TYPES.WWVAMP,
    choices: PIN_TEXTURE_LISTS.WWVamp,
    paths: PIN_TEXTURE_PATHS.wwvamp,
    pinSettings: sv.pins.pinTextureWWVamp,
    preview: (previews) => previews.wwVamp,
    reference: "previewpinTextureWWVamp",
    typeDefault: DEFAULTS.pins.pinTextureWWVamp.type,
    sizeDefault: DEFAULTS.pins.pinTextureWWVamp.size,
  })
  appendVwwPinControls(controls, {
    headerKey: "DEST_SETTINGS_VWW_VAMP_HEADER",
    toggleKey: "DEST_SETTINGS_VWW_PIN_VAMP_ALTAR_TOGGLE",
    sizeKey: "DEST_SETTINGS_VWW_PIN_VAMP_ALTAR_SIZE",
    pinType: PIN_TYPES.VAMPIRE_ALTAR,
    choices: PIN_TEXTURE_LISTS.VampAltar,
    paths: PIN_TEXTURE_PATHS.vampirealtar,
    pinSettings: sv.pins.pinTextureVampAltar,
    preview: (previews) => previews.vampAltar,
    reference: "previewpinTextureVampAltar",
    typeDefault: DEFAULTS.pins.pinTextureVampAltar.type,
    sizeDefault: DEFAULTS.pins.pinTextureVampAltar.size,
  })
  appendVwwPinControls(controls, {
    headerKey: "DEST_SETTINGS_VWW_WW_HEADER",
    toggleKey: "DEST_SETTINGS_VWW_PIN_WW_SHRINE_TOGGLE",
    sizeKey: "DEST_SETTINGS_VWW_PIN_WW_SHRINE_SIZE",
    pinType: PIN_TYPES.WEREWOLF_SHRINE,
    choices: PIN_TEXTURE_LISTS.WWShrine,
    paths: PIN_TEXTURE_PATHS.werewolfshrine,
    pinSettings: sv.pins.pinTextureWWShrine,
    preview: (previews) => previews.wwShrine,
    reference: "previewpinTextureWWShrine",
    typeDefault: DEFAULTS.pins.pinTextureWWShrine.type,
    sizeDefault: DEFAULTS.pins.pinTextureWWShrine.size,
  })
  appendVwwCompassControls(controls)
  return {
    type: "submenu",
    name: DEFAULTS.miscColorCodes.settingsTextVWW.Colorize(
      getSettingsString("DEST_SETTINGS_VWW_HEADER")
    ),
    tooltip: getSettingsString("DEST_SETTINGS_VWW_HEADER_TT"),
    controls,
  }
}
