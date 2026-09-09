import {
  asEsoHandler,
  asLamFactory,
  asString,
} from "../addon-menu-casts/addon-menu-casts.module.code.ts"
import { WIDGET_VERSION } from "../addon-menu-constants/addon-menu-constants.module.code.ts"
import { LAMCC, registerWidget, wm } from "../addon-menu-state/addon-menu-state.module.code.ts"
import type { EditboxData, LamControl } from "../addon-menu-types/addon-menu-types.module.code.ts"
import {
  createLabelAndContainerControl,
  getDefaultValue,
  registerForRefreshIfNeeded,
  registerForReloadIfNeeded,
  requestRefreshIfNeeded,
  updateWarning,
} from "../addon-menu-util/addon-menu-util.module.code.ts"

const MIN_HEIGHT = 24

function getValidTextType(this: void, textType: EditboxData["textType"]): number {
  const resolved = getDefaultValue(textType)
  if (
    typeof resolved !== "number" ||
    resolved < TEXT_TYPE_ITERATION_BEGIN ||
    resolved > TEXT_TYPE_ITERATION_END
  ) {
    return TEXT_TYPE_ALL
  }
  return resolved
}

function createEditbox(
  this: void,
  parent: LamControl,
  editboxData: EditboxData,
  controlName?: string
): LamControl {
  const control = createLabelAndContainerControl(parent, editboxData, controlName)

  const container = control.container
  if (container === undefined) {
    return control
  }
  control.bg = wm.CreateControlFromVirtual<BackdropControl>("", container, "ZO_EditBackdrop")
  const bg = control.bg
  bg.SetAnchorFill()

  let editbox: EditControl
  if (editboxData.isMultiline === true) {
    editbox = wm.CreateControlFromVirtual("", bg, "ZO_DefaultEditMultiLineForBackdrop")
    control.editbox = editbox
    const multilineEditbox = editbox
    editbox.SetHandler("OnMouseWheel", (...args: unknown[]) => {
      const delta = typeof args[1] === "number" ? args[1] : 0
      if (multilineEditbox.HasFocus()) {
        const cursorPos = multilineEditbox.GetCursorPosition()
        const text = multilineEditbox.GetText()
        const textLen = string.len(text)
        let newPos: number | undefined
        if (delta > 0) {
          const reverseText = string.reverse(text)
          const revCursorPos = textLen - cursorPos
          const [revPos] = string.find(reverseText, "\n", revCursorPos + 1)
          newPos = revPos !== undefined ? textLen - revPos : undefined
        } else {
          const [found] = string.find(text, "\n", cursorPos + 1)
          newPos = found
        }
        if (newPos !== undefined) {
          multilineEditbox.SetCursorPosition(newPos)
        }
      }
    })
  } else {
    editbox = wm.CreateControlFromVirtual("", bg, "ZO_DefaultEditForBackdrop")
    control.editbox = editbox
  }
  editbox.SetTextType(getValidTextType(editboxData.textType))
  editbox.SetText(asString(editboxData.getFunc()))
  editbox.SetMaxInputChars(getDefaultValue(editboxData.maxChars) ?? 3000)
  editbox.SetHandler("OnFocusLost", () => {
    control.UpdateValue?.(false, editbox.GetText())
  })
  editbox.SetHandler("OnEscape", () => {
    editbox.LoseFocus()
    control.UpdateValue?.(false, editbox.GetText())
  })
  editbox.SetHandler("OnMouseEnter", () => {
    ZO_Options_OnMouseEnter(control)
  })
  editbox.SetHandler("OnMouseExit", asEsoHandler(ZO_Options_OnMouseExit))

  let minWidth = 0
  if (parent.GetWidth !== undefined) {
    minWidth = parent.GetWidth() / 10
  } else if (parent.panel?.GetWidth !== undefined) {
    minWidth = parent.panel.GetWidth() / 10
  }

  control.label?.ClearAnchors()
  container.ClearAnchors()

  control.label?.SetAnchor(TOPLEFT, control, TOPLEFT, 0, 0)
  container.SetAnchor(BOTTOMRIGHT, control, BOTTOMRIGHT, 0, 0)

  if (control.isHalfWidth === true) {
    container.SetAnchor(BOTTOMRIGHT, control, BOTTOMRIGHT, 0, 0)
  }

  if (editboxData.isExtraWide === true) {
    container.SetAnchor(BOTTOMLEFT, control, BOTTOMLEFT, 0, 0)
  } else {
    container.SetWidth(minWidth * 3.2)
  }

  if (editboxData.isMultiline === true) {
    container.SetHeight(MIN_HEIGHT * 3)
  } else {
    container.SetHeight(MIN_HEIGHT)
  }

  if (control.isHalfWidth !== true && editboxData.isExtraWide !== true) {
    control.SetHeight(container.GetHeight())
  } else {
    control.SetHeight(container.GetHeight() + (control.label?.GetHeight() ?? 0))
  }

  editbox.ClearAnchors()
  editbox.SetAnchor(TOPLEFT, container, TOPLEFT, 2, 2)
  editbox.SetAnchor(BOTTOMRIGHT, container, BOTTOMRIGHT, -2, -2)

  if (editboxData.warning !== undefined || editboxData.requiresReload === true) {
    control.warning = wm.CreateControlFromVirtual<TextureControl>(
      "",
      control,
      "ZO_Options_WarningIcon"
    )
    if (editboxData.isExtraWide === true) {
      control.warning.SetAnchor(BOTTOMRIGHT, control.bg, TOPRIGHT, 2, 0)
    } else {
      control.warning.SetAnchor(TOPRIGHT, control.bg, TOPLEFT, -5, 0)
    }
    control.UpdateWarning = function (this: LamControl): undefined {
      updateWarning(this)
    }
    control.UpdateWarning()
  }

  control.UpdateValue = function (
    this: LamControl,
    forceDefault?: boolean,
    ...args: unknown[]
  ): undefined {
    const value = args[0]
    if (forceDefault === true) {
      const defaultValue = getDefaultValue(editboxData.default)
      editboxData.setFunc(defaultValue)
      editbox.SetText(asString(defaultValue))
    } else if (value !== undefined && value !== false) {
      editboxData.setFunc(value)
      requestRefreshIfNeeded(control)
    } else {
      const current = editboxData.getFunc()
      editbox.SetText(asString(current))
    }
  }
  control.UpdateValue()
  if (editboxData.disabled !== undefined) {
    control.UpdateDisabled = function (this: LamControl): undefined {
      let disable: boolean | undefined
      if (typeof editboxData.disabled === "function") {
        disable = editboxData.disabled()
      } else {
        disable = editboxData.disabled
      }

      if (disable === true) {
        const [dr, dg, db, da] = ZO_DEFAULT_DISABLED_COLOR.UnpackRGBA()
        control.label?.SetColor(dr, dg, db, da)
        const [mr, mg, mb, ma] = ZO_DEFAULT_DISABLED_MOUSEOVER_COLOR.UnpackRGBA()
        editbox.SetColor(mr, mg, mb, ma)
      } else {
        const [er, eg, eb, ea] = ZO_DEFAULT_ENABLED_COLOR.UnpackRGBA()
        control.label?.SetColor(er, eg, eb, ea)
        editbox.SetColor(er, eg, eb, ea)
      }
      editbox.SetMouseEnabled(disable !== true)
    }
    control.UpdateDisabled()
  }

  registerForRefreshIfNeeded(control)
  registerForReloadIfNeeded(control)

  return control
}

if (registerWidget("editbox", WIDGET_VERSION.editbox)) {
  LAMCC.editbox = asLamFactory(createEditbox)
}
