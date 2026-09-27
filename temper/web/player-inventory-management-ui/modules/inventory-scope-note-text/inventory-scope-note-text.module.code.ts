import type { ExcludedLocation } from "akasha/temper/items/core/modules/inventory-guild-bank-filter/inventory-guild-bank-filter.module.code.ts"
import type { Phrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { inventoryScopeNoteTextExcludes } from "akasha/temper/web/phrase/pages/inventory-scope-note-text-excludes.temper-web-phrase.ts"
import { inventoryScopeNoteTextGold } from "akasha/temper/web/phrase/pages/inventory-scope-note-text-gold.temper-web-phrase.ts"
import { inventoryScopeNoteTextGuildBank } from "akasha/temper/web/phrase/pages/inventory-scope-note-text-guild-bank.temper-web-phrase.ts"
import { inventoryScopeNoteTextGuildBanks } from "akasha/temper/web/phrase/pages/inventory-scope-note-text-guild-banks.temper-web-phrase.ts"
import { inventoryScopeNoteTextPartsJoined } from "akasha/temper/web/phrase/pages/inventory-scope-note-text-parts-joined.temper-web-phrase.ts"
import { inventoryScopeNoteTextScopeItemsAndCurrencies } from "akasha/temper/web/phrase/pages/inventory-scope-note-text-scope-items-and-currencies.temper-web-phrase.ts"
import { inventoryScopeNoteTextScopeItemsAndCurrenciesFiltered } from "akasha/temper/web/phrase/pages/inventory-scope-note-text-scope-items-and-currencies-filtered.temper-web-phrase.ts"
import { inventoryScopeNoteTextScopeItemsOnly } from "akasha/temper/web/phrase/pages/inventory-scope-note-text-scope-items-only.temper-web-phrase.ts"
import { inventoryScopeNoteTextScopeItemsOnlyFiltered } from "akasha/temper/web/phrase/pages/inventory-scope-note-text-scope-items-only-filtered.temper-web-phrase.ts"
import { inventoryScopeNoteTextUnidentifiedLocation } from "akasha/temper/web/phrase/pages/inventory-scope-note-text-unidentified-location.temper-web-phrase.ts"
import { inventoryScopeNoteTextUnidentifiedLocations } from "akasha/temper/web/phrase/pages/inventory-scope-note-text-unidentified-locations.temper-web-phrase.ts"

export interface InventoryScopeFacts {
  excluded: readonly ExcludedLocation[]
  includesCurrencies: boolean
  filtered?: boolean
}

function describeExclusions(
  excluded: readonly ExcludedLocation[],
  phrase: Phrase
): string | undefined {
  if (excluded.length === 0) return undefined

  const guildBanks = excluded.filter((e) => e.reason === "unmanaged-guild-bank")
  const unidentified = excluded.filter((e) => e.reason === "unclassifiable-location")
  const parts: string[] = []

  if (guildBanks.length > 0) {
    const names = guildBanks.map((e) => e.displayName).join(", ")
    const page =
      guildBanks.length === 1 ? inventoryScopeNoteTextGuildBank : inventoryScopeNoteTextGuildBanks
    parts.push(phrase(page.slug, { count: guildBanks.length, names }))
  }
  if (unidentified.length > 0) {
    const page =
      unidentified.length === 1
        ? inventoryScopeNoteTextUnidentifiedLocation
        : inventoryScopeNoteTextUnidentifiedLocations
    parts.push(phrase(page.slug, { count: unidentified.length }))
  }

  const [first, second] = parts
  const joined =
    second === undefined
      ? (first ?? "")
      : phrase(inventoryScopeNoteTextPartsJoined.slug, { first: first ?? "", second })
  const total = excluded.reduce((sum, e) => sum + e.value, 0)
  const gold = phrase(inventoryScopeNoteTextGold.slug, {
    amount: Math.round(total).toLocaleString(),
  })
  return phrase(inventoryScopeNoteTextExcludes.slug, { parts: joined, gold })
}

function scopePage(includesCurrencies: boolean, filtered: boolean): { readonly slug: string } {
  if (includesCurrencies) {
    return filtered
      ? inventoryScopeNoteTextScopeItemsAndCurrenciesFiltered
      : inventoryScopeNoteTextScopeItemsAndCurrencies
  }
  return filtered
    ? inventoryScopeNoteTextScopeItemsOnlyFiltered
    : inventoryScopeNoteTextScopeItemsOnly
}

export function describeInventoryScope(
  { excluded, includesCurrencies, filtered = false }: InventoryScopeFacts,
  phrase: Phrase
): string {
  const scope = phrase(scopePage(includesCurrencies, filtered).slug)
  const exclusions = describeExclusions(excluded, phrase)

  return exclusions === undefined ? scope : `${scope} ${exclusions}`
}
