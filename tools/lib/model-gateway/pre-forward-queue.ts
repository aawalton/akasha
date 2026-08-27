import { formatPoolEligibilityBreakdown, summarizePool } from "../oauth-selection.ts"
import { parseClientStreamFlag } from "./client-stream.ts"
import { buildCommittedKeepaliveResponse } from "./committed-keepalive.ts"
import type { HoldRegistry } from "./hold-registry.ts"
import type { ObserverSlot } from "./observer-slot.ts"
import { runPickPipeline } from "./pick-pipeline.ts"
import { type PickPipelineDeps } from "./pick-pipeline-types.ts"
import { decideQueueStep, SILENT_QUEUE_BUDGET_MS, TRANSIENT_HOLD_HORIZON_MS } from "./queue-step.ts"
import { rateLimitResponse } from "./rate-limit-response.ts"

export async function runPreForwardQueue(args: {
  req: Request
  observerSlot: ObserverSlot
  originalBody: ArrayBuffer | null
  method: string
  pathname: string
  deps: PickPipelineDeps
  sleep: (ms: number) => Promise<void>
  holdRegistry?: HoldRegistry
  getLogDir?: () => string
}): Promise<Response> {
  const { req, observerSlot, originalBody, method, pathname, deps, sleep } = args
  const { logPrefix, oauth } = deps

  const clientStream = parseClientStreamFlag(originalBody)

  let silentElapsedMs = 0
  while (true) {
    const outcome = await runPickPipeline({
      req,
      observerSlot,
      originalBody,
      method,
      pathname,
      deps,
    })
    if (outcome.kind === "served") return outcome.response

    const now = Date.now()
    const states = [...(await oauth.getClaudeAccountPacing()).values()]
    const summary = summarizePool(states, now)
    const step = decideQueueStep({
      earliestEligibleResetMs: summary.earliestEligibleResetMs,
      now,
      silentElapsedMs,
      silentBudgetMs: SILENT_QUEUE_BUDGET_MS,
      transientHoldHorizonMs: TRANSIENT_HOLD_HORIZON_MS,
      clientStream,
    })

    if (step.kind === "wait") {
      console.log(
        `${logPrefix} pre-forward-queue ${method} ${pathname} account=${outcome.trailDisplay} phase=silent-reprobe reason=${outcome.reason} wait=${step.waitMs}ms silentElapsed=${silentElapsedMs}ms earliestReset=${summary.earliestEligibleResetMs ?? "unknown"}`
      )
      await sleep(step.waitMs)
      silentElapsedMs += step.waitMs
      continue
    }

    if (step.kind === "commit") {
      console.log(
        `${logPrefix} pre-forward-queue ${method} ${pathname} account=${outcome.trailDisplay} phase=commit-keepalive reason=${outcome.reason} silentElapsed=${silentElapsedMs}ms earliestReset=${summary.earliestEligibleResetMs ?? "unknown"} eligibility=[${formatPoolEligibilityBreakdown(states, now)}]`
      )
      return buildCommittedKeepaliveResponse({
        req,
        observerSlot,
        originalBody,
        method,
        pathname,
        deps,
        sleep,
        holdRegistry: args.holdRegistry,
        getLogDir: args.getLogDir,
        emptyPoolReason: outcome.reason,
      })
    }

    console.log(
      `${logPrefix} res ${method} ${pathname} account=${outcome.trailDisplay} status=429 rebind=${outcome.reason} pool=${summary.eligibleCount}/${summary.totalCount} earliestReset=${summary.earliestEligibleResetMs ?? "unknown"} eligibility=[${formatPoolEligibilityBreakdown(states, now)}]`
    )
    return rateLimitResponse(summary, now)
  }
}
