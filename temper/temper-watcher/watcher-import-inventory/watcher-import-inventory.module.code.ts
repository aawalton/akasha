import type { Asked, Query } from "@akasha/pages-system-service/asking"
import { askingFor } from "@akasha/pages-system-service/calling"
import {
  type ExcludedLocation,
  type ExclusionReason,
  partitionUnmanagedGuildBanks,
} from "@akasha/temper-items-core/inventory-guild-bank-filter"
import { readManagedGuildBanks } from "@akasha/temper-items-core/inventory-guild-bank-types"
import { computeNetWorth } from "@akasha/temper-items-core/inventory-net-worth"
import type { NetWorthResult } from "@akasha/temper-items-core/inventory-net-worth-types"
import { parseInventoryContent } from "@akasha/temper-items-core/inventory-parser"
import type { InventoryDatabase, PriceSource } from "@akasha/temper-items-core/inventory-types"
import { computeInventoryTotalValue } from "@akasha/temper-items-core/inventory-value"
import { shardInventoryJson } from "@akasha/temper-items-core/shard-inventory"
import { inventorySnapshotName } from "../watcher-inventory-snapshot-name/watcher-inventory-snapshot-name.module.code.ts"
import {
  capturedAtOf,
  landNetWorthReading,
  netWorthHourSlug,
  type ReadingValues,
} from "../watcher-net-worth-landing/watcher-net-worth-landing.module.code.ts"
import {
  type SignedInReader,
  userIdFor,
} from "../watcher-signed-in-user/watcher-signed-in-user.module.code.ts"

const INVENTORY_SNAPSHOT_PAGE_TYPE_SLUG = "temper-inventory-snapshot"

const PLAYER_PAGE_TYPE_SLUG = "temper-player"

const NO_SNAPSHOT =
  "a scan is kept in akasha as one line per slot rather than as sharded JSON, and nothing here " +
  "turns a scan into those lines yet"

const NO_REPLACEMENT_PRICING =
  "No crown consumable pricing available — skipping replacement cost enrichment."

const NO_CURRENCY_PRICING =
  "No currency pricing available — net worth will exclude currency gold values."

const NO_MARKET_PRICE =
  "WARNING: this scan ran with no market-price source — no item carries a market price, " +
  "so the total above is vendor-value-only and far below the real worth."

const GOLD_ONLY_RATES: Record<string, number> = { gold: 1 }

const MS_PER_SECOND = 1000

const UNNAMED_LOCATION = "(unnamed)"

const EXCLUSION_LABELS = {
  "unmanaged-guild-bank": "guild bank",
  "unclassifiable-location": "unreadable",
} satisfies Record<ExclusionReason, string>

export interface InventoryCounts {
  readonly locationCount: number
  readonly itemCount: number
}

export interface Filing {
  readonly outcome: string
  readonly at: string
}

export type AskForPages = (query: Query) => Promise<Asked>

export type LandedReading =
  | { readonly outcome: "landed" | "already"; readonly at: string }
  | { readonly outcome: "refused"; readonly why: string }

export type LandReading = (values: ReadingValues, minted: () => string) => Promise<LandedReading>

export interface ImportInventoryTools {
  readonly say?: (line: string) => void
  readonly now?: () => number
  readonly mint?: () => string
  readonly ask?: AskForPages
  readonly land?: LandReading
}

export function countInventory(inventory: InventoryDatabase): InventoryCounts {
  let itemCount = 0
  for (const location of Object.values(inventory.locations)) {
    for (const bag of Object.values(location.bags)) {
      itemCount += Object.keys(bag).length
    }
  }
  return { locationCount: Object.keys(inventory.locations).length, itemCount }
}

export function scanTimestampOf(inventory: InventoryDatabase, now: number): number {
  const lastFullScan = inventory.meta.lastFullScan
  return lastFullScan > 0 ? lastFullScan * MS_PER_SECOND : now
}

export function excludedValueOf(excluded: readonly ExcludedLocation[]): number {
  return excluded.reduce((sum, entry) => sum + entry.value, 0)
}

function asGold(amount: number): string {
  return amount.toLocaleString()
}

function asRoundedGold(amount: number): string {
  return Math.round(amount).toLocaleString()
}

export function scanLines(
  counts: InventoryCounts,
  capturedAt: string,
  totalValue: number,
  priceSource: PriceSource | undefined,
  chunkCount: number
): readonly string[] {
  const lines = [
    `Found ${counts.locationCount} location(s), ${counts.itemCount} item(s).`,
    "",
    NO_REPLACEMENT_PRICING,
    `Scan timestamp: ${capturedAt}`,
    `Estimated scanned value: ${asRoundedGold(totalValue)} gold (all locations)`,
  ]
  if (priceSource === "none") lines.push(NO_MARKET_PRICE)
  lines.push("", `Sharded inventory into ${chunkCount} chunk(s).`, "", NO_CURRENCY_PRICING)
  return lines
}

export function summaryLines(
  counts: InventoryCounts,
  totalValue: number,
  netWorth: NetWorthResult,
  excluded: readonly ExcludedLocation[]
): readonly string[] {
  const lines = [
    "",
    "=== Summary ===",
    `  Locations:      ${counts.locationCount}`,
    `  Items:          ${counts.itemCount}`,
    `  Scanned value:  ${asRoundedGold(totalValue)} gold (all locations)`,
    `  Net worth:      ${asGold(netWorth.netWorth)} gold (owned only)`,
    `    Items:        ${asGold(netWorth.itemValue)} gold`,
    `    Gold:         ${asGold(netWorth.goldAmount)} gold`,
    `    Currencies:   ${asGold(netWorth.currencyGoldValue)} gold`,
  ]
  if (excluded.length === 0) return lines
  const held = asRoundedGold(excludedValueOf(excluded))
  lines.push(`  Excluded from net worth: ${held} gold across ${excluded.length} location(s)`)
  for (const entry of excluded) {
    const name = entry.displayName === "" ? UNNAMED_LOCATION : entry.displayName
    const label = EXCLUSION_LABELS[entry.reason]
    lines.push(`    ${name} — ${asRoundedGold(entry.value)} gold (${label})`)
  }
  return lines
}

export function filedLines(
  capturedAt: string,
  filing: Filing,
  snapshotName: string,
  chunkCount: number
): readonly string[] {
  const hour = netWorthHourSlug(capturedAt)
  return [
    "",
    `  Net worth filed on \`${hour}\` (${filing.outcome} at ${filing.at}).`,
    `  ${INVENTORY_SNAPSHOT_PAGE_TYPE_SLUG}/at-${snapshotName} and its ${chunkCount} chunk(s) ` +
      `were not filed: ${NO_SNAPSHOT}.`,
  ]
}

export async function runImportInventory(
  content: string,
  supabase: SignedInReader,
  options: { userId?: string } = {},
  tools: ImportInventoryTools = {}
): Promise<void> {
  const say = tools.say ?? console.log
  const now = tools.now ?? Date.now
  const mint = tools.mint ?? (() => Bun.randomUUIDv7())
  const ask = tools.ask ?? ((query: Query) => askingFor(query))
  const land =
    tools.land ??
    ((values: ReadingValues, minted: () => string) => landNetWorthReading(values, minted))

  const userId = await userIdFor(supabase, options.userId, "file this inventory scan")

  const inventory = parseInventoryContent(content)
  const counts = countInventory(inventory)
  const totalValue = computeInventoryTotalValue(inventory)
  const dataTimestamp = scanTimestampOf(inventory, now())
  const capturedAt = capturedAtOf(dataTimestamp)
  const chunkCount = shardInventoryJson(JSON.stringify(inventory)).length

  const opening = scanLines(counts, capturedAt, totalValue, inventory.meta.priceSource, chunkCount)
  for (const line of opening) say(line)

  const asked = await ask({
    pageTypeSlug: PLAYER_PAGE_TYPE_SLUG,
    where: { accountPage: { is: userId } },
    limit: 1,
  })
  if ("refused" in asked) {
    throw new Error(
      `the player page went unread, so which guild banks are managed is unknown — ${asked.refused}`
    )
  }

  const managed = readManagedGuildBanks(asked.rows[0]?.settings)
  const { inventory: owned, excluded } = partitionUnmanagedGuildBanks(inventory, managed)
  const netWorth = computeNetWorth(owned, GOLD_ONLY_RATES)

  for (const line of summaryLines(counts, totalValue, netWorth, excluded)) say(line)

  const landed = await land(
    {
      id: mint(),
      accountPage: userId,
      capturedAt,
      totalValue: netWorth.netWorth,
      goldAmount: netWorth.goldAmount,
      currencyGoldValue: netWorth.currencyGoldValue,
      itemValue: netWorth.itemValue,
      excludedGuildBankValue: excludedValueOf(excluded),
    },
    mint
  )
  if (landed.outcome === "refused") {
    throw new Error(
      `this scan's net worth did not land on \`${netWorthHourSlug(capturedAt)}\` — ${landed.why}`
    )
  }

  const snapshotName = inventorySnapshotName(dataTimestamp)
  for (const line of filedLines(capturedAt, landed, snapshotName, chunkCount)) say(line)
}
