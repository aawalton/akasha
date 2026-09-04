import { asCompatLib, asGlobalObjectTable } from "../gps-casts/gps-casts.module.code.ts"
import { OLD_LIB_EVENT_STATE_CHANGED } from "../gps-constants/gps-constants.module.code.ts"
import { lib as libv3 } from "../gps-lib-state/gps-lib-state.module.code.ts"
import type { CompatLib } from "../gps-types/gps-types.module.code.ts"

function compatLocalToGlobal(
  this: void,
  x: number,
  y: number
): LuaMultiReturn<[number, number, number]> | undefined {
  const meter = libv3.internal.meter
  if (meter === undefined) {
    return undefined
  }
  const measurement = meter.GetCurrentMapMeasurement()
  if (measurement !== undefined) {
    const [gx, gy] = measurement.ToGlobal(x, y)
    return $multi(gx, gy, measurement.GetMapIndex())
  }
  return undefined
}

export function initCompatibility(this: void): undefined {
  const compat: CompatLib = asCompatLib({})

  asGlobalObjectTable(_G).LibGPS2 = compat

  const logger = libv3.internal.logger

  EVENT_MANAGER.UnregisterForEvent("LibGPS2_SaveWaypoint", EVENT_PLAYER_DEACTIVATED)
  EVENT_MANAGER.UnregisterForEvent("LibGPS2_RestoreWaypoint", EVENT_PLAYER_ACTIVATED)

  EVENT_MANAGER.UnregisterForEvent("LibGPS2_Init", EVENT_PLAYER_ACTIVATED)

  EVENT_MANAGER.UnregisterForEvent("LibGPS2_UnmuteMapPing", EVENT_MAP_PING)

  if (compat.Unload !== undefined) {
    compat.Unload()
    const suppressCount = compat.suppressCount
    if (typeof suppressCount === "number" && suppressCount > 0) {
      logger.Warn("There is a measurement in progress before loading is completed.")

      const mapPing = LibMapPing
      EVENT_MANAGER.UnregisterForUpdate("LibGPS2_Finalize")
      let remaining = suppressCount
      while (remaining > 0) {
        mapPing.UnsuppressPing(MAP_PIN_TYPE_PLAYER_WAYPOINT)
        remaining = remaining - 1
        compat.suppressCount = remaining
      }
    }
  }

  compat.LIB_EVENT_STATE_CHANGED = libv3.LIB_EVENT_STATE_CHANGED
  CALLBACK_MANAGER.RegisterCallback(
    libv3.LIB_EVENT_STATE_CHANGED,
    function (this: void, measuring: boolean): undefined {
      CALLBACK_MANAGER.FireCallbacks(OLD_LIB_EVENT_STATE_CHANGED, measuring)
    }
  )

  compat.IsReady = function (this: CompatLib): boolean {
    return libv3.IsReady()
  }

  compat.IsMeasuring = function (this: CompatLib): boolean {
    return libv3.IsMeasuring()
  }

  compat.ClearMapMeasurements = function (this: CompatLib): undefined {
    return libv3.ClearMapMeasurements()
  }

  compat.ClearCurrentMapMeasurements = function (this: CompatLib): undefined {
    return libv3.ClearCurrentMapMeasurement()
  }

  compat.GetCurrentMapMeasurements = function (this: CompatLib) {
    return libv3.GetCurrentMapMeasurement()
  }

  compat.GetCurrentMapParentZoneIndices = function (
    this: CompatLib
  ): LuaMultiReturn<[number, number]> {
    const [mapIndex, zoneIndex] = libv3.GetCurrentMapParentZoneIndices()
    return $multi(mapIndex, zoneIndex)
  }

  compat.CalculateMapMeasurements = function (
    this: CompatLib,
    returnToInitialMap?: boolean
  ): LuaMultiReturn<[boolean, number]> {
    return libv3.CalculateMapMeasurement(returnToInitialMap)
  }

  compat.LocalToGlobal = function (
    this: CompatLib,
    x: number,
    y: number
  ): LuaMultiReturn<[number, number, number]> | undefined {
    return compatLocalToGlobal(x, y)
  }

  compat.GlobalToLocal = function (
    this: CompatLib,
    x: number,
    y: number
  ): LuaMultiReturn<[number, number]> | undefined {
    return libv3.GlobalToLocal(x, y)
  }

  compat.ZoneToGlobal = function (
    this: CompatLib,
    mapIndex: number,
    x: number,
    y: number
  ): LuaMultiReturn<[number, number, number]> | undefined {
    libv3.GetCurrentMapMeasurement()
    SetMapToMapListIndex(mapIndex)
    return compatLocalToGlobal(x, y)
  }

  // @deprecated use ZO_WorldMap_GetPanAndZoom():PanToNormalizedPosition(x, y) instead
  compat.PanToMapPosition = function (this: CompatLib, x: number, y: number): undefined {
    ZO_WorldMap_GetPanAndZoom().PanToNormalizedPosition(x, y)
    return undefined
  }

  compat.SetPlayerChoseCurrentMap = function (this: CompatLib): undefined {
    return libv3.SetPlayerChoseCurrentMap()
  }

  compat.SetMapToRootMap = function (this: CompatLib, x: number, y: number): number {
    return libv3.SetMapToRootMap(x, y)
  }

  compat.MapZoomInMax = function (this: CompatLib, x: number, y: number): number {
    return libv3.MapZoomInMax(x, y)
  }

  compat.PushCurrentMap = function (this: CompatLib): undefined {
    return libv3.PushCurrentMap()
  }

  compat.PopCurrentMap = function (this: CompatLib): number {
    return libv3.PopCurrentMap()
  }
}
