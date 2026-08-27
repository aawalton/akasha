export interface PricingTables {
  currencyRates: Record<string, number>
  crownReplacementCosts: Record<number, number>
}

export async function computePricingTables(): Promise<PricingTables> {
  console.warn(
    "computePricingTables: no price extract stands, so the addon values every crown consumable and every currency item at nothing."
  )
  return { currencyRates: {}, crownReplacementCosts: {} }
}
