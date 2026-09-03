import {
  formatSeatProcKey,
  parseSeatProcKey,
  readProcStartTicks,
} from "@akasha/seat-system/seat-proc-key"
import { akashaObservedOf } from "./seat-akasha-read.ts"
import { keepBeside } from "./seat-beside.ts"
import { seatNameForAgent } from "./seat-presence-read.ts"

export interface OAuthProxyStateToWrite {
  readonly pid: number
  readonly port: number
  readonly oauthProxyVersion: string
}

export interface OAuthProxyState extends OAuthProxyStateToWrite {
  readonly supervisorPid?: number
}

// AKASHA ALONE. This laid the old sidecar over the top so that a null it held would beat whatever
// akasha still carried, a proxy being cleared by writing null rather than by dropping the key.
//
// Akasha is written that null too, and `akashaObservedOf` leaves a null out rather than carrying it
// through — so a cleared proxy arrives here as a key that is not there instead of a key that is
// null. Every reader below already treats the two the same: an absent process key and a null one
// both fail to parse, which is what says there is no proxy.
function observedOf(agentId: string): Record<string, unknown> | null {
  return akashaObservedOf(agentId)
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
  keepBeside(seatName, {
    "proxy-process": startTicks === null ? null : formatSeatProcKey({ pid: state.pid, startTicks }),
    "proxy-port": state.port,
    "proxy-version": state.oauthProxyVersion,
  })
}

export function clearProxyState(agentId: string): undefined {
  const seatName = seatNameForAgent(agentId)
  if (seatName === null) return
  keepBeside(seatName, {
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
