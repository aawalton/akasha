import { LIB_IDENTIFIER } from "../gps-constants/gps-constants.module.code.ts"
import { INTERNAL } from "../gps-lib-state/gps-lib-state.module.code.ts"
import { MapAdapter } from "../gps-map-adapter/gps-map-adapter.module.code.ts"
import { TamrielOMeter } from "../gps-tamriel-o-meter/gps-tamriel-o-meter.module.code.ts"

function initializeSaveData(this: void): undefined {}

export function initialize(this: void): undefined {
  const logger = INTERNAL.logger

  logger.Debug("Initializing LibGPS3...")

  const mapAdapter = MapAdapter.New()
  const meter = TamrielOMeter.New(mapAdapter)

  INTERNAL.mapAdapter = mapAdapter
  INTERNAL.meter = meter

  EVENT_MANAGER.RegisterForEvent(
    LIB_IDENTIFIER,
    EVENT_ADD_ON_LOADED,
    function (this: void, _eventCode: number, name: string): undefined {
      if (name !== "LibGPS") {
        return
      }
      EVENT_MANAGER.UnregisterForEvent(LIB_IDENTIFIER, EVENT_ADD_ON_LOADED)
      initializeSaveData()
      logger.Debug("Saved Variables loaded")
      SetMapToPlayerLocation()
    }
  )

  SLASH_COMMANDS["/libgpsreset"] = function (this: void): undefined {
    meter.Reset()
    INTERNAL.chat.Print("All measurements have been cleared")
  }

  logger.Debug("Initialization complete")
}
