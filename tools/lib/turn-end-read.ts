
import { readFileSync } from "node:fs"
import { readOwed } from "./owed-read.ts"
import { type PendingSignals, readPending } from "./pending-read.ts"
import { selfRemindersOf } from "./reminder-file.ts"
import { seatNameForAgent } from "./seat-presence-read.ts"
import type { OutboundSignals, StateRead, TurnEndPayload } from "./turn-end-plan.ts"

const PATIENCE_MS = 3_000

const NOTHING_LEFT: OutboundSignals = {
  selfStopped: false,
  liveChildren: 0,
  openQuestions: 0,
  sent: { kind: "none-sent" },
}

function withinPatience(work: Promise<PendingSignals>): Promise<PendingSignals | null> {
  let timer: ReturnType<typeof setTimeout> | undefined
  const guarded = work.catch(() => null)
  const patience = new Promise<null>((settle) => {
    timer = setTimeout(() => settle(null), PATIENCE_MS)
  })
  return Promise.race([guarded, patience]).then((got) => {
    if (timer !== undefined) clearTimeout(timer)
    return got
  })
}

export async function outboundRead(agent: string): Promise<OutboundSignals> {
  const said = await withinPatience(readPending(agent))
  if (said === null) return NOTHING_LEFT
  return {
    selfStopped: said.selfStopped,
    liveChildren: said.liveChildren,
    openQuestions: said.openQuestions,
    sent: said.outbound,
  }
}

export function heldRead(agent: string): StateRead {
  try {
    return { kind: "answered", verdict: readOwed(agent) }
  } catch {
    return { kind: "unavailable" }
  }
}

export function remindersRead(agent: string): number {
  const seat = seatNameForAgent(agent)
  return seat === null ? 0 : selfRemindersOf(seat).length
}

export function payloadFrom(raw: string): TurnEndPayload {
  if (raw.trim() === "") {
    return {
      kind: "parsed",
      stopHookActive: false,
      runningTasks: 0,
      transcript: { kind: "missing" },
    }
  }
  let said: Record<string, unknown>
  try {
    said = JSON.parse(raw) as Record<string, unknown>
  } catch {
    return { kind: "unparseable" }
  }
  const tasks = Array.isArray(said.background_tasks) ? said.background_tasks : []
  const running = tasks.filter(
    (one) =>
      one !== null && typeof one === "object" && (one as Record<string, unknown>).status === "running"
  ).length
  const path = typeof said.transcript_path === "string" ? said.transcript_path : ""
  return {
    kind: "parsed",
    stopHookActive: said.stop_hook_active === true,
    runningTasks: running,
    transcript: path === "" ? { kind: "missing" } : { kind: "present", path },
  }
}

export function stdinText(): string {
  try {
    return readFileSync(0, "utf8")
  } catch {
    return ""
  }
}
