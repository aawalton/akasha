import { afterAll, beforeAll, describe, expect, it } from "bun:test"
import { mkdtemp, rm } from "node:fs/promises"
import { join } from "node:path"

const CLI_PATH = `${import.meta.dir}/../ops/cli.ts`

const SCRATCH_ROOT = "/var/tmp"

const TEN_MINUTES_MS = 10 * 60 * 1000

const BASE_MS = Math.floor((Date.now() - TEN_MINUTES_MS) / 1000) * 1000

function millisecondStamp(offsetMs: number): string {
  return new Date(BASE_MS + offsetMs).toISOString()
}

function secondStamp(offsetMs: number): string {
  return new Date(BASE_MS + offsetMs).toISOString().replace(/\.\d{3}Z$/, "Z")
}

const WATCHER_LINES = [
  `${millisecondStamp(0)} INFO watcher first`,
  `${millisecondStamp(1000)} INFO watcher second`,
  `${millisecondStamp(2500)} ERROR watcher third`,
  `${millisecondStamp(4000)} INFO watcher fourth`,
]

const TRAY_LINES = [
  `${secondStamp(1000)} [INFO] tray first`,
  `${secondStamp(2000)} [INFO] tray second`,
  `${secondStamp(3000)} [WARN] tray third`,
]

const EXPECTED_TOTAL = WATCHER_LINES.length + TRAY_LINES.length

const WATCHER_SUB_SECOND_STAMP = millisecondStamp(2500)
const TRAY_SAME_SECOND_STAMP = secondStamp(2000)

let fixtureDir = ""
let fixtureFlags: readonly string[] = []

beforeAll(async () => {
  fixtureDir = await mkdtemp(join(SCRATCH_ROOT, "ops-temper-watcher-logs-"))
  await Bun.write(join(fixtureDir, "watcher.log"), `${WATCHER_LINES.join("\n")}\n`)
  await Bun.write(join(fixtureDir, "tray.log"), `${TRAY_LINES.join("\n")}\n`)
  fixtureFlags = ["--log-dir", fixtureDir]
})

afterAll(async () => {
  await rm(fixtureDir, { recursive: true, force: true })
})

async function runCli(
  args: readonly string[]
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  const proc = Bun.spawn(["bun", CLI_PATH, "temper", "watcher", "logs", ...args], {
    stdout: "pipe",
    stderr: "pipe",
    env: process.env,
  })
  const [stdout, stderr] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
  ])
  await proc.exited
  return { stdout, stderr, exitCode: proc.exitCode ?? -1 }
}

interface LogRecord {
  readonly timestamp: string
  readonly line: string
  readonly source: string
  readonly level: string
}

interface LogAggregate {
  readonly lines: readonly LogRecord[]
  readonly count: number
}

function parseJsonl(stdout: string): readonly LogRecord[] {
  return stdout
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => JSON.parse(line) as LogRecord)
}

describe("ops temper watcher logs", () => {
  it("default JSONL output: every fixture record, four-key shape, newest-first", async () => {
    const result = await runCli([...fixtureFlags, "--since", "1h"])
    expect(result.exitCode).toBe(0)
    const parsed = parseJsonl(result.stdout)
    expect(parsed.length).toBe(EXPECTED_TOTAL)
    for (const record of parsed) {
      expect(Object.keys(record).sort()).toEqual(["level", "line", "source", "timestamp"])
    }
    for (let i = 0; i < parsed.length - 1; i++) {
      const a = parsed[i]
      const b = parsed[i + 1]
      if (a === undefined || b === undefined) continue
      expect(Date.parse(a.timestamp) >= Date.parse(b.timestamp)).toBe(true)
    }
    const sources = new Set(parsed.map((r) => r.source))
    expect(sources.has("watcher")).toBe(true)
    expect(sources.has("tray")).toBe(true)
  })

  it("cross-source same-second ordering: the watcher's sub-second record precedes the tray's", async () => {
    const result = await runCli([...fixtureFlags, "--since", "1h"])
    expect(result.exitCode).toBe(0)
    const parsed = parseJsonl(result.stdout)
    const watcherIdx = parsed.findIndex(
      (r) => r.source === "watcher" && r.timestamp === WATCHER_SUB_SECOND_STAMP
    )
    const trayIdx = parsed.findIndex(
      (r) => r.source === "tray" && r.timestamp === TRAY_SAME_SECOND_STAMP
    )
    expect(watcherIdx).toBeGreaterThanOrEqual(0)
    expect(trayIdx).toBeGreaterThanOrEqual(0)
    expect(watcherIdx).toBeLessThan(trayIdx)
  })

  it("--json: single aggregate object with lines + count", async () => {
    const result = await runCli([...fixtureFlags, "--since", "1h", "--json"])
    expect(result.exitCode).toBe(0)
    const parsed = JSON.parse(result.stdout) as LogAggregate
    expect(parsed.count).toBe(EXPECTED_TOTAL)
    expect(parsed.lines.length).toBe(EXPECTED_TOTAL)
  })

  it("--limit 2: only the two newest records", async () => {
    const result = await runCli([...fixtureFlags, "--since", "1h", "--limit", "2"])
    expect(result.exitCode).toBe(0)
    const parsed = parseJsonl(result.stdout)
    expect(parsed.length).toBe(2)
    const a = parsed[0]
    const b = parsed[1]
    expect(a).toBeDefined()
    expect(b).toBeDefined()
    if (a === undefined || b === undefined) return
    expect(Date.parse(a.timestamp) >= Date.parse(b.timestamp)).toBe(true)
  })

  it("--since 1s: records ten minutes old are filtered out", async () => {
    const result = await runCli([...fixtureFlags, "--since", "1s"])
    expect(result.exitCode).toBe(0)
    expect(parseJsonl(result.stdout).length).toBe(0)
  })

  it("missing log-dir: exit != 0, stderr names the path", async () => {
    const missing = join(fixtureDir, "no-such-log-dir")
    const result = await runCli(["--log-dir", missing, "--since", "1h"])
    expect(result.exitCode).not.toBe(0)
    expect(result.stderr).toContain(missing)
  })
})
