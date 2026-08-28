
import { describe, expect, it } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { type Answer, decided, hold } from "../lib/digest-harness.ts"
import { DRIVER_SOURCE } from "./supervisor-monitors-wire-driver.ts"

const ARM_DIR = "/var/tmp/supervisor-monitors-wire-arm"
const DRIVER = `${ARM_DIR}/drive.ts`

const PORTED = new URL("../lib/supervisor-monitors-wire.ts", import.meta.url).pathname
const LIB_DIR = new URL("../lib", import.meta.url).pathname

const PROXY_KEYS = ["getAgentId", "getLogDir", "getProxyHandle", "proxyLivenessRule", "registrationAccount"]
const RETURNED_KEYS = [
  "heartbeatTimer",
  "limitResumeMonitor",
  "proxyLivenessMonitor",
  "waitResumeMonitor",
]
const RETURNED = {
  heartbeatTimerIsBuilt: true,
  proxyLivenessMonitorIsStarted: true,
  limitResumeMonitorIsStarted: true,
  limitResumeMonitorIsNull: false,
  waitResumeMonitorIsStarted: true,
}

const HEARTBEAT_KEYS_HERE = ["getAgentId", "polls"]
const POLL_NAMES_HERE = ["supervisor-files", "proxy-version", "agent-action"]

const standingFor = (
  agentId: string | null,
  registrationAccount: string,
  logDir: string,
  ruleTag: string
): unknown => ({
  threw: null,
  calls: [
    { fn: "buildHeartbeatMonitor", keys: HEARTBEAT_KEYS_HERE, agentId, pollNames: POLL_NAMES_HERE },
    {
      fn: "startProxyLivenessMonitor",
      keys: PROXY_KEYS,
      agentId,
      getProxyHandleIsTheStateGetter: true,
      tick1: { pid: 4001, port: 31337, seq: 1 },
      tick2: { pid: 4002, port: 31337, seq: 2 },
      registrationAccount,
      logDir,
      ruleTag,
      ruleIsCalledAtWireTime: false,
    },
    { fn: "startLimitResumeMonitor", keys: ["getAgentId", "log"], agentId },
    { fn: "startWaitResumeMonitor", keys: ["getAgentId", "log"], agentId },
  ],
  logLines: ["[local] probe-line"],
  stateGetterCallsDuringArm: 2,
  returnedKeys: RETURNED_KEYS,
  returned: RETURNED,
})

const STANDING: readonly { readonly vector: string; readonly standing: unknown }[] = [
  { vector: "live-seat", standing: standingFor("agent-alpha", "walton", "/home/walton/.claude/logs/alpha", "rule-A") },
  { vector: "no-agent-id-yet", standing: standingFor(null, "walton", "/home/walton/.claude/logs/boot", "rule-B") },
  { vector: "second-account", standing: standingFor("agent-beta", "walton-two", "/var/tmp/logs/beta", "rule-C") },
  { vector: "empty-strings", standing: standingFor("", "", "", "rule-D") },
]

const STANDING_EXPORTS = ["startPerAgentMonitors"]

interface Driven {
  readonly exports: readonly string[]
  readonly vectors: readonly (Record<string, unknown> & { readonly vector: string })[]
}

function drivePorted(): Answer<Driven> {
  mkdirSync(ARM_DIR, { recursive: true })
  writeFileSync(DRIVER, DRIVER_SOURCE)

  const run = Bun.spawnSync({
    cmd: [process.execPath, DRIVER, PORTED, LIB_DIR],
    stdout: "pipe",
    stderr: "pipe",
    timeout: 120_000,
  })

  const stderr = run.stderr.toString()
  if (run.exitCode !== 0) {
    return { value: { exports: [], vectors: [] }, notice: `the driver exited ${run.exitCode}: ${stderr.trim()}` }
  }
  const stdout = run.stdout.toString()
  const line = stdout.trim().split("\n").at(-1) ?? ""
  try {
    return { value: JSON.parse(line) as Driven, notice: null }
  } catch {
    return { value: { exports: [], vectors: [] }, notice: `the driver printed no answer: ${stdout.trim()}` }
  }
}

describe("supervisor-monitors-wire — the wiring the code repository recorded", () => {
  const answer = drivePorted()

  it("reached the ported implementation rather than degrading", () => {
    expect(() => decided("ported", answer)).not.toThrow()
  })

  it("presents the same exports the standing module presented", () => {
    const driven = decided("ported", answer)
    expect(hold("exports", STANDING_EXPORTS, driven.exports).matches).toBe(true)
  })

  for (const { vector, standing } of STANDING) {
    it(`wires ${vector} exactly as the standing implementation did`, () => {
      const driven = decided("ported", answer)
      const found = driven.vectors.find((one) => one.vector === vector)
      expect(found).toBeDefined()

      const { vector: _label, ...ported } = found as Record<string, unknown> & { vector: string }
      const verdict = hold(vector, standing, ported)
      expect(verdict.ported).toBe(verdict.standing)
    })
  }

  it("holds the whole recording as one answer", () => {
    const driven = decided("ported", answer)
    const whole = {
      exports: STANDING_EXPORTS,
      vectors: STANDING.map((one) => ({ vector: one.vector, ...(one.standing as object) })),
    }
    expect(hold("whole-recording", whole, driven).matches).toBe(true)
  })
})
