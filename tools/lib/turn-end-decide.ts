
import type { SeatModeClaim } from "./turn-end-reasons.ts"
import type {
  JudgeRead,
  StateRead,
  TranscriptRead,
  TurnEndAction,
  TurnEndInputs,
  TurnEndPlan,
} from "./turn-end-plan.ts"
import { NO_TURN_START_SOURCE, NOTHING_SAID } from "./turn-end-refusals.ts"
import { TURN_PENDING_COMPONENTS, type TurnPendingComponent } from "./seat-turn-pending.ts"

const BUN_EXIT_LINE = /^error: "ops" exited with code .*$/gm

export function modeClaimOf(mode: string | null): SeatModeClaim {
  if (mode === "interactive") return "interactive"
  if (mode === "headless") return "headless"
  return "unknown"
}

function allow(
  reason: string,
  mode: SeatModeClaim,
  actions: readonly TurnEndAction[] = []
): TurnEndPlan {
  return { kind: "settled", record: { decision: "allow", reason, mode }, exitCode: 0, actions, message: null }
}

function refuse(reason: string, mode: SeatModeClaim, message: string): TurnEndPlan {
  const said = message.endsWith("\n") ? message : `${message}\n`
  return { kind: "settled", record: { decision: "block", reason, mode }, exitCode: 2, actions: [], message: said }
}

export const TURN_PENDING_SOURCES = [...TURN_PENDING_COMPONENTS, "none"] as const

export type TurnPendingSource = (typeof TURN_PENDING_SOURCES)[number]

export function turnPendingFrom(from: TurnEndInputs): Record<TurnPendingComponent, boolean> {
  const payload = from.payload
  const parsed = payload.kind === "parsed" ? payload : null
  const left = from.outbound.kind === "answered" ? from.outbound.signals : null
  return {
    "running-task": parsed !== null && parsed.runningTasks !== 0,
    "live-child": left !== null && left.liveChildren > 0,
    "open-question": left !== null && left.openQuestions > 0,
    "send-in-flight": left !== null && left.sent.kind === "sent",
    owed: !from.handedBack && from.inbound.kind === "answered" && from.inbound.verdict === "owed",
  }
}

export function turnPendingSourceFrom(from: TurnEndInputs): TurnPendingSource {
  const pending = turnPendingFrom(from)
  return TURN_PENDING_COMPONENTS.find((one) => pending[one]) ?? "none"
}

function startArmed(from: TurnEndInputs): boolean {
  if (from.reminders > 0) return true
  return from.payload.kind === "parsed" && from.payload.runningTasks !== 0
}

function workComplete(inbound: StateRead): boolean {
  return inbound.kind === "answered" && inbound.verdict === "work-complete"
}

export function decideTurnEnd(from: TurnEndInputs): TurnEndPlan {
  const mode = modeClaimOf(from.mode)

  if (from.agentId === null || from.agentId === "") return allow("no-agent-id", mode)
  if (from.payload.kind === "unparseable") return allow("unparseable-payload", mode)
  if (from.payload.stopHookActive) return allow("continuation", mode)

  if (!startArmed(from)) {
    if (from.outbound.kind === "unread") return { kind: "needs-read", verb: "pending" }
    if (from.outbound.signals.selfStopped) return allow("stopped", mode)
    if (from.inbound.kind === "unread") return { kind: "needs-read", verb: "owed" }
  }

  const source = turnPendingSourceFrom(from)
  const pending = source !== "none"
  if (from.onCall) return read(from, mode, pending)
  const stops: readonly TurnEndAction[] = from.mode === null ? [] : [{ kind: "stop-seat" }]
  if (from.handedBack) {
    if (from.outbound.kind === "unread") return { kind: "needs-read", verb: "pending" }
    if (from.outbound.signals.liveChildren === 0) return allow("handed-back", mode, stops)
  }
  if (from.inbound.kind === "unavailable") return allow("owed-unavailable", mode)
  if (!pending && workComplete(from.inbound)) return allow("work-complete", mode, stops)
  if (from.dispatched.length > 0 && !pending) return refuse("dispatch-unfinished", mode, NO_TURN_START_SOURCE)
  if (pending) return allow("pending", mode)
  return allow("nothing-dispatched", mode, stops)
}

function read(from: TurnEndInputs, mode: SeatModeClaim, pending: boolean): TurnEndPlan {
  const payload = from.payload
  if (payload.kind !== "parsed") return allow("unparseable-payload", mode)
  if (payload.transcript.kind === "missing") return allow("no-transcript", mode)
  if (from.judge.kind === "unavailable") return allow("verb-unavailable", mode)
  if (from.judge.kind === "unread") {
    return { kind: "needs-judge", transcript: payload.transcript.path, pending: pending }
  }
  if (from.judge.status === 124) return allow("judge-timeout", mode)
  if (from.judge.status === 0)
    return allow(from.judge.settled ? "judged-legal" : "reading-unsettled", mode)
  if (from.judge.status !== 3) return allow("verb-unavailable", mode)
  const said = from.judge.feedback.replace(BUN_EXIT_LINE, "").trim()
  return refuse("judged", mode, said === "" ? NOTHING_SAID(from.dispatched) : `${said}\n`)
}
