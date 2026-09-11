import {
  asGlobalTable,
  asString,
} from "akasha/temper/lib-price/price-casts/price-casts.module.code.ts"
import { luaTruthy } from "akasha/temper/lib-price/price-lua-truthy/price-lua-truthy.module.code.ts"
import { lib } from "akasha/temper/lib-price/price-state/price-state.module.code.ts"
import type {
  NormalizedPrice,
  RawPrice,
} from "akasha/temper/lib-price/price-types/price-types.module.code.ts"

const globals = asGlobalTable(_G)

globals.LibPrice = lib

globals.FurCPriceNormalize = function (this: void, furc: RawPrice): NormalizedPrice[] | undefined {
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
