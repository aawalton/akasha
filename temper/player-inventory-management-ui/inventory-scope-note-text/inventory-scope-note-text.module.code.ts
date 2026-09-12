import type { ExcludedLocation } from "akasha/temper/items-core/inventory-guild-bank-filter/inventory-guild-bank-filter.module.code.ts"
import { counted } from "akasha/utils/text/counted/counted.module.code.ts"

export interface InventoryScopeFacts {
  excluded: readonly ExcludedLocation[]
  includesCurrencies: boolean
  filtered?: boolean
}

function formatGoldValue(value: number): string {
  return `${Math.round(value).toLocaleString()}g`
}

function describeExclusions(excluded: readonly ExcludedLocation[]): string | undefined {
  if (excluded.length === 0) return undefined

  const guildBanks = excluded.filter((e) => e.reason === "unmanaged-guild-bank")
  const unidentified = excluded.filter((e) => e.reason === "unclassifiable-location")
  const parts: string[] = []

  if (guildBanks.length > 0) {
    const names = guildBanks.map((e) => e.displayName).join(", ")
    parts.push(`${counted(guildBanks.length, "guild bank")} (${names})`)
  }
  if (unidentified.length > 0) {
    parts.push(counted(unidentified.length, "unidentified location"))
  }

  const total = excluded.reduce((sum, e) => sum + e.value, 0)
  return `Excludes ${parts.join(" and ")} — ${formatGoldValue(total)}.`
}

export function describeInventoryScope({
  excluded,
  includesCurrencies,
  filtered = false,
}: InventoryScopeFacts): string {
  const scope = includesCurrencies ? "Items and currencies" : "Items only"
  const narrowed = filtered ? ", matching the active filters" : ""
  const exclusions = describeExclusions(excluded)

  return exclusions === undefined ? `${scope}${narrowed}.` : `${scope}${narrowed}. ${exclusions}`
}
