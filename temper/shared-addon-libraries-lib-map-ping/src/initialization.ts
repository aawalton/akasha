import { LIB_IDENTIFIER } from "./constants"
import { internal } from "./lib-state"
import { MapPingHandler } from "./map-ping-handler"
import "./map-ping-handler-state"
import type { MapPingHandlerInstance } from "./types"

export function requireHandler(this: void): MapPingHandlerInstance {
  if (internal.handler === undefined) {
    error(`${LIB_IDENTIFIER} handler accessed before initialization`)
  }
  return internal.handler
}

export function initializeHandler(this: void): undefined {
  const logger = internal.logger
  logger.Debug("Initializing LibMapPing2...")
  internal.handler = MapPingHandler.New()
  logger.Debug("Initialization complete")
}
