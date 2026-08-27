import { asString } from "./casts"
import { luaTruthy } from "./lua-truthy"
import { lib } from "./state"
import type { NormalizedPrice, RawPrice } from "./types"

globalThis.LibPrice = lib

globalThis.FurCPriceNormalize = function (
  this: void,
  furc: RawPrice
): NormalizedPrice[] | undefined {
  if (!luaTruthy(furc)) {
    return undefined
  }
  return [
    {
      type: lib.PRICE_BID,
      [asString(furc.currency_type)]: furc.currency_ct,
      count: 1 / 0,
      days: 0,
    },
  ]
}
