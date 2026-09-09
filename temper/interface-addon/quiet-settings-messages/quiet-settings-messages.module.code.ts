import { dropdown } from "@akasha/temper-settings-panel/dropdown"
import { updateRecentMessagesExpiry } from "../quiet-alerts/quiet-alerts.module.code.ts"
import { DEFAULTS } from "../quiet-defaults/quiet-defaults.module.code.ts"
import { getSavedVariables } from "../quiet-saved-variables/quiet-saved-variables.module.code.ts"
import { header } from "../quiet-settings-header/quiet-settings-header.module.code.ts"
import {
  craftResultTooltip,
  mobImmuneTooltip,
  STRINGS,
} from "../quiet-strings/quiet-strings.module.code.ts"

export function buildMessageSections(this: void): LamControlData[] {
  const savedVars = getSavedVariables()
  return [
    header(STRINGS.NOTYOU_AVA_HEADER),
    dropdown({
      name: STRINGS.NOTYOU_AVA,
      tooltip: STRINGS.NOTYOU_AVA_TOOLTIP,
      choices: STRINGS.AVA_MODE_OPTION,
      get: () => savedVars.ava,
      set: (index) => {
        savedVars.ava = index
      },
      defaultIndex: DEFAULTS.ava,
    }),
    header(STRINGS.NOTYOU_GROUPZONE_HEADER),
    dropdown({
      name: STRINGS.NOTYOU_GROUPZONE,
      tooltip: STRINGS.NOTYOU_GROUPZONE_TOOLTIP,
      choices: STRINGS.AVA_MODE_OPTION,
      get: () => savedVars.groupZone,
      set: (index) => {
        savedVars.groupZone = index
      },
      defaultIndex: DEFAULTS.groupZone,
    }),
    header(STRINGS.NOTYOU_FRIENDS_HEADER),
    {
      type: "checkbox",
      name: STRINGS.NOTYOU_FRIENDS_ACTIVITY,
      tooltip: STRINGS.NOTYOU_FRIENDS_ACTIVITY_TOOLTIP,
      getFunc: () => savedVars.friends,
      setFunc: (value) => {
        savedVars.friends = value
      },
      default: DEFAULTS.friends,
    },
    header(STRINGS.NOTYOU_TEXT_ALERTS_HEADER),
    {
      type: "checkbox",
      name: STRINGS.NOTYOU_MOB_IMMUNE,
      tooltip: mobImmuneTooltip(),
      getFunc: () => savedVars.boss,
      setFunc: (value) => {
        savedVars.boss = value
      },
      default: DEFAULTS.boss,
    },
    {
      type: "checkbox",
      name: STRINGS.NOTYOU_SCREENSHOT,
      tooltip: STRINGS.NOTYOU_SCREENSHOT_TOOLTIP,
      getFunc: () => savedVars.screenshot,
      setFunc: (value) => {
        savedVars.screenshot = value
      },
      default: DEFAULTS.screenshot,
    },
    {
      type: "checkbox",
      name: STRINGS.NOTYOU_ENLIGHTENED,
      tooltip: STRINGS.NOTYOU_ENLIGHTENED_TOOLTIP,
      getFunc: () => savedVars.enlightened,
      setFunc: (value) => {
        savedVars.enlightened = value
      },
      default: DEFAULTS.enlightened,
      disabled: () => !IsEnlightenedAvailableForCharacter(),
    },
    {
      type: "checkbox",
      name: STRINGS.NOTYOU_CRAFTRESULT,
      tooltip: craftResultTooltip(),
      getFunc: () => savedVars.craftingResults,
      setFunc: (value) => {
        savedVars.craftingResults = value
      },
      default: DEFAULTS.craftingResults,
    },
    {
      type: "checkbox",
      name: STRINGS.NOTYOU_REPAIR,
      tooltip: STRINGS.NOTYOU_REPAIR_TOOLTIP,
      getFunc: () => savedVars.repair,
      setFunc: (value) => {
        savedVars.repair = value
      },
      default: DEFAULTS.repair,
      disabled: () => ZO_GamepadStoreManager === undefined,
    },
    {
      type: "slider",
      name: STRINGS.NOTYOU_ALERT_THROTTLING,
      tooltip: STRINGS.NOTYOU_ALERT_THROTTLING_TOOLTIP,
      min: 3,
      max: 30,
      getFunc: () => savedVars.alertTextExpiryDelay,
      setFunc: (value) => {
        savedVars.alertTextExpiryDelay = value
        updateRecentMessagesExpiry(value)
      },
      default: DEFAULTS.alertTextExpiryDelay,
    },
    header(STRINGS.NOTYOU_SOUND_HEADER),
    dropdown({
      name: STRINGS.NOTYOU_ULTISOUND,
      tooltip: STRINGS.NOTYOU_ULTISOUND_TOOLTIP,
      choices: STRINGS.SOUND_MODE_OPTION,
      get: () => savedVars.ultimateSound,
      set: (index) => {
        savedVars.ultimateSound = index
      },
      defaultIndex: DEFAULTS.ultimateSound,
    }),
  ]
}
