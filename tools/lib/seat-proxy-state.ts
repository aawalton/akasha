import { seatNameForAgent, seatPageDestination } from "./seat-presence-read.ts"
import { formatSeatProcKey, parseSeatProcKey, readProcStartTicks } from "./seat-proc-key.ts"
import { readUncommitted } from "../../page/uncommitted/uncommitted.ts"
import { akashaObservedOf } from "./seat-akasha-read.ts"
import { keepBeside } from "./seat-beside.ts"

export interface OAuthProxyStateToWrite {
  readonly pid: number
  readonly port: number
  readonly oauthProxyVersion: string
}

export interface OAuthProxyState extends OAuthProxyStateToWrite {
  readonly supervisorPid?: number
}

// BOTH STORES, THE OLD ONE WINNING KEY BY KEY. A proxy is cleared by writing null rather than by
// dropping it, so a null the old store holds must beat whatever akasha still carries. What akasha
// alone holds is a seat whose old page has gone.
function observedOf(agentId: string): Record<string, unknown> | null {
  const seatName = seatNameForAgent(agentId)
  const held = seatName === null ? null : readUncommitted(seatPageDestination(seatName))
  const also = akashaObservedOf(agentId)
  if (also === null) return held
  return held === null ? also : { ...also, ...held }
}

export function readProxyState(agentId: string): OAuthProxyState | null {
  const held = observedOf(agentId)
  if (held === null) return null
  const proc = parseSeatProcKey(String(held["proxy-process"] ?? ""))
  const port = held["proxy-port"]
  const version = held["proxy-version"]
  if (proc === null) return null
  if (typeof port !== "number" || typeof version !== "string" || version === "") return null
  const owner = parseSeatProcKey(String(held["supervisor-process"] ?? ""))
  return {
    pid: proc.pid,
    port,
    oauthProxyVersion: version,
    ...(owner === null ? {} : { supervisorPid: owner.pid }),
  }
}


export function writeProxyState(agentId: string, state: OAuthProxyStateToWrite): undefined {
  const seatName = seatNameForAgent(agentId)
  if (seatName === null) return
  const startTicks = readProcStartTicks(state.pid)
  keepBeside(seatPageDestination(seatName), {
    "proxy-process": startTicks === null ? null : formatSeatProcKey({ pid: state.pid, startTicks }),
    "proxy-port": state.port,
    "proxy-version": state.oauthProxyVersion,
  })
}

export function clearProxyState(agentId: string): undefined {
  const seatName = seatNameForAgent(agentId)
  if (seatName === null) return
  keepBeside(seatPageDestination(seatName), {
    "proxy-process": null,
    "proxy-port": null,
    "proxy-version": null,
  })
}

export function writeProxyStateQuietly(agentId: string, state: OAuthProxyStateToWrite): undefined {
  try {
    writeProxyState(agentId, state)
  } catch (err) {
    console.error(`[oauth-proxy] writing proxy state to the seat failed for ${agentId}:`, err)
  }
}
