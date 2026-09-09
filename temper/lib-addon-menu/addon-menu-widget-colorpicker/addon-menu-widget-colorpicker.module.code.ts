import { asControl, asLamFactory } from "../addon-menu-casts/addon-menu-casts.module.code.ts"
import { WIDGET_VERSION } from "../addon-menu-constants/addon-menu-constants.module.code.ts"
import { LAMCC, lam, registerWidget, wm } from "../addon-menu-state/addon-menu-state.module.code.ts"
import type {
  ColorpickerData,
  LamControl,
  UpdateValueFn,
} from "../addon-menu-types/addon-menu-types.module.code.ts"
import {
  getDefaultValue,
  getStringFromValue,
  registerForRefreshIfNeeded,
  registerForReloadIfNeeded,
  requestRefreshIfNeeded,
  updateWarning,
} from "../addon-menu-util/addon-menu-util.module.code.ts"

interface ColorTable {
  r: number
  g: number
  b: number
  a?: number
}

function toNumber(this: void, value: unknown): number | undefined {
  return typeof value === "number" ? value : undefined
}

function isRecord(this: void, value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function readColorTable(this: void, value: unknown): ColorTable {
  if (isRecord(value)) {
    return {
      r: toNumber(value.r) ?? 0,
      g: toNumber(value.g) ?? 0,
      b: toNumber(value.b) ?? 0,
      a: toNumber(value.a),
    }
  }
  return { r: 0, g: 0, b: 0, a: undefined }
}

function updateDisabled(this: LamControl): undefined {
  let disable: boolean | undefined
  if (typeof this.data.disabled === "function") {
    disable = this.data.disabled()
  } else {
    disable = this.data.disabled
  }

  if (disable) {
    const [r, g, b, a] = ZO_DEFAULT_DISABLED_COLOR.UnpackRGBA()
    this.label?.SetColor(r, g, b, a)
  } else {
    const [r, g, b, a] = ZO_DEFAULT_ENABLED_COLOR.UnpackRGBA()
    this.label?.SetColor(r, g, b, a)
  }

  this.isDisabled = disable
}

function makeUpdateValue(this: void, colorpickerData: ColorpickerData): UpdateValueFn {
  return function updateValue(
    this: LamControl,
    forceDefault?: boolean,
    rawR?: unknown,
    rawG?: unknown,
    rawB?: unknown,
    rawA?: unknown
  ): undefined {
    let valueR = toNumber(rawR)
    let valueG = toNumber(rawG)
    let valueB = toNumber(rawB)
    let valueA = toNumber(rawA)
    if (forceDefault) {
      const color = readColorTable(getDefaultValue(colorpickerData.default))
      valueR = color.r
      valueG = color.g
      valueB = color.b
      valueA = color.a
      colorpickerData.setFunc(valueR, valueG, valueB, valueA)
    } else if (valueR !== undefined && valueG !== undefined && valueB !== undefined) {
      colorpickerData.setFunc(valueR, valueG, valueB, valueA ?? 1)
      requestRefreshIfNeeded(this)
    } else {
      ;[valueR, valueG, valueB, valueA] = colorpickerData.getFunc()
    }

    this.thumb?.SetColor(valueR, valueG, valueB, valueA ?? 1)
  }
}

function createColorpicker(
  this: void,
  parent: LamControl,
  colorpickerData: ColorpickerData,
  controlName?: string
): LamControl {
  const control = lam.util.CreateLabelAndContainerControl(parent, colorpickerData, controlName)

  control.color = control.container
  const color = control.color

  const thumb = wm.CreateControl(undefined, color, CT_TEXTURE)
  control.thumb = thumb
  thumb.SetDimensions(36, 18)
  thumb.SetAnchor(LEFT, color, LEFT, 4, 0)

  const border = wm.CreateControl(undefined, color, CT_TEXTURE)
  border.SetTexture("EsoUI\\Art\\ChatWindow\\chatOptions_bgColSwatch_frame.dds")
  border.SetTextureCoords(0, 0.625, 0, 0.8125)
  border.SetDimensions(40, 22)
  border.SetAnchor(CENTER, thumb, CENTER, 0, 0)

  function colorPickerCallback(this: void, r: number, g: number, b: number, a: number): undefined {
    control.UpdateValue?.(false, r, g, b, a)
  }

  control.SetHandler("OnMouseUp", (...args: unknown[]): undefined => {
    const upInside = args[2] === true
    if (control.isDisabled) {
      return
    }

    if (upInside) {
      const [r, g, b, a] = colorpickerData.getFunc()
      if (IsInGamepadPreferredMode()) {
        COLOR_PICKER_GAMEPAD.Show(colorPickerCallback, r, g, b, a)
      } else {
        COLOR_PICKER.Show(colorPickerCallback, r, g, b, a)
      }
    }
  })

  if (colorpickerData.warning !== undefined || colorpickerData.requiresReload) {
    control.warning = wm.CreateControlFromVirtual<TextureControl>(
      undefined,
      asControl(control),
      "ZO_Options_WarningIcon"
    )
    control.warning.SetAnchor(RIGHT, control.color, LEFT, -5, 0)
    control.UpdateWarning = function (this: LamControl): undefined {
      updateWarning(this)
    }
    control.UpdateWarning()
  }

  control.data.tooltipText = getStringFromValue(colorpickerData.tooltip ?? "")

  control.UpdateValue = makeUpdateValue(colorpickerData)
  control.UpdateValue()
  if (colorpickerData.disabled !== undefined) {
    control.UpdateDisabled = updateDisabled
    control.UpdateDisabled()
  }

  registerForRefreshIfNeeded(control)
  registerForReloadIfNeeded(control)

  return control
}

if (registerWidget("colorpicker", WIDGET_VERSION.colorpicker)) {
  LAMCC.colorpicker = asLamFactory(createColorpicker)
}
