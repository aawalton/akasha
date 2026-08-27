import { LIB_IDENTIFIER } from "./constants"
import { internal } from "./lib-state"
import { MapAdapter } from "./map-adapter"
import { TamrielOMeter } from "./tamriel-o-meter"

function initializeSaveData(this: void): undefined {}

export function initialize(this: void): undefined {
  const logger = internal.logger

  logger.Debug("Initializing LibGPS3...")

  const mapAdapter = MapAdapter.New()
  const meter = TamrielOMeter.New(mapAdapter)

  internal.mapAdapter = mapAdapter
  internal.meter = meter

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
    internal.chat.Print("All measurements have been cleared")
  }

  logger.Debug("Initialization complete")
}
