import { DEFAULTS } from "../defaults"
import { getSettingsString } from "../lang/register-strings"
import { pinTexturePaths } from "../pin-texture-paths-data"
import { pinTextureLists } from "../pin-textures"
import { PIN_TYPES } from "../pin-type-constants"
import { OnPOIUpdated } from "../pins/events"
import { TogglePins } from "../pins/filters"
import { getCharacterSavedVariables, getSavedVariables } from "../saved-variables"
import { getIconPreviews } from "./icon-previews"
import {
  choiceAt,
  colorDefaultRgb,
  isFilterEnabled,
  perCharName,
  perCharToggleTooltip,
  setUnknownDestLayoutKey,
  texturePathAt,
  unpackRgb,
} from "./settings-helpers"

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
      TogglePins(PIN_TYPES.UNKNOWN, state)
    },
    default: DEFAULTS.filters[PIN_TYPES.UNKNOWN] ?? false,
  })
  controls.push({
    type: "dropdown",
    name: unknownColored("DEST_SETTINGS_UNKNOWN_PIN_STYLE"),
    reference: "previewpinTextureUnknown",
    choices: pinTextureLists.Unknown,
    getFunc: () => choiceAt(pinTextureLists.Unknown, sv.pins.pinTextureUnknown.type),
    setFunc: (selected) => {
      for (let i = 0; i < pinTextureLists.Unknown.length; i++) {
        if (pinTextureLists.Unknown[i] === selected) {
          const index = i + 1
          sv.pins.pinTextureUnknown.type = index

          if (index === 7) {
            sv.pins.pinTextureUnknown.tint = DEFAULTS.pins.pinTextureUnknown.tint
          } else {
            sv.pins.pinTextureUnknown.tint = DEFAULTS.pins.pinTextureUnknownOthers.tint
          }

          setUnknownDestLayoutKey("tint", undefined)

          getIconPreviews().unknownPoi.SetTexture(texturePathAt(pinTexturePaths.Unknown, index))
          const tint = sv.pins.pinTextureUnknown.tint
          getIconPreviews().unknownPoi.SetColor(tint[0] ?? 1, tint[1] ?? 1, tint[2] ?? 1, tint[3])

          OnPOIUpdated()

          break
        }
      }
    },
    disabled: unknownDisabled,
    default: choiceAt(pinTextureLists.Unknown, DEFAULTS.pins.pinTextureUnknown.type),
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
      OnPOIUpdated()
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
      OnPOIUpdated()
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
      OnPOIUpdated()
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
