import { describe, expect, test } from "bun:test"
import {
  parseValidListings,
  ttcListingEntrySchema,
  ttcListingResponseSchema,
} from "./ttc-listing-schema"

type Obj = Record<string, unknown>

function validItem(overrides: Obj = {}): Obj {
  return {
    Name: "Companion's Arm Cops",
    ID: 191960,
    QualityID: 2,
    TraitID: 0,
    LevelTotal: 1,
    MasterWritInfo: null,
    ...overrides,
  }
}

function validAsset(overrides: Obj = {}): Obj {
  return { Amount: 200, TotalPrice: 5000, UnitPrice: 25, Item: validItem(), ...overrides }
}

function validEntry(overrides: Obj = {}): Obj {
  return {
    TradeAsset: validAsset(),
    GuildID: 42,
    GuildName: "Traders Guild",
    GuildKioskLocationID: 7,
    PlayerID: "@player",
    DiscoverUnixTime: 1_700_000_000,
    ExpireUnixTime: 1_700_100_000,
    ID: 123456,
    Message: null,
    TraderID: 99,
    ...overrides,
  }
}

describe("ttcListingEntrySchema", () => {
  test("parses a valid entry", () => {
    expect(ttcListingEntrySchema.safeParse(validEntry()).success).toBe(true)
  })

  test("tolerates unknown extra fields (passthrough) and preserves them", () => {
    const parsed = ttcListingEntrySchema.safeParse(validEntry({ SomeFutureField: "kept" }))
    expect(parsed.success).toBe(true)
    if (parsed.success) {
      expect(parsed.data.SomeFutureField).toBe("kept")
    }
  })

  test("drops an entry missing TradeAsset", () => {
    const { TradeAsset: _omit, ...noAsset } = validEntry()
    expect(ttcListingEntrySchema.safeParse(noAsset).success).toBe(false)
  })

  test("drops an entry with a null UnitPrice (the crash case)", () => {
    const entry = validEntry({ TradeAsset: validAsset({ UnitPrice: null }) })
    expect(ttcListingEntrySchema.safeParse(entry).success).toBe(false)
  })

  test("drops an entry with a NaN UnitPrice", () => {
    const entry = validEntry({ TradeAsset: validAsset({ UnitPrice: Number.NaN }) })
    expect(ttcListingEntrySchema.safeParse(entry).success).toBe(false)
  })

  test("drops an entry with an Infinity UnitPrice", () => {
    const entry = validEntry({ TradeAsset: validAsset({ UnitPrice: Number.POSITIVE_INFINITY }) })
    expect(ttcListingEntrySchema.safeParse(entry).success).toBe(false)
  })

  test("drops an entry whose Item is missing a required field", () => {
    const { Name: _name, ...itemNoName } = validItem()
    const entry = validEntry({ TradeAsset: validAsset({ Item: itemNoName }) })
    expect(ttcListingEntrySchema.safeParse(entry).success).toBe(false)
  })
})

describe("parseValidListings", () => {
  test("keeps valid entries and drops the bad ones in one array", () => {
    const good = validEntry()
    const badNull = validEntry({ TradeAsset: validAsset({ UnitPrice: null }) })
    const { TradeAsset: _omit, ...badMissing } = validEntry()

    const out = parseValidListings([good, badNull, badMissing, good])
    expect(out).toHaveLength(2)
    expect(out[0]?.TradeAsset.UnitPrice).toBe(25)
  })

  test("returns [] for a non-array (e.g. a null/absent JSONB cache read)", () => {
    expect(parseValidListings(null)).toEqual([])
    expect(parseValidListings(undefined)).toEqual([])
    expect(parseValidListings({ not: "an array" })).toEqual([])
  })
})

describe("ttcListingResponseSchema", () => {
  test("parses a success envelope with a page of entries", () => {
    const response = {
      IsSuccess: true,
      Code: 0,
      TradeListPageModel: {
        TradeDetails: [validEntry()],
        CurrentPage: 1,
        TotalPageCount: 1,
        TotalMatchCount: 1,
      },
    }
    expect(ttcListingResponseSchema.safeParse(response).success).toBe(true)
  })

  test("a single bad entry does NOT fail the envelope (entries validated per-item downstream)", () => {
    const badEntry = validEntry({ TradeAsset: validAsset({ UnitPrice: null }) })
    const response = {
      IsSuccess: true,
      Code: 0,
      TradeListPageModel: {
        TradeDetails: [badEntry],
        CurrentPage: 1,
        TotalPageCount: 1,
        TotalMatchCount: 1,
      },
    }
    expect(ttcListingResponseSchema.safeParse(response).success).toBe(true)
    expect(parseValidListings([badEntry])).toHaveLength(0)
  })

  test("parses an error envelope (IsSuccess false, no page) so nice error codes survive", () => {
    const parsed = ttcListingResponseSchema.safeParse({ IsSuccess: false, Code: 1005 })
    expect(parsed.success).toBe(true)
    if (parsed.success) {
      expect(parsed.data.IsSuccess).toBe(false)
      expect(parsed.data.Code).toBe(1005)
    }
  })
})
