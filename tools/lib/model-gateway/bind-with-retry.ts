const BIND_RETRY_BUDGET_MS = 1_000
const BIND_RETRY_INTERVAL_MS = 50

function isEAddrInUse(err: unknown): boolean {
  if (!(err instanceof Error)) return false
  if ("code" in err && err.code === "EADDRINUSE") return true
  return /EADDRINUSE/i.test(err.message)
}

export function bindWithRetry<T>(requestedPort: number, logPrefix: string, attempt: () => T): T {
  const deadline = Date.now() + BIND_RETRY_BUDGET_MS
  while (true) {
    try {
      return attempt()
    } catch (err) {
      if (requestedPort !== 0 && isEAddrInUse(err)) {
        if (Date.now() < deadline) {
          console.error(`${logPrefix} bind to port ${requestedPort} hit EADDRINUSE; retrying`)
          Bun.sleepSync(BIND_RETRY_INTERVAL_MS)
          continue
        }
        console.error(
          `${logPrefix} bind to port ${requestedPort} failed after ${BIND_RETRY_BUDGET_MS}ms — giving up`
        )
      }
      throw err
    }
  }
}
