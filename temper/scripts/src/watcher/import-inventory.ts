import { askingFor } from "@akasha/pages-system-service/calling"
import type { SupabaseServiceRoleClient } from "@akasha/supabase-server/service-role"
import { partitionUnmanagedGuildBanks } from "@akasha/temper-items-core/inventory-guild-bank-filter"
import { readManagedGuildBanks } from "@akasha/temper-items-core/inventory-guild-bank-types"
import { computeNetWorth } from "@akasha/temper-items-core/inventory-net-worth"
import { parseInventoryContent } from "@akasha/temper-items-core/inventory-parser"
import { computeInventoryTotalValue } from "@akasha/temper-items-core/inventory-value"
import { shardInventoryJson } from "@akasha/temper-items-core/shard-inventory"
import { inventorySnapshotName } from "./inventory-snapshot-name.ts"
import { capturedAtOf, landNetWorthReading, netWorthHourSlug } from "./net-worth-hour-landing.ts"

const INVENTORY_SNAPSHOT_PAGE_TYPE_SLUG = "temper-inventory-snapshot"

const PLAYER_PAGE_TYPE_SLUG = "temper-player"

// THE SNAPSHOT AND ITS CHUNKS STILL DO NOT LAND. Both page types stand in akasha —
// `akasha/temper/temper-holdings/inventory-snapshots` and `.../inventory-chunks` — but the
// recreation turned the sharded JSON into one `stacks` line per slot and left the chunk pages
// counting bytes that are not in akasha. Deriving those lines from a scan is its own conversion and
// its own proof, and a scan half filed is worse than a scan filed nowhere. So this says which
// numbers it could not keep rather than writing a second shape of them.
const NO_SNAPSHOT =
  "a scan is kept in akasha as one line per slot rather than as sharded JSON, and nothing here " +
  "turns a scan into those lines yet"

export async function runImportInventory(
  content: string,
  supabase: SupabaseServiceRoleClient,
  options: { userId?: string } = {}
): Promise<void> {
  let userId = options.userId
  if (userId == null) {
    const userResult = await supabase.auth.getUser()
    if (userResult.error || !userResult.data.user) {
      throw new Error(
        `runImportInventory: not authenticated (${userResult.error?.message ?? "no user"})`
      )
    }
    userId = userResult.data.user.id
  }

  const inventoryData = parseInventoryContent(content)

  let itemCount = 0
  const locationCount = Object.keys(inventoryData.locations).length
  for (const location of Object.values(inventoryData.locations)) {
    for (const bag of Object.values(location.bags)) {
      itemCount += Object.keys(bag).length
    }
  }

  console.log(`Found ${locationCount} location(s), ${itemCount} item(s).\n`)

  console.log(`No crown consumable pricing available — skipping replacement cost enrichment.`)

  const totalValue = computeInventoryTotalValue(inventoryData)
  const lastFullScan = inventoryData.meta.lastFullScan
  const dataTimestamp = lastFullScan > 0 ? lastFullScan * 1000 : Date.now()
  const capturedAt = capturedAtOf(dataTimestamp)

  console.log(`Scan timestamp: ${capturedAt}`)
  console.log(
    `Estimated scanned value: ${Math.round(totalValue).toLocaleString()} gold (all locations)`
  )
  if (inventoryData.meta.priceSource === "none") {
    console.log(
      "WARNING: this scan ran with no market-price source — no item carries a market price, " +
        "so the total above is vendor-value-only and far below the real worth."
    )
  }
  console.log("")

  const encoded = JSON.stringify(inventoryData)
  const chunkPayloads = shardInventoryJson(encoded)
  const chunkCount = chunkPayloads.length
  console.log(`Sharded inventory into ${chunkCount} chunk(s).`)

  const snapshotName = inventorySnapshotName(dataTimestamp)

  const conversionRates: Record<string, number> = { gold: 1 }
  console.log(`\nNo currency pricing available — net worth will exclude currency gold values.`)

  const asked = await askingFor({
    pageTypeSlug: PLAYER_PAGE_TYPE_SLUG,
    where: { accountPage: { is: userId } },
    limit: 1,
  })
  if ("refused" in asked) {
    throw new Error(`runImportInventory: the player went unread — ${asked.refused}`)
  }
  const managedSet = readManagedGuildBanks(asked.rows[0]?.settings)
  const { inventory: ownedInventory, excluded } = partitionUnmanagedGuildBanks(
    inventoryData,
    managedSet
  )
  const excludedGuildBankValue = excluded.reduce((sum, entry) => sum + entry.value, 0)

  const netWorthResult = computeNetWorth(ownedInventory, conversionRates)

  console.log(`\n=== Summary ===`)
  console.log(`  Locations:      ${locationCount}`)
  console.log(`  Items:          ${itemCount}`)
  console.log(`  Scanned value:  ${Math.round(totalValue).toLocaleString()} gold (all locations)`)
  console.log(`  Net worth:      ${netWorthResult.netWorth.toLocaleString()} gold (owned only)`)
  console.log(`    Items:        ${netWorthResult.itemValue.toLocaleString()} gold`)
  console.log(`    Gold:         ${netWorthResult.goldAmount.toLocaleString()} gold`)
  console.log(`    Currencies:   ${netWorthResult.currencyGoldValue.toLocaleString()} gold`)
  if (excluded.length > 0) {
    console.log(
      `  Excluded from net worth: ${Math.round(excludedGuildBankValue).toLocaleString()} gold across ${excluded.length} location(s)`
    )
    for (const entry of excluded) {
      const label = entry.reason === "unclassifiable-location" ? "unreadable" : "guild bank"
      console.log(
        `    ${entry.displayName !== "" ? entry.displayName : "(unnamed)"} — ${Math.round(entry.value).toLocaleString()} gold (${label})`
      )
    }
  }

  const landed = await landNetWorthReading(
    {
      id: Bun.randomUUIDv7(),
      accountPage: userId,
      capturedAt,
      totalValue: netWorthResult.netWorth,
      goldAmount: netWorthResult.goldAmount,
      currencyGoldValue: netWorthResult.currencyGoldValue,
      itemValue: netWorthResult.itemValue,
      excludedGuildBankValue,
    },
    () => Bun.randomUUIDv7()
  )
  if (landed.outcome === "refused") {
    throw new Error(
      `this scan's net worth did not land on \`${netWorthHourSlug(capturedAt)}\` — ${landed.why}`
    )
  }
  console.log(
    `\n  Net worth filed on \`${netWorthHourSlug(capturedAt)}\` (${landed.outcome} at ${landed.at}).`
  )

  console.log(
    `  ${INVENTORY_SNAPSHOT_PAGE_TYPE_SLUG}/at-${snapshotName} and its ${chunkCount} chunk(s) ` +
      `were not filed: ${NO_SNAPSHOT}.`
  )
}
