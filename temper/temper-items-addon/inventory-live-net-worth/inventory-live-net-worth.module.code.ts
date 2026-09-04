import { computeValue } from "@akasha/temper-items-core/inventory-display-value"
import type { InventoryDatabase } from "../inventory-saved-variables-types/inventory-saved-variables-types.module.code.ts"
export function computeLiveNetWorth(
  db: InventoryDatabase,
  currencyRates: Record<string, number> | undefined,
  crownReplacementCosts: Record<number, number> | undefined
): number {
  let total = 0

  for (const location of Object.values(db.locations)) {
    for (const bag of Object.values(location.bags)) {
      for (const item of Object.values(bag)) {
        const replacementCost = crownReplacementCosts?.[item.itemId]
        const value = computeValue(item.estimatedValue, item.merchantValue, replacementCost)
        if (value !== undefined && value > 0) {
          total += value * item.stackCount
        }
      }
    }

    if (location.placedFurnishings) {
      for (const furnishing of Object.values(location.placedFurnishings)) {
        if (furnishing.estimatedValue !== undefined && furnishing.estimatedValue > 0) {
          total += furnishing.estimatedValue
        }
      }
    }
  }

  total += computeCurrencyGoldValue(db, currencyRates)

  return Math.round(total)
}

function computeCurrencyGoldValue(
  db: InventoryDatabase,
  currencyRates: Record<string, number> | undefined
): number {
  const currencies = db.currencies
  if (!currencies) return 0

  const totals: Record<string, number> = {}
  for (const char of Object.values(currencies.characters)) {
    for (const [key, amount] of Object.entries(char.balances)) {
      if (amount > 0) totals[key] = (totals[key] ?? 0) + amount
    }
  }
  if (currencies.bank) {
    for (const [key, amount] of Object.entries(currencies.bank)) {
      if (amount > 0) totals[key] = (totals[key] ?? 0) + amount
    }
  }

  let goldValue = totals.gold ?? 0
  for (const [key, amount] of Object.entries(totals)) {
    if (key === "gold") continue
    const rate = currencyRates?.[key]
    if (rate === undefined) continue
    goldValue += Math.round(amount * rate)
  }

  return goldValue
}
