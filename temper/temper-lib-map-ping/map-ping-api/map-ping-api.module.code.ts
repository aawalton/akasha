import { requireHandler } from "../map-ping-initialization/map-ping-initialization.module.code.ts"
import { INTERNAL, LIB } from "../map-ping-lib/map-ping-lib.module.code.ts"

export function initApi(this: void): undefined {
  LIB.MapPingState = INTERNAL.MapPingState

  LIB.SetMapPing = function (
    this,
    pingType,
    mapTypeOrWorldX,
    xOrWorldY,
    yOrWorldZ
  ): boolean | undefined {
    if (pingType === false) {
      return requireHandler().SetPlayerWaypointByWorldLocation(
        mapTypeOrWorldX,
        xOrWorldY,
        yOrWorldZ
      )
    }
    requireHandler().PingMap(pingType, mapTypeOrWorldX, xOrWorldY, yOrWorldZ)
    return undefined
  }

  LIB.RemoveMapPing = function (this, pingType): undefined {
    requireHandler().RemoveMapPingByType(pingType)
  }

  LIB.GetMapPing = function (this, pingType, pingTag) {
    return requireHandler().GetMapPingByType(pingType, pingTag)
  }

  LIB.GetRawMapPing = function (this, pingType, pingTag) {
    return requireHandler().GetRawMapPingByType(pingType, pingTag)
  }

  LIB.GetMapPingState = function (this, pingType, pingTag): number {
    return requireHandler().GetMapPingState(pingType, pingTag)
  }

  LIB.HasMapPing = function (this, pingType, pingTag): boolean {
    return requireHandler().HasMapPing(pingType, pingTag)
  }

  LIB.RefreshMapPin = function (this, pingType, pingTag): boolean {
    return requireHandler().RefreshMapPin(pingType, pingTag)
  }

  LIB.IsPositionOnMap = function (this, x, y): boolean {
    return requireHandler().IsPositionOnMap(x, y)
  }

  LIB.MutePing = function (this, pingType, pingTag): undefined {
    requireHandler().MutePing(pingType, pingTag)
  }

  LIB.UnmutePing = function (this, pingType, pingTag): undefined {
    requireHandler().UnmutePing(pingType, pingTag)
  }

  LIB.IsPingMuted = function (this, pingType, pingTag): undefined {
    requireHandler().IsPingMuted(pingType, pingTag)
  }

  LIB.SuppressPing = function (this, pingType, pingTag): undefined {
    requireHandler().SuppressPing(pingType, pingTag)
  }

  LIB.UnsuppressPing = function (this, pingType, pingTag): undefined {
    requireHandler().UnsuppressPing(pingType, pingTag)
  }

  LIB.IsPingSuppressed = function (this, pingType, pingTag): boolean {
    return requireHandler().IsPingSuppressed(pingType, pingTag)
  }

  LIB.RegisterCallback = function (this, eventName, callback): undefined {
    INTERNAL.RegisterCallback(eventName, callback)
  }

  LIB.UnregisterCallback = function (this, eventName, callback): undefined {
    INTERNAL.UnregisterCallback(eventName, callback)
  }

  LIB.callback = INTERNAL.callback
}
