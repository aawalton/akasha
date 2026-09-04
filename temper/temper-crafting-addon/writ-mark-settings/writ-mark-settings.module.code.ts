import { valueDropdown } from "@akasha/temper-settings-panel/dropdown"
import { registerPanel } from "@akasha/temper-settings-panel/register-panel"
import { ADDON_NAME, ADDON_TITLE } from "../writ-mark-constants/writ-mark-constants.module.code.ts"
import { initializeInventoryTweaks } from "../writ-mark-inventory-tweaks/writ-mark-inventory-tweaks.module.code.ts"
import {
  areInventoryTweaksEnabled,
  getMarkerColor,
  getSv,
} from "../writ-mark-saved-variables/writ-mark-saved-variables.module.code.ts"

const PANEL_ID = "TemperMasterWritInventoryMarkerSettings"

export function registerSettingsPanel(this: void): undefined {
  const lam = LibCodesCommonCode.GetLibAddonMenu()
  if (lam === undefined) {
    return undefined
  }

  const panelData: LamPanelData = {
    type: "panel",
    name: ADDON_TITLE,
    version: LibCodesCommonCode.FormatVersion(LibCodesCommonCode.GetAddOnVersion(ADDON_NAME)),
    registerForRefresh: true,
  }

  const chars: string[] = ["disabled", "default", "current"]
  const charLabels: string[] = ["Disabled", "Highest priority character", "Current character"]
  for (const [, char] of ipairs(LibCharacterKnowledge.GetCharacterList())) {
    chars.push(char.id)
    charLabels.push(char.name)
  }

  const controls: LamControlData[] = [
    { type: "header", name: "Marker Colors" },
    {
      type: "colorpicker",
      name: "Doable",
      getFunc: () => {
        return LibCodesCommonCode.Int24ToRGB(getMarkerColor("doable"))
      },
      setFunc: (r, g, b, a) => {
        getSv().doable = LibCodesCommonCode.RGBToInt24(r, g, b, a)
      },
    },
    {
      type: "colorpicker",
      name: "Completed",
      getFunc: () => {
        return LibCodesCommonCode.Int24ToRGB(getMarkerColor("completed"))
      },
      setFunc: (r, g, b, a) => {
        getSv().completed = LibCodesCommonCode.RGBToInt24(r, g, b, a)
      },
    },
    {
      type: "colorpicker",
      name: "Unknown Motif",
      getFunc: () => {
        return LibCodesCommonCode.Int24ToRGB(getMarkerColor("unknown"))
      },
      setFunc: (r, g, b, a) => {
        getSv().unknown = LibCodesCommonCode.RGBToInt24(r, g, b, a)
      },
    },
    { type: "header", name: "Motif Knowledge" },
    valueDropdown<string>({
      name: "Mark items requiring a motif unknown by",
      choices: charLabels,
      values: chars,
      scrollable: true,
      get: () => getSv().motifChar ?? "default",
      set: (value) => {
        getSv().motifChar = value
      },
    }),
    { type: "header", name: "Miscellaneous" },
    {
      type: "checkbox",
      name: "Require sufficient materials for doable writs",
      getFunc: () => getSv().requireMats === true,
      setFunc: (enabled) => {
        getSv().requireMats = enabled
      },
    },
    {
      type: "checkbox",
      name: "Enable additional inventory management tweaks",
      getFunc: areInventoryTweaksEnabled,
      setFunc: (enabled) => {
        getSv().inventoryTweaks = enabled
        initializeInventoryTweaks()
      },
    },
  ]

  registerPanel(lam, PANEL_ID, panelData, controls)
  return undefined
}
