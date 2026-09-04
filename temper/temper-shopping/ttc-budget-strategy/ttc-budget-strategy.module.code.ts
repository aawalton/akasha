import type { TTCPriceEntry } from "@akasha/temper-trading-pricing/pricing-types"
import {
  BUDGET_STRATEGY,
  type ItemBudget,
} from "../ttc-shopping-types/ttc-shopping-types.module.code.ts"

function selectBudgetStrategy(priceData: TTCPriceEntry | undefined): keyof typeof BUDGET_STRATEGY {
  if (!priceData) return "Normal"

  const entryCount = priceData.EC ?? 0
  if (entryCount <= 3) return "Scarce"
  if (entryCount <= 8) return "Loose"

  const min = priceData.N
  const max = priceData.X
  if (min !== undefined && min > 0 && max !== undefined) {
    const spread = (max - min) / min
    if (spread <= 0.15) return "Tight"
    if (spread >= 0.8) return "Loose"
  }

  const saleAvg = priceData.SA
  if (saleAvg !== undefined && min !== undefined && min > 0) {
    const saleRatio = saleAvg / min
    if (saleRatio < 0.7) return "Tight"
  }

  return "Normal"
}

export function computeItemBudget(
  key: string,
  cheapestPrice: number,
  priceData?: TTCPriceEntry
): ItemBudget {
  const strategy = selectBudgetStrategy(priceData)
  const multiplier = BUDGET_STRATEGY[strategy]
  const ceiling = Math.ceil(cheapestPrice * multiplier)

  return { key, ceiling, cheapestPrice, multiplier, strategy }
}
