import {
  asControl,
  asControlLike,
} from "../scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import {
  asLsmCastIsDropdownVisibleThisUnknownBooleanHideDropdow3,
  asLsmCastIsDropdownVisibleThisUnknownBooleanMDropdownO2,
} from "../scrollable-menu-casts-2a/scrollable-menu-casts-2a.module.code.ts"
import {
  asLsmCastRecordStringString,
  asLsmCastRecordStringStringUndefined2,
  asLsmCastRecordStringUnknown,
  asLsmCastRecordStringUnknownUndefined,
} from "../scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import {
  asLsmCastThisVoidArgsUnknownUndefinedUndefined2,
  asLsmCastThisVoidAUnknownUndefined,
  asLsmCastThisVoidControlUnknownAlternativeControlUnknow,
} from "../scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import {
  asLsmCastThisVoidDoSilenceBooleanEntryTypeUnknownUndefi,
  asLsmCastThisVoidDropdownRecordStringUnknownRecordStrin,
} from "../scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"
import {
  asLsmCastThisVoidUndefined,
  asNumber,
  asString,
} from "../scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

type LsmCastLocalTypeofGetTooltipAnchor = typeof getTooltipAnchor
function asLsmCastLocalTypeofGetTooltipAnchor(value: unknown): LsmCastLocalTypeofGetTooltipAnchor {
  return value as LsmCastLocalTypeofGetTooltipAnchor
}

import {
  constants,
  getValueOrCallback,
} from "../scrollable-menu-constants-core/scrollable-menu-constants-core.module.code.ts"
import { lib } from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

const libUtil = lib.Util

const libDebug = lib.Debug

const dlog = asLsmCastThisVoidArgsUnknownUndefinedUndefined2(libDebug.DebugLog)

const tos = tostring

const FUNCTION_TYPE = "function"
const USERDATA_TYPE = "userdata"
const STRING_TYPE = "string"

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
      const sm = asLsmCastIsDropdownVisibleThisUnknownBooleanMDropdownO2(submenu)
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
      type(tooltipText) === STRING_TYPE
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
  if (type(customTooltipFunc) !== FUNCTION_TYPE) {
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
    type(relativeTo) === USERDATA_TYPE &&
    type(asLsmCastRecordStringUnknown(relativeTo).IsControlHidden) === FUNCTION_TYPE
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
  const soundsMut = asLsmCastRecordStringStringUndefined2(SOUNDS)
  if (doSilence === true) {
    soundsMut[soundNameForSilence] = asString(soundConstants.soundClickedSilenced)
  } else {
    const origSound = asLsmCastRecordStringString(soundConstants.entryTypeToOriginalSelectedSound)[
      asString(entryType)
    ]
    soundsMut[soundNameForSilence] = origSound
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
