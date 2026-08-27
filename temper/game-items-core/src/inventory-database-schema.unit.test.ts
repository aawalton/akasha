import { describe, expect, it } from "bun:test"
import { inventoryDatabaseSchema } from "./inventory-database-schema"
import type { InventoryDatabase } from "./inventory-types"

const KNOWN_GOOD: InventoryDatabase = {
  locations: {
    Bank: {
      bags: {
        7: {
          0: {
            itemId: 12345,
            itemName: "Rockgrove Helm",
            itemLink: "|H1:item:12345:...|h|h",
            quality: 4,
            filterType: 1,
            itemType: 1,
            traitType: 2,
            requiredLevel: 50,
            requiredCP: 160,
            stackCount: 1,
            setId: 500,
            bound: true,
          },
        },
      },
      bagSizes: { 7: 240 },
      displayName: "Bank",
      lastScanned: 1_700_000_000,
    },
  },
  meta: {
    displayName: "@alanwalton",
    worldName: "NA Megaserver",
    lastFullScan: 1_700_000_000,
  },
  currencies: {
    characters: {
      "123": { displayName: "Sven", lastScanned: 1_700_000_000, balances: { gold: 5000 } },
    },
    bank: { gold: 1_000_000 },
    account: { crowns: 42 },
  },
  openCooldowns: { dailyCraft: 1_700_100_000 },
  craftingLevels: { "123": { 1: 50 } },
  transmuteCrystalCap: 1000,
  transmuteCrystalAmount: 320,
}

describe("inventoryDatabaseSchema", () => {
  it("parses a well-formed InventoryDatabase capture slice", () => {
    const out = inventoryDatabaseSchema.parse(KNOWN_GOOD)
    expect(out.locations.Bank?.bags[7]?.[0]?.itemName).toBe("Rockgrove Helm")
    expect(out.currencies?.bank?.gold).toBe(1_000_000)
    expect(out.transmuteCrystalCap).toBe(1000)
  })

  it("accepts a minimal slice (locations + meta only)", () => {
    const out = inventoryDatabaseSchema.parse({
      locations: {},
      meta: { displayName: "@a", worldName: "NA", lastFullScan: 0 },
    })
    expect(out.currencies).toBeUndefined()
  })

  it("rejects an unknown key on the payload (.strict() drift boundary)", () => {
    expect(() =>
      inventoryDatabaseSchema.parse({
        locations: {},
        meta: { displayName: "@a", worldName: "NA", lastFullScan: 0 },
        drift: true,
      })
    ).toThrow()
  })

  it("rejects an unknown key on an item (.strict() drift boundary)", () => {
    expect(() =>
      inventoryDatabaseSchema.parse({
        locations: {
          Bank: {
            bags: {
              7: {
                0: {
                  itemId: 1,
                  itemName: "x",
                  itemLink: "",
                  quality: 0,
                  filterType: 0,
                  itemType: 0,
                  traitType: 0,
                  requiredLevel: 0,
                  requiredCP: 0,
                  stackCount: 1,
                  newlyCapturedField: 99,
                },
              },
            },
            displayName: "Bank",
            lastScanned: 0,
          },
        },
        meta: { displayName: "@a", worldName: "NA", lastFullScan: 0 },
      })
    ).toThrow()
  })
})
