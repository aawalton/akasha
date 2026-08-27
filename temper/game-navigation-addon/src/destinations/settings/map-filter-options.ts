import { DEFAULTS } from "../defaults"
import { getSettingsString } from "../lang/register-strings"
import { getCharacterSavedVariables } from "../saved-variables"
import {
  achHeaderName,
  perCharName,
  reloadWarningColored,
  tooltipWithPerChar,
} from "./settings-helpers"

type MapFilterSettingKey =
  | "MapFiltersPOIs"
  | "MapFiltersAchievements"
  | "MapFiltersCollectibles"
  | "MapFiltersFishing"
  | "MapFiltersMisc"

function mapFilterToggle(nameKey: string, settingKey: MapFilterSettingKey): LamCheckboxData {
  return {
    type: "checkbox",
    name: perCharName(nameKey),
    tooltip: tooltipWithPerChar(`${nameKey}_TT`),
    getFunc: () => getCharacterSavedVariables().settings[settingKey],
    setFunc: (state) => {
      const cssv = getCharacterSavedVariables()
      cssv.settings.activateReloaduiButton = true
      cssv.settings[settingKey] = state
    },
    warning: reloadWarningColored("RELOADUI_INFO"),
    default: DEFAULTS.settings[settingKey],
  }
}

export function buildMapFiltersSubmenu(): LamSubmenuData {
  const controls: LamControlData[] = []
  controls.push({
    type: "header",
    name: achHeaderName("DEST_SETTINGS_MAPFILTERS_SUBHEADER"),
  })
  controls.push(mapFilterToggle("DEST_SETTINGS_MAPFILTERS_POIS_TOGGLE", "MapFiltersPOIs"))
  controls.push(mapFilterToggle("DEST_SETTINGS_MAPFILTERS_ACHS_TOGGLE", "MapFiltersAchievements"))
  controls.push(mapFilterToggle("DEST_SETTINGS_MAPFILTERS_COLS_TOGGLE", "MapFiltersCollectibles"))
  controls.push(mapFilterToggle("DEST_SETTINGS_MAPFILTERS_FISS_TOGGLE", "MapFiltersFishing"))
  controls.push(mapFilterToggle("DEST_SETTINGS_MAPFILTERS_MISS_TOGGLE", "MapFiltersMisc"))
  controls.push({
    type: "button",
    name: getSettingsString("DEST_SETTINGS_RELOADUI"),
    tooltip: getSettingsString("RELOADUI_WARNING"),
    func: () => {
      getCharacterSavedVariables().settings.activateReloaduiButton = false
      ReloadUI("ingame")
    },
    disabled: () => !getCharacterSavedVariables().settings.activateReloaduiButton,
  })
  return {
    type: "submenu",
    name: DEFAULTS.miscColorCodes.settingsTextFish.Colorize(
      getSettingsString("DEST_SETTINGS_MAPFILTERS_HEADER")
    ),
    tooltip: getSettingsString("DEST_SETTINGS_MAPFILTERS_HEADER_TT"),
    controls,
  }
}
