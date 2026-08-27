
import { describe, expect, it } from "bun:test"
import type {
  ProxyLivenessState,
  ProxyLivenessVerdict,
} from "../lib/supervisor-proxy-liveness-rule.ts"
import {
  PROXY_LIVENESS_INTERVAL_MS,
  startProxyLivenessMonitor,
} from "../lib/supervisor-proxy-liveness.ts"
import type { SupervisorOAuthProxyHandle } from "../lib/supervisor-spawn-oauth-proxy.ts"
import {
  type Recording,
  STANDING_RECORDINGS,
  STANDING_WIRE,
} from "./supervisor-proxy-liveness-vectors.ts"

const realSetInterval = globalThis.setInterval
const realClearInterval = globalThis.clearInterval
const realSetTimeout = globalThis.setTimeout
const realLog = console.log
const realError = console.error

type Wire = { cb: () => void; ms: number; id: symbol }

let wire: Wire | null = null
function currentWire(): Wire | null {
  return wire
}
let clearedIds: symbol[] = []
let logs: string[] = []
let portNames: readonly (readonly [number, string])[] = []

function render(arg: unknown): string {
  const text =
    typeof arg === "string"
      ? arg
      : arg instanceof Error
        ? `${arg.name}: ${arg.message}`
        : String(arg)
  return portNames.reduce((acc, [port, name]) => acc.split(String(port)).join(name), text)
}

function patch(): undefined {
  // @ts-expect-error — the capture stands in for the platform's own signature.
  globalThis.setInterval = (cb: () => void, ms: number) => {
    const id = Symbol("interval")
    wire = { cb, ms, id }
    return id
  }
  // @ts-expect-error — same.
  globalThis.clearInterval = (id: symbol) => {
    clearedIds.push(id)
  }
  console.log = (...args: unknown[]) => {
    logs.push(`log|${args.map(render).join(" ")}`)
  }
  console.error = (...args: unknown[]) => {
    logs.push(`error|${args.map(render).join(" ")}`)
  }
}

function unpatch(): undefined {
  globalThis.setInterval = realSetInterval
  globalThis.clearInterval = realClearInterval
  console.log = realLog
  console.error = realError
}

const SETTLE_CEILING_MS = 5_000
const SETTLE_POLL_MS = 10
const SETTLE_STABLE_POLLS = 4

async function settle(scenario: string, counts: () => readonly number[]): Promise<undefined> {
  const started = Date.now()
  let previous = counts().join(",")
  let stable = 0
  while (Date.now() - started < SETTLE_CEILING_MS) {
    await new Promise((resolve) => realSetTimeout(resolve, SETTLE_POLL_MS))
    const now = counts().join(",")
    stable = now === previous ? stable + 1 : 0
    previous = now
    if (stable >= SETTLE_STABLE_POLLS) return
  }
  throw new Error(
    `${scenario}: the tick did not go quiet within ${SETTLE_CEILING_MS}ms — last counts ${previous}`
  )
}

function spellState(state: ProxyLivenessState | null): string {
  if (state == null) return "null"
  return `f=${state.consecutiveFailures},r=${state.consecutiveRespawns},g=${state.gaveUp}`
}

const LIVE_PID = process.pid
const DEAD_PID = 0x7fff_ffff

const NONE: ProxyLivenessVerdict = { state: null, action: "none" }
const RESPAWN: ProxyLivenessVerdict = { state: null, action: "respawn" }
const GIVE_UP: ProxyLivenessVerdict = { state: null, action: "give-up" }

function threaded(failures: number): ProxyLivenessVerdict {
  return {
    state: { consecutiveFailures: failures, consecutiveRespawns: 0, gaveUp: false },
    action: "none",
  }
}

let healthzHits = 0
let healthzStatus = 200
const server = Bun.serve({
  port: 0,
  fetch(req) {
    if (new URL(req.url).pathname === "/healthz") {
      healthzHits += 1
      return new Response("ok", { status: healthzStatus })
    }
    return new Response("no", { status: 404 })
  },
})
function boundPort(bound: { readonly port?: number }, what: string): number {
  const port = bound.port
  if (port == null) throw new Error(`${what}: the server bound no port`)
  return port
}

const HEALTHY_PORT = boundPort(server, "healthz server")

const doomed = Bun.serve({ port: 0, fetch: () => new Response("no") })
const CLOSED_PORT = boundPort(doomed, "the port given back")
doomed.stop(true)

portNames = [
  [HEALTHY_PORT, "<healthy-port>"],
  [CLOSED_PORT, "<closed-port>"],
]

function handleOf(pid: number, port: number): SupervisorOAuthProxyHandle {
  return {
    pid,
    port,
    socketPath: "/var/tmp/not-read-by-this-file.sock",
    adopted: false,
    stop: () => undefined,
  }
}

let intervalMs = -1
let stopClearedTheWiredTimer = false

async function run(
  scenario: string,
  opts: {
    handle: SupervisorOAuthProxyHandle | null
    agentId?: string | null
    verdicts: readonly ProxyLivenessVerdict[]
    throwOnHandle?: boolean
    status?: number
    overlap?: boolean
  }
): Promise<Recording> {
  const asks: { stateIn: string; healthy: boolean }[] = []
  logs = []
  clearedIds = []
  wire = null
  healthzHits = 0
  healthzStatus = opts.status ?? 200

  let call = 0
  let release: (() => void) | null = null

  patch()
  try {
    const monitor = startProxyLivenessMonitor({
      getProxyHandle: () => {
        if (opts.throwOnHandle === true) throw new Error("handle read blew up")
        return opts.handle
      },
      getAgentId: () => opts.agentId ?? null,
      registrationAccount: "alice",
      getLogDir: () => "/var/tmp",
      proxyLivenessRule: async (state, healthy) => {
        asks.push({ stateIn: spellState(state), healthy })
        const verdict = opts.verdicts[Math.min(call, opts.verdicts.length - 1)] ?? NONE
        call += 1
        if (opts.overlap === true && release === null) {
          await new Promise<void>((resolve) => {
            release = resolve
          })
        }
        return { value: verdict, notice: null }
      },
    })

    const captured = currentWire()
    if (captured === null) throw new Error(`${scenario}: nothing was wired`)
    intervalMs = captured.ms

    const counts = (): readonly number[] => [asks.length, logs.length, healthzHits]
    if (opts.overlap === true) {
      captured.cb()
      await settle(scenario, counts)
      captured.cb()
      await settle(scenario, counts)
      const held = release as (() => void) | null
      if (held === null) throw new Error(`${scenario}: the rule was never reached`)
      held()
      await settle(scenario, counts)
    } else {
      for (let i = 0; i < Math.max(opts.verdicts.length, 1); i += 1) {
        captured.cb()
        await settle(scenario, counts)
      }
    }

    monitor.stop()
    stopClearedTheWiredTimer = clearedIds.includes(captured.id)
  } finally {
    unpatch()
  }

  return { scenario, asks, logs, healthzHits }
}

const SCENARIOS: Record<string, () => Promise<Recording>> = {
  "no-handle-skips-the-tick": () =>
    run("no-handle-skips-the-tick", { handle: null, verdicts: [NONE] }),
  "live-pid-and-200-is-healthy": () =>
    run("live-pid-and-200-is-healthy", {
      handle: handleOf(LIVE_PID, HEALTHY_PORT),
      verdicts: [NONE],
    }),
  "live-pid-and-503-is-unhealthy": () =>
    run("live-pid-and-503-is-unhealthy", {
      handle: handleOf(LIVE_PID, HEALTHY_PORT),
      verdicts: [NONE],
      status: 503,
    }),
  "dead-pid-short-circuits-the-probe": () =>
    run("dead-pid-short-circuits-the-probe", {
      handle: handleOf(DEAD_PID, HEALTHY_PORT),
      verdicts: [NONE],
    }),
  "closed-port-is-unhealthy": () =>
    run("closed-port-is-unhealthy", {
      handle: handleOf(LIVE_PID, CLOSED_PORT),
      verdicts: [NONE],
    }),
  "give-up-logs-once-and-respawns-nothing": () =>
    run("give-up-logs-once-and-respawns-nothing", {
      handle: handleOf(LIVE_PID, HEALTHY_PORT),
      verdicts: [GIVE_UP],
      status: 503,
    }),
  "respawn-without-an-agent-id-is-skipped": () =>
    run("respawn-without-an-agent-id-is-skipped", {
      handle: handleOf(LIVE_PID, HEALTHY_PORT),
      verdicts: [RESPAWN],
      agentId: null,
      status: 503,
    }),
  "the-state-threads-into-the-next-tick": () =>
    run("the-state-threads-into-the-next-tick", {
      handle: handleOf(LIVE_PID, HEALTHY_PORT),
      verdicts: [threaded(1), threaded(2), threaded(3)],
      status: 503,
    }),
  "an-overlapping-tick-is-dropped": () =>
    run("an-overlapping-tick-is-dropped", {
      handle: handleOf(LIVE_PID, HEALTHY_PORT),
      verdicts: [NONE, NONE],
      overlap: true,
    }),
  "a-throwing-handle-read-routes-to-guard-tick": () =>
    run("a-throwing-handle-read-routes-to-guard-tick", {
      handle: null,
      verdicts: [NONE],
      throwOnHandle: true,
    }),
}

describe("startProxyLivenessMonitor against what it answered before it moved", () => {
  for (const standing of STANDING_RECORDINGS) {
    it(`answers as recorded: ${standing.scenario}`, async () => {
      const drive = SCENARIOS[standing.scenario]
      if (drive === undefined) throw new Error(`no driver for ${standing.scenario}`)
      const ported = await drive()
      expect(ported).toEqual(standing as Recording)
    })
  }

  it("wires itself on the recorded interval and stops the timer it wired", async () => {
    await SCENARIOS["no-handle-skips-the-tick"]?.()
    const ported = {
      intervalMs,
      exportedIntervalMs: PROXY_LIVENESS_INTERVAL_MS,
      stopClearedTheWiredTimer,
    }
    expect(ported).toEqual(STANDING_WIRE as unknown as typeof ported)
    server.stop(true)
  })
})
