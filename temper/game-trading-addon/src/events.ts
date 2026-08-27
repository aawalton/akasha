import { captureOwnListings, captureSearchResults } from "./capture"
import { ADDON_NAME } from "./constants"
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
