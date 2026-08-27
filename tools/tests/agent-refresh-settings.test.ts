import { describe, expect, test } from "bun:test"
import { isSpawnedSettings, settingsPathIn } from "../lib/live-settings.ts"
import { refreshedSettings } from "../lib/supervisor-spawn-settings.ts"

describe("what a refreshed settings file holds", () => {
  test("a key the document states now replaces the one the seat was launched with", () => {
    const refreshed = refreshedSettings({ hooks: { Stop: "was" } }, { hooks: { Stop: "now" } })
    expect(refreshed["hooks"]).toEqual({ Stop: "now" })
  })

  test("a per-spawn key is carried over, a seat keeping the overrides it was launched with", () => {
    const refreshed = refreshedSettings(
      { remoteControlAtStartup: true },
      { remoteControlAtStartup: false, hooks: {} }
    )
    expect(refreshed["remoteControlAtStartup"]).toBe(true)
  })

  test("a key the document has dropped leaves, rather than standing because the old file held it", () => {
    const refreshed = refreshedSettings({ retired: 1 }, { hooks: {} })
    expect("retired" in refreshed).toBe(false)
  })

  test("a per-spawn key the old file never carried is not invented from the document", () => {
    const refreshed = refreshedSettings({}, { remoteControlAtStartup: false })
    expect(refreshed["remoteControlAtStartup"]).toBe(false)
  })
})

describe("which files a running process points at", () => {
  test("the path is the argument after the flag", () => {
    expect(settingsPathIn(["claude", "--settings", "/tmp/agent-settings-abc.json"])).toBe(
      "/tmp/agent-settings-abc.json"
    )
  })

  test("a command naming no settings file names none, rather than its next argument", () => {
    expect(settingsPathIn(["claude", "--resume", "x"])).toBeNull()
  })

  test("a flag with nothing after it names none", () => {
    expect(settingsPathIn(["claude", "--settings"])).toBeNull()
  })

  test("only a file a spawn wrote is one this may rewrite, a settings file named by hand being nobody's to replace", () => {
    expect(isSpawnedSettings("/tmp/agent-settings-abc.json")).toBe(true)
    expect(isSpawnedSettings("/home/walton/.claude/settings.json")).toBe(false)
    expect(isSpawnedSettings("/tmp/agent-settings-abc.json.bak")).toBe(false)
  })
})
