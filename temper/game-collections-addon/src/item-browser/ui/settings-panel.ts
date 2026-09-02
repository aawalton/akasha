import { header } from "@akasha/temper-settings-panel/header"
import { registerPanel } from "@akasha/temper-settings-panel/register-panel"
import { ADDON_NAME, ADDON_URL } from "../constants"
import { getVars, setSettingsPanel } from "../core/state"
import { hookExternalTooltips } from "../tooltip/hooks"
import { refreshCollections } from "./browser"

function asNumber(this: void, value: unknown): number {
  return value as number
}

export function registerSettingsPanel(this: void): undefined {
  const lam = LibCodesCommonCode.GetLibAddonMenu()
  if (lam === undefined) {
    return
  }

  const panelId = "TemperItemBrowserSettings"

  const panelData: LamPanelData = {
    type: "panel",
    name: GetString(SI_ITEMBROWSER_TITLE),
    version: LibCodesCommonCode.FormatVersion(LibCodesCommonCode.GetAddOnVersion(ADDON_NAME)),
    website: ADDON_URL,
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
        return LibExtendedJournal.GetTooltipColorUnpacked(1, 1)
      },
      setFunc: (r, g, b) => LibExtendedJournal.SetTooltipColor(1, 1, r, g, b),
    },
    {
      type: "colorpicker",
      name: GetString(SI_ITEM_FORMAT_STR_SET_COLLECTION_PIECE_LOCKED),
      getFunc: () => {
        return LibExtendedJournal.GetTooltipColorUnpacked(1, 2)
      },
      setFunc: (r, g, b) => LibExtendedJournal.SetTooltipColor(1, 2, r, g, b),
    },
    {
      type: "colorpicker",
      name: GetString(SI_ACHIEVEMENTS_PROGRESS),
      getFunc: () => {
        return LibExtendedJournal.GetTooltipColorUnpacked(1, 3)
      },
      setFunc: (r, g, b) => LibExtendedJournal.SetTooltipColor(1, 3, r, g, b),
    },

    header(GetString(SI_ITEMBROWSER_SECTION_TTCLR_A)),
    {
      type: "colorpicker",
      name: GetString(SI_ITEM_FORMAT_STR_SET_COLLECTION_PIECE_UNLOCKED),
      getFunc: () => {
        return LibExtendedJournal.GetTooltipColorUnpacked(2, 1)
      },
      setFunc: (r, g, b) => LibExtendedJournal.SetTooltipColor(2, 1, r, g, b),
    },
    {
      type: "colorpicker",
      name: GetString(SI_ITEM_FORMAT_STR_SET_COLLECTION_PIECE_LOCKED),
      getFunc: () => {
        return LibExtendedJournal.GetTooltipColorUnpacked(2, 2)
      },
      setFunc: (r, g, b) => LibExtendedJournal.SetTooltipColor(2, 2, r, g, b),
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
        getVars().externalTooltips.showPieces = asNumber(mode)
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
        getVars().externalTooltips.showAccounts = asNumber(mode)
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
