import { Public } from "akasha/temper/addon/pages/world/collections/modules/journal-state/journal-state.module.code.ts"
import { header } from "akasha/temper/addon/shared/settings-panel/modules/header/header.module.code.ts"
import { registerPanel } from "akasha/temper/addon/shared/settings-panel/modules/register-panel/register-panel.module.code.ts"
import { ADDON_NAME } from "akasha/temper/web/item-browser/modules/item-browser-constants/item-browser-constants.module.code.ts"
import {
  getVars,
  setSettingsPanel,
} from "akasha/temper/web/item-browser/modules/item-browser-state/item-browser-state.module.code.ts"
import { refreshCollections } from "akasha/temper/web/item-browser/modules/item-browser-tab/item-browser-tab.module.code.ts"
import { hookExternalTooltips } from "akasha/temper/web/item-browser/modules/item-browser-tooltip-hooks/item-browser-tooltip-hooks.module.code.ts"
import "akasha/temper/addon/pages/items/crafting-station/potion-decl-controls/potion-decl-controls.type-declaration.d.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import "akasha/temper/addon/type/temper-codes-common-code/temper-codes-common-code.type-declaration.d.ts"
import "akasha/temper/addon/type/lib-multi-account-sets/lib-multi-account-sets.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-item-browser-strings/eso-item-browser-strings.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

export function registerSettingsPanel(this: void): undefined {
  const lam = TemperCodesCommonCode.GetLibAddonMenu()
  if (lam === undefined) {
    return
  }

  const panelId = "TemperItemBrowserSettings"

  const panelData: LamPanelData = {
    type: "panel",
    name: GetString(SI_ITEMBROWSER_TITLE),
    version: TemperCodesCommonCode.FormatVersion(TemperCodesCommonCode.GetAddOnVersion(ADDON_NAME)),
    registerForRefresh: true,
  }

  const controls: LamControlData[] = [
    header(GetString(SI_ITEMBROWSER_SECTION_GENERAL)),
    {
      type: "checkbox",
      name: GetString(SI_ITEMBROWSER_SETTING_PERCENT),
      getFunc: () => getVars().usePercentage,
      setFunc: (enabled) => {
        getVars().usePercentage = enabled
        refreshCollections()
      },
    },

    header(GetString(SI_ITEMBROWSER_SECTION_TTCLR_P)),
    {
      type: "colorpicker",
      name: GetString(SI_ITEM_FORMAT_STR_SET_COLLECTION_PIECE_UNLOCKED),
      getFunc: () => {
        return Public.GetTooltipColorUnpacked(1, 1)
      },
      setFunc: (r, g, b) => Public.SetTooltipColor(1, 1, r, g, b),
    },
    {
      type: "colorpicker",
      name: GetString(SI_ITEM_FORMAT_STR_SET_COLLECTION_PIECE_LOCKED),
      getFunc: () => {
        return Public.GetTooltipColorUnpacked(1, 2)
      },
      setFunc: (r, g, b) => Public.SetTooltipColor(1, 2, r, g, b),
    },
    {
      type: "colorpicker",
      name: GetString(SI_ACHIEVEMENTS_PROGRESS),
      getFunc: () => {
        return Public.GetTooltipColorUnpacked(1, 3)
      },
      setFunc: (r, g, b) => Public.SetTooltipColor(1, 3, r, g, b),
    },

    header(GetString(SI_ITEMBROWSER_SECTION_TTCLR_A)),
    {
      type: "colorpicker",
      name: GetString(SI_ITEM_FORMAT_STR_SET_COLLECTION_PIECE_UNLOCKED),
      getFunc: () => {
        return Public.GetTooltipColorUnpacked(2, 1)
      },
      setFunc: (r, g, b) => Public.SetTooltipColor(2, 1, r, g, b),
    },
    {
      type: "colorpicker",
      name: GetString(SI_ITEM_FORMAT_STR_SET_COLLECTION_PIECE_LOCKED),
      getFunc: () => {
        return Public.GetTooltipColorUnpacked(2, 2)
      },
      setFunc: (r, g, b) => Public.SetTooltipColor(2, 2, r, g, b),
    },

    header(GetString(SI_ITEMBROWSER_SECTION_TTEXT)),
    {
      type: "checkbox",
      name: GetString(SI_ITEMBROWSER_SETTING_TT),
      getFunc: () => getVars().externalTooltips.enableExtension,
      setFunc: (enabled) => {
        getVars().externalTooltips.enableExtension = enabled
        if (enabled) {
          hookExternalTooltips()
        }
      },
    },
    {
      type: "dropdown",
      name: GetString(SI_ITEMBROWSER_SETTING_TT_P),
      choices: [
        GetString(SI_CHECK_BUTTON_OFF),
        GetString(SI_CHECK_BUTTON_ON),
        GetString(SI_ITEM_FORMAT_STR_SET_COLLECTION_PIECE_LOCKED),
      ],
      choicesValues: [0, 1, 2],
      getFunc: () => getVars().externalTooltips.showPieces,
      setFunc: (mode) => {
        getVars().externalTooltips.showPieces = mode as number
      },
      disabled: () => !getVars().externalTooltips.enableExtension,
    },
    {
      type: "dropdown",
      name: GetString(SI_ITEMBROWSER_SETTING_TT_A),
      tooltip: GetString(SI_ITEMBROWSER_SETTING_TT_A_EX),
      choices: [GetString(SI_CHECK_BUTTON_OFF), GetString(SI_CHECK_BUTTON_ON)],
      choicesValues: [0, 1],
      getFunc: () => getVars().externalTooltips.showAccounts,
      setFunc: (mode) => {
        getVars().externalTooltips.showAccounts = mode as number
      },
      disabled: () =>
        LibMultiAccountSets === undefined || !getVars().externalTooltips.enableExtension,
    },
  ]

  const panel = registerPanel<LamPanelData, Control, LamControlData[]>(
    lam,
    panelId,
    panelData,
    controls
  )
  setSettingsPanel(panel)
  return undefined
}
