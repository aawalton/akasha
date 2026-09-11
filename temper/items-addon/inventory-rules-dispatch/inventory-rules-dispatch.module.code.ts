import { dispatchListings } from "akasha/temper/items-addon/inventory-rules-list/inventory-rules-list.module.code.ts"
export function onOpenTradingHouse(): undefined {
  dispatchListings()
}
