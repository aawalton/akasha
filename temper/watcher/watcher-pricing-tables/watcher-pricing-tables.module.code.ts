import { log } from "../watcher-logging/watcher-logging.module.code.ts"

export const NO_PRICE_EXTRACT =
  "no price extract is here yet, so the addon values every crown consumable and every currency item at nothing"

export interface PricingTables {
  readonly currencyRates: Record<string, number>
  readonly crownReplacementCosts: Record<number, number>
}

export function emptyPricingTables(): PricingTables {
  return { currencyRates: {}, crownReplacementCosts: {} }
}

export async function computePricingTables(
  say: (message: string) => undefined = log
): Promise<PricingTables> {
  say(NO_PRICE_EXTRACT)
  return emptyPricingTables()
}
