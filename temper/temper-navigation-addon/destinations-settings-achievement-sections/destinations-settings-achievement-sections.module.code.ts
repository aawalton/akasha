import type { DestinationsDefaults } from "../destinations-defaults/destinations-defaults.module.code.ts"
import { DEFAULTS } from "../destinations-defaults/destinations-defaults.module.code.ts"
import { getSettingsString } from "../destinations-lang-strings/destinations-lang-strings.module.code.ts"
import { PIN_TYPES } from "../destinations-pin-type-constants/destinations-pin-type-constants.module.code.ts"
import { togglePins } from "../destinations-pins-filters/destinations-pins-filters.module.code.ts"
import {
  getCharacterSavedVariables,
  getSavedVariables,
} from "../destinations-saved-variables/destinations-saved-variables.module.code.ts"
import {
  achHeaderName,
  choiceAt,
  DESTINATIONS_PIN_PRIORITY_OFFSET,
  isFilterEnabled,
  perCharName,
  redrawAllPins,
  texturePathAt,
} from "../destinations-settings-helpers/destinations-settings-helpers.module.code.ts"
import type { IconPreviews } from "../destinations-settings-icon-previews/destinations-settings-icon-previews.module.code.ts"
import { getIconPreviews } from "../destinations-settings-icon-previews/destinations-settings-icon-previews.module.code.ts"

export const LMP = LibMapPins

export interface AchPinEntry {
  type: number
  size: number
}

export interface AchievementSectionSpec {
  headerKey: string
  pinType: string
  pinTypeDone: string
  choices: readonly string[]
  paths: readonly string[]
  pathsDone: readonly string[]
  pinSettings: (this: void, pins: DestinationsDefaults["pins"]) => AchPinEntry
  pinSettingsDone: (this: void, pins: DestinationsDefaults["pins"]) => AchPinEntry
  preview: (this: void, previews: IconPreviews) => TextureControl
  previewDone: (this: void, previews: IconPreviews) => TextureControl
  reference: string
  defaultChoice: string
  sizeDefault: number
}

export function bothFiltersDisabled(pinType: string, pinTypeDone: string): (this: void) => boolean {
  return () => {
    const filters = getCharacterSavedVariables().filters
    return !isFilterEnabled(filters, pinType) && !isFilterEnabled(filters, pinTypeDone)
  }
}

export function toggleControl(pinType: string, stringKey: string): LamCheckboxData {
  return {
    type: "checkbox",
    name: perCharName(stringKey),
    getFunc: () => isFilterEnabled(getCharacterSavedVariables().filters, pinType),
    setFunc: (state) => {
      togglePins(pinType, state)
      redrawAllPins(pinType)
    },
    default: DEFAULTS.filters[pinType] ?? false,
  }
}

export function styleControl(spec: AchievementSectionSpec): LamDropdownData {
  const sv = getSavedVariables()
  return {
    type: "dropdown",
    name: getSettingsString("DEST_SETTINGS_ACH_PIN_STYLE"),
    reference: spec.reference,
    choices: spec.choices,
    getFunc: () => choiceAt(spec.choices, spec.pinSettings(sv.pins).type),
    setFunc: (selected) => {
      for (let i = 0; i < spec.choices.length; i++) {
        if (spec.choices[i] === selected) {
          const index = i + 1
          spec.pinSettings(sv.pins).type = index
          spec.pinSettingsDone(sv.pins).type = index
          LMP.SetLayoutKey(spec.pinType, "texture", texturePathAt(spec.paths, index))
          LMP.SetLayoutKey(spec.pinTypeDone, "texture", texturePathAt(spec.pathsDone, index))
          spec.preview(getIconPreviews()).SetTexture(texturePathAt(spec.paths, index))
          spec.previewDone(getIconPreviews()).SetTexture(texturePathAt(spec.pathsDone, index))
          redrawAllPins(spec.pinType)
          redrawAllPins(spec.pinTypeDone)
          break
        }
      }
    },
    disabled: bothFiltersDisabled(spec.pinType, spec.pinTypeDone),
    default: spec.defaultChoice,
  }
}

export function sizeControl(spec: AchievementSectionSpec): LamSliderData {
  const sv = getSavedVariables()
  return {
    type: "slider",
    name: getSettingsString("DEST_SETTINGS_ACH_PIN_SIZE"),
    min: 20,
    max: 70,
    getFunc: () => spec.pinSettings(sv.pins).size,
    setFunc: (size) => {
      spec.pinSettings(sv.pins).size = size
      LMP.SetLayoutKey(spec.pinType, "size", size)
      spec.preview(getIconPreviews()).SetDimensions(size, size)
      spec.pinSettingsDone(sv.pins).size = size
      LMP.SetLayoutKey(spec.pinTypeDone, "size", size)
      spec.previewDone(getIconPreviews()).SetDimensions(size, size)
      redrawAllPins(spec.pinType)
      redrawAllPins(spec.pinTypeDone)
    },
    disabled: bothFiltersDisabled(spec.pinType, spec.pinTypeDone),
    default: spec.sizeDefault,
  }
}

export function appendAchievementSection(
  controls: LamControlData[],
  spec: AchievementSectionSpec,
  extraControlsAfterToggles?: LamControlData[]
): undefined {
  controls.push({ type: "header", name: achHeaderName(spec.headerKey) })
  controls.push(toggleControl(spec.pinType, "DEST_SETTINGS_ACH_PIN_TOGGLE"))
  controls.push(toggleControl(spec.pinTypeDone, "DEST_SETTINGS_ACH_PIN_TOGGLE_DONE"))
  if (extraControlsAfterToggles !== undefined) {
    for (const control of extraControlsAfterToggles) {
      controls.push(control)
    }
  }
  controls.push(styleControl(spec))
  controls.push(sizeControl(spec))
}

export function championZoneToggle(): LamCheckboxData {
  const sv = getSavedVariables()
  return {
    type: "checkbox",
    name: getSettingsString("DEST_SETTINGS_ACH_CHAMPION_ZONE_PIN_TOGGLE"),
    getFunc: () => sv.settings.ShowDungeonBossesInZones,
    setFunc: (state) => {
      sv.settings.ShowDungeonBossesInZones = state
      redrawAllPins(PIN_TYPES.CHAMPION)
      redrawAllPins(PIN_TYPES.CHAMPION_DONE)
    },
    disabled: bothFiltersDisabled(PIN_TYPES.CHAMPION, PIN_TYPES.CHAMPION_DONE),
    default: DEFAULTS.settings.ShowDungeonBossesInZones,
  }
}

export function championFrontToggle(): LamCheckboxData {
  const sv = getSavedVariables()
  return {
    type: "checkbox",
    name: getSettingsString("DEST_SETTINGS_ACH_CHAMPION_FRONT_PIN_TOGGLE"),
    tooltip: getSettingsString("DEST_SETTINGS_ACH_CHAMPION_FRONT_PIN_TOGGLE_TT"),
    getFunc: () => sv.settings.ShowDungeonBossesOnTop,
    setFunc: (state) => {
      const pinLevel = sv.pins.pinTextureOther.level
      if (state) {
        sv.pins.pinTextureChampion.level = pinLevel + DESTINATIONS_PIN_PRIORITY_OFFSET
        sv.pins.pinTextureChampionDone.level = pinLevel
        LMP.SetLayoutKey(PIN_TYPES.CHAMPION, "level", pinLevel + DESTINATIONS_PIN_PRIORITY_OFFSET)
        LMP.SetLayoutKey(PIN_TYPES.CHAMPION_DONE, "level", pinLevel)
      } else {
        sv.pins.pinTextureChampion.level = 30 + DESTINATIONS_PIN_PRIORITY_OFFSET
        sv.pins.pinTextureChampionDone.level = 30
        LMP.SetLayoutKey(PIN_TYPES.CHAMPION, "level", 30 + DESTINATIONS_PIN_PRIORITY_OFFSET)
        LMP.SetLayoutKey(PIN_TYPES.CHAMPION_DONE, "level", 30)
      }
      sv.settings.ShowDungeonBossesOnTop = state
      redrawAllPins(PIN_TYPES.CHAMPION)
      redrawAllPins(PIN_TYPES.CHAMPION_DONE)
    },
    disabled: () => {
      const filters = getCharacterSavedVariables().filters
      return (
        (!isFilterEnabled(filters, PIN_TYPES.CHAMPION) &&
          !isFilterEnabled(filters, PIN_TYPES.CHAMPION_DONE)) ||
        !getSavedVariables().settings.ShowDungeonBossesInZones
      )
    },
    default: DEFAULTS.settings.ShowDungeonBossesOnTop,
  }
}

export function standardSpec(
  headerKey: string,
  pinType: string,
  pinTypeDone: string,
  choices: readonly string[],
  paths: readonly string[],
  pathsDone: readonly string[],
  pinSettings: (pins: DestinationsDefaults["pins"]) => AchPinEntry,
  pinSettingsDone: (pins: DestinationsDefaults["pins"]) => AchPinEntry,
  preview: (previews: IconPreviews) => TextureControl,
  previewDone: (previews: IconPreviews) => TextureControl,
  reference: string,
  defaultChoice: string,
  sizeDefault: number
): AchievementSectionSpec {
  return {
    headerKey,
    pinType,
    pinTypeDone,
    choices,
    paths,
    pathsDone,
    pinSettings,
    pinSettingsDone,
    preview,
    previewDone,
    reference,
    defaultChoice,
    sizeDefault,
  }
}
