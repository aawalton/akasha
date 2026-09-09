import "@akasha/temper-eso-types/eso-enums-14"
import "@akasha/temper-eso-types/eso-functions-03"
import type {
  SearchRequestCollector,
  ServerFilterField,
  ServerRangeField,
} from "@akasha/temper-items-filters-core/search-filter-types"

function nativeFilterType(field: ServerFilterField): number | undefined {
  switch (field) {
    case "quality":
      return TRADING_HOUSE_FILTER_TYPE_QUALITY
    case "trait":
      return TRADING_HOUSE_FILTER_TYPE_TRAIT
    case "item-type":
      return TRADING_HOUSE_FILTER_TYPE_ITEM
    case "equip-type":
      return TRADING_HOUSE_FILTER_TYPE_EQUIP
    case "weapon-type":
      return TRADING_HOUSE_FILTER_TYPE_WEAPON
    case "armor-type":
      return TRADING_HOUSE_FILTER_TYPE_ARMOR
    default:
      return undefined
  }
}

function nativeRangeType(field: ServerRangeField): number | undefined {
  switch (field) {
    case "price":
      return TRADING_HOUSE_FILTER_TYPE_PRICE
    case "level":
      return TRADING_HOUSE_FILTER_TYPE_LEVEL
    default:
      return undefined
  }
}

export function applyCollectorToNativeSearch(collector: SearchRequestCollector): undefined {
  ClearAllTradingHouseSearchTerms()

  for (const [field, ids] of collector.terms) {
    if (ids.length === 0) continue
    const filterType = nativeFilterType(field)
    if (filterType === undefined) continue
    SetTradingHouseFilter(filterType, ...ids)
  }

  for (const [field, band] of collector.ranges) {
    const filterType = nativeRangeType(field)
    if (filterType === undefined) continue
    SetTradingHouseFilterRange(filterType, band[0], band[1])
  }
}
