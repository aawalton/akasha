import { asAnyTable, asAnyTableMember, asMiniMapPin, asNumber } from "../casts"
import { createAsyncTask, dbg, GetScene, pins } from "./shared"
import { asMiniMapPinManager } from "../casts"
import { type WayshrineCell, zoomDone } from "./tweaks-shared"

const SIXTY_FPS_FRAME_BUDGET_SECONDS = 0.016

export function installDeferRefreshes(this: void): undefined {
  function DeferRefresh(
    this: void,
    methodName: string,
    identifier: string,
    delay: number
  ): undefined {
    const task = createAsyncTask("VOTAN_" + identifier)
    const glob = asAnyTable(globalThis)
    const orgMethod = glob[methodName]
    function runRefresh(this: void, asyncTask: AnyAsyncTask): undefined {
      asyncTask.WaitUntil(zoomDone).Then(orgMethod)
    }
    glob[methodName] = asAnyTableMember(function (this: void): undefined {
      task.Cancel().ThenDelay(GetScene().IsShowing() ? 0 : delay * 7, runRefresh)
    })
  }

  DeferRefresh("ZO_WorldMap_RefreshWorldEvents", "MAP_RefreshWorldEvents", 50)
  DeferRefresh("ZO_WorldMap_RefreshObjectives", "MAP_RefreshObjectives", 50)
  DeferRefresh("ZO_WorldMap_RefreshAllPOIs", "MAP_RefreshPOIs", 40)
  DeferRefresh("ZO_WorldMap_RefreshKeeps", "MAP_RefreshKeeps", 30)
  DeferRefresh("ZO_WorldMap_RefreshKillLocations", "MAP_RefreshKillLocations", 60)
  DeferRefresh("ZO_WorldMap_RefreshWayshrines", "MAP_RefreshWayshrines", 10)
  DeferRefresh("ZO_WorldMap_RefreshForwardCamps", "MAP_RefreshForwardCamps", 70)
  DeferRefresh(
    "ZO_WorldMap_RefreshAccessibleAvAGraveyards",
    "MAP_RefreshAccessibleAvAGraveyards",
    80
  )

  return undefined
}

export function installRefreshCustomPins(this: void, cell: WayshrineCell): undefined {
  const async = LibAsync
  const task = createAsyncTask("VOTANS_MAP_CUSTOM_PIN_UPDATE")
  function OnError(this: void, err: unknown): undefined {
    d("Error in custom pin addon", err)
  }
  task.OnError(OnError)
  const refreshPinType: AnyTable = asAnyTable({})

  function WayshrineDone(this: void): boolean {
    return cell.node == null
  }

  let customPins: AnyTable
  function drawPin(this: void, pinTypeId: number, pinData: AnyTable): undefined {
    if (pinData.enabled && refreshPinType[pinTypeId]) {
      let runTime = GetGameTimeSeconds()
      refreshPinType[pinTypeId] = undefined
      const layoutCallback = pinData.layoutCallback
      if (layoutCallback != null) {
        layoutCallback(customPins)
      }
      if (async.GetDebug()) {
        const start = GetFrameTimeSeconds()
        const now = GetGameTimeSeconds()
        const freezeTime = now - start
        runTime = now - runTime
        if (freezeTime > SIXTY_FPS_FRAME_BUDGET_SECONDS) {
          dbg(
            "%s Freeze!!! used %ims, new frametime %ims",
            pinData.pinTypeString,
            runTime * 1000,
            freezeTime * 1000
          )
        }
      }
    }
  }
  function drawPins(this: void, _pinManager: AnyTable): undefined {
    task.For(pairs(refreshPinType)).Do(drawPin)
  }
  function removePinType(this: void, pinTypeId: number, pinData: AnyTable): undefined {
    asMiniMapPinManager(customPins).RemovePins(pinData.pinTypeString)
    refreshPinType[pinTypeId] = asAnyTableMember(pinData)
  }
  function startDrawPins(this: void): undefined {
    drawPins(customPins)
  }

  ZO_WorldMapPins_Manager.RefreshCustomPins = asAnyTableMember(function (
    this: AnyTable,
    optionalPinType?: number
  ): undefined {
    customPins = this
    if (optionalPinType != null) {
      const pinData = asAnyTable(this.customPins)[optionalPinType]
      if (pinData != null) {
        refreshPinType[optionalPinType] = pinData
      } else {
        return
      }
    } else {
      for (const [pinTypeId, pinData] of pairs(asAnyTable(this.customPins))) {
        refreshPinType[pinTypeId] = pinData
      }
    }
    task.Cancel().Call(function (this: void, asyncTask: AnyAsyncTask): undefined {
      asyncTask
        .For(pairs(refreshPinType))
        .Do(removePinType)
        .WaitUntil(WayshrineDone)
        .WaitUntil(zoomDone)
        .Then(startDrawPins)
    })
  })

  return undefined
}

export function installUpdatePinsForMapSizeChange(this: void): undefined {
  const task = createAsyncTask("VOTANS_MAP_UPDATE_MAP_SIZE_CHANGE")
  const orgUpdatePinsForMapSizeChange = ZO_WorldMapPins_Manager.UpdatePinsForMapSizeChange
  let lastW = -1
  let lastH = -1
  let lastZone: unknown = -1
  let pinsMgr: AnyTable
  let w = 0
  let h = 0
  function updateLocationAndSize(this: void, _pinKey: unknown, pin: AnyTable): undefined {
    asMiniMapPin(pin).UpdateLocation()
    asMiniMapPin(pin).UpdateSize()
  }
  function callResizeCallback(this: void, _pinTypeId: number, pinData: AnyTable): undefined {
    if (pinData.enabled && pinData.resizeCallback) {
      const resizeCallback = pinData.resizeCallback
      if (resizeCallback != null) {
        resizeCallback(pinsMgr, w, h)
      }
    }
  }
  function resizePins(this: void, asyncTask: AnyAsyncTask): undefined {
    const pinControls = asAnyTable(asMiniMapPinManager(pinsMgr).GetActiveObjects())
    asyncTask
      .For(pairs(pinControls))
      .Do(updateLocationAndSize)
      .For(pairs(asAnyTable(pinsMgr.customPins)))
      .Do(callResizeCallback)
  }
  function updatePlayerPinLevel(this: void): undefined {
    const control = asMiniMapPin(pins().playerPin).GetControl()
    const labelControl = control.GetNamedChild("Label")
    const overlayControl = control.GetNamedChild("Background")
    const highlightControl = control.GetNamedChild("Highlight")
    const playerPinData = asAnyTable(asAnyTable(ZO_MapPin).PIN_DATA)[MAP_PIN_TYPE_PLAYER]
    const pinLevel = zo_max(asNumber(asAnyTable(playerPinData).level), 1)
    control.SetDrawLevel(pinLevel)
    overlayControl.SetDrawLevel(pinLevel)
    highlightControl.SetDrawLevel(pinLevel - 1)
    labelControl.SetDrawLevel(pinLevel + 1)
  }
  ZO_WorldMapPins_Manager.UpdatePinsForMapSizeChange = asAnyTableMember(function (
    this: AnyTable
  ): unknown {
    const [dw, dh] = ZO_WorldMapContainer.GetDimensions()
    w = dw
    h = dh
    const zone = GetMapTileTexture()
    if (lastW !== w || lastH !== h || lastZone !== zone) {
      lastW = w
      lastH = h
      lastZone = zone
      pinsMgr = this

      task.Cancel()

      updatePlayerPinLevel()

      if (GetScene().IsShowing()) {
        return orgUpdatePinsForMapSizeChange(this)
      }

      task.Call(resizePins)
    }
    return undefined
  })

  return undefined
}
