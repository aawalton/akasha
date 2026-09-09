import { DEFAULT_TAMRIEL_SIZE } from "../gps-constants/gps-constants.module.code.ts"
import { INTERNAL, lib } from "../gps-lib-state/gps-lib-state.module.code.ts"
import { MapStack } from "../gps-map-stack/gps-map-stack.module.code.ts"
import { Measurement } from "../gps-measurement/gps-measurement.module.code.ts"
import type {
  MapAdapterInstance,
  MeasurementInstance,
  TamrielOMeterClass,
  TamrielOMeterInstance,
  WorldSizeInstance,
} from "../gps-types/gps-types.module.code.ts"

const TAMRIEL_MAP_INDEX = INTERNAL.TAMRIEL_MAP_INDEX
const BLACKREACH_ROOT_MAP_INDEX = INTERNAL.BLACKREACH_ROOT_MAP_INDEX

const TamrielOMeter = ZO_Object.Subclass<TamrielOMeterClass>()

TamrielOMeter.New = function (
  this: TamrielOMeterClass,
  adapter: MapAdapterInstance
): TamrielOMeterInstance {
  const object = ZO_Object.New<TamrielOMeterInstance>(this)
  object.Initialize(adapter)
  return object
}

TamrielOMeter.Initialize = function (
  this: TamrielOMeterInstance,
  adapter: MapAdapterInstance
): undefined {
  this.adapter = adapter
  this.mapStack = MapStack.New(this, adapter)
  this.measurements = {}
  this.savedMeasurements = {}
  this.rootMaps = {}
  this.measuring = false

  this.RegisterRootMap(BLACKREACH_ROOT_MAP_INDEX)
  this.RegisterRootMap(GetMapIndexByZoneId(347))
  this.RegisterRootMap(GetMapIndexByZoneId(980))
  this.RegisterRootMap(GetMapIndexByZoneId(1027))
  this.RegisterRootMap(GetMapIndexByZoneId(1283))
  this.RegisterRootMap(GetMapIndexByZoneId(1286))
  if (GetNumMaps() >= 50) {
    this.RegisterRootMap(GetMapIndexByZoneId(1413))
  }
  this.RegisterRootMap(TAMRIEL_MAP_INDEX)
}

TamrielOMeter.Reset = function (this: TamrielOMeterInstance): undefined {
  INTERNAL.logger.Info("Removing all measurements")
  ZO_ClearTable(this.measurements)
}

TamrielOMeter.RegisterRootMap = function (
  this: TamrielOMeterInstance,
  mapIndex: number | undefined
): undefined {
  if (mapIndex === undefined) {
    return
  }
  INTERNAL.logger.Debug("Register root map", this.adapter.GetFormattedMapName(mapIndex))
  this.rootMaps[mapIndex] = false
}

TamrielOMeter.GetRootMapMeasurement = function (
  this: TamrielOMeterInstance,
  mapIndex: number
): MeasurementInstance | false | undefined {
  return this.rootMaps[mapIndex]
}

TamrielOMeter.GetMeasurement = function (
  this: TamrielOMeterInstance,
  id: number
): MeasurementInstance | undefined {
  return this.measurements[id]
}

TamrielOMeter.SetMeasurement = function (
  this: TamrielOMeterInstance,
  measurement: MeasurementInstance,
  isRootMap: boolean
): undefined {
  this.measurements[measurement.GetId()] = measurement
  if (isRootMap) {
    this.rootMaps[measurement.GetMapIndex()] = measurement
  }
}

TamrielOMeter.SetMeasuring = function (this: TamrielOMeterInstance, measuring: boolean): undefined {
  const changed = this.measuring !== measuring
  this.measuring = measuring
  if (changed) {
    CALLBACK_MANAGER.FireCallbacks(lib.LIB_EVENT_STATE_CHANGED, measuring)
  }
}

TamrielOMeter.IsMeasuring = function (this: TamrielOMeterInstance): boolean {
  return this.measuring
}

TamrielOMeter.ClearCurrentMapMeasurement = function (this: TamrielOMeterInstance): undefined {
  const mapId = this.adapter.GetCurrentMapIdentifier()
  const measurement = this.GetMeasurement(mapId)

  if (measurement !== undefined && measurement.mapIndex !== TAMRIEL_MAP_INDEX) {
    INTERNAL.logger.Info("Removing current map measurements")
    this.measurements[measurement.GetId()] = undefined
    this.rootMaps[measurement.mapIndex] = false
  }
}

TamrielOMeter.GetCurrentMapMeasurement = function (
  this: TamrielOMeterInstance
): MeasurementInstance | undefined {
  const mapId = this.adapter.GetCurrentMapIdentifier()
  const measurement = this.GetMeasurement(mapId)

  if (measurement === undefined) {
    const [,] = this.CalculateMapMeasurement(mapId)
  }

  return this.measurements[mapId]
}

TamrielOMeter.GetMapMeasurementByMapId = function (
  this: TamrielOMeterInstance,
  mapId: number
): MeasurementInstance | undefined {
  const measurement = this.GetMeasurement(mapId)

  if (measurement === undefined) {
    const [,] = this.CalculateMapMeasurement(mapId)
  }

  return this.measurements[mapId]
}

TamrielOMeter.TryCalculateRootMapMeasurement = function (
  this: TamrielOMeterInstance,
  rootMapIndex: number
): MeasurementInstance | undefined {
  const mapId = GetMapIdByIndex(rootMapIndex)
  const existing = this.GetMeasurement(mapId)
  if (existing === undefined) {
    const [offsetX, offsetY, scaleX, scaleY] = this.adapter.GetUniversallyNormalizedMapInfo(mapId)
    const [, , , zoneIndex] = GetMapInfoById(mapId)
    const zoneId = GetZoneId(zoneIndex)

    const measurement = Measurement.New()
    measurement.SetId(mapId)
    measurement.SetMapIndex(rootMapIndex)
    measurement.SetZoneId(zoneId)
    measurement.SetScale(scaleX, scaleY)
    measurement.SetOffset(offsetX, offsetY)
    this.SetMeasurement(measurement, true)
  }

  return existing
}

TamrielOMeter.CalculateMapMeasurement = function (
  this: TamrielOMeterInstance,
  mapId?: number | boolean
): LuaMultiReturn<[boolean, number]> {
  const adapter = this.adapter

  let resolvedMapId: number
  if (typeof mapId !== "number") {
    resolvedMapId = adapter.GetCurrentMapIdentifier()
  } else {
    resolvedMapId = mapId
  }

  if (resolvedMapId === 0 || this.GetMeasurement(resolvedMapId) !== undefined) {
    return $multi(false, SET_MAP_RESULT_CURRENT_MAP_UNCHANGED)
  }

  const [offsetX, offsetY, scaleX, scaleY] = adapter.GetUniversallyNormalizedMapInfo(resolvedMapId)
  const zoneId = adapter.GetCurrentZoneId()
  const mapIndex = adapter.GetCurrentMapIndex()

  const measurement = Measurement.New()
  measurement.SetId(resolvedMapId)
  measurement.SetMapIndex(mapIndex)
  measurement.SetZoneId(zoneId)
  measurement.SetScale(scaleX, scaleY)
  measurement.SetOffset(offsetX, offsetY)
  this.SetMeasurement(measurement, this.rootMaps[mapIndex] !== undefined)

  return $multi(true, SET_MAP_RESULT_CURRENT_MAP_UNCHANGED)
}

TamrielOMeter.FindRootMapMeasurementForCoordinates = function (
  this: TamrielOMeterInstance,
  x: number,
  y: number
): MeasurementInstance | undefined {
  INTERNAL.logger.Debug("FindRootMapMeasurementForCoordinates(%f, %f)", x, y)
  for (const [rootMapIndex, rootValue] of pairs(this.rootMaps)) {
    let measurement: MeasurementInstance | false | undefined = rootValue
    if (measurement === false || measurement === undefined) {
      measurement = this.TryCalculateRootMapMeasurement(rootMapIndex)
    }

    if (measurement === undefined) {
      continue
    }
    if (measurement.Contains(x, y)) {
      INTERNAL.logger.Debug("Point is inside " + this.adapter.GetFormattedMapName(rootMapIndex))
      return measurement
    }
  }
  INTERNAL.logger.Warn("No matching root map found for coordinates (%f, %f)", x, y)
  return undefined
}

TamrielOMeter.PushCurrentMap = function (this: TamrielOMeterInstance): undefined {
  return this.mapStack.Push()
}

TamrielOMeter.PopCurrentMap = function (this: TamrielOMeterInstance): number {
  return this.mapStack.Pop()
}

function getMapSizeId(
  this: void,
  _self: TamrielOMeterInstance,
  mapId: number
): LuaMultiReturn<[string, number]> {
  const [zoneId, pwx1, , pwy1] = GetUnitRawWorldPosition("player")
  const [, pwx2, , pwy2] = GetUnitWorldPosition("player")
  return $multi(
    string.format(
      "%i:%i:%i:%i",
      mapId,
      zoneId,
      math.floor((pwx1 - pwx2) / 10000 + 0.5),
      math.floor((pwy1 - pwy2) / 10000 + 0.5)
    ),
    zoneId
  )
}

function getCurrentWorldSize(this: void, self: TamrielOMeterInstance): WorldSizeInstance {
  const adapter = self.adapter
  SetMapToPlayerLocation()
  const mapId = adapter.GetCurrentMapIdentifier()
  if (mapId === 0) {
    return adapter.GetWorldSize(0)
  }

  const [mapSizeId, zoneId] = getMapSizeId(self, mapId)
  const size = adapter.GetWorldSize(mapSizeId)
  if (!size.IsValid()) {
    const [, pwx, pwh, pwy] = adapter.GetPlayerWorldPosition()
    const [localX, localY] = adapter.GetNormalizedPositionFromWorld(zoneId, pwx, pwh, pwy)
    if (localX === 0 && localY === 0) {
      return adapter.GetWorldSize(0)
    }

    size.SetMapId(mapId)
    size.SetZoneId(zoneId)
    adapter.SetWorldSize(mapSizeId, size, true)

    INTERNAL.logger.Debug(
      "Calculate current world size of",
      mapId,
      "for zone",
      zoneId,
      ", Id",
      mapSizeId
    )

    const fetched = self.GetCurrentMapMeasurement()
    if (fetched === undefined) {
      error("LibGPS could not measure the current map")
    }
    const measurement: MeasurementInstance = fetched
    let range: number
    if (measurement.scaleX < 0.002) {
      range = 707
      INTERNAL.logger.Debug("3500 units")
    } else if (measurement.scaleX < 0.02) {
      range = 2475
      INTERNAL.logger.Debug("1000 units")
    } else {
      range = 7071
      INTERNAL.logger.Debug("10000 units")
    }

    function getScale(this: void, rx: number, ry: number): number {
      const [wx1, wy1] = adapter.GetNormalizedPositionFromWorld(
        zoneId,
        pwx + (localX < 0.5 ? range : -range) * rx,
        pwh,
        pwy + (localY < 0.5 ? range : -range) * ry
      )

      INTERNAL.logger.Debug("ref-point (normalized): ", wx1, "x", wy1)

      const [wwX, wwZ, wwY] = measurement.ToWorld(wx1, wy1)
      const [wpX1, wpY1] = adapter.GetNormalizedPositionFromWorld(zoneId, wwX, wwZ, wwY)
      INTERNAL.logger.Debug("ref-point (normalized real): ", wpX1, "x", wpY1)
      let dx = wx1 - localX
      let dy = wy1 - localY
      let correctScale = dx * dx + dy * dy
      dx = wpX1 - localX
      dy = wpY1 - localY
      correctScale = math.sqrt(correctScale / (dx * dx + dy * dy))
      return correctScale
    }
    const correctScale = math.max(
      getScale(1, 1),
      getScale(1, -1),
      getScale(-1, 1),
      getScale(-1, -1)
    )

    const worldSizeX = math.floor(correctScale * DEFAULT_TAMRIEL_SIZE * 0.01 + 0.25) * 100
    const worldSizeY = math.floor(correctScale * DEFAULT_TAMRIEL_SIZE * 0.01 + 0.25) * 100
    INTERNAL.logger.Debug("worldSize corrected: ", worldSizeX, "x", worldSizeY)

    size.SetSize(worldSizeX, worldSizeY)
    adapter.SetWorldSize(mapSizeId, size)
  }
  return size
}

TamrielOMeter.GetCurrentWorldSize = function (this: TamrielOMeterInstance): WorldSizeInstance {
  const adapter = this.adapter
  let size: WorldSizeInstance | undefined

  const mapId = adapter.GetCurrentMapIdentifier()
  if (adapter.IsCurrentMapPlayerLocation()) {
    const [mapSizeId] = getMapSizeId(this, mapId)
    size = adapter.GetWorldSize(mapSizeId)
    if (size.IsValid()) {
      return size
    }
  }

  size = getCurrentWorldSize(this)
  SetMapToMapId(mapId)
  return size
}

TamrielOMeter.GetLocalDistanceInMeters = function (
  this: TamrielOMeterInstance,
  lx1: number,
  ly1: number,
  lx2: number,
  ly2: number
): number {
  const dx = lx1 - lx2
  const dy = ly1 - ly2
  const [worldSizeX, worldSizeY] = this.GetWorldGlobalRatio()
  const measurement = this.GetCurrentMapMeasurement()
  if (measurement === undefined) {
    return 0
  }
  return (
    math.sqrt(
      dx * dx * measurement.scaleX * worldSizeX + dy * dy * measurement.scaleY * worldSizeY
    ) *
    0.01 *
    DEFAULT_TAMRIEL_SIZE
  )
}

TamrielOMeter.GetGlobalDistanceInMeters = function (
  this: TamrielOMeterInstance,
  gx1: number,
  gy1: number,
  gx2: number,
  gy2: number
): number {
  const dx = gx1 - gx2
  const dy = gy1 - gy2
  const [worldSizeX] = this.GetWorldGlobalRatio()
  const worldSize = worldSizeX * DEFAULT_TAMRIEL_SIZE
  return math.sqrt(dx * dx + dy * dy) * 0.01 * worldSize
}

const SCALE_ID_TO_GLOBAL_RATIO: Record<string, [number, number] | undefined> = {}

TamrielOMeter.GetWorldGlobalRatio = function (
  this: TamrielOMeterInstance
): LuaMultiReturn<[number, number]> {
  const adapter = this.adapter
  const mapId = adapter.GetCurrentMapIdentifier()
  const [mapSizeId] = getMapSizeId(this, mapId)

  const cached = SCALE_ID_TO_GLOBAL_RATIO[mapSizeId]
  let worldSizeX: number
  let worldSizeY: number
  if (cached === undefined) {
    const size = this.GetCurrentWorldSize()
    const [sx, sy] = size.GetSize()
    worldSizeX = sx / DEFAULT_TAMRIEL_SIZE
    worldSizeY = sy / DEFAULT_TAMRIEL_SIZE

    SCALE_ID_TO_GLOBAL_RATIO[mapSizeId] = [worldSizeX, worldSizeY]
  } else {
    worldSizeX = cached[0]
    worldSizeY = cached[1]
  }
  return $multi(worldSizeX, worldSizeY)
}

TamrielOMeter.GetGlobalWorldRatio = function (
  this: TamrielOMeterInstance
): LuaMultiReturn<[number, number]> {
  const [worldSizeX, worldSizeY] = this.GetWorldGlobalRatio()
  return $multi(1 / worldSizeX, 1 / worldSizeY)
}

export { TamrielOMeter }
