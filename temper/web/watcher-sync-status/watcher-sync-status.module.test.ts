import { describe, expect, it } from "bun:test"
import {
  deriveWatcherSyncVerdict,
  newestCaptureAt,
  newestContactAt,
  type WatcherSyncInput,
} from "./watcher-sync-status.module.code.ts"

const EMPTY = { count: 0, lastContactAt: null, capturedAt: null }

function input(overrides: Partial<WatcherSyncInput> = {}): WatcherSyncInput {
  return { connectedAt: null, characters: EMPTY, inventory: EMPTY, ...overrides }
}

const CAPTURED = "2026-07-24T14:32:13Z"
const CONTACT_15H_LATER = "2026-07-25T05:52:35Z"
const CONTACT_6MIN_LATER = "2026-07-24T14:38:20Z"

describe("deriveWatcherSyncVerdict", () => {
  it("reports not-connected for a brand-new account", () => {
    expect(deriveWatcherSyncVerdict(input())).toBe("not-connected")
  })

  it("separates a successful link from data actually arriving", () => {
    expect(deriveWatcherSyncVerdict(input({ connectedAt: "2026-07-25T00:00:00Z" }))).toBe(
      "connected-no-data"
    )
  })

  it("reports syncing when the data was captured close to when it arrived", () => {
    expect(
      deriveWatcherSyncVerdict(
        input({
          connectedAt: "2026-07-24T00:00:00Z",
          inventory: { count: 1, lastContactAt: CONTACT_6MIN_LATER, capturedAt: CAPTURED },
        })
      )
    ).toBe("syncing")
  })

  it("separates a live pipe from fresh data when contact far outruns capture", () => {
    expect(
      deriveWatcherSyncVerdict(
        input({
          connectedAt: "2026-07-24T00:00:00Z",
          characters: { count: 20, lastContactAt: CONTACT_15H_LATER, capturedAt: null },
          inventory: { count: 1, lastContactAt: CONTACT_15H_LATER, capturedAt: CAPTURED },
        })
      )
    ).toBe("connected-stale-data")
  })

  it("does not call ordinary scan-to-upload lag stale", () => {
    expect(
      deriveWatcherSyncVerdict(
        input({
          connectedAt: "2026-07-24T00:00:00Z",
          inventory: { count: 1, lastContactAt: CONTACT_6MIN_LATER, capturedAt: CAPTURED },
        })
      )
    ).toBe("syncing")
  })

  it("does not claim staleness for a source that carries no capture time", () => {
    expect(
      deriveWatcherSyncVerdict(
        input({
          connectedAt: "2026-07-24T00:00:00Z",
          characters: { count: 20, lastContactAt: CONTACT_15H_LATER, capturedAt: null },
        })
      )
    ).toBe("syncing")
  })

  it("distinguishes a manual importer from a Watcher user", () => {
    expect(
      deriveWatcherSyncVerdict(
        input({ characters: { count: 3, lastContactAt: CONTACT_15H_LATER, capturedAt: null } })
      )
    ).toBe("data-without-watcher")
  })
})

describe("newestContactAt", () => {
  it("is null when nothing has ever landed", () => {
    expect(newestContactAt(input())).toBeNull()
  })

  it("returns the newest instant across sources regardless of argument order", () => {
    const characters = { count: 20, lastContactAt: "2026-07-24T14:53:12Z", capturedAt: null }
    const inventory = { count: 1, lastContactAt: "2026-07-25T01:53:42Z", capturedAt: null }
    expect(newestContactAt(input({ characters, inventory }))).toBe("2026-07-25T01:53:42Z")
    expect(newestContactAt(input({ characters: inventory, inventory: characters }))).toBe(
      "2026-07-25T01:53:42Z"
    )
  })

  it("ignores a source that has never reported", () => {
    expect(
      newestContactAt(
        input({
          characters: { count: 20, lastContactAt: "2026-07-24T14:53:12Z", capturedAt: null },
        })
      )
    ).toBe("2026-07-24T14:53:12Z")
  })

  it("ignores an unparseable instant rather than returning it", () => {
    expect(
      newestContactAt(
        input({
          characters: { count: 1, lastContactAt: "not-a-date", capturedAt: null },
          inventory: { count: 1, lastContactAt: "2026-07-25T01:53:42Z", capturedAt: null },
        })
      )
    ).toBe("2026-07-25T01:53:42Z")
  })
})

describe("newestCaptureAt", () => {
  it("is null when no source carries a capture instant", () => {
    expect(
      newestCaptureAt(
        input({
          characters: { count: 20, lastContactAt: CONTACT_15H_LATER, capturedAt: null },
        })
      )
    ).toBeNull()
  })

  it("reports the capture instant, not the contact instant", () => {
    expect(
      newestCaptureAt(
        input({
          characters: { count: 20, lastContactAt: CONTACT_15H_LATER, capturedAt: null },
          inventory: { count: 1, lastContactAt: CONTACT_15H_LATER, capturedAt: CAPTURED },
        })
      )
    ).toBe(CAPTURED)
  })

  it("ignores an unparseable capture instant rather than returning it", () => {
    expect(
      newestCaptureAt(
        input({
          characters: { count: 1, lastContactAt: CONTACT_15H_LATER, capturedAt: "not-a-date" },
          inventory: { count: 1, lastContactAt: CONTACT_15H_LATER, capturedAt: CAPTURED },
        })
      )
    ).toBe(CAPTURED)
  })
})
