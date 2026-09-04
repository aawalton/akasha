import {
  asCoordFn,
  asEsoVoidFn,
  asSuccessFn,
} from "../map-ping-casts/map-ping-casts.module.code.ts"
import {
  MAP_PIN_TAG_PLAYER_WAYPOINT,
  MAP_PIN_TAG_RALLY_POINT,
  PING_CATEGORY,
  PING_EVENT_TYPE_INDEX,
  PING_EVENT_WATCHDOG_TIME,
} from "../map-ping-constants/map-ping-constants.module.code.ts"
import { INTERNAL, LIB } from "../map-ping-lib/map-ping-lib.module.code.ts"
import type {
  CoordFn,
  GlobalFnTable,
  LmpPinManager,
  MapPingHandlerClass,
  MapPingHandlerInstance,
  PendingPing,
} from "../map-ping-types/map-ping-types.module.code.ts"
import { LeakyBucket } from "../ping-leaky-bucket/ping-leaky-bucket.module.code.ts"

const logger = INTERNAL.logger
const callback = INTERNAL.callback
const mapPingState = INTERNAL.MapPingState

const MAP_PIN_TAG: Record<number, string | undefined> = {
  [MAP_PIN_TYPE_PLAYER_WAYPOINT]: MAP_PIN_TAG_PLAYER_WAYPOINT,
  [MAP_PIN_TYPE_RALLY_POINT]: MAP_PIN_TAG_RALLY_POINT,
}

export function getPingTagFromType(this: void, pingType: number): string {
  return MAP_PIN_TAG[pingType] ?? GetGroupUnitTagByIndex(GetGroupIndexByUnitTag("player")) ?? ""
}

const MapPingHandler = ZO_Object.Subclass<MapPingHandlerClass>()

MapPingHandler.New = function (this: MapPingHandlerClass) {
  const obj = ZO_Object.New<MapPingHandlerInstance>(this)
  obj.Initialize()
  return obj
}

MapPingHandler.Initialize = function (this: MapPingHandlerInstance): undefined {
  const self = this
  const pinManager: unknown = ZO_WorldMap_GetPinManager()
  this.mapPinManager = pinManager as LmpPinManager
  this.bucket = LeakyBucket.New()
  this.mutePing = {}
  this.suppressPing = {}
  this.pingState = {}
  this.pendingPing = {}

  const everyGlobal: unknown = _G
  const g = everyGlobal as GlobalFnTable

  this.original = {
    PingMap: asEsoVoidFn(g.PingMap),
    SetPlayerWaypointByWorldLocation: asSuccessFn(g.SetPlayerWaypointByWorldLocation),
    GetMapPlayerWaypoint: asCoordFn(g.GetMapPlayerWaypoint),
    GetMapPing: asCoordFn(g.GetMapPing),
    GetMapRallyPoint: asCoordFn(g.GetMapRallyPoint),
    RemovePlayerWaypoint: asEsoVoidFn(g.RemovePlayerWaypoint),
    RemoveRallyPoint: asEsoVoidFn(g.RemoveRallyPoint),
  }

  this.getter = {}
  this.rawGetter = {}
  this.remover = {}

  const pingMapWrapper = function (
    this: void,
    pingType: number,
    mapType: number,
    x: number,
    y: number
  ): unknown {
    return self.PingMap(pingType, mapType, x, y)
  }
  const setWaypointWrapper = function (
    this: void,
    worldX: number,
    worldY: number,
    worldZ: number
  ): boolean {
    return self.SetPlayerWaypointByWorldLocation(worldX, worldY, worldZ)
  }
  const getWaypointWrapper: CoordFn = function (this: void) {
    return self.GetMapPlayerWaypoint()
  }
  const getPingWrapper: CoordFn = function (this: void, pingTag?: string) {
    return self.GetMapPing(pingTag)
  }
  const getRallyWrapper: CoordFn = function (this: void) {
    return self.GetMapRallyPoint()
  }
  const removeWaypointWrapper = function (this: void): unknown {
    return self.RemovePlayerWaypoint()
  }
  const removePingWrapper = function (this: void): undefined {
    return self.RemoveMapPing()
  }
  const removeRallyWrapper = function (this: void): undefined {
    return self.RemoveRallyPoint()
  }

  g.PingMap = asEsoVoidFn(pingMapWrapper)
  g.SetPlayerWaypointByWorldLocation = asEsoVoidFn(setWaypointWrapper)
  g.GetMapPlayerWaypoint = asEsoVoidFn(getWaypointWrapper)
  g.GetMapPing = asEsoVoidFn(getPingWrapper)
  g.GetMapRallyPoint = asEsoVoidFn(getRallyWrapper)
  g.RemovePlayerWaypoint = asEsoVoidFn(removeWaypointWrapper)
  g.RemoveRallyPoint = asEsoVoidFn(removeRallyWrapper)

  this.getter[MAP_PIN_TYPE_PLAYER_WAYPOINT] = getWaypointWrapper
  this.rawGetter[MAP_PIN_TYPE_PLAYER_WAYPOINT] = this.original.GetMapPlayerWaypoint
  this.getter[MAP_PIN_TYPE_PING] = getPingWrapper
  this.rawGetter[MAP_PIN_TYPE_PING] = this.original.GetMapPing
  this.getter[MAP_PIN_TYPE_RALLY_POINT] = getRallyWrapper
  this.rawGetter[MAP_PIN_TYPE_RALLY_POINT] = this.original.GetMapRallyPoint

  this.remover[MAP_PIN_TYPE_PLAYER_WAYPOINT] = asEsoVoidFn(removeWaypointWrapper)
  this.remover[MAP_PIN_TYPE_PING] = asEsoVoidFn(removePingWrapper)
  this.remover[MAP_PIN_TYPE_RALLY_POINT] = asEsoVoidFn(removeRallyWrapper)

  this.watchDogCallback = function (this: void) {
    self.HandleMapPingEventNotFired()
  }

  let handle = ""
  handle = INTERNAL.RegisterForEvent<[string]>(
    EVENT_ADD_ON_LOADED,
    (_eventCode: number, addonName: string) => {
      if (addonName === "ZO_Ingame") {
        INTERNAL.UnregisterForEvent(handle, EVENT_ADD_ON_LOADED)
        INTERNAL.UnregisterForEvent("ZO_WorldMap", EVENT_MAP_PING)
        WORLD_MAP_MANAGER.control.UnregisterForEvent(EVENT_MAP_PING)
        INTERNAL.RegisterForEvent<[number, number, string, number, number, boolean]>(
          EVENT_MAP_PING,
          (
            eventCode: number,
            pingEventType: number,
            pingType: number,
            pingTag: string,
            x: number,
            y: number,
            isPingOwner: boolean
          ) => {
            self.HandleMapPing(eventCode, pingEventType, pingType, pingTag, x, y, isPingOwner)
          }
        )
      }
    }
  )
}

MapPingHandler.GetKey = function (
  this: MapPingHandlerInstance,
  pingType: number,
  pingTag?: string
): string {
  const tag = pingTag ?? getPingTagFromType(pingType)
  return `${pingType}_${tag}`
}

MapPingHandler.HandleMapPing = function (
  this: MapPingHandlerInstance,
  _eventCode: number,
  pingEventType: number,
  pingType: number,
  pingTag: string,
  x: number,
  y: number,
  isPingOwner: boolean
): undefined {
  const key = this.GetKey(pingType, pingTag)
  const data = this.pendingPing[key]
  if (data !== undefined && data[PING_EVENT_TYPE_INDEX - 1] === pingEventType) {
    this.pendingPing[key] = undefined
  }

  if (pingEventType === PING_EVENT_ADDED) {
    this.HandleMapPingAdded(key, pingType, pingTag, x, y, isPingOwner)
  } else if (pingEventType === PING_EVENT_REMOVED) {
    this.HandleMapPingRemoved(key, pingType, pingTag, x, y, isPingOwner)
  }
}

MapPingHandler.HandleMapPingAdded = function (
  this: MapPingHandlerInstance,
  key: string,
  pingType: number,
  pingTag: string,
  x: number,
  y: number,
  isPingOwner: boolean
): undefined {
  logger.Verbose("Ping added", key)
  INTERNAL.FireCallbacks(callback.BEFORE_PING_ADDED, pingType, pingTag, x, y, isPingOwner)

  this.pingState[key] = mapPingState.SET
  this.mapPinManager.RemovePins(PING_CATEGORY, pingType, pingTag)

  if (!this.IsPingSuppressed(pingType, pingTag)) {
    logger.Verbose("Create pin")
    this.mapPinManager.CreatePin(pingType, pingTag, x, y)

    if (isPingOwner && !this.IsPingMuted(pingType, pingTag)) {
      logger.Verbose("Play sound")
      const sound = SOUNDS.MAP_PING
      if (sound !== undefined) {
        PlaySound(sound)
      }
    }
  }

  INTERNAL.FireCallbacks(callback.AFTER_PING_ADDED, pingType, pingTag, x, y, isPingOwner)
}

MapPingHandler.HandleMapPingRemoved = function (
  this: MapPingHandlerInstance,
  key: string,
  pingType: number,
  pingTag: string,
  x: number,
  y: number,
  isPingOwner: boolean
): undefined {
  logger.Verbose("Ping removed", key)
  INTERNAL.FireCallbacks(callback.BEFORE_PING_REMOVED, pingType, pingTag, x, y, isPingOwner)

  this.pingState[key] = mapPingState.NOT_SET
  this.mapPinManager.RemovePins(PING_CATEGORY, pingType, pingTag)

  if (
    isPingOwner &&
    !(this.IsPingSuppressed(pingType, pingTag) || this.IsPingMuted(pingType, pingTag))
  ) {
    logger.Verbose("Play sound")
    const sound = SOUNDS.MAP_PING_REMOVE
    if (sound !== undefined) {
      PlaySound(sound)
    }
  }

  INTERNAL.FireCallbacks(callback.AFTER_PING_REMOVED, pingType, pingTag, x, y, isPingOwner)
}

MapPingHandler.HandleMapPingEventNotFired = function (this: MapPingHandlerInstance): undefined {
  if (this.updateHandle !== undefined) {
    INTERNAL.UnregisterForUpdate(this.updateHandle)
  }
  for (const key in this.pendingPing) {
    const data = this.pendingPing[key]
    if (data === undefined) {
      continue
    }
    const [pingEventType, pingType, x, y, mapId] = data
    const pingTag = getPingTagFromType(pingType)
    if (GetCurrentMapId() !== mapId) {
      this.SuppressPing(pingType, pingTag)
    }
    this.HandleMapPing(0, pingEventType, pingType, pingTag, x, y, true)
    this.pendingPing[key] = undefined
    this.mutePing[key] = 0
    this.suppressPing[key] = 0
  }
}

MapPingHandler.ResetEventWatchdog = function (
  this: MapPingHandlerInstance,
  key: string,
  ...data: PendingPing
): undefined {
  this.pendingPing[key] = data
  if (this.updateHandle !== undefined) {
    INTERNAL.UnregisterForUpdate(this.updateHandle)
  }
  this.updateHandle = INTERNAL.RegisterForUpdate(PING_EVENT_WATCHDOG_TIME, this.watchDogCallback)
}

MapPingHandler.PingMap = function (
  this: MapPingHandlerInstance,
  pingType: number,
  mapType: number,
  x: number,
  y: number
): unknown {
  if (pingType === MAP_PIN_TYPE_PING && !IsUnitGrouped("player")) {
    return undefined
  }
  if (pingType === MAP_PIN_TYPE_PLAYER_WAYPOINT || this.bucket.Take()) {
    const key = this.GetKey(pingType)
    this.pingState[key] = mapPingState.SET_PENDING
    this.ResetEventWatchdog(key, PING_EVENT_ADDED, pingType, x, y, GetCurrentMapId())
    return this.original.PingMap(pingType, mapType, x, y)
  }
  return undefined
}

MapPingHandler.SetPlayerWaypointByWorldLocation = function (
  this: MapPingHandlerInstance,
  worldX: number,
  worldY: number,
  worldZ: number
): boolean {
  const success = this.original.SetPlayerWaypointByWorldLocation(worldX, worldY, worldZ)
  if (success) {
    const key = this.GetKey(MAP_PIN_TYPE_PLAYER_WAYPOINT)
    this.pingState[key] = mapPingState.SET_PENDING
  }
  return success
}

MapPingHandler.GetMapPlayerWaypoint = function (
  this: MapPingHandlerInstance
): LuaMultiReturn<[number, number]> {
  if (this.IsPingSuppressed(MAP_PIN_TYPE_PLAYER_WAYPOINT, MAP_PIN_TAG_PLAYER_WAYPOINT)) {
    return $multi(0, 0)
  }
  return this.original.GetMapPlayerWaypoint()
}

MapPingHandler.GetMapPing = function (
  this: MapPingHandlerInstance,
  pingTag?: string
): LuaMultiReturn<[number, number]> {
  if (this.IsPingSuppressed(MAP_PIN_TYPE_PING, pingTag)) {
    return $multi(0, 0)
  }
  return this.original.GetMapPing(pingTag)
}

MapPingHandler.GetMapRallyPoint = function (
  this: MapPingHandlerInstance
): LuaMultiReturn<[number, number]> {
  if (LIB.IsPingSuppressed(MAP_PIN_TYPE_RALLY_POINT, MAP_PIN_TAG_RALLY_POINT)) {
    return $multi(0, 0)
  }
  return this.original.GetMapRallyPoint()
}

MapPingHandler.RemovePlayerWaypoint = function (this: MapPingHandlerInstance): unknown {
  const key = this.GetKey(MAP_PIN_TYPE_PLAYER_WAYPOINT, MAP_PIN_TAG_PLAYER_WAYPOINT)
  this.pingState[key] = mapPingState.NOT_SET_PENDING
  this.ResetEventWatchdog(
    key,
    PING_EVENT_REMOVED,
    MAP_PIN_TYPE_PLAYER_WAYPOINT,
    0,
    0,
    GetCurrentMapId()
  )
  return this.original.RemovePlayerWaypoint()
}

MapPingHandler.RemoveMapPing = function (this: MapPingHandlerInstance): undefined {
  this.PingMap(MAP_PIN_TYPE_PING, MAP_TYPE_LOCATION_CENTERED, 0, 0)
}

MapPingHandler.RemoveRallyPoint = function (this: MapPingHandlerInstance): undefined {
  const key = this.GetKey(MAP_PIN_TYPE_RALLY_POINT, MAP_PIN_TAG_RALLY_POINT)
  this.pingState[key] = mapPingState.NOT_SET_PENDING
  this.ResetEventWatchdog(key, PING_EVENT_REMOVED, MAP_PIN_TYPE_RALLY_POINT, 0, 0)
  this.original.RemoveRallyPoint()
}

MapPingHandler.RemoveMapPingByType = function (
  this: MapPingHandlerInstance,
  pingType: number
): undefined {
  const remover = this.remover[pingType]
  if (remover !== undefined) {
    remover()
  }
}

MapPingHandler.GetMapPingByType = function (
  this: MapPingHandlerInstance,
  pingType: number,
  pingTag?: string
): LuaMultiReturn<[number, number]> {
  let x = 0
  let y = 0
  const getter = this.getter[pingType]
  if (getter !== undefined) {
    ;[x, y] = getter(pingTag ?? getPingTagFromType(pingType))
  }
  return $multi(x, y)
}

MapPingHandler.GetRawMapPingByType = function (
  this: MapPingHandlerInstance,
  pingType: number,
  pingTag?: string
): LuaMultiReturn<[number, number]> {
  let x = 0
  let y = 0
  const rawGetter = this.rawGetter[pingType]
  if (rawGetter !== undefined) {
    ;[x, y] = rawGetter(pingTag ?? getPingTagFromType(pingType))
  }
  return $multi(x, y)
}

export { MapPingHandler }
