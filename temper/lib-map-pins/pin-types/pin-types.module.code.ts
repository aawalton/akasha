import type { GlobalTable } from "../map-pins-casts/map-pins-casts.module.code.ts"
import {
  asColorTuple,
  asFilterTooltipFn,
  asLmpMapPin,
  asOptionalObject,
  asPinTypeId,
} from "../map-pins-casts/map-pins-casts.module.code.ts"
import {
  DEFAULT_ADD_PIN_LEVEL,
  DEFAULT_PIN_TEXTURE,
  DEFAULT_SET_LAYOUT_LEVEL,
} from "../map-pins-constants/map-pins-constants.module.code.ts"
import {
  getPinTypeId,
  getPinTypeIdAndString,
} from "../map-pins-helpers/map-pins-helpers.module.code.ts"
import type {
  ClickHandler,
  Lib,
  LmpPinManager,
} from "../map-pins-types/map-pins-types.module.code.ts"

export function addPinType(
  lib: Lib,
  pinTypeString: string,
  pinTypeAddCallback: (this: void, pinManager: LmpPinManager) => void,
  pinTypeOnResizeCallback:
    | ((this: void, pinManager: LmpPinManager, mapWidth: number, mapHeight: number) => void)
    | undefined,
  pinLayoutData: Record<string, unknown> | undefined,
  pinTooltipCreator: unknown,
  filterTooltipCreator: unknown
): number | undefined {
  if (type(pinTypeString) !== "string") {
    error("Parameter pinTypeString is not a string.")
  }
  if ((globalThis as GlobalTable)[pinTypeString] != null) {
    error(`Parameter pinTypeString: ${pinTypeString} already exists.`)
  }
  if (type(pinTypeAddCallback) !== "function") {
    error("Parameter pinTypeAddCallback is not a function.")
  }

  let layout: Record<string, unknown>
  if (pinLayoutData == null) {
    layout = { level: DEFAULT_ADD_PIN_LEVEL, texture: DEFAULT_PIN_TEXTURE }
  } else {
    layout = pinLayoutData
  }

  let tooltipCreator: unknown = pinTooltipCreator
  const tooltipType = type(pinTooltipCreator)
  if (tooltipType === "string") {
    const text = pinTooltipCreator as string
    tooltipCreator = {
      creator: (_pin: unknown): undefined => {
        if (IsInGamepadPreferredMode()) {
          const gamepadTooltip = ZO_MapLocationTooltip_Gamepad
          const baseSection = gamepadTooltip.tooltip
          gamepadTooltip.LayoutIconStringLine(
            baseSection,
            undefined,
            text,
            baseSection.GetStyle("mapLocationTooltipContentName")
          )
        } else {
          SetTooltipText(InformationTooltip, text)
        }
      },
      tooltip: ZO_MAP_TOOLTIP_MODE.INFORMATION,
    }
  } else if (tooltipType === "table") {
    const tbl = pinTooltipCreator as Record<string, unknown>
    if (type(tbl.tooltip) !== "number") {
      tbl.tooltip = ZO_MAP_TOOLTIP_MODE.INFORMATION
    }
  } else if (pinTooltipCreator !== undefined) {
    return undefined
  }

  if (type(layout.color) === "table") {
    const tint = layout.tint
    if (tint == null || (tint as Record<string, unknown>).UnpackRGBA == null) {
      layout.tint = ZO_ColorDef.New(...asColorTuple(layout.color))
    }
  }

  lib.pinManager.AddCustomPin(
    pinTypeString,
    pinTypeAddCallback,
    pinTypeOnResizeCallback,
    layout,
    asOptionalObject(tooltipCreator)
  )
  const pinTypeId = asPinTypeId((globalThis as GlobalTable)[pinTypeString])
  if (pinTypeId === undefined) {
    return undefined
  }
  lib.pinManager.SetCustomPinEnabled(pinTypeId, true)
  lib.pinManager.RefreshCustomPins(pinTypeId)

  if (filterTooltipCreator !== undefined) {
    const pinData = lib.pinManager.customPins[pinTypeId]
    if (pinData) {
      if (type(filterTooltipCreator) === "function") {
        pinData.filterTooltipCreator = asFilterTooltipFn(filterTooltipCreator)
      } else if (type(filterTooltipCreator) === "string") {
        const text = filterTooltipCreator as string
        pinData.filterTooltipCreator = (): string => text
      }
    }
  }

  return pinTypeId
}

export function createPin(
  lib: Lib,
  pinType: number | string,
  pinTag: unknown,
  locX: number,
  locY: number,
  areaRadius?: number
): undefined {
  if (pinTag == null || type(locX) !== "number" || type(locY) !== "number") {
    return
  }

  const pinTypeId = getPinTypeId(pinType)
  if (pinTypeId !== undefined) {
    const pinData = lib.pinManager.customPins[pinTypeId]
    if (pinData) {
      const isEnabled = isEnabledById(lib, pinTypeId)
      if (isEnabled) {
        lib.pinManager.CreatePin(pinTypeId, pinTag, locX, locY, areaRadius)
      }
    }
  }
}

function isEnabledById(lib: Lib, pinTypeId: number): boolean | undefined {
  return lib.pinManager.IsCustomPinEnabled(pinTypeId)
}

export function getLayoutData(pinType: number | string): Record<string, unknown> | undefined {
  const pinTypeId = getPinTypeId(pinType)
  if (pinTypeId !== undefined) {
    return asLmpMapPin(ZO_MapPin).PIN_DATA[pinTypeId]
  }
  return undefined
}

export function getLayoutKey(pinType: number | string, key: string): unknown {
  if (type(key) !== "string") {
    return undefined
  }

  const pinTypeId = getPinTypeId(pinType)
  const pinData = pinTypeId !== undefined ? asLmpMapPin(ZO_MapPin).PIN_DATA[pinTypeId] : undefined
  if (pinTypeId !== undefined && pinData) {
    return pinData[key]
  }
  return undefined
}

export function setLayoutData(
  pinType: number | string,
  pinLayoutData: Record<string, unknown>
): undefined {
  if (type(pinLayoutData) !== "table") {
    return
  }

  const pinTypeId = getPinTypeId(pinType)
  if (pinTypeId !== undefined) {
    pinLayoutData.level = pinLayoutData.level ?? DEFAULT_SET_LAYOUT_LEVEL
    pinLayoutData.texture = pinLayoutData.texture ?? DEFAULT_PIN_TEXTURE

    const pinData = asLmpMapPin(ZO_MapPin)
    pinData.PIN_DATA[pinTypeId] = {}
    const target = pinData.PIN_DATA[pinTypeId] as Record<string, unknown>
    for (const [k, v] of pairs(pinLayoutData)) {
      target[k as string] = v
    }
  }
}

export function setLayoutKey(pinType: number | string, key: string, data: unknown): undefined {
  if (type(key) !== "string") {
    return
  }

  const pinTypeId = getPinTypeId(pinType)
  if (pinTypeId !== undefined) {
    const entry = asLmpMapPin(ZO_MapPin).PIN_DATA[pinTypeId] as Record<string, unknown>
    entry[key] = data
  }
}

export function setFilterTooltipCreator(
  lib: Lib,
  pinType: number | string,
  filterTooltipCreator: unknown
): undefined {
  if (!filterTooltipCreator) {
    return
  }
  let filterFunction: ((this: void) => string) | undefined
  if (type(filterTooltipCreator) === "function") {
    filterFunction = asFilterTooltipFn(filterTooltipCreator)
  } else if (type(filterTooltipCreator) === "string") {
    const text = filterTooltipCreator as string
    filterFunction = (): string => text
  }

  const pinTypeId = getPinTypeId(pinType)
  if (pinTypeId !== undefined) {
    const pinData = lib.pinManager.customPins[pinTypeId]
    if (pinData) {
      pinData.filterTooltipCreator = filterFunction
    }
  }
}

export function setClickHandlers(
  pinType: number | string,
  lmbHandler: ClickHandler | undefined,
  rmbHandler: ClickHandler | undefined
): undefined {
  const pinTypeId = getPinTypeId(pinType)
  if (lmbHandler && !lmbHandler.gamepadName) {
    lmbHandler.gamepadName = lmbHandler.name
  }
  if (rmbHandler && !rmbHandler.gamepadName) {
    rmbHandler.gamepadName = rmbHandler.name
  }
  if (pinTypeId !== undefined) {
    const mapPin = asLmpMapPin(ZO_MapPin)
    const leftHandlers = mapPin.PIN_CLICK_HANDLERS[MOUSE_BUTTON_INDEX_LEFT]
    if (leftHandlers !== undefined && (type(lmbHandler) === "table" || lmbHandler == null)) {
      leftHandlers[pinTypeId] = lmbHandler
    }
    const rightHandlers = mapPin.PIN_CLICK_HANDLERS[MOUSE_BUTTON_INDEX_RIGHT]
    if (rightHandlers !== undefined && (type(rmbHandler) === "table" || rmbHandler == null)) {
      rightHandlers[pinTypeId] = rmbHandler
    }
  }
}

export function refreshPins(lib: Lib, pinType?: number | string): undefined {
  const pinTypeId = pinType === undefined ? undefined : getPinTypeId(pinType)
  lib.pinManager.RefreshCustomPins(pinTypeId)
}

export function removeCustomPin(lib: Lib, pinType: number | string, pinTag?: unknown): undefined {
  const [pinTypeId, pinTypeString] = getPinTypeIdAndString(lib, pinType)
  if (pinTypeId !== undefined && pinTypeString !== undefined) {
    lib.pinManager.RemovePins(pinTypeString, pinTypeId, pinTag)
  }
}

export function findCustomPin(lib: Lib, pinType: number | string, pinTag: unknown): unknown {
  if (pinTag == null) {
    return undefined
  }

  const [pinTypeId, pinTypeString] = getPinTypeIdAndString(lib, pinType)
  if (pinTypeId !== undefined && pinTypeString !== undefined) {
    return lib.pinManager.FindPin(pinTypeString, pinTypeId, pinTag)
  }
  return undefined
}

export function setAddCallback(
  lib: Lib,
  pinType: number | string,
  pinTypeAddCallback: (this: void, pinManager: LmpPinManager) => void
): undefined {
  if (type(pinTypeAddCallback) !== "function") {
    return
  }

  const pinTypeId = getPinTypeId(pinType)
  if (pinTypeId !== undefined) {
    const pinData = lib.pinManager.customPins[pinTypeId]
    if (pinData) {
      pinData.layoutCallback = pinTypeAddCallback
    }
  }
}

export function setResizeCallback(
  lib: Lib,
  pinType: number | string,
  pinTypeOnResizeCallback: (
    this: void,
    pinManager: LmpPinManager,
    mapWidth: number,
    mapHeight: number
  ) => void
): undefined {
  if (type(pinTypeOnResizeCallback) !== "function") {
    return
  }

  const pinTypeId = getPinTypeId(pinType)
  if (pinTypeId !== undefined) {
    const pinData = lib.pinManager.customPins[pinTypeId]
    if (pinData) {
      pinData.resizeCallback = pinTypeOnResizeCallback
    }
  }
}
