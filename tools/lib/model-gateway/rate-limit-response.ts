import type { PoolSummary } from "../oauth-selection.ts"

export const DEFAULT_RETRY_AFTER_SECONDS = 60

export const MIN_RETRY_AFTER_SECONDS = 1

export type RateLimitErrorBody = {
  readonly type: "error"
  readonly error: { readonly type: "rate_limit_error"; readonly message: string }
}

export type RateLimitErrorPayload = {
  readonly status: 429
  readonly body: RateLimitErrorBody
  readonly retryAfterSeconds: number
}

function retryAfterSeconds(summary: PoolSummary, now: number): number {
  const resetMs = summary.earliestEligibleResetMs
  if (resetMs == null || resetMs <= now) return DEFAULT_RETRY_AFTER_SECONDS
  return Math.max(MIN_RETRY_AFTER_SECONDS, Math.ceil((resetMs - now) / 1000))
}

export function buildRateLimitErrorPayload(
  summary: PoolSummary,
  now: number
): RateLimitErrorPayload {
  const secs = retryAfterSeconds(summary, now)
  const resetPhrase =
    summary.earliestEligibleResetMs == null
      ? "earliest reset unknown"
      : `earliest limit reset at ${new Date(summary.earliestEligibleResetMs).toISOString()}`
  const message =
    `All Claude accounts are at their usage limit ` +
    `(${summary.eligibleCount} of ${summary.totalCount} accounts currently eligible); ` +
    `${resetPhrase}. Retry after ${secs}s.`
  return {
    status: 429,
    body: { type: "error", error: { type: "rate_limit_error", message } },
    retryAfterSeconds: secs,
  }
}

export function rateLimitResponse(summary: PoolSummary, now: number): Response {
  const payload = buildRateLimitErrorPayload(summary, now)
  return new Response(JSON.stringify(payload.body), {
    status: payload.status,
    statusText: "Too Many Requests",
    headers: {
      "content-type": "application/json",
      "retry-after": String(payload.retryAfterSeconds),
    },
  })
}
