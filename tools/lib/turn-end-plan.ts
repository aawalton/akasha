
import type { OutboundRecency } from "./pending-decide.ts"
import type { SeatModeClaim, TurnEndReason } from "./turn-end-reasons.ts"

export const PENDING_COMMANDS = ["pending", "owed"] as const

export type PendingCommand = (typeof PENDING_COMMANDS)[number]

export type TranscriptRead = { readonly kind: "missing" } | { readonly kind: "present"; readonly path: string }

export type TurnEndPayload =
  | { readonly kind: "unparseable" }
  | {
      readonly kind: "parsed"
      readonly stopHookActive: boolean
      readonly runningTasks: number
      readonly transcript: TranscriptRead
    }

export interface OutboundSignals {
  readonly selfStopped: boolean
  readonly liveChildren: number
  readonly openQuestions: number
  readonly sent: OutboundRecency
}

export type OutboundRead =
  | { readonly kind: "unread" }
  | { readonly kind: "answered"; readonly signals: OutboundSignals }

export type StateRead =
  | { readonly kind: "unread" }
  | { readonly kind: "unavailable" }
  | { readonly kind: "answered"; readonly verdict: string }

export type JudgeRead =
  | { readonly kind: "unread" }
  | { readonly kind: "unavailable" }
  | {
      readonly kind: "answered"
      readonly status: number
      readonly feedback: string
      readonly settled: boolean
    }

export interface TurnEndInputs {
  readonly agentId: string | null
  readonly mode: string | null
  readonly onCall: boolean
  readonly dispatched: readonly string[]
  readonly handedBack: boolean
  readonly payload: TurnEndPayload
  readonly reminders: number
  readonly outbound: OutboundRead
  readonly inbound: StateRead
  readonly judge: JudgeRead
}

export type TurnEndAction = { readonly kind: "stop-seat" }

export interface TurnEndRecordDraft {
  readonly decision: "allow" | "block"
  readonly reason: string
  readonly mode: SeatModeClaim
}

export type TurnEndPlan =
  | {
      readonly kind: "settled"
      readonly record: TurnEndRecordDraft
      readonly exitCode: 0 | 2
      readonly actions: readonly TurnEndAction[]
      readonly message: string | null
    }
  | { readonly kind: "needs-read"; readonly verb: PendingCommand }
  | { readonly kind: "needs-judge"; readonly transcript: string; readonly pending: boolean }
