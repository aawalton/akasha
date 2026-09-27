import type {
  CurrencyBalances,
  InventoryCurrencies,
} from "akasha/temper/items/core/modules/inventory-types/inventory-types.module.code.ts"
import {
  type KeyedTitles,
  titleOf,
} from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"

interface CurrencySummaryRow {
  key: string
  label: string
  characterAmounts: Record<string, number>
  bankAmount: number
  accountAmount: number
  total: number
}

interface CurrencySummary {
  rows: readonly CurrencySummaryRow[]
  characterIds: readonly string[]
  characterNames: Record<string, string>
}

interface CurrencyLeafNode {
  key: string
  label: string
  stackCount: number
  totalValue?: number
}

export function buildLocationCurrencyNodes(
  balances: CurrencyBalances,
  currencies: KeyedTitles,
  conversionRates?: Record<string, number>
): readonly CurrencyLeafNode[] {
  const nodes: CurrencyLeafNode[] = []
  for (const key of currencies.keys) {
    const amount = balances[key] ?? 0
    if (amount <= 0) continue
    const rate = conversionRates?.[key]
    nodes.push({
      key,
      label: titleOf(currencies, key),
      stackCount: amount,
      totalValue: rate !== undefined ? Math.round(amount * rate) : undefined,
    })
  }
  return nodes
}

interface CurrencyGoldSummary {
  count: number
  goldTotal: number | undefined
}

export function computeCurrencyGoldTotal(
  inventoryCurrencies: InventoryCurrencies | undefined,
  currencies: KeyedTitles,
  conversionRates: Record<string, number> | undefined
): CurrencyGoldSummary | undefined {
  if (!inventoryCurrencies) return undefined
  const summary = summarizeCurrencies(inventoryCurrencies, currencies)
  if (summary.rows.length === 0) return undefined

  const count = summary.rows.length

  if (!conversionRates) return { count, goldTotal: undefined }

  let goldTotal = 0
  let hasAny = false
  for (const row of summary.rows) {
    const rate = conversionRates[row.key]
    if (rate !== undefined) {
      hasAny = true
      goldTotal += row.total * rate
    }
  }
  return { count, goldTotal: hasAny ? goldTotal : undefined }
}

export function summarizeCurrencies(
  inventoryCurrencies: InventoryCurrencies,
  currencies: KeyedTitles
): CurrencySummary {
  const characterIds = Object.keys(inventoryCurrencies.characters)
  const characterNames: Record<string, string> = {}
  for (const charId of characterIds) {
    const character = inventoryCurrencies.characters[charId]
    if (character === undefined) continue
    characterNames[charId] = character.displayName
  }

  const rows: CurrencySummaryRow[] = []

  for (const key of currencies.keys) {
    const characterAmounts: Record<string, number> = {}
    let total = 0

    for (const charId of characterIds) {
      const character = inventoryCurrencies.characters[charId]
      if (character === undefined) continue
      const amount = character.balances[key] ?? 0
      if (amount > 0) {
        characterAmounts[charId] = amount
        total += amount
      }
    }

    const bankAmount = inventoryCurrencies.bank?.[key] ?? 0
    total += bankAmount

    const accountAmount = inventoryCurrencies.account?.[key] ?? 0
    total += accountAmount

    if (total > 0) {
      rows.push({
        key,
        label: titleOf(currencies, key),
        characterAmounts,
        bankAmount,
        accountAmount,
        total,
      })
    }
  }

  return { rows, characterIds, characterNames }
}
