import { registerPanel } from "akasha/temper/addon/shared/settings-panel/modules/register-panel/register-panel.module.code.ts"
import { addCompassPinOptions } from "akasha/temper/catalog/world/lorebook/modules/lorebooks-compass-pins/lorebooks-compass-pins.module.code.ts"
import {
  ADDON_PANEL,
  ADDON_VERSION,
} from "akasha/temper/catalog/world/lorebook/modules/lorebooks-constants/lorebooks-constants.module.code.ts"
import { addImmersiveModeOptions } from "akasha/temper/catalog/world/lorebook/modules/lorebooks-immersive-mode/lorebooks-immersive-mode.module.code.ts"
import { addMapPinFilterOptions } from "akasha/temper/catalog/world/lorebook/modules/lorebooks-map-pin-filters/lorebooks-map-pin-filters.module.code.ts"
import { addPinAppearanceOptions } from "akasha/temper/catalog/world/lorebook/modules/lorebooks-pin-appearance/lorebooks-pin-appearance.module.code.ts"
import { addPinMenuOptions } from "akasha/temper/catalog/world/lorebook/modules/lorebooks-pin-menus/lorebooks-pin-menus.module.code.ts"
import { asLamControlDataArray } from "akasha/temper/catalog/world/lorebook/modules/lorebooks-settings-types/lorebooks-settings-types.module.code.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import "akasha/temper/catalog/world/lorebook/lorebooks-string-ids/lorebooks-string-ids.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-map-ui/eso-map-ui.type-declaration.d.ts"

const LAM = TemperAddonMenu

export function createLamPanel(): undefined {
  const panelData: LamPanelData = {
    type: "panel",
    name: GetString(SI_TEMPER_LOREBOOKS_TITLE),
    displayName: ZO_HIGHLIGHT_TEXT.Colorize(GetString(SI_TEMPER_LOREBOOKS_TITLE)),
    version: ADDON_VERSION,
    slashCommand: "/lorebooks",
    registerForRefresh: true,
    registerForDefaults: true,
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
