import { asGlobalTable, asString } from "../price-casts/price-casts.module.code.ts"
import { luaTruthy } from "../price-lua-truthy/price-lua-truthy.module.code.ts"
import { lib } from "../price-state/price-state.module.code.ts"
import type { NormalizedPrice, RawPrice } from "../price-types/price-types.module.code.ts"

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
