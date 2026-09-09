import {
  asAnimationManagerLike,
  asControl,
  asControlLike,
} from "../scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import {
  asLsmCastGetAnimationThisUnknownIdxNumberSetAlphaValues,
  asLsmCastGetHighlightTemplateThisUnknownControlUnknownU,
  asLsmCastGetOwningWindowThisUnknownRecordStringUnknownU,
} from "../scrollable-menu-casts-1b/scrollable-menu-casts-1b.module.code.ts"
import {
  asLsmCastPlayBackwardThisUnknownUndefined,
  asLsmCastPlayForwardThisUnknownUndefined,
  asLsmCastPlayInstantlyToEndThisUnknownUndefined,
  asLsmCastPlayInstantlyToStartThisUnknownUndefined,
  asLsmCastRecordStringUnknown,
  asLsmCastRecordStringUnknownUndefined,
} from "../scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import {
  asLsmCastStringUndefined,
  asLsmCastThisVoidArgsUnknownUndefinedUndefined2,
} from "../scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import { asLsmCastThisVoidControlUnknownRecordStringUnknown } from "../scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"
import {
  asLsmCastThisVoidSelfVarRecordStringUnknownInstantlyUnk,
  asNumber,
  asString,
} from "../scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

type LsmCastLocalTypeofGetComboBox = typeof getComboBox
function asLsmCastLocalTypeofGetComboBox(value: unknown): LsmCastLocalTypeofGetComboBox {
  return value as LsmCastLocalTypeofGetComboBox
}

import { constants } from "../scrollable-menu-constants-core/scrollable-menu-constants-core.module.code.ts"
import { lib } from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

const libUtil = lib.Util

const libDebug = lib.Debug

const dlog = asLsmCastThisVoidArgsUnknownUndefinedUndefined2(libDebug.DebugLog)

const AM = asAnimationManagerLike(GetAnimationManager())
const tos = tostring
const sfor = string.format

const STRING_TYPE = "string"

const entryTypeConstants = asLsmCastRecordStringUnknown(constants.entryTypes)
const defaultHighlightData = asLsmCastRecordStringUnknown(
  asLsmCastRecordStringUnknown(entryTypeConstants.defaults).highlights
)

let getComboBox: (this: void, control: unknown, owningMenu?: unknown) => unknown

const getControlData = asLsmCastThisVoidControlUnknownRecordStringUnknown(libUtil.getControlData)

libUtil.getComboBox = function (this: void, control: unknown, owningMenu?: unknown): unknown {
  getComboBox = asLsmCastLocalTypeofGetComboBox(libUtil.getComboBox)
  if (control) {
    const ctrl = asLsmCastRecordStringUnknown(control)
    if (owningMenu) {
      if (ctrl.m_comboBox) {
        return ctrl.m_comboBox
      }
    } else {
      if (ctrl.m_owner) {
        return ctrl.m_owner
      } else if (ctrl.m_comboBox) {
        return ctrl.m_comboBox
      }
    }
  }

  if (type(control) === "userdata") {
    const owningWindow =
      asLsmCastGetOwningWindowThisUnknownRecordStringUnknownU(control).GetOwningWindow()
    if (owningWindow) {
      const ow = asLsmCastRecordStringUnknown(owningWindow)
      if (ow.object && ow.object !== control) {
        return getComboBox(ow.object, owningMenu)
      }
    }
  }
  return undefined
}
getComboBox = asLsmCastLocalTypeofGetComboBox(libUtil.getComboBox)

libUtil.getComboBoxsSortedItems = function (
  this: void,
  comboBox: Record<string, unknown> | undefined,
  fromOpeningControl: boolean | undefined,
  onlyOpeningControl: boolean | undefined
): unknown {
  fromOpeningControl = fromOpeningControl ?? false
  onlyOpeningControl = onlyOpeningControl ?? false
  let sortedItems: unknown

  if (comboBox !== undefined) {
    if (fromOpeningControl === true) {
      const openingControl = asLsmCastRecordStringUnknownUndefined(comboBox.openingControl)
      if (openingControl !== undefined) {
        const owner = asLsmCastRecordStringUnknownUndefined(openingControl.m_owner)
        sortedItems = owner?.m_sortedItems || undefined
      }
      if (onlyOpeningControl) {
        return sortedItems
      }
    }
    return sortedItems ?? comboBox.m_sortedItems
  }
  return sortedItems
}
lib.getComboBoxsSortedItems = libUtil.getComboBoxsSortedItems

function subOrContextMenuPlayAnimationOnControl(
  this: void,
  control: Record<string, unknown> | undefined,
  controlTemplate: unknown,
  animationFieldName: string | undefined,
  animateInstantly: unknown,
  overrideEndAlpha: number | undefined
): undefined {
  if (control && controlTemplate && animationFieldName !== undefined && animationFieldName !== "") {
    const ctrl = asLsmCastRecordStringUnknown(control)
    let animationCtrl = asLsmCastRecordStringUnknownUndefined(ctrl[asString(animationFieldName)])
    if (!animationCtrl) {
      const highlight = asControlLike(
        CreateControlFromVirtual(
          "$(parent)Scroll",
          asControl(control),
          asString(controlTemplate),
          asString(animationFieldName)
        )
      )
      animationCtrl = asLsmCastRecordStringUnknown(
        AM.CreateTimelineFromVirtual("ShowOnMouseOverLabelAnimation", highlight)
      )

      const width = highlight.GetWidth()
      highlight.SetFadeGradient(1, width / 3, 0, width)

      if (overrideEndAlpha != null) {
        asLsmCastGetAnimationThisUnknownIdxNumberSetAlphaValues(animationCtrl)
          .GetAnimation(1)
          .SetAlphaValues(0, asNumber(overrideEndAlpha))
      }

      ctrl[asString(animationFieldName)] = animationCtrl
    }

    if (animateInstantly) {
      asLsmCastPlayInstantlyToEndThisUnknownUndefined(animationCtrl).PlayInstantlyToEnd()
    } else {
      asLsmCastPlayForwardThisUnknownUndefined(animationCtrl).PlayForward()
    }
  }
}

function removeAnimationOnControl(
  this: void,
  control: Record<string, unknown> | undefined,
  animationFieldName: string | undefined,
  animateInstantly: unknown
): undefined {
  if (control !== undefined) {
    if (animationFieldName !== undefined) {
      const animationControl = asLsmCastRecordStringUnknownUndefined(control[animationFieldName])
      if (animationControl) {
        if (animateInstantly) {
          asLsmCastPlayInstantlyToStartThisUnknownUndefined(animationControl).PlayInstantlyToStart()
        } else {
          asLsmCastPlayBackwardThisUnknownUndefined(animationControl).PlayBackward()
        }
      }
    }
    control.breadcrumbName = undefined
  }
}

libUtil.unhighlightControl = function (
  this: void,
  selfVar: Record<string, unknown>,
  instantly: unknown,
  control: Record<string, unknown> | undefined,
  resetHighlightTemplate: unknown
): undefined {
  const highlightControl = asLsmCastRecordStringUnknownUndefined(selfVar.highlightedControl)
  if (highlightControl) {
    removeAnimationOnControl(
      highlightControl,
      asLsmCastStringUndefined(asLsmCastRecordStringUnknown(highlightControl).breadcrumbName),
      instantly
    )
  }
  selfVar.highlightedControl = undefined

  if (control !== undefined && resetHighlightTemplate === true) {
    if (control.m_highlightTemplate) {
      control.m_highlightTemplate = undefined
    }

    const data = getControlData(control)
    if (data) {
      if (data.m_highlightTemplate) {
        data.m_highlightTemplate = undefined
      }
    }
  }
}
const unhighlightControl = asLsmCastThisVoidSelfVarRecordStringUnknownInstantlyUnk(
  libUtil.unhighlightControl
)

libUtil.SubOrContextMenu_highlightControl = function (
  this: void,
  selfVar: Record<string, unknown>,
  control: Record<string, unknown>
): unknown {
  if (selfVar.highlightedControl) {
    unhighlightControl(selfVar, false, undefined, undefined)
  }

  const highlightTemplate =
    asLsmCastGetHighlightTemplateThisUnknownControlUnknownU(selfVar).GetHighlightTemplate(control)

  if (libDebug.doDebug === true && dlog !== undefined) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 1, tos(highlightTemplate))
  }
  if (type(highlightTemplate) !== STRING_TYPE) {
    return asLsmCastRecordStringUnknown(defaultHighlightData).defaultHighlightTemplate
  }

  control.breadcrumbName = sfor(
    asString(
      asLsmCastRecordStringUnknown(defaultHighlightData)
        .subAndContextMenuHighlightAnimationBreadcrumbsPattern
    ),
    asString(asLsmCastRecordStringUnknown(defaultHighlightData).defaultHighLightAnimationFieldName),
    tos(selfVar.breadcrumbName)
  )
  subOrContextMenuPlayAnimationOnControl(
    control,
    highlightTemplate,
    asString(control.breadcrumbName),
    false,
    0.5
  )
  selfVar.highlightedControl = control
  return undefined
}

libUtil.getScreensMaxDropdownHeight = function (this: void): number {
  return GuiRoot.GetHeight() - 100
}
