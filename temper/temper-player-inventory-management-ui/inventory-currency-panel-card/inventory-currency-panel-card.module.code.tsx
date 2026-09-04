"use client"

import { summarizeCurrencies } from "@akasha/temper-items-core/inventory-currencies"
import type { InventoryNode } from "@akasha/temper-items-core/inventory-node-types"
import type { InventoryCurrencies } from "@akasha/temper-items-core/inventory-types"
import { useMemo } from "react"
import { InventoryPanelCard } from "../inventory-panel-card/inventory-panel-card.module.code.tsx"

function buildCurrencyNodes(
  currencies: InventoryCurrencies,
  conversionRates?: Record<string, number>
): readonly InventoryNode[] {
  const summary = summarizeCurrencies(currencies)
  if (summary.rows.length === 0) return []

  const hasNonCharacterSource = summary.rows.some(
    (row) => row.bankAmount > 0 || row.accountAmount > 0
  )
  const characterCount = summary.characterIds.length

  return summary.rows.map((row) => {
    const rate = conversionRates?.[row.key]
    const sources: InventoryNode[] = []

    if (characterCount > 1 && hasNonCharacterSource) {
      const characterChildren: InventoryNode[] = []
      for (const charId of summary.characterIds) {
        const amount = row.characterAmounts[charId] ?? 0
        if (amount <= 0) continue
        characterChildren.push({
          key: charId,
          label: summary.characterNames[charId] ?? charId,
          stackCount: amount,
          totalValue: rate !== undefined ? amount * rate : undefined,
        })
      }
      if (characterChildren.length > 0) {
        sources.push({ key: "characters", label: "Characters", children: characterChildren })
      }
    } else {
      for (const charId of summary.characterIds) {
        const amount = row.characterAmounts[charId] ?? 0
        if (amount > 0) {
          sources.push({
            key: charId,
            label: summary.characterNames[charId] ?? charId,
            stackCount: amount,
            totalValue: rate !== undefined ? amount * rate : undefined,
          })
        }
      }
    }

    if (row.bankAmount > 0) {
      sources.push({
        key: "bank",
        label: "Bank",
        stackCount: row.bankAmount,
        totalValue: rate !== undefined ? row.bankAmount * rate : undefined,
      })
    }

    if (row.accountAmount > 0) {
      sources.push({
        key: "account",
        label: "Account",
        stackCount: row.accountAmount,
        totalValue: rate !== undefined ? row.accountAmount * rate : undefined,
      })
    }

    return { key: row.key, label: row.label, children: sources }
  })
}

interface InventoryCurrencyPanelCardProps {
  currencies: InventoryCurrencies
  conversionRates?: Record<string, number>
}

export function InventoryCurrencyPanelCard({
  currencies,
  conversionRates,
}: InventoryCurrencyPanelCardProps) {
  const nodes = useMemo(
    () => buildCurrencyNodes(currencies, conversionRates),
    [currencies, conversionRates]
  )

  if (nodes.length === 0) return null

  return (
    <InventoryPanelCard
      id="inventory-currencies"
      title="Currencies"
      items={nodes}
      collapseProtected
      actionButtonCount={0}
    />
  )
}
