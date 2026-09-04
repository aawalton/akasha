import { dispatchListings } from "../inventory-rules-list/inventory-rules-list.module.code.ts"
export function onOpenTradingHouse(): undefined {
  dispatchListings()
}
