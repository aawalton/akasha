import { expect, test } from "bun:test"
import type {
  InventoryDatabase,
  InventoryItemData,
  InventoryLocationData,
} from "@akasha/temper-items-core/inventory-types"
import { computeBuyShortfall } from "@akasha/temper-items-rules-core/buy-rule-eval"
import type { InventoryRuleSettings } from "@akasha/temper-items-rules-core/inventory-rule-types"
import type {
  ReadFiles,
  ReadPages,
} from "../watcher-page-landing/watcher-page-landing.module.code.ts"
import {
  type BuyStock,
  compileBuyStock,
  compileCharacterPriority,
  compileConsumableStock,
  compileWantedConsumables,
  describeInventoryReadFailure,
  type InventoryReadFailure,
  type InventoryRow,
  type InventoryRowReader,
  readLatestInventory,
  snapshotDataOf,
  toRuleSettings,
} from "./watcher-settings-consumables.module.code.ts"

const GARLIC_HAGFISH_HASH =
  "ATQHgAAAAAAf_4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABXr164BatWrQBQoUKAAQQmQAA"
const CHEESE_PLATE_HASH =
  "ATQHgAAAAAAf_4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABXr164BatWrQBQoUKAAgAGQAA"

const GARLIC_HAGFISH_ITEM = 68235
const CHEESE_PLATE_ITEM = 68236
const TRI_RESTORATION_ITEM = 64710
const SPELLCASTER_ELIXIR_ITEM = 112427

const CHARACTERS = [
  { esoCharacterId: "111", targetBuildHash: GARLIC_HAGFISH_HASH },
  { esoCharacterId: "222", targetBuildHash: GARLIC_HAGFISH_HASH },
  { esoCharacterId: "333" },
  { esoCharacterId: "444", targetBuildHash: CHEESE_PLATE_HASH },
]

const readCharacters = async () => CHARACTERS

const AUTOMATION = {
  global: { characters: { food: true, potions: true } },
  characters: { "222": { potions: false } },
  companions: {},
}

function itemAt(itemId: number, stackCount: number): InventoryItemData {
  return {
    itemId,
    itemName: `item-${itemId}`,
    itemLink: `|H1:item:${itemId}|h|h`,
    quality: 1,
    filterType: 1,
    itemType: 1,
    traitType: 0,
    requiredLevel: 1,
    requiredCP: 0,
    stackCount,
  }
}

function locationOf(
  bags: Record<number, Record<number, InventoryItemData>>
): InventoryLocationData {
  return { bags, displayName: "somewhere", lastScanned: 0 }
}

const HOLDINGS: InventoryDatabase = {
  locations: {
    "111": locationOf({
      1: { 0: itemAt(GARLIC_HAGFISH_ITEM, 10), 1: itemAt(TRI_RESTORATION_ITEM, 5) },
    }),
    "222": locationOf({
      1: { 0: itemAt(GARLIC_HAGFISH_ITEM, 3) },
      2: { 0: itemAt(GARLIC_HAGFISH_ITEM, 4) },
    }),
    Bank: locationOf({ 1: { 0: itemAt(GARLIC_HAGFISH_ITEM, 100) } }),
    CraftBag: locationOf({ 1: { 0: itemAt(GARLIC_HAGFISH_ITEM, 7) } }),
  },
  meta: { displayName: "someone", worldName: "PC-EU", lastFullScan: 0 },
}

const SNAPSHOT_SLUG = "at-2025-02-08-07-33-20"

const SNAPSHOT_PAGE_PATH = `pages/${SNAPSHOT_SLUG}/${SNAPSHOT_SLUG}.temper-inventory-snapshot.ts`

const SNAPSHOT_DATA_PATH = `pages/${SNAPSHOT_SLUG}/${SNAPSHOT_SLUG}.temper-inventory-snapshot.data.json`

function readerOver(snapshot: InventoryRow | undefined, data: string | null): InventoryRowReader {
  return { latestSnapshot: async () => snapshot, dataOf: async () => data }
}

const snapshotPages: ReadPages = async () => ({
  ok: true,
  at: "c1",
  bodies: [{ path: SNAPSHOT_PAGE_PATH, content: "" }],
  unplaced: [],
})

test("character priority is the order the characters are read in", async () => {
  expect(await compileCharacterPriority("u1", readCharacters)).toEqual(["111", "222", "333", "444"])
})

test("no toggle anywhere leaves every consumable unwanted", async () => {
  expect(await compileWantedConsumables("u1", undefined, readCharacters)).toEqual({})
})

test("a wanted consumable is keyed by item id and lists the characters wanting it", async () => {
  expect(await compileWantedConsumables("u1", AUTOMATION, readCharacters)).toEqual({
    [TRI_RESTORATION_ITEM]: ["111"],
    [GARLIC_HAGFISH_ITEM]: ["111", "222"],
    [CHEESE_PLATE_ITEM]: ["444"],
    [SPELLCASTER_ELIXIR_ITEM]: ["111"],
  })
})

test("a character with no target build wants no consumable", async () => {
  const wanted = await compileWantedConsumables("u1", AUTOMATION, readCharacters)
  for (const esoCharacterIds of Object.values(wanted)) {
    expect(esoCharacterIds).not.toContain("333")
  }
})

test("a potions toggle set false on one character outranks the toggle set for all", async () => {
  const wanted = await compileWantedConsumables("u1", AUTOMATION, readCharacters)
  expect(wanted[SPELLCASTER_ELIXIR_ITEM]).toEqual(["111"])
})

test("only a location keyed by digits alone counts as a character holding stock", () => {
  const wanted = new Set([GARLIC_HAGFISH_ITEM, TRI_RESTORATION_ITEM])
  expect(compileConsumableStock(HOLDINGS, wanted)).toEqual({
    [TRI_RESTORATION_ITEM]: { "111": 5 },
    [GARLIC_HAGFISH_ITEM]: { "111": 10, "222": 7 },
  })
})

test("nothing wanted is nothing stocked", () => {
  expect(compileConsumableStock(HOLDINGS, new Set())).toEqual({})
})

test("no inventory is nothing stocked", () => {
  expect(compileConsumableStock(null, new Set([GARLIC_HAGFISH_ITEM]))).toEqual({})
})

test("buy stock separates what characters hold from what account storage holds", () => {
  expect(compileBuyStock({ ok: true, db: HOLDINGS }, new Set([GARLIC_HAGFISH_ITEM]))).toEqual({
    available: true,
    buyStockByChar: { [GARLIC_HAGFISH_ITEM]: { "111": 10, "222": 7 } },
    buyStockAccount: { [GARLIC_HAGFISH_ITEM]: 107 },
  })
})

test("buying nothing is available and empty", () => {
  expect(compileBuyStock({ ok: true, db: HOLDINGS }, new Set())).toEqual({
    available: true,
    buyStockByChar: {},
    buyStockAccount: {},
  })
})

test("buy stock is unavailable where no inventory could be read", () => {
  expect(
    compileBuyStock({ ok: false, failure: { kind: "no-snapshot" } }, new Set([GARLIC_HAGFISH_ITEM]))
  ).toEqual({ available: false, buyStockByChar: {}, buyStockAccount: {} })
})

test("each read failure is described", () => {
  expect(describeInventoryReadFailure({ kind: "no-snapshot" })).toBe(
    "no inventory snapshot exists for this user yet"
  )
  expect(describeInventoryReadFailure({ kind: "snapshot-has-no-id" })).toBe(
    "the latest inventory snapshot row carries no id"
  )
  expect(describeInventoryReadFailure({ kind: "snapshot-has-no-slug", snapshotId: "snap-1" })).toBe(
    "inventory snapshot snap-1 states no slug, so its data file cannot be found"
  )
  expect(
    describeInventoryReadFailure({ kind: "no-data", snapshotId: "snap-1", slug: SNAPSHOT_SLUG })
  ).toBe(
    `inventory snapshot snap-1 has no data file beside ${SNAPSHOT_SLUG} — the snapshot is mid-write or was truncated`
  )
  expect(
    describeInventoryReadFailure({
      kind: "json-parse-failed",
      snapshotId: "snap-1",
      bytes: 12,
      message: "Unexpected end of JSON input",
    })
  ).toBe(
    "inventory snapshot snap-1 holds 12 byte(s) that are not valid JSON: Unexpected end of JSON input"
  )
})

const EMPTY_SETTINGS: InventoryRuleSettings = { version: 2, rules: [] }

const SELL_EVERYTHING: InventoryRuleSettings = {
  version: 2,
  rules: [{ id: "sell-all", categoryId: "all", action: "sell" }],
}

test("settings not marked version 2 become an empty version 2 set", () => {
  expect(toRuleSettings(undefined)).toEqual(EMPTY_SETTINGS)
  expect(toRuleSettings(null)).toEqual(EMPTY_SETTINGS)
  expect(
    toRuleSettings({ version: 1, rules: [{ id: "sell-all", categoryId: "all", action: "sell" }] })
  ).toEqual(EMPTY_SETTINGS)
})

test("settings marked version 2 are answered unchanged", () => {
  expect(toRuleSettings(SELL_EVERYTHING)).toBe(SELL_EVERYTHING)
})

test("a user with no snapshot is a no-snapshot failure", async () => {
  expect(await readLatestInventory("u1", readerOver(undefined, null))).toEqual({
    ok: false,
    failure: { kind: "no-snapshot" },
  })
})

test("a snapshot row with no id is its own failure", async () => {
  expect(await readLatestInventory("u1", readerOver({ slug: SNAPSHOT_SLUG }, null))).toEqual({
    ok: false,
    failure: { kind: "snapshot-has-no-id" },
  })
})

test("a snapshot with no slug cannot say where its data file is", async () => {
  expect(await readLatestInventory("u1", readerOver({ id: "snap-1" }, null))).toEqual({
    ok: false,
    failure: { kind: "snapshot-has-no-slug", snapshotId: "snap-1" },
  })
})

test("the data is asked for under the snapshot's own slug", async () => {
  let asked = ""
  await readLatestInventory("u1", {
    latestSnapshot: async () => ({ id: "snap-1", slug: SNAPSHOT_SLUG }),
    dataOf: async (slug) => {
      asked = slug
      return null
    },
  })
  expect(asked).toBe(SNAPSHOT_SLUG)
})

test("a snapshot with no data file beside it is a failure naming the slug", async () => {
  expect(
    await readLatestInventory("u1", readerOver({ id: "snap-1", slug: SNAPSHOT_SLUG }, null))
  ).toEqual({
    ok: false,
    failure: { kind: "no-data", snapshotId: "snap-1", slug: SNAPSHOT_SLUG },
  })
})

test("data that is not JSON is a failure counting the bytes", async () => {
  const read = await readLatestInventory(
    "u1",
    readerOver({ id: "snap-1", slug: SNAPSHOT_SLUG }, '{"locations":')
  )
  expect(read.ok).toBe(false)
  if (read.ok) return
  expect(read.failure.kind).toBe("json-parse-failed")
  if (read.failure.kind !== "json-parse-failed") return
  expect(read.failure.snapshotId).toBe("snap-1")
  expect(read.failure.bytes).toBe(13)
  expect(read.failure.message.length).toBeGreaterThan(0)
})

const EMPTY_DATABASE: InventoryDatabase = {
  locations: {},
  meta: { displayName: "someone", worldName: "PC-EU", lastFullScan: 0 },
}

test("the whole data file parses as one database", async () => {
  expect(
    await readLatestInventory(
      "u1",
      readerOver({ id: "snap-1", slug: SNAPSHOT_SLUG }, JSON.stringify(EMPTY_DATABASE))
    )
  ).toEqual({ ok: true, db: EMPTY_DATABASE })
})

test("the data comes from the file beside the snapshot's own page", async () => {
  let asked: readonly string[] = []
  const files: ReadFiles = async (paths) => {
    asked = paths
    return {
      ok: true,
      at: "c1",
      bodies: [{ path: SNAPSHOT_DATA_PATH, content: '{"locations":{}}' }],
      unplaced: [],
    }
  }
  expect(await snapshotDataOf(SNAPSHOT_SLUG, snapshotPages, files)).toBe('{"locations":{}}')
  expect(asked).toEqual([SNAPSHOT_DATA_PATH])
})

test("a beside path the store holds no body for reads as no data", async () => {
  const files: ReadFiles = async () => ({ ok: true, at: "c1", bodies: [], unplaced: [] })
  expect(await snapshotDataOf(SNAPSHOT_SLUG, snapshotPages, files)).toBe(null)
})

test("a store that refuses the data file is refused with what it said", async () => {
  const files: ReadFiles = async () => ({ ok: false, why: "the store was unreachable" })
  await expect(snapshotDataOf(SNAPSHOT_SLUG, snapshotPages, files)).rejects.toThrow(
    "the store was unreachable"
  )
})

const BUY_ITEM = 4000
const BUY_TARGET = 4000
const LIVE_BACKPACK = 200

const SPREAD_LOCATIONS: Record<string, InventoryLocationData> = {
  Bank: locationOf({ 1: { 0: itemAt(BUY_ITEM, 1796) } }),
}
for (let charId = 1; charId <= 11; charId++) {
  SPREAD_LOCATIONS[String(charId)] = locationOf({ 1: { 0: itemAt(BUY_ITEM, LIVE_BACKPACK) } })
}

const SPREAD: InventoryDatabase = {
  locations: SPREAD_LOCATIONS,
  meta: { displayName: "someone", worldName: "PC-EU", lastFullScan: 0 },
}

const MID_WRITE: InventoryReadFailure = {
  kind: "no-data",
  snapshotId: "snap-1",
  slug: SNAPSHOT_SLUG,
}

const EVERY_FAILURE: readonly InventoryReadFailure[] = [
  { kind: "no-snapshot" },
  { kind: "snapshot-has-no-id" },
  { kind: "snapshot-has-no-slug", snapshotId: "snap-1" },
  MID_WRITE,
  { kind: "json-parse-failed", snapshotId: "snap-1", bytes: 41230, message: "bad" },
]

function heldTotal(stock: BuyStock, itemId: number): number {
  const byChar = Object.values(stock.buyStockByChar[itemId] ?? {})
  return byChar.reduce((sum, held) => sum + held, 0) + (stock.buyStockAccount[itemId] ?? 0)
}

test("every kind of read failure leaves the stock unavailable and both records empty", () => {
  for (const failure of EVERY_FAILURE) {
    expect(compileBuyStock({ ok: false, failure }, new Set([BUY_ITEM]))).toEqual({
      available: false,
      buyStockByChar: {},
      buyStockAccount: {},
    })
  }
})

test("an item the account holds none of is left out of both records", () => {
  const stock = compileBuyStock({ ok: true, db: HOLDINGS }, new Set([GARLIC_HAGFISH_ITEM, 12345]))
  expect(stock.buyStockByChar[12345]).toBeUndefined()
  expect(stock.buyStockAccount[12345]).toBeUndefined()
})

test("a failed read reads as owning nothing, and availability alone tells them apart", () => {
  const failed = compileBuyStock(
    { ok: false, failure: { kind: "no-snapshot" } },
    new Set([BUY_ITEM])
  )
  const nothing = compileBuyStock({ ok: true, db: EMPTY_DATABASE }, new Set([BUY_ITEM]))
  expect(failed.buyStockByChar).toEqual(nothing.buyStockByChar)
  expect(failed.buyStockAccount).toEqual(nothing.buyStockAccount)
  expect(failed.available).not.toBe(nothing.available)
})

test("a failed read collapses 3996 held across eleven characters and the bank to nothing", () => {
  const read = compileBuyStock({ ok: true, db: SPREAD }, new Set([BUY_ITEM]))
  expect(Object.keys(read.buyStockByChar[BUY_ITEM] ?? {}).length).toBe(11)
  expect(heldTotal(read, BUY_ITEM)).toBe(3996)
  expect(computeBuyShortfall(BUY_TARGET, heldTotal(read, BUY_ITEM))).toBe(4)

  const failed = compileBuyStock({ ok: false, failure: MID_WRITE }, new Set([BUY_ITEM]))
  expect(heldTotal(failed, BUY_ITEM)).toBe(0)
  expect(computeBuyShortfall(BUY_TARGET, LIVE_BACKPACK + heldTotal(failed, BUY_ITEM))).toBe(3800)
})
