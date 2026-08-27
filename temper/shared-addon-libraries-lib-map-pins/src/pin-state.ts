import { asControl, asNumber } from "./casts"
import { LIBMAPPINS_GLOBAL_MAPGROUP } from "./constants"
import { getCurrentGamepadMapFilterPanel, getCurrentMapFilterGroup, getPinTypeId } from "./helpers"
import { refreshPins } from "./pin-types"
import type { Lib } from "./types"

export function isEnabled(lib: Lib, pinType: number | string): boolean | undefined {
  const pinTypeId = getPinTypeId(pinType)
  if (pinTypeId !== undefined) {
    return lib.pinManager.IsCustomPinEnabled(pinTypeId)
  }
  return undefined
}

export function setEnabled(lib: Lib, pinType: number | string, state: unknown): undefined {
  const [mapGroup] = getCurrentMapFilterGroup()
  if (mapGroup === LIBMAPPINS_GLOBAL_MAPGROUP) {
    return
  }

  const pinTypeId = getPinTypeId(pinType)
  if (pinTypeId === undefined) {
    return
  }

  let enabled: boolean
  if (type(state) === "number") {
    enabled = asNumber(state) !== 0
  } else {
    enabled = state != null && state !== false
  }

  const filter = lib.filters[pinTypeId]
  if (filter) {
    const targetCheckbox = mapGroup !== undefined ? filter[mapGroup] : undefined
    if (targetCheckbox != null) {
      ZO_CheckButton_SetCheckState(asControl(targetCheckbox), enabled)
    }

    const currentPanel = getCurrentGamepadMapFilterPanel()
    if (!currentPanel || !currentPanel.list) {
      return
    }
    currentPanel.SetPinFilter(pinTypeId, enabled)
  }

  const needsRefresh = lib.pinManager.IsCustomPinEnabled(pinTypeId) !== enabled
  lib.pinManager.SetCustomPinEnabled(pinTypeId, enabled)

  if (needsRefresh) {
    refreshPins(lib, pinType)
  }
}

export function enablePin(lib: Lib, pinType: number | string): undefined {
  setEnabled(lib, pinType, true)
}

export function disablePin(lib: Lib, pinType: number | string): undefined {
  setEnabled(lib, pinType, false)
}
