import { registerPanel } from "@akasha/temper-settings-panel/register-panel"
import { asBoolean } from "../potion-casts/potion-casts.module.code.ts"
import {
  getAccountSettings,
  getPlayerSettings,
} from "../potion-saved-variables/potion-saved-variables.module.code.ts"
import { PotMaker } from "../potion-state/potion-state.module.code.ts"

interface LAM2PanelData {
  type: "panel"
  name: string
  displayName: string
  version: string
  registerForRefresh: boolean
  registerForDefaults: boolean
}

interface LAM2OptionEntry {
  type: string
  name?: string
  text?: string
  title?: string
  tooltip?: string
  warning?: string
  choices?: string[]
  width?: string
  default?: boolean | string
  getFunc?: (this: void) => boolean | string
  setFunc?: (this: void, value: boolean | string) => undefined
  disabled?: (this: void) => boolean
}

interface LAM2Surface {
  RegisterAddonPanel: (this: LAM2Surface, addonName: string, panelData: LAM2PanelData) => undefined
  RegisterOptionControls: (
    this: LAM2Surface,
    addonName: string,
    optionsTable: LAM2OptionEntry[]
  ) => undefined
}

interface LMM2WithRefresh {
  Refresh: (this: void) => undefined
}

function asLMM2WithRefresh(value: unknown): LMM2WithRefresh {
  return value as LMM2WithRefresh
}

function asLAM2Surface(value: unknown): LAM2Surface {
  return value as LAM2Surface
}

function initSettingsMenu(this: void): undefined {
  const lam2 = LibAddonMenu2 === undefined ? undefined : asLAM2Surface(LibAddonMenu2)
  if (lam2 === undefined) {
    return
  }

  const addonNAME = "Potion Maker"
  const addonVERSION = "v" + PotMaker.version
  const panelData: LAM2PanelData = {
    type: "panel",
    name: addonNAME,
    displayName: zo_strjoin("", addonNAME, " (", PotMaker.language.name, ")"),
    version: addonVERSION,
    registerForRefresh: true,
    registerForDefaults: true,
  }
  const lmm2 = asLMM2WithRefresh(PotMaker.LMM2)

  const optionsTable: LAM2OptionEntry[] = [
    {
      type: "description",
      text: "",
      title: GetUnitName("player"),
      width: "full",
    },
    {
      type: "checkbox",
      name: PotMaker.language.use_missing_reagents_short,
      tooltip: PotMaker.language.use_missing_reagents_long,
      warning: PotMaker.language.use_missing_reagents_warning,
      getFunc: function (this: void): boolean {
        return getPlayerSettings().useMissing
      },
      setFunc: function (this: void, value: boolean | string): undefined {
        getPlayerSettings().useMissing = asBoolean(value)
      },
      width: "full",
      default: PotMaker.dataDefaults.useMissing,
    },
    {
      type: "checkbox",
      name: PotMaker.language.use_unknown_traits_short,
      tooltip: PotMaker.language.use_unknown_traits_long,
      getFunc: function (this: void): boolean {
        return getPlayerSettings().useUnknown
      },
      setFunc: function (this: void, value: boolean | string): undefined {
        const playerSettings = getPlayerSettings()
        playerSettings.useUnknown = asBoolean(value)
        if (value === true) {
          playerSettings.training = false
        }
      },
      width: "full",
      default: PotMaker.dataDefaults.useUnknown,
    },
    {
      type: "checkbox",
      name: " |u12:0::|u" + PotMaker.language.training_short,
      tooltip: PotMaker.language.training_long,
      getFunc: function (this: void): boolean {
        const playerSettings = getPlayerSettings()
        return playerSettings.training && playerSettings.useUnknown
      },
      setFunc: function (this: void, value: boolean | string): undefined {
        getPlayerSettings().training = asBoolean(value)
      },
      width: "full",
      default: PotMaker.dataDefaults.training,
      disabled: function (this: void): boolean {
        return !getPlayerSettings().useUnknown
      },
    },
    {
      type: "checkbox",
      name: " |u12:0::|u" + PotMaker.language.fake_third_slot_short,
      tooltip: PotMaker.language.fake_third_slot_long,
      getFunc: function (this: void): boolean {
        return getPlayerSettings().fakeThirdSlot
      },
      setFunc: function (this: void, value: boolean | string): undefined {
        getPlayerSettings().fakeThirdSlot = asBoolean(value)
      },
      width: "full",
      default: PotMaker.dataDefaults.fakeThirdSlot,
      disabled: function (this: void): boolean {
        return !getPlayerSettings().useUnknown
      },
    },
    {
      type: "header",
      name: GetString(SI_KEYBINDINGS_LAYER_GENERAL),
      width: "full",
    },
    {
      type: "checkbox",
      name: PotMaker.language.show_xp_short,
      tooltip: PotMaker.language.show_xp_long,
      getFunc: function (this: void): boolean {
        return getAccountSettings().XPMode
      },
      setFunc: function (this: void, value: boolean | string): undefined {
        getAccountSettings().XPMode = asBoolean(value)
      },
      width: "full",
      default: PotMaker.accountDefaults.XPMode,
    },
    {
      type: "checkbox",
      name: PotMaker.language.reagent_stackorder_short,
      tooltip: PotMaker.language.reagent_stackorder_long,
      getFunc: function (this: void): boolean {
        return getAccountSettings().reagentStackOrder
      },
      setFunc: function (this: void, value: boolean | string): undefined {
        getAccountSettings().reagentStackOrder = asBoolean(value)
      },
      width: "full",
      default: PotMaker.accountDefaults.reagentStackOrder,
    },
    {
      type: "checkbox",
      name: PotMaker.language.show_mainmenu_item_short,
      tooltip: PotMaker.language.show_mainmenu_item_long,
      getFunc: function (this: void): boolean {
        return getAccountSettings().showMainMenuItem
      },
      setFunc: function (this: void, value: boolean | string): undefined {
        getAccountSettings().showMainMenuItem = asBoolean(value)
        lmm2.Refresh()
      },
      width: "full",
      default: PotMaker.accountDefaults.showMainMenuItem,
    },
    {
      type: "checkbox",
      name: PotMaker.language.show_as_default,
      tooltip: PotMaker.language.show_as_default_long,
      getFunc: function (this: void): boolean {
        return getAccountSettings().showAsDefault
      },
      setFunc: function (this: void, value: boolean | string): undefined {
        getAccountSettings().showAsDefault = asBoolean(value)
      },
      width: "full",
      default: PotMaker.accountDefaults.showMainMenuItem,
    },
    {
      type: "checkbox",
      name: PotMaker.language.suppress_new_trait_dialog,
      tooltip: PotMaker.language.suppress_new_trait_dialog_long,
      getFunc: function (this: void): boolean {
        return getAccountSettings().suppressNewTraitDialog
      },
      setFunc: function (this: void, value: boolean | string): undefined {
        getAccountSettings().suppressNewTraitDialog = asBoolean(value)
      },
      width: "full",
      default: PotMaker.accountDefaults.suppressNewTraitDialog,
    },
    {
      type: "checkbox",
      name: PotMaker.language.use_item_saver,
      tooltip: PotMaker.language.use_item_saver_long,
      getFunc: function (this: void): boolean {
        return (
          (FCOIsMarked !== undefined ||
            FCOIS !== undefined ||
            ItemSaver_IsItemSaved !== undefined) &&
          getAccountSettings().useItemSaver
        )
      },
      setFunc: function (this: void, value: boolean | string): undefined {
        getAccountSettings().useItemSaver = asBoolean(value)
      },
      width: "full",
      default: PotMaker.accountDefaults.useItemSaver,
      disabled: function (this: void): boolean {
        return (
          FCOIsMarked === undefined && ItemSaver_IsItemSaved === undefined && FCOIS === undefined
        )
      },
    },
    {
      type: "checkbox",
      name: PotMaker.language.auto_switch_tabs,
      tooltip: PotMaker.language.auto_switch_tabs_long,
      getFunc: function (this: void): boolean {
        return getAccountSettings().autoSwitchTab
      },
      setFunc: function (this: void, value: boolean | string): undefined {
        getAccountSettings().autoSwitchTab = asBoolean(value)
      },
      width: "full",
      default: PotMaker.accountDefaults.autoSwitchTab,
    },
    {
      type: "header",
      name: PotMaker.language.show_favorite_header,
      width: "full",
    },
    {
      type: "dropdown",
      name: PotMaker.language.show_favorite_short,
      tooltip: PotMaker.language.show_favorite_long,
      choices: [
        PotMaker.language.show_favorite_reagents,
        PotMaker.language.show_favorite_potion,
        PotMaker.language.show_favorite_traits,
      ],
      getFunc: function (this: void): string {
        const stored = getAccountSettings().showInFavorites
        let value: string
        if (stored === "TRAITS") {
          value = PotMaker.language.show_favorite_traits
        } else if (stored === "POTION") {
          value = PotMaker.language.show_favorite_potion
        } else {
          value = PotMaker.language.show_favorite_reagents
        }
        return value
      },
      setFunc: function (this: void, value: boolean | string): undefined {
        let stored: string
        if (value === PotMaker.language.show_favorite_traits) {
          stored = "TRAITS"
        } else if (value === PotMaker.language.show_favorite_potion) {
          stored = "POTION"
        } else {
          stored = "REAGENTS"
        }
        getAccountSettings().showInFavorites = stored
      },
      width: "full",
      default: PotMaker.accountDefaults.showInFavorites,
    },
    {
      type: "checkbox",
      name: PotMaker.language.filter_favorite_traits,
      tooltip: undefined,
      getFunc: function (this: void): boolean {
        return getAccountSettings().filterFavoriteByTraits
      },
      setFunc: function (this: void, value: boolean | string): undefined {
        getAccountSettings().filterFavoriteByTraits = asBoolean(value)
      },
      width: "full",
      default: PotMaker.accountDefaults.filterFavoriteByTraits,
    },
    {
      type: "checkbox",
      name: PotMaker.language.filter_favorite_reagents,
      tooltip: undefined,
      getFunc: function (this: void): boolean {
        return getAccountSettings().filterFavoriteByReagents
      },
      setFunc: function (this: void, value: boolean | string): undefined {
        getAccountSettings().filterFavoriteByReagents = asBoolean(value)
      },
      width: "full",
      default: PotMaker.accountDefaults.filterFavoriteByReagents,
    },
    {
      type: "checkbox",
      name: PotMaker.language.filter_favorite_solvents,
      tooltip: undefined,
      getFunc: function (this: void): boolean {
        return getAccountSettings().filterFavoriteBySolvents
      },
      setFunc: function (this: void, value: boolean | string): undefined {
        getAccountSettings().filterFavoriteBySolvents = asBoolean(value)
      },
      width: "full",
      default: PotMaker.accountDefaults.filterFavoriteBySolvents,
    },
  ]

  registerPanel(lam2, addonNAME, panelData, optionsTable)
}

PotMaker.initSettingsMenu = initSettingsMenu
