import {
  DEST_PIN_TINT_COLLECTIBLE,
  DEST_PIN_TINT_COLLECTIBLE_DONE,
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
  DESTINATIONS_PIN_PRIORITY_OFFSET,
  isFilterEnabled,
  perCharName,
  redrawAllPins,
  redrawCompassPinsOnly,
  texturePathAt,
  tooltipWithPerChar,
  unpackRgb,
  unpackRgba,
} from "../destinations-settings-helpers/destinations-settings-helpers.module.code.ts"
import { getIconPreviews } from "../destinations-settings-icon-previews/destinations-settings-icon-previews.module.code.ts"

const LMP = LibMapPins

function bothCollectibleFiltersDisabled(): boolean {
  const filters = getCharacterSavedVariables().filters
  return (
    !isFilterEnabled(filters, PIN_TYPES.COLLECTIBLES) &&
    !isFilterEnabled(filters, PIN_TYPES.COLLECTIBLESDONE)
  )
}

function filterDisabled(pinType: string): (this: void) => boolean {
  return () => !isFilterEnabled(getCharacterSavedVariables().filters, pinType)
}

export function buildCollectiblesSubmenu(): LamSubmenuData {
  const sv = getSavedVariables()
  const controls: LamControlData[] = []
  controls.push({
    type: "header",
    name: achHeaderName("DEST_SETTINGS_COLLECTIBLES_SUBHEADER"),
  })
  controls.push({
    type: "checkbox",
    name: perCharName("DEST_SETTINGS_COLLECTIBLES_TOGGLE"),
    tooltip: tooltipWithPerChar("DEST_SETTINGS_COLLECTIBLES_TOGGLE_TT"),
    getFunc: () => isFilterEnabled(getCharacterSavedVariables().filters, PIN_TYPES.COLLECTIBLES),
    setFunc: (state) => {
      togglePins(PIN_TYPES.COLLECTIBLES, state)
      redrawAllPins(PIN_TYPES.COLLECTIBLES)
      redrawAllPins(PIN_TYPES.COLLECTIBLESDONE)
    },
    default: DEFAULTS.filters[PIN_TYPES.COLLECTIBLES] ?? false,
  })
  controls.push({
    type: "checkbox",
    width: "full",
    name: perCharName("DEST_SETTINGS_COLLECTIBLES_DONE_TOGGLE"),
    tooltip: tooltipWithPerChar("DEST_SETTINGS_COLLECTIBLES_DONE_TOGGLE_TT"),
    getFunc: () =>
      isFilterEnabled(getCharacterSavedVariables().filters, PIN_TYPES.COLLECTIBLESDONE),
    setFunc: (state) => {
      togglePins(PIN_TYPES.COLLECTIBLESDONE, state)
      redrawAllPins(PIN_TYPES.COLLECTIBLESDONE)
    },
    default: DEFAULTS.filters[PIN_TYPES.COLLECTIBLESDONE] ?? false,
  })
  controls.push({
    type: "dropdown",
    name: getSettingsString("DEST_SETTINGS_COLLECTIBLES_PIN_STYLE"),
    reference: "previewpinTextureCollectible",
    choices: PIN_TEXTURE_LISTS.Collectible,
    getFunc: () => choiceAt(PIN_TEXTURE_LISTS.Collectible, sv.pins.pinTextureCollectible.type),
    setFunc: (selected) => {
      for (let i = 0; i < PIN_TEXTURE_LISTS.Collectible.length; i++) {
        if (PIN_TEXTURE_LISTS.Collectible[i] === selected) {
          const index = i + 1
          sv.pins.pinTextureCollectible.type = index
          sv.pins.pinTextureCollectibleDone.type = index
          LMP.SetLayoutKey(
            PIN_TYPES.COLLECTIBLES,
            "texture",
            texturePathAt(PIN_TEXTURE_PATHS.collectible, index)
          )
          LMP.SetLayoutKey(
            PIN_TYPES.COLLECTIBLESDONE,
            "texture",
            texturePathAt(PIN_TEXTURE_PATHS.collectibledone, index)
          )
          getIconPreviews().collectible.SetTexture(
            texturePathAt(PIN_TEXTURE_PATHS.collectible, index)
          )
          getIconPreviews().collectibleDone.SetTexture(
            texturePathAt(PIN_TEXTURE_PATHS.collectibledone, index)
          )
          redrawAllPins(PIN_TYPES.COLLECTIBLES)
          redrawAllPins(PIN_TYPES.COLLECTIBLESDONE)
          break
        }
      }
    },
    disabled: bothCollectibleFiltersDisabled,
    default: choiceAt(PIN_TEXTURE_LISTS.Collectible, DEFAULTS.pins.pinTextureCollectible.type),
  })
  controls.push({
    type: "checkbox",
    width: "full",
    name: getSettingsString("DEST_SETTINGS_COLLECTIBLES_SHOW_MOBNAME"),
    tooltip: getSettingsString("DEST_SETTINGS_COLLECTIBLES_SHOW_MOBNAME_TT"),
    getFunc: () => isFilterEnabled(sv.filters, PIN_TYPES.COLLECTIBLES_SHOW_MOBNAME),
    setFunc: (state) => {
      sv.filters[PIN_TYPES.COLLECTIBLES_SHOW_MOBNAME] = state
      redrawAllPins(PIN_TYPES.COLLECTIBLES)
      redrawAllPins(PIN_TYPES.COLLECTIBLESDONE)
    },
    default: DEFAULTS.filters[PIN_TYPES.COLLECTIBLES_SHOW_MOBNAME] ?? false,
    disabled: bothCollectibleFiltersDisabled,
  })
  controls.push({
    type: "checkbox",
    width: "full",
    name: getSettingsString("DEST_SETTINGS_COLLECTIBLES_SHOW_ITEM"),
    tooltip: getSettingsString("DEST_SETTINGS_COLLECTIBLES_SHOW_ITEM_TT"),
    getFunc: () => isFilterEnabled(sv.filters, PIN_TYPES.COLLECTIBLES_SHOW_ITEM),
    setFunc: (state) => {
      sv.filters[PIN_TYPES.COLLECTIBLES_SHOW_ITEM] = state
      redrawAllPins(PIN_TYPES.COLLECTIBLES)
      redrawAllPins(PIN_TYPES.COLLECTIBLESDONE)
    },
    default: DEFAULTS.filters[PIN_TYPES.COLLECTIBLES_SHOW_ITEM] ?? false,
    disabled: bothCollectibleFiltersDisabled,
  })
  controls.push({
    type: "colorpicker",
    name: getSettingsString("DEST_SETTINGS_COLLECTIBLES_COLOR_TITLE"),
    tooltip: getSettingsString("DEST_SETTINGS_COLLECTIBLES_COLOR_TITLE_TT"),
    getFunc: () => {
      return unpackRgb(sv.pins.pinTextureCollectible.textcolortitle)
    },
    setFunc: (r, g, b) => {
      sv.pins.pinTextureCollectible.textcolortitle = [r, g, b]
      redrawAllPins(PIN_TYPES.COLLECTIBLES)
      redrawAllPins(PIN_TYPES.COLLECTIBLESDONE)
    },
    disabled: bothCollectibleFiltersDisabled,
    default: colorDefaultRgb(DEFAULTS.pins.pinTextureCollectible.textcolortitle),
  })
  controls.push({
    type: "header",
    name: achHeaderName("DEST_SETTINGS_COLLECTIBLES_COLORS_HEADER"),
  })
  controls.push({
    type: "colorpicker",
    name: getSettingsString("DEST_SETTINGS_COLLECTIBLES_PIN_COLOR"),
    tooltip: getSettingsString("DEST_SETTINGS_COLLECTIBLES_PIN_COLOR_TT"),
    getFunc: () => {
      return unpackRgba(sv.pins.pinTextureCollectible.tint)
    },
    setFunc: (r, g, b, a) => {
      sv.pins.pinTextureCollectible.tint = [r, g, b, a ?? 1]
      getIconPreviews().collectible.SetColor(r, g, b, a)
      DEST_PIN_TINT_COLLECTIBLE.SetRGBA(r, g, b, a ?? 1)
      LMP.RefreshPins(PIN_TYPES.COLLECTIBLES)
    },
    disabled: filterDisabled(PIN_TYPES.COLLECTIBLES),
    default: colorDefaultRgba(DEFAULTS.pins.pinTextureCollectible.tint),
  })
  controls.push({
    type: "colorpicker",
    name: getSettingsString("DEST_SETTINGS_COLLECTIBLES_COLOR_UNDONE"),
    tooltip: getSettingsString("DEST_SETTINGS_COLLECTIBLES_COLOR_UNDONE_TT"),
    getFunc: () => {
      return unpackRgb(sv.pins.pinTextureCollectible.textcolor)
    },
    setFunc: (r, g, b) => {
      sv.pins.pinTextureCollectible.textcolor = [r, g, b]
      redrawAllPins(PIN_TYPES.COLLECTIBLES)
    },
    disabled: filterDisabled(PIN_TYPES.COLLECTIBLES),
    default: colorDefaultRgb(DEFAULTS.pins.pinTextureCollectible.textcolor),
  })
  controls.push({
    type: "colorpicker",
    name: getSettingsString("DEST_SETTINGS_COLLECTIBLES_PIN_COLOR_DONE"),
    tooltip: getSettingsString("DEST_SETTINGS_COLLECTIBLES_PIN_COLOR_DONE_TT"),
    getFunc: () => {
      return unpackRgba(sv.pins.pinTextureCollectibleDone.tint)
    },
    setFunc: (r, g, b, a) => {
      sv.pins.pinTextureCollectibleDone.tint = [r, g, b, a ?? 1]
      getIconPreviews().collectibleDone.SetColor(r, g, b, a)
      DEST_PIN_TINT_COLLECTIBLE_DONE.SetRGBA(r, g, b, a ?? 1)
      LMP.RefreshPins(PIN_TYPES.COLLECTIBLESDONE)
    },
    disabled: filterDisabled(PIN_TYPES.COLLECTIBLESDONE),
    default: colorDefaultRgba(DEFAULTS.pins.pinTextureCollectibleDone.tint),
  })
  controls.push({
    type: "colorpicker",
    name: getSettingsString("DEST_SETTINGS_COLLECTIBLES_COLOR_DONE"),
    tooltip: getSettingsString("DEST_SETTINGS_COLLECTIBLES_COLOR_DONE_TT"),
    getFunc: () => {
      return unpackRgb(sv.pins.pinTextureCollectibleDone.textcolor)
    },
    setFunc: (r, g, b) => {
      sv.pins.pinTextureCollectibleDone.textcolor = [r, g, b]
      redrawAllPins(PIN_TYPES.COLLECTIBLESDONE)
    },
    disabled: filterDisabled(PIN_TYPES.COLLECTIBLESDONE),
    default: colorDefaultRgb(DEFAULTS.pins.pinTextureCollectibleDone.textcolor),
  })
  controls.push({
    type: "header",
    name: achHeaderName("DEST_SETTINGS_COLLECTIBLES_MISC_HEADER"),
  })
  controls.push({
    type: "checkbox",
    name: perCharName("DEST_SETTINGS_COLLECTIBLES_COMPASS_TOGGLE"),
    tooltip: tooltipWithPerChar("DEST_SETTINGS_COLLECTIBLES_COMPASS_TOGGLE_TT"),
    getFunc: () =>
      isFilterEnabled(getCharacterSavedVariables().filters, PIN_TYPES.COLLECTIBLES_COMPASS),
    setFunc: (state) => {
      togglePins(PIN_TYPES.COLLECTIBLES_COMPASS, state)
      redrawCompassPinsOnly(PIN_TYPES.COLLECTIBLES)
      redrawCompassPinsOnly(PIN_TYPES.COLLECTIBLESDONE)
    },
    disabled: bothCollectibleFiltersDisabled,
    default: DEFAULTS.filters[PIN_TYPES.COLLECTIBLES_COMPASS] ?? false,
  })
  controls.push({
    type: "slider",
    name: getSettingsString("DEST_SETTINGS_COLLECTIBLES_COMPASS_DIST"),
    tooltip: getSettingsString("DEST_SETTINGS_COLLECTIBLES_COMPASS_DIST_TT"),
    min: 1,
    max: 100,
    getFunc: () => sv.pins.pinTextureCollectible.maxDistance * 1000,
    setFunc: (maxDistance) => {
      sv.pins.pinTextureCollectible.maxDistance = maxDistance / 1000
      sv.pins.pinTextureCollectibleDone.maxDistance = maxDistance / 1000
      compassPinLayout(PIN_TYPES.COLLECTIBLES).maxDistance = maxDistance / 1000
      compassPinLayout(PIN_TYPES.COLLECTIBLESDONE).maxDistance = maxDistance / 1000
      redrawCompassPinsOnly(PIN_TYPES.COLLECTIBLES)
      redrawCompassPinsOnly(PIN_TYPES.COLLECTIBLESDONE)
    },
    width: "full",
    disabled: () =>
      bothCollectibleFiltersDisabled() ||
      !isFilterEnabled(getCharacterSavedVariables().filters, PIN_TYPES.COLLECTIBLES_COMPASS),
    default: DEFAULTS.pins.pinTextureCollectible.maxDistance * 1000,
  })
  controls.push({
    type: "slider",
    name: getSettingsString("DEST_SETTINGS_COLLECTIBLES_PIN_SIZE"),
    tooltip: getSettingsString("DEST_SETTINGS_COLLECTIBLES_PIN_SIZE_TT"),
    min: 20,
    max: 70,
    getFunc: () => sv.pins.pinTextureCollectible.size,
    setFunc: (size) => {
      sv.pins.pinTextureCollectible.size = size
      sv.pins.pinTextureCollectibleDone.size = size
      getIconPreviews().collectible.SetDimensions(size, size)
      getIconPreviews().collectibleDone.SetDimensions(size, size)
      LMP.SetLayoutKey(PIN_TYPES.COLLECTIBLES, "size", size)
      LMP.SetLayoutKey(PIN_TYPES.COLLECTIBLESDONE, "size", size)
      redrawAllPins(PIN_TYPES.COLLECTIBLES)
      redrawAllPins(PIN_TYPES.COLLECTIBLESDONE)
    },
    disabled: bothCollectibleFiltersDisabled,
    default: DEFAULTS.pins.pinTextureCollectible.size,
  })
  controls.push({
    type: "slider",
    name: getSettingsString("DEST_SETTINGS_COLLECTIBLES_PIN_LAYER"),
    tooltip: getSettingsString("DEST_SETTINGS_COLLECTIBLES_PIN_LAYER_TT"),
    min: 10,
    max: 200,
    step: 5,
    getFunc: () => sv.pins.pinTextureCollectible.level,
    setFunc: (level) => {
      sv.pins.pinTextureCollectible.level = level + DESTINATIONS_PIN_PRIORITY_OFFSET
      sv.pins.pinTextureCollectibleDone.level = level
      LMP.SetLayoutKey(PIN_TYPES.COLLECTIBLES, "level", level + DESTINATIONS_PIN_PRIORITY_OFFSET)
      LMP.SetLayoutKey(PIN_TYPES.COLLECTIBLESDONE, "level", level)
      redrawAllPins(PIN_TYPES.COLLECTIBLES)
      redrawAllPins(PIN_TYPES.COLLECTIBLESDONE)
    },
    disabled: bothCollectibleFiltersDisabled,
    default: DEFAULTS.pins.pinTextureCollectible.level,
  })
  return {
    type: "submenu",
    name: DEFAULTS.miscColorCodes.settingsTextCollectibles.Colorize(
      getSettingsString("DEST_SETTINGS_COLLECTIBLES_HEADER")
    ),
    tooltip: getSettingsString("DEST_SETTINGS_COLLECTIBLES_HEADER_TT"),
    controls,
  }
}
