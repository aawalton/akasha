import { asNumber, asOptionalNumber } from "../price-casts/price-casts.module.code.ts"
import { luaTruthy } from "../price-lua-truthy/price-lua-truthy.module.code.ts"
import { lib } from "../price-state/price-state.module.code.ts"
import type { NormalizedPrice, RawPrice } from "../price-types/price-types.module.code.ts"

lib.CanATTPrice = function (this: void): boolean | undefined {
  return (
    ArkadiusTradeTools !== undefined &&
    ArkadiusTradeTools.Modules !== undefined &&
    ArkadiusTradeTools.Modules.Sales !== undefined &&
    luaTruthy(ArkadiusTradeTools.Modules.Sales.addMenuItems)
  )
}

lib.ATTPrice = function (this: void, itemLink: string): RawPrice | undefined {
  const sales = ArkadiusTradeTools?.Modules?.Sales
  if (sales === undefined || !luaTruthy(sales.addMenuItems)) {
    return undefined
  }
  for (const dayCt of [lib.day_ct_short, lib.day_ct_long]) {
    const avg = sales.GetAveragePricePerItem(
      itemLink,
      GetTimeStamp() - ZO_ONE_DAY_IN_SECONDS * dayCt
    )
    if (avg !== undefined && 0 < avg) {
      return { avgPrice: avg, numDays: dayCt }
    }
  }
  return undefined
}

lib.ATTPriceNormalize = function (this: void, att: RawPrice): NormalizedPrice[] | undefined {
  if (att === undefined) {
    return undefined
  }
  return [
    {
      type: lib.PRICE_SALE,
      [lib.CURRENCY_TYPE_GOLD]: asNumber(att.avgPrice),
      count: undefined,
      days: asOptionalNumber(att.numDays),
    },
  ]
}
