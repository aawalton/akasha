import { describe, expect, it } from "bun:test"
import type {
  InventoryDatabase,
  InventoryItemData,
  PriceSource,
} from "@temper/game-items-core/inventory-types"
import { resolvePricingSourceNote } from "./pricing-source"

function inventoryWith(options: {
  priceSource?: PriceSource
  items?: readonly { estimatedValue?: number }[]
}): InventoryDatabase {
  const bag: Record<number, InventoryItemData> = {}
  ;(options.items ?? []).forEach((item, index) => {
    const entry: InventoryItemData = {
      itemId: 1000 + index,
      itemName: `Item ${index}`,
      itemLink: "",
      quality: 1,
      filterType: 1,
      itemType: 1,
      traitType: 0,
      requiredLevel: 1,
      requiredCP: 0,
      stackCount: 1,
    }
    if (item.estimatedValue !== undefined) entry.estimatedValue = item.estimatedValue
    bag[index] = entry
  })

  const meta: InventoryDatabase["meta"] = {
    displayName: "@Tester",
    worldName: "NA Megaserver",
    lastFullScan: 1_700_000_000,
  }
  if (options.priceSource !== undefined) meta.priceSource = options.priceSource

  return {
    meta,
    locations: {
      char1: {
        displayName: "Tester",
        lastScanned: 1_700_000_000,
        bags: { 1: bag },
      },
    },
  }
}

const PRICED = [{ estimatedValue: 500 }, {}]
const UNPRICED = [{}, {}]

describe("resolvePricingSourceNote", () => {
  it("discloses when the scan proved the price-source addon was not running", () => {
    const inventory = inventoryWith({ priceSource: "none", items: UNPRICED })

    expect(resolvePricingSourceNote({ inventory, isSettled: true })).toBe("missing-source")
  })

  it("stays quiet when the source was running and priced items", () => {
    const inventory = inventoryWith({ priceSource: "ttc", items: PRICED })

    expect(resolvePricingSourceNote({ inventory, isSettled: true })).toBe("none")
  })

  it("discloses when the source was running but priced nothing", () => {
    const inventory = inventoryWith({ priceSource: "ttc", items: UNPRICED })

    expect(resolvePricingSourceNote({ inventory, isSettled: true })).toBe("source-empty")
  })

  it("does not read an empty inventory as an empty price source", () => {
    const inventory = inventoryWith({ priceSource: "ttc", items: [] })

    expect(resolvePricingSourceNote({ inventory, isSettled: true })).toBe("none")
  })

  it("asserts nothing for a scan that predates the carried flag", () => {
    const inventory = inventoryWith({ items: UNPRICED })

    expect(resolvePricingSourceNote({ inventory, isSettled: true })).toBe("none")
  })

  it("stays quiet until the inventory read settles, whatever the in-flight value looks like", () => {
    for (const priceSource of ["none", "ttc", undefined] as const) {
      const inventory = inventoryWith({ priceSource, items: UNPRICED })

      expect(resolvePricingSourceNote({ inventory, isSettled: false })).toBe("none")
    }
    expect(resolvePricingSourceNote({ inventory: null, isSettled: true })).toBe("none")
  })
})
