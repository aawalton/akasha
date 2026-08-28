import type { OAuthCredential } from "../oauth-types.ts"
import type { Forward } from "./forward.ts"
import type { ObserverSlot } from "./observer-slot.ts"
import { withTransportRetry } from "./retry.ts"
import {
  classifyServerError,
  OVERLOADED_STATUS,
  SERVER_ERROR_BACKOFF_MS,
  serverErrorBackoffMs,
} from "./server-error.ts"

export type ServerErrorRetryOutcome =
  | { kind: "resolved"; res: Response }
  | { kind: "passthrough"; response: Response }

export type ServerErrorRetryArgs = {
  res: Response
  req: Request
  currentAccount: string
  currentCred: OAuthCredential
  bodyBuffer: ArrayBuffer | null
  observerSlot: ObserverSlot
  trail: readonly string[]
  method: string
  pathname: string
  logPrefix: string
  forward: Forward
  schedule?: readonly number[]
  sleep?: (ms: number) => Promise<void>
}

function defaultSleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function attemptServerErrorRetry(
  args: ServerErrorRetryArgs
): Promise<ServerErrorRetryOutcome> {
  const {
    res,
    req,
    currentAccount,
    currentCred,
    bodyBuffer,
    observerSlot,
    trail,
    method,
    pathname,
    logPrefix,
    forward,
  } = args
  const schedule = args.schedule ?? SERVER_ERROR_BACKOFF_MS
  const sleep = args.sleep ?? defaultSleep

  let peeked = await peekServerError(res)
  if (!peeked.matched) return { kind: "resolved", res: peeked.res }

  for (let attempt = 0; attempt < schedule.length; attempt++) {
    const wait = serverErrorBackoffMs({
      retryAfterHeader: peeked.retryAfterHeader,
      attempt,
      schedule,
    })
    console.log(
      `${logPrefix} ${peeked.status}/server-error observed account=${currentAccount} class=server-error; retry ${attempt + 1}/${schedule.length} after ${wait}ms reason=${peeked.reason}`
    )
    await sleep(wait)

    const retried = await withTransportRetry(
      () => forward(req, currentCred.accessToken, bodyBuffer, currentAccount, observerSlot),
      logPrefix,
      `${currentAccount} ${pathname} server-error-retry`
    )

    if (!mayBeServerError(retried.status)) {
      return { kind: "resolved", res: retried }
    }
    const nextPeek = await peekServerError(retried)
    if (!nextPeek.matched) return { kind: "resolved", res: nextPeek.res }
    peeked = nextPeek
  }

  console.error(
    `${logPrefix} upstream-terminal-error ${method} ${pathname} account=${trail.join("→")} status=${peeked.status} server-error=persistent-after-${schedule.length}-retries reason=${peeked.reason}`
  )
  return { kind: "passthrough", response: peeked.rebuild() }
}

function mayBeServerError(status: number): boolean {
  return (
    status === 429 ||
    status === OVERLOADED_STATUS ||
    status === 500 ||
    status === 502 ||
    status === 503
  )
}

type ServerErrorPeek =
  | { matched: false; res: Response }
  | {
      matched: true
      status: number
      reason: string
      retryAfterHeader: string | null
      rebuild: () => Response
    }

async function peekServerError(res: Response): Promise<ServerErrorPeek> {
  const status = res.status
  const headers = res.headers
  const statusText = res.statusText
  const bodyText = await res.text()
  const classification = classifyServerError(status, bodyText)
  if (!classification.matched) {
    return {
      matched: false,
      res: new Response(bodyText, { status, statusText, headers }),
    }
  }
  return {
    matched: true,
    status,
    reason: classification.reason,
    retryAfterHeader: headers.get("retry-after"),
    rebuild: () => new Response(bodyText, { status, statusText, headers }),
  }
}
