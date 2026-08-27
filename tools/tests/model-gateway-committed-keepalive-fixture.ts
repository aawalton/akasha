import { fakeOAuthEffects } from "../lib/model-gateway/_oauth-effects-test-helpers.ts"
import type { buildCommittedKeepaliveResponse } from "../lib/model-gateway/committed-keepalive.ts"
import type { ObserverSlot } from "../lib/model-gateway/observer-slot.ts"
import type { PickPipelineDeps, PickPipelineOutcome } from "../lib/model-gateway/pick-pipeline-types"

export type KeepaliveArgs = Parameters<typeof buildCommittedKeepaliveResponse>[0]

export function stubDeps(logPrefix: string): PickPipelineDeps {
  return {
    logPrefix,
    pickAccount: () => {
      throw new Error("pickAccount must not be called when runAttempt is injected")
    },
    getFreshToken: async () => null,
    forward: () => {
      throw new Error("forward must not be called when runAttempt is injected")
    },
    oauth: fakeOAuthEffects(),
  }
}

export function newObserverSlot(): ObserverSlot {
  return { current: null }
}

export const emptyPool: PickPipelineOutcome = {
  kind: "empty-pool",
  reason: "no-viable-account",
  trailDisplay: "-",
}

export function queued(
  outcomes: readonly PickPipelineOutcome[]
): () => Promise<PickPipelineOutcome> {
  let i = 0
  return () => {
    const next = outcomes[i]
    i += 1
    if (next == null) throw new Error("runAttempt drained without a terminal served outcome")
    return Promise.resolve(next)
  }
}

export async function drain(res: Response): Promise<undefined> {
  const body = res.body
  if (body == null) return
  const reader = body.getReader()
  while (true) {
    const { done } = await reader.read()
    if (done) break
  }
}

export async function drainToString(res: Response): Promise<string> {
  const body = res.body
  if (body == null) throw new Error("committed response had no body")
  const reader = body.getReader()
  const decoder = new TextDecoder()
  let out = ""
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    if (value != null) out += decoder.decode(value, { stream: true })
  }
  out += decoder.decode()
  return out
}

export function baseArgs(args: {
  logPrefix: string
  observerSlot: ObserverSlot
  runAttempt: () => Promise<PickPipelineOutcome>
}): KeepaliveArgs {
  return {
    req: new Request("http://localhost/v1/messages", { method: "POST" }),
    observerSlot: args.observerSlot,
    originalBody: null,
    method: "POST",
    pathname: "/v1/messages",
    deps: stubDeps(args.logPrefix),
    sleep: () => Promise.resolve(),
    keepaliveMs: 0,
    holdPollMs: 0,
    runAttempt: args.runAttempt,
  }
}
