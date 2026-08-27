import { describe, expect, it } from "bun:test"
import type { InventoryItemData } from "../lib/temper-inventory/game-item-types.ts"
import { parseItemAction } from "../lib/temper-inventory/game-code.ts"
import { computeRoutingDiff, type MatchedRoute, matchedRouteFrom } from "../lib/temper-inventory/parity-routing.ts"

const SOURCE = "1000"
const OTHER = "2000"

function makeItem(overrides: Partial<InventoryItemData> = {}): InventoryItemData {
  return {
    itemId: 42,
    itemName: "Test Item",
    itemLink: "|H0:item:42|h|h",
    quality: 1,
    filterType: 0,
    itemType: 0,
    traitType: 0,
    requiredLevel: 1,
    requiredCP: 0,
    stackCount: 1,
    ...overrides,
  }
}

describe("parseItemAction", () => {
  it("narrows a known action string", () => {
    expect(parseItemAction("list")).toBe("list")
    expect(parseItemAction("fence-sell")).toBe("fence-sell")
  })
  it("returns undefined for unknown / absent", () => {
    expect(parseItemAction("frobnicate")).toBeUndefined()
    expect(parseItemAction(undefined)).toBeUndefined()
  })
})

describe("matchedRouteFrom", () => {
  it("builds a MatchedRoute from action + destination", () => {
    const m = matchedRouteFrom("list", `character:${OTHER}`)
    expect(m).toEqual({ action: "list", destination: `character:${OTHER}` })
  })
  it("treats null / empty destination as undefined", () => {
    expect(matchedRouteFrom("sell", null)?.destination).toBeUndefined()
    expect(matchedRouteFrom("sell", "")?.destination).toBeUndefined()
  })
  it("returns undefined for an unknown action", () => {
    expect(matchedRouteFrom("frobnicate", undefined)).toBeUndefined()
  })
})

describe("computeRoutingDiff — web route rendering", () => {
  it("renders cross-char list as deposit@source/bank, retrieve@target/bank, act@target/guild-store", () => {
    const match: MatchedRoute = { action: "list", destination: `character:${OTHER}` }
    const diff = computeRoutingDiff(SOURCE, makeItem(), match, match)

    expect(diff.webRoute).toEqual([
      `deposit  char:${SOURCE}  bank`,
      `retrieve char:${OTHER}  bank`,
      `act      char:${OTHER}  guild-store`,
    ])
    expect(diff.mismatch).toBe(false)
  })

  it("renders same-char list as a single act row, no bank hop", () => {
    const match: MatchedRoute = { action: "list", destination: undefined }
    const diff = computeRoutingDiff(SOURCE, makeItem(), match, match)

    expect(diff.webRoute).toEqual([`act      char:${SOURCE}  guild-store`])
    expect(diff.mismatch).toBe(false)
    expect(diff.webRoute.some((r) => r.startsWith("deposit"))).toBe(false)
  })

  it("renders cross-char fence-sell of a stolen item to the fence venue", () => {
    const match: MatchedRoute = { action: "fence-sell", destination: `character:${OTHER}` }
    const diff = computeRoutingDiff(SOURCE, makeItem({ stolen: true }), match, match)

    expect(diff.webRoute).toEqual([
      `deposit  char:${SOURCE}  bank`,
      `retrieve char:${OTHER}  bank`,
      `act      char:${OTHER}  fence`,
    ])
  })
})

describe("computeRoutingDiff — skew detection", () => {
  it("flags a skew when the addon matched a different destination than web", () => {
    const webMatch: MatchedRoute = { action: "list", destination: undefined }
    const addonMatch: MatchedRoute = { action: "list", destination: `character:${OTHER}` }
    const diff = computeRoutingDiff(SOURCE, makeItem(), webMatch, addonMatch)

    expect(diff.mismatch).toBe(true)
    expect(diff.webRoute).toEqual([`act      char:${SOURCE}  guild-store`])
    expect(diff.webMatch).toBe("list")
    expect(diff.addonMatch).toBe(`list → character:${OTHER}`)
  })

  it("passes when addon and web matched the same action+destination", () => {
    const match: MatchedRoute = { action: "sell", destination: `character:${OTHER}` }
    const diff = computeRoutingDiff(SOURCE, makeItem(), match, match)
    expect(diff.mismatch).toBe(false)
  })

  it("renders web route as informational when the addon match is absent", () => {
    const webMatch: MatchedRoute = { action: "list", destination: `character:${OTHER}` }
    const diff = computeRoutingDiff(SOURCE, makeItem(), webMatch, undefined)

    expect(diff.mismatch).toBe(false)
    expect(diff.note).toContain("addon match/destination not captured")
    expect(diff.webRoute.length).toBe(3)
  })
})
