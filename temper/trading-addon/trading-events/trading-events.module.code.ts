import "@akasha/temper-eso-types/eso-api"
import "@akasha/temper-eso-types/eso-enums-01"
import "@akasha/temper-eso-types/eso-enums-14"
import "@akasha/temper-eso-types/eso-event-manager"
import "@akasha/temper-eso-types/eso-events"
import "@akasha/temper-eso-types/eso-functions-01"
import "@akasha/temper-eso-types/eso-functions-02"
import "@akasha/temper-eso-types/eso-functions-03"
import "@akasha/temper-eso-types/eso-globals"
import {
  captureOwnListings,
  captureSearchResults,
} from "../trading-capture/trading-capture.module.code.ts"
import { ADDON_NAME } from "../trading-constants/trading-constants.module.code.ts"
export function registerEvents(): undefined {
  const ns = ADDON_NAME

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_OpenTradingHouse`,
    EVENT_OPEN_TRADING_HOUSE,
    function (this: void): undefined {
      RequestTradingHouseListings()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    `${ns}_TradingHouseResponse`,
    EVENT_TRADING_HOUSE_RESPONSE_RECEIVED,
    function (this: void, _eventCode: number, responseType: number, result: number): undefined {
      if (result !== TRADING_HOUSE_RESULT_SUCCESS) return

      if (responseType === TRADING_HOUSE_RESULT_SEARCH_PENDING) {
        captureSearchResults()
      } else if (responseType === TRADING_HOUSE_RESULT_LISTINGS_PENDING) {
        captureOwnListings()
      }
    }
  )
}
