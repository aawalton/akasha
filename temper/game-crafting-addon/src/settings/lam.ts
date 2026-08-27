import { registerPanel } from "@temper/shared-interface-lam/register-panel"
import { OptionSet, StyleInitialize } from "../core/options"
import { AccountInit } from "../data/account-init"
import { state } from "../state"
import {
  DropdownSettingsUpdate,
  SettingFromIndex,
  SettingsUpdate,
  UpdateGridPerSettings,
} from "./updates"

const LAM = LibAddonMenu2

export const PanelData: LamPanelData = {
  type: "panel",
  name: state.Title,
  displayName: state.Title,
  version: state.Version,
  slashCommand: "/tcoptions",
  registerForRefresh: true,
  registerForDefaults: true,
}

export const OptionsTable: LamOptionControl[] = [
  {
    type: "header",
    name: "UI Settings",
    width: "full",
  },
  {
    type: "checkbox",
    name: state.Loc.options.showbutton,
    tooltip: "",
    getFunc: () => state.Account.options.showbutton,
    setFunc: (value) => {
      SettingsUpdate("showbutton", value)
      OptionSet()
    },
    default: AccountInit.options.showbutton,
  },
  {
    type: "checkbox",
    name: state.Loc.options.lockbutton,
    tooltip: "",
    getFunc: () => state.Account.options.lockbutton,
    setFunc: (value) => {
      SettingsUpdate("lockbutton", value)
      OptionSet()
    },
    default: AccountInit.options.lockbutton,
  },
  {
    type: "checkbox",
    name: state.Loc.options.lockelements,
    tooltip: "",
    getFunc: () => state.Account.options.lockelements,
    setFunc: (value) => {
      SettingsUpdate("lockelements", value)
      OptionSet()
    },
    default: AccountInit.options.lockelements,
  },
  {
    type: "checkbox",
    name: state.Loc.options.closeonmove,
    tooltip: "",
    getFunc: () => state.Account.options.closeonmove,
    setFunc: (value) => SettingsUpdate("closeonmove", value),
    default: AccountInit.options.closeonmove,
  },
  {
    type: "checkbox",
    name: state.Loc.options.useartisan,
    tooltip: "",
    getFunc: () => state.Account.options.useartisan,
    setFunc: (value) => SettingsUpdate("useartisan", value),
    default: AccountInit.options.useartisan,
    disabled: true,
  },
  {
    type: "checkbox",
    name: state.Loc.options.useflask,
    tooltip: "",
    getFunc: () => state.Account.options.useflask,
    setFunc: (value) => SettingsUpdate("useflask", value),
    default: AccountInit.options.useflask,
    disabled: true,
  },
  {
    type: "checkbox",
    name: state.Loc.options.usequest,
    tooltip: state.Loc.options.usequestTooltip,
    getFunc: () => state.Account.options.usequest,
    setFunc: (value) => SettingsUpdate("usequest", value),
    default: AccountInit.options.usequest,
  },
  {
    type: "checkbox",
    name: state.Loc.options.usecook,
    tooltip: state.Loc.options.usecookTooltip,
    getFunc: () => state.Account.options.usecook,
    setFunc: (value) => SettingsUpdate("usecook", value),
    default: AccountInit.options.usecook,
  },
  {
    type: "dropdown",
    name: state.Loc.options.overviewstyle,
    tooltip: "",
    choices: state.Loc.suboptions.overviewstyle,
    getFunc: () => SettingFromIndex("overviewstyle", state.Account.options.overviewstyle),
    setFunc: (value) => DropdownSettingsUpdate("overviewstyle", value),
    default: SettingFromIndex("overviewstyle", AccountInit.options.overviewstyle),
    warning: state.Loc.reload,
  },
  {
    type: "header",
    name: "Rune Settings",
    width: "full",
  },
  {
    type: "checkbox",
    name: state.Loc.options.userune,
    tooltip: state.Loc.options.useruneTooltip,
    getFunc: () => state.Account.options.userune,
    setFunc: (value) => SettingsUpdate("userune", value),
    default: AccountInit.options.userune,
  },
  {
    type: "checkbox",
    name: state.Loc.options.userunecreation,
    tooltip: state.Loc.options.userunecreationTooltip,
    getFunc: () => state.Account.options.userunecreation,
    setFunc: (value) => SettingsUpdate("userunecreation", value),
    default: AccountInit.options.userunecreation,
    disabled: () => !state.Account.options.userune,
  },
  {
    type: "checkbox",
    name: state.Loc.options.useruneextraction,
    tooltip: state.Loc.options.useruneextractionTooltip,
    getFunc: () => state.Account.options.useruneextraction,
    setFunc: (value) => SettingsUpdate("useruneextraction", value),
    default: AccountInit.options.useruneextraction,
    disabled: () => !state.Account.options.userune,
  },
  {
    type: "checkbox",
    name: state.Loc.options.userunerecipe,
    tooltip: state.Loc.options.userunerecipeTooltip,
    getFunc: () => state.Account.options.userunerecipe,
    setFunc: (value) => SettingsUpdate("userunerecipe", value),
    default: AccountInit.options.userunerecipe,
    disabled: () => !state.Account.options.userune,
  },
  {
    type: "header",
    name: "Item Settings",
    width: "full",
  },
  {
    type: "checkbox",
    name: state.Loc.options.markitems,
    tooltip: "",
    getFunc: () => state.Account.options.markitems,
    setFunc: (value) => SettingsUpdate("markitems", value),
    default: AccountInit.options.markitems,
  },
  {
    type: "checkbox",
    name: state.Loc.options.showsymbols,
    tooltip: "",
    getFunc: () => state.Account.options.showsymbols,
    setFunc: (value) => SettingsUpdate("showsymbols", value),
    default: AccountInit.options.showsymbols,
  },
  {
    type: "checkbox",
    name: state.Loc.options.marksetitems,
    tooltip: "",
    getFunc: () => state.Account.options.marksetitems,
    setFunc: (value) => {
      SettingsUpdate("marksetitems", value)
      UpdateGridPerSettings()
    },
    default: AccountInit.options.marksetitems,
  },
  {
    type: "checkbox",
    name: state.Loc.options.stacksplit,
    tooltip: "",
    getFunc: () => state.Account.options.stacksplit,
    setFunc: (value) => SettingsUpdate("stacksplit", value),
    default: AccountInit.options.stacksplit,
  },
  {
    type: "checkbox",
    name: state.Loc.options.markduplicates,
    tooltip: "",
    getFunc: () => state.Account.options.markduplicates,
    setFunc: (value) => SettingsUpdate("markduplicates", value),
    default: AccountInit.options.markduplicates,
  },
  {
    type: "header",
    name: "Alarm Settings",
    width: "full",
  },
  {
    type: "dropdown",
    name: state.Loc.options.timeralarm,
    tooltip: "",
    choices: state.Loc.suboptions.alarms,
    getFunc: () => SettingFromIndex("alarms", state.Account.options.timeralarm),
    setFunc: (value) => DropdownSettingsUpdate("timeralarm", value, "alarms"),
    default: SettingFromIndex("alarms", AccountInit.options.timeralarm),
  },
  {
    type: "dropdown",
    name: state.Loc.options.mountalarm,
    tooltip: "",
    choices: state.Loc.suboptions.alarms,
    getFunc: () => SettingFromIndex("alarms", state.Account.options.mountalarm),
    setFunc: (value) => DropdownSettingsUpdate("mountalarm", value, "alarms"),
    default: SettingFromIndex("alarms", AccountInit.options.mountalarm),
  },
  {
    type: "dropdown",
    name: state.Loc.options.researchalarm,
    tooltip: "",
    choices: state.Loc.suboptions.alarms,
    getFunc: () => SettingFromIndex("alarms", state.Account.options.researchalarm),
    setFunc: (value) => DropdownSettingsUpdate("researchalarm", value, "alarms"),
    default: SettingFromIndex("alarms", AccountInit.options.researchalarm),
  },
  {
    type: "header",
    name: "Tooltip Settings",
    width: "full",
  },
  {
    type: "checkbox",
    name: state.Loc.options.displayrunelevel,
    tooltip: "",
    getFunc: () => state.Account.options.displayrunelevel,
    setFunc: (value) => SettingsUpdate("displayrunelevel", value),
    default: AccountInit.options.displayrunelevel,
  },
  {
    type: "checkbox",
    name: state.Loc.options.displaymm,
    tooltip: "",
    getFunc: () => state.Account.options.displaymm,
    setFunc: (value) => SettingsUpdate("displaymm", value),
    default: AccountInit.options.displaymm,
  },
  {
    type: "checkbox",
    name: state.Loc.options.displayttc,
    tooltip: "",
    getFunc: () => state.Account.options.displayttc,
    setFunc: (value) => SettingsUpdate("displayttc", value),
    default: AccountInit.options.displayttc,
  },
  {
    type: "checkbox",
    name: state.Loc.options.displaystyles,
    tooltip: "",
    getFunc: () => state.Account.options.displaystyles,
    setFunc: (value) => SettingsUpdate("displaystyles", value),
    default: AccountInit.options.displaystyles,
  },
  {
    type: "checkbox",
    name: state.Loc.options.showstock,
    tooltip: "",
    getFunc: () => state.Account.options.showstock,
    setFunc: (value) => SettingsUpdate("showstock", value),
    default: AccountInit.options.showstock,
  },
  {
    type: "checkbox",
    name: state.Loc.options.displayunknown,
    tooltip: "",
    getFunc: () => state.Account.options.displayunknown,
    setFunc: (value) => SettingsUpdate("displayunknown", value),
    default: AccountInit.options.displayunknown,
  },
  {
    type: "checkbox",
    name: state.Loc.options.displayknown,
    tooltip: "",
    getFunc: () => state.Account.options.displayknown,
    setFunc: (value) => SettingsUpdate("displayknown", value),
    default: AccountInit.options.displayknown,
  },
  {
    type: "checkbox",
    name: state.Loc.options.displaycount,
    tooltip: "",
    getFunc: () => state.Account.options.displaycount,
    setFunc: (value) => SettingsUpdate("displaycount", value),
    default: AccountInit.options.displaycount,
  },
  {
    type: "header",
    name: "Misc Settings",
    width: "full",
  },
  {
    type: "checkbox",
    name: state.Loc.options.playrunevoice,
    tooltip: "",
    getFunc: () => state.Account.options.playrunevoice,
    setFunc: (value) => SettingsUpdate("playrunevoice", value),
    default: AccountInit.options.playrunevoice,
  },
  {
    type: "checkbox",
    name: state.Loc.options.advancedcolorgrid,
    tooltip: "",
    getFunc: () => state.Account.options.advancedcolorgrid,
    setFunc: (value) => {
      SettingsUpdate("advancedcolorgrid", value)
      UpdateGridPerSettings()
    },
    default: AccountInit.options.advancedcolorgrid,
  },
  {
    type: "checkbox",
    name: state.Loc.options.lockprotection,
    tooltip: "",
    getFunc: () => state.Account.options.lockprotection,
    setFunc: (value) => SettingsUpdate("lockprotection", value),
    default: AccountInit.options.lockprotection,
  },
  {
    type: "checkbox",
    name: state.Loc.options.inspirationgain,
    tooltip: "",
    getFunc: () => state.Account.options.inspirationgain,
    setFunc: (value) => SettingsUpdate("inspirationgain", value),
    default: AccountInit.options.inspirationgain,
  },
  {
    type: "dropdown",
    name: state.Loc.options.sortsets,
    tooltip: "",
    choices: state.Loc.suboptions.sortsets,
    getFunc: () => SettingFromIndex("sortsets", state.Account.options.sortsets),
    setFunc: (value) => DropdownSettingsUpdate("sortsets", value),
    default: SettingFromIndex("sortsets", AccountInit.options.sortsets),
  },
  {
    type: "dropdown",
    name: state.Loc.options.sortstyles,
    tooltip: "",
    choices: state.Loc.suboptions.sortstyles,
    getFunc: () => SettingFromIndex("sortstyles", state.Account.options.sortstyles),
    setFunc: (value) => {
      DropdownSettingsUpdate("sortstyles", value)
      StyleInitialize()
    },
    default: SettingFromIndex("sortstyles", AccountInit.options.sortstyles),
  },
  {
    type: "editbox",
    name: state.Loc.options.bulkcraftlimit,
    tooltip: "",
    isMultiline: false,
    getFunc: () => state.Account.options.bulkcraftlimit,
    setFunc: (value) =>
      SettingsUpdate(
        "bulkcraftlimit",
        tonumber(value) ?? error("TemperCrafting: bulk craft limit must be a number")
      ),
    default: AccountInit.options.bulkcraftlimit,
  },
]

export function RegisterSettings(): Control {
  return registerPanel(LAM, state.Name, PanelData, OptionsTable)
}
