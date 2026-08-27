import { asControl, asControlLike } from "./casts-1a"
import { asLsmCastIsDropdownVisibleThisUnknownBooleanHideDropdow3, asLsmCastIsDropdownVisibleThisUnknownBooleanM_dropdownO2 } from "./casts-2a"
import { asLsmCastRecordStringString, asLsmCastRecordStringStringUndefined2, asLsmCastRecordStringUnknown, asLsmCastRecordStringUnknownUndefined } from "./casts-2b"
import { asLsmCastThisVoidArgsUnknownUndefinedUndefined2, asLsmCastThisVoidAUnknownUndefined, asLsmCastThisVoidControlUnknownAlternativeControlUnknow } from "./casts-3a"
import { asLsmCastThisVoidDoSilenceBooleanEntryTypeUnknownUndefi, asLsmCastThisVoidDropdownRecordStringUnknownRecordStrin } from "./casts-3b"
import { asLsmCastThisVoidUndefined, asNumber, asString } from "./casts-4"

type LsmCastLocalTypeofGetTooltipAnchor = typeof getTooltipAnchor
function asLsmCastLocalTypeofGetTooltipAnchor(value: unknown): LsmCastLocalTypeofGetTooltipAnchor {
  return value as LsmCastLocalTypeofGetTooltipAnchor
}

import { constants, getValueOrCallback } from "./constants-core"
import { lib } from "./lib-state"

const libUtil = lib.Util

const libDebug = lib.Debug

const dlog = asLsmCastThisVoidArgsUnknownUndefinedUndefined2(libDebug.DebugLog)

const tos = tostring

const functionType = "function"
const userdataType = "userdata"
const stringType = "string"

const fontConstants = constants.fonts
const entryTypeConstants = asLsmCastRecordStringUnknown(constants.entryTypes)
const soundConstants = asLsmCastRecordStringUnknown(constants.sounds)

const getControlName = asLsmCastThisVoidControlUnknownAlternativeControlUnknow(
  libUtil.getControlName
)
const getOptionsForDropdown = asLsmCastThisVoidDropdownRecordStringUnknownRecordStrin(
  libUtil.getOptionsForDropdown
)

function resetCustomTooltipFuncVars(this: void): undefined {
  if (libDebug.doDebug === true && dlog !== undefined) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 36)
  }
  lib.lastCustomTooltipFunction = undefined
  lib.onHideCustomTooltipFunc = undefined
}

libUtil.hideTooltip = function (this: void, _control: unknown): undefined {
  if (libDebug.doDebug === true && dlog !== undefined) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 37, tos(lib.onHideCustomTooltipFunc))
  }
  if (lib.onHideCustomTooltipFunc) {
    asLsmCastThisVoidUndefined(lib.onHideCustomTooltipFunc)()
  } else {
    ZO_Tooltips_HideTextTooltip()
  }
  resetCustomTooltipFuncVars()
}

let getTooltipAnchor: (
  this: void,
  self: SelfWithSubmenu,
  control: ControlLike,
  tooltipText: unknown,
  hasSubmenu: unknown
) => LuaMultiReturn<[ControlLike, number, number, number, number]>
libUtil.getTooltipAnchor = function (
  this: void,
  self: SelfWithSubmenu,
  control: ControlLike,
  tooltipText: unknown,
  hasSubmenu: unknown
): LuaMultiReturn<[ControlLike, number, number, number, number]> {
  getTooltipAnchor = asLsmCastLocalTypeofGetTooltipAnchor(libUtil.getTooltipAnchor)
  let relativeTo: ControlLike = control
  if (libDebug.doDebug === true && dlog !== undefined) {
    dlog(
      libDebug.LSM_LOGTYPE_VERBOSE,
      38,
      tos(getControlName(control)),
      tos(tooltipText),
      tos(hasSubmenu)
    )
  }

  const submenu = asLsmCastRecordStringUnknownUndefined(self.GetSubmenu())
  if (hasSubmenu) {
    if (submenu) {
      const sm = asLsmCastIsDropdownVisibleThisUnknownBooleanM_dropdownO2(submenu)
      if (!sm.IsDropdownVisible()) {
        return getTooltipAnchor(self, control, tooltipText, hasSubmenu)
      }
      if (sm.m_dropdownObject) {
        relativeTo = asControlLike(asLsmCastRecordStringUnknown(sm.m_dropdownObject).control)
      }
    }
  } else {
    if (submenu) {
      const sm = asLsmCastIsDropdownVisibleThisUnknownBooleanHideDropdow3(submenu)
      if (sm.IsDropdownVisible()) {
        sm.HideDropdown()
      }
    }
  }

  let point = BOTTOMLEFT
  const offsetX = 0
  const offsetY = 0
  let relativePoint = TOPRIGHT

  const [, anchorPoint] = relativeTo.GetAnchor(0)
  let right = anchorPoint !== 3
  if (!right) {
    const [width] = GuiRoot.GetDimensions()
    const fontObject = _G[asString(fontConstants.DEFAULT_FONT)]
    const nameWidth =
      type(tooltipText) === stringType
        ? GetStringWidthScaled(fontObject, asString(tooltipText), 1, SPACE_INTERFACE)
        : 250

    if (control.GetRight() + asNumber(nameWidth) > width) {
      right = true
    }
  }

  if (right) {
    if (hasSubmenu) {
      point = BOTTOMRIGHT
      relativePoint = TOPRIGHT
    } else {
      point = RIGHT
      relativePoint = LEFT
    }
  } else {
    if (hasSubmenu) {
      point = BOTTOMLEFT
      relativePoint = TOPLEFT
    } else {
      point = LEFT
      relativePoint = RIGHT
    }
  }
  return $multi(relativeTo, point, offsetX, offsetY, relativePoint)
}
getTooltipAnchor = asLsmCastLocalTypeofGetTooltipAnchor(libUtil.getTooltipAnchor)

libUtil.showTooltip = function (
  this: void,
  self: SelfWithSubmenu,
  control: ControlLike,
  data: Record<string, unknown>,
  hasSubmenu: unknown
): undefined {
  resetCustomTooltipFuncVars()

  const tooltipData = getValueOrCallback(data.tooltip, data)
  const tooltipText = getValueOrCallback(tooltipData, data)
  let customTooltipFunc = data.customTooltip
  if (type(customTooltipFunc) !== functionType) {
    customTooltipFunc = undefined
  }

  if (libDebug.doDebug === true && dlog !== undefined) {
    dlog(
      libDebug.LSM_LOGTYPE_VERBOSE,
      39,
      tos(getControlName(control)),
      tos(tooltipText),
      tos(hasSubmenu),
      tos(customTooltipFunc)
    )
  }

  if (tooltipText === undefined && customTooltipFunc === undefined) {
    return
  }

  const [relativeTo, point, offsetX, offsetY, relativePoint] = getTooltipAnchor(
    self,
    control,
    tooltipText,
    hasSubmenu
  )

  if (
    type(relativeTo) === userdataType &&
    type(asLsmCastRecordStringUnknown(relativeTo).IsControlHidden) === functionType
  ) {
    if (customTooltipFunc !== undefined) {
      lib.lastCustomTooltipFunction = customTooltipFunc

      const onHideCustomTooltipFunc = function (this: void): undefined {
        asLsmCastThisVoidAUnknownUndefined(customTooltipFunc)(control, false, undefined)
      }
      lib.onHideCustomTooltipFunc = onHideCustomTooltipFunc
      asLsmCastThisVoidAUnknownUndefined(customTooltipFunc)(
        control,
        true,
        data,
        relativeTo,
        point,
        offsetX,
        offsetY,
        relativePoint
      )
    } else {
      InitializeTooltip(
        InformationTooltip,
        asControl(relativeTo),
        point,
        offsetX,
        offsetY,
        relativePoint
      )
      SetTooltipText(InformationTooltip, asString(tooltipText))
      InformationTooltipTopLevel.BringWindowToTop()
    }
  }
}

libUtil.silenceEntryClickedSound = function (
  this: void,
  doSilence: boolean,
  entryType: unknown
): undefined {
  if (libDebug.doDebug === true && dlog !== undefined) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 20, tos(doSilence), tos(entryType))
  }
  const soundNameForSilence = asLsmCastRecordStringString(
    soundConstants.entryTypeToSilenceSoundName
  )[asString(entryType)]
  if (soundNameForSilence === undefined) {
    return
  }
  const SOUNDS_MUT = asLsmCastRecordStringStringUndefined2(SOUNDS)
  if (doSilence === true) {
    SOUNDS_MUT[soundNameForSilence] = asString(soundConstants.soundClickedSilenced)
  } else {
    const origSound = asLsmCastRecordStringString(soundConstants.entryTypeToOriginalSelectedSound)[
      asString(entryType)
    ]
    SOUNDS_MUT[soundNameForSilence] = origSound
  }
}
const silenceEntryClickedSound = asLsmCastThisVoidDoSilenceBooleanEntryTypeUnknownUndefi(
  libUtil.silenceEntryClickedSound
)

libUtil.playSelectedSoundCheck = function (
  this: void,
  dropdown: Record<string, unknown>,
  entryType: unknown
): undefined {
  entryType = entryType ?? entryTypeConstants.LSM_ENTRY_TYPE_NORMAL
  if (libDebug.doDebug === true && dlog !== undefined) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 22, tos(entryType))
  }

  silenceEntryClickedSound(false, entryType)

  let soundToPlay: unknown
  const soundToPlayOrig = asLsmCastRecordStringString(
    soundConstants.entryTypeToOriginalSelectedSound
  )[asString(entryType)]
  const options = getOptionsForDropdown(dropdown)

  if (options !== undefined) {
    if (getValueOrCallback(options.selectedSoundDisabled, options) === true) {
      silenceEntryClickedSound(true, entryType)
      return
    } else {
      soundToPlay = getValueOrCallback(options.selectedSound, options)
      if (soundToPlay === undefined) {
        soundToPlay = soundToPlayOrig
      }
    }
  } else {
    soundToPlay = soundToPlayOrig
  }
  PlaySound(asString(soundToPlay))
}
