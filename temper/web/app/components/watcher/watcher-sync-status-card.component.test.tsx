import { afterEach, describe, expect, test } from "bun:test"
import { cleanup } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type { WatcherSyncSummary } from "@/lib/watcher-sync-status"
import { WatcherSyncStatusCard } from "./watcher-sync-status-card"

const DAY_AGO = new Date(Date.now() - 86_400_000).toISOString()
const TEN_MINUTES_AGO = new Date(Date.now() - 600_000).toISOString()

const EMPTY = { count: 0, lastContactAt: null, capturedAt: null }

function summary(overrides: Partial<WatcherSyncSummary> = {}): WatcherSyncSummary {
  return {
    connectedAt: null,
    characters: EMPTY,
    inventory: EMPTY,
    verdict: "not-connected",
    lastContactAt: null,
    dataCapturedAt: null,
    ...overrides,
  }
}

function textOf(sync: WatcherSyncSummary): string {
  const { container } = render(<WatcherSyncStatusCard sync={sync} />)
  return container.textContent ?? ""
}

afterEach(() => {
  cleanup()
})

describe("WatcherSyncStatusCard", () => {
  test("never-synced says so in plain words and claims nothing else", () => {
    const text = textOf(summary())

    expect(text).toContain("Nothing has synced yet")
    expect(text).toContain("never received game data")
    expect(text).toContain("Characters")
    expect(text).toContain("Inventory")
    expect(text).toContain("none received yet")
    expect(text).not.toContain("captured")
  })

  test("linked-but-empty distinguishes a successful link from data arriving", () => {
    const text = textOf(summary({ connectedAt: DAY_AGO, verdict: "connected-no-data" }))

    expect(text).toContain("Linked, but no game data has arrived")
    expect(text).toContain("received nothing since")
    expect(text).toContain("1 day ago")
    expect(text).toContain("most common cause")
    expect(text).toContain("not your setup")
    expect(text).not.toContain("worth reporting")
  })

  test("healthy state dates itself by capture time, not by pipe time", () => {
    const text = textOf(
      summary({
        connectedAt: DAY_AGO,
        characters: { count: 20, lastContactAt: DAY_AGO, capturedAt: null },
        inventory: { count: 1, lastContactAt: DAY_AGO, capturedAt: DAY_AGO },
        verdict: "syncing",
        lastContactAt: DAY_AGO,
        dataCapturedAt: DAY_AGO,
      })
    )

    expect(text).toContain("Game data captured 1 day ago")
    expect(text).toContain("20 characters")
    expect(text).toContain("capture time stops advancing")
  })

  test("stale-but-live reports both instants and merges neither", () => {
    const text = textOf(
      summary({
        connectedAt: DAY_AGO,
        characters: { count: 20, lastContactAt: TEN_MINUTES_AGO, capturedAt: null },
        inventory: { count: 1, lastContactAt: TEN_MINUTES_AGO, capturedAt: DAY_AGO },
        verdict: "connected-stale-data",
        lastContactAt: TEN_MINUTES_AGO,
        dataCapturedAt: DAY_AGO,
      })
    )

    expect(text).toContain("Game data captured 1 day ago")
    expect(text).toContain("10 minutes ago")
    expect(text).toContain("cannot tell")
    expect(text).not.toContain("Last synced")
  })

  test("characters row never claims a capture time it does not have", () => {
    const text = textOf(
      summary({
        connectedAt: DAY_AGO,
        characters: { count: 20, lastContactAt: DAY_AGO, capturedAt: null },
        inventory: { count: 1, lastContactAt: TEN_MINUTES_AGO, capturedAt: DAY_AGO },
        verdict: "syncing",
        lastContactAt: TEN_MINUTES_AGO,
        dataCapturedAt: DAY_AGO,
      })
    )

    expect(text).toContain("20 characters · last received 1 day ago")
    expect(text).toContain("captured 1 day ago · last received 10 minutes ago")
  })

  test("a source that never arrives stays visible while its sibling reports", () => {
    const text = textOf(
      summary({
        connectedAt: DAY_AGO,
        characters: { count: 20, lastContactAt: DAY_AGO, capturedAt: null },
        verdict: "syncing",
        lastContactAt: DAY_AGO,
        dataCapturedAt: null,
      })
    )

    expect(text).toContain("20 characters")
    expect(text).toContain("none received yet")
    expect(text).toContain("cannot say how old")
    expect(text).not.toContain("Game data captured")
  })

  test("manual importer is not told a Watcher is running", () => {
    const text = textOf(
      summary({
        characters: { count: 3, lastContactAt: DAY_AGO, capturedAt: null },
        verdict: "data-without-watcher",
        lastContactAt: DAY_AGO,
        dataCapturedAt: null,
      })
    )

    expect(text).toContain("Last imported by hand 1 day ago")
    expect(text).toContain("no Watcher is linked")
  })

  test("singular character count reads naturally", () => {
    const text = textOf(
      summary({
        connectedAt: DAY_AGO,
        characters: { count: 1, lastContactAt: DAY_AGO, capturedAt: null },
        verdict: "syncing",
        lastContactAt: DAY_AGO,
        dataCapturedAt: null,
      })
    )

    expect(text).toContain("1 character ·")
    expect(text).not.toContain("1 characters")
  })
})
