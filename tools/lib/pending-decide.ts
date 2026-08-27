
export const PENDING_VERDICTS = [
  "stopped",
  "live-child",
  "open-question",
  "awaiting-reply",
  "none",
] as const

export type PendingVerdict = (typeof PENDING_VERDICTS)[number]

export type OutboundRecency =
  | { readonly kind: "sent"; readonly atMs: number }
  | { readonly kind: "none-sent" }

export function pendingAllowsStopAlone(verdict: PendingVerdict): boolean {
  return verdict === "stopped" || verdict === "live-child" || verdict === "open-question"
}

export function decidePending(opts: {
  readonly selfStopped: boolean
  readonly liveChildren: number
  readonly openQuestions: number
  readonly outbound: OutboundRecency
}): PendingVerdict {
  if (opts.selfStopped) return "stopped"
  if (opts.liveChildren > 0) return "live-child"
  if (opts.openQuestions > 0) return "open-question"
  return opts.outbound.kind === "none-sent" ? "none" : "awaiting-reply"
}
