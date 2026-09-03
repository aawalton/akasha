import { pidAliveOrRefuse } from "@akasha/utils-process/pid-signal"
import { readProxyState } from "../seat-proxy-state.ts"
import { seatsPresent } from "../seat-roster.ts"

export interface LiveProxySeat {
  agentId: string
  name: string | null
  runningVersion: string
}

export interface ProxySeatAgent {
  readonly id: string
  readonly name: string | null
  readonly activeAtMs: number
}

export interface ProxySeatState {
  readonly pid: number
  readonly oauthProxyVersion: string
}

export function shapeProxySeatAgents(seats: readonly ProxySeatAgent[]): ProxySeatAgent[] {
  const shaped = [...seats]
  shaped.sort((a, b) => b.activeAtMs - a.activeAtMs || a.id.localeCompare(b.id))
  return shaped
}

export function listProxySeatAgents(): ProxySeatAgent[] {
  return shapeProxySeatAgents(
    seatsPresent().map((seat) => ({
      id: seat.id,
      name: seat.name,
      activeAtMs: seat.activeAtMs,
    }))
  )
}

export function assembleLiveProxySeats(
  agents: readonly ProxySeatAgent[],
  readState: (agentId: string) => ProxySeatState | null,
  alive: (pid: number) => boolean
): LiveProxySeat[] {
  const seats: LiveProxySeat[] = []
  for (const agent of agents) {
    const state = readState(agent.id)
    if (state == null || !alive(state.pid)) continue
    seats.push({
      agentId: agent.id,
      name: agent.name,
      runningVersion: state.oauthProxyVersion,
    })
  }
  return seats
}

export function resolveLiveProxySeats(): LiveProxySeat[] {
  return assembleLiveProxySeats(listProxySeatAgents(), readProxyState, pidAliveOrRefuse)
}
