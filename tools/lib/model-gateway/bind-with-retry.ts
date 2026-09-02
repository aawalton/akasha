// THIS BUDGET OUTLASTS THE WAIT A RESPAWN GIVES THE GATEWAY IT IS REPLACING. A respawn stops the
// old gateway, waits STALE_PROXY_SHUTDOWN_BUDGET_MS (5s) for its pid to go, and then starts a fresh
// one on the same port. A busy gateway does not always exit inside that wait, so the fresh one can
// arrive while the port is still held — by the very process the respawn just killed. At one second
// it lost that race and died, leaving the seat with no gateway at all and its client reporting
// FailedToOpenSocket. Anything under the shutdown budget makes the respawn able to lose to itself.
const BIND_RETRY_BUDGET_MS = 15_000
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
