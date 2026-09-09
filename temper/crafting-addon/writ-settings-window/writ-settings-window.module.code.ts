import { registerPanel } from "@akasha/temper-settings-panel/register-panel"
import { ADDON_NAME, ADDON_VERSION } from "../writ-constants/writ-constants.module.code.ts"

function savedVars(): TemperWritSavedVariables {
  const sv = TemperWrit.savedVariables
  if (sv === undefined) {
    return {}
  }
  return sv
}

function wwStr(key: string): string {
  const str = TemperWrit.Str
  return (str !== undefined ? str(key) : undefined) ?? key
}

export function createSettingsWindow(this: void): undefined {
  const lamAddonId = "TemperWrit_LAM"
  const panelData: LamPanelData = {
    type: "panel",
    name: ADDON_NAME,
    displayName: ADDON_NAME,
    version: ADDON_VERSION,
    registerForRefresh: false,
    registerForDefaults: false,
  }

  const optionsData: LamControlData[] = []

  optionsData[optionsData.length] = {
    type: "checkbox",
    name: wwStr("lam_mat_price_tt_title"),
    tooltip: wwStr("lam_mat_price_tt_desc"),
    getFunc: () => savedVars().enable_mat_price_tooltip !== false,
    setFunc: (e) => {
      savedVars().enable_mat_price_tooltip = e
    },
  }

  optionsData[optionsData.length] = {
    type: "dropdown",
    name: wwStr("lam_mat_list_title"),
    tooltip: wwStr("lam_mat_list_desc"),
    choices: [
      wwStr("lam_mat_list_off"),
      wwStr("lam_mat_list_all"),
      wwStr("lam_mat_list_alchemy_only"),
    ],
    getFunc: () => savedVars().enable_mat_list_chat ?? "",
    setFunc: (e) => {
      savedVars().enable_mat_list_chat = e
    },
  }

  optionsData[optionsData.length] = {
    type: "checkbox",
    name: wwStr("lam_mm_price_title"),
    tooltip: wwStr("lam_mm_price_desc"),
    getFunc: () => savedVars().enable_mm_price ?? false,
    setFunc: (e) => {
      savedVars().enable_mm_price = e
    },
  }

  optionsData[optionsData.length] = {
    type: "checkbox",
    name: wwStr("lam_att_price_title"),
    tooltip: wwStr("lam_att_price_desc"),
    getFunc: () => savedVars().enable_att_price ?? false,
    setFunc: (e) => {
      savedVars().enable_att_price = e
    },
  }

  optionsData[optionsData.length] = {
    type: "checkbox",
    name: wwStr("lam_ttc_price_title"),
    tooltip: wwStr("lam_ttc_price_desc"),
    getFunc: () => savedVars().enable_ttc_price ?? false,
    setFunc: (e) => {
      savedVars().enable_ttc_price = e
    },
  }

  optionsData[optionsData.length] = {
    type: "checkbox",
    name: wwStr("lam_station_colors_title"),
    tooltip: wwStr("lam_station_colors_desc"),
    getFunc: () => savedVars().enable_station_colors ?? false,
    setFunc: (e) => {
      savedVars().enable_station_colors = e
    },
  }

  optionsData[optionsData.length] = {
    type: "checkbox",
    name: wwStr("lam_banked_vouchers_title"),
    tooltip: wwStr("lam_banked_vouchers_desc"),
    getFunc: () => savedVars().enable_banked_vouchers ?? false,
    setFunc: (e) => {
      savedVars().enable_banked_vouchers = e
    },
  }

  const forceEn: LamCheckboxData = {
    type: "checkbox",
    name: wwStr("lam_force_en_title"),
    tooltip: wwStr("lam_force_en_desc"),
    getFunc: () => savedVars().lang === "en",
    setFunc: (e) => {
      savedVars().lang = e ? "en" : undefined
    },
    requiresReload: true,
  }
  optionsData[optionsData.length] = forceEn

  optionsData[optionsData.length] = {
    type: "dropdown",
    name: wwStr("lam_mat_tooltip_title"),
    tooltip: wwStr("lam_mat_tooltip_desc"),
    choices: [
      wwStr("lam_mat_tooltip_off"),
      wwStr("lam_mat_tooltip_all"),
      wwStr("lam_mat_tooltip_missing_only"),
    ],
    getFunc: () => savedVars().enable_mat_list_tooltip ?? wwStr("lam_mat_tooltip_missing_only"),
    setFunc: (e) => {
      savedVars().enable_mat_list_tooltip = e
    },
  }

  if (ConfirmMasterWrit !== undefined) {
    const o: LamCheckboxData = {
      type: "checkbox",
      name: wwStr("lam_cmw_title"),
      tooltip: wwStr("lam_cmw_desc"),
      getFunc: () => savedVars().show_confirm_master_writ_duplicates ?? false,
      setFunc: (e) => {
        savedVars().show_confirm_master_writ_duplicates = !!e
      },
    }
    optionsData[optionsData.length] = o
  }

  registerPanel(LibAddonMenu2, lamAddonId, panelData, optionsData)
}
