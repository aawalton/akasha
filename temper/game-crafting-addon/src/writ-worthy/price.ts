import { FALLBACK_PRICE as FALLBACK_PRICE_STATIC } from "./generated/price-data-table.generated"
import { findLink } from "./link-data"
import { toWritFields } from "./writ-fields"

const FALLBACK_PRICE: Record<string | number, number | boolean> = {}
for (const [name, price] of pairs(FALLBACK_PRICE_STATIC)) {
  FALLBACK_PRICE[name] = price
}

const FILLED_SENTINEL_KEY = "filled_with_item_id_goodness"

export function populateTableWithItemIds(): undefined {
  if (FALLBACK_PRICE[FILLED_SENTINEL_KEY] === true) {
    return
  }
  const name_list: string[] = []
  for (const [name] of pairs(FALLBACK_PRICE)) {
    if (typeof name === "string" && name !== FILLED_SENTINEL_KEY) {
      name_list[name_list.length] = name
    }
  }
  for (const name of name_list) {
    const link = findLink(name)
    if (link !== undefined) {
      const w = toWritFields(link)
      const price = FALLBACK_PRICE[name]
      if (w.item_id !== undefined && price !== undefined) {
        FALLBACK_PRICE[w.item_id] = price
      }
    }
  }
  FALLBACK_PRICE[FILLED_SENTINEL_KEY] = true
}

export function fallbackPrice(link: string): number | undefined {
  const w = toWritFields(link)
  if (w.item_id === undefined || FALLBACK_PRICE[w.item_id] === undefined) {
    populateTableWithItemIds()
  }
  if (w.item_id === undefined) {
    return undefined
  }
  const v = FALLBACK_PRICE[w.item_id]
  if (typeof v === "number") {
    return v
  }
  return undefined
}

TemperWrit.FALLBACK_PRICE = FALLBACK_PRICE
TemperWrit.FallbackPrice = fallbackPrice
TemperWrit.PopulateTableWithItemIds = populateTableWithItemIds
