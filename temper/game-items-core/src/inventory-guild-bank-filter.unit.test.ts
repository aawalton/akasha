import { describe, expect, it } from "bun:test"
import { extractGuildBankKeys, partitionUnmanagedGuildBanks } from "./inventory-guild-bank-filter"
import { readManagedGuildBanks } from "./inventory-guild-bank-types"
import { makeInventoryItem as makeItem } from "./inventory-item-test-utils"
import type { InventoryDatabase, InventoryItemData, InventoryLocationData } from "./inventory-types"

function makeLocation(
  displayName: string,
  items: readonly InventoryItemData[]
): InventoryLocationData {
  const slots: Record<number, InventoryItemData> = {}
  items.forEach((item, index) => {
    slots[index] = item
  })
  return { bags: { 1: slots }, displayName, lastScanned: 1000 }
}

function worth(itemId: number, value: number): InventoryItemData {
  return makeItem(itemId, 1, { estimatedValue: value })
}

function makeDatabase(): InventoryDatabase {
  return {
    locations: {
      "1": makeLocation("Char A", [worth(4000, 100)]),
      Bank: makeLocation("Bank", [worth(4001, 200)]),
      "Walton Mountain": makeLocation("Walton Mountain", [worth(4002, 4000)]),
      "Second Guild": makeLocation("Second Guild", [worth(4003, 500)]),
    },
    meta: { displayName: "Account", worldName: "NA", lastFullScan: 1000 },
  }
}

describe("partitionUnmanagedGuildBanks", () => {
  it("keeps non-guild locations and excludes every unmanaged guild bank", () => {
    const { inventory, excluded } = partitionUnmanagedGuildBanks(makeDatabase(), new Set())

    expect(Object.keys(inventory.locations).sort()).toEqual(["1", "Bank"])
    expect(excluded.map((e) => e.key).sort()).toEqual(["Second Guild", "Walton Mountain"])
  })

  it("reports the excluded value so a caller can state what it left out", () => {
    const { excluded } = partitionUnmanagedGuildBanks(makeDatabase(), new Set())

    const walton = excluded.find((e) => e.key === "Walton Mountain")
    expect(walton?.value).toBe(4000)
    expect(walton?.displayName).toBe("Walton Mountain")
    expect(walton?.reason).toBe("unmanaged-guild-bank")
  })

  it("counts a managed guild bank and leaves it out of the manifest", () => {
    const { inventory, excluded } = partitionUnmanagedGuildBanks(
      makeDatabase(),
      new Set(["Walton Mountain"])
    )

    expect(Object.keys(inventory.locations).sort()).toEqual(["1", "Bank", "Walton Mountain"])
    expect(excluded.map((e) => e.key)).toEqual(["Second Guild"])
  })

  it("reports an empty manifest when every guild bank is managed", () => {
    const { inventory, excluded } = partitionUnmanagedGuildBanks(
      makeDatabase(),
      new Set(["Walton Mountain", "Second Guild"])
    )

    expect(Object.keys(inventory.locations).length).toBe(4)
    expect(excluded).toEqual([])
  })

  it("reports an empty-key location as unclassifiable, never as a guild bank", () => {
    const db = makeDatabase()
    db.locations[""] = makeLocation("", [worth(4004, 77)])

    const { excluded } = partitionUnmanagedGuildBanks(db, new Set())
    const empty = excluded.find((e) => e.key === "")

    expect(empty).toBeDefined()
    expect(empty?.reason).toBe("unclassifiable-location")
    expect(empty?.value).toBe(77)
  })

  it("does not mutate the inventory it was given", () => {
    const db = makeDatabase()
    partitionUnmanagedGuildBanks(db, new Set())

    expect(Object.keys(db.locations).length).toBe(4)
  })

  it("preserves non-location fields such as currencies", () => {
    const db = makeDatabase()
    db.currencies = {
      characters: { "1": { displayName: "Char A", lastScanned: 1000, balances: { gold: 50 } } },
    }

    const { inventory } = partitionUnmanagedGuildBanks(db, new Set())

    expect(inventory.currencies).toBe(db.currencies)
    expect(inventory.meta).toBe(db.meta)
  })

  it("returns an empty manifest for an inventory with no guild banks", () => {
    const db: InventoryDatabase = {
      locations: { Bank: makeLocation("Bank", [worth(4001, 200)]) },
      meta: { displayName: "Account", worldName: "NA", lastFullScan: 1000 },
    }

    const { inventory, excluded } = partitionUnmanagedGuildBanks(db, new Set())

    expect(Object.keys(inventory.locations)).toEqual(["Bank"])
    expect(excluded).toEqual([])
  })

  it("falls back to the location key when the stored display name is empty", () => {
    const db = makeDatabase()
    db.locations["Nameless Guild"] = makeLocation("", [worth(4005, 10)])

    const { excluded } = partitionUnmanagedGuildBanks(db, new Set())

    expect(excluded.find((e) => e.key === "Nameless Guild")?.displayName).toBe("Nameless Guild")
  })

  it("counts placed furnishings in the excluded value", () => {
    const db = makeDatabase()
    const guild = db.locations["Walton Mountain"]
    if (guild === undefined) throw new Error("fixture missing Walton Mountain")
    guild.placedFurnishings = {
      "furn-1": {
        itemName: "Chair",
        quality: 2,
        itemLink: "",
        collectibleLink: "",
        estimatedValue: 250,
      },
    }

    const { excluded } = partitionUnmanagedGuildBanks(db, new Set())

    expect(excluded.find((e) => e.key === "Walton Mountain")?.value).toBe(4250)
  })
})

describe("extractGuildBankKeys", () => {
  it("returns guild bank keys sorted by display name, skipping the empty key", () => {
    const db = makeDatabase()
    db.locations[""] = makeLocation("", [])

    expect(extractGuildBankKeys(db)).toEqual([
      { key: "Second Guild", displayName: "Second Guild" },
      { key: "Walton Mountain", displayName: "Walton Mountain" },
    ])
  })

  it("falls back to the key when the display name is empty", () => {
    const db: InventoryDatabase = {
      locations: { "Quiet Guild": makeLocation("", []) },
      meta: { displayName: "Account", worldName: "NA", lastFullScan: 1000 },
    }

    expect(extractGuildBankKeys(db)).toEqual([{ key: "Quiet Guild", displayName: "Quiet Guild" }])
  })
})

describe("readManagedGuildBanks", () => {
  it("reads the managed set from a temper-player settings blob", () => {
    const set = readManagedGuildBanks({ "managed-guild-banks": { managedGuildBanks: ["A", "B"] } })

    expect([...set].sort()).toEqual(["A", "B"])
  })

  it("returns an empty set when the slice is absent — the production default", () => {
    expect(readManagedGuildBanks({}).size).toBe(0)
    expect(readManagedGuildBanks(undefined).size).toBe(0)
    expect(readManagedGuildBanks(null).size).toBe(0)
  })

  it("ignores a malformed slice rather than throwing", () => {
    expect(readManagedGuildBanks({ "managed-guild-banks": "nope" }).size).toBe(0)
    expect(
      readManagedGuildBanks({ "managed-guild-banks": { managedGuildBanks: "nope" } }).size
    ).toBe(0)
  })

  it("keeps only string entries", () => {
    const set = readManagedGuildBanks({
      "managed-guild-banks": { managedGuildBanks: ["A", 7, null, "B"] },
    })

    expect([...set].sort()).toEqual(["A", "B"])
  })
})
