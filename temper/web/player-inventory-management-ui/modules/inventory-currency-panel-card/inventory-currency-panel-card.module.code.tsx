"use client"

import { summarizeCurrencies } from "akasha/temper/items/core/modules/inventory-currencies/inventory-currencies.module.code.ts"
import type { InventoryNode } from "akasha/temper/items/core/modules/inventory-node-types/inventory-node-types.module.code.ts"
import type { InventoryCurrencies } from "akasha/temper/items/core/modules/inventory-types/inventory-types.module.code.ts"
import {
  type KeyedTitles,
  titleIn,
} from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import { bank } from "akasha/temper/items/rules/routing/core/temper-venue/pages/bank.temper-venue.ts"
import { temperVenue } from "akasha/temper/items/rules/routing/core/temper-venue/temper-venue.page-type.ts"
import { useKeyedTitles } from "akasha/temper/web/modules/use-keyed-titles/use-keyed-titles.module.code.tsx"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { inventoryCurrencyPanelCardAccount } from "akasha/temper/web/phrase/pages/inventory-currency-panel-card-account.temper-web-phrase.ts"
import { inventoryCurrencyPanelCardCharacters } from "akasha/temper/web/phrase/pages/inventory-currency-panel-card-characters.temper-web-phrase.ts"
import { inventorySummaryPanelCardCurrencies } from "akasha/temper/web/phrase/pages/inventory-summary-panel-card-currencies.temper-web-phrase.ts"
import { InventoryPanelCard } from "akasha/temper/web/player-inventory-management-ui/modules/inventory-panel-card/inventory-panel-card.module.code.tsx"
import { useMemo } from "react"

interface SourceWords {
  readonly characters: string
  readonly bank: string
  readonly account: string
}

function buildCurrencyNodes(
  currencies: InventoryCurrencies,
  titles: KeyedTitles,
  words: SourceWords,
  conversionRates?: Record<string, number>
): readonly InventoryNode[] {
  const summary = summarizeCurrencies(currencies, titles)
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
        sources.push({ key: "characters", label: words.characters, children: characterChildren })
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
        label: words.bank,
        stackCount: row.bankAmount,
        totalValue: rate !== undefined ? row.bankAmount * rate : undefined,
      })
    }

    if (row.accountAmount > 0) {
      sources.push({
        key: "account",
        label: words.account,
        stackCount: row.accountAmount,
        totalValue: rate !== undefined ? row.accountAmount * rate : undefined,
      })
    }

    return { key: row.key, label: row.label, children: sources }
  })
}

interface InventoryCurrencyPanelCardProps {
  currencies: InventoryCurrencies
  titles: KeyedTitles
  conversionRates?: Record<string, number>
}

export function InventoryCurrencyPanelCard({
  currencies,
  titles,
  conversionRates,
}: InventoryCurrencyPanelCardProps) {
  const phrase = usePhrase()
  const venues = useKeyedTitles(temperVenue.slug)
  const nodes = useMemo(
    () =>
      buildCurrencyNodes(
        currencies,
        titles,
        {
          characters: phrase(inventoryCurrencyPanelCardCharacters.slug),
          bank: titleIn(venues, bank.key),
          account: phrase(inventoryCurrencyPanelCardAccount.slug),
        },
        conversionRates
      ),
    [currencies, titles, conversionRates, phrase, venues]
  )

  if (nodes.length === 0) return null

  return (
    <InventoryPanelCard
      id="inventory-currencies"
      title={phrase(inventorySummaryPanelCardCurrencies.slug)}
      items={nodes}
      collapseProtected
      actionButtonCount={0}
    />
  )
}
