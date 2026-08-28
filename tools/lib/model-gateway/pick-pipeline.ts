import { attemptAuthFailedRetry } from "./auth-failed-retry.ts"
import { classifyCapacity429 } from "./capacity-classification.ts"
import {
  isExtendedContextRequest,
  rewriteModelToStrippedSibling,
} from "./extended-context-fallback.ts"
import { isFableRequest } from "./fable-fallback.ts"
import { ANTHROPIC_BETA_HEADER, requestsFastMode, stripFastMode } from "./fast-mode-strip.ts"
import { attemptForcedToolChoiceRewrite } from "./forced-tool-choice-rewrite.ts"
import { attemptModelUnavailableRebind } from "./model-unavailable-rebind.ts"
import type { ObserverSlot } from "./observer-slot.ts"
import { attemptPermissionDeniedRebind } from "./permission-denied-rebind.ts"
import type { PickPipelineDeps, PickPipelineOutcome } from "./pick-pipeline-types.ts"
import { peek429 } from "./read-error-type-safely.ts"
import { withTransportRetry } from "./retry.ts"
import { attemptServerErrorRetry } from "./server-error-retry.ts"


export async function runPickPipeline(args: {
  req: Request
  observerSlot: ObserverSlot
  originalBody: ArrayBuffer | null
  method: string
  pathname: string
  deps: PickPipelineDeps
}): Promise<PickPipelineOutcome> {
  const { req, observerSlot, originalBody, method, pathname, deps } = args
  const { logPrefix, pickAccount, getFreshToken, forward, oauth } = deps

  const logRes = (account: string, status: number): undefined => {
    console.log(`${logPrefix} res ${method} ${pathname} account=${account} status=${status}`)
  }

  let bodyBuffer = originalBody
  let currentReq = req
  let fableMode = isFableRequest(bodyBuffer)

  const pickAccountName = async (exclude: ReadonlySet<string>): Promise<string | null> =>
    (await pickAccount(exclude))?.account ?? null

  const firstPick = await pickAccount()
  if (firstPick == null) {
    return { kind: "empty-pool", reason: "no-viable-account", trailDisplay: "-" }
  }
  const firstAccount = firstPick.account

  const firstCred = await getFreshToken(firstAccount)
  if (!firstCred) {
    const res = await forward(req, null, bodyBuffer, null, observerSlot)
    console.log(
      `${logPrefix} res ${method} ${pathname} account=- status=${res.status} fallthrough=no-fresh-token account-picked=${firstAccount}`
    )
    return { kind: "served", response: res }
  }

  const tried = new Set<string>()
  const trail: string[] = []
  const markedByReason = new Map<string, string>()
  let currentAccount = firstAccount
  let currentCred = firstCred
  const authRetried = new Set<string>()
  let toolChoiceRewriteAttempted = false
  let oneMFallbackAttempted = false
  let fastModeStripAttempted = false
  while (true) {
    tried.add(currentAccount)
    trail.push(currentAccount)
    let res: Response
    try {
      res = await withTransportRetry(
        () =>
          forward(currentReq, currentCred.accessToken, bodyBuffer, currentAccount, observerSlot),
        logPrefix,
        `${currentAccount} ${pathname}`
      )
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error(
        `${logPrefix} res ${method} ${pathname} account=${trail.join("→")} status=502 transport-error=${msg}`
      )
      return {
        kind: "served",
        response: new Response(null, { status: 502, statusText: "Bad Gateway" }),
      }
    }
    if (
      res.status === 429 ||
      res.status === 500 ||
      res.status === 502 ||
      res.status === 503 ||
      res.status === 529
    ) {
      const outcome = await attemptServerErrorRetry({
        res,
        req: currentReq,
        currentAccount,
        currentCred,
        bodyBuffer,
        observerSlot,
        trail,
        method,
        pathname,
        logPrefix,
        forward,
      })
      if (outcome.kind === "passthrough") return { kind: "served", response: outcome.response }
      res = outcome.res
    }
    if (res.status === 403) {
      const outcome = await attemptPermissionDeniedRebind({
        res,
        currentAccount,
        trail,
        tried,
        method,
        pathname,
        logPrefix,
        pickAccount: pickAccountName,
        getFreshToken,
        logRes,
        oauth,
      })
      if (outcome.kind === "response") return { kind: "served", response: outcome.response }
      currentAccount = outcome.account
      currentCred = outcome.cred
      continue
    }
    if (res.status === 400 && !toolChoiceRewriteAttempted) {
      toolChoiceRewriteAttempted = true
      const outcome = await attemptForcedToolChoiceRewrite({
        res,
        bodyBuffer,
        currentAccount,
        trail,
        method,
        pathname,
        logPrefix,
        logRes,
      })
      if (outcome.kind === "response") return { kind: "served", response: outcome.response }
      bodyBuffer = outcome.rewrittenBody
      continue
    }
    if (res.status === 404) {
      if (!oneMFallbackAttempted && bodyBuffer != null && isExtendedContextRequest(bodyBuffer)) {
        oneMFallbackAttempted = true
        const rewritten = rewriteModelToStrippedSibling(bodyBuffer)
        if (rewritten != null) {
          await res.body?.cancel()
          bodyBuffer = rewritten
          fableMode = isFableRequest(bodyBuffer)
          console.log(
            `${logPrefix} extended-context-fallback ${method} ${pathname} account=${currentAccount} — [1m] model_unavailable; downshifted to base sibling, replay same account`
          )
          continue
        }
      }
      const outcome = await attemptModelUnavailableRebind({
        res,
        currentAccount,
        trail,
        tried,
        method,
        pathname,
        logPrefix,
        markedByReason,
        pickAccount: pickAccountName,
        getFreshToken,
        logRes,
        oauth,
      })
      if (outcome.kind === "response") return { kind: "served", response: outcome.response }
      currentAccount = outcome.account
      currentCred = outcome.cred
      continue
    }
    if (res.status === 401 && !authRetried.has(currentAccount)) {
      authRetried.add(currentAccount)
      const outcome = await attemptAuthFailedRetry({
        res,
        currentAccount,
        currentToken: currentCred.accessToken,
        trail,
        method,
        pathname,
        logPrefix,
        getFreshToken,
      })
      if (outcome.kind === "response") return { kind: "served", response: outcome.response }
      currentCred = outcome.cred
      continue
    }
    if (res.status !== 429) {
      if (res.status >= 400) {
        console.error(
          `${logPrefix} upstream-terminal-error ${method} ${pathname} account=${trail.join("→")} status=${res.status}`
        )
      } else if (trail.length === 1) {
        logRes(currentAccount, res.status)
      } else {
        console.log(
          `${logPrefix} res ${method} ${pathname} account=${trail.join("→")} status=${res.status}`
        )
      }
      return { kind: "served", response: res }
    }

    const peeked = await peek429(res)
    const errorType = peeked.errorType
    const capacityClass = classifyCapacity429(res.headers, peeked.bodyText)
    console.log(
      `${logPrefix} 429 body account=${currentAccount} error.type=${errorType ?? "unknown"} capacity=${capacityClass.kind}${
        capacityClass.kind === "not-capacity" ? `/${capacityClass.signal}` : ""
      } (${capacityClass.reason})`
    )

    if (
      !fastModeStripAttempted &&
      requestsFastMode(bodyBuffer, currentReq.headers.get(ANTHROPIC_BETA_HEADER))
    ) {
      fastModeStripAttempted = true
      const strip = stripFastMode({ bodyBuffer, headers: currentReq.headers })
      if (strip != null) {
        console.log(
          `${logPrefix} fast-mode-strip ${method} ${pathname} account=${currentAccount} — 429 on a fast-mode request (capacity=${capacityClass.kind}); stripped speed+beta, replay same account before any mark`
        )
        bodyBuffer = strip.body
        currentReq = new Request(currentReq.url, {
          method: currentReq.method,
          headers: strip.headers,
        })
        continue
      }
    }

    if (capacityClass.kind === "not-capacity") {
      console.error(
        `${logPrefix} upstream-terminal-error ${method} ${pathname} account=${trail.join("→")} status=429 not-capacity=${capacityClass.reason}`
      )
      return { kind: "served", response: peeked.rebuild() }
    }

    if (fableMode) {
      console.log(`${logPrefix} 429 observed account=${currentAccount} class=fable; rebind`)
    } else {
      console.log(`${logPrefix} 429 observed account=${currentAccount}; mark+rebind`)
      await oauth.markAccountAtLimit({
        account: currentAccount,
        retryAfterHeader: res.headers.get("retry-after"),
        logPrefix,
      })
    }

    void oauth.repollUsageAfter429(currentAccount, getFreshToken, logPrefix)

    const nextAccount: string | null = (await pickAccount(tried))?.account ?? null
    if (nextAccount == null || tried.has(nextAccount)) {
      const reason = nextAccount == null ? "no-viable-account" : "looped"
      return { kind: "empty-pool", reason, trailDisplay: trail.join("→") }
    }
    const nextCred = await getFreshToken(nextAccount)
    if (!nextCred) {
      return {
        kind: "empty-pool",
        reason: "no-fresh-token",
        trailDisplay: `${trail.join("→")}→${nextAccount}`,
      }
    }
    currentAccount = nextAccount
    currentCred = nextCred
  }
}
