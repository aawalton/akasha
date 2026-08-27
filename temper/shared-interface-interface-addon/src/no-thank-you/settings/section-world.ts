import { dropdown } from "@temper/shared-interface-lam/dropdown"
import { disableChatMinimize, dontRotateGameCamera } from "../camera"
import { defaults } from "../defaults"
import { setHouseIcons } from "../hooks/map-pins"
import { hookCraftBagNotifications } from "../hooks/notifications/craft-bag"
import { doDisableChatAutoComplete, dontReadBooks, hookAcceptOfferedQuest } from "../hooks/world"
import { getSavedVariables } from "../saved-variables"
import { strings } from "../strings"
import { header } from "./lam-helpers"

export function buildWorldSections(this: void): LamControlData[] {
  const SV = getSavedVariables()
  return [
    header(strings.NOTYOU_CAMERA_HEADER),
    {
      type: "checkbox",
      name: strings.NOTYOU_CAMERA_INTERRUPT,
      tooltip: strings.NOTYOU_CAMERA_INTERRUPT_TOOLTIP,
      getFunc: () => SV.nonstopHarvest,
      setFunc: (value) => {
        SV.nonstopHarvest = value
      },
      default: defaults.nonstopHarvest,
    },
    {
      type: "checkbox",
      name: strings.NOTYOU_CAMERA_ROTATE,
      tooltip: strings.NOTYOU_CAMERA_ROTATE_TOOLTIP,
      getFunc: () => SV.noCameraSpin,
      setFunc: (value) => {
        SV.noCameraSpin = value
        dontRotateGameCamera()
      },
      default: defaults.noCameraSpin,
    },
    {
      type: "checkbox",
      name: strings.NOTYOU_CAMERA_ROTATE_STATS,
      tooltip: strings.NOTYOU_CAMERA_ROTATE_STATS_TOOLTIP,
      getFunc: () => SV.noCameraSpinStats,
      setFunc: (value) => {
        SV.noCameraSpinStats = value
        dontRotateGameCamera()
      },
      default: defaults.noCameraSpinStats,
      disabled: () => SV.noCameraSpin === false,
    },
    {
      type: "checkbox",
      name: strings.NOTYOU_CAMERA_ROTATE_INV,
      tooltip: strings.NOTYOU_CAMERA_ROTATE_INV_TOOLTIP,
      getFunc: () => SV.noCameraSpinInv,
      setFunc: (value) => {
        SV.noCameraSpinInv = value
        dontRotateGameCamera()
      },
      default: defaults.noCameraSpinInv,
      disabled: () => SV.noCameraSpin === false,
    },
    header(GetString(SI_WINDOW_TITLE_LORE_LIBRARY)),
    {
      type: "checkbox",
      name: strings.NOTYOU_NOLOREREADER,
      tooltip: strings.NOTYOU_NOLOREREADER_TOOLTIP,
      getFunc: () => SV.dontReadBooks,
      setFunc: (value) => {
        SV.dontReadBooks = value
        dontReadBooks()
      },
      default: defaults.dontReadBooks,
    },
    dropdown({
      name: strings.NOTYOU_NOLOREDISCOVERIES,
      tooltip: strings.NOTYOU_NOLOREDISCOVERIES_TOOLTIP,
      choices: strings.AVA_MODE_OPTION,
      get: () => SV.dontShowLoreDiscoveries,
      set: (index) => {
        SV.dontShowLoreDiscoveries = index
      },
      defaultIndex: defaults.dontShowLoreDiscoveries,
    }),
    header(GetString(SI_NOTIFICATIONTYPE15)),
    {
      type: "checkbox",
      name: strings.NOTYOU_NOCRAFTBAG_NOTIF,
      tooltip: strings.NOTYOU_NOCRAFTBAG_NOTIF_TOOLTIP,
      getFunc: () => SV.craftBag,
      setFunc: (value) => {
        SV.craftBag = value
        hookCraftBagNotifications()
      },
      default: defaults.craftBag,
    },
    header(GetString(SI_WINDOW_TITLE_SKILLS)),
    dropdown({
      name: strings.NOTYOU_NOSKILLSPROGRESS,
      tooltip: strings.NOTYOU_NOSKILLSPROGRESS_TOOLTIP,
      choices: strings.AVA_MODE_OPTION,
      get: () => SV.dontShowSkillProgression,
      set: (index) => {
        SV.dontShowSkillProgression = index
      },
      defaultIndex: defaults.dontShowSkillProgression,
    }),
    header(zo_strformat(GetString(SI_MAIN_MENU_INVENTORY))),
    {
      type: "checkbox",
      name: strings.NOTYOU_NOREPORTONITEMS,
      tooltip: strings.NOTYOU_NOREPORTONITEMS_TOOLTIP,
      getFunc: () => SV.noReportOnItems,
      setFunc: (value) => {
        SV.noReportOnItems = value
      },
      default: defaults.noReportOnItems,
    },
    {
      type: "checkbox",
      name: strings.NOTYOU_NOBINDALERT,
      tooltip: strings.NOTYOU_NOBINDALERT_TOOLTIP,
      getFunc: () => SV.noBindAlert,
      setFunc: (value) => {
        SV.noBindAlert = value
      },
      default: defaults.noBindAlert,
    },
    header(GetString(SI_MAIN_MENU_MAP)),
    {
      type: "checkbox",
      name: strings.NOTYOU_TAMRIEL,
      tooltip: strings.NOTYOU_TAMRIEL_TOOLTIP,
      getFunc: () => SV.hideTamriel,
      setFunc: (value) => {
        SV.hideTamriel = value
      },
      default: defaults.hideTamriel,
    },
    dropdown({
      name: strings.NOTYOU_WAYSHRINES,
      tooltip: strings.NOTYOU_WAYSHRINES_TOOLTIP,
      choices: strings.WAYSHRINE_OPTION,
      get: () => SV.hideTamrielWayhsrines,
      set: (index) => {
        SV.hideTamrielWayhsrines = index
      },
      defaultIndex: defaults.hideTamrielWayhsrines,
      disabled: () => SV.hideTamriel,
    }),
    dropdown({
      name: strings.NOTYOU_DUNGEONS,
      tooltip: strings.NOTYOU_DUNGEONS_TOOLTIP,
      choices: strings.DUNGEONS_OPTION,
      get: () => SV.hideTamrielDungeons,
      set: (index) => {
        SV.hideTamrielDungeons = index
      },
      defaultIndex: defaults.hideTamrielDungeons,
      disabled: () => SV.hideTamriel,
    }),
    dropdown({
      name: strings.NOTYOU_UNOWNED_HOUSES,
      tooltip: strings.NOTYOU_UNOWNED_HOUSES_TOOLTIP,
      choices: strings.UNOWNED_HOUSES_OPTION,
      get: () => SV.unownedHouses,
      set: (index) => {
        SV.unownedHouses = index
        setHouseIcons()
      },
      defaultIndex: defaults.unownedHouses,
    }),
    dropdown({
      name: strings.NOTYOU_OWNED_HOUSES,
      tooltip: strings.NOTYOU_OWNED_HOUSES_TOOLTIP,
      choices: strings.UNOWNED_HOUSES_OPTION,
      get: () => SV.ownedHouses,
      set: (index) => {
        SV.ownedHouses = index
        setHouseIcons()
      },
      defaultIndex: defaults.ownedHouses,
    }),
    header(zo_strformat(GetString(SI_JOURNAL_MENU_QUESTS))),
    {
      type: "checkbox",
      name: strings.NOTYOU_NOWRITQUESTS,
      tooltip: strings.NOTYOU_NOWRITQUESTS_TOOLTIP,
      getFunc: () => SV.dontAcceptWritQuest,
      setFunc: (value) => {
        SV.dontAcceptWritQuest = value
        hookAcceptOfferedQuest(true)
      },
      default: defaults.dontAcceptWritQuest,
    },
    header(zo_strformat(GetString(SI_CHAT_TAB_GENERAL))),
    {
      type: "checkbox",
      name: strings.NOTYOU_NOCHATAUTOCOMPLETE,
      tooltip: strings.NOTYOU_NOCHATAUTOCOMPLETE_TOOLTIP,
      getFunc: () => SV.disableChatAutoComplete,
      setFunc: (value) => {
        SV.disableChatAutoComplete = value
        doDisableChatAutoComplete()
      },
      default: defaults.disableChatAutoComplete,
    },
    {
      type: "checkbox",
      name: strings.NOTYOU_NOCHATDISABLE,
      tooltip: strings.NOTYOU_NOCHATDISABLE_TOOLTIP,
      getFunc: () => SV.chatForTradingHouse,
      setFunc: (value) => {
        SV.chatForTradingHouse = value
        disableChatMinimize()
      },
      default: defaults.chatForTradingHouse,
    },
  ]
}
