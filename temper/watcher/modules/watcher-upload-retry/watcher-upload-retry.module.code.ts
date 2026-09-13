const DEFAULT_MAX_ATTEMPTS = 5
const DEFAULT_BASE_DELAY_MS = 500
const DEFAULT_MAX_DELAY_MS = 4000

export interface UploadRetryOptions {
  maxAttempts?: number
  baseDelayMs?: number
  maxDelayMs?: number
  sleep?: (ms: number) => Promise<void>
  random?: () => number
}

function defaultSleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function isRetryableUploadError(err: unknown): boolean {
  if (!(err instanceof Error)) return false
  return /statement timeout|\b57014\b|\bHTTP 50[234]\b/i.test(err.message)
}

export async function withUploadRetry<T>(
  op: () => Promise<T>,
  options: UploadRetryOptions = {}
): Promise<T> {
  const maxAttempts = options.maxAttempts ?? DEFAULT_MAX_ATTEMPTS
  const baseDelayMs = options.baseDelayMs ?? DEFAULT_BASE_DELAY_MS
  const maxDelayMs = options.maxDelayMs ?? DEFAULT_MAX_DELAY_MS
  const sleep = options.sleep ?? defaultSleep
  const random = options.random ?? Math.random

  for (let attempt = 1; ; attempt++) {
    try {
      return await op()
    } catch (err) {
      if (attempt >= maxAttempts || !isRetryableUploadError(err)) throw err
      const ceiling = Math.min(baseDelayMs * 2 ** (attempt - 1), maxDelayMs)
      await sleep(random() * ceiling)
    }
  }
}
