import { expect, test } from "bun:test"
import { parseWatcherLine } from "./watcher-log-line.module.code.ts"

test("a worker line is read as its time, its level and its message", () => {
  expect(
    parseWatcherLine(
      "2026-08-30T11:22:33.444Z INFO Realtime health: SUBSCRIBED (healthy)",
      "watcher"
    )
  ).toEqual({
    timestamp: "2026-08-30T11:22:33.444Z",
    level: "INFO",
    source: "watcher",
    line: "Realtime health: SUBSCRIBED (healthy)",
  })
})

test("a tray line writes its time to the second and brackets its level", () => {
  expect(parseWatcherLine("2026-08-30T11:22:33Z [WARN] the tray woke", "tray")).toEqual({
    timestamp: "2026-08-30T11:22:33Z",
    level: "WARN",
    source: "tray",
    line: "the tray woke",
  })
})

test("each shape is read only under the source that writes it", () => {
  expect(parseWatcherLine("2026-08-30T11:22:33Z [WARN] the tray woke", "watcher")).toBeNull()
  expect(parseWatcherLine("2026-08-30T11:22:33.444Z INFO a worker line", "tray")).toBeNull()
})

test("a line the shape does not fit is answered as nothing", () => {
  expect(parseWatcherLine("", "watcher")).toBeNull()
  expect(parseWatcherLine("2026-08-30T11:22:33.444Z DEBUG no such level", "watcher")).toBeNull()
  expect(parseWatcherLine("2026-08-30T11:22:33Z [TRACE] no such level", "tray")).toBeNull()
})

test("an empty message is a message", () => {
  expect(parseWatcherLine("2026-08-30T11:22:33.444Z INFO ", "watcher")?.line).toBe("")
})
