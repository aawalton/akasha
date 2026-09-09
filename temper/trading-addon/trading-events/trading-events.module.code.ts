import "akasha/temper/temper-eso-types/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-enums-14/eso-enums-14.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-globals/eso-globals.type-declaration.d.ts"
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
