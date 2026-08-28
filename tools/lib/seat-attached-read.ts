import { spawnSync } from "node:child_process"

const TTL_MS = 2000

const LIST = ["tmux", "list-clients", "-F", "#{client_session}"]

let last: { readonly at: number; readonly sessions: ReadonlySet<string> | null } | null = null

function readAttached(): ReadonlySet<string> | null {
  let out: string
  try {
    const ran = spawnSync("tmux", LIST.slice(1), { stdio: ["ignore", "pipe", "ignore"] })
    if (ran.status !== 0) return null
    out = new TextDecoder().decode(ran.stdout ?? new Uint8Array())
  } catch {
    return null
  }
  const sessions = new Set<string>()
  for (const line of out.split("\n")) {
    const name = line.trim()
    if (name !== "") sessions.add(name)
  }
  return sessions
}

export function attachedSessions(): ReadonlySet<string> | null {
  const now = Date.now()
  if (last !== null && now - last.at < TTL_MS) return last.sessions
  last = { at: now, sessions: readAttached() }
  return last.sessions
}

export function seatIsAttached(seatName: string): boolean | null {
  const sessions = attachedSessions()
  return sessions === null ? null : sessions.has(seatName)
}
