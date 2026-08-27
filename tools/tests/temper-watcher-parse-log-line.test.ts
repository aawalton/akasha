import { describe, expect, it } from "bun:test"

import { parseLogLine } from "../lib/temper-watcher-parse-log-line.ts"

describe("parseLogLine — watcher.log", () => {
  it("parses a valid INFO line", () => {
    const line = "2026-05-06T18:42:11.483Z INFO export-settings POST 200 in 412ms"
    const result = parseLogLine(line, "watcher")
    expect(result).not.toBeNull()
    if (result === null) return
    expect(result.timestamp).toBe("2026-05-06T18:42:11.483Z")
    expect(result.line).toBe("export-settings POST 200 in 412ms")
    expect(result.source).toBe("watcher")
    expect(result.level).toBe("INFO")
  })

  it("parses a valid ERROR line", () => {
    const line = "2026-05-06T18:41:58.022Z ERROR snapshot upload failed: 401"
    const result = parseLogLine(line, "watcher")
    expect(result).not.toBeNull()
    if (result === null) return
    expect(result.level).toBe("ERROR")
    expect(result.line).toBe("snapshot upload failed: 401")
    expect(result.source).toBe("watcher")
  })

  it("returns null on a malformed line (no timestamp)", () => {
    const result = parseLogLine("INFO this line has no timestamp at all", "watcher")
    expect(result).toBeNull()
  })

  it("returns null on a tray-shaped line passed under source=watcher", () => {
    const trayShaped = "2026-05-06T18:42:09Z [INFO] file change detected: TemperInventory.lua"
    const result = parseLogLine(trayShaped, "watcher")
    expect(result).toBeNull()
  })
})

describe("parseLogLine — tray.log", () => {
  it("parses a valid INFO line with bracketed level", () => {
    const line = "2026-05-06T18:42:09Z [INFO] file change detected: TemperInventory.lua"
    const result = parseLogLine(line, "tray")
    expect(result).not.toBeNull()
    if (result === null) return
    expect(result.timestamp).toBe("2026-05-06T18:42:09Z")
    expect(result.line).toBe("file change detected: TemperInventory.lua")
    expect(result.source).toBe("tray")
    expect(result.level).toBe("INFO")
  })

  it("parses a valid WARN line", () => {
    const line = "2026-05-06T18:42:15Z [WARN] config file missing, using defaults"
    const result = parseLogLine(line, "tray")
    expect(result).not.toBeNull()
    if (result === null) return
    expect(result.level).toBe("WARN")
    expect(result.line).toBe("config file missing, using defaults")
    expect(result.source).toBe("tray")
  })

  it("returns null on a malformed line", () => {
    const result = parseLogLine("not-a-log-line", "tray")
    expect(result).toBeNull()
  })

  it("returns null on a watcher-shaped line passed under source=tray", () => {
    const watcherShaped = "2026-05-06T18:42:11.483Z INFO export-settings POST 200 in 412ms"
    const result = parseLogLine(watcherShaped, "tray")
    expect(result).toBeNull()
  })
})
