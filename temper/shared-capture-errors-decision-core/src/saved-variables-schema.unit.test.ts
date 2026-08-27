import { describe, expect, it } from "bun:test"
import { errorEntrySchema, rootSchema } from "./saved-variables-schema"
import { type ErrorEntry } from "@temper/shared-capture-errors-core/types"

const FIRST_ENTRY: ErrorEntry = {
  traceback: "stack traceback:\n  [C]: in function 'error'",
  message: "user/Foo.lua:42: attempt to index a nil value",
  count: 3,
  firstSeenAt: 1_700_000_000,
  lastSeenAt: 1_700_000_500,
  account: "@alanwalton",
  character: "Sven Iron-Boots",
  world: "NA Megaserver",
  esoVersion: "10.3.4",
  apiVersion: 101046,
  eventCode: 999,
  errorCode: 7,
}

const SECOND_ENTRY: ErrorEntry = {
  traceback: "stack traceback:\n  [C]: ?",
  message: "low memory",
  count: 1,
  firstSeenAt: 1_700_000_100,
  lastSeenAt: 1_700_000_100,
  account: "@alanwalton",
  character: "Anya",
  world: "NA Megaserver",
  esoVersion: "10.3.4",
  apiVersion: 101046,
  eventCode: 1000,
}

const KNOWN_ENTRIES: ErrorEntry[] = [FIRST_ENTRY, SECOND_ENTRY]

const KNOWN_GOOD_ROOT = {
  Default: {
    "@alanwalton": {
      $AccountWide: {
        entries: KNOWN_ENTRIES,
      },
    },
  },
}

describe("errorEntrySchema", () => {
  it("round-trips a known-good ErrorEntry", () => {
    const out = errorEntrySchema.parse(FIRST_ENTRY)
    expect(out).toEqual(FIRST_ENTRY)
  })

  it("parses a legacy entry written before traceback capture (traceback omitted)", () => {
    const { traceback: _omitted, ...legacyEntry } = FIRST_ENTRY
    const out = errorEntrySchema.parse(legacyEntry)
    expect(out.traceback).toBeUndefined()
    expect(out.message).toBe(FIRST_ENTRY.message)
  })

  it("parses an entry whose traceback ZO_SavedVars truncated to nil (null)", () => {
    const out = errorEntrySchema.parse({ ...FIRST_ENTRY, traceback: null })
    expect(out.traceback).toBeNull()
    expect(out.message).toBe(FIRST_ENTRY.message)
  })

  it("round-trips an entry carrying the loaded-build-identity fields", () => {
    const stamped = {
      ...FIRST_ENTRY,
      attributedAddon: "TemperCrafting",
      attributedBuildId: "abc12345",
    }
    const out = errorEntrySchema.parse(stamped)
    expect(out.attributedAddon).toBe("TemperCrafting")
    expect(out.attributedBuildId).toBe("abc12345")
  })

  it("treats the loaded-build-identity fields as optional (omitted is valid)", () => {
    const out = errorEntrySchema.parse(FIRST_ENTRY)
    expect(out.attributedAddon).toBeUndefined()
    expect(out.attributedBuildId).toBeUndefined()
    expect(out.buildIds).toBeUndefined()
  })

  it("round-trips the capture-time buildIds snapshot (addon folder → loaded SHA)", () => {
    const snapshotted = {
      ...FIRST_ENTRY,
      buildIds: { TemperCrafting: "abc12345", TemperInventory: "deadbeef" },
    }
    const out = errorEntrySchema.parse(snapshotted)
    expect(out.buildIds).toEqual({ TemperCrafting: "abc12345", TemperInventory: "deadbeef" })
  })

  it("rejects a non-string value inside the buildIds snapshot (.strict() boundary)", () => {
    expect(() =>
      errorEntrySchema.parse({
        ...FIRST_ENTRY,
        buildIds: { TemperCrafting: 12345 },
      })
    ).toThrow()
  })

  it("rejects an extra field inside an ErrorEntry (.strict() boundary)", () => {
    expect(() =>
      errorEntrySchema.parse({
        ...FIRST_ENTRY,
        unexpectedField: "drift",
      })
    ).toThrow()
  })
})

describe("rootSchema", () => {
  it("parses the ZO_SavedVars Default → @<account> → $AccountWide nesting", () => {
    const out = rootSchema.parse(KNOWN_GOOD_ROOT)
    expect(out.Default?.["@alanwalton"]?.$AccountWide?.entries).toEqual(KNOWN_ENTRIES)
  })

  it("accepts a Default table with no accounts", () => {
    const out = rootSchema.parse({ Default: {} })
    expect(out.Default).toEqual({})
  })

  it("accepts an empty $AccountWide block", () => {
    const out = rootSchema.parse({
      Default: { "@alanwalton": { $AccountWide: {} } },
    })
    expect(out.Default?.["@alanwalton"]?.$AccountWide?.entries).toBeUndefined()
  })

  it("passes unknown root-level keys through (passthrough)", () => {
    const out = rootSchema.parse({ Default: {}, futureField: 42 })
    expect(out.Default).toEqual({})
  })
})
