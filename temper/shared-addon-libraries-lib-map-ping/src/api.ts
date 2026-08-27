import { requireHandler } from "./initialization"
import { internal, lib } from "./lib-state"

export function initApi(this: void): undefined {
  lib.MapPingState = internal.MapPingState

  lib.SetMapPing = function (
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

  lib.RemoveMapPing = function (this, pingType): undefined {
    requireHandler().RemoveMapPingByType(pingType)
  }

  lib.GetMapPing = function (this, pingType, pingTag) {
    return requireHandler().GetMapPingByType(pingType, pingTag)
  }

  lib.GetRawMapPing = function (this, pingType, pingTag) {
    return requireHandler().GetRawMapPingByType(pingType, pingTag)
  }

  lib.GetMapPingState = function (this, pingType, pingTag): number {
    return requireHandler().GetMapPingState(pingType, pingTag)
  }

  lib.HasMapPing = function (this, pingType, pingTag): boolean {
    return requireHandler().HasMapPing(pingType, pingTag)
  }

  lib.RefreshMapPin = function (this, pingType, pingTag): boolean {
    return requireHandler().RefreshMapPin(pingType, pingTag)
  }

  lib.IsPositionOnMap = function (this, x, y): boolean {
    return requireHandler().IsPositionOnMap(x, y)
  }

  lib.MutePing = function (this, pingType, pingTag): undefined {
    requireHandler().MutePing(pingType, pingTag)
  }

  lib.UnmutePing = function (this, pingType, pingTag): undefined {
    requireHandler().UnmutePing(pingType, pingTag)
  }

  lib.IsPingMuted = function (this, pingType, pingTag): undefined {
    requireHandler().IsPingMuted(pingType, pingTag)
  }

  lib.SuppressPing = function (this, pingType, pingTag): undefined {
    requireHandler().SuppressPing(pingType, pingTag)
  }

  lib.UnsuppressPing = function (this, pingType, pingTag): undefined {
    requireHandler().UnsuppressPing(pingType, pingTag)
  }

  lib.IsPingSuppressed = function (this, pingType, pingTag): boolean {
    return requireHandler().IsPingSuppressed(pingType, pingTag)
  }

  lib.RegisterCallback = function (this, eventName, callback): undefined {
    internal.RegisterCallback(eventName, callback)
  }

  lib.UnregisterCallback = function (this, eventName, callback): undefined {
    internal.UnregisterCallback(eventName, callback)
  }

  lib.callback = internal.callback
}
