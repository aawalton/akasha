import { describe, expect, it } from "bun:test"
import { computeItemStock } from "@temper/game-items-core/compute-item-stock"
import type {
  InventoryDatabase,
  InventoryItemData,
  InventoryLocationData,
} from "@temper/game-items-core/inventory-types"
import { computeBuyShortfall } from "@temper/game-items-rules-core/buy-rule-eval"
import {
  compileBuyStock,
  compileConsumableStock,
  describeInventoryReadFailure,
  type InventoryReadFailure,
} from "./export-settings-consumables"

function makeItem(itemId: number, stackCount: number): InventoryItemData {
  return {
    itemId,
    itemName: `Item ${itemId}`,
    itemLink: "",
    quality: 2,
    filterType: 1,
    itemType: 1,
    traitType: 0,
    requiredLevel: 1,
    requiredCP: 0,
    stackCount,
  }
}

function makeLocation(
  displayName: string,
  items: readonly InventoryItemData[]
): InventoryLocationData {
  const slots: Record<number, InventoryItemData> = {}
  items.forEach((item, index) => {
    slots[index] = item
  })
  return { bags: { 1: slots }, displayName, lastScanned: Date.now() }
}

function makeDatabase(): InventoryDatabase {
  return {
    locations: {
      "1": makeLocation("Char A", [makeItem(4000, 50)]),
      "2": makeLocation("Char B", [makeItem(4000, 150), makeItem(9999, 7)]),
      Bank: makeLocation("Bank", [makeItem(4000, 1000)]),
      CraftBag: makeLocation("Crafting Bag", [makeItem(4000, 500)]),
      "HouseBank:1:2": makeLocation("House Storage", [makeItem(4000, 300)]),
    },
    meta: { displayName: "Account", worldName: "NA", lastFullScan: Date.now() },
  }
}

const BUY_ITEM_ID = 4000
const BUY_TARGET = 4000
const LIVE_CURRENT_BACKPACK = 200
const BANK_HOLDING = 1784

function makeLiveDistribution(): InventoryDatabase {
  const locations: Record<string, InventoryLocationData> = {
    Bank: makeLocation("Bank", [makeItem(BUY_ITEM_ID, BANK_HOLDING)]),
  }
  locations["1"] = makeLocation("Current Char", [makeItem(BUY_ITEM_ID, LIVE_CURRENT_BACKPACK)])
  for (let charId = 2; charId <= 10; charId++) {
    locations[String(charId)] = makeLocation(`Char ${charId}`, [makeItem(BUY_ITEM_ID, 200)])
  }
  locations["11"] = makeLocation("Char 11", [makeItem(BUY_ITEM_ID, 212)])
  return {
    locations,
    meta: { displayName: "Account", worldName: "NA", lastFullScan: Date.now() },
  }
}

function reportedTotal(
  compiled: {
    buyStockByChar: Record<number, Record<string, number>>
    buyStockAccount: Record<number, number>
  },
  itemId: number
): number {
  const byChar = compiled.buyStockByChar[itemId] ?? {}
  const account = compiled.buyStockAccount[itemId] ?? 0
  return Object.values(byChar).reduce((sum, n) => sum + n, 0) + account
}

const EVERY_FAILURE: {
  [K in InventoryReadFailure["kind"]]: Extract<InventoryReadFailure, { kind: K }>
} = {
  "no-snapshot": { kind: "no-snapshot" },
  "snapshot-has-no-id": { kind: "snapshot-has-no-id" },
  "snapshot-has-no-timestamp": { kind: "snapshot-has-no-timestamp", snapshotId: "snap-1" },
  "no-chunks": { kind: "no-chunks", snapshotId: "snap-1" },
  "chunk-count-mismatch": {
    kind: "chunk-count-mismatch",
    snapshotId: "snap-1",
    declared: 12,
    found: 9,
  },
  "chunk-not-text": { kind: "chunk-not-text", snapshotId: "snap-1", chunkIndexes: [3, 4] },
  "json-parse-failed": {
    kind: "json-parse-failed",
    snapshotId: "snap-1",
    bytes: 41230,
    message: "Unexpected end of JSON input",
  },
}

const FAILURE_KINDS: InventoryReadFailure["kind"][] = Object.values(EVERY_FAILURE).map(
  (failure) => failure.kind
)

describe("compileBuyStock — a successful read", () => {
  it("shapes per-character backpack and account-wide storage records via computeItemStock", () => {
    const { buyStockByChar, buyStockAccount } = compileBuyStock(
      { ok: true, db: makeDatabase() },
      new Set([4000])
    )

    expect(buyStockByChar[4000]).toEqual({ "1": 50, "2": 150 })
    expect(buyStockAccount[4000]).toBe(1800)
  })

  it("marks the stock figure available so the addon may act on it", () => {
    expect(compileBuyStock({ ok: true, db: makeDatabase() }, new Set([4000])).available).toBe(true)
  })

  it("returns empty records for an empty itemId set — but still available", () => {
    expect(compileBuyStock({ ok: true, db: makeDatabase() }, new Set())).toEqual({
      available: true,
      buyStockByChar: {},
      buyStockAccount: {},
    })
  })

  it("omits an itemId with no holdings", () => {
    const { buyStockByChar, buyStockAccount } = compileBuyStock(
      { ok: true, db: makeDatabase() },
      new Set([4000, 12345])
    )
    expect(buyStockByChar[12345]).toBeUndefined()
    expect(buyStockAccount[12345]).toBeUndefined()
  })
})

describe("compileBuyStock — every read failure", () => {
  it.each(FAILURE_KINDS)("marks the stock figure unavailable for %s", (kind) => {
    const failure = EVERY_FAILURE[kind]
    expect(compileBuyStock({ ok: false, failure }, new Set([4000])).available).toBe(false)
  })

  it.each(FAILURE_KINDS)("returns empty stock records for %s", (kind) => {
    const failure = EVERY_FAILURE[kind]
    const compiled = compileBuyStock({ ok: false, failure }, new Set([4000]))
    expect(compiled.buyStockByChar).toEqual({})
    expect(compiled.buyStockAccount).toEqual({})
  })

  it("produces records indistinguishable from owning nothing — availability is the only signal", () => {
    const failed = compileBuyStock(
      { ok: false, failure: EVERY_FAILURE["no-snapshot"] },
      new Set([4000])
    )
    const emptyAccount = compileBuyStock(
      { ok: true, db: { locations: {}, meta: makeDatabase().meta } },
      new Set([4000])
    )
    expect(failed.buyStockByChar).toEqual(emptyAccount.buyStockByChar)
    expect(failed.buyStockAccount).toEqual(emptyAccount.buyStockAccount)
    expect(failed.available).not.toBe(emptyAccount.available)
  })
})

describe("compileBuyStock — a failed read collapses the global total", () => {
  const db = makeLiveDistribution()

  it("sees 3996 across 11 backpacks and the bank when the read succeeds", () => {
    const breakdown = computeItemStock(db, new Set([BUY_ITEM_ID])).get(BUY_ITEM_ID)
    expect(breakdown?.byChar.size).toBe(11)
    expect(breakdown?.accountStorage).toBe(BANK_HOLDING)
    expect(breakdown?.total).toBe(3996)
  })

  it("reports that same 3996 through compileBuyStock's two records", () => {
    const compiled = compileBuyStock({ ok: true, db }, new Set([BUY_ITEM_ID]))
    expect(reportedTotal(compiled, BUY_ITEM_ID)).toBe(3996)
  })

  it("leaves a shortfall of 4 against the target when the read succeeds", () => {
    const compiled = compileBuyStock({ ok: true, db }, new Set([BUY_ITEM_ID]))
    expect(computeBuyShortfall(BUY_TARGET, reportedTotal(compiled, BUY_ITEM_ID))).toBe(4)
  })

  it("collapses to the live backpack alone when the read fails — a shortfall of 3800", () => {
    const compiled = compileBuyStock(
      { ok: false, failure: EVERY_FAILURE["chunk-count-mismatch"] },
      new Set([BUY_ITEM_ID])
    )
    const collapsedTotal = LIVE_CURRENT_BACKPACK + reportedTotal(compiled, BUY_ITEM_ID)
    expect(collapsedTotal).toBe(LIVE_CURRENT_BACKPACK)
    expect(computeBuyShortfall(BUY_TARGET, collapsedTotal)).toBe(3800)
  })

  it("marks that collapsed figure unavailable, which is what stops the purchase", () => {
    const compiled = compileBuyStock(
      { ok: false, failure: EVERY_FAILURE["chunk-count-mismatch"] },
      new Set([BUY_ITEM_ID])
    )
    expect(compiled.available).toBe(false)
  })
})

describe("describeInventoryReadFailure", () => {
  it.each(FAILURE_KINDS)("returns a non-empty line for %s", (kind) => {
    expect(describeInventoryReadFailure(EVERY_FAILURE[kind]).length).toBeGreaterThan(0)
  })

  it("gives every kind a distinct line, so the watcher log names the cause", () => {
    const lines = FAILURE_KINDS.map((kind) => describeInventoryReadFailure(EVERY_FAILURE[kind]))
    expect(new Set(lines).size).toBe(FAILURE_KINDS.length)
  })

  it("names both the declared and the found chunk count for chunk-count-mismatch", () => {
    const line = describeInventoryReadFailure(EVERY_FAILURE["chunk-count-mismatch"])
    expect(line).toContain("12")
    expect(line).toContain("9")
  })

  it("carries the snapshot id for every failure that has one", () => {
    for (const kind of FAILURE_KINDS) {
      const failure = EVERY_FAILURE[kind]
      if (!("snapshotId" in failure)) continue
      expect(describeInventoryReadFailure(failure)).toContain(failure.snapshotId)
    }
  })
})

describe("compileConsumableStock", () => {
  it("counts only character backpacks, excluding account-wide storage", () => {
    const result = compileConsumableStock(makeDatabase(), new Set([4000]))
    expect(result[4000]).toEqual({ "1": 50, "2": 150 })
  })

  it("returns empty for an empty wanted set", () => {
    expect(compileConsumableStock(makeDatabase(), new Set())).toEqual({})
  })
})
