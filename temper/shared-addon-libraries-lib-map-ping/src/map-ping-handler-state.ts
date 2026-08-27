import { PING_CATEGORY } from "./constants"
import { internal } from "./lib-state"
import { GetPingTagFromType, MapPingHandler } from "./map-ping-handler"
import type { MapPingHandlerInstance } from "./types"

const logger = internal.logger
const MapPingState = internal.MapPingState

MapPingHandler.GetMapPingState = function (
  this: MapPingHandlerInstance,
  pingType: number,
  pingTag?: string
): number {
  const key = this.GetKey(pingType, pingTag)
  let state = this.pingState[key]
  if (state === undefined) {
    const [x, y] = this.GetRawMapPingByType(pingType, pingTag)
    state = x !== 0 || y !== 0 ? MapPingState.SET : MapPingState.NOT_SET
    this.pingState[key] = state
  }
  return this.pingState[key] ?? MapPingState.NOT_SET
}

MapPingHandler.HasMapPing = function (
  this: MapPingHandlerInstance,
  pingType: number,
  pingTag?: string
): boolean {
  const state = this.GetMapPingState(pingType, pingTag)
  return state === MapPingState.SET_PENDING || state === MapPingState.SET
}

MapPingHandler.RefreshMapPin = function (
  this: MapPingHandlerInstance,
  pingType: number,
  pingTag?: string
): boolean {
  const tag = pingTag ?? GetPingTagFromType(pingType)
  this.mapPinManager.RemovePins(PING_CATEGORY, pingType, tag)

  const [x, y] = this.GetMapPing(tostring(pingType))
  if (this.IsPositionOnMap(x, y)) {
    this.mapPinManager.CreatePin(pingType, tag, x, y)
    return true
  }
  return false
}

MapPingHandler.IsPositionOnMap = function (
  this: MapPingHandlerInstance,
  x: number,
  y: number
): boolean {
  return !(x < 0 || y < 0 || x > 1 || y > 1 || (x === 0 && y === 0))
}

MapPingHandler.MutePing = function (
  this: MapPingHandlerInstance,
  pingType: number,
  pingTag?: string
): undefined {
  const key = this.GetKey(pingType, pingTag)
  const mute = this.mutePing[key] ?? 0
  this.mutePing[key] = mute + 1
  logger.Verbose("Mute ping %s - new count: %d", key, this.mutePing[key])
}

MapPingHandler.UnmutePing = function (
  this: MapPingHandlerInstance,
  pingType: number,
  pingTag?: string
): undefined {
  const key = this.GetKey(pingType, pingTag)
  let mute = (this.mutePing[key] ?? 0) - 1
  if (mute < 0) {
    mute = 0
  }
  this.mutePing[key] = mute
  logger.Verbose("Unmute ping %s - new count: %d", key, this.mutePing[key])
}

MapPingHandler.IsPingMuted = function (
  this: MapPingHandlerInstance,
  pingType: number,
  pingTag?: string
): boolean {
  const key = this.GetKey(pingType, pingTag)
  const mute = this.mutePing[key]
  return mute !== undefined && mute > 0
}

MapPingHandler.SuppressPing = function (
  this: MapPingHandlerInstance,
  pingType: number,
  pingTag?: string
): undefined {
  const key = this.GetKey(pingType, pingTag)
  const suppress = this.suppressPing[key] ?? 0
  this.suppressPing[key] = suppress + 1
  logger.Verbose("Suppress ping %s - new count: %d", key, this.suppressPing[key])
}

MapPingHandler.UnsuppressPing = function (
  this: MapPingHandlerInstance,
  pingType: number,
  pingTag?: string
): undefined {
  const key = this.GetKey(pingType, pingTag)
  let suppress = (this.suppressPing[key] ?? 0) - 1
  if (suppress < 0) {
    suppress = 0
  }
  this.suppressPing[key] = suppress
  logger.Verbose("Unsuppress ping %s - new count: %d", key, this.suppressPing[key])
}

MapPingHandler.IsPingSuppressed = function (
  this: MapPingHandlerInstance,
  pingType: number,
  pingTag?: string
): boolean {
  const key = this.GetKey(pingType, pingTag)
  const suppress = this.suppressPing[key]
  return suppress !== undefined && suppress > 0
}
