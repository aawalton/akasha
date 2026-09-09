import { createButton } from "../fco-functions/fco-functions.module.code.ts"
import { STATE } from "../fco-state/fco-state.module.code.ts"

const EM = EVENT_MANAGER

const worldMap = ZO_WorldMap
function isScene(this: void, value: unknown): value is Scene {
  return type(value) === "table"
}
function asScene(this: void, value: unknown): Scene {
  return isScene(value) ? value : error("FCOChangeStuff: expected a ZO_Scene object")
}
const mapSceneKeyboard = asScene(WORLD_MAP_SCENE)
const mapSceneGamepad = asScene(GAMEPAD_WORLD_MAP_SCENE)
const mapZoneStoryFragmentKeyboard = WORLD_MAP_ZONE_STORY_KEYBOARD_FRAGMENT
const mapZoneStoryFragmentGamepad = WORLD_MAP_ZONE_STORY_GAMEPAD_FRAGMENT
const mapFilters = WORLD_MAP_FILTERS
const mapFiltersFragment = WORLD_MAP_KEY_FILTERS_FRAGMENT
let MAP_SCENE_CHANGE_CALLBACK_REGISTERED = false

interface FilterCheckBoxControl extends Control {
  GetState: (this: FilterCheckBoxControl) => number
}
interface CurrentFilterPanel {
  checkBoxPool?: { m_Active?: Record<number, FilterCheckBoxControl> }
}
interface WorldMapFiltersWithCurrentPanel {
  currentPanel?: CurrentFilterPanel
}
function isFiltersWithCurrentPanel(
  this: void,
  value: unknown
): value is WorldMapFiltersWithCurrentPanel {
  return type(value) === "table"
}

export function onMountStateChanged(
  this: void,
  _eventCode: unknown,
  isMounted: unknown
): undefined {
  if (STATE.settingsVars.settings.reOpenMapOnMounting !== true) {
    return
  }
  if (isMounted === true) {
    if (STATE.worldMapShown) {
      STATE.worldMapShown = false

      zo_callLater(() => {
        if (ZO_WorldMap_ShowWorldMap !== undefined) {
          ZO_WorldMap_ShowWorldMap()
        }
      }, 50)
    }
  } else {
    STATE.worldMapShown = false
  }
}

export function setAllWorldMapFilters(this: void, filterState: number | undefined): undefined {
  if (filterState === undefined) {
    return
  }
  if (worldMap.IsHidden()) {
    return
  }

  if (mapFilters !== undefined && isFiltersWithCurrentPanel(mapFilters)) {
    const currentWMFpanel = mapFilters.currentPanel
    if (currentWMFpanel !== undefined) {
      const cbPool = currentWMFpanel.checkBoxPool?.m_Active
      if (cbPool !== undefined) {
        let numCBs = 0
        for (const poolKey of Object.keys(cbPool)) {
          void poolKey
          numCBs = numCBs + 1
        }
        if (numCBs === 0) {
          numCBs = 1
        }
        for (let checkBoxNr = 1; checkBoxNr <= numCBs; checkBoxNr = checkBoxNr + 1) {
          const checkBoxControl = cbPool[checkBoxNr]
          if (checkBoxControl !== undefined) {
            const cbState = checkBoxControl.GetState()
            if (filterState !== cbState) {
              const cbOnClickedHandler = checkBoxControl.GetHandler("OnClicked")
              if (cbOnClickedHandler !== undefined && typeof cbOnClickedHandler === "function") {
                cbOnClickedHandler(checkBoxControl)
              }
            }
          }
        }
      }
    }
  }
}

let MAP_FILTERS_FRAGMENT_REGISTERED = false
export function worldMapFilterButtons(this: void): undefined {
  if (MAP_FILTERS_FRAGMENT_REGISTERED) {
    return
  }
  const perfectPixelAddonIsLoaded = STATE.otherAddons.PerfectPixel === true
  let parent: Control
  let left = 0
  let left2 = 0
  let top = 0
  let alignMain = RIGHT
  let alignBackup = RIGHT
  if (!perfectPixelAddonIsLoaded) {
    parent = ZO_WorldMapInfoMenuBarLabel
    left = 60
    left2 = 85
    top = 0
    alignMain = RIGHT
    alignBackup = RIGHT
  } else {
    parent = ZO_WorldMapFilters
    left = -25
    left2 = 25
    top = -18
    alignMain = TOP
    alignBackup = TOP
  }
  let name: string
  let callbackFunction: (this: void) => void
  const onMouseUpCallbackFunction = undefined
  const onMouseUpCallbackFunctionMouseButton = MOUSE_BUTTON_INDEX_RIGHT
  const text = undefined
  const font = undefined
  let tooltipText: string
  const tooltipAlign = RIGHT

  let textureNormal = "/EsoUI/Art/Buttons/checkbox_checked.dds"
  let textureMouseOver = "/EsoUI/Art/Buttons/checkbox_checked.dds"
  let textureClicked = textureMouseOver
  const width = 16
  const height = 16
  const alignControl = parent
  const hideButton = true

  mapFiltersFragment.RegisterCallback("StateChange", (_oldState, newState) => {
    if (newState === SCENE_FRAGMENT_SHOWN) {
      const showWorldMapFilterAllButtons =
        STATE.settingsVars.settings.showEnDisableAllFilterButtons === true
      if (showWorldMapFilterAllButtons) {
        if (STATE.wolrdMapFilterEnableAllButton === undefined) {
          name = "FCOChangeStuff_WoldMapFilter_ButtonEnableAll"
          tooltipText = "Enable all filter"
          callbackFunction = () => {
            setAllWorldMapFilters(1)
          }
          const btnWMFenableAll = createButton(
            parent,
            name,
            callbackFunction,
            onMouseUpCallbackFunction,
            onMouseUpCallbackFunctionMouseButton,
            text,
            font,
            tooltipText,
            tooltipAlign,
            textureNormal,
            textureMouseOver,
            textureClicked,
            width,
            height,
            left,
            top,
            alignMain,
            alignBackup,
            alignControl,
            hideButton
          )
          STATE.wolrdMapFilterEnableAllButton = btnWMFenableAll
        }
        if (STATE.wolrdMapFilterDisableAllButton === undefined) {
          name = "FCOChangeStuff_WoldMapFilter_ButtonDisableAll"
          tooltipText = "Disable all filter"
          callbackFunction = () => {
            setAllWorldMapFilters(0)
          }
          textureNormal = "/EsoUI/Art/Buttons/checkbox_unchecked.dds"
          textureMouseOver = "/EsoUI/Art/Buttons/checkbox_unchecked.dds"
          textureClicked = textureMouseOver
          const btnWMFdisableAll = createButton(
            parent,
            name,
            callbackFunction,
            onMouseUpCallbackFunction,
            onMouseUpCallbackFunctionMouseButton,
            text,
            font,
            tooltipText,
            tooltipAlign,
            textureNormal,
            textureMouseOver,
            textureClicked,
            width,
            height,
            left2,
            top,
            alignMain,
            alignBackup,
            alignControl,
            hideButton
          )
          STATE.wolrdMapFilterDisableAllButton = btnWMFdisableAll
        }
      }
      const enableAllWMFbutton = STATE.wolrdMapFilterEnableAllButton
      const disableAllWMFbutton = STATE.wolrdMapFilterDisableAllButton
      if (enableAllWMFbutton !== undefined) {
        enableAllWMFbutton.SetHidden(!showWorldMapFilterAllButtons)
        enableAllWMFbutton.SetMouseEnabled(showWorldMapFilterAllButtons)
      }
      if (disableAllWMFbutton !== undefined) {
        disableAllWMFbutton.SetHidden(!showWorldMapFilterAllButtons)
        disableAllWMFbutton.SetMouseEnabled(showWorldMapFilterAllButtons)
      }
    } else if (newState === SCENE_FRAGMENT_HIDING) {
      const enableAllWMFbutton = STATE.wolrdMapFilterEnableAllButton
      const disableAllWMFbutton = STATE.wolrdMapFilterDisableAllButton
      if (enableAllWMFbutton !== undefined) {
        enableAllWMFbutton.SetHidden(true)
        enableAllWMFbutton.SetMouseEnabled(false)
      }
      if (disableAllWMFbutton !== undefined) {
        disableAllWMFbutton.SetHidden(true)
        disableAllWMFbutton.SetMouseEnabled(false)
      }
    }
  })

  MAP_FILTERS_FRAGMENT_REGISTERED = true
}

function hasPlayerPin(this: void, value: unknown): value is WorldMapPinManagerWithPlayerPin {
  return type(value) === "table"
}

export function playerPinPingPong(this: void, fromKeybind?: boolean): undefined {
  const settings = STATE.settingsVars.settings
  if (settings.pingPongPlayerPinOnMapOpen !== true) {
    if (fromKeybind !== true) {
      return
    }
  }
  const pinManager = ZO_WorldMap_GetPinManager()
  if (!hasPlayerPin(pinManager)) {
    return
  }
  const myPin = pinManager.GetPlayerPin().GetControl()
  if (myPin !== undefined) {
    let scaling = settings.pingPongPlayerPinOnMapOpenScaling
    if (
      MAP_MODE_VOTANS_MINIMAP !== undefined &&
      ZO_WorldMap_GetMode() === MAP_MODE_VOTANS_MINIMAP
    ) {
      scaling = 2
    }
    const [animation, timeline] = CreateSimpleAnimation(ANIMATION_SCALE, myPin, 150)
    animation.SetScaleValues(1, scaling)
    animation.SetDuration(150)
    timeline.SetPlaybackType(ANIMATION_PLAYBACK_PING_PONG, 3)
    timeline.PlayFromStart()
  }
}

let IS_MAP_LOCATION_VISIBLE_HOOKED = false
export function hideCityPois(this: void): undefined {
  if (STATE.settingsVars.settings.hidePOIsInCities !== true) {
    return
  }

  if (IS_MAP_LOCATION_VISIBLE_HOOKED) {
    return
  }
  ZO_PreHook("IsMapLocationVisible", (_locationIndex) => {
    if (STATE.settingsVars.settings.hidePOIsInCities !== true) {
      return false
    }
    if (GetParentZoneId !== undefined) {
      const zoneId = GetParentZoneId()
      if (zoneId !== undefined) {
        const zoneIndex = GetUnitZoneIndex("player")
        if (zoneIndex !== undefined) {
          const subZoneId = GetZoneId(zoneIndex)
          if (subZoneId !== undefined) {
            return true
          }
        }
      }
    }
    return false
  })
  IS_MAP_LOCATION_VISIBLE_HOOKED = true
}

export function mapZoneStoryHide(this: void, _doHide?: boolean): undefined {
  const settings = STATE.settingsVars.settings
  if (settings.hideMapZoneStory === true) {
    if (IsInGamepadPreferredMode()) {
      mapSceneKeyboard.RemoveFragment(mapZoneStoryFragmentGamepad)
    } else {
      mapSceneKeyboard.RemoveFragment(mapZoneStoryFragmentKeyboard)
    }
  } else {
    if (IsInGamepadPreferredMode()) {
      mapSceneKeyboard.AddFragment(mapZoneStoryFragmentGamepad)
    } else {
      mapSceneKeyboard.AddFragment(mapZoneStoryFragmentKeyboard)
    }
  }
}

interface ZoneGuideAddon {
  toggleZoneGuide?: unknown
  [key: string]: unknown
}

export function mapStuff(this: void, mode: string): undefined {
  const type = mode !== "" ? mode : "all"
  const settings = STATE.settingsVars.settings
  if (
    type === "all" ||
    type === "mount" ||
    type === "hidezonestory" ||
    type === "playerpinpingpong"
  ) {
    function sceneCallBack(this: void, pOldState: number, pNewState: number): undefined {
      if (pOldState === SCENE_SHOWN && pNewState === SCENE_HIDING) {
        if (settings.reOpenMapOnMounting === true) {
          if (IsMounted()) {
            STATE.worldMapShown = true
          }
        }
      } else if (pNewState === SCENE_SHOWING) {
        if (settings.hideMapZoneStory === true) {
          if (IsInGamepadPreferredMode()) {
            mapSceneKeyboard.RemoveFragment(mapZoneStoryFragmentGamepad)
          } else {
            mapSceneKeyboard.RemoveFragment(mapZoneStoryFragmentKeyboard)
          }
        } else {
          if (IsInGamepadPreferredMode()) {
            mapSceneKeyboard.AddFragment(mapZoneStoryFragmentGamepad)
          } else {
            mapSceneKeyboard.AddFragment(mapZoneStoryFragmentKeyboard)
          }
        }
      } else if (pNewState === SCENE_SHOWN) {
        if (settings.pingPongPlayerPinOnMapOpen === true) {
          playerPinPingPong()
        }
      }
    }
    function sceneFragmentCallBack(
      this: void,
      _pOldFragmentState: number,
      pNewFragmentState: number
    ): undefined {
      if (pNewFragmentState === SCENE_FRAGMENT_SHOWN) {
        mapZoneStoryHide(true)
      }
    }
    void sceneFragmentCallBack
    if (!MAP_SCENE_CHANGE_CALLBACK_REGISTERED) {
      mapSceneKeyboard.RegisterCallback("StateChange", (oldState, newState) => {
        sceneCallBack(oldState, newState)
      })
      mapSceneGamepad.RegisterCallback("StateChange", (oldState, newState) => {
        sceneCallBack(oldState, newState)
      })
      let bmuGlobal: ZoneGuideAddon | undefined
      if (BMU !== undefined && BMU.toggleZoneGuide !== undefined) {
        bmuGlobal = BMU
      }
      if (
        bmuGlobal === undefined &&
        Teleporter !== undefined &&
        Teleporter.toggleZoneGuide !== undefined
      ) {
        bmuGlobal = Teleporter
      }
      if (bmuGlobal !== undefined) {
        ZO_PreHook(bmuGlobal, "toggleZoneGuide", (doShow) => {
          if (doShow === true && settings.hideMapZoneStory === true) {
            if (settings.hideMapZoneStoryBeamMeUpAllowedToShow !== true) {
              return true
            }
          }
        })
      }
      MAP_SCENE_CHANGE_CALLBACK_REGISTERED = true
    }
    if (settings.reOpenMapOnMounting !== true) {
      EM.UnregisterForEvent(STATE.addonVars.addonName, EVENT_MOUNTED_STATE_CHANGED)
    } else {
      EM.RegisterForEvent(
        STATE.addonVars.addonName,
        EVENT_MOUNTED_STATE_CHANGED,
        onMountStateChanged
      )
    }
  }
  if (type === "all" || type === "filter") {
    if (settings.showEnDisableAllFilterButtons === true) {
      worldMapFilterButtons()
    }
  }
  if (type === "all" || type === "cityPOIs") {
    hideCityPois()
  }
}
