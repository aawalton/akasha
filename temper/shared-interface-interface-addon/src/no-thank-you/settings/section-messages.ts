import { dropdown } from "@akasha/temper-settings-panel/dropdown"
import { defaults } from "../defaults"
import { updateRecentMessagesExpiry } from "../hooks/alerts"
import { getSavedVariables } from "../saved-variables"
import { craftResultTooltip, mobImmuneTooltip, strings } from "../strings"
import { header } from "./lam-helpers"

export function buildMessageSections(this: void): LamControlData[] {
  const SV = getSavedVariables()
  return [
    header(strings.NOTYOU_AVA_HEADER),
    dropdown({
      name: strings.NOTYOU_AVA,
      tooltip: strings.NOTYOU_AVA_TOOLTIP,
      choices: strings.AVA_MODE_OPTION,
      get: () => SV.ava,
      set: (index) => {
        SV.ava = index
      },
      defaultIndex: defaults.ava,
    }),
    header(strings.NOTYOU_GROUPZONE_HEADER),
    dropdown({
      name: strings.NOTYOU_GROUPZONE,
      tooltip: strings.NOTYOU_GROUPZONE_TOOLTIP,
      choices: strings.AVA_MODE_OPTION,
      get: () => SV.groupZone,
      set: (index) => {
        SV.groupZone = index
      },
      defaultIndex: defaults.groupZone,
    }),
    header(strings.NOTYOU_FRIENDS_HEADER),
    {
      type: "checkbox",
      name: strings.NOTYOU_FRIENDS_ACTIVITY,
      tooltip: strings.NOTYOU_FRIENDS_ACTIVITY_TOOLTIP,
      getFunc: () => SV.friends,
      setFunc: (value) => {
        SV.friends = value
      },
      default: defaults.friends,
    },
    header(strings.NOTYOU_TEXT_ALERTS_HEADER),
    {
      type: "checkbox",
      name: strings.NOTYOU_MOB_IMMUNE,
      tooltip: mobImmuneTooltip(),
      getFunc: () => SV.boss,
      setFunc: (value) => {
        SV.boss = value
      },
      default: defaults.boss,
    },
    {
      type: "checkbox",
      name: strings.NOTYOU_SCREENSHOT,
      tooltip: strings.NOTYOU_SCREENSHOT_TOOLTIP,
      getFunc: () => SV.screenshot,
      setFunc: (value) => {
        SV.screenshot = value
      },
      default: defaults.screenshot,
    },
    {
      type: "checkbox",
      name: strings.NOTYOU_ENLIGHTENED,
      tooltip: strings.NOTYOU_ENLIGHTENED_TOOLTIP,
      getFunc: () => SV.enlightened,
      setFunc: (value) => {
        SV.enlightened = value
      },
      default: defaults.enlightened,
      disabled: () => !IsEnlightenedAvailableForCharacter(),
    },
    {
      type: "checkbox",
      name: strings.NOTYOU_CRAFTRESULT,
      tooltip: craftResultTooltip(),
      getFunc: () => SV.craftingResults,
      setFunc: (value) => {
        SV.craftingResults = value
      },
      default: defaults.craftingResults,
    },
    {
      type: "checkbox",
      name: strings.NOTYOU_REPAIR,
      tooltip: strings.NOTYOU_REPAIR_TOOLTIP,
      getFunc: () => SV.repair,
      setFunc: (value) => {
        SV.repair = value
      },
      default: defaults.repair,
      disabled: () => ZO_GamepadStoreManager === undefined,
    },
    {
      type: "slider",
      name: strings.NOTYOU_ALERT_THROTTLING,
      tooltip: strings.NOTYOU_ALERT_THROTTLING_TOOLTIP,
      min: 3,
      max: 30,
      getFunc: () => SV.alertTextExpiryDelay,
      setFunc: (value) => {
        SV.alertTextExpiryDelay = value
        updateRecentMessagesExpiry(value)
      },
      default: defaults.alertTextExpiryDelay,
    },
    header(strings.NOTYOU_SOUND_HEADER),
    dropdown({
      name: strings.NOTYOU_ULTISOUND,
      tooltip: strings.NOTYOU_ULTISOUND_TOOLTIP,
      choices: strings.SOUND_MODE_OPTION,
      get: () => SV.ultimateSound,
      set: (index) => {
        SV.ultimateSound = index
      },
      defaultIndex: defaults.ultimateSound,
    }),
  ]
}
