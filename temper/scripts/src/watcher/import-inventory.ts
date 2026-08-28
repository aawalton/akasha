import { getPages } from "@shared/pages-access/get"
import { patchPage, patchRow } from "@shared/pages-query"
import { askPage, type PageAsked } from "@shared/pages-query/ask"
import type { SupabaseServiceRoleClient } from "../../../../shared/supabase-server/src/service-role"
import { partitionUnmanagedGuildBanks } from "@temper/game-items-core/inventory-guild-bank-filter"
import { readManagedGuildBanks } from "@temper/game-items-core/inventory-guild-bank-types"
import { computeNetWorth } from "@temper/game-items-core/inventory-net-worth"
import { parseInventoryContent } from "@temper/game-items-core/inventory-parser"
import { computeInventoryTotalValue } from "@temper/game-items-core/inventory-value"
import { shardInventoryJson } from "@temper/game-items-core/shard-inventory"
import { inventoryChunkName, inventorySnapshotName } from "./inventory-snapshot-name"

const INVENTORY_SNAPSHOT_PAGE_TYPE_SLUG = "temper-inventory-snapshot"
const INVENTORY_CHUNK_PAGE_TYPE_SLUG = "temper-inventory-chunk"
const NET_WORTH_SNAPSHOT_PAGE_TYPE_SLUG = "temper-net-worth-snapshot"
const NET_WORTH_DAY_PAGE_TYPE_SLUG = "temper-net-worth-day"
const WRITER = "temper-import-inventory"
const PLAYER_PAGE_TYPE_SLUG = "temper-player"

/**
 * A FRESH ID ONLY WHERE THE STORE SAID NO PAGE STANDS. A read that never reached the store says
 * nothing about whether the page is there, and an id minted on it is a second identity for a page
 * that already has one. Nothing but the write failing alongside the read has held that back.
 */
function mintedIfAbsent(asked: PageAsked, what: string): Readonly<Record<string, string>> {
  if (asked.outcome === "found") return {}
  if (asked.outcome === "absent") return { id: Bun.randomUUIDv7() }
  throw new Error(
    `${what} went unread, so nothing here says whether it already stands and a fresh id would give it a second identity: ${asked.why}`
  )
}

async function landNetWorth(day: string, values: Readonly<Record<string, unknown>>): Promise<void> {
  const standing = await askPage(NET_WORTH_DAY_PAGE_TYPE_SLUG, day)
  const written = await patchPage(
    NET_WORTH_DAY_PAGE_TYPE_SLUG,
    day,
    { ...mintedIfAbsent(standing, `the day ${day}`), title: day, slug: day, date: day },
    WRITER
  )
  if (!written.ok) throw new Error(`the day ${day} could not be written: ${written.why}`)
  const landed = await patchRow(NET_WORTH_SNAPSHOT_PAGE_TYPE_SLUG, day, values, WRITER)
  if (!landed.ok) throw new Error(`the reading for ${day} could not be written: ${landed.why}`)
}

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
  const standingSnapshot = await askPage(INVENTORY_SNAPSHOT_PAGE_TYPE_SLUG, snapshotName)
  const snapshotWritten = await patchPage(
    INVENTORY_SNAPSHOT_PAGE_TYPE_SLUG,
    snapshotName,
    {
      ...mintedIfAbsent(standingSnapshot, `the inventory snapshot ${snapshotName}`),
      "account-page": userId,
      "data-timestamp": dataTimestamp,
      "total-value": totalValue,
      "chunk-count": chunkCount,
      version: "v1",
    },
    WRITER
  )
  if (!snapshotWritten.ok) {
    throw new Error(
      `the inventory snapshot ${snapshotName} could not be written: ${snapshotWritten.why}`
    )
  }

  for (let i = 0; i < chunkCount; i++) {
    const chunkName = inventoryChunkName(snapshotName, i)
    const standingChunk = await askPage(INVENTORY_CHUNK_PAGE_TYPE_SLUG, chunkName)
    const chunkWritten = await patchPage(
      INVENTORY_CHUNK_PAGE_TYPE_SLUG,
      chunkName,
      {
        ...mintedIfAbsent(standingChunk, `the inventory chunk ${chunkName}`),
        "account-page": userId,
        "chunk-index": i,
        inventory: snapshotName,
        data: chunkPayloads[i] ?? "",
      },
      WRITER
    )
    if (!chunkWritten.ok) {
      throw new Error(`the inventory chunk ${chunkName} could not be written: ${chunkWritten.why}`)
    }
  }

  console.log(`Wrote inventory snapshot ${snapshotName} and ${chunkCount} chunk(s).`)

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

  await landNetWorth(snapshotDate, {
    slug: `${userId}-${dataTimestamp}`,
    userId,
    dataTimestamp,
    totalValue: netWorthResult.netWorth,
    itemValue: netWorthResult.itemValue,
    goldAmount: netWorthResult.goldAmount,
    currencyGoldValue: netWorthResult.currencyGoldValue,
    excludedGuildBankValue,
  })

  console.log(`Upserted net worth for ${snapshotDate}.`)

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
}
