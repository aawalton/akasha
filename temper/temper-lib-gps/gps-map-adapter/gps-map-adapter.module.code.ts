import {
  asGlobalFnTable,
  asGlobalObjectTable,
  asSetMapResultFn,
} from "../gps-casts/gps-casts.module.code.ts"
import { INTERNAL, lib } from "../gps-lib-state/gps-lib-state.module.code.ts"
import type {
  MapAdapterClass,
  MapAdapterInstance,
  WorldSizeInstance,
} from "../gps-types/gps-types.module.code.ts"
import { WorldSize } from "../gps-world-size/gps-world-size.module.code.ts"

const CALIBRATION = { x: 0, y: 0 }

const MapAdapter = ZO_Object.Subclass<MapAdapterClass>()

MapAdapter.New = function (this: MapAdapterClass): MapAdapterInstance {
  const object = ZO_Object.New<MapAdapterInstance>(this)
  object.Initialize()
  return object
}

MapAdapter.Initialize = function (this: MapAdapterInstance): undefined {
  this.anchor = ZO_Anchor.New()
  this.panAndZoom = ZO_WorldMap_GetPanAndZoom()
  this.sizeIdWorldSize = {}
  this.original = {}
  this.HookSetMapToFunction("SetMapToQuestCondition")
  this.HookSetMapToFunction("SetMapToQuestStepEnding")
  this.HookSetMapToFunction("SetMapToQuestZone")
  this.HookSetMapToFunction("SetMapToMapListIndex")
  this.HookSetMapToFunction("SetMapToAutoMapNavigationTargetPosition")
  this.HookSetMapToFunction("SetMapToDigSitePosition")
  this.HookSetMapToFunction("SetMapToPlayerLocation")
  this.HookSetMapToFunction("SetMapToMapId")
  this.HookSetMapToFunction("ProcessMapClick", true, true)
  this.HookSetMapToFunction("SetMapFloor", true)

  const tamrielMapId = 27
  const [cx, cy] = GetUniversallyNormalizedMapInfo(tamrielMapId)
  CALIBRATION.x = cx
  CALIBRATION.y = cy
}

MapAdapter.HookSetMapToFunction = function (
  this: MapAdapterInstance,
  funcName: string,
  returnToInitialMap?: boolean,
  skipSecondCall?: boolean
): undefined {
  const globals = asGlobalFnTable(_G)
  const orgFunction = globals[funcName]
  if (orgFunction === undefined) {
    return
  }
  this.original[funcName] = orgFunction
  globals[funcName] = asSetMapResultFn(function (
    this: void,
    ...args: unknown[]
  ): number | undefined {
    let result = orgFunction(...args)
    if (result !== SET_MAP_RESULT_FAILED && lib.GetCurrentMapMeasurement() === undefined) {
      INTERNAL.logger.Debug(funcName)

      const [, mapResult] = lib.CalculateMapMeasurement(returnToInitialMap)
      if (mapResult !== SET_MAP_RESULT_CURRENT_MAP_UNCHANGED) {
        result = mapResult
      }

      if (skipSecondCall === true) {
        return undefined
      }
      orgFunction(...args)
    }

    return result
  })
}

function fakeIsMapChangingAllowed(this: void): boolean {
  return true
}
function fakeSetMapToMapListIndex(this: void): number {
  return SET_MAP_RESULT_MAP_CHANGED
}
const FAKE_CALLBACK_MANAGER = {
  FireCallbacks(): undefined {
    return undefined
  },
}

MapAdapter.SetPlayerChoseCurrentMap = function (this: MapAdapterInstance): undefined {
  const globals = asGlobalObjectTable(_G)
  const oldIsChangingAllowed = globals.ZO_WorldMap_IsMapChangingAllowed
  globals.ZO_WorldMap_IsMapChangingAllowed = fakeIsMapChangingAllowed

  const oldSetMapToMapListIndex = globals.SetMapToMapListIndex
  globals.SetMapToMapListIndex = fakeSetMapToMapListIndex

  const oldCallbackManager = globals.CALLBACK_MANAGER
  globals.CALLBACK_MANAGER = FAKE_CALLBACK_MANAGER

  ZO_WorldMap_SetMapByIndex()

  globals.ZO_WorldMap_IsMapChangingAllowed = oldIsChangingAllowed
  globals.SetMapToMapListIndex = oldSetMapToMapListIndex
  globals.CALLBACK_MANAGER = oldCallbackManager
}

MapAdapter.SetCurrentZoom = function (this: MapAdapterInstance, zoom: number): unknown {
  return this.panAndZoom.SetCurrentNormalizedZoom(zoom)
}

MapAdapter.GetCurrentZoom = function (this: MapAdapterInstance): number {
  return this.panAndZoom.GetCurrentNormalizedZoom()
}

MapAdapter.SetCurrentOffset = function (
  this: MapAdapterInstance,
  offsetX: number,
  offsetY: number
): unknown {
  return this.panAndZoom.SetCurrentOffset(offsetX, offsetY)
}

MapAdapter.GetCurrentOffset = function (
  this: MapAdapterInstance
): LuaMultiReturn<[number, number]> {
  const anchor = this.anchor
  anchor.SetFromControlAnchor(ZO_WorldMapContainer, 0)
  return $multi(anchor.GetOffsetX(), anchor.GetOffsetY())
}

MapAdapter.GetPlayerPosition = function (
  this: MapAdapterInstance
): LuaMultiReturn<[number, number, number, boolean, boolean]> {
  return GetMapPlayerPosition("player")
}

MapAdapter.GetPlayerWorldPosition = function (
  this: MapAdapterInstance
): LuaMultiReturn<[number, number, number, number]> {
  const [zoneId, pwx, pwh, pwy] = GetUnitRawWorldPosition("player")
  return $multi(zoneId, pwx, pwh, pwy)
}

MapAdapter.GetNormalizedPositionFromWorld = function (
  this: MapAdapterInstance,
  zoneId: number,
  worldX: number,
  worldY: number,
  worldZ: number
): LuaMultiReturn<[number, number]> {
  return GetNormalizedWorldPosition(zoneId, worldX, worldY, worldZ)
}

MapAdapter.GetPlayerZoneId = function (this: MapAdapterInstance): number {
  const [zoneId] = GetUnitWorldPosition("player")
  return zoneId
}

MapAdapter.GetCurrentMapIndex = function (this: MapAdapterInstance): number {
  return GetCurrentMapIndex() ?? 0
}

MapAdapter.GetCurrentZoneId = function (this: MapAdapterInstance): number {
  return GetZoneId(GetCurrentMapZoneIndex())
}

MapAdapter.GetCurrentMapIdentifier = function (this: MapAdapterInstance): number {
  return GetCurrentMapId()
}

MapAdapter.GetMapFloorInfo = function (this: MapAdapterInstance): LuaMultiReturn<[number, number]> {
  return GetMapFloorInfo()
}

MapAdapter.IsCurrentMapPlayerLocation = function (this: MapAdapterInstance): boolean {
  return DoesCurrentMapMatchMapForPlayerLocation()
}

MapAdapter.GetFormattedMapName = function (this: MapAdapterInstance, mapIndex: number): string {
  return zo_strformat("<<C:1>>", GetMapNameByIndex(mapIndex))
}

MapAdapter.IsCurrentMapZoneMap = function (this: MapAdapterInstance): boolean {
  return GetMapType() === MAPTYPE_ZONE && GetMapContentType() !== MAP_CONTENT_DUNGEON
}

MapAdapter.IsCurrentMapCosmicMap = function (this: MapAdapterInstance): boolean {
  return GetMapType() === MAPTYPE_COSMIC
}

MapAdapter.MapZoomOut = function (this: MapAdapterInstance): unknown {
  return MapZoomOut()
}

MapAdapter.SetMapToMapListIndexWithoutMeasuring = function (
  this: MapAdapterInstance,
  mapIndex: number
): number {
  const original = this.original.SetMapToMapListIndex
  if (original === undefined) {
    return SET_MAP_RESULT_FAILED
  }
  return original(mapIndex)
}

MapAdapter.ProcessMapClickWithoutMeasuring = function (
  this: MapAdapterInstance,
  x: number,
  y: number
): number {
  const original = this.original.ProcessMapClick
  if (original === undefined) {
    return SET_MAP_RESULT_FAILED
  }
  return original(x, y)
}

MapAdapter.SetMapToMapIdWithoutMeasuring = function (
  this: MapAdapterInstance,
  mapId: number
): number {
  const original = this.original.SetMapToMapId
  if (original === undefined) {
    return SET_MAP_RESULT_FAILED
  }
  return original(mapId)
}

MapAdapter.GetUniversallyNormalizedMapInfo = function (
  this: MapAdapterInstance,
  mapId?: number
): LuaMultiReturn<[number, number, number, number]> {
  let [offsetX, offsetY, scaleX, scaleY] = GetUniversallyNormalizedMapInfo(
    mapId ?? this.GetCurrentMapIdentifier()
  )
  offsetX = offsetX - CALIBRATION.x
  offsetY = offsetY - CALIBRATION.y
  return $multi(offsetX, offsetY, scaleX, scaleY)
}

MapAdapter.GetWorldSize = function (
  this: MapAdapterInstance,
  sizeId: number | string
): WorldSizeInstance {
  let size = this.sizeIdWorldSize[sizeId]
  if (size === undefined) {
    size = WorldSize.New()
  }
  return size
}

MapAdapter.SetWorldSize = function (
  this: MapAdapterInstance,
  sizeId: number | string,
  size: WorldSizeInstance,
  _notSaving?: boolean
): undefined {
  this.sizeIdWorldSize[sizeId] = size
}

export { MapAdapter }
