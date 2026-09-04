import { isItemInBagCache } from "../lost-treasure-bag-cache/lost-treasure-bag-cache.module.code.ts"
import {
  ADDON_DISPLAY_NAME,
  LOST_TREASURE_MARK_OPTIONS_ALL,
  LOST_TREASURE_MARK_OPTIONS_USING,
  LOST_TREASURE_PIN_KEY_COMPASS,
  LOST_TREASURE_PIN_KEY_MAP,
  LOST_TREASURE_PIN_TYPE_DATA,
  type PinKey,
  type PinType,
} from "../lost-treasure-constants/lost-treasure-constants.module.code.ts"
import { createLogger } from "../lost-treasure-logger/lost-treasure-logger.module.code.ts"
import { markOnUsingDoesExist } from "../lost-treasure-mark-on-using/lost-treasure-mark-on-using.module.code.ts"
import { getSettingsFromPinType } from "../lost-treasure-pin-settings/lost-treasure-pin-settings.module.code.ts"
import type { PinTypeSettings } from "../lost-treasure-saved-vars/lost-treasure-saved-vars.module.code.ts"
import { getSavedVars } from "../lost-treasure-saved-vars/lost-treasure-saved-vars.module.code.ts"
import type { PinPlacement } from "../lost-treasure-types/lost-treasure-types.module.code.ts"
import {
  addTooltip,
  getItemLinkFromItemId,
  isValidMapType,
} from "../lost-treasure-utilities/lost-treasure-utilities.module.code.ts"

const logger = createLogger("pins")

type StringRecord = Record<string, unknown>
type BoolRecord = Record<string, boolean>

function asStringRecord(value: unknown): StringRecord {
  return value as StringRecord
}

function asBoolRecord(value: unknown): BoolRecord {
  return value as BoolRecord
}

function asPinTag(value: unknown): PinTag {
  return value as PinTag
}

function asCompassPinControl(value: unknown): CompassPinControl {
  return value as CompassPinControl
}

const TIME_BETWEEN_LABEL_UPDATES_MS = 250
const DEFAULT_GAMEPAD_TOOLTIP_TEXTURE = LibTreasure_GetIcons()[4] ?? ""

interface PinTag {
  x: number
  y: number
  itemId: number
}

interface CompassPinControl {
  pinName?: string
}

type MapPinTextureFn = (this: void, pin: MapPin) => string

interface MapPinLayout {
  level: number
  size: number
  texture: string | MapPinTextureFn
}

const LABEL_STATE: {
  nextLabelUpdateTime: number
  overPinLabel: CompassOverPinLabel | undefined
  overPinAnimation: CompassPinAnimation | undefined
  overrideAnimation: CompassPinAnimation | undefined
} = {
  nextLabelUpdateTime: -1,
  overPinLabel: undefined,
  overPinAnimation: undefined,
  overrideAnimation: undefined,
}

function resolveItemIconTexture(this: void, pin: MapPin, fallback: string): string {
  const [, rawTag] = pin.GetPinTypeAndTag()
  const itemId = asPinTag(rawTag).itemId
  const icon = GetItemLinkIcon(getItemLinkFromItemId(itemId))
  return icon !== "" ? icon : fallback
}

function getMapFilterCheckboxName(this: void, pinType: PinType): string {
  const nameLocalized = LOST_TREASURE_PIN_TYPE_DATA[pinType].name
  return zo_strformat(SI_LOST_TREASURE_MAP_FILTER_CHECKBOX_NAME, nameLocalized, ADDON_DISPLAY_NAME)
}

function getPinNameFromPinType(this: void, pinType: PinType): string {
  return LOST_TREASURE_PIN_TYPE_DATA[pinType].pinName
}

function refreshMapPins(this: void, pinName: string): undefined {
  LibMapPins.RefreshPins(pinName)
}

function refreshCompassPins(this: void, pinName: string): undefined {
  COMPASS_PINS.RefreshPins(pinName)
}

export function setLayoutKey(this: void, pinType: PinType, key: string, data: unknown): undefined {
  LibMapPins.SetLayoutKey(getPinNameFromPinType(pinType), key, data)
}

function isEnabled(this: void, pinName: string): boolean {
  return LibMapPins.IsEnabled(pinName)
}

export function setMapPinState(this: void, pinType: PinType, pinState: boolean): undefined {
  LibMapPins.SetEnabled(getPinNameFromPinType(pinType), pinState)
}

export function refreshAllPinsFromPinType(this: void, pinType: PinType): undefined {
  const pinName = getPinNameFromPinType(pinType)
  refreshMapPins(pinName)
  refreshCompassPins(pinName)
}

export function refreshCompassPinsFromPinType(this: void, pinType: PinType): undefined {
  refreshCompassPins(getPinNameFromPinType(pinType))
}

export function setCompassPinTypeTexture(
  this: void,
  pinType: PinType,
  texturePath: string
): undefined {
  const layout = COMPASS_PINS.pinLayouts[getPinNameFromPinType(pinType)]
  if (layout !== undefined) {
    layout.texture = texturePath
  }
}

function addNewPins(
  this: void,
  pinName: string,
  mapCallback: (this: void) => undefined,
  mapLayout: MapPinLayout,
  pinTooltip: MapPinTooltipCreator,
  mapFilter: string,
  compassCallback: (this: void) => undefined,
  compassLayout: CompassPinLayout,
  settingsLayout: PinTypeSettings,
  settingsKey: string
): undefined {
  LibMapPins.AddPinType(pinName, mapCallback, undefined, mapLayout, pinTooltip)
  LibMapPins.AddPinFilter(pinName, mapFilter, undefined, asBoolRecord(settingsLayout), settingsKey)

  COMPASS_PINS.AddCustomPin(pinName, compassCallback, compassLayout)

  refreshCompassPins(pinName)
}

function createNewPin(this: void, pinType: PinType, pinData: PinPlacement, key: PinKey): undefined {
  const pinName = getPinNameFromPinType(pinType)
  if (key === LOST_TREASURE_PIN_KEY_MAP) {
    LibMapPins.CreatePin(pinName, pinData, pinData.x, pinData.y)
  } else if (key === LOST_TREASURE_PIN_KEY_COMPASS) {
    const itemLink = getItemLinkFromItemId(pinData.itemId)
    const itemName = zo_strformat(SI_TOOLTIP_ITEM_NAME, GetItemLinkName(itemLink))
    COMPASS_PINS.pinManager.CreatePin(pinName, pinData, pinData.x, pinData.y, itemName)
  }
  logger.Verbose(
    "Add pin to map - pinType: %s, pinName: %s, itemId: %s",
    pinType,
    pinName,
    pinData.itemId
  )
}

function createMarkOptionMapPin(
  this: void,
  pinType: PinType,
  key: PinKey,
  pinData: PinPlacement,
  markOption: string
): undefined {
  if (markOption !== LOST_TREASURE_MARK_OPTIONS_ALL) {
    const itemId = pinData.itemId
    if (markOption === LOST_TREASURE_MARK_OPTIONS_USING) {
      if (markOnUsingDoesExist(pinType, itemId)) {
        createNewPin(pinType, pinData, key)
      }
    } else if (isItemInBagCache(itemId)) {
      createNewPin(pinType, pinData, key)
    }
  } else {
    createNewPin(pinType, pinData, key)
  }
}

function getAndCreateMapPins(this: void, pinType: PinType, key: PinKey): undefined {
  const mapId = GetCurrentMapId()
  const mapIdData = LibTreasure_GetMapIdData(mapId)
  if (mapIdData !== undefined) {
    const markOption = getSettingsFromPinType(pinType, "markOption")
    for (const [, pinData] of ipairs(mapIdData)) {
      if (pinData.pinType === pinType) {
        createMarkOptionMapPin(pinType, key, pinData, markOption)
      }
    }
  }
}

function getAndCreateMinedMapPins(this: void, pinType: PinType, key: PinKey): undefined {
  const db = getSavedVars()
  const mapId = GetCurrentMapId()
  const currentMapIdData = db.mining.data[mapId]
  if (currentMapIdData !== undefined) {
    const markOption = getSettingsFromPinType(pinType, "markOption")
    for (const [, pinData] of ipairs(currentMapIdData)) {
      if (pinData.pinType === pinType) {
        createMarkOptionMapPin(pinType, key, pinData, markOption)
      }
    }
  }
}

function updatePinName(
  this: void,
  pin: CompassPinControl,
  _unused: unknown,
  normalizedAngle: number,
  normalizedDistance: number
): undefined {
  const now = GetFrameTimeMilliseconds()
  if (now < LABEL_STATE.nextLabelUpdateTime) {
    return
  }

  const { overPinLabel, overPinAnimation, overrideAnimation } = LABEL_STATE
  if (
    pin.pinName !== undefined &&
    overPinLabel !== undefined &&
    overPinAnimation !== undefined &&
    overrideAnimation !== undefined
  ) {
    if (zo_abs(normalizedAngle) < 0.1 && zo_abs(normalizedDistance) < 0.95) {
      if (overrideAnimation.IsPlaying()) {
        overPinAnimation.PlayBackward()
      } else if (!overPinAnimation.IsPlaying() || !overPinAnimation.IsPlayingBackward()) {
        overPinLabel.SetText(pin.pinName)
        overPinAnimation.PlayForward()
      }
      LABEL_STATE.nextLabelUpdateTime = now + TIME_BETWEEN_LABEL_UPDATES_MS
    }
  }
}

function initializeUpdatePinName(this: void): undefined {
  LABEL_STATE.nextLabelUpdateTime = -1

  function isAboveUpdateThreshold(this: void): boolean {
    return (
      GetFrameTimeMilliseconds() > LABEL_STATE.nextLabelUpdateTime + TIME_BETWEEN_LABEL_UPDATES_MS
    )
  }

  ZO_PreHook(asStringRecord(COMPASS), "OnUpdate", function (this: void): boolean {
    return !isAboveUpdateThreshold()
  })

  LABEL_STATE.overPinLabel = COMPASS.centerOverPinLabel
  LABEL_STATE.overPinAnimation = COMPASS.centerOverPinLabelAnimation
  LABEL_STATE.overrideAnimation = COMPASS.areaOverrideAnimation
}

export function initializePins(this: void): undefined {
  initializeUpdatePinName()

  function pinTypeAddCallback(this: void, pinType: PinType, pinName: string): undefined {
    if (isValidMapType() && isEnabled(pinName)) {
      getAndCreateMapPins(pinType, LOST_TREASURE_PIN_KEY_MAP)
      getAndCreateMinedMapPins(pinType, LOST_TREASURE_PIN_KEY_MAP)
    }
  }

  function pinCallback(this: void, pinType: PinType): undefined {
    if (isValidMapType() && getSettingsFromPinType(pinType, "showOnCompass")) {
      getAndCreateMapPins(pinType, LOST_TREASURE_PIN_KEY_COMPASS)
      getAndCreateMinedMapPins(pinType, LOST_TREASURE_PIN_KEY_COMPASS)
    }
  }

  const pinTooltipCreator: MapPinTooltipCreator = {
    creator: function (this: void, pin: MapPin): undefined {
      const [, rawTag] = pin.GetPinTypeAndTag()
      const pinTag = asPinTag(rawTag)
      const x = pinTag.x
      const y = pinTag.y
      const text = string.format("%.2f x %.2f", x * 100, y * 100)

      const itemId = pinTag.itemId
      const itemLink = getItemLinkFromItemId(itemId)
      const itemName = zo_strformat(SI_TOOLTIP_ITEM_NAME, GetItemLinkName(itemLink))
      const [stackCount] = GetItemLinkStacks(itemLink)
      const color = GetItemQualityColor(GetItemLinkDisplayQuality(itemLink))

      addTooltip(text, itemName, color, stackCount, DEFAULT_GAMEPAD_TOOLTIP_TEXTURE)
    },
  }

  const db = getSavedVars()
  for (const [pinType, settingsLayout] of pairs(db.pinTypes)) {
    const mapPinLayout: MapPinLayout = {
      level: settingsLayout.pinLevel,
      size: settingsLayout.size,
      texture: (pin) => resolveItemIconTexture(pin, settingsLayout.texture),
    }

    const compassPinLayout: CompassPinLayout = {
      maxDistance: 0.05,
      texture: settingsLayout.texture,
      additionalLayout: {
        update: (pin, angle, normalizedAngle, normalizedDistance) => {
          updatePinName(asCompassPinControl(pin), angle, normalizedAngle, normalizedDistance)
        },
        reset: () => {},
      },
    }

    const pinName = getPinNameFromPinType(pinType)

    addNewPins(
      pinName,
      () => pinTypeAddCallback(pinType, pinName),
      mapPinLayout,
      pinTooltipCreator,
      getMapFilterCheckboxName(pinType),
      () => pinCallback(pinType),
      compassPinLayout,
      settingsLayout,
      "showOnMap"
    )
  }

  logger.Debug("initialized")
}
