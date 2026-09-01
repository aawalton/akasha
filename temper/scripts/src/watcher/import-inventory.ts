import { getPages } from "@akasha/pages-access/get"
import type { SupabaseServiceRoleClient } from "@akasha/supabase-server/service-role"
import { partitionUnmanagedGuildBanks } from "@temper/game-items-core/inventory-guild-bank-filter"
import { readManagedGuildBanks } from "@temper/game-items-core/inventory-guild-bank-types"
import { computeNetWorth } from "@temper/game-items-core/inventory-net-worth"
import { parseInventoryContent } from "@temper/game-items-core/inventory-parser"
import { computeInventoryTotalValue } from "@temper/game-items-core/inventory-value"
import { shardInventoryJson } from "@temper/game-items-core/shard-inventory"
import { inventorySnapshotName } from "./inventory-snapshot-name.ts"

const INVENTORY_SNAPSHOT_PAGE_TYPE_SLUG = "temper-inventory-snapshot"
const NET_WORTH_DAY_PAGE_TYPE_SLUG = "temper-net-worth-day"
const PLAYER_PAGE_TYPE_SLUG = "temper-player"

// THIS IS THE ONLY THING THAT EVER WROTE A NET WORTH DOWN, AND IT HAS NOT WRITTEN ONE SINCE THE
// STORE STOPPED TAKING KEYED WRITES. The snapshot went in with `patchPage`, its chunks with
// `patchPage`, and the day's reading with `patchPage` plus `patchRow` — four keyed writes, all
// refused. The first threw, so no chunk and no net worth was ever reached.
//
// The reading side of that history is gone too. `/api/net-worth`, the net worth card on the home
// page, and the inventory Trends tab were all removed, because a chart that stops dead at the last
// day filed before the writes died draws the shape of a store that stopped listening, not the
// shape of Alan's holdings, and it had no way to tell the two apart. The readings themselves are
// still filed; nothing serves them.
//
// Everything above the landing still works — the scan parses, the value and net worth compute,
// the shards are cut — so this does all of it and then says exactly which numbers it could not
// keep. Nothing is invented and nothing is rounded to zero.
const NO_KEYED_WRITE = "the page store refuses every keyed write"

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

  console.log(`Scan timestamp: ${new Date(dataTimestamp).toISOString()}`)
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

  const { rows: playerRows } = await getPages({
    pageTypeSlug: PLAYER_PAGE_TYPE_SLUG,
    where: [{ key: "title", eq: userId }],
    select: ["settings"],
    limit: 1,
  })
  const managedSet = readManagedGuildBanks(playerRows[0]?.settings)
  const { inventory: ownedInventory, excluded } = partitionUnmanagedGuildBanks(
    inventoryData,
    managedSet
  )
  const excludedGuildBankValue = excluded.reduce((sum, entry) => sum + entry.value, 0)

  const netWorthResult = computeNetWorth(ownedInventory, conversionRates)
  const snapshotDate = new Date(dataTimestamp).toISOString().slice(0, 10)

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

  throw new Error(
    `this scan was read and then dropped — ${NO_KEYED_WRITE}. ` +
      `\`${INVENTORY_SNAPSHOT_PAGE_TYPE_SLUG}/${snapshotName}\` and its ${chunkCount} chunk(s) ` +
      `did not land, and neither did \`${NET_WORTH_DAY_PAGE_TYPE_SLUG}/${snapshotDate}\` carrying ` +
      `a net worth of ${Math.round(netWorthResult.netWorth).toLocaleString()} gold. ` +
      `Nothing in the app reads that history any more, so the number above is the only place ` +
      `this scan's net worth is said at all`
  )
}
