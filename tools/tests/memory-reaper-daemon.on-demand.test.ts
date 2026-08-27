
import { afterAll, describe, expect, it } from "bun:test"
import { copyFileSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { hold } from "../lib/digest-harness.ts"

const HERE = dirname(fileURLToPath(import.meta.url))
const PORTED = join(HERE, "..", "..", "services", "memory-reaper-daemon.ts")

const TICK_STUB = `const MODE = process.env.STUB_MODE ?? "ok"
const KILL_AT = Number(process.env.STUB_KILL_AT ?? "1")
const SIG = (process.env.STUB_SIGNAL ?? "SIGTERM") as NodeJS.Signals
export type ReaperState = { lastGlobalKillAtMs: number | null }
let n = 0
export async function runBoundedReaperTick(_s: ReaperState, _sig: AbortSignal): Promise<void> {
  n += 1
  console.log(\`stub tick n=\${n}\`)
  if (n === KILL_AT) {
    process.kill(process.pid, SIG)
    if (MODE === "kill-then-throw") {
      await new Promise((r) => setTimeout(r, 200))
      throw "boom"
    }
    return
  }
  if (MODE === "throw") throw "boom"
}
`

const CONFIG_STUB = `const MODE = process.env.STUB_MODE ?? "ok"
export const TICK_MS = Number(process.env.STUB_TICK_MS ?? "60000")
export function reaperConfigBanner(): string {
  if (MODE === "banner-throw") throw "banner-boom"
  return "stub-banner"
}
`

const STAGE = mkdtempSync("/var/tmp/memory-reaper-daemon-")
mkdirSync(join(STAGE, "tools", "lib"), { recursive: true })
mkdirSync(join(STAGE, "services"), { recursive: true })
writeFileSync(join(STAGE, "tools", "lib", "memory-reaper-tick.ts"), TICK_STUB)
writeFileSync(join(STAGE, "tools", "lib", "memory-reaper-config.ts"), CONFIG_STUB)
copyFileSync(PORTED, join(STAGE, "services", "memory-reaper-daemon.ts"))

afterAll(() => rmSync(STAGE, { recursive: true, force: true }))

interface Answer {
  readonly stdout: readonly string[]
  readonly stderr: readonly string[]
  readonly exitCode: number | null
  readonly endedUnderTenSeconds: boolean
}

interface Vector {
  readonly name: string
  readonly env: Record<string, string>
  readonly standing: Answer
}

const lines = (bytes: Uint8Array): string[] =>
  new TextDecoder()
    .decode(bytes)
    .split("\n")
    .filter((line) => line.length > 0)
    .map((line) => line.replace(/pid=\d+/, "pid=<pid>"))

function drive(env: Record<string, string>): Answer {
  const started = Date.now()
  const run = Bun.spawnSync({
    cmd: ["bun", join(STAGE, "services", "memory-reaper-daemon.ts")],
    env: { ...process.env, ...env },
    stdout: "pipe",
    stderr: "pipe",
    timeout: 20_000,
  })
  const elapsed = Date.now() - started
  const stdout = lines(run.stdout)
  if (stdout.some((line) => line.includes("ceilings per-process")))
    throw new Error("the real reaper tick loaded — refusing to report a verdict from a live tick")
  return { stdout, stderr: lines(run.stderr), exitCode: run.exitCode, endedUnderTenSeconds: elapsed < 10_000 }
}

const RUNNING = ["stub-banner", "memory-reaper: starting tick loop pid=<pid>"]
const STOPPED = "memory-reaper: stopping"

const VECTORS: readonly Vector[] = [
  {
    name: "SIGTERM mid-sleep: one tick, then the 60s sleep aborts and the loop stops clean",
    env: { STUB_MODE: "ok", STUB_KILL_AT: "1", STUB_SIGNAL: "SIGTERM", STUB_TICK_MS: "60000" },
    standing: {
      stdout: [...RUNNING, "stub tick n=1", STOPPED],
      stderr: [],
      exitCode: 0,
      endedUnderTenSeconds: true,
    },
  },
  {
    name: "SIGINT mid-sleep: the second handler stops it the same way",
    env: { STUB_MODE: "ok", STUB_KILL_AT: "1", STUB_SIGNAL: "SIGINT", STUB_TICK_MS: "60000" },
    standing: {
      stdout: [...RUNNING, "stub tick n=1", STOPPED],
      stderr: [],
      exitCode: 0,
      endedUnderTenSeconds: true,
    },
  },
  {
    name: "a throwing tick is logged and the loop continues to the next",
    env: { STUB_MODE: "throw", STUB_KILL_AT: "3", STUB_SIGNAL: "SIGTERM", STUB_TICK_MS: "50" },
    standing: {
      stdout: [...RUNNING, "stub tick n=1", "stub tick n=2", "stub tick n=3", STOPPED],
      stderr: ["memory-reaper: tick threw: boom", "memory-reaper: tick threw: boom"],
      exitCode: 0,
      endedUnderTenSeconds: true,
    },
  },
  {
    name: "a tick that throws after the abort is not logged (shutdown is not a fault)",
    env: {
      STUB_MODE: "kill-then-throw",
      STUB_KILL_AT: "1",
      STUB_SIGNAL: "SIGTERM",
      STUB_TICK_MS: "60000",
    },
    standing: {
      stdout: [...RUNNING, "stub tick n=1", STOPPED],
      stderr: [],
      exitCode: 0,
      endedUnderTenSeconds: true,
    },
  },
  {
    name: "a throw out of main is fatal: one stderr line and exit 1",
    env: {
      STUB_MODE: "banner-throw",
      STUB_KILL_AT: "1",
      STUB_SIGNAL: "SIGTERM",
      STUB_TICK_MS: "60000",
    },
    standing: {
      stdout: [],
      stderr: ["memory-reaper fatal: banner-boom"],
      exitCode: 1,
      endedUnderTenSeconds: true,
    },
  },
]

describe("memory-reaper-daemon.ts, held against the code repository's measured answers", () => {
  for (const vector of VECTORS) {
    it(vector.name, () => {
      const verdict = hold(vector.name, vector.standing, drive(vector.env))
      expect(verdict.matches).toBe(true)
    })
  }
})

describe("the instrument can still fail", () => {
  it("tells two answers apart", () => {
    const first = VECTORS[0]?.standing as Answer
    const second = VECTORS[2]?.standing as Answer
    expect(hold("negative control", first, second).matches).toBe(false)
  })

  it("catches one changed line", () => {
    const first = VECTORS[0]?.standing as Answer
    const nudged = { ...first, stdout: [...first.stdout.slice(0, -1), "memory-reaper: stopped"] }
    expect(hold("negative control", first, nudged).matches).toBe(false)
  })
})
