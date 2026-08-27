import { asLamFactory } from "../casts"
import { WIDGET_VERSION } from "../constants"
import { lamcc, registerWidget } from "../state"
import type { CustomData, LamControl } from "../types"
import { createBaseControl, getDefaultValue, registerForRefreshIfNeeded } from "../util"

const MIN_HEIGHT = 26

function createCustom(
  this: void,
  parent: LamControl,
  customData: CustomData,
  controlName?: string
): LamControl {
  const control = createBaseControl(parent, customData, controlName)
  const width = control.GetWidth()
  control.SetResizeToFitDescendents(true)

  const minHeight =
    customData.minHeight !== undefined ? getDefaultValue(customData.minHeight) : MIN_HEIGHT
  const maxHeight =
    customData.maxHeight !== undefined ? getDefaultValue(customData.maxHeight) : minHeight * 4

  if (control.isHalfWidth) {
    control.SetDimensionConstraints(width / 2, minHeight, width / 2, maxHeight)
    control.SetResizeToFitConstrains(ANCHOR_CONSTRAINS_Y)
  } else {
    control.SetDimensionConstraints(width, minHeight, width, maxHeight)
    control.SetResizeToFitConstrains(ANCHOR_CONSTRAINS_Y)
  }

  control.UpdateValue = (): undefined => {
    const refreshFunc = customData.refreshFunc
    if (refreshFunc !== undefined) {
      refreshFunc(control)
    }
  }

  registerForRefreshIfNeeded(control)

  if (customData.createFunc !== undefined) {
    customData.createFunc(control)
  }
  return control
}

if (registerWidget("custom", WIDGET_VERSION.custom)) {
  lamcc.custom = asLamFactory(createCustom)
}
