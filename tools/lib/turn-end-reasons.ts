
export const TURN_END_REASONS = [
  "no-agent-id",
  "interactive-recorded",
  "interactive-launch",
  "not-interactive",
  "unparseable-payload",
  "continuation",
  "task-running",
  "reminder",
  "stopped",
  "live-child",
  "open-question",
  "owed",
  "owed-unavailable",
  "work-complete",
  "custodian-dead",
  "holder-dead",
  "own-act-next",
  "announce-sent",
  "awaiting-reply",
  "no-binding",
  "no-wake-source",
  "no-transcript",
  "verb-unavailable",
  "judge-timeout",
  "reading-unsettled",
  "judged-legal",
  "stall-refused",
  "headless-pending",
  "headless-unfinished",
  "headless-unassigned-idle",
  "headless-unassigned-waking",
  "interactive-pending",
  "judged",
  "interactive",
  "tool-wake",
  "command-wake",
  "dispatch-unfinished",
  "pending",
  "nothing-dispatched",
  "handed-back",
] as const

export type TurnEndReason = (typeof TURN_END_REASONS)[number]

export const RETIRED_HOLDER_DEAD_REASON = "custodian-dead"

export type TurnEndVerdict = "legitimate" | "halt" | "not-judged"

export const VERDICT_BY_REASON = {
  "no-agent-id": "not-judged",
  "interactive-recorded": "not-judged",
  "interactive-launch": "not-judged",
  "not-interactive": "not-judged",
  "unparseable-payload": "not-judged",
  continuation: "not-judged",
  "task-running": "legitimate",
  reminder: "legitimate",
  stopped: "legitimate",
  "live-child": "legitimate",
  "open-question": "legitimate",
  "owed": "legitimate",
  "owed-unavailable": "not-judged",
  "work-complete": "legitimate",
  "custodian-dead": "halt",
  "holder-dead": "halt",
  "own-act-next": "halt",
  "announce-sent": "legitimate",
  "awaiting-reply": "legitimate",
  "no-binding": "halt",
  "no-wake-source": "halt",
  "no-transcript": "not-judged",
  "verb-unavailable": "not-judged",
  "judge-timeout": "not-judged",
  "reading-unsettled": "not-judged",
  "judged-legal": "not-judged",
  "stall-refused": "not-judged",
  "headless-pending": "legitimate",
  "headless-unfinished": "halt",
  "headless-unassigned-idle": "legitimate",
  "headless-unassigned-waking": "legitimate",
  "interactive-pending": "legitimate",
  judged: "not-judged",
  interactive: "not-judged",
  "tool-wake": "legitimate",
  "command-wake": "legitimate",
  "dispatch-unfinished": "halt",
  "pending": "legitimate",
  "nothing-dispatched": "legitimate",
  "handed-back": "legitimate",
} as const satisfies Record<TurnEndReason, TurnEndVerdict>

export type OwedClaim = "held" | "not-held" | "unanswered"

export const OWED_BY_REASON = {
  "no-agent-id": "unanswered",
  "interactive-recorded": "unanswered",
  "interactive-launch": "unanswered",
  "not-interactive": "unanswered",
  "unparseable-payload": "unanswered",
  continuation: "unanswered",
  "task-running": "unanswered",
  reminder: "unanswered",
  stopped: "unanswered",
  "live-child": "unanswered",
  "open-question": "unanswered",
  "owed": "held",
  "owed-unavailable": "unanswered",
  "work-complete": "not-held",
  "custodian-dead": "not-held",
  "holder-dead": "not-held",
  "own-act-next": "not-held",
  "announce-sent": "not-held",
  "awaiting-reply": "not-held",
  "no-binding": "not-held",
  "no-wake-source": "unanswered",
  "no-transcript": "unanswered",
  "verb-unavailable": "unanswered",
  "judge-timeout": "unanswered",
  "reading-unsettled": "unanswered",
  "judged-legal": "unanswered",
  "stall-refused": "unanswered",
  "headless-pending": "unanswered",
  "headless-unfinished": "unanswered",
  "headless-unassigned-idle": "unanswered",
  "headless-unassigned-waking": "unanswered",
  "interactive-pending": "unanswered",
  judged: "unanswered",
  interactive: "unanswered",
  "tool-wake": "unanswered",
  "command-wake": "unanswered",
  "dispatch-unfinished": "unanswered",
  "pending": "unanswered",
  "nothing-dispatched": "unanswered",
  "handed-back": "held",
} as const satisfies Record<TurnEndReason, OwedClaim>

export type SeatModeClaim = "interactive" | "headless" | "unknown"

export function verdictOfReason(reason: string): TurnEndVerdict {
  return (VERDICT_BY_REASON as Record<string, TurnEndVerdict | undefined>)[reason] ?? "not-judged"
}

export function owedOfReason(reason: string): OwedClaim {
  return (OWED_BY_REASON as Record<string, OwedClaim | undefined>)[reason] ?? "unanswered"
}

export function modeOfReason(reason: string): SeatModeClaim {
  return (MODE_BY_REASON as Record<string, SeatModeClaim | undefined>)[reason] ?? "unknown"
}

export const MODE_BY_REASON = {
  "no-agent-id": "unknown",
  "interactive-recorded": "interactive",
  "interactive-launch": "interactive",
  interactive: "interactive",
  "not-interactive": "headless",
  "unparseable-payload": "unknown",
  continuation: "unknown",
  "no-transcript": "unknown",
  "task-running": "headless",
  reminder: "headless",
  stopped: "headless",
  "live-child": "headless",
  "open-question": "headless",
  "owed": "headless",
  "owed-unavailable": "unknown",
  "work-complete": "headless",
  "custodian-dead": "headless",
  "holder-dead": "headless",
  "own-act-next": "headless",
  "announce-sent": "headless",
  "awaiting-reply": "headless",
  "no-binding": "headless",
  "no-wake-source": "headless",
  "tool-wake": "headless",
  "command-wake": "headless",
  "verb-unavailable": "interactive",
  "judge-timeout": "interactive",
  "reading-unsettled": "interactive",
  "judged-legal": "interactive",
  "stall-refused": "interactive",
  "headless-pending": "headless",
  "headless-unfinished": "headless",
  "headless-unassigned-idle": "headless",
  "headless-unassigned-waking": "headless",
  "interactive-pending": "interactive",
  judged: "interactive",
  "dispatch-unfinished": "unknown",
  "pending": "unknown",
  "nothing-dispatched": "unknown",
  "handed-back": "unknown",
} as const satisfies Record<TurnEndReason, SeatModeClaim>

export type JudgingTurnEndReason = {
  [K in TurnEndReason]: (typeof VERDICT_BY_REASON)[K] extends "not-judged" ? never : K
}[TurnEndReason]

export const JUDGING_TURN_END_REASONS: readonly JudgingTurnEndReason[] = TURN_END_REASONS.filter(
  (reason): reason is JudgingTurnEndReason => VERDICT_BY_REASON[reason] !== "not-judged"
)
