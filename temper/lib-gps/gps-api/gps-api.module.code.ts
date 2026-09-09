import { INTERNAL, lib } from "../gps-lib-state/gps-lib-state.module.code.ts"
import type {
  Lib,
  MapAdapterInstance,
  MeasurementInstance,
  TamrielOMeterInstance,
} from "../gps-types/gps-types.module.code.ts"

function requireMeter(this: void): TamrielOMeterInstance {
  const meter = INTERNAL.meter
  if (meter === undefined) {
    error("LibGPS is not initialized yet")
  }
  return meter
}

function requireAdapter(this: void): MapAdapterInstance {
  const adapter = INTERNAL.mapAdapter
  if (adapter === undefined) {
    error("LibGPS is not initialized yet")
  }
  return adapter
}

export function initApi(this: void): undefined {
  lib.IsReady = function (this: Lib): boolean {
    return DoesUnitExist("player")
  }

  lib.IsMeasuring = function (this: Lib): boolean {
    return requireMeter().IsMeasuring()
  }

  lib.ClearMapMeasurements = function (this: Lib): undefined {
    requireMeter().Reset()
  }

  lib.ClearCurrentMapMeasurement = function (this: Lib): undefined {
    requireMeter().ClearCurrentMapMeasurement()
  }

  lib.GetCurrentMapMeasurement = function (this: Lib): MeasurementInstance | undefined {
    return requireMeter().GetCurrentMapMeasurement()
  }

  lib.GetMapMeasurementByMapId = function (
    this: Lib,
    mapId: number
  ): MeasurementInstance | undefined {
    return requireMeter().GetMapMeasurementByMapId(mapId)
  }

  lib.GetCurrentMapParentZoneIndices = function (
    this: Lib
  ): LuaMultiReturn<[number, number, number]> {
    const meter = requireMeter()
    const measurement = meter.GetCurrentMapMeasurement()
    if (measurement === undefined) {
      error("LibGPS could not measure the current map")
    }
    const mapIndex = measurement.GetMapIndex()
    let zoneId = measurement.GetZoneId()

    if (zoneId === 0) {
      meter.PushCurrentMap()
      SetMapToMapListIndex(mapIndex)
      zoneId = requireAdapter().GetCurrentZoneId()
      measurement.SetZoneId(zoneId)
      meter.PopCurrentMap()
    }

    const zoneIndex = GetZoneIndex(zoneId)
    return $multi(mapIndex, zoneIndex, zoneId)
  }

  lib.CalculateMapMeasurement = function (
    this: Lib,
    returnToInitialMap?: boolean
  ): LuaMultiReturn<[boolean, number]> {
    return requireMeter().CalculateMapMeasurement(returnToInitialMap)
  }

  lib.LocalToGlobal = function (
    this: Lib,
    x: number,
    y: number
  ): LuaMultiReturn<[number, number]> | undefined {
    const measurement = requireMeter().GetCurrentMapMeasurement()
    if (measurement !== undefined) {
      return measurement.ToGlobal(x, y)
    }
    return undefined
  }

  lib.GlobalToLocal = function (
    this: Lib,
    x: number,
    y: number
  ): LuaMultiReturn<[number, number]> | undefined {
    const measurement = requireMeter().GetCurrentMapMeasurement()
    if (measurement !== undefined) {
      return measurement.ToLocal(x, y)
    }
    return undefined
  }

  lib.LocalToWorld = function (
    this: Lib,
    x: number,
    y: number
  ): LuaMultiReturn<[number, number, number]> | undefined {
    const measurement = requireMeter().GetCurrentMapMeasurement()
    if (measurement !== undefined) {
      return measurement.ToWorld(x, y)
    }
    return undefined
  }

  lib.GlobalToWorld = function (
    this: Lib,
    x: number,
    y: number
  ): LuaMultiReturn<[number, number, number]> | undefined {
    const measurement = requireMeter().GetCurrentMapMeasurement()
    if (measurement !== undefined) {
      const [localX, localY] = measurement.ToLocal(x, y)
      return measurement.ToWorld(localX, localY)
    }
    return undefined
  }

  lib.SetPlayerChoseCurrentMap = function (this: Lib): undefined {
    return requireAdapter().SetPlayerChoseCurrentMap()
  }

  lib.SetMapToRootMap = function (this: Lib, x: number, y: number): number {
    const measurement = requireMeter().FindRootMapMeasurementForCoordinates(x, y)
    if (measurement === undefined) {
      return SET_MAP_RESULT_FAILED
    }

    return requireAdapter().SetMapToMapListIndexWithoutMeasuring(measurement.GetMapIndex())
  }

  lib.MapZoomInMax = function (this: Lib, x: number, y: number): number {
    let result = lib.SetMapToRootMap(x, y)

    if (result !== SET_MAP_RESULT_FAILED) {
      const meter = requireMeter()
      const adapter = requireAdapter()

      let measurement = meter.GetCurrentMapMeasurement()
      while (measurement !== undefined) {
        const [localX, localY] = measurement.ToLocal(x, y)
        const [wouldProcess] = WouldProcessMapClick(localX, localY)
        if (!wouldProcess) {
          break
        }
        result = adapter.ProcessMapClickWithoutMeasuring(localX, localY)
        if (result === SET_MAP_RESULT_FAILED) {
          break
        }
        measurement = meter.GetCurrentMapMeasurement()
      }
    }

    return result
  }

  lib.PushCurrentMap = function (this: Lib): undefined {
    requireMeter().PushCurrentMap()
  }

  lib.PopCurrentMap = function (this: Lib): number {
    return requireMeter().PopCurrentMap()
  }

  lib.GetCurrentWorldSize = function (this: Lib): LuaMultiReturn<[number, number]> {
    const size = requireMeter().GetCurrentWorldSize()
    return $multi(size.width, size.height)
  }

  lib.GetLocalDistanceInMeters = function (
    this: Lib,
    lx1: number,
    ly1: number,
    lx2: number,
    ly2: number
  ): number {
    return requireMeter().GetLocalDistanceInMeters(lx1, ly1, lx2, ly2)
  }

  lib.GetGlobalDistanceInMeters = function (
    this: Lib,
    gx1: number,
    gy1: number,
    gx2: number,
    gy2: number
  ): number {
    return requireMeter().GetGlobalDistanceInMeters(gx1, gy1, gx2, gy2)
  }

  lib.GetWorldGlobalRatio = function (this: Lib): LuaMultiReturn<[number, number]> {
    return requireMeter().GetWorldGlobalRatio()
  }

  lib.GetGlobalWorldRatio = function (this: Lib): LuaMultiReturn<[number, number]> {
    return requireMeter().GetGlobalWorldRatio()
  }
}
