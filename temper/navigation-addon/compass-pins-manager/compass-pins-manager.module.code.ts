import {
  asCompassPinData,
  asCompassPoolClass,
  asControl,
  asMaybeResetFn,
  asMaybeUpdateFn,
  asTableKey,
} from "../compass-pins-casts/compass-pins-casts.module.code.ts"
import {
  CUSTOM_COMPASS_LAYOUT_RESET,
  CUSTOM_COMPASS_LAYOUT_UPDATE,
  DEFAULT_TEXTURE,
  FALLBACK_MAX_DISTANCE,
  LEGACY_LAYOUT_RESET,
  LEGACY_LAYOUT_UPDATE,
  PIN_NAME_PREFIX,
  PIN_TEMPLATE,
} from "../compass-pins-constants/compass-pins-constants.module.code.ts"
import { pinLayouts, STATE } from "../compass-pins-state/compass-pins-state.module.code.ts"
import type {
  CompassLayoutResetFn,
  CompassLayoutUpdateFn,
  CompassPin,
  CompassPinData,
  CompassPinLayout,
  CompassPinManagerClass,
  CompassPinManagerInstance,
  PinKey,
} from "../compass-pins-types/compass-pins-types.module.code.ts"

const PARENT = asControl(COMPASS.container)
const CONTROL_POOL = asCompassPoolClass(ZO_ControlPool)

function getAdditionalLayoutFunction(
  this: void,
  layout: CompassPinLayout,
  key: "update"
): CompassLayoutUpdateFn | undefined
function getAdditionalLayoutFunction(
  this: void,
  layout: CompassPinLayout,
  key: "reset"
): CompassLayoutResetFn | undefined
function getAdditionalLayoutFunction(
  this: void,
  layout: CompassPinLayout,
  key: "update" | "reset"
): CompassLayoutUpdateFn | CompassLayoutResetFn | undefined {
  const layoutTable = layout.additionalLayout
  if (layoutTable === undefined) {
    return undefined
  }

  const named = layoutTable[key]
  if (named !== undefined) {
    return named
  }

  if (key === CUSTOM_COMPASS_LAYOUT_UPDATE) {
    return asMaybeUpdateFn(layoutTable[LEGACY_LAYOUT_UPDATE])
  }
  if (key === CUSTOM_COMPASS_LAYOUT_RESET) {
    return asMaybeResetFn(layoutTable[LEGACY_LAYOUT_RESET])
  }

  return undefined
}

function updateAngles(
  this: void,
  xDif: number,
  yDif: number,
  heading: number,
  currentFOV: number
): LuaMultiReturn<[number, number, number]> {
  let angle = -math.atan2(xDif, yDif) + heading
  if (angle > math.pi) {
    angle = angle - 2 * math.pi
  } else if (angle < -math.pi) {
    angle = angle + 2 * math.pi
  }
  const normalizedAngle = (2 * angle) / currentFOV
  const absNormalizedAngle = zo_abs(normalizedAngle)
  return $multi(angle, normalizedAngle, absNormalizedAngle)
}

function updatePinSize(
  this: void,
  layout: CompassPinLayout,
  pin: CompassPin,
  angle: number,
  normalizedAngle: number,
  normalizedDistance: number,
  absNormalizedAngle: number
): undefined {
  if (layout.sizeCallback !== undefined) {
    layout.sizeCallback(pin, angle, normalizedAngle, normalizedDistance)
  } else {
    if (absNormalizedAngle > 0.25) {
      pin.SetDimensions(36 - 16 * absNormalizedAngle, 36 - 16 * absNormalizedAngle)
    } else {
      pin.SetDimensions(32, 32)
    }
  }
}

function updatePinAnchor(this: void, pin: CompassPin, normalizedAngle: number): undefined {
  pin.ClearAnchors()
  pin.SetAnchor(CENTER, PARENT, CENTER, 0.5 * PARENT.GetWidth() * normalizedAngle, 0)
}

export const CompassPinManager = CONTROL_POOL.Subclass<CompassPinManagerClass>()

CompassPinManager.New = function (this: CompassPinManagerClass): CompassPinManagerInstance {
  const result = CONTROL_POOL.New<CompassPinManagerInstance>(
    this,
    PIN_TEMPLATE,
    PARENT,
    PIN_NAME_PREFIX
  )
  result.Initialize2()
  return result
}

CompassPinManager.Initialize2 = function (this: CompassPinManagerInstance): undefined {
  this.pinData = new LuaTable<AnyNotNil, CompassPinData>()
  this.defaultAngle = 1
  this.compassPinEnabled = {}
}

CompassPinManager.GetNewPin = function (
  this: CompassPinManagerInstance,
  data: CompassPinData
): LuaMultiReturn<[CompassPin, PinKey]> {
  const [pin, pinKey] = this.AcquireObject<CompassPin>()
  this.ResetPin(pin)
  pin.SetHandler("OnMouseDown", undefined)
  pin.SetHandler("OnMouseUp", undefined)
  pin.SetHandler("OnMouseEnter", undefined)
  pin.SetHandler("OnMouseExit", undefined)
  const highlight = pin.GetNamedChild<Control>("Highlight")
  if (highlight !== undefined) {
    highlight.SetHidden(true)
  }

  pin.xLoc = data.xLoc
  pin.yLoc = data.yLoc
  pin.pinType = data.pinType
  pin.pinTag = data.pinTag
  pin.pinName = data.pinName
  pin.data = data

  const layout = pinLayouts.get(data.pinType)
  const texture = pin.GetNamedChild<TextureControl>("Background")
  if (layout !== undefined && texture !== undefined) {
    texture.SetTexture(layout.texture ?? DEFAULT_TEXTURE)
  }

  return $multi(pin, pinKey)
}

CompassPinManager.SetCompassPinEnabled = function (
  this: CompassPinManagerInstance,
  pinType: string,
  state2: boolean
): undefined {
  if (type(state2) === "boolean") {
    this.compassPinEnabled[pinType] = state2
  }
}

CompassPinManager.IsCompassPinEnabled = function (
  this: CompassPinManagerInstance,
  pinType: string
): boolean {
  const enabled = this.compassPinEnabled[pinType]
  return enabled !== false
}

CompassPinManager.CreatePin = function (
  this: CompassPinManagerInstance,
  pinType: string,
  pinTag: unknown,
  xLoc: number,
  yLoc: number,
  pinName?: string,
  ...rest: unknown[]
): undefined {
  if (!this.IsCompassPinEnabled(pinType)) {
    return
  }

  const data = asCompassPinData(rest)
  data.xLoc = xLoc ?? 0
  data.yLoc = yLoc ?? 0
  data.pinType = pinType ?? "NoType"
  data.pinTag = pinTag ?? {}
  data.pinName = pinName

  this.RemovePin(data.pinTag)

  this.pinData.set(asTableKey(pinTag), data)
}

CompassPinManager.RemovePin = function (
  this: CompassPinManagerInstance,
  pinTag: unknown
): undefined {
  const key = asTableKey(pinTag)
  const entry = this.pinData.get(key)
  if (entry !== undefined && entry.pinKey !== undefined) {
    this.ReleaseObject(entry.pinKey)
  }
  this.pinData.delete(key)
}

CompassPinManager.RemovePins = function (
  this: CompassPinManagerInstance,
  pinType?: string
): undefined {
  if (pinType === undefined) {
    this.ReleaseAllObjects()
    this.pinData = new LuaTable<AnyNotNil, CompassPinData>()
  } else {
    for (const [key, data] of pairs(this.pinData)) {
      if (data.pinType === pinType) {
        if (data.pinKey !== undefined) {
          this.ReleaseObject(data.pinKey)
        }
        this.pinData.delete(key)
      }
    }
  }
}

CompassPinManager.ResetPin = function (
  this: CompassPinManagerInstance,
  pin: CompassPin
): undefined {
  for (const [, layout] of pairs(pinLayouts)) {
    const resetFn = getAdditionalLayoutFunction(layout, CUSTOM_COMPASS_LAYOUT_RESET)
    if (resetFn !== undefined) {
      resetFn(pin)
    }
  }
}

CompassPinManager.Update = function (
  this: CompassPinManagerInstance,
  x: number,
  y: number,
  heading: number
): undefined {
  for (const [, pinData] of pairs(this.pinData)) {
    this.UpdateSinglePin(pinData, x, y, heading)
  }
}

CompassPinManager.UpdateSinglePin = function (
  this: CompassPinManagerInstance,
  pinData: CompassPinData,
  x: number,
  y: number,
  heading: number
): undefined {
  const layout = pinLayouts.get(pinData.pinType)
  if (layout === undefined) {
    return
  }
  if (layout.maxDistance === undefined) {
    layout.maxDistance = FALLBACK_MAX_DISTANCE
  }

  const distance = layout.maxDistance * STATE.distanceCoefficient
  const xDif = x - pinData.xLoc
  const yDif = y - pinData.yLoc
  const normalizedDistance = (xDif * xDif + yDif * yDif) / (distance * distance)

  if (normalizedDistance >= 1) {
    if (pinData.pinKey !== undefined) {
      this.ReleaseObject(pinData.pinKey)
      pinData.pinKey = undefined
    }
    return
  }

  let pin: CompassPin | undefined
  if (pinData.pinKey !== undefined) {
    pin = this.GetActiveObject<CompassPin>(pinData.pinKey)
  } else {
    const [newPin, newKey] = this.GetNewPin(pinData)
    pin = newPin
    pinData.pinKey = newKey
  }

  if (pin === undefined) {
    CHAT_ROUTER.AddSystemMessage(
      string.format("CustomCompassPin Error: no pin with key %s found!", pinData.pinKey)
    )
    return
  }

  const currentFOV = layout.FOV ?? STATE.defaultFOV
  const [angle, normalizedAngle, absNormalizedAngle] = updateAngles(xDif, yDif, heading, currentFOV)

  if (absNormalizedAngle > (layout.maxAngle ?? this.defaultAngle)) {
    pin.SetHidden(true)
    return
  }

  updatePinAnchor(pin, normalizedAngle)
  updatePinSize(layout, pin, angle, normalizedAngle, normalizedDistance, absNormalizedAngle)

  const updateFn = getAdditionalLayoutFunction(layout, CUSTOM_COMPASS_LAYOUT_UPDATE)
  if (updateFn !== undefined) {
    updateFn(pin, angle, normalizedAngle, normalizedDistance)
  }
  pin.SetAlpha(1 - normalizedDistance)

  pin.SetHidden(false)
}
