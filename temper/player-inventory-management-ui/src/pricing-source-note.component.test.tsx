import { afterEach, describe, expect, test } from "bun:test"
import { cleanup } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type {
  InventoryDatabase,
  InventoryItemData,
  PriceSource,
} from "@temper/game-items-core/inventory-types"
import { resolvePricingSourceNote } from "./pricing-source"
import { PricingSourceNote } from "./pricing-source-note"

afterEach(() => {
  cleanup()
})

function inventory(options: {
  priceSource?: PriceSource
  priced?: boolean
  empty?: boolean
}): InventoryDatabase {
  const item: InventoryItemData = {
    itemId: 1234,
    itemName: "Dreugh Wax",
    itemLink: "",
    quality: 4,
    filterType: 1,
    itemType: 1,
    traitType: 0,
    requiredLevel: 1,
    requiredCP: 0,
    stackCount: 12,
  }
  if (options.priced === true) item.estimatedValue = 11_009
  item.merchantValue = 15

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
        bags: options.empty === true ? {} : { 1: { 0: item } },
      },
    },
  }
}

function renderFor(inv: InventoryDatabase | null): string {
  const kind = resolvePricingSourceNote({ inventory: inv, isSettled: true })
  const { container } = render(<PricingSourceNote kind={kind} />)
  return container.textContent ?? ""
}

describe("PricingSourceNote — what the user reads", () => {
  test("names the add-on and says the totals are too low when no price source ran", () => {
    const text = renderFor(inventory({ priceSource: "none" }))

    expect(text).toContain("Tamriel Trade Centre")
    expect(text).toContain("far too low")
    expect(text).toMatch(/not running/i)
  })

  test("distinguishes a loaded source that priced nothing, and names the desktop client", () => {
    const text = renderFor(inventory({ priceSource: "ttc", priced: false }))

    expect(text).toContain("Tamriel Trade Centre")
    expect(text).toMatch(/desktop client/i)
    expect(text).toContain("far too low")
  })

  test("says nothing when the source ran and priced items", () => {
    expect(renderFor(inventory({ priceSource: "ttc", priced: true }))).toBe("")
  })

  test("asserts nothing for a scan that predates the carried flag", () => {
    expect(renderFor(inventory({ priced: false }))).toBe("")
  })

  test("does not read an empty inventory, or an unloaded one, as a missing price source", () => {
    expect(renderFor(inventory({ priceSource: "ttc", empty: true }))).toBe("")
    expect(renderFor(null)).toBe("")
  })

  test("the instrument discriminates — absent copy is not reported as present", () => {
    const text = renderFor(inventory({ priceSource: "none" }))

    expect(text).not.toContain("Tamriel Trade Centre Emporium")
    expect(text).not.toBe("")
  })
})
