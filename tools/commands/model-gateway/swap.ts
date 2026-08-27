
export const summary = "Deliberately swap an agent's (or --fleet's) model gateway to current on-disk bytecode — the only swap path now that auto-swap is disarmed"

import type { CommandHelp } from "../../ops/surface.ts"
import { operationalError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { resolveLiveProxySeats } from "../../lib/model-gateway/proxy-seats.ts"
import { pidAliveOrRefuse } from "../../lib/pid-signal.ts"
import { readProxyState } from "../../lib/seat-proxy-state.ts"
import {
  describeAckTimeout,
  setRequestedAction,
  waitForActionCleared,
} from "../../lib/seat-action.ts"
import { resolveSeatTargetCli } from "../../lib/seat-handle.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--fleet",
      description: "Swap every live seat's gateway (staggered) instead of a single target",
    },
    { name: "--json", description: "Emit a structured JSON object instead of TSV" },
  ],
  positionals: [
    {
      name: "target",
      required: false,
      description: "Agent target (UUID/prefix/name); omit with --fleet",
    },
  ],
  examples: ["ops model-gateway swap awen", "ops model-gateway swap --fleet"],
}

const FLEET_STAGGER_MS = 1_000

const ACK_TIMEOUT_MS = 30_000

type SwapOutcome = "swapped" | "no-live-proxy" | "timeout"

interface ProxyStateReach {
  readonly readProxyState: (agentId: string) => { readonly pid: number } | null
  readonly pidAlive: (pid: number) => boolean
}

interface Reach {
  readonly proxyState: ProxyStateReach
}

async function swapOneSeat(agentId: string, reach: Reach): Promise<SwapOutcome> {
  const state = reach.proxyState.readProxyState(agentId)
  if (state == null || !reach.proxyState.pidAlive(state.pid)) return "no-live-proxy"
  await setRequestedAction(agentId, { action: "proxy_swap" })
  const outcome = await waitForActionCleared(agentId)
  return outcome.ok ? "swapped" : "timeout"
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function emit(status: SwapOutcome, agentId: string, json: boolean): undefined {
  if (json) {
    process.stdout.write(`${JSON.stringify({ ok: status !== "timeout", agentId, status })}\n`)
    return
  }
  process.stdout.write(`${status}\t${agentId}\n`)
}

async function runFleet(json: boolean, reach: Reach): Promise<void> {
  const live = resolveLiveProxySeats()
  const results: { agentId: string; status: SwapOutcome }[] = []
  for (const [i, seat] of live.entries()) {
    const status = await swapOneSeat(seat.agentId, reach)
    results.push({ agentId: seat.agentId, status })
    if (!json) emit(status, seat.agentId, false)
    if (i < live.length - 1) await sleep(FLEET_STAGGER_MS)
  }
  if (json) {
    process.stdout.write(
      `${JSON.stringify({ ok: results.every((r) => r.status !== "timeout"), seats: results })}\n`
    )
  }
}

export default async function modelGatewaySwap(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const json = parsed.boolean("--json")

  const reach: Reach = { proxyState: { readProxyState, pidAlive: pidAliveOrRefuse } }

  if (parsed.boolean("--fleet")) {
    await runFleet(json, reach)
    return
  }

  const target = parsed.positionals[0]
  if (target == null) {
    throw operationalError("model-gateway swap: provide an agent target or --fleet")
  }
  const agentId = await resolveSeatTargetCli(target)
  const status = await swapOneSeat(agentId, reach)
  if (status === "timeout") {
    throw operationalError(
      describeAckTimeout("proxy-swap", {
        agentId,
        timeoutMs: ACK_TIMEOUT_MS,
        lastRequestedAction: "proxy_swap",
        lastDispatchStatus: null,
      })
    )
  }
  emit(status, agentId, json)
}
