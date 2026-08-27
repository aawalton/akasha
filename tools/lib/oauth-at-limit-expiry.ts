
export const DEFAULT_AT_LIMIT_BACKOFF_MS = 5_000

export const MAX_AT_LIMIT_BACKOFF_MS = 5 * 3_600_000

type AtLimitExpiryArgs = {
  now: number
  retryAfterHeader: string | null
}

export function backoffExpiryMs(
  args: AtLimitExpiryArgs,
  defaultBackoffMs: number = DEFAULT_AT_LIMIT_BACKOFF_MS
): number {
  const retryAfterMs = parseRetryAfterMs(args.retryAfterHeader)
  if (retryAfterMs != null) return args.now + Math.min(retryAfterMs, MAX_AT_LIMIT_BACKOFF_MS)
  return args.now + defaultBackoffMs
}

function parseRetryAfterMs(header: string | null): number | null {
  if (header == null || header.trim() === "") return null
  const seconds = Number(header)
  if (!Number.isFinite(seconds) || seconds <= 0) return null
  return seconds * 1000
}
