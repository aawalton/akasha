import { decideTurnEnd } from "../lib/turn-end-decide.ts"
import type {
  JudgeRead,
  OutboundRead,
  OutboundSignals,
  StateRead,
  TurnEndInputs,
  TurnEndPayload,
  TurnEndPlan,
} from "../lib/turn-end-plan.ts"

export const PARSED: Extract<TurnEndPayload, { kind: "parsed" }> = {
  kind: "parsed",
  stopHookActive: false,
  runningTasks: 0,
  transcript: { kind: "present", path: "/var/tmp/transcript.jsonl" },
}

export const TRANSCRIPT = "/var/tmp/transcript.jsonl"

export const decide = (at: TurnEndInputs): TurnEndPlan => decideTurnEnd(at)

export function inputs(over: Partial<TurnEndInputs> = {}): TurnEndInputs {
  return {
    agentId: "019ff0d6-f877-798e-bad3-c05580d9d7f7",
    mode: "headless",
    onCall: false,
    dispatched: [],
    handedBack: false,
    payload: PARSED,
    reminders: 0,
    outbound: { kind: "unread" },
    inbound: { kind: "unread" },
    judge: { kind: "unread" },
    ...over,
  }
}

export const STANDING: readonly string[] = [
  "project 18893",
  "task change-email-rules",
  "initiative rules-engine",
]

export function standing(count: number): readonly string[] {
  return STANDING.slice(0, count)
}

export function left(over: Partial<OutboundSignals> = {}): OutboundSignals {
  return {
    selfStopped: false,
    liveChildren: 0,
    openQuestions: 0,
    sent: { kind: "none-sent" },
    ...over,
  }
}

export function leftRead(over: Partial<OutboundSignals> = {}): OutboundRead {
  return { kind: "answered", signals: left(over) }
}

export const UNANSWERED_SEND: Partial<OutboundSignals> = {
  sent: { kind: "sent", atMs: 2_000 },
}

export function answered(verdict: string): StateRead {
  return { kind: "answered", verdict }
}

export function judged(status: number, feedback = "", settled = true): JudgeRead {
  return { kind: "answered", status, feedback, settled }
}

export function settled(plan: TurnEndPlan): {
  readonly reason: string
  readonly decision: string
  readonly mode: string
  readonly stops: number
} {
  if (plan.kind !== "settled") throw new Error(`expected a settled plan, got ${plan.kind}`)
  return {
    reason: plan.record.reason,
    decision: plan.record.decision,
    mode: plan.record.mode,
    stops: plan.actions.filter((one) => one.kind === "stop-seat").length,
  }
}

export function messageOf(plan: TurnEndPlan): string | null {
  if (plan.kind !== "settled") throw new Error(`expected a settled plan, got ${plan.kind}`)
  return plan.message
}
