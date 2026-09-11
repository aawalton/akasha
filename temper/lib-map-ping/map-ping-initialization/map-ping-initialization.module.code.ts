import { LIB_IDENTIFIER } from "akasha/temper/lib-map-ping/map-ping-constants/map-ping-constants.module.code.ts"
import { MapPingHandler } from "akasha/temper/lib-map-ping/map-ping-handler/map-ping-handler.module.code.ts"
import { INTERNAL } from "akasha/temper/lib-map-ping/map-ping-lib/map-ping-lib.module.code.ts"
import "akasha/temper/lib-map-ping/map-ping-handler-state/map-ping-handler-state.module.code.ts"
import type { MapPingHandlerInstance } from "akasha/temper/lib-map-ping/map-ping-types/map-ping-types.module.code.ts"

export function requireHandler(this: void): MapPingHandlerInstance {
  if (INTERNAL.handler === undefined) {
    error(`${LIB_IDENTIFIER} handler accessed before initialization`)
  }
  return INTERNAL.handler
}

export function initializeHandler(this: void): undefined {
  const logger = INTERNAL.logger
  logger.Debug("Initializing LibMapPing2...")
  INTERNAL.handler = MapPingHandler.New()
  logger.Debug("Initialization complete")
}
