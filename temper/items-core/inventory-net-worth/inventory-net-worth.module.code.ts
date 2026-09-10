import type {
  NetWorthBreakdown,
  NetWorthBreakdownEntry,
  NetWorthResult,
} from "../inventory-net-worth-types/inventory-net-worth-types.module.code.ts"
import type { InventoryDatabase } from "../inventory-types/inventory-types.module.code.ts"
import { computeInventoryTotalValue } from "../inventory-value/inventory-value.module.code.ts"

const CURRENCY_LABELS: Record<string, string> = {
  gold: "Gold",
  alliancePoints: "Alliance Points",
  telvarStones: "Tel Var Stones",
  writVouchers: "Writ Vouchers",
}

export function computeNetWorth(
  inventory: InventoryDatabase,
  conversionRates: Record<string, number>
): NetWorthResult {
  const itemValue = computeInventoryTotalValue(inventory)

  let goldAmount = 0
  let currencyGoldValue = 0
  const entries: NetWorthBreakdownEntry[] = []

  const currencyTotals: Record<string, number> = {}

  if (inventory.currencies) {
    for (const char of Object.values(inventory.currencies.characters)) {
      for (const [key, amount] of Object.entries(char.balances)) {
        if (amount > 0) {
          currencyTotals[key] = (currencyTotals[key] ?? 0) + amount
        }
      }
    }

    if (inventory.currencies.bank) {
      for (const [key, amount] of Object.entries(inventory.currencies.bank)) {
        if (amount > 0) {
          currencyTotals[key] = (currencyTotals[key] ?? 0) + amount
        }
      }
    }
  }

  goldAmount = currencyTotals.gold ?? 0

  for (const [key, rate] of Object.entries(conversionRates)) {
    if (key === "gold") continue
    const rawAmount = currencyTotals[key] ?? 0
    if (rawAmount <= 0) continue

    const goldEquivalent = Math.round(rawAmount * rate)
    currencyGoldValue += goldEquivalent

    entries.push({
      currency: key,
      label: CURRENCY_LABELS[key] ?? key,
      rawAmount,
      goldEquivalent,
      rate,
    })
  }

  const netWorth = Math.round(itemValue + goldAmount + currencyGoldValue)

  const breakdown: NetWorthBreakdown = { currencies: entries }

  return {
    itemValue: Math.round(itemValue),
    goldAmount,
    currencyGoldValue,
    netWorth,
    breakdown,
  }
}
