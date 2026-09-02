import { registerPanel } from "@akasha/temper-settings-panel/register-panel"
import { ADDON_AUTHOR, ADDON_VERSION, ADDON_WEBSITE } from "../constants"
import { getSettingsString } from "../lang/register-strings"
import { buildAchievementGlobalSubmenu } from "./achievement-global-options"
import { buildAchievementsSubmenu } from "./achievement-options"
import { buildCollectiblesSubmenu } from "./collectibles-options"
import { buildFishingSubmenu } from "./fishing-options"
import { buildGeneralOptions } from "./general-options"
import { createAllIconPreviews } from "./icon-previews"
import { buildMapFiltersSubmenu } from "./map-filter-options"
import { buildMiscPoiSubmenu } from "./misc-poi-options"
import { buildUnknownPoiSubmenu } from "./unknown-poi-options"
import { buildVampireWerewolfSubmenu } from "./vampire-werewolf-options"

const LAM = LibAddonMenu2

const OPTIONS_PANEL_ID = "TemperDestinations_OptionsPanel"

export function initSettings(): undefined {
  const panelData: LamPanelData = {
    type: "panel",
    name: getSettingsString("DEST_SETTINGS_TITLE"),
    displayName: getSettingsString("DEST_SETTINGS_TITLE"),
    author: ADDON_AUTHOR,
    version: ADDON_VERSION,
    slashCommand: "/dset",
    registerForRefresh: true,
    registerForDefaults: true,
    website: ADDON_WEBSITE,
  }
  const optionsTable: LamControlData[] = []
  for (const option of buildGeneralOptions()) {
    optionsTable.push(option)
  }
  optionsTable.push(buildUnknownPoiSubmenu())
  optionsTable.push(buildAchievementsSubmenu())
  optionsTable.push(buildAchievementGlobalSubmenu())
  optionsTable.push(buildMiscPoiSubmenu())
  optionsTable.push(buildVampireWerewolfSubmenu())
  optionsTable.push(buildCollectiblesSubmenu())
  optionsTable.push(buildFishingSubmenu())
  optionsTable.push(buildMapFiltersSubmenu())

  const settingsPanel = registerPanel(LAM, OPTIONS_PANEL_ID, panelData, optionsTable)

  const createIcons = (panel: unknown): undefined => {
    if (panel === settingsPanel) {
      createAllIconPreviews()
      CALLBACK_MANAGER.UnregisterCallback("LAM-PanelControlsCreated", createIcons)
    }
  }
  CALLBACK_MANAGER.RegisterCallback("LAM-PanelControlsCreated", createIcons)
}
