import { logError } from "../price-log/price-log.module.code.ts"
import { luaTruthy } from "../price-lua-truthy/price-lua-truthy.module.code.ts"
import { lib } from "../price-state/price-state.module.code.ts"
import type {
  DispatchEntry,
  NormalizedPrice,
  RawPrice,
} from "../price-types/price-types.module.code.ts"

lib.SourceList = function (this: void): string[] {
  let sourceList = lib.SOURCE_LIST
  if (sourceList === undefined) {
    sourceList = [lib.MM, lib.ATT, lib.FURC, lib.TTC, lib.CROWN, lib.ROLIS, lib.NPC]
    lib.SOURCE_LIST = sourceList
  }
  return sourceList
}

lib.CurrencyList = function (this: void): Record<string, number> {
  let currencyList = lib.CURRENCY_LIST
  if (currencyList === undefined) {
    currencyList = {
      [lib.CURRENCY_TYPE_GOLD]: CURT_MONEY,
      [lib.CURRENCY_TYPE_ALLIANCE_POINTS]: CURT_ALLIANCE_POINTS,
      [lib.CURRENCY_TYPE_TELVAR_STONES]: CURT_TELVAR_STONES,
      [lib.CURRENCY_TYPE_WRIT_VOUCHERS]: CURT_WRIT_VOUCHERS,
      [lib.CURRENCY_TYPE_CROWNS]: CURT_CROWNS,
    }
    lib.CURRENCY_LIST = currencyList
  }
  return currencyList
}

lib.PriceTypes = function (this: void): string[] {
  let priceTypes = lib.PRICE_TYPES
  if (priceTypes === undefined) {
    priceTypes = [lib.PRICE_ASK, lib.PRICE_AVG, lib.PRICE_BID, lib.PRICE_SALE]
    lib.PRICE_TYPES = priceTypes
  }
  return priceTypes
}

lib.Price = function (
  this: void,
  sourceKey: string | undefined,
  itemLink: string | undefined
): RawPrice | undefined {
  if (sourceKey === undefined) {
    return undefined
  }
  if (itemLink === undefined) {
    return undefined
  }
  let dispatch = lib.DISPATCH
  if (dispatch === undefined) {
    dispatch = {
      [lib.MM]: [lib.MMPrice, lib.CanMMPrice],
      [lib.ATT]: [lib.ATTPrice, lib.CanATTPrice],
      [lib.FURC]: [lib.FurCPrice, lib.CanFurCPrice],
      [lib.TTC]: [lib.TTCPrice, lib.CanTTCPrice],
      [lib.CROWN]: [lib.CrownPrice],
      [lib.ROLIS]: [lib.RolisPrice],
      [lib.NPC]: [lib.NPCPrice],
    }
    lib.DISPATCH = dispatch
  }
  const entry: DispatchEntry | undefined = dispatch[sourceKey]
  if (entry === undefined) {
    logError("unknown source key:%s", tostring(sourceKey))
    return undefined
  }
  const canFn = entry[1]
  if (canFn !== undefined && !luaTruthy(canFn())) {
    return undefined
  }
  const cached = lib.GetCachedPrice(sourceKey, itemLink)
  if (cached !== undefined) {
    return cached
  }
  const got = entry[0](itemLink)
  if (got === undefined) {
    return undefined
  }
  lib.SetCachedPrice(sourceKey, itemLink, got)
  return got
}

lib.PriceNormalized = function (
  this: void,
  sourceKey: string,
  itemLink: string
): NormalizedPrice[] | undefined {
  const got = lib.Price(sourceKey, itemLink)
  if (got === undefined) {
    return undefined
  }
  let normalize = lib.NORMALIZE
  if (normalize === undefined) {
    normalize = {
      [lib.MM]: lib.MMPriceNormalize,
      [lib.ATT]: lib.ATTPriceNormalize,
      [lib.TTC]: lib.TTCPriceNormalize,
      [lib.CROWN]: lib.CrownPriceNormalize,
      [lib.ROLIS]: lib.RolisPriceNormalize,
      [lib.NPC]: lib.NPCPriceNormalize,
    }
    lib.NORMALIZE = normalize
  }
  const fn = normalize[sourceKey]
  if (fn === undefined) {
    return undefined
  }
  return fn(got)
}

lib.Enabled = function (this: void, key: string, sourceList: string[]): boolean {
  if (sourceList.length === 0) {
    return true
  }
  for (const k of sourceList) {
    if (k === key) {
      return true
    }
  }
  return false
}
