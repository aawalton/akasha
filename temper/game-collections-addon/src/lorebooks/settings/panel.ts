import { registerPanel } from "@akasha/temper-settings-panel/register-panel"
import { ADDON_PANEL, ADDON_VERSION, ADDON_WEBSITE } from "../constants"
import { asLamControlDataArray } from "../settings-types"
import { addCompassPinOptions } from "./compass-pins"
import { addImmersiveModeOptions } from "./immersive-mode"
import { addMapPinFilterOptions } from "./map-pin-filters"
import { addPinAppearanceOptions } from "./pin-appearance"
import { addPinMenuOptions } from "./pin-menus"

const LAM = LibAddonMenu2

export function createLamPanel(): undefined {
  const panelData: LamPanelData = {
    type: "panel",
    name: GetString(LBOOKS_TITLE),
    displayName: ZO_HIGHLIGHT_TEXT.Colorize(GetString(LBOOKS_TITLE)),
    version: ADDON_VERSION,
    slashCommand: "/lorebooks",
    registerForRefresh: true,
    registerForDefaults: true,
    website: ADDON_WEBSITE,
  }

  let thePanelControl: unknown

  const optionsTable: unknown[] = []
  addPinAppearanceOptions(optionsTable, (): unknown => thePanelControl)
  addPinMenuOptions(optionsTable)
  addMapPinFilterOptions(optionsTable)
  addCompassPinOptions(optionsTable)
  addImmersiveModeOptions(optionsTable)

  thePanelControl = registerPanel(LAM, ADDON_PANEL, panelData, asLamControlDataArray(optionsTable))
}
