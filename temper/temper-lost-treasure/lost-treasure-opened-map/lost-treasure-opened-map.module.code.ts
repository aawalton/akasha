import {
  LOST_TREASURE_BOOK_NOT_OPENED,
  LOST_TREASURE_MAP_NOT_OPENED,
  LOST_TREASURE_MARK_OPTIONS_USING,
  LOST_TREASURE_NO_PIN_TYPE,
  LOST_TREASURE_PIN_TYPE_DATA,
  type PinType,
} from "../lost-treasure-constants/lost-treasure-constants.module.code.ts"
import { createLogger } from "../lost-treasure-logger/lost-treasure-logger.module.code.ts"
import {
  markOnUsingAdd,
  markOnUsingDoesExist,
} from "../lost-treasure-mark-on-using/lost-treasure-mark-on-using.module.code.ts"
import { miningAdd } from "../lost-treasure-mining/lost-treasure-mining.module.code.ts"
import {
  getSettingDeletionDelay,
  getSettingsFromPinType,
} from "../lost-treasure-pin-settings/lost-treasure-pin-settings.module.code.ts"
import * as pins from "../lost-treasure-pins/lost-treasure-pins.module.code.ts"
import { getSavedVars } from "../lost-treasure-saved-vars/lost-treasure-saved-vars.module.code.ts"
import type { PinData } from "../lost-treasure-types/lost-treasure-types.module.code.ts"
import {
  getPinTypeFromString,
  getPlayerPositionInfo,
  getTreasureMapTexturePathName,
  requestRefreshMap,
  runCallbackAsync,
  secondsToMilliseconds,
} from "../lost-treasure-utilities/lost-treasure-utilities.module.code.ts"

const logger = createLogger("main")

function asPinType(value: unknown): PinType {
  return value as PinType
}

const HIDE_MINI_MAP = true
const SLOT_UPDATED_DELAY = ZO_ONE_SECOND_IN_MILLISECONDS / 5

interface MainState {
  control: Control
  mapControl: Control
  lastOpenedTreasureMap: string
  lastOpenedBookId: number
  lastOpenedItemId: number
}

const HOLDER: { state: MainState | undefined; fragment: HUDFadeSceneFragment | undefined } = {
  state: undefined,
  fragment: undefined,
}

function state(this: void): MainState {
  if (HOLDER.state === undefined) {
    throw new Error("TemperLostTreasure main object accessed before initialization")
  }
  return HOLDER.state
}

const anchor = ZO_Anchor.New()

export function setLastOpenedItemId(this: void, itemId: number): undefined {
  state().lastOpenedItemId = itemId
  logger.Debug("set lastOpenedItemId: %s, itemId: %s", tostring(state().lastOpenedItemId), itemId)
}

export function isLastOpenedItemId(this: void, itemId: number): boolean {
  logger.Debug("lastOpenedItemId: %s, itemId: %s", tostring(state().lastOpenedItemId), itemId)
  return state().lastOpenedItemId === itemId
}

export function updateVisibility(this: void, hidden: boolean, fadeTime?: number): undefined {
  const fragment = HOLDER.fragment
  if (fragment === undefined) {
    return
  }
  const isHidden = tostring(fragment.IsHidden())
  logger.Debug(
    "set hidden: %s, isHidden: %s, fadeTime: %s",
    tostring(hidden),
    isHidden,
    fadeTime ?? "nil"
  )
  fragment.SetHiddenForReason("hasMapOpened", hidden, fadeTime, fadeTime)
}

export function refreshPinTypePins(this: void, pinType: PinType): undefined {
  pins.refreshAllPinsFromPinType(pinType)
}

function addMarkOnUsingPin(this: void, pinType: PinType, itemId: number): undefined {
  if (!markOnUsingDoesExist(pinType, itemId)) {
    markOnUsingAdd(pinType, itemId)
    refreshPinTypePins(pinType)
  }
}

function onEventShowTreasureMap(this: void, treasureMapIndex: number): undefined {
  const [name, texturePath] = GetTreasureMapInfo(treasureMapIndex)
  const mapTextureName = getTreasureMapTexturePathName(texturePath)
  const st = state()
  st.lastOpenedTreasureMap = mapTextureName ?? LOST_TREASURE_MAP_NOT_OPENED

  logger.Info(
    "Treasure map opened. name: %s, texturePath: %s, mapTextureName: %s, treasureMapIndex: %d",
    name,
    texturePath,
    mapTextureName ?? "nil",
    treasureMapIndex
  )

  st.mapControl.SetTexture(texturePath)

  const isMinimapEnabled = getSavedVars().miniMap.enabled
  updateVisibility(!isMinimapEnabled)

  if (mapTextureName !== undefined) {
    const pin = LibTreasure_GetTextureData(mapTextureName)
    logger.Debug(
      "GetTextureData itemId: %s",
      pin !== undefined ? pin.itemId : "no - pin has not been found"
    )
    if (pin !== undefined) {
      setLastOpenedItemId(pin.itemId)
      const pinType = getPinTypeFromString(name)
      if (pinType !== LOST_TREASURE_NO_PIN_TYPE) {
        const markOption = getSettingsFromPinType(asPinType(pinType), "markOption")
        if (markOption === LOST_TREASURE_MARK_OPTIONS_USING) {
          addMarkOnUsingPin(asPinType(pinType), pin.itemId)
        }
      }
    }
  }
}

function onEventShowBook(
  this: void,
  title: string,
  _body: string,
  _medium: number,
  _showTitle: boolean,
  bookId: number
): undefined {
  state().lastOpenedBookId = bookId

  const itemId = LibTreasure_GetBookIdItemId(bookId)
  if (itemId !== undefined) {
    const pinType = getPinTypeFromString(title)
    if (pinType !== LOST_TREASURE_NO_PIN_TYPE) {
      const markOption = getSettingsFromPinType(asPinType(pinType), "markOption")
      if (markOption === LOST_TREASURE_MARK_OPTIONS_USING) {
        addMarkOnUsingPin(asPinType(pinType), itemId)
      }
    }
  }
  logger.Info(
    "Book opened. bookId: %s, title: %s, isCollected: %s",
    bookId,
    title,
    tostring(itemId !== undefined)
  )
}

function onPlayerActivated(this: void): undefined {
  const db = getSavedVars()
  for (const [pinType] of pairs(db.pinTypes)) {
    pins.refreshCompassPinsFromPinType(pinType)
  }
}

function isValidInteractionType(
  this: void,
  pinType: PinType,
  interactionType: number,
  sceneName: string
): boolean {
  if (sceneName === "hud") {
    if (LOST_TREASURE_PIN_TYPE_DATA[pinType].interactionType === interactionType) {
      return true
    }
  }
  return false
}

export function requestReport(
  this: void,
  pinType: PinType,
  interactionType: number,
  itemId: number,
  itemName: string,
  itemLink: string,
  sceneName: string,
  overwriteMiningState?: boolean
): undefined {
  if (isValidInteractionType(pinType, interactionType, sceneName)) {
    if (LibTreasure_GetItemIdData(itemId) !== undefined) {
      logger.Info("Item %d has been found in database.", itemId)
      return
    }

    requestRefreshMap()

    const [x, y, zone, subZone, mapId] = getPlayerPositionInfo()
    const zoneName = zo_strformat(SI_ITEM_FORMAT_STR_TEXT1_TEXT2, zone, subZone)
    const texture = getSettingsFromPinType(pinType, "texture")
    const st = state()

    logger.Info(
      "new pin location at %.4f x %.4f, zone: %s, mapId: %d, itemId: %d, itemName: %s, treasureMapTexture: %s, interactionType: %d, sceneName: %s, itemLink: %s, bookId: %d, texture: %s",
      x,
      y,
      zoneName,
      mapId,
      itemId,
      itemName,
      st.lastOpenedTreasureMap,
      interactionType,
      sceneName,
      itemLink,
      st.lastOpenedBookId,
      texture
    )

    const pinData: PinData = {
      itemId,
      mapId,
      pinType,
      x,
      y,
      texture,
      zone: zoneName,
      itemName,
      lastOpenedTreasureMap: st.lastOpenedTreasureMap,
      lastOpenedBookId: st.lastOpenedBookId,
    }
    miningAdd(pinData, overwriteMiningState)
  } else {
    logger.Info(
      "Invalid interaction. pinType %s, interactionType %d, sceneName %s",
      pinType,
      interactionType,
      sceneName
    )
  }
}

function getDelayInMilliseconds(this: void, delayInSeconds: number): number {
  return delayInSeconds === 0 ? SLOT_UPDATED_DELAY : secondsToMilliseconds(delayInSeconds)
}

export function processQueue(
  this: void,
  pinType: PinType | undefined,
  callback: (this: void) => undefined,
  interactionType: number | string
): undefined {
  const delayInSeconds = getSettingDeletionDelay(pinType)
  const delayInMilliseconds = getDelayInMilliseconds(delayInSeconds)
  logger.Debug(
    "ProzessQueue - delayInSeconds: %s, delayInMilliseconds: %s, interactionType: %s",
    delayInSeconds,
    delayInMilliseconds,
    interactionType
  )
  runCallbackAsync(callback, delayInMilliseconds)
}

export function setMiniMapAnchor(this: void): undefined {
  const db = getSavedVars()
  const st = state()
  st.control.SetDimensions(db.miniMap.size, db.miniMap.size)
  anchor.ResetToAnchor(db.miniMap.anchor)
  anchor.Set(st.control)
}

export function onMoveStop(this: void): undefined {
  anchor.SetFromControlAnchor(state().control)
  getSavedVars().miniMap.anchor = anchor
}

function registerEvents(this: void): undefined {
  const control = state().control
  control.RegisterForEvent(
    EVENT_SHOW_TREASURE_MAP,
    function (this: void, _eventCode: number, treasureMapIndex: number): undefined {
      onEventShowTreasureMap(treasureMapIndex)
    }
  )
  control.RegisterForEvent(
    EVENT_SHOW_BOOK,
    function (
      this: void,
      _eventCode: number,
      title: string,
      body: string,
      medium: number,
      showTitle: boolean,
      bookId: number
    ): undefined {
      onEventShowBook(title, body, medium, showTitle, bookId)
    }
  )
  control.RegisterForEvent(EVENT_PLAYER_ACTIVATED, function (this: void): undefined {
    onPlayerActivated()
  })
}

export function initializeMainControl(this: void, control: Control): undefined {
  const mapControl = control.GetNamedChild("Map")
  if (mapControl === undefined) {
    throw new Error("TemperLostTreasure minimap control is missing its Map child")
  }
  HOLDER.state = {
    control,
    mapControl,
    lastOpenedTreasureMap: LOST_TREASURE_MAP_NOT_OPENED,
    lastOpenedBookId: LOST_TREASURE_BOOK_NOT_OPENED,
    lastOpenedItemId: 0,
  }
  setLastOpenedItemId(0)

  const fragment = ZO_HUDFadeSceneFragment.New(control)
  HOLDER.fragment = fragment
  HUD_SCENE.AddFragment(fragment)
  HUD_UI_SCENE.AddFragment(fragment)
  TREASURE_MAP_INVENTORY_SCENE.AddFragment(fragment)
  GAMEPAD_TREASURE_MAP_INVENTORY_SCENE.AddFragment(fragment)
  WORLD_MAP_SCENE.AddFragment(fragment)
  GAMEPAD_WORLD_MAP_SCENE.AddFragment(fragment)
}

export function finalizeInitialization(this: void): undefined {
  registerEvents()
  setMiniMapAnchor()
  updateVisibility(HIDE_MINI_MAP)
}

export function hideMiniMap(this: void): undefined {
  updateVisibility(HIDE_MINI_MAP)
}
