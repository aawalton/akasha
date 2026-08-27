
import { describe, expect, it } from "bun:test"
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"

import { writePacingSnapshot } from "../lib/supervisor-usage-snapshot.ts"

const KEYS = [
  "account",
  "fiveHourUtilization",
  "fiveHourResetsAt",
  "sevenDayUtilization",
  "sevenDayResetsAt",
  "paceHoursDiff",
  "paceHoursFormatted",
  "updatedAt",
]

const PAGE = ["---", "page-type-slug: claude-account", 'title: "Alanwalton"', "---", ""].join("\n")

const UNCOMMITTED = [
  "five-hour-percent-used: 45",
  "seven-day-percent-used: 71",
  "five-hour-resets-at: 2026-08-19T05:39:59.780059+00:00",
  "seven-day-resets-at: 2026-08-20T22:59:59.780076+00:00",
  "",
].join("\n")

function ground(page: boolean, uncommitted: string | null): { root: string; configDir: string; dir: string } {
  const dir = mkdtempSync(join("/var/tmp", "pacing-snapshot-"))
  const root = join(dir, "root")
  const configDir = join(dir, "config")
  const pageDir = join(root, "pages", "claude-account")
  mkdirSync(pageDir, { recursive: true })
  mkdirSync(configDir, { recursive: true })
  if (page) writeFileSync(join(pageDir, "alanwalton.claude-account.md"), PAGE)
  if (uncommitted !== null) writeFileSync(join(pageDir, "alanwalton.claude-account.uncommitted.yaml"), uncommitted)
  return { root, configDir, dir }
}

function snapshotAfter(page: boolean, uncommitted: string | null): Record<string, unknown> {
  const { root, configDir, dir } = ground(page, uncommitted)
  try {
    writePacingSnapshot("alanwalton", configDir, root)
    return JSON.parse(readFileSync(join(configDir, ".pacing.json"), "utf8")) as Record<string, unknown>
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

describe("writePacingSnapshot", () => {
  it("writes the usage numbers the account page holds", () => {
    const snapshot = snapshotAfter(true, UNCOMMITTED)
    expect(snapshot.account).toBe("alanwalton")
    expect(snapshot.fiveHourUtilization).toBe(45)
    expect(snapshot.sevenDayUtilization).toBe(71)
    expect(typeof snapshot.paceHoursDiff).toBe("number")
    expect(typeof snapshot.paceHoursFormatted).toBe("string")
  })

  it("spells each reset in milliseconds and Z, whatever the page spelled it in", () => {
    const snapshot = snapshotAfter(true, UNCOMMITTED)
    expect(snapshot.fiveHourResetsAt).toBe("2026-08-19T05:39:59.780Z")
    expect(snapshot.sevenDayResetsAt).toBe("2026-08-20T22:59:59.780Z")
  })

  it("carries the keys a reader parses, in the order it wrote them before", () => {
    expect(Object.keys(snapshotAfter(true, UNCOMMITTED))).toEqual(KEYS)
    expect(Object.keys(snapshotAfter(false, null))).toEqual(KEYS)
  })

  it("answers nothing known, rather than nothing used, where no page stands", () => {
    const snapshot = snapshotAfter(false, null)
    expect(snapshot.fiveHourUtilization).toBeNull()
    expect(snapshot.sevenDayUtilization).toBeNull()
    expect(snapshot.fiveHourResetsAt).toBeNull()
    expect(snapshot.sevenDayResetsAt).toBeNull()
    expect(snapshot.paceHoursDiff).toBeNull()
    expect(snapshot.paceHoursFormatted).toBeNull()
  })

  it("reads a page whose uncommitted file is gone as nothing used and no reset known", () => {
    const snapshot = snapshotAfter(true, null)
    expect(snapshot.fiveHourUtilization).toBe(0)
    expect(snapshot.sevenDayUtilization).toBe(0)
    expect(snapshot.fiveHourResetsAt).toBeNull()
    expect(snapshot.sevenDayResetsAt).toBeNull()
  })
})
