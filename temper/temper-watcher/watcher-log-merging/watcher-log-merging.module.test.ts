import { expect, test } from "bun:test"
import type { WatcherLogLine } from "../watcher-log-line/watcher-log-line.module.code.ts"
import { mergeNewestFirst } from "./watcher-log-merging.module.code.ts"

const at = (timestamp: string, source: "watcher" | "tray"): WatcherLogLine => ({
  timestamp,
  line: `${source} ${timestamp}`,
  source,
  level: "INFO",
})

test("the newest line comes first", () => {
  const merged = mergeNewestFirst(
    [at("2026-08-30T00:00:01.000Z", "watcher"), at("2026-08-30T00:00:03.000Z", "watcher")],
    [at("2026-08-30T00:00:02Z", "tray")],
    0
  )
  expect(merged.map((one) => one.timestamp)).toEqual([
    "2026-08-30T00:00:03.000Z",
    "2026-08-30T00:00:02Z",
    "2026-08-30T00:00:01.000Z",
  ])
})

test("a line older than the moment handed in is left out", () => {
  const cutoff = Date.parse("2026-08-30T00:00:02.000Z")
  const merged = mergeNewestFirst(
    [at("2026-08-30T00:00:01.000Z", "watcher"), at("2026-08-30T00:00:02.000Z", "watcher")],
    [],
    cutoff
  )
  expect(merged.map((one) => one.timestamp)).toEqual(["2026-08-30T00:00:02.000Z"])
})

test("the tray comes before the worker where the moment ties", () => {
  const merged = mergeNewestFirst(
    [at("2026-08-30T00:00:02.000Z", "watcher")],
    [at("2026-08-30T00:00:02Z", "tray")],
    0
  )
  expect(merged.map((one) => one.source)).toEqual(["tray", "watcher"])
})
