import { describe, expect, it } from "bun:test"
import { resolvePricingRegion, resolvePricingRegionNote } from "./pricing-region"

const RESOLVED = { playerSettled: true, isLoading: false, error: null }

describe("resolvePricingRegion", () => {
  it("stands PC / NA in for an unset region and says so", () => {
    expect(resolvePricingRegion({})).toEqual({ platform: "PC", server: "NA", isDefaulted: true })
  })

  it("treats a half-set region as defaulted, since the missing half still stood in", () => {
    expect(resolvePricingRegion({ platform: "Xbox" })).toEqual({
      platform: "Xbox",
      server: "NA",
      isDefaulted: true,
    })
  })

  it("passes a fully-set region through untouched", () => {
    expect(resolvePricingRegion({ platform: "PlayStation", server: "EU" })).toEqual({
      platform: "PlayStation",
      server: "EU",
      isDefaulted: false,
    })
  })

  it("does not report PC / NA as defaulted when the user chose it", () => {
    expect(resolvePricingRegion({ platform: "PC", server: "NA" }).isDefaulted).toBe(false)
  })
})

describe("resolvePricingRegionNote", () => {
  it("explains a blank surface, so a user whose region has no market data is not left guessing", () => {
    expect(resolvePricingRegionNote({ ...RESOLVED, isDefaulted: false, pricing: null })).toBe(
      "no-data"
    )
  })

  it("prefers explaining a blank over noting provenance when both apply", () => {
    expect(resolvePricingRegionNote({ ...RESOLVED, isDefaulted: true, pricing: null })).toBe(
      "no-data"
    )
  })

  it("notes provenance when real prices came from a region the user never chose", () => {
    expect(resolvePricingRegionNote({ ...RESOLVED, isDefaulted: true, pricing: {} })).toBe(
      "defaulted"
    )
  })

  it("stays quiet when the prices are the user's own region", () => {
    expect(resolvePricingRegionNote({ ...RESOLVED, isDefaulted: false, pricing: {} })).toBe("none")
  })

  it("stays quiet until the player query settles, where an unset region is indistinguishable from a loading one", () => {
    expect(
      resolvePricingRegionNote({
        playerSettled: false,
        isLoading: false,
        error: null,
        isDefaulted: true,
        pricing: null,
      })
    ).toBe("none")
  })

  it("discloses for a settled user who has no player row at all, not just one with a row", () => {
    expect(
      resolvePricingRegionNote({
        playerSettled: true,
        isLoading: false,
        error: null,
        isDefaulted: true,
        pricing: {},
      })
    ).toBe("defaulted")
  })

  it("stays quiet while the extract is in flight, so no caption flashes mid-load", () => {
    expect(
      resolvePricingRegionNote({
        playerSettled: true,
        isLoading: true,
        error: null,
        isDefaulted: true,
        pricing: null,
      })
    ).toBe("none")
  })

  it("does not blame the region for a transport failure", () => {
    expect(
      resolvePricingRegionNote({
        playerSettled: true,
        isLoading: false,
        error: new Error("network"),
        isDefaulted: false,
        pricing: null,
      })
    ).toBe("none")
  })
})
