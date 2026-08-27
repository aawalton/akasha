
import { describe, expect, it } from "bun:test"
import { hold } from "../lib/digest-harness.ts"
import { type Answer, CLEAN, drive } from "./recipient-resolver-daemon-stage.ts"

interface Vector {
  readonly name: string
  readonly env: Record<string, string>
  readonly standing: Answer
}

const head = (tickMs: number): string[] => [
  `stub-ww-banner tick=${tickMs}`,
  "recipient-resolver: starting tick loop pid=<pid> specs=dynamic (per-tick persona enumeration + explicit statics)",
]
const SPECS = "stub specs assembled from function/function/function"
const TAIL = ["recipient-resolver: stopping"]
const tick = (n: number, perSpec: number): string => `stub ww tick n=${n} specs=1 perSpec=${perSpec}`
const round = (n: number, perSpec: number): string[] => [SPECS, tick(n, perSpec)]
const reviveRound = (perSpec: number, logged: string, signal: string): string[] => [
  SPECS,
  tick(1, perSpec),
  `[local] recipient-resolver: ${logged}`,
  `stub ww tick revive signal=${signal}`,
]
const ARGV_WITH_BOOT =
  'fake-ops argv=["seat","resume","agent-0001","--verify","--json","--boot-prompt","/persona-boot"]'
const ARGV_BARE = 'fake-ops argv=["seat","resume","agent-0001","--verify","--json"]'
const notVerified = (detail: string): string =>
  `revive agent-0001 did NOT verify (exit 3: io did not advance past revive / boot failed) — NOT revived, surfacing: ${detail}`
const reviveFailed = (code: number, detail: string): string =>
  `[local] recipient-resolver: revive agent-0001 FAILED (exit ${code}) — the seat was NOT revived ` +
  `and the inbound work that matched it is still waiting: ${detail}`
const failedRound = (perSpec: number): string[] => [
  SPECS,
  tick(1, perSpec),
  "stub ww tick revive signal=failed",
]

const REVIVE = { ...CLEAN, STUB_MODE: "revive", STUB_DRY_RUN: "0", STUB_REVIVE_TIMEOUT_MS: "700" }
const ok = (stdout: readonly string[], stderr: readonly string[], exitCode: number): Answer => ({
  stdout,
  stderr,
  exitCode,
  endedUnderTenSeconds: true,
})

const VECTORS: readonly Vector[] = [
  {
    name: "SIGTERM mid-sleep: one tick, then the 60s sleep aborts and the loop stops clean",
    env: { ...CLEAN, STUB_MODE: "ok" },
    standing: ok([...head(60000), ...round(1, 65000), ...TAIL], [], 0),
  },
  {
    name: "SIGINT mid-sleep: the second handler stops it the same way",
    env: { ...CLEAN, STUB_MODE: "ok", STUB_SIGNAL: "SIGINT" },
    standing: ok([...head(60000), ...round(1, 65000), ...TAIL], [], 0),
  },
  {
    name: "a throwing wake tick is logged and the loop continues to the next",
    env: { STUB_MODE: "tick-throw", STUB_KILL_AT: "3", STUB_SIGNAL: "SIGTERM", STUB_TICK_MS: "50" },
    standing: ok(
      [...head(50), ...round(1, 5050), ...round(2, 5050), ...round(3, 5050), ...TAIL],
      ["recipient-resolver: tick threw: boom", "recipient-resolver: tick threw: boom"],
      0
    ),
  },
  {
    name: "a tick that throws after the abort is still logged, and the loop still stops",
    env: { ...CLEAN, STUB_MODE: "kill-then-throw" },
    standing: ok(
      [...head(60000), ...round(1, 65000), ...TAIL],
      ["recipient-resolver: tick threw: boom"],
      0
    ),
  },
  {
    name: "a throwing specs assembly is caught by the tick's own try, and the loop continues",
    env: { STUB_MODE: "specs-throw", STUB_KILL_AT: "2", STUB_SIGNAL: "SIGTERM", STUB_TICK_MS: "50" },
    standing: ok(
      [...head(50), SPECS, SPECS, ...TAIL],
      ["recipient-resolver: tick threw: specs-boom", "recipient-resolver: tick threw: specs-boom"],
      0
    ),
  },
  {
    name: "a throw out of main is fatal: one stderr line and exit 1",
    env: { ...CLEAN, STUB_MODE: "banner-throw" },
    standing: ok([], ["recipient-resolver fatal: banner-boom"], 1),
  },
  {
    name: "a verified revive: exit 0 reads as revived and the subprocess output is not surfaced",
    env: { ...REVIVE, STUB_OPS_EXIT: "0", STUB_BOOT_PROMPT: "/persona-boot" },
    standing: ok(
      [
        ...head(60000),
        ...reviveRound(60700, "revived agent-0001 (io advanced past revive — verified)", "revived"),
        ...TAIL,
      ],
      [],
      0
    ),
  },
  {
    name: "exit 3 reads as unverified, and the argv it built carries the boot prompt",
    env: { ...REVIVE, STUB_OPS_EXIT: "3", STUB_BOOT_PROMPT: "/persona-boot" },
    standing: ok(
      [
        ...head(60000),
        ...reviveRound(60700, notVerified(ARGV_WITH_BOOT), "unverified"),
        ...TAIL,
      ],
      [],
      0
    ),
  },
  {
    name: "exit 1 reads as failed on stderr, and an absent boot prompt puts no flag on the argv",
    env: { ...REVIVE, STUB_OPS_EXIT: "1" },
    standing: ok(
      [...head(60000), ...failedRound(60700), ...TAIL],
      [reviveFailed(1, ARGV_BARE)],
      0
    ),
  },
  {
    name: "an EMPTY boot prompt puts no flag on the argv either — the length test, not the presence test",
    env: { ...REVIVE, STUB_OPS_EXIT: "3", STUB_BOOT_PROMPT: "" },
    standing: ok(
      [...head(60000), ...reviveRound(60700, notVerified(ARGV_BARE), "unverified"), ...TAIL],
      [],
      0
    ),
  },
  {
    name: "a hung revive is killed at its ceiling and reads benign, never unverified",
    env: { ...REVIVE, STUB_OPS: "hang", STUB_REVIVE_TIMEOUT_MS: "700" },
    standing: ok(
      [
        ...head(60000),
        ...reviveRound(
          60700,
          "revive agent-0001 exceeded 700ms — killed (retry next tick)",
          "benign"
        ),
        ...TAIL,
      ],
      [],
      0
    ),
  },
  {
    name: "dry run skips the spawn entirely and still answers benign",
    env: { ...CLEAN, STUB_MODE: "revive", STUB_DRY_RUN: "1", STUB_REVIVE_TIMEOUT_MS: "700" },
    standing: ok(
      [
        ...head(60000),
        ...reviveRound(60700, "[dry-run] would revive agent-0001 (spawn skipped)", "benign"),
        ...TAIL,
      ],
      [],
      0
    ),
  },
]

describe("recipient-resolver-daemon.ts, held against the code repository's measured answers", () => {
  for (const vector of VECTORS) {
    it(
      vector.name,
      () => {
        const verdict = hold(vector.name, vector.standing, drive(vector.env))
        expect(verdict.matches).toBe(true)
      },
      30_000
    )
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
    const nudged = { ...first, stdout: [...first.stdout.slice(0, -1), "recipient-resolver: stopped"] }
    expect(hold("negative control", first, nudged).matches).toBe(false)
  })

  it("catches one changed argv token", () => {
    const withBoot = VECTORS[7]?.standing as Answer
    const bare = VECTORS[9]?.standing as Answer
    expect(hold("negative control", withBoot, bare).matches).toBe(false)
  })
})
