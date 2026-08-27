import { describe, expect, it } from "bun:test"

import { mergeNewestFirst } from "../lib/temper-watcher-merge-newest-first.ts"
import type { ParsedLogLine } from "../lib/temper-watcher-parse-log-line.ts"

const FAR_PAST = 0

function watcher(timestamp: string, line: string): ParsedLogLine {
  return { timestamp, line, source: "watcher", level: "INFO" }
}

function tray(timestamp: string, line: string): ParsedLogLine {
  return { timestamp, line, source: "tray", level: "INFO" }
}

describe("mergeNewestFirst", () => {
  it("returns watcher's :02.500Z before tray's :02Z (cross-source same-second)", () => {
    const w = watcher("2026-05-06T08:00:02.500Z", "snapshot upload failed: 401")
    const t = tray("2026-05-06T08:00:02Z", "file change detected: TemperEquipment.lua")
    const merged = mergeNewestFirst([w], [t], FAR_PAST)
    expect(merged).toEqual([w, t])
  })

  it("orders by epoch ms across mixed-precision timestamps", () => {
    const records = mergeNewestFirst(
      [
        watcher("2026-05-06T08:00:00.001Z", "watcher started"),
        watcher("2026-05-06T08:00:01.137Z", "export-settings POST 200 in 412ms"),
        watcher("2026-05-06T08:00:02.500Z", "snapshot upload failed: 401"),
      ],
      [
        tray("2026-05-06T08:00:00Z", "tray icon initialized"),
        tray("2026-05-06T08:00:01Z", "file change detected: TemperInventory.lua"),
        tray("2026-05-06T08:00:02Z", "file change detected: TemperEquipment.lua"),
        tray("2026-05-06T08:00:03Z", "config reload skipped: no changes"),
      ],
      FAR_PAST
    )
    const timestamps = records.map((r) => r.timestamp)
    expect(timestamps).toEqual([
      "2026-05-06T08:00:03Z",
      "2026-05-06T08:00:02.500Z",
      "2026-05-06T08:00:02Z",
      "2026-05-06T08:00:01.137Z",
      "2026-05-06T08:00:01Z",
      "2026-05-06T08:00:00.001Z",
      "2026-05-06T08:00:00Z",
    ])
  })

  it("filters out records older than the cutoff (epochMs < cutoffMs dropped)", () => {
    const cutoffMs = Date.parse("2026-05-06T08:00:01Z")
    const records = mergeNewestFirst(
      [
        watcher("2026-05-06T08:00:00.500Z", "before cutoff"),
        watcher("2026-05-06T08:00:01.500Z", "after cutoff"),
      ],
      [tray("2026-05-06T08:00:00Z", "before cutoff"), tray("2026-05-06T08:00:02Z", "after cutoff")],
      cutoffMs
    )
    expect(records.map((r) => r.timestamp)).toEqual([
      "2026-05-06T08:00:02Z",
      "2026-05-06T08:00:01.500Z",
    ])
  })

  it("keeps records exactly at the cutoff (epochMs >= cutoffMs)", () => {
    const cutoffMs = Date.parse("2026-05-06T08:00:01Z")
    const records = mergeNewestFirst([], [tray("2026-05-06T08:00:01Z", "at cutoff")], cutoffMs)
    expect(records).toHaveLength(1)
  })

  it("breaks exact epoch-ms ties deterministically by source (tray < watcher)", () => {
    const w = watcher("2026-05-06T08:00:05.000Z", "rounded to second")
    const t = tray("2026-05-06T08:00:05Z", "sharp at second")
    const merged = mergeNewestFirst([w], [t], FAR_PAST)
    expect(merged).toEqual([t, w])
  })
})
