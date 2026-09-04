import { dropdown } from "@akasha/temper-settings-panel/dropdown"
import {
  disableChatMinimize,
  dontRotateGameCamera,
} from "../quiet-camera/quiet-camera.module.code.ts"
import { hookCraftBagNotifications } from "../quiet-craft-bag/quiet-craft-bag.module.code.ts"
import { DEFAULTS } from "../quiet-defaults/quiet-defaults.module.code.ts"
import { setHouseIcons } from "../quiet-map-pins/quiet-map-pins.module.code.ts"
import { getSavedVariables } from "../quiet-saved-variables/quiet-saved-variables.module.code.ts"
import { header } from "../quiet-settings-header/quiet-settings-header.module.code.ts"
import { STRINGS } from "../quiet-strings/quiet-strings.module.code.ts"
import {
  doDisableChatAutoComplete,
  dontReadBooks,
  hookAcceptOfferedQuest,
} from "../quiet-world/quiet-world.module.code.ts"

export function buildWorldSections(this: void): LamControlData[] {
  const savedVars = getSavedVariables()
  return [
    header(STRINGS.NOTYOU_CAMERA_HEADER),
    {
      type: "checkbox",
      name: STRINGS.NOTYOU_CAMERA_INTERRUPT,
      tooltip: STRINGS.NOTYOU_CAMERA_INTERRUPT_TOOLTIP,
      getFunc: () => savedVars.nonstopHarvest,
      setFunc: (value) => {
        savedVars.nonstopHarvest = value
      },
      default: DEFAULTS.nonstopHarvest,
    },
    {
      type: "checkbox",
      name: STRINGS.NOTYOU_CAMERA_ROTATE,
      tooltip: STRINGS.NOTYOU_CAMERA_ROTATE_TOOLTIP,
      getFunc: () => savedVars.noCameraSpin,
      setFunc: (value) => {
        savedVars.noCameraSpin = value
        dontRotateGameCamera()
      },
      default: DEFAULTS.noCameraSpin,
    },
    {
      type: "checkbox",
      name: STRINGS.NOTYOU_CAMERA_ROTATE_STATS,
      tooltip: STRINGS.NOTYOU_CAMERA_ROTATE_STATS_TOOLTIP,
      getFunc: () => savedVars.noCameraSpinStats,
      setFunc: (value) => {
        savedVars.noCameraSpinStats = value
        dontRotateGameCamera()
      },
      default: DEFAULTS.noCameraSpinStats,
      disabled: () => savedVars.noCameraSpin === false,
    },
    {
      type: "checkbox",
      name: STRINGS.NOTYOU_CAMERA_ROTATE_INV,
      tooltip: STRINGS.NOTYOU_CAMERA_ROTATE_INV_TOOLTIP,
      getFunc: () => savedVars.noCameraSpinInv,
      setFunc: (value) => {
        savedVars.noCameraSpinInv = value
        dontRotateGameCamera()
      },
      default: DEFAULTS.noCameraSpinInv,
      disabled: () => savedVars.noCameraSpin === false,
    },
    header(GetString(SI_WINDOW_TITLE_LORE_LIBRARY)),
    {
      type: "checkbox",
      name: STRINGS.NOTYOU_NOLOREREADER,
      tooltip: STRINGS.NOTYOU_NOLOREREADER_TOOLTIP,
      getFunc: () => savedVars.dontReadBooks,
      setFunc: (value) => {
        savedVars.dontReadBooks = value
        dontReadBooks()
      },
      default: DEFAULTS.dontReadBooks,
    },
    dropdown({
      name: STRINGS.NOTYOU_NOLOREDISCOVERIES,
      tooltip: STRINGS.NOTYOU_NOLOREDISCOVERIES_TOOLTIP,
      choices: STRINGS.AVA_MODE_OPTION,
      get: () => savedVars.dontShowLoreDiscoveries,
      set: (index) => {
        savedVars.dontShowLoreDiscoveries = index
      },
      defaultIndex: DEFAULTS.dontShowLoreDiscoveries,
    }),
    header(GetString(SI_NOTIFICATIONTYPE15)),
    {
      type: "checkbox",
      name: STRINGS.NOTYOU_NOCRAFTBAG_NOTIF,
      tooltip: STRINGS.NOTYOU_NOCRAFTBAG_NOTIF_TOOLTIP,
      getFunc: () => savedVars.craftBag,
      setFunc: (value) => {
        savedVars.craftBag = value
        hookCraftBagNotifications()
      },
      default: DEFAULTS.craftBag,
    },
    header(GetString(SI_WINDOW_TITLE_SKILLS)),
    dropdown({
      name: STRINGS.NOTYOU_NOSKILLSPROGRESS,
      tooltip: STRINGS.NOTYOU_NOSKILLSPROGRESS_TOOLTIP,
      choices: STRINGS.AVA_MODE_OPTION,
      get: () => savedVars.dontShowSkillProgression,
      set: (index) => {
        savedVars.dontShowSkillProgression = index
      },
      defaultIndex: DEFAULTS.dontShowSkillProgression,
    }),
    header(zo_strformat(GetString(SI_MAIN_MENU_INVENTORY))),
    {
      type: "checkbox",
      name: STRINGS.NOTYOU_NOREPORTONITEMS,
      tooltip: STRINGS.NOTYOU_NOREPORTONITEMS_TOOLTIP,
      getFunc: () => savedVars.noReportOnItems,
      setFunc: (value) => {
        savedVars.noReportOnItems = value
      },
      default: DEFAULTS.noReportOnItems,
    },
    {
      type: "checkbox",
      name: STRINGS.NOTYOU_NOBINDALERT,
      tooltip: STRINGS.NOTYOU_NOBINDALERT_TOOLTIP,
      getFunc: () => savedVars.noBindAlert,
      setFunc: (value) => {
        savedVars.noBindAlert = value
      },
      default: DEFAULTS.noBindAlert,
    },
    header(GetString(SI_MAIN_MENU_MAP)),
    {
      type: "checkbox",
      name: STRINGS.NOTYOU_TAMRIEL,
      tooltip: STRINGS.NOTYOU_TAMRIEL_TOOLTIP,
      getFunc: () => savedVars.hideTamriel,
      setFunc: (value) => {
        savedVars.hideTamriel = value
      },
      default: DEFAULTS.hideTamriel,
    },
    dropdown({
      name: STRINGS.NOTYOU_WAYSHRINES,
      tooltip: STRINGS.NOTYOU_WAYSHRINES_TOOLTIP,
      choices: STRINGS.WAYSHRINE_OPTION,
      get: () => savedVars.hideTamrielWayhsrines,
      set: (index) => {
        savedVars.hideTamrielWayhsrines = index
      },
      defaultIndex: DEFAULTS.hideTamrielWayhsrines,
      disabled: () => savedVars.hideTamriel,
    }),
    dropdown({
      name: STRINGS.NOTYOU_DUNGEONS,
      tooltip: STRINGS.NOTYOU_DUNGEONS_TOOLTIP,
      choices: STRINGS.DUNGEONS_OPTION,
      get: () => savedVars.hideTamrielDungeons,
      set: (index) => {
        savedVars.hideTamrielDungeons = index
      },
      defaultIndex: DEFAULTS.hideTamrielDungeons,
      disabled: () => savedVars.hideTamriel,
    }),
    dropdown({
      name: STRINGS.NOTYOU_UNOWNED_HOUSES,
      tooltip: STRINGS.NOTYOU_UNOWNED_HOUSES_TOOLTIP,
      choices: STRINGS.UNOWNED_HOUSES_OPTION,
      get: () => savedVars.unownedHouses,
      set: (index) => {
        savedVars.unownedHouses = index
        setHouseIcons()
      },
      defaultIndex: DEFAULTS.unownedHouses,
    }),
    dropdown({
      name: STRINGS.NOTYOU_OWNED_HOUSES,
      tooltip: STRINGS.NOTYOU_OWNED_HOUSES_TOOLTIP,
      choices: STRINGS.UNOWNED_HOUSES_OPTION,
      get: () => savedVars.ownedHouses,
      set: (index) => {
        savedVars.ownedHouses = index
        setHouseIcons()
      },
      defaultIndex: DEFAULTS.ownedHouses,
    }),
    header(zo_strformat(GetString(SI_JOURNAL_MENU_QUESTS))),
    {
      type: "checkbox",
      name: STRINGS.NOTYOU_NOWRITQUESTS,
      tooltip: STRINGS.NOTYOU_NOWRITQUESTS_TOOLTIP,
      getFunc: () => savedVars.dontAcceptWritQuest,
      setFunc: (value) => {
        savedVars.dontAcceptWritQuest = value
        hookAcceptOfferedQuest(true)
      },
      default: DEFAULTS.dontAcceptWritQuest,
    },
    header(zo_strformat(GetString(SI_CHAT_TAB_GENERAL))),
    {
      type: "checkbox",
      name: STRINGS.NOTYOU_NOCHATAUTOCOMPLETE,
      tooltip: STRINGS.NOTYOU_NOCHATAUTOCOMPLETE_TOOLTIP,
      getFunc: () => savedVars.disableChatAutoComplete,
      setFunc: (value) => {
        savedVars.disableChatAutoComplete = value
        doDisableChatAutoComplete()
      },
      default: DEFAULTS.disableChatAutoComplete,
    },
    {
      type: "checkbox",
      name: STRINGS.NOTYOU_NOCHATDISABLE,
      tooltip: STRINGS.NOTYOU_NOCHATDISABLE_TOOLTIP,
      getFunc: () => savedVars.chatForTradingHouse,
      setFunc: (value) => {
        savedVars.chatForTradingHouse = value
        disableChatMinimize()
      },
      default: DEFAULTS.chatForTradingHouse,
    },
  ]
}
