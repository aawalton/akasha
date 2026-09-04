import type { AddonSettings } from "../fco-types/fco-types.module.code.ts"

export interface PreventEndlessLoopHolder {
  current: boolean
}

export function buildActionBarsControls(
  this: void,
  settings: AddonSettings,
  defaults: AddonSettings,
  preventEndlessLoop: PreventEndlessLoopHolder
): LamControlData[] {
  const offset = settings.repositionActionSlotTimersOffset
  const offsetDefaults = defaults.repositionActionSlotTimersOffset
  return [
    { type: "header", name: "Action bars" },
    {
      type: "checkbox",
      name: "Enable reposition of ability bar backRow timers",
      tooltip:
        "Enable reposition of action slot timers of the backRow, which are shown if you have enabled the ability bar timers at the combat settings + enabled the ability bar backrow",
      getFunc: () => settings.repositionActionSlotTimers === true,
      setFunc: (value) => {
        settings.repositionActionSlotTimers = value
      },
      default: defaults.repositionActionSlotTimers === true,
      width: "full",
      disabled: () =>
        GetSetting_Bool(SETTING_TYPE_UI, UI_SETTING_SHOW_ACTION_BAR_TIMERS) !== true ||
        GetSetting_Bool(SETTING_TYPE_UI, UI_SETTING_SHOW_ACTION_BAR_BACK_ROW) !== true,
      requiresReload: true,
    },
    {
      type: "checkbox",
      name: "Show time left as number too",
      tooltip: "Show the time left as a number above the icon of the backRow skill timer",
      getFunc: () => settings.showActionSlotTimersTimeLeftNumber === true,
      setFunc: (value) => {
        settings.showActionSlotTimersTimeLeftNumber = value
      },
      default: defaults.showActionSlotTimersTimeLeftNumber === true,
      width: "full",
      disabled: () => settings.repositionActionSlotTimers !== true,
    },
    {
      type: "editbox",
      name: "Offset X",
      tooltip: "The offset on the X axis. Default value is 0.",
      isMultiline: false,
      getFunc: () => tostring(offset.x),
      setFunc: (value) => {
        if (preventEndlessLoop.current === true) {
          offset.x = tonumber(value) ?? 0
          preventEndlessLoop.current = false
          return
        }
        const valueInt = tonumber(value)
        const screenWidth = GuiRoot.GetWidth()
        const screenXOffsetMin = ZO_ActionBar1.GetLeft() * -1
        const screenXOffsetMax = screenWidth + screenXOffsetMin
        if (valueInt === undefined || valueInt < screenXOffsetMin || valueInt > screenXOffsetMax) {
          preventEndlessLoop.current = true
          FCOCHANGESTUFF_repositionActionSlotTimersOffsetX_EditBox.UpdateValue("0")
        } else {
          offset.x = tonumber(value) ?? 0
        }
      },
      width: "half",
      textType: TEXT_TYPE_NUMERIC,
      default: tostring(offsetDefaults.x),
      disabled: () => settings.repositionActionSlotTimers !== true,
      reference: "FCOCHANGESTUFF_repositionActionSlotTimersOffsetX_EditBox",
    },
    {
      type: "editbox",
      name: "Offset Y",
      tooltip: "The offset on the Y axis. Default value is 0.",
      isMultiline: false,
      getFunc: () => tostring(offset.y),
      setFunc: (value) => {
        if (preventEndlessLoop.current === true) {
          offset.y = tonumber(value) ?? 0
          preventEndlessLoop.current = false
          return
        }
        const valueInt = tonumber(value)
        const screenHeight = GuiRoot.GetHeight()
        const screenYOffsetMin = ZO_ActionBar1.GetTop() * -1
        const screenYOffsetMax = screenHeight + screenYOffsetMin
        if (valueInt === undefined || valueInt < screenYOffsetMin || valueInt > screenYOffsetMax) {
          preventEndlessLoop.current = true
          FCOCHANGESTUFF_repositionActionSlotTimersOffsetY_EditBox.UpdateValue("0")
        } else {
          offset.y = tonumber(value) ?? 0
        }
      },
      width: "half",
      textType: TEXT_TYPE_NUMERIC,
      default: tostring(offsetDefaults.y),
      disabled: () => settings.repositionActionSlotTimers !== true,
      reference: "FCOCHANGESTUFF_repositionActionSlotTimersOffsetY_EditBox",
    },
  ]
}
