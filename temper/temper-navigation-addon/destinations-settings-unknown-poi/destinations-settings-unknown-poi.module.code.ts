import { DEFAULTS } from "../destinations-defaults/destinations-defaults.module.code.ts"
import { getSettingsString } from "../destinations-lang-strings/destinations-lang-strings.module.code.ts"
import { PIN_TEXTURE_PATHS } from "../destinations-pin-texture-paths/destinations-pin-texture-paths.module.code.ts"
import { PIN_TEXTURE_LISTS } from "../destinations-pin-textures/destinations-pin-textures.module.code.ts"
import { PIN_TYPES } from "../destinations-pin-type-constants/destinations-pin-type-constants.module.code.ts"
import { onPoiUpdated } from "../destinations-pins-events/destinations-pins-events.module.code.ts"
import { togglePins } from "../destinations-pins-filters/destinations-pins-filters.module.code.ts"
import {
  getCharacterSavedVariables,
  getSavedVariables,
} from "../destinations-saved-variables/destinations-saved-variables.module.code.ts"
import {
  choiceAt,
  colorDefaultRgb,
  isFilterEnabled,
  perCharName,
  perCharToggleTooltip,
  setUnknownDestLayoutKey,
  texturePathAt,
  unpackRgb,
} from "../destinations-settings-helpers/destinations-settings-helpers.module.code.ts"
import { getIconPreviews } from "../destinations-settings-icon-previews/destinations-settings-icon-previews.module.code.ts"

function unknownColored(stringKey: string): string {
  return DEFAULTS.miscColorCodes.settingsTextUnknown.Colorize(getSettingsString(stringKey))
}

function unknownDisabled(): boolean {
  return !isFilterEnabled(getCharacterSavedVariables().filters, PIN_TYPES.UNKNOWN)
}

export function buildUnknownPoiSubmenu(): LamSubmenuData {
  const sv = getSavedVariables()
  const controls: LamControlData[] = []
  controls.push({
    type: "checkbox",
    name: perCharName("DEST_SETTINGS_UNKNOWN_PIN_TOGGLE"),
    tooltip: perCharToggleTooltip(),
    getFunc: () => isFilterEnabled(getCharacterSavedVariables().filters, PIN_TYPES.UNKNOWN),
    setFunc: (state) => {
      togglePins(PIN_TYPES.UNKNOWN, state)
    },
    default: DEFAULTS.filters[PIN_TYPES.UNKNOWN] ?? false,
  })
  controls.push({
    type: "dropdown",
    name: unknownColored("DEST_SETTINGS_UNKNOWN_PIN_STYLE"),
    reference: "previewpinTextureUnknown",
    choices: PIN_TEXTURE_LISTS.Unknown,
    getFunc: () => choiceAt(PIN_TEXTURE_LISTS.Unknown, sv.pins.pinTextureUnknown.type),
    setFunc: (selected) => {
      for (let i = 0; i < PIN_TEXTURE_LISTS.Unknown.length; i++) {
        if (PIN_TEXTURE_LISTS.Unknown[i] === selected) {
          const index = i + 1
          sv.pins.pinTextureUnknown.type = index

          if (index === 7) {
            sv.pins.pinTextureUnknown.tint = DEFAULTS.pins.pinTextureUnknown.tint
          } else {
            sv.pins.pinTextureUnknown.tint = DEFAULTS.pins.pinTextureUnknownOthers.tint
          }

          setUnknownDestLayoutKey("tint", undefined)

          getIconPreviews().unknownPoi.SetTexture(texturePathAt(PIN_TEXTURE_PATHS.Unknown, index))
          const tint = sv.pins.pinTextureUnknown.tint
          getIconPreviews().unknownPoi.SetColor(tint[0] ?? 1, tint[1] ?? 1, tint[2] ?? 1, tint[3])

          onPoiUpdated()

          break
        }
      }
    },
    disabled: unknownDisabled,
    default: choiceAt(PIN_TEXTURE_LISTS.Unknown, DEFAULTS.pins.pinTextureUnknown.type),
  })
  controls.push({
    type: "slider",
    name: unknownColored("DEST_SETTINGS_UNKNOWN_PIN_SIZE"),
    min: 20,
    max: 70,
    getFunc: () => sv.pins.pinTextureUnknown.size,
    setFunc: (size) => {
      sv.pins.pinTextureUnknown.size = size
      getIconPreviews().unknownPoi.SetDimensions(size, size)
      setUnknownDestLayoutKey("size", size)
      onPoiUpdated()
    },
    disabled: unknownDisabled,
    default: DEFAULTS.pins.pinTextureUnknown.size,
  })
  controls.push({
    type: "slider",
    name: unknownColored("DEST_SETTINGS_UNKNOWN_PIN_LAYER"),
    min: 10,
    max: 200,
    step: 5,
    getFunc: () => sv.pins.pinTextureUnknown.level,
    setFunc: (level) => {
      sv.pins.pinTextureUnknown.level = level
      setUnknownDestLayoutKey("level", level)
      onPoiUpdated()
    },
    disabled: unknownDisabled,
    default: DEFAULTS.pins.pinTextureUnknown.level,
  })
  controls.push({
    type: "colorpicker",
    name: unknownColored("DEST_SETTINGS_UNKNOWN_COLOR"),
    tooltip: getSettingsString("DEST_SETTINGS_UNKNOWN_COLOR_TT"),
    getFunc: () => {
      return unpackRgb(sv.pins.pinTextureUnknown.textcolor)
    },
    setFunc: (r, g, b) => {
      sv.pins.pinTextureUnknown.textcolor = [r, g, b]
      onPoiUpdated()
    },
    disabled: unknownDisabled,
    default: colorDefaultRgb(DEFAULTS.pins.pinTextureUnknown.textcolor),
  })
  return {
    type: "submenu",
    name: unknownColored("DEST_SETTINGS_POI_HEADER"),
    tooltip: getSettingsString("DEST_SETTINGS_POI_HEADER_TT"),
    controls,
  }
}
