import { expect, test } from "bun:test"
import type { ExcludedLocation } from "@akasha/temper-items-core/inventory-guild-bank-filter"
import type { NetWorthResult } from "@akasha/temper-items-core/inventory-net-worth-types"
import type { InventoryDatabase } from "@akasha/temper-items-core/inventory-types"
import type { SignedInReader } from "../watcher-signed-in-user/watcher-signed-in-user.module.code.ts"
import {
  countInventory,
  excludedValueOf,
  filedLines,
  runImportInventory,
  scanLines,
  scanTimestampOf,
  summaryLines,
} from "./watcher-import-inventory.module.code.ts"

const COUNTS = { locationCount: 3, itemCount: 47 }

const CAPTURED_AT = "2026-07-25T06:28:27.000Z"

const TOTAL_VALUE = 812.4

const NO_MARKET_PRICE =
  "WARNING: this scan ran with no market-price source — no item carries a market price, so the " +
  "total above is vendor-value-only and far below the real worth."

const NOT_FILED =
  "were not filed: a scan is kept in akasha as one line per slot rather than as sharded JSON, " +
  "and nothing here turns a scan into those lines yet."

const NET_WORTH: NetWorthResult = {
  itemValue: 500,
  goldAmount: 120,
  currencyGoldValue: 20,
  netWorth: 640,
  breakdown: { currencies: [] },
}

const EXCLUDED: readonly ExcludedLocation[] = [
  { key: "guild-a", displayName: "Traders", value: 90, reason: "unmanaged-guild-bank" },
  { key: "guild-b", displayName: "", value: 4, reason: "unclassifiable-location" },
]

const ONE_LOCATION_LUA = `TemperInventory_SavedVariables =
{
    ["Default"] =
    {
        ["@alan"] =
        {
            ["$AccountWide"] =
            {
                ["db"] =
                {
                    ["locations"] =
                    {
                        ["char-1"] =
                        {
                            ["displayName"] = "Alan",
                            ["lastScanned"] = 1753425307,
                            ["bags"] = {},
                        },
                    },
                    ["meta"] =
                    {
                        ["displayName"] = "@alan",
                        ["worldName"] = "NA",
                        ["lastFullScan"] = 1753425307,
                        ["priceSource"] = "none",
                    },
                },
            },
        },
    },
}
`

const ACCOUNT_UNASKED: SignedInReader = {
  auth: { getUser: async () => ({ data: { user: null }, error: null }) },
}

function inventoryOf(shape: unknown): InventoryDatabase {
  return shape as InventoryDatabase
}

test("the opening report matches what the legacy import wrote for a scan with no price source", () => {
  const legacy = [
    "Found 3 location(s), 47 item(s).\n",
    "No crown consumable pricing available — skipping replacement cost enrichment.",
    "Scan timestamp: 2026-07-25T06:28:27.000Z",
    "Estimated scanned value: 812 gold (all locations)",
    NO_MARKET_PRICE,
    "",
    "Sharded inventory into 2 chunk(s).",
    "\nNo currency pricing available — net worth will exclude currency gold values.",
  ].join("\n")
  expect(scanLines(COUNTS, CAPTURED_AT, TOTAL_VALUE, "none", 2).join("\n")).toBe(legacy)
})

test("the opening report drops the warning where the scan carries market prices", () => {
  const legacy = [
    "Found 1 location(s), 9 item(s).\n",
    "No crown consumable pricing available — skipping replacement cost enrichment.",
    "Scan timestamp: 2026-07-25T06:28:27.000Z",
    "Estimated scanned value: 812 gold (all locations)",
    "",
    "Sharded inventory into 1 chunk(s).",
    "\nNo currency pricing available — net worth will exclude currency gold values.",
  ].join("\n")
  const counts = { locationCount: 1, itemCount: 9 }
  expect(scanLines(counts, CAPTURED_AT, TOTAL_VALUE, "ttc", 1).join("\n")).toBe(legacy)
})

test("the summary matches what the legacy import wrote where guild banks were set aside", () => {
  const legacy = [
    "\n=== Summary ===",
    "  Locations:      3",
    "  Items:          47",
    "  Scanned value:  812 gold (all locations)",
    "  Net worth:      640 gold (owned only)",
    "    Items:        500 gold",
    "    Gold:         120 gold",
    "    Currencies:   20 gold",
    "  Excluded from net worth: 94 gold across 2 location(s)",
    "    Traders — 90 gold (guild bank)",
    "    (unnamed) — 4 gold (unreadable)",
  ].join("\n")
  expect(summaryLines(COUNTS, TOTAL_VALUE, NET_WORTH, EXCLUDED).join("\n")).toBe(legacy)
})

test("the summary matches what the legacy import wrote where nothing was set aside", () => {
  const legacy = [
    "\n=== Summary ===",
    "  Locations:      1",
    "  Items:          9",
    "  Scanned value:  812 gold (all locations)",
    "  Net worth:      640 gold (owned only)",
    "    Items:        500 gold",
    "    Gold:         120 gold",
    "    Currencies:   20 gold",
  ].join("\n")
  const counts = { locationCount: 1, itemCount: 9 }
  expect(summaryLines(counts, TOTAL_VALUE, NET_WORTH, []).join("\n")).toBe(legacy)
})

test("the closing report matches what the legacy import wrote once the reading was filed", () => {
  const legacy = [
    "\n  Net worth filed on `hour-2026-07-25-06` (landed at abc1234).",
    `  temper-inventory-snapshot/at-2026-07-25-06-28-27 and its 2 chunk(s) ${NOT_FILED}`,
  ].join("\n")
  const filing = { outcome: "landed", at: "abc1234" }
  expect(filedLines(CAPTURED_AT, filing, "2026-07-25-06-28-27", 2).join("\n")).toBe(legacy)
})

test("a whole import writes what the legacy import wrote over the same scan", async () => {
  const legacy = [
    "Found 1 location(s), 0 item(s).",
    "",
    "No crown consumable pricing available — skipping replacement cost enrichment.",
    "Scan timestamp: 2025-07-25T06:35:07.000Z",
    "Estimated scanned value: 0 gold (all locations)",
    NO_MARKET_PRICE,
    "",
    "Sharded inventory into 1 chunk(s).",
    "",
    "No currency pricing available — net worth will exclude currency gold values.",
    "",
    "=== Summary ===",
    "  Locations:      1",
    "  Items:          0",
    "  Scanned value:  0 gold (all locations)",
    "  Net worth:      0 gold (owned only)",
    "    Items:        0 gold",
    "    Gold:         0 gold",
    "    Currencies:   0 gold",
    "  Excluded from net worth: 0 gold across 1 location(s)",
    "    Alan — 0 gold (guild bank)",
    "",
    "  Net worth filed on `hour-2025-07-25-06` (landed at abc1234).",
    `  temper-inventory-snapshot/at-2025-07-25-06-35-07 and its 1 chunk(s) ${NOT_FILED}`,
  ].join("\n")
  const said: string[] = []
  await runImportInventory(
    ONE_LOCATION_LUA,
    ACCOUNT_UNASKED,
    { userId: "account-1" },
    {
      say: (line) => {
        said.push(line)
      },
      now: () => 0,
      mint: () => "id-1",
      ask: async () => ({ rows: [{ settings: {} }] }),
      land: async () => ({ outcome: "landed" as const, at: "abc1234" }),
    }
  )
  expect(said.join("\n")).toBe(legacy)
})

test("the reading handed over carries the account, the moment, and every part of net worth", async () => {
  let handed: unknown = null
  await runImportInventory(
    ONE_LOCATION_LUA,
    ACCOUNT_UNASKED,
    { userId: "account-1" },
    {
      say: () => undefined,
      now: () => 0,
      mint: () => "id-1",
      ask: async () => ({ rows: [{ settings: {} }] }),
      land: async (values) => {
        handed = values
        return { outcome: "landed" as const, at: "abc1234" }
      },
    }
  )
  expect(handed).toEqual({
    id: "id-1",
    accountPage: "account-1",
    capturedAt: "2025-07-25T06:35:07.000Z",
    totalValue: 0,
    goldAmount: 0,
    currencyGoldValue: 0,
    itemValue: 0,
    excludedGuildBankValue: 0,
  })
})

test("a filing refused ends the import and names the hour the reading was for", async () => {
  const run = runImportInventory(
    ONE_LOCATION_LUA,
    ACCOUNT_UNASKED,
    { userId: "account-1" },
    {
      say: () => undefined,
      now: () => 0,
      mint: () => "id-1",
      ask: async () => ({ rows: [{ settings: {} }] }),
      land: async () => ({ outcome: "refused" as const, why: "the store would not take it" }),
    }
  )
  await expect(run).rejects.toThrow(
    "this scan's net worth did not land on `hour-2025-07-25-06` — the store would not take it"
  )
})

test("an import whose player page went unread says the managed guild banks are unknown", async () => {
  const run = runImportInventory(
    ONE_LOCATION_LUA,
    ACCOUNT_UNASKED,
    { userId: "account-1" },
    {
      say: () => undefined,
      now: () => 0,
      mint: () => "id-1",
      ask: async () => ({ refused: "the pages answered nothing" }),
      land: async () => ({ outcome: "landed" as const, at: "abc1234" }),
    }
  )
  await expect(run).rejects.toThrow(
    "the player page went unread, so which guild banks are managed is unknown — the pages answered nothing"
  )
})

test("an import with no signed-in account is refused, naming what the session said", async () => {
  const supabase: SignedInReader = {
    auth: {
      getUser: async () => ({ data: { user: null }, error: { message: "token expired" } }),
    },
  }
  await expect(runImportInventory("", supabase)).rejects.toThrow(
    "no signed-in user to file this inventory scan (token expired)"
  )
})

test("a location's every bag is counted toward the item count", () => {
  const inventory = inventoryOf({
    locations: {
      alpha: { bags: { 1: { 0: {}, 1: {} }, 2: { 0: {} } } },
      beta: { bags: { 1: { 0: {}, 1: {}, 2: {}, 3: {} } } },
    },
    meta: { displayName: "", worldName: "", lastFullScan: 0 },
  })
  expect(countInventory(inventory)).toEqual({ locationCount: 2, itemCount: 7 })
})

test("an inventory holding no location counts nothing", () => {
  const inventory = inventoryOf({
    locations: {},
    meta: { displayName: "", worldName: "", lastFullScan: 0 },
  })
  expect(countInventory(inventory)).toEqual({ locationCount: 0, itemCount: 0 })
})

test("a capture moment the scan states is read as whole seconds since the epoch", () => {
  const inventory = inventoryOf({
    locations: {},
    meta: { displayName: "", worldName: "", lastFullScan: 1_753_425_307 },
  })
  expect(scanTimestampOf(inventory, 42)).toBe(1_753_425_307_000)
})

test("a scan stating no capture moment takes the moment given in", () => {
  const inventory = inventoryOf({
    locations: {},
    meta: { displayName: "", worldName: "", lastFullScan: 0 },
  })
  expect(scanTimestampOf(inventory, 42)).toBe(42)
})

test("a player page that went unread makes no fresh id and files no reading", async () => {
  const minted: string[] = []
  const landed: unknown[] = []
  const run = runImportInventory(
    ONE_LOCATION_LUA,
    ACCOUNT_UNASKED,
    { userId: "account-1" },
    {
      say: () => undefined,
      now: () => 0,
      mint: () => {
        minted.push("id-1")
        return "id-1"
      },
      ask: async () => ({ refused: "the pages answered nothing" }),
      land: async (values) => {
        landed.push(values)
        return { outcome: "landed" as const, at: "abc1234" }
      },
    }
  )
  await expect(run).rejects.toThrow("the player page went unread")
  expect(minted).toEqual([])
  expect(landed).toEqual([])
})

test("the gold set aside is the sum over every excluded location", () => {
  expect(excludedValueOf(EXCLUDED)).toBe(94)
  expect(excludedValueOf([])).toBe(0)
})
