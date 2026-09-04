import { isPriceEntry } from "../is-price-entry/is-price-entry.module.code.ts"
import type { PricingData } from "../pricing-types/pricing-types.module.code.ts"

interface CurrencyConversionItem {
  ttcItemId: string
  coordinates: { quality: string; level: string; trait: string }
  currencyCost: number
}

const CURRENCY_CONVERSIONS: Record<string, CurrencyConversionItem[]> = {
  telvarStones: [
    {
      ttcItemId: "4794",
      coordinates: { quality: "0", level: "1", trait: "-1" },
      currencyCost: 15000,
    },
  ],
  alliancePoints: [
    {
      ttcItemId: "18099",
      coordinates: { quality: "0", level: "1", trait: "25" },
      currencyCost: 25000,
    },
  ],
  writVouchers: [
    {
      ttcItemId: "19420",
      coordinates: { quality: "4", level: "1", trait: "-1" },
      currencyCost: 250,
    },
    {
      ttcItemId: "19422",
      coordinates: { quality: "4", level: "1", trait: "-1" },
      currencyCost: 250,
    },
    {
      ttcItemId: "19847",
      coordinates: { quality: "4", level: "1", trait: "-1" },
      currencyCost: 250,
    },
    {
      ttcItemId: "19850",
      coordinates: { quality: "4", level: "1", trait: "-1" },
      currencyCost: 250,
    },
  ],
}

export const CURRENCY_ITEM_IDS = new Set(
  Object.values(CURRENCY_CONVERSIONS).flatMap((items) => items.map((item) => item.ttcItemId))
)

function lookupPrice(data: PricingData["Data"], item: CurrencyConversionItem): number | null {
  const itemData = data[item.ttcItemId]
  if (!itemData) return null

  const qualityData = itemData[item.coordinates.quality]
  if (!qualityData) return null

  const levelData = qualityData[item.coordinates.level]
  if (!levelData) return null

  const traitData = levelData[item.coordinates.trait]
  if (!traitData) return null

  if (!isPriceEntry(traitData)) return null

  const price = Math.max(traitData.SA ?? 0, traitData.N ?? 0)
  return price > 0 ? price : null
}

export function lookupCurrencyConversionRates(pricing: PricingData): Record<string, number> {
  const rates: Record<string, number> = { gold: 1 }

  for (const [currencyKey, items] of Object.entries(CURRENCY_CONVERSIONS)) {
    const [firstItem, ...rest] = items
    if (!firstItem) continue
    let totalPrice = 0
    let validCount = 0

    for (const item of [firstItem, ...rest]) {
      const price = lookupPrice(pricing.Data, item)
      if (price !== null) {
        totalPrice += price
        validCount++
      }
    }

    if (validCount > 0) {
      const averagePrice = totalPrice / validCount
      rates[currencyKey] = averagePrice / firstItem.currencyCost
    }
  }

  return rates
}
