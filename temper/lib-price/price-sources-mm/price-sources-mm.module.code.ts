import { asNumber, asOptionalNumber } from "../price-casts/price-casts.module.code.ts"
import { luaTruthy } from "../price-lua-truthy/price-lua-truthy.module.code.ts"
import { lib } from "../price-state/price-state.module.code.ts"
import type { NormalizedPrice, RawPrice } from "../price-types/price-types.module.code.ts"

lib.CanMMPrice = function (this: void): boolean | undefined {
  return MasterMerchant !== undefined ? true : undefined
}

lib.MMPrice = function (this: void, itemLink: string): RawPrice | undefined {
  if (!(MasterMerchant !== undefined && luaTruthy(MasterMerchant.isInitialized))) {
    return undefined
  }
  if (itemLink === undefined) {
    return undefined
  }
  const mm = MasterMerchant.GetTooltipStats(itemLink, true, false)
  if (!(mm !== undefined && luaTruthy(mm.avgPrice) && 0 < asNumber(mm.avgPrice))) {
    return undefined
  }
  return mm
}

lib.MMPriceNormalize = function (this: void, mm: RawPrice): NormalizedPrice[] | undefined {
  if (mm === undefined) {
    return undefined
  }
  const prices: NormalizedPrice[] = []
  if (mm.avgPrice !== undefined) {
    prices.push({
      type: lib.PRICE_SALE,
      [lib.CURRENCY_TYPE_GOLD]: asNumber(mm.avgPrice),
      count: asOptionalNumber(mm.numSales),
      days: asOptionalNumber(mm.numDays),
    })
  }
  if (luaTruthy(mm.bonanzaCount)) {
    prices.push({
      type: lib.PRICE_ASK,
      [lib.CURRENCY_TYPE_GOLD]: asNumber(mm.bonanzaPrice),
      count: asNumber(mm.bonanzaCount),
    })
  }
  return prices
}
