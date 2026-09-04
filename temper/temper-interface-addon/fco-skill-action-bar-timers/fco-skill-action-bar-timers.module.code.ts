import { STATE } from "../fco-state/fco-state.module.code.ts"

const EM = EVENT_MANAGER
const WM = WINDOW_MANAGER

const GAMEPAD_CONSTANTS = {
  backRowSlotOffsetY: -17,
  backRowUltimateSlotOffsetY: -30,
}
const KEYBOARD_CONSTANTS = {
  backRowSlotOffsetY: -17,
  backRowUltimateSlotOffsetY: -20,
}

const FILL_BAR_UPDATE_HANDLER_ON_UPDATE_NAME = "FCOCS_FillBarUpdate"

interface ActionBarSlotControl extends Control {
  SetHandler: (
    this: ActionBarSlotControl,
    event: string,
    handler: ((this: void, ...args: never[]) => void) | undefined,
    name?: string,
    order?: number,
    originalHandlerName?: string
  ) => void
}

interface TimelineAnimation {
  SetStartOffsetY: (this: TimelineAnimation, offsetY: number) => void
  SetEndOffsetY: (this: TimelineAnimation, offsetY: number) => void
  SetStartAndEndWidth: (this: TimelineAnimation, startWidth: number, endWidth: number) => void
  SetStartAndEndHeight: (this: TimelineAnimation, startHeight: number, endHeight: number) => void
}

interface BackBarSwapAnimation {
  GetAnimation: (this: BackBarSwapAnimation, index: number) => TimelineAnimation
}

interface ActionBarTimerSelf {
  timeLeftLabelControl?: LabelControl
  iconTexture: TextureControl
  endTimeMS: number
  slot: ActionBarSlotControl
  active?: boolean
  showBackRowSlot?: boolean
  backBarSwapAnimation: BackBarSwapAnimation
  HasValidDuration: (this: ActionBarTimerSelf) => boolean
  GetSlot: (this: ActionBarTimerSelf) => number
  ApplySwapAnimationStyle: (this: ActionBarTimerSelf, offsetY: number, offsetYOrig: number) => void
}

interface ActionButtonSelf {
  endTimeMS?: number
  showTimer?: boolean
  stackCountText: Control
  GetSlot: (this: ActionButtonSelf) => number
}

function isActionBarTimerSelf(this: void, value: unknown): value is ActionBarTimerSelf {
  return type(value) === "table"
}

function myUpdateFillBarAddition(
  this: void,
  selfActionBarTimer: ActionBarTimerSelf,
  activeDuration: boolean | undefined
): undefined {
  const active = activeDuration ?? selfActionBarTimer.HasValidDuration()
  const timeLeftLabelControl = selfActionBarTimer.timeLeftLabelControl
  if (timeLeftLabelControl === undefined) {
    return
  }
  const disableTimeLeftLabel = function (this: void): undefined {
    selfActionBarTimer.slot.SetHandler(
      "OnUpdate",
      undefined,
      FILL_BAR_UPDATE_HANDLER_ON_UPDATE_NAME
    )
    timeLeftLabelControl.SetHidden(true)
    timeLeftLabelControl.SetText("")
  }
  if (!active) {
    disableTimeLeftLabel()
    return
  }
  const nowInMS = GetFrameTimeMilliseconds()
  const endTimeInMS = selfActionBarTimer.endTimeMS
  let secondsLeft = 0
  if (endTimeInMS > nowInMS) {
    secondsLeft = (endTimeInMS - nowInMS) / 1000
  }
  if (secondsLeft > 0) {
    const showUnitOverThresholdSeconds = ZO_ONE_MINUTE_IN_SECONDS
    const showDecimalUnderThresholdSeconds = ZO_EFFECT_EXPIRATION_IMMINENCE_THRESHOLD_S
    const timeLeftString = ZO_FormatTimeShowUnitOverThresholdShowDecimalUnderThreshold(
      secondsLeft,
      showUnitOverThresholdSeconds,
      showDecimalUnderThresholdSeconds,
      TIME_FORMAT_STYLE_SHOW_LARGEST_UNIT
    )
    timeLeftLabelControl.SetHidden(false)
    timeLeftLabelControl.SetText(timeLeftString)
  } else {
    disableTimeLeftLabel()
  }
}

function createTimeLeftLabelControl(this: void, selfButtonTimer: ActionBarTimerSelf): LabelControl {
  const timeLeftLabelSuffix = "TimeLeftLabel"
  const iconTexture = selfButtonTimer.iconTexture
  let timeLeftLabelControl = GetControl<LabelControl>(iconTexture, timeLeftLabelSuffix)
  if (timeLeftLabelControl === undefined) {
    timeLeftLabelControl = WM.CreateControl(
      iconTexture.GetName() + timeLeftLabelSuffix,
      iconTexture,
      CT_LABEL
    )
    timeLeftLabelControl.SetFont(
      IsInGamepadPreferredMode() ? "ZoFontGamepadBold27" : "ZoFontGameShadow"
    )
    timeLeftLabelControl.SetScale(0.8)
    timeLeftLabelControl.SetWrapMode(TEX_MODE_CLAMP)
    timeLeftLabelControl.SetText("")
    timeLeftLabelControl.ClearAnchors()
    timeLeftLabelControl.SetDimensions(iconTexture.GetWidth() - 8, 18)
    timeLeftLabelControl.SetAnchor(CENTER, iconTexture, CENTER, 0, 0)
    timeLeftLabelControl.SetHidden(true)
    timeLeftLabelControl.SetMouseEnabled(false)
    timeLeftLabelControl.SetDrawLevel(5)
    timeLeftLabelControl.SetDrawTier(DT_HIGH)
    timeLeftLabelControl.SetDrawLayer(DL_OVERLAY)
    timeLeftLabelControl.SetHorizontalAlignment(TEXT_ALIGN_CENTER)
    myUpdateFillBarAddition(selfButtonTimer, undefined)
  }
  return timeLeftLabelControl
}

export function installActionBarTimerHooks(this: void): undefined {
  SecurePostHook(
    ZO_ActionBarTimer,
    "SetupBackRowSlot",
    function (
      this: void,
      selfButtonTimer: ActionBarTimerSelf,
      slotId: number,
      barType: number
    ): undefined {
      const isValidBarType =
        barType === HOTBAR_CATEGORY_BACKUP || barType === HOTBAR_CATEGORY_PRIMARY
      if (!isValidBarType) {
        return
      }
      const settings = STATE.settingsVars.settings
      if (settings !== undefined && settings.repositionActionSlotTimers === true) {
        const isUltimateSlot = selfButtonTimer.GetSlot() === ACTION_BAR_ULTIMATE_SLOT_INDEX + 1
        const isGamePadMode = IsInGamepadPreferredMode()
        let offsetX = 0
        let offsetY: number
        if (isUltimateSlot === false) {
          offsetY = isGamePadMode
            ? GAMEPAD_CONSTANTS.backRowSlotOffsetY
            : KEYBOARD_CONSTANTS.backRowSlotOffsetY
        } else {
          offsetY = isGamePadMode
            ? GAMEPAD_CONSTANTS.backRowUltimateSlotOffsetY
            : KEYBOARD_CONSTANTS.backRowUltimateSlotOffsetY
        }

        const offsetSettings = settings.repositionActionSlotTimersOffset
        offsetX = offsetSettings.x
        offsetY = offsetY + offsetSettings.y

        const shown =
          isValidBarType &&
          GetSlotType(slotId, barType) !== ACTION_TYPE_NOTHING &&
          selfButtonTimer.active === true &&
          selfButtonTimer.showBackRowSlot === true
        if (shown === true) {
          const timerSlotControl = selfButtonTimer.slot
          const [, , target] = timerSlotControl.GetAnchor(0)
          if (target !== undefined) {
            ZO_ActionBarTimer.ApplyAnchor(selfButtonTimer, target, offsetY, offsetX)
          }
        }
      }
    }
  )

  SecurePostHook(
    ZO_ActionBarTimer,
    "ApplyAnchor",
    function (
      this: void,
      selfButtonTimer: ActionBarTimerSelf,
      target: Control,
      offsetY: number,
      offsetX: number
    ): undefined {
      const settings = STATE.settingsVars.settings
      if (settings === undefined || settings.repositionActionSlotTimers !== true) {
        return
      }
      const offsetSettings = settings.repositionActionSlotTimersOffset
      selfButtonTimer.slot.ClearAnchors()
      selfButtonTimer.slot.SetAnchor(CENTER, target, CENTER, offsetX, offsetY)
      selfButtonTimer.ApplySwapAnimationStyle(offsetY, offsetY - offsetSettings.y)
    }
  )

  ZO_PreHook(
    ZO_ActionBarTimer,
    "ApplySwapAnimationStyle",
    function (
      this: void,
      selfButtonTimerRaw: unknown,
      offsetYRaw: unknown,
      offsetYOrigRaw: unknown
    ): boolean {
      if (offsetYOrigRaw === undefined) {
        return false
      }
      const settings = STATE.settingsVars.settings
      if (settings === undefined || settings.repositionActionSlotTimers !== true) {
        return false
      }
      const offsetY = tonumber(offsetYRaw)
      if (!isActionBarTimerSelf(selfButtonTimerRaw) || offsetY === undefined) {
        return false
      }
      const selfButtonTimer = selfButtonTimerRaw

      const translateDownAnimation = selfButtonTimer.backBarSwapAnimation.GetAnimation(1)
      const frameSizeDownAnimation = selfButtonTimer.backBarSwapAnimation.GetAnimation(2)
      const iconSizeDownAnimation = selfButtonTimer.backBarSwapAnimation.GetAnimation(3)
      const translateUpAnimation = selfButtonTimer.backBarSwapAnimation.GetAnimation(4)
      const frameSizeUpAnimation = selfButtonTimer.backBarSwapAnimation.GetAnimation(5)
      const iconSizeUpAnimation = selfButtonTimer.backBarSwapAnimation.GetAnimation(6)

      translateDownAnimation.SetStartOffsetY(offsetY)
      translateDownAnimation.SetEndOffsetY(0)
      translateUpAnimation.SetStartOffsetY(0)
      translateUpAnimation.SetEndOffsetY(offsetY)

      const [width, slotHeight] = selfButtonTimer.slot.GetDimensions()
      frameSizeDownAnimation.SetStartAndEndWidth(width, width)
      frameSizeDownAnimation.SetStartAndEndHeight(slotHeight, 0)
      frameSizeUpAnimation.SetStartAndEndWidth(width, width)
      frameSizeUpAnimation.SetStartAndEndHeight(0, slotHeight)

      const [iconWidth, iconHeightRaw] = selfButtonTimer.iconTexture.GetDimensions()
      let iconHeight = iconHeightRaw
      if (iconHeight < iconWidth) {
        iconHeight = iconWidth
      }
      iconSizeDownAnimation.SetStartAndEndWidth(iconWidth, iconWidth)
      iconSizeDownAnimation.SetStartAndEndHeight(iconHeight, 0)
      iconSizeUpAnimation.SetStartAndEndWidth(iconWidth, iconWidth)
      iconSizeUpAnimation.SetStartAndEndHeight(0, iconHeight)

      return true
    }
  )

  const registerForUpdateClearStackLabelEventPrefix =
    "FCOCS_ActionButton_SetStackCount_ClearStackLabel_Slot"
  SecurePostHook(
    ActionButton,
    "SetStackCount",
    function (this: void, selfActionButton: ActionButtonSelf, stackCount: number): undefined {
      if (stackCount === 0) {
        return
      }
      const hotBarCategory = GetActiveHotbarCategory()
      const endTimeMS = selfActionButton.endTimeMS
      const slotNum = selfActionButton.GetSlot()
      const remainingEffectTimeMS = GetActionSlotEffectTimeRemaining(slotNum, hotBarCategory)
      const stackCountChecked = GetActionSlotEffectStackCount(slotNum, hotBarCategory)
      if (
        stackCountChecked <= 0 ||
        selfActionButton.showTimer !== true ||
        endTimeMS === undefined
      ) {
        return
      }

      const clearStackLabelNow = function (this: void): undefined {
        EM.UnregisterForUpdate(registerForUpdateClearStackLabelEventPrefix + slotNum)
        selfActionButton.stackCountText.SetHidden(true)
      }
      if (remainingEffectTimeMS <= 0) {
        clearStackLabelNow()
      } else {
        EM.UnregisterForUpdate(registerForUpdateClearStackLabelEventPrefix + slotNum)
        EM.RegisterForUpdate(
          registerForUpdateClearStackLabelEventPrefix + slotNum,
          remainingEffectTimeMS,
          clearStackLabelNow
        )
      }
    }
  )

  SecurePostHook(
    ZO_ActionBarTimer,
    "SetFillBar",
    function (this: void, selfActionBarTimer: ActionBarTimerSelf): undefined {
      const settings = STATE.settingsVars.settings
      if (settings === undefined || settings.showActionSlotTimersTimeLeftNumber !== true) {
        return
      }

      if (selfActionBarTimer.timeLeftLabelControl === undefined) {
        selfActionBarTimer.timeLeftLabelControl = createTimeLeftLabelControl(selfActionBarTimer)
      }
      if (!selfActionBarTimer.HasValidDuration()) {
        myUpdateFillBarAddition(selfActionBarTimer, false)
        return
      } else {
        myUpdateFillBarAddition(selfActionBarTimer, true)
        selfActionBarTimer.slot.SetHandler(
          "OnUpdate",
          function (this: void): undefined {
            myUpdateFillBarAddition(selfActionBarTimer, undefined)
          },
          FILL_BAR_UPDATE_HANDLER_ON_UPDATE_NAME,
          CONTROL_HANDLER_ORDER_AFTER,
          "FillBarUpdate"
        )
      }
    }
  )
}
