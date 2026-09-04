import "@akasha/temper-addon-library-types/lib-addon-menu"
import "@akasha/temper-eso-types/eso-functions-01"
import "@akasha/temper-eso-types/eso-globals"
import "@akasha/temper-eso-types/eso-ui"
import "@akasha/temper-eso-types/eso-ui-2"
import "@akasha/temper-eso-types/eso-ui-3"
import "@akasha/temper-eso-types/tstl-eso-sandbox"
import { registerPanel } from "@akasha/temper-settings-panel/register-panel"
import { asNumber } from "../companion-qol-casts/companion-qol-casts.module.code.ts"
import { FCOCO } from "../companion-qol-state/companion-qol-state.module.code.ts"

FCOCO.buildAddonMenu = function (this: void): boolean | undefined {
  const settings = FCOCO.settingsVars.settings
  if (settings === undefined || LibAddonMenu2 === undefined) {
    return false
  }
  const defaults = FCOCO.settingsVars.defaults
  const addonVars = FCOCO.addonVars
  const addonName = addonVars.addonName

  const panelData: LamPanelData = {
    type: "panel",
    name: addonVars.addonNameMenu,
    displayName: addonVars.addonNameMenuDisplay,
    author: addonVars.addonAuthor,
    version: tostring(addonVars.addonVersion),
    registerForRefresh: true,
    registerForDefaults: true,
    slashCommand: "/fcocos",
    website: addonVars.addonWebsite,
    feedback: addonVars.addonFeedback,
    donation: addonVars.addonDonation,
  }

  const savedVariablesOptions: readonly string[] = [
    GetString(FCOCO_LAM_SV_EACH_CHARACTER),
    GetString(FCOCO_LAM_SV_ACCOUNT_WIDE),
  ]
  const savedVariablesOptionsValues: readonly number[] = [1, 2]

  const optionsTable: LamControlData[] = [
    {
      type: "dropdown",
      name: GetString(FCOCO_LAM_SV_MODE),
      tooltip: GetString(FCOCO_LAM_SV_MODE_TT),
      choices: savedVariablesOptions,
      choicesValues: savedVariablesOptionsValues,
      getFunc: function (this: void): string | number {
        return FCOCO.settingsVars.defaultSettings.saveMode
      },
      setFunc: function (this: void, value: string | number): undefined {
        FCOCO.settingsVars.defaultSettings.saveMode = asNumber(value)
        return undefined
      },
      requiresReload: true,
    },

    {
      type: "header",
      name: GetString(FCOCO_LAM_SETTING_HEADER_CRAFTING),
    },
    {
      type: "checkbox",
      name: GetString(FCOCO_LAM_SETTING_UNSUMMON_AT_CRAFTING_TABLE),
      tooltip: GetString(FCOCO_LAM_SETTING_UNSUMMON_AT_CRAFTING_TABLE_TT),
      getFunc: function (this: void): boolean {
        return settings.unSummonAtCraftingTables
      },
      setFunc: function (this: void, value: boolean): undefined {
        settings.unSummonAtCraftingTables = value
        return undefined
      },
      default: defaults.unSummonAtCraftingTables,
      width: "full",
    },
    {
      type: "checkbox",
      name: GetString(FCOCO_LAM_SETTING_RESUMMON_AFTER_CRAFTING_TABLE),
      tooltip: GetString(FCOCO_LAM_SETTING_RESUMMON_AFTER_CRAFTING_TABLE_TT),
      getFunc: function (this: void): boolean {
        return settings.reSummonAfterCraftingTables
      },
      setFunc: function (this: void, value: boolean): undefined {
        settings.reSummonAfterCraftingTables = value
        return undefined
      },
      default: defaults.reSummonAfterCraftingTables,
      disabled: function (this: void): boolean {
        return !settings.unSummonAtCraftingTables
      },
      width: "full",
    },
    {
      type: "header",
      name: GetString(FCOCO_LAM_SETTING_HEADER_BANKS),
    },
    {
      type: "checkbox",
      name: GetString(FCOCO_LAM_SETTING_UNSUMMON_AT_BANK),
      tooltip: GetString(FCOCO_LAM_SETTING_UNSUMMON_AT_BANK_TT),
      getFunc: function (this: void): boolean {
        return settings.unSummonAtBanks
      },
      setFunc: function (this: void, value: boolean): undefined {
        settings.unSummonAtBanks = value
        return undefined
      },
      default: defaults.unSummonAtBanks,
      width: "full",
    },
    {
      type: "checkbox",
      name: GetString(FCOCO_LAM_SETTING_RESUMMON_AFTER_BANK),
      tooltip: GetString(FCOCO_LAM_SETTING_RESUMMON_AFTER_BANK_TT),
      getFunc: function (this: void): boolean {
        return settings.reSummonAfterBanks
      },
      setFunc: function (this: void, value: boolean): undefined {
        settings.reSummonAfterBanks = value
        return undefined
      },
      default: defaults.reSummonAfterBanks,
      disabled: function (this: void): boolean {
        return !settings.unSummonAtBanks
      },
      width: "full",
    },
    {
      type: "header",
      name: GetString(FCOCO_LAM_SETTING_HEADER_VENDORS),
    },
    {
      type: "checkbox",
      name: GetString(FCOCO_LAM_SETTING_UNSUMMON_AT_VENDOR),
      tooltip: GetString(FCOCO_LAM_SETTING_UNSUMMON_AT_VENDOR_TT),
      getFunc: function (this: void): boolean {
        return settings.unSummonAtVendors
      },
      setFunc: function (this: void, value: boolean): undefined {
        settings.unSummonAtVendors = value
        return undefined
      },
      default: defaults.unSummonAtVendors,
      width: "full",
    },
    {
      type: "checkbox",
      name: GetString(FCOCO_LAM_SETTING_RESUMMON_AFTER_VENDOR),
      tooltip: GetString(FCOCO_LAM_SETTING_RESUMMON_AFTER_VENDOR_TT),
      getFunc: function (this: void): boolean {
        return settings.reSummonAfterVendors
      },
      setFunc: function (this: void, value: boolean): undefined {
        settings.reSummonAfterVendors = value
        return undefined
      },
      default: defaults.reSummonAfterVendors,
      disabled: function (this: void): boolean {
        return !settings.unSummonAtVendors
      },
      width: "full",
    },
    {
      type: "header",
      name: GetString(FCOCO_LAM_SETTING_HEADER_FISHING),
    },
    {
      type: "checkbox",
      name: GetString(FCOCO_LAM_SETTING_UNSUMMON_AT_FISHING),
      tooltip: GetString(FCOCO_LAM_SETTING_UNSUMMON_AT_FISHING_TT),
      getFunc: function (this: void): boolean {
        return settings.unSummonAtFishing
      },
      setFunc: function (this: void, value: boolean): undefined {
        settings.unSummonAtFishing = value
        return undefined
      },
      default: defaults.unSummonAtFishing,
      width: "full",
    },
    {
      type: "checkbox",
      name: GetString(FCOCO_LAM_SETTING_RESUMMON_AFTER_FISHING),
      tooltip: GetString(FCOCO_LAM_SETTING_RESUMMON_AFTER_FISHING_TT),
      getFunc: function (this: void): boolean {
        return settings.reSummonAfterFishing
      },
      setFunc: function (this: void, value: boolean): undefined {
        settings.reSummonAfterFishing = value
        return undefined
      },
      default: defaults.reSummonAfterFishing,
      disabled: function (this: void): boolean {
        return !settings.unSummonAtFishing
      },
      width: "full",
    },
    {
      type: "slider",
      name: GetString(FCOCO_LAM_SETTING_RESUMMON_AFTER_FISHING_DELAY),
      tooltip: GetString(FCOCO_LAM_SETTING_RESUMMON_AFTER_FISHING_DELAY_TT),
      getFunc: function (this: void): number {
        return settings.reSummonAfterFishingDelay
      },
      setFunc: function (this: void, value: number): undefined {
        settings.reSummonAfterFishingDelay = value
        return undefined
      },
      min: 0,
      max: 60000,
      step: 1000,
      default: defaults.reSummonAfterFishingDelay,
      disabled: function (this: void): boolean {
        return !settings.unSummonAtFishing || !settings.reSummonAfterFishing
      },
      width: "full",
    },
    {
      type: "header",
      name: GetString(FCOCO_LAM_SETTING_HEADER_CROUCH),
    },
    {
      type: "checkbox",
      name: GetString(FCOCO_LAM_SETTING_UNSUMMON_AT_CROUCHING),
      tooltip: GetString(FCOCO_LAM_SETTING_UNSUMMON_AT_CROUCHING_TT),
      getFunc: function (this: void): boolean {
        return settings.unSummonAtCrouching
      },
      setFunc: function (this: void, value: boolean): undefined {
        settings.unSummonAtCrouching = value
        return undefined
      },
      default: defaults.unSummonAtCrouching,
      width: "full",
    },
    {
      type: "checkbox",
      name: GetString(FCOCO_LAM_SETTING_UNSUMMON_AT_CROUCHING_NO_COMBAT),
      tooltip: GetString(FCOCO_LAM_SETTING_UNSUMMON_AT_CROUCHING_NO_COMBAT_TT),
      getFunc: function (this: void): boolean {
        return settings.unSummonAtCrouchingNoCombat
      },
      setFunc: function (this: void, value: boolean): undefined {
        settings.unSummonAtCrouchingNoCombat = value
        return undefined
      },
      default: defaults.unSummonAtCrouchingNoCombat,
      disabled: function (this: void): boolean {
        return !settings.unSummonAtCrouching
      },
      width: "full",
    },
    {
      type: "checkbox",
      name: GetString(FCOCO_LAM_SETTING_RESUMMON_AFTER_CROUCHING),
      tooltip: GetString(FCOCO_LAM_SETTING_RESUMMON_AFTER_CROUCHING_TT),
      getFunc: function (this: void): boolean {
        return settings.reSummonAfterCrouching
      },
      setFunc: function (this: void, value: boolean): undefined {
        settings.reSummonAfterCrouching = value
        return undefined
      },
      default: defaults.reSummonAfterCrouching,
      disabled: function (this: void): boolean {
        return !settings.unSummonAtCrouching
      },
      width: "full",
    },
    {
      type: "slider",
      name: GetString(FCOCO_LAM_SETTING_RESUMMON_AFTER_CROUCHING_DELAY),
      tooltip: GetString(FCOCO_LAM_SETTING_RESUMMON_AFTER_CROUCHING_DELAY_TT),
      getFunc: function (this: void): number {
        return settings.reSummonAfterCrouchingDelay
      },
      setFunc: function (this: void, value: number): undefined {
        settings.reSummonAfterCrouchingDelay = value
        return undefined
      },
      min: 0,
      max: 60000,
      step: 1000,
      default: defaults.reSummonAfterCrouchingDelay,
      disabled: function (this: void): boolean {
        return !settings.unSummonAtCrouching || !settings.reSummonAfterCrouching
      },
      width: "full",
    },
    {
      type: "header",
      name: GetString(FCOCO_LAM_SETTING_HEADER_COMPASS),
    },
    {
      type: "checkbox",
      name: GetString(FCOCO_LAM_SETTING_DISABLE_PIN_AT_COMPASS),
      tooltip: GetString(FCOCO_LAM_SETTING_DISABLE_PIN_AT_COMPASS_TT),
      getFunc: function (this: void): boolean {
        return settings.disableCompanionAtCompass
      },
      setFunc: function (this: void, value: boolean): undefined {
        settings.disableCompanionAtCompass = value
        FCOCO.UpdateCompass()
        return undefined
      },
      default: defaults.disableCompanionAtCompass,
      width: "full",
    },
  ]

  FCOCO.FCOSettingsPanel = registerPanel(LibAddonMenu2, `${addonName}_LAM`, panelData, optionsTable)
  return undefined
}
