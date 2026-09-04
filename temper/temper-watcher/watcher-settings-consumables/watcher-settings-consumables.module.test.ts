import { expect, test } from "bun:test"
import type {
  InventoryDatabase,
  InventoryItemData,
  InventoryLocationData,
} from "@akasha/temper-items-core/inventory-types"
import { computeBuyShortfall } from "@akasha/temper-items-rules-core/buy-rule-eval"
import type { InventoryRuleSettings } from "@akasha/temper-items-rules-core/inventory-rule-types"
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

const SNAPSHOT_TIMESTAMP = 1739000000000

function readerOver(
  snapshot: InventoryRow | undefined,
  chunks: readonly InventoryRow[]
): InventoryRowReader {
  return { latestSnapshot: async () => snapshot, chunksOf: async () => chunks }
}

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
  expect(
    describeInventoryReadFailure({ kind: "snapshot-has-no-timestamp", snapshotId: "snap-1" })
  ).toBe("inventory snapshot snap-1 states no data-timestamp, so its chunks cannot be named")
  expect(describeInventoryReadFailure({ kind: "no-chunks", snapshotId: "snap-1" })).toBe(
    "inventory snapshot snap-1 has no chunk rows"
  )
  expect(
    describeInventoryReadFailure({
      kind: "chunk-count-mismatch",
      snapshotId: "snap-1",
      declared: 4,
      found: 3,
    })
  ).toBe(
    "inventory snapshot snap-1 declares 4 chunk(s) but 3 are readable — the snapshot is mid-write or was truncated"
  )
  expect(
    describeInventoryReadFailure({
      kind: "chunk-not-text",
      snapshotId: "snap-1",
      chunkIndexes: [1, 3],
    })
  ).toBe("inventory snapshot snap-1 has non-text data in chunk(s) 1, 3")
  expect(
    describeInventoryReadFailure({
      kind: "json-parse-failed",
      snapshotId: "snap-1",
      bytes: 12,
      message: "Unexpected end of JSON input",
    })
  ).toBe(
    "inventory snapshot snap-1 reassembled to 12 byte(s) that are not valid JSON: Unexpected end of JSON input"
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
  expect(await readLatestInventory("u1", readerOver(undefined, []))).toEqual({
    ok: false,
    failure: { kind: "no-snapshot" },
  })
})

test("a snapshot row with no id is its own failure", async () => {
  expect(await readLatestInventory("u1", readerOver({ dataTimestamp: 1 }, []))).toEqual({
    ok: false,
    failure: { kind: "snapshot-has-no-id" },
  })
})

test("a snapshot with no data-timestamp cannot name its chunks", async () => {
  expect(await readLatestInventory("u1", readerOver({ id: "snap-1" }, []))).toEqual({
    ok: false,
    failure: { kind: "snapshot-has-no-timestamp", snapshotId: "snap-1" },
  })
})

test("chunks are asked for under the name the data-timestamp gives", async () => {
  let asked = ""
  await readLatestInventory("u1", {
    latestSnapshot: async () => ({ id: "snap-1", dataTimestamp: SNAPSHOT_TIMESTAMP }),
    chunksOf: async (snapshotName) => {
      asked = snapshotName
      return []
    },
  })
  expect(asked).toBe("2025-02-08-07-33-20")
})

test("a snapshot with no chunk rows is a failure", async () => {
  expect(
    await readLatestInventory(
      "u1",
      readerOver({ id: "snap-1", dataTimestamp: SNAPSHOT_TIMESTAMP }, [])
    )
  ).toEqual({ ok: false, failure: { kind: "no-chunks", snapshotId: "snap-1" } })
})

test("a chunk count the rows do not match is a failure naming both counts", async () => {
  expect(
    await readLatestInventory(
      "u1",
      readerOver({ id: "snap-1", dataTimestamp: SNAPSHOT_TIMESTAMP, chunkCount: 4 }, [
        { data: "{}" },
      ])
    )
  ).toEqual({
    ok: false,
    failure: { kind: "chunk-count-mismatch", snapshotId: "snap-1", declared: 4, found: 1 },
  })
})

test("a chunk holding neither text nor an object is named by its index", async () => {
  expect(
    await readLatestInventory(
      "u1",
      readerOver({ id: "snap-1", dataTimestamp: SNAPSHOT_TIMESTAMP }, [
        { data: "{" },
        { data: null },
        { data: "}" },
        { data: undefined },
      ])
    )
  ).toEqual({
    ok: false,
    failure: { kind: "chunk-not-text", snapshotId: "snap-1", chunkIndexes: [1, 3] },
  })
})

test("chunks that do not reassemble to JSON are a failure counting the bytes", async () => {
  const read = await readLatestInventory(
    "u1",
    readerOver({ id: "snap-1", dataTimestamp: SNAPSHOT_TIMESTAMP }, [{ data: '{"locations":' }])
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

test("chunks are joined in the order they are read and parsed as one database", async () => {
  expect(
    await readLatestInventory(
      "u1",
      readerOver({ id: "snap-1", dataTimestamp: SNAPSHOT_TIMESTAMP, chunkCount: 2 }, [
        { data: '{"locations":{},"meta":{"displayName":"someone",' },
        { data: '"worldName":"PC-EU","lastFullScan":0}}' },
      ])
    )
  ).toEqual({ ok: true, db: EMPTY_DATABASE })
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
  kind: "chunk-count-mismatch",
  snapshotId: "snap-1",
  declared: 12,
  found: 9,
}

const EVERY_FAILURE: readonly InventoryReadFailure[] = [
  { kind: "no-snapshot" },
  { kind: "snapshot-has-no-id" },
  { kind: "snapshot-has-no-timestamp", snapshotId: "snap-1" },
  { kind: "no-chunks", snapshotId: "snap-1" },
  MID_WRITE,
  { kind: "chunk-not-text", snapshotId: "snap-1", chunkIndexes: [3, 4] },
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

test("a chunk holding an object rather than text is written back out as JSON", async () => {
  expect(
    await readLatestInventory(
      "u1",
      readerOver({ id: "snap-1", dataTimestamp: SNAPSHOT_TIMESTAMP }, [{ data: EMPTY_DATABASE }])
    )
  ).toEqual({ ok: true, db: EMPTY_DATABASE })
})
