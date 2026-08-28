import { AnthropicErrorEnvelopeSchema } from "../oauth-schemas.ts"

export const OVERLOADED_ERROR_TYPE = "overloaded_error"

export const OVERLOADED_STATUS = 529

export const SERVER_ERROR_BACKOFF_MS = [1000, 2000, 4000] as const

export const MAX_RETRY_AFTER_MS = 8000

const SERVER_ERROR_REASON: Readonly<Record<number, string>> = {
  500: "internal server error (500)",
  502: "bad gateway (502)",
  503: "service unavailable (503)",
}

export type ServerErrorClassification = { matched: false } | { matched: true; reason: string }

export function isServerError(status: number, body: string): boolean {
  return classifyServerError(status, body).matched
}

export function classifyServerError(status: number, body: string): ServerErrorClassification {
  if (status === OVERLOADED_STATUS) {
    const envelopeMessage = parseEnvelopeMessage(body)
    return { matched: true, reason: envelopeMessage ?? "overloaded (529)" }
  }
  const serverErrorReason = SERVER_ERROR_REASON[status]
  if (serverErrorReason != null) {
    const envelopeMessage = parseEnvelopeMessage(body)
    return { matched: true, reason: envelopeMessage ?? serverErrorReason }
  }
  if (status !== 429) return { matched: false }
  let parsed: ReturnType<typeof AnthropicErrorEnvelopeSchema.safeParse>
  try {
    parsed = AnthropicErrorEnvelopeSchema.safeParse(JSON.parse(body))
  } catch {
    return { matched: false }
  }
  if (!parsed.success) return { matched: false }
  if (parsed.data.error.type !== OVERLOADED_ERROR_TYPE) return { matched: false }
  const reason = parsed.data.error.message ?? OVERLOADED_ERROR_TYPE
  return { matched: true, reason }
}

function parseEnvelopeMessage(body: string): string | null {
  let parsed: ReturnType<typeof AnthropicErrorEnvelopeSchema.safeParse>
  try {
    parsed = AnthropicErrorEnvelopeSchema.safeParse(JSON.parse(body))
  } catch {
    return null
  }
  if (!parsed.success) return null
  return parsed.data.error.message ?? null
}

export function serverErrorBackoffMs(args: {
  retryAfterHeader: string | null
  attempt: number
  schedule: readonly number[]
}): number {
  const retryAfterMs = parseRetryAfterMs(args.retryAfterHeader)
  if (retryAfterMs != null) return Math.min(retryAfterMs, MAX_RETRY_AFTER_MS)
  const { schedule, attempt } = args
  if (schedule.length === 0) return 0
  return schedule[Math.min(attempt, schedule.length - 1)] ?? 0
}

function parseRetryAfterMs(header: string | null): number | null {
  if (header == null || header.trim() === "") return null
  const seconds = Number(header)
  if (!Number.isFinite(seconds) || seconds <= 0) return null
  return seconds * 1000
}
